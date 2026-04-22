from django.urls import path
from .views import PublicRegistrationCreateView, AdminRegistrationListView, AdminRegistrationDetailView

urlpatterns = [
    path('', PublicRegistrationCreateView.as_view(), name='public-registration-create'),
    path('admin-list/', AdminRegistrationListView.as_view(), name='admin-registration-list'),
    path('admin-list/<uuid:pk>/', AdminRegistrationDetailView.as_view(), name='admin-registration-detail'),
]
