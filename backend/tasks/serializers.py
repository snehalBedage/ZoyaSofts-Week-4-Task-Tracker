from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

    def validate_title(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Task name is required."
            )

        if len(value) < 3:
            raise serializers.ValidationError(
                "Task name must contain at least 3 characters."
            )

        if len(value) > 200:
            raise serializers.ValidationError(
                "Task name cannot exceed 200 characters."
            )

        return value

    def validate_description(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Description is required."
            )

        if len(value) < 5:
            raise serializers.ValidationError(
                "Description must contain at least 5 characters."
            )

        return value