from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.product_list),
    path('info/', views.product_info),
]
