from django.urls import path
from .views import task_api

urlpatterns = [
    path('', task_api, name='task-api'),
]