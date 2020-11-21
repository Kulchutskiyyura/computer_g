"""
Тут рахується фрактал
"""

import numpy as np
import datetime

rootlist = {}
#наша 1 формула
def npe1(x):
    return (x ** 2 - 1) * (x ** 2 + 1) / (2 * x * (x ** 2 - 1) + 2 * x * (x ** 2 + 1))


rootlist['npe1'] = [-1, 1, -1j, 1j]

#наша 2 формула
def npe2(x):
    return (x ** 3 - 1) / (3 * x ** 2)


rootlist['npe2'] = [-.5 - 0.8660254037844386j, -.5 + 0.8660254037844386j, 1]


def id_root(zl, rlist):
    findgoal = 1.e-10 * np.ones(len(zl))
    rootid = -1 * np.ones(len(zl))
    for r in rlist:
        # check for closeness to each root in the list
        rootid = np.where(np.abs(zl - r * np.ones(len(zl))) < findgoal, np.ones(len(zl)) * rlist.index(r), rootid)

    return rootid



#задаємо початкові значення для пошуку(поки можеш не заморочуватись що то таке)
interval_left = -2.1
interval_right = 2.1
interval_down = -2.1
interval_up = 2.1

#кількість точок по х і у
num_x = 500
num_y = 500

#точність
prec_goal = 1.e-11

#максимальна кількість ітерацій
nmax = 50

#створюємо масив з кординатами точок по х і у
xvals = np.linspace(interval_left, interval_right, num=num_x)
yvals = np.linspace(interval_down, interval_up, num=num_y)


# головна функція
def plot_newton_fractal(func_string, perfom_shading=False):
    #перетворюємо масив точок в комплексні числа
    zlist = []
    for x in xvals:
        for y in yvals:
            zlist.append(x + 1j * y)

    
    reslist = np.array(zlist).astype(int)
    reldiff = np.ones(len(reslist)).astype(int)
    counter = np.zeros(len(reslist)).astype(int)
   
    overallcounter = 0
    
    prec_goal_list = np.ones(len(reslist)) * prec_goal
   
    #головний цикл
    while np.any(reldiff) > prec_goal and overallcounter < nmax:
        diff = eval(func_string + '(reslist)')
        z1list = reslist - diff
        reldiff = np.abs(diff / reslist)
       
        reslist = z1list
       
        counter = counter + np.greater(reldiff, prec_goal_list)
        overallcounter += 1

  
    nroot = id_root(z1list, rootlist[func_string]).astype(int)
    return {"root": list(nroot), "counter": list(counter)}



