from django.shortcuts import render
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
        return render(request, "Product/product_info.html", {'login': username})
    except:
        return render(request, 'Product/product_info.html')
