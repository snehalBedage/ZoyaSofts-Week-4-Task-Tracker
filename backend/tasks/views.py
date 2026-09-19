from django.http import JsonResponse

def task_home(request):
    return JsonResponse({
        "message": "Task Tracker API is working!"
    })