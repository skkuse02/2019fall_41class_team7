from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def ok_to_load_in_a_frame(request):
    return HttpResponse("This page is safe to load in a frame on any site.")


def messenger(request):
    return render(request, 'Messenger/messenger.html')


def list_messenger(request):
    context = {
        'username': 'user2'
    }
    return render(request, "Messenger/chatlist.html", context=context)


def detail_messenger(request):
    context = {
        'username': 'user2'
    }
    return render(request, "Messenger/chatform.html", context=context)
