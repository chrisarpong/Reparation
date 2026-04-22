from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from .models import Registration

class PublicRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = [
            "registration_type", "first_name", "last_name", "email", 
            "phone", "country_residence", "nationality", "organisation", 
            "designation", "organisation_country", "diaspora_affiliation", 
            "special_needs", "dietary_restrictions", "notes", "consent_given"
        ]

    def validate_consent_given(self, value):
        if value is not True:
            raise serializers.ValidationError("Consent must be explicitly given to register.")
        return value


class AdminRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = "__all__"
        read_only_fields = ("id", "email", "created_at", "updated_at", "email_sent", "email_sent_at")

    def update(self, instance, validated_data):
        user = self.context['request'].user
        
        # Protocol Officer Safeguard: They can only change the 'status' field.
        if user.groups.filter(name='Protocol Officer').exists() and not user.is_superuser:
            allowed_fields = {'status'}
            # Check if any field other than status is in validated_data
            if not set(validated_data.keys()).issubset(allowed_fields):
                raise PermissionDenied("Protocol Officers may only update the registration status.")
                
        return super().update(instance, validated_data)
