from django.apps import AppConfig

class RegistrationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'registrations'

    def ready(self):
        # This tells Django to listen for the email triggers!
        import registrations.signals