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
from convertor import rgb_to_hsl, h_convertor, s_convertor,  l_convertor, rgb_convertor

app = Flask(__name__)
global_dict = {}
limits = [-4, -4, 4, 4]
hsl_list = []

color_limits = {"yellow":[30,90],"green":[75,180],"blue":[180, 300]}



@app.route("/56", methods=["Get","Post"])
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


@app.route("/", methods=["Get","Post"])
def color_transformation():
    if request.method == "POST":
        color = request.form.get("colorModel")
       # h_range = float(request.form.get("hueRange"))/100
        #s_range = float(request.form.get("saturationRange"))/100
        l_range = float(request.form.get("lightnessRange"))/100
        
        img_data = json.loads(request.form.get("data"))
        width =  int(json.loads(request.form.get("width")))
        height =  int(json.loads(request.form["height"]))
        start_x =  int(json.loads(request.form.get("start_x")))
        start_y =  int(json.loads(request.form.get("start_y")))

        width_hsl =  int(json.loads(request.form.get("width_hsl")))
        height_hsl =  int(json.loads(request.form["height_hsl"]))
        start_x_hsl =  int(json.loads(request.form.get("start_x_hsl")))
        start_y_hsl =  int(json.loads(request.form.get("start_y_hsl")))
        print(width_hsl)
        print(height_hsl)
        print(start_x_hsl)
        print(start_y_hsl)
        #print(type(img_data))
        i = 0
        rgb_data =  img_data.copy()
        
        print(color)
        count = 0
        while(i<int(len(img_data))):
            #c = Color(rgb=(img_data[i]/255,img_data[i+1]/255,img_data[i+2]/255))
          
            result = rgb_to_hsl(img_data[i],img_data[i+1],img_data[i+2])
            img_data[i] = result[0] # h_convertor( , h_range)
            img_data[i+1] = result[1] #s_convertor(, s_range)
            #print(int(i/3/500))
            #print(((i//3)%500),end="\n\n\n")
            if img_data[i] > color_limits[color][0] and  img_data[i] < color_limits[color][1] and int(i/3/500)>start_y_hsl and ((i//3)%500)>start_x_hsl and int(i/3/500)<height_hsl+start_y_hsl and ((i//3)%500)<width_hsl+start_x_hsl:
                img_data[i+2] =   l_convertor(result[2], l_range)
                count +=1
               # img_data[i+2] = result[2]
            else:
                img_data[i+2] = result[2]
            i+=3

            #hsl_list.clear()
            #hsl_list.extend(img_data)
        print(count)
        return render_template("photo.html", img_data=img_data,typee=1, rgb_data= rgb_data, width=width,height=height,start_x=start_x, start_y= start_y,width_hsl=width_hsl,height_hsl=height_hsl,start_x_hsl=start_x_hsl, start_y_hsl= start_y_hsl)
        
            
    return render_template("photo.html", img_data=0,typee=0,rgb_data =0,width=500,height=500,start_x=0, start_y= 0,width_hsl=500,height_hsl=500,start_x_hsl=0, start_y_hsl= 0)


