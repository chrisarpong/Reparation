import os
import json
import urllib.request
import urllib.parse
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from .models import Registration

class PublicRegistrationSerializer(serializers.ModelSerializer):
    cf_turnstile_response = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Registration
        fields = [
            "registration_type", "first_name", "last_name", "email", 
            "phone", "country_residence", "nationality", "organisation", 
            "designation", "organisation_country", "diaspora_affiliation", 
            "special_needs", "dietary_restrictions", "notes", "consent_given",
            "cf_turnstile_response"
        ]

    def validate_consent_given(self, value):
        if value is not True:
            raise serializers.ValidationError("Consent must be explicitly given to register.")
        return value

    def validate(self, data):
        turnstile_token = data.pop('cf_turnstile_response', None)
        if not turnstile_token:
            raise serializers.ValidationError({"cf_turnstile_response": "CAPTCHA token is required."})

        # Verify with Cloudflare
        secret_key = os.getenv('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA')
        verify_url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
        
        payload = urllib.parse.urlencode({
            'secret': secret_key,
            'response': turnstile_token
        }).encode('utf-8')
        
        try:
            req = urllib.request.Request(verify_url, data=payload, method='POST')
            with urllib.request.urlopen(req, timeout=5) as response:
                result = json.loads(response.read().decode())
                
            if not result.get('success'):
                raise serializers.ValidationError({"cf_turnstile_response": "CAPTCHA validation failed."})
        except Exception:
            raise serializers.ValidationError({"cf_turnstile_response": "Could not connect to CAPTCHA service."})

        return data

class AdminRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = "__all__"
        read_only_fields = ("id", "email", "created_at", "updated_at", "email_sent", "email_sent_at")

    def update(self, instance, validated_data):
        user = self.context['request'].user
        
        # Protocol Officer Safeguard: They can only change the 'status' field.
        if user and user.is_authenticated and user.groups.filter(name='Protocol Officer').exists() and not user.is_superuser:
            allowed_fields = {'status'}
            # Check if any field other than status is in validated_data
            if not set(validated_data.keys()).issubset(allowed_fields):
                raise PermissionDenied("Protocol Officers may only update the registration status.")
                
        return super().update(instance, validated_data)
