from rest_framework import serializers

from django.contrib.auth.models import User

from .models import ToDo

class ToDoSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True, source="user.username")
    
    class Meta:
        model = ToDo
        fields = ["id", "text", "user"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=["id", "username"]
