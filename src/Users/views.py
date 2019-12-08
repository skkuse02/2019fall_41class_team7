import pyrebase
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.contrib import messages, auth


config = {
    'apiKey': "AIzaSyA7jmSkNpk47WEGpAJVXuWRy2tfcf3-ieQ",
    'authDomain': "se-proj-db.firebaseapp.com",
    'databaseURL': "https://se-proj-db.firebaseio.com",
    'projectId': "se-proj-db",
    'storageBucket': "se-proj-db.appspot.com",
    'messagingSenderId': "239952264168",
    'appId': "1:239952264168:web:29facf8a846fb0d39e425d",
    'measurementId': "G-2ZQXSQXSLX"
}

firebase = pyrebase.initialize_app(config)
auth_firebase = firebase.auth()
database = firebase.database()


def sign_in(request):
    return render(request, 'Users/signin.html')


def validate(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        user = auth_firebase.sign_in_with_email_and_password(email, password)
    except:
        message = "Incorrect login info. Please check email or password"
        return render(request, 'Users/signin.html', {'e': message})
    session_id = user['idToken']
    uname = user['localId']
    uname = database.child("users").child(uname).child("details").get().val()
    uname = uname['name']
    request.session['uid'] = session_id
    request.session['uname'] = uname
    request.session['email'] = email
    return HttpResponseRedirect('/')


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/')


def sign_up(request):
    return render(request, 'Users/signup.html')


def post_signup(request):
    name = request.POST.get('user_name')
    email = request.POST.get('user_email')
    passwd = request.POST.get('user_password')
    try:
        user = auth_firebase.create_user_with_email_and_password(email, passwd)
    except:
        message = "Unable to create account. Try again."
        return render(request, "Users/signup.html", {"message": message})
    uid = user['localId']
    data = {"name": name, "email": email, "status": "1"}
    database.child("users").child(uid).child("details").set(data)
    return HttpResponseRedirect('/')


def account_info(request):
    email = request.session['email']
    username = request.session['uname']
    context = {
        'ID': email,
        'name': username,
    }
    return render(request, "account.html", context=context)
