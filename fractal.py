"""
Тут рахується фрактал
"""

import numpy as np
import datetime
import math

#розвязуємо рівняння н-го степення
def return_root(n, const:complex):
    const = -complex(const)
    r = math.pow(math.sqrt(const.real**2+const.imag**2), 1/n)
    x = const.real
    y = const.imag
    alf = None
    if x>0:
        alf = math.atan(y/x)
    elif x<0:
        alf = math.pi - math.atan(y/x)
    elif y>0:
        alf = math.pi/2
    else: 
        alf = -math.pi/2
    roots = []
    for i in range(n):
        x = r*math.cos((alf+i*2*math.pi)/n)
        y = r*math.sin((alf+i*2*math.pi)/n)
        roots.append(complex(x, y))
    return roots


#наша 1 формула
def npe1(x, n, const=1):
    return (x ** n + const) / (n * x ** (n-1))




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
def plot_newton_fractal(func_string, n, const):
    #перетворюємо масив точок в комплексні числа
    zlist = []
    for x in xvals:
        for y in yvals:
            zlist.append(x + 1j * y)

    
    reslist = np.array(zlist)
    reldiff = np.ones(len(reslist))
    counter = np.zeros(len(reslist)).astype(int)
   
    overallcounter = 0
    
    prec_goal_list = np.ones(len(reslist)) * prec_goal
   
    #головний цикл
    while np.any(reldiff) > prec_goal and overallcounter < nmax:
        diff = npe1(reslist, n, const)
        z1list = reslist - diff
        reldiff = np.abs(diff / reslist)
       
        reslist = z1list
       
        counter = counter + np.greater(reldiff, prec_goal_list)
        overallcounter += 1

    rootlist = return_root(n, const)
    nroot = id_root(z1list, rootlist).astype(int)
  
    return [ list(nroot), list(counter)]



plot_newton_fractal("k", 3, complex(4,2))

