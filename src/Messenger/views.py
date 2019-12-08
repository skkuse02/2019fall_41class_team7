from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
# Create your views here.


def ok_to_load_in_a_frame(request):
    return HttpResponse("This page is safe to load in a frame on any site.")


def messenger(request):
    try:
        username = request.session['uname']
        content = {
            'username': username,
            'login': 'yes',
        }
        return render(request, 'Messenger/messenger.html', context=content)
    except:
        return HttpResponseRedirect('/user/login/')


def list_messenger(request):
    '''
    context = {
        'username': 'user2'
    }
    return render(request, "Messenger/chatlist.html", context=context)
    '''
    username = request.session['uname']
    content = {
        'username': username,
    }
    return render(request, 'Messenger/chatlist.html', context=content)

def detail_messenger(request):
    username = request.session['uname']
    content = {
        'username': username,
    }
    return render(request, "Messenger/chatform.html", context=content)
