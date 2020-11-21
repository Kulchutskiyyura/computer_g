from flask import Flask
from flask import request
from flask import render_template
from flask import redirect
from flask import redirect
from flask import redirect

import json

from fractal import plot_newton_fractal

app = Flask(__name__)

@app.route("/", methods=["Get","Post"])
def main():
    return_dict = plot_newton_fractal("npe1")
    json_obj = json.dumps(return_dict)
    json_obj = {"q": [4,5,7], "w":[7,9,10]}
    return render_template('fractal.html', json_obj=json_obj)