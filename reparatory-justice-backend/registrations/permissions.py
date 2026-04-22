from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsRegistrationViewer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_superuser or
            request.user.has_perm("registrations.view_registration")
        )


class IsRegistrationEditor(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.has_perm("registrations.view_registration")

        return request.user.has_perm("registrations.change_registration")
