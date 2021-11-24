from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login_user, name='login'),
    path('register', views.register, name='register'),
    path('activate', views.active_user, name='activate'),
]