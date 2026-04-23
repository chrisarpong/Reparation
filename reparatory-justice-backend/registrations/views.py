from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Registration
from .serializers import PublicRegistrationSerializer, AdminRegistrationSerializer
from .permissions import IsRegistrationViewer, IsRegistrationEditor

class PublicRegistrationCreateView(CreateAPIView):
    """
    Public endpoint for submitting new registrations.
    """
    queryset = Registration.objects.all()
    serializer_class = PublicRegistrationSerializer
    permission_classes = [AllowAny]
    # Note: Rate limiting is handled globally via settings, but could be explicitly added here if needed.

class AdminRegistrationListView(ListAPIView):
    """
    Admin endpoint to list registrations.
    """
    queryset = Registration.objects.all().order_by("-created_at")
    serializer_class = AdminRegistrationSerializer
    permission_classes = [IsAuthenticated]

class AdminRegistrationDetailView(RetrieveUpdateAPIView):
    """
    Admin endpoint to retrieve and update specific registrations.
    """
    queryset = Registration.objects.all().order_by("-created_at")
    serializer_class = AdminRegistrationSerializer
    permission_classes = [IsAuthenticated]
