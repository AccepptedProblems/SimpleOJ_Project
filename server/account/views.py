from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from account.backends import AccountBackend
from account.models import Account
from onlinejudge.models import Record
from django.contrib.auth import login

# Create your views here.

@csrf_exempt
def login_user(request):
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
            if user is None:
                return JsonResponse({'message': 'Wrong username or password. Please try again'})
            login(request, user, 'account.backends.AccountBackend')
            if not user.is_active:
                return JsonResponse({'message': 'Account has been not yet activated'})
            
            userInfo['id'] = user.id
            userInfo['username'] = user.username
            userInfo['fullname'] = user.fullname
            userInfo['point'] = user.total_point
            userInfo['is_admin'] = user.is_admin

            return JsonResponse(userInfo)
    else:
        return JsonResponse({'message': 'Invalid request!!!'})


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
    
@csrf_exempt  
def active_user(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        sender_id = request.POST.get('sender_id')
        user = Account.object.filter(id=user_id).first()
        sender = Account.object.filter(id=sender_id).first()
        
        if user is None:
            return JsonResponse({'message':'Invalid user_id!!!'})
        if (not sender.is_admin) or (not sender.is_authenticated):
            return JsonResponse({'message':'Unauthorize!!!'})
        
        Account.object.activate_user(user)
        Record.object.refresh_record()
        response = {
            'code' : 1,
            'message': 'Success',
            'data' : 'Activate success!!!'
        }
        return JsonResponse(response)
    return JsonResponse()