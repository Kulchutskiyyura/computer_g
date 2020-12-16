from flask import Flask
from flask import request
from flask import render_template
from flask import url_for
from flask import redirect
from flask import redirect
from flask import redirect

import json

from fractal import plot_newton_fractal
from Encoder import MyEncoder
from new_limits import return_new_limits
from convertor import rgb_to_hsl

app = Flask(__name__)
global_dict = {}
limits = [-4, -4, 4, 4]
hsl_list = []

@app.route("/", methods=["Get","Post"])
def main():
    return_dict = None
    global limits
    color_type = 0
    if request.method == "POST":
        if request.form.get("type"):
            print(request.form.get("x_pos"))
            print(request.form.get("y_pos"))
            color_type = global_dict["color"]

            limits = return_new_limits(int(request.form.get("x_pos")), int(request.form.get("y_pos")),*limits)
            print(limits)
            return_dict = plot_newton_fractal("npe1",global_dict["power"], global_dict["const"], *limits)

            #print(return_dict)
        else:


            power = int(request.form.get("power"))
            color_type = int(request.form.get("color_type"))
            zoom = int(request.form.get("zoom"))
            constant = complex(
                float(request.form.get("constant_i")),
                float(request.form.get("constant_j"))
            )
            limits = [-zoom , -zoom , zoom , zoom ]
            print("constant:  ", constant)
            global_dict.update({"power":power, "const":constant, "color":color_type})
            print(limits)
            return_dict = plot_newton_fractal("npe1", power, constant,*limits)
    else:
        return_dict = plot_newton_fractal("npe1",3, 5,*limits)
        global_dict.update({"power":3, "const":5, "color":1})
    json_obj = json.dumps(return_dict, cls=MyEncoder)
   # print(return_dict)
    #json_obj =json.dumps( [ [4,5,7],[7,9,10]])
    print("above return")
    return render_template('fractal.html', json_obj=json_obj, color_type=color_type)


@app.route("/g", methods=["Get","Post"])
def color_transformation():
    if request.method == "POST":
        print(request.form)
        img_data = json.loads(request.form["data"])
        print(type(img_data))
        i = 0
        while(i<int(len(img_data))):
            #c = Color(rgb=(img_data[i]/255,img_data[i+1]/255,img_data[i+2]/255))
          
            result = rgb_to_hsl(img_data[i],img_data[i+1],img_data[i+2])
            img_data[i] =   result[0]
            img_data[i+1] = result[1]
            img_data[i+2] =  result[2]
            i+=3

        hsl_list.clear()
        hsl_list.extend(img_data)
        return render_template("photo.html", img_data=img_data)
            
    return render_template("photo.html", img_data=0)


