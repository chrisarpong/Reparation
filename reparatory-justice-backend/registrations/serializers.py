from rest_framework import serializers
from .models import PressRelease, ConsularService, DiplomaticMission

class PressReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PressRelease
        fields = "__all__"

class ConsularServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsularService
        fields = "__all__"

class DiplomaticMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiplomaticMission
        fields = "__all__"
