from flask import Flask
from flask import request
from flask import render_template
from flask import redirect
from flask import redirect
from flask import redirect

import json

from fractal import plot_newton_fractal
from Encoder import MyEncoder

app = Flask(__name__)

@app.route("/", methods=["Get","Post"])
def main():
    return_dict = None
    if request.method == "POST":
        power = int(request.form.get("power"))
        constant = complex(float(request.form.get("constant")))
        return_dict = plot_newton_fractal("npe1", power, constant)
    else:
        return_dict = plot_newton_fractal("npe1",3, 5)
    json_obj = json.dumps(return_dict, cls=MyEncoder)
   # print(json_obj)
    #json_obj =json.dumps( [ [4,5,7],[7,9,10]])
    return render_template('fractal.html', json_obj=json_obj)