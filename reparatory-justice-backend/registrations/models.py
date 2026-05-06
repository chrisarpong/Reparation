import uuid
from django.db import models
from simple_history.models import HistoricalRecords

class PressRelease(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    date_published = models.DateField()
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    history = HistoricalRecords()

    def __str__(self):
        return self.title

class ConsularService(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    service_name = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    fee = models.CharField(max_length=100)
    processing_time = models.CharField(max_length=100)
    
    history = HistoricalRecords()

    def __str__(self):
        return self.service_name

class DiplomaticMission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    country = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    address = models.TextField()
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    head_of_mission = models.CharField(max_length=255)
    
    history = HistoricalRecords()

    def __str__(self):
        return f"{self.country} - {self.city}"
