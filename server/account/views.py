from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from account.backends import AccountBackend
from account.models import Account
from onlinejudge.models import Record
from django.contrib.auth import login, logout

# Create your views here.

@csrf_exempt
def login_user(request):
    response = {
        'code': 1,
        'message': 'Success',
        'data': None,
    }
    userInfo = {}
    print(request.user)

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        if username is None or password is None or username == '' or password == '':
            response['code'] = 0
            response['message'] = 'Missing username or password. Please try again'
            return JsonResponse(response)

        try:
            user = AccountBackend.authenticate(AccountBackend(), request=request, username=username, password=password)
        except Account.DoesNotExist:
            response['code'] = 0
            response['message'] = 'Wrong username or password. Please try again'
            return JsonResponse(response)
        else:
            if user is None:
                response['code'] = 0
                response['message'] = 'Wrong username or password. Please try again'
                return JsonResponse(response)
            
            login(request, user, 'account.backends.AccountBackend')
            
            if not user.is_active:
                response['code'] = 0
                response['message'] = 'Account has been not yet activated'
                return JsonResponse(response)
            
            userInfo['id'] = user.id
            userInfo['username'] = user.username
            userInfo['fullname'] = user.fullname
            userInfo['point'] = user.total_point
            userInfo['is_admin'] = user.is_admin

            response['data'] = userInfo
            return JsonResponse(response)
    else:
        response['code'] = 0
        response['message'] = 'nvalid request!!!'
        return JsonResponse(response)


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
        user = Account.object.filter(id=user_id).first()
        sender = Account.object.filter(username=request.user).first()
        
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

@csrf_exempt
def check_logged_in(request):
    response = {
        'code': 1,
        'message': 'Authorized!',
        'data': None,
    }
    print(request.user)
    
    if request.method == 'POST':
        senderId = request.POST.get('sender_id')
        sender = Account.object.filter(id=senderId).first()
        
        if sender is None or (not sender.is_authenticated):
            response['code'] = 403
            response['message'] = 'Unauthorized!!!'
            return JsonResponse(response)
        
        response['data'] = {
            'id': sender.id,
            'username': sender.username,
            'fullname': sender.fullname,
            'is_admin': sender.is_admin,
        }
        return JsonResponse(response)
    
    response['code'] = 404
    response['message'] = 'Invalid request!!!'
    return JsonResponse(response)

@csrf_exempt
def logout_user(request):
    if request.method == 'POST':
        senderId = request.POST.get('sender_id')
        sender = Account.object.filter(id=senderId).first()
        
        if sender is None: 
            return JsonResponse({'message':'Unauthorize!!!'})
        
        logout(request)
        return JsonResponse({'message':'Success!!!'})
    return JsonResponse({'message':'Invalid request!!!'})