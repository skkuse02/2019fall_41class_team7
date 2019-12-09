from django.shortcuts import render
from django.http import HttpResponseRedirect


def main_page(request):
    try:
        username = request.session['uname']
        context = {
            'username': username,
        }
        return render(request, "home.html", {'login': username})
    except:
        return render(request, 'home.html')


def test_upload(request):
    try:
        username = request.session['uname']
        content = {
            'username': username,
        }
        return render(request, 'test_upload/upload.html', context=content)
    except:
        return HttpResponseRedirect('/user/login/')
