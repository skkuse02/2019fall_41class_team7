from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('', views.messenger),
    path('list/', views.list_messenger, name='chatlist'),
    path('form/', views.detail_messenger, name='chatform'),
]
