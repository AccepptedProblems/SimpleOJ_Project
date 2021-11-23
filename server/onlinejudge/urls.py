from django.urls import path

from . import views

urlpatterns = [
    path('problems', views.problems, name='problems'),
    path('problem/create', views.createProblems, name='create'),
    path('ranking', views.ranking, name="ranking"),
]