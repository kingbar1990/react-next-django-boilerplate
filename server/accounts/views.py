from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        if self.kwargs.get('pk', None) == 'me':
            self.kwargs['pk'] = self.request.user.pk
        return super(UserViewSet, self).get_object()
