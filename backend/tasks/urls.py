from django.urls import path
from .views import task_list, task_detail

urlpatterns = [
    path('', task_list, name='task-list'),
    path('<int:id>/', task_detail, name='task-detail'),
]