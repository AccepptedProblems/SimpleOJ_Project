from os import error
from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from onlinejudge.models import *
from account.models import Account

# Create your views here.



@csrf_exempt
def problems(request):
    listData = {
        'code': '1',
        'message': 'Success',
        'data': [],
    }
    if request.method == 'GET':
        userId = request.GET.get('user_id')
        if not userId is None:
            problems = list(Problem.object.all().values('id', 'creator', 'problem_title', 'problem_content', 'max_score', 'time_limit', 'memory_limit'))

            listData['data'] = problems
            return JsonResponse(listData)
        else:
            listData['code'] = '0'
            listData['message'] = 'Unsuccess'
            return JsonResponse(listData)
    else:
        return JsonResponse({'message': 'Invalid request!!!'})


@csrf_exempt
def createProblems(request):
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
                                                         name = name_in_themis,
                                                         creator=creator,
                                                         content=content,
                                                         max_score=max_point,
                                                         time_limit=time_limit,
                                                         memory_limit=mem_limit)
            if new_problem is None:
                return JsonResponse({'message': 'There\'s some field empty! Let\'s check again'})

            response = {
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
    if request.method == 'GET':
        users = Account.object.filter(is_active=True) 
        for user in users:
            records = Record.object.get_record_from_user(user)
            totalPoint = 0 
            for record in records:
                totalPoint += record.user_point
            data = {
                'user_id': user.id,
                'name': user.fullname, 
                'point': totalPoint
            }
            response['data'].append(data)
        
    
    return JsonResponse()

def submit_problems(request):
    if request.method == 'POST':
        
        return JsonResponse()
    return JsonResponse()