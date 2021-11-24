from os import error
from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from onlinejudge.models import *
from account.models import Account
from onlinejudge.themis_backend import ThemisBackend

# Create your views here.

def user_logged_in(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        sender = Account.object.filter(id=user_id).first()
        if sender is None or (not sender.is_authenticated):
            return False 
        return True
    elif request.method == 'GET':
        user_id = request.GET.get('user_id')
        sender = Account.object.filter(id=user_id).first()
        if sender is None or (not sender.is_authenticated):
            return False 
        return True
    return False

@csrf_exempt
def problems(request):
    response = {
        'code': '1',
        'message': 'Success',
        'data': [],
    }
    
    if not user_logged_in(request):
        response['code'] = 0
        response['message'] = 'Unauthorize!!!'
        return JsonResponse(response)
    
    
    if request.method == 'GET':
        Record.object.refresh_record()
        userId = request.GET.get('user_id')
        user = Account.object.filter(id=userId).first()

        if not user is None:
            records = Record.object.get_record_from_user(user)
            for record in records:
                problem = record.problem
                data = {
                    'id': problem.id,
                    'creator': {
                        'id': problem.creator.id,
                        'username': problem.creator.username,
                        'fullname': problem.creator.fullname,
                    },
                    'title': problem.problem_title,
                    'themis_name': problem.name_in_themis,
                    'max_point': problem.max_score,
                    'point': record.user_point,
                }

                response['data'].append(data)
            return JsonResponse(response)
        else:
            response['code'] = '0'
            response['message'] = 'Unsuccess'
            return JsonResponse(response)
    else:
        return JsonResponse({'message': 'Invalid request!!!'})


@csrf_exempt
def createProblems(request):
    response = {
        'code': 1,
        'message': 'Success',
        'data' : {},
    }
    
    if not user_logged_in(request):
        response['code'] = 0
        response['message'] = 'Unauthorize!!!'
        return JsonResponse(response)
    
    if request.method == 'POST':
        creatorId = request.POST.get('user_id')
        title = request.POST.get('title')
        name_in_themis = request.POST.get('name_in_themis')
        content = request.POST.get('content')
        max_point = request.POST.get('point')
        time_limit = request.POST.get('time_limit')
        mem_limit = request.POST.get('memory_limit')
        creator = Account.object.filter(id=creatorId).first()
        if not creator is None:
            new_problem = Problem.object.create_problem(title=title,
                                                        name=name_in_themis,
                                                        creator=creator,
                                                        content=content,
                                                        max_score=max_point,
                                                        time_limit=time_limit,
                                                        memory_limit=mem_limit)
            if new_problem is None:
                return JsonResponse({'message': 'There\'s some field empty! Let\'s check again'})

            response['data'] = {
                'user_id': creatorId,
                'title': title,
                'content': content,
                'max_point': max_point,
                'time_limit': time_limit,
                'memory_limit': mem_limit,
            }

            return JsonResponse(response)
        else:
            return JsonResponse({'message': 'Invalid user_id!'})
    else:
        return JsonResponse({'message': 'Invalid request!!!'})


def ranking(request):
    response = {
        'code': 1,
        'message': 'Success!',
        'data': [],
    }
    
    if not user_logged_in(request):
        response['code'] = 0
        response['message'] = 'Unauthorize!!!'
        return JsonResponse(response)
    
    if request.method == 'GET':
        users = Account.object.filter(is_active=True, is_admin=False)
        for user in users:
            records = Record.object.get_record_from_user(user)
            totalPoint = 0
            for record in records:
                totalPoint += record.user_point
            data = {
                'user_id': user.id,
                'username': user.username,
                'name': user.fullname,
                'point': totalPoint
            }
            response['data'].append(data)
        return JsonResponse(response)
    else:
        return JsonResponse()

@csrf_exempt
def submit_problems(request):
    response = {
        'code': 1,
        'message': 'Success!',
        'data': {},
    }
    if not user_logged_in(request):
        response['code'] = 0
        response['message'] = 'Unauthorize!!!'
        return JsonResponse(response)
    
    if request.method == 'POST':
        #parameter
        problem_id = request.POST.get('problem_id')
        user_id = request.POST.get('user_id')
        language = request.POST.get('lang')
        solution = request.POST.get('solution')
        
        submission = Submission.object.create_submission(problem_id, user_id, language, solution)
        
        if submission is None:
            response['code'] = 0
            response['message'] = 'There\'s some field missing'
            return JsonResponse(response)
        
        #give for themis backend to submit and get result 
        ThemisBackend.submit_problem(ThemisBackend, submission)
        return JsonResponse({'message':"Success"})
    return JsonResponse()
