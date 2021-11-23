from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from account.backends import AccountBackend
from account.models import Account

# Create your views here.

@csrf_exempt
def login(request):
    userInfo = {}

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        if username is None or password is None:
            return JsonResponse({'message': 'Missing username or password. Please try again'})

        try:
            user = AccountBackend.authenticate(AccountBackend(), request=request, username=username, password=password)
        except Account.DoesNotExist:
            return JsonResponse({'message': 'Wrong username or password. Please try again'})
        else:
            if not user.is_active:
                return JsonResponse({'message': 'Account has been not yet activated'})
            
            userInfo['id'] = user.id
            userInfo['username'] = user.username
            userInfo['fullname'] = user.fullname
            userInfo['point'] = user.total_point
            userInfo['is_admin'] = user.is_admin

            return JsonResponse(userInfo)
    else:
        return JsonResponse({'message': 'There\'s no GET method'})


@csrf_exempt
def register(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    fullname = request.POST.get('fullname')
    email = request.POST.get('email')
    
    newUser = AccountBackend.register(AccountBackend(), 
                                    request=request, 
                                    username=username,
                                    email=email,
                                    password=password,
                                    fullname=fullname)
    
    if newUser is None:
        return JsonResponse({'message':'username or email is already taken!'})
    else:
        data = {}
        data['id'] = newUser.id
        data['username'] = newUser.username
        data['fullname'] = newUser.fullname
        data['is_admin'] = newUser.is_admin
        
        return JsonResponse(data)
        
