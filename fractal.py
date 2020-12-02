"""
Тут рахується фрактал
"""

import numpy as np
import datetime
import math

#розвязуємо рівняння н-го степення
def find_roots(n, const:complex):
    const = complex(const)
    const = complex(-const.real, const.imag)
    r = math.pow(math.sqrt(const.real**2+const.imag**2), 1/n)
    x = const.real
    y = const.imag
    alf = None
    if x > 0:
        alf = math.atan(y/x)
    elif x < 0:
        alf = math.pi - math.atan(y/x)
    elif y > 0:
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




def id_root(number_list, root_list):
    exp_list = 1.e-10 * np.ones(len(number_list))
    root_number_list = -1 * np.ones(len(number_list))
    for r in root_list:
        # check for closeness to each root in the list
        root_number_list = np.where(np.abs(number_list - r * np.ones(len(number_list))) < exp_list, np.ones(len(number_list)) * root_list.index(r), root_number_list)

    return root_number_list



#задаємо початкові значення для пошуку(поки можеш не заморочуватись що то таке)
interval_left = -2.1
interval_right = 2.1
interval_down = -2.1
interval_up = 2.1

#кількість точок по х і у
x_number = 500
y_number = 500

#точність
exp = 1.e-11

#максимальна кількість ітерацій
max_iteration_number = 50

#створюємо масив з кординатами точок по х і у
x_coordinat_list = np.linspace(interval_left, interval_right, num=x_number)
y_coordinats_list = np.linspace(interval_down, interval_up, num=y_number)


# головна функція
def plot_newton_fractal(func_string, x_power, const):
    #перетворюємо масив точок в комплексні числа
    complex_numbers = []
    for x in x_coordinat_list:
        for y in y_coordinats_list:
            complex_numbers.append(x + 1j * y)

    
    complex_numbers_list = np.array(complex_numbers)
    diff_list = np.ones(len(complex_numbers_list))
    counter_list = np.zeros(len(complex_numbers_list)).astype(int)
   
    number_of_iteration = 0
    
    prec_goal_list = np.ones(len(complex_numbers_list)) * exp
   
    #головний цикл
    while np.any(diff_list) > exp and number_of_iteration < max_iteration_number:
        diff = npe1(complex_numbers_list, x_power, const)
        diff_list = np.abs(diff / complex_numbers_list)
        complex_numbers_list = complex_numbers_list - diff

        counter_list = counter_list + np.greater(diff_list, prec_goal_list)
        number_of_iteration += 1

    roots_list = find_roots(x_power, const)
    number_of_roots_list = id_root(complex_numbers_list, roots_list).astype(int)
  
    return [list(number_of_roots_list), list(counter_list)]
