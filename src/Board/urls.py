from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.view_board),
    path('div/', views.view_division),
    path('free/', views.view_free),
    path('fraud/', views.view_fraud),
    path('notice/', views.view_notice),
    path('view/', views.view_individual),
    path('write/', views.write_board),
    path('write-notice/', views.write_notice),
]
