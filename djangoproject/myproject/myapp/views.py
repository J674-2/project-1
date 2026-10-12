from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response
from rest_framework import status

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken 

from django.contrib.auth.models import User

from .models import ToDo
from .serializers import ToDoSerializer, UserSerializer
from .permissions import IsOwner, IsThatUser



class ToDoList(generics.ListCreateAPIView):
    queryset = ToDo.objects.all() 
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ToDo.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    
class ToDoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsOwner] 



class UserDetail(generics.RetrieveDestroyAPIView):
    queryset= User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsThatUser]

    def destroy(self, request, *args, **kwargs):
        
        instance = self.get_object()
        self.perform_destroy(instance)
        response = Response(status=status.HTTP_204_NO_CONTENT)

        # Delete cookies

        response.delete_cookie("access-token", samesite="Strict", domain="localhost")
        response.delete_cookie("refresh-token", samesite="Strict", domain="localhost")

        # Blacklist refresh token

        try:
            token = RefreshToken(None)
            try:
                token = RefreshToken(request.COOKIES["refresh-token"])
            except KeyError:
                response.data = {'detail': 'Refresh token was not included in cookie data.'}
                response.status_code = status.HTTP_401_UNAUTHORIZED
            token.blacklist()
        except TokenError as error:
            response.data = {'detail': str(error)}
            response.status_code = status.HTTP_401_UNAUTHORIZED
        except (AttributeError, TypeError):
            response.data = {'detail': 'An error has occurred.'}
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR        

        return response



