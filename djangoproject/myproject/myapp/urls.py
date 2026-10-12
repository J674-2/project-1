from django.urls import path

from . import views

urlpatterns = [
    path("to-dos", views.ToDoList.as_view()),
    path("to-dos/<int:pk>", views.ToDoDetail.as_view()),
    path("user/<int:pk>", views.UserDetail.as_view()),    
]