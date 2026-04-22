from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import Registration

@admin.register(Registration)
class RegistrationAdmin(SimpleHistoryAdmin):
    list_display = (
        "first_name",
        "last_name",
        "email",
        "registration_type",
        "country_residence",
        "status",
        "created_at",
    )

    list_filter = (
        "registration_type",
        "status",
        "country_residence",
        "diaspora_affiliation",
    )

    search_fields = ("first_name", "last_name", "email", "organisation")

    readonly_fields = ("created_at", "updated_at")
