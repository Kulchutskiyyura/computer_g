def rgb_to_hsl(r, g, b):
    r = float(r)/255
    g = float(g)/255
    b = float(b)/255
    high = max(r, g, b)
    low = min(r, g, b)
    dif = high - low
    l = (high+low)/2
    if dif == 0:
        h = 0.0
        s = 0.0
       
    else:
        if high == r:
            h = (((g-b)/dif)%6)*60
        elif high == g:
            h = (((b-r)/dif)+2)*60
        else:
            h = (((r-g)/dif)+4)*60
        l = (high+low)/2
        s = dif/(1-abs(2*l-1))
    return (h, s, l)


def h_convertor(value, index):
    index = (index-0.5)*2
    coef = 180 * index
    value = value + coef
    if value>360:
        value=360-value
    elif value<0:
        value = 0
    return value

def s_convertor(value, index):
    index = index*2
    value = value*index
    if value>1:
        value=1
    elif value<0:
        value = 0
    return value

def l_convertor(value, index):
    index = index*2
    value = value*index
    if value>1:
        value=1
    elif value<0:
        value = 0
    return value

def rgb_convertor(value, index):
    index = (index-0.5)*2
    coef = 255 * index
    value = value + coef
    if value>255:
        value=255
    elif value<0:
        value = 0
    return value