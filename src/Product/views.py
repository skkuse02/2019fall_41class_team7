from django.shortcuts import render
from django.http import HttpResponseRedirect
# Create your views here.


def product_list(request):
    try:
        username = request.session['uname']
        context = {
            'username': username,
        }
        return render(request, "Product/product_list.html", {'login': username})
    except:
        return render(request, 'Product/product_list.html')


def product_info(request):
    try:
        username = request.session['uname']
        context = {
            'username': username,
        }
        return render(request, "Product/product_info.html", {'login': username, 'username': username})
    except:
        return render(request, 'Product/product_info.html')


def product_search(request):
    try:
        username = request.session['uname']
        context = {
            'username': username,
        }
        return render(request, "Product/product_search.html", {'login': username})
    except:
        return render(request, 'Product/product_search.html')


def product_safedeal(request):

    username = request.session['uname']
    context = {
        'username': username,
        'login': 'yes'
    }
    return render(request, "Product/safeDealing.html", context=context)
    # except:
    # return HttpResponseRedirect("/user/login")