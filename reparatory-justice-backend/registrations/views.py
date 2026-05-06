from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import PressRelease, ConsularService, DiplomaticMission
from .serializers import PressReleaseSerializer, ConsularServiceSerializer, DiplomaticMissionSerializer

class PressReleaseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows press releases to be viewed.
    """
    queryset = PressRelease.objects.filter(is_published=True).order_by('-date_published')
    serializer_class = PressReleaseSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

class ConsularServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows consular services to be viewed.
    """
    queryset = ConsularService.objects.all().order_by('service_name')
    serializer_class = ConsularServiceSerializer
    permission_classes = [AllowAny]

class DiplomaticMissionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows diplomatic missions to be viewed.
    """
    queryset = DiplomaticMission.objects.all().order_by('country', 'city')
    serializer_class = DiplomaticMissionSerializer
    permission_classes = [AllowAny]
