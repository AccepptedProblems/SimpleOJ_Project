from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

from onlinejudge.models import Record


class AccountBackend(ModelBackend):

    # insensitive authenticate
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)

        try:
            case_insensitive_username_field = '{}__iexact'.format(
                UserModel.USERNAME_FIELD)
            user = UserModel._default_manager.get(
                **{case_insensitive_username_field: username})
        except UserModel.DoesNotExist:
            UserModel().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def register(self, request, username, email, password=None, fullname=None, **kwargs):
        UserModel = get_user_model()
        case_insensitive_username_field = '{}__iexact'.format(
            UserModel.USERNAME_FIELD)
        try:
            user = UserModel._default_manager.get(
                **{case_insensitive_username_field: username})

        except UserModel.DoesNotExist:
            try:
                checkEmail = UserModel._default_manager.get(email__exact=email)
            except UserModel.DoesNotExist:
                newUser = UserModel.object.create_user(
                    username=username,
                    email=email,
                    password=password,
                    fullname=fullname)
                Record.object.refresh_record()
                return newUser
