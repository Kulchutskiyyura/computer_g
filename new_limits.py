def return_new_limits(x_pos, y_pos, x_min, y_min, x_max, y_max):
  x_min_canvas = x_pos-75 if x_pos-75>=0 else 0
  x_max_canvas = x_pos+75 if x_pos+75<=500 else 500
  y_min_canvas = y_pos-75 if y_pos-75>=0 else 0
  y_max_canvas = y_pos+75 if y_pos+75<=500 else 500
  if x_min> 0 and x_max >0:
      x_min_new = x_min + ((x_min_canvas)/500)*(x_max-x_min)
      x_max_new = x_min +((x_max_canvas)/500)*(x_max-x_min)
  elif x_min< 0 and x_max <0:
      x_min_new =  x_min -((x_min_canvas)/500)*(x_min-x_max)
      x_max_new =  x_min -((x_max_canvas)/500)*(x_min-x_max)
  else:
      dif = 500*(abs(x_min)/(abs(x_min)+abs(x_max)))
      x_min_new = -((dif-x_min_canvas)/500)*(abs(x_min)+abs(x_max))
      x_max_new = -((dif-x_max_canvas)/500)*(abs(x_min)+abs(x_max))

  if y_min> 0 and y_max >0:
      y_min_new = y_max - ((y_min_canvas)/500)*(y_max-y_min)
      y_max_new = y_max -((y_max_canvas)/500)*(y_max-y_min)
  elif y_min< 0 and y_max <0:
      print(y_min_canvas,y_max_canvas )
      y_min_new =  y_max +((y_min_canvas)/500)*(y_min-y_max)
      y_max_new =  y_max +((y_max_canvas)/500)*(y_min-y_max)
  else:
      dif = 500*(abs(y_min)/(abs(y_min)+abs(y_max)))
      y_min_new = ((dif-y_min_canvas)/500)*(abs(y_min)+abs(y_max))
      y_max_new = ((dif-y_max_canvas)/500)*(abs(y_min)+abs(y_max))
  return [x_min_new,y_min_new, x_max_new, y_max_new]
