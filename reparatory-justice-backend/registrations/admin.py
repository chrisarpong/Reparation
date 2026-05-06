from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import PressRelease, ConsularService, DiplomaticMission

@admin.register(PressRelease)
class PressReleaseAdmin(SimpleHistoryAdmin):
    list_display = ('title', 'date_published', 'is_published', 'created_at')
    list_filter = ('is_published', 'date_published')
    search_fields = ('title', 'content', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')

@admin.register(ConsularService)
class ConsularServiceAdmin(SimpleHistoryAdmin):
    list_display = ('service_name', 'fee', 'processing_time')
    search_fields = ('service_name', 'description', 'requirements')

@admin.register(DiplomaticMission)
class DiplomaticMissionAdmin(SimpleHistoryAdmin):
    list_display = ('country', 'city', 'head_of_mission', 'email')
    list_filter = ('country',)
    search_fields = ('country', 'city', 'head_of_mission', 'address')
