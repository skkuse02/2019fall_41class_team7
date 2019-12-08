from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('account/', views.account_info),
    path('login/', views.sign_in, name='signin'),
    path('logout/', views.logout),
    path('signup/', views.sign_up, name='signup'),
    path('post_signup/', views.post_signup),
    path('validate/', views.validate),
]
