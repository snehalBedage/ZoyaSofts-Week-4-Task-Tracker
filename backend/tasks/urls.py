from django.urls import path
from .views import task_home

urlpatterns = [
    path('', task_home, name='task-home'),
]