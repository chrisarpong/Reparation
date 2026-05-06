from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PressReleaseViewSet, ConsularServiceViewSet, DiplomaticMissionViewSet

router = DefaultRouter()
router.register(r'press-releases', PressReleaseViewSet, basename='press-release')
router.register(r'services', ConsularServiceViewSet, basename='consular-service')
router.register(r'missions', DiplomaticMissionViewSet, basename='diplomatic-mission')

urlpatterns = [
    path('', include(router.urls)),
]
