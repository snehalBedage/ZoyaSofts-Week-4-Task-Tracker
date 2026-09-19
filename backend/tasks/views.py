from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def task_api(request):

    if request.method == "GET":
        return JsonResponse({
            "method": "GET",
            "message": "Tasks retrieved successfully"
        })

    elif request.method == "POST":
        data = json.loads(request.body)

        return JsonResponse({
            "method": "POST",
            "message": "Task created successfully",
            "data": data
        })

    elif request.method == "PUT":
        data = json.loads(request.body)

        return JsonResponse({
            "method": "PUT",
            "message": "Task updated successfully",
            "data": data
        })

    elif request.method == "DELETE":
        return JsonResponse({
            "method": "DELETE",
            "message": "Task deleted successfully"
        })

    return JsonResponse({
        "message": "Method not allowed"
    }, status=405)