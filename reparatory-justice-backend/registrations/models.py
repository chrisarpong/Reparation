import uuid
from django.db import models
from django.conf import settings
from simple_history.models import HistoricalRecords

class Registration(models.Model):
    class RegistrationType(models.TextChoices):
        HEAD_OF_STATE = "HEAD_OF_STATE", "Head of State / Former Head of State"
        MINISTER = "MINISTER", "Minister / Deputy Minister"
        DIPLOMATIC_MISSION = "DIPLOMATIC_MISSION", "Diplomatic Mission"
        MULTILATERAL_ORG = "MULTILATERAL_ORG", "Multilateral Organisation"
        DIASPORA_ORGANISATION = "DIASPORA_ORGANISATION", "Diaspora Organisation"
        ACADEMIC = "ACADEMIC", "Academic / Researcher"
        MEDIA = "MEDIA", "Media"
        OBSERVER = "OBSERVER", "Observer / General Participant"

    class RegistrationStatus(models.TextChoices):
        SUBMITTED = "SUBMITTED", "Submitted"
        REVIEWED = "REVIEWED", "Reviewed"
        APPROVED = "APPROVED", "Approved"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    registration_type = models.CharField(
        max_length=40,
        choices=RegistrationType.choices
    )

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30)

    country_residence = models.CharField(max_length=150)
    nationality = models.CharField(max_length=150, blank=True, null=True)

    organisation = models.CharField(max_length=255, blank=True, null=True)
    designation = models.CharField(max_length=255, blank=True, null=True)
    organisation_country = models.CharField(max_length=150, blank=True, null=True)

    diaspora_affiliation = models.BooleanField(default=False)

    special_needs = models.TextField(blank=True, null=True)
    dietary_restrictions = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    consent_given = models.BooleanField()

    status = models.CharField(
        max_length=20,
        choices=RegistrationStatus.choices,
        default=RegistrationStatus.SUBMITTED
    )

    email_sent = models.BooleanField(default=False)
    email_sent_at = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Institutional audit trail
    history = HistoricalRecords()

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
