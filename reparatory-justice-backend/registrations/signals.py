from django.db.models.signals import post_save
from django.dispatch import receiver
import resend
from django.conf import settings
from .models import Registration

# Initialize Resend
resend.api_key = settings.RESEND_API_KEY

@receiver(post_save, sender=Registration)
def send_registration_confirmation(sender, instance, created, **kwargs):
    # 'created' is a boolean that is True ONLY when the record is first created
    if created:
        try:
            # We use Resend's default testing email until you add a custom domain
            params = {
                "from": "Protocol Office <onboarding@resend.dev>",
                "to": instance.email,
                "subject": "Application Received - Global Reparatory Justice Programme",
                "html": f"""
                <div style="font-family: sans-serif; color: #051121; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ea580c;">Application Received</h2>
                    <p>Dear {instance.first_name} {instance.last_name},</p>
                    <p>The Ministry of Foreign Affairs, Republic of Ghana, acknowledges receipt of your delegate registration application for the Global Reparatory Justice Programme.</p>
                    <p>Your application under the category of <strong>{instance.registration_type}</strong> is currently undergoing official protocol review. You will be notified once your accreditation status is finalized.</p>
                    <br/>
                    <p>Sincerely,</p>
                    <p><strong>The Secretariat</strong><br/>Ministry of Foreign Affairs</p>
                </div>
                """
            }
            email = resend.Emails.send(params)
            print(f"Success: Confirmation email dispatched to {instance.email}")
            
        except Exception as e:
            print(f"Failed to send email to {instance.email}: {str(e)}")