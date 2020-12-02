def return_new_limits(x_pos, y_pos, x_min, y_min, x_max, y_max):
    if x_pos<250 and y_pos<250:
        x_max = (x_min+x_max)/2
        y_min = (y_min+y_max)/2
    elif x_pos>250 and y_pos<250:
         x_min = (x_min+x_max)/2
         y_min = (y_min+y_max)/2
    elif x_pos<250 and y_pos>250:
         y_max = (y_min+y_max)/2
         x_max =  (x_min+x_max)/2
    else:
        x_min = (x_min+x_max)/2
        y_max = (y_min+y_max)/2
    return (x_min,y_min,x_max,y_max)

