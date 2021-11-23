from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from account.models import Account

# Register your models here.
class AccountAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_admin', 'last_login')
    search_fields = ('email', 'username', 'id')
    readonly_fields = ('id', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldset = ()
    
    

admin.site.register(Account, AccountAdmin)