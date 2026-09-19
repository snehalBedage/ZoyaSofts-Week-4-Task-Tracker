
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Task
from .serializers import TaskSerializer


@api_view(['GET', 'POST'])
def task_list(request):

    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)

        return Response({
            "tasks": serializer.data
        })

    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['PUT', 'DELETE'])
def task_detail(request, id):

    try:
        task = Task.objects.get(id=id)

    except Task.DoesNotExist:
        return Response(
            {"message": "Task not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'PUT':
        serializer = TaskSerializer(
            task,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    if request.method == 'DELETE':
        task.delete()

        return Response(
            {"message": "Task deleted successfully"},
            status=status.HTTP_200_OK
        )

