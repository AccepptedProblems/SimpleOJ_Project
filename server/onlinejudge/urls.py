from django.urls import path

from . import views

urlpatterns = [
    path('problems', views.problems, name='problems'),
    path('problem/create', views.createProblems, name='create'),
    path('ranking', views.ranking, name="ranking"),
    path('submit', views.submit_problems, name='submit'),
    path('submissions', views.get_list_submission, name='submissions'),
]