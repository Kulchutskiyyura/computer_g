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


def hsl_to_rgb(h, s, l):
    def hue_to_rgb(p, q, t):
        t += 1 if t < 0 else 0
        t -= 1 if t > 1 else 0
        if t < 1/6: return p + (q - p) * 6 * t
        if t < 1/2: return q
        if t < 2/3: p + (q - p) * (2/3 - t) * 6
        return p

    if s == 0:
        r, g, b = l, l, l
    else:
        q = l * (1 + s) if l < 0.5 else l + s - l * s
        p = 2 * l - q
        r = hue_to_rgb(p, q, h + 1/3)
        g = hue_to_rgb(p, q, h)
        b = hue_to_rgb(p, q, h - 1/3)

    return r, g, b