from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.


def ok_to_load_in_a_frame(request):
    return HttpResponse("This page is safe to load in a frame on any site.")


def view_board(request):
    try:
        username = request.session['uname']
        content = {
            'username': username,
            'login': 'yes',
        }
        return render(request, 'Board/board.html', context=content)
    except:
        return HttpResponseRedirect('/user/login/')


def view_division(request):
    return render(request, 'Board/div.html')


def view_free(request):
    return render(request, 'Board/FreeBoard.html')


def view_fraud(request):
    return render(request, 'Board/FraudBoard.html')


def view_notice(request):
    return render(request, 'Board/NoticeBoard.html')


def view_individual(request):
    return render(request, 'Board/boardView.html')


def write_board(request):
    try:
        username = request.session['uname']
        content = {
            'username': username,
            'login': 'yes',
        }
        return render(request, 'Board/write.html', context=content)
    except:
        return HttpResponseRedirect('/user/login/')


def write_notice(request):
    try:
        if request.session['uname'] == 'admin':
            return render(request, 'Board/write.html')
        else:
            return render(request, 'Board/permission.html')
    except:
        return HttpResponse('/user/login/')
