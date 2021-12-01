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
        senderId = request.POST.get('sender_id')
        sender = Account.object.filter(id=senderId).first()
        if sender is None or (not sender.is_authenticated):
            return False
        return True
    elif request.method == 'GET':
        senderId = request.GET.get('sender_id')
        sender = Account.object.filter(id=senderId).first()
        if sender is None or (not sender.is_authenticated):
            return False
        return True
    return False


def getProblemDataFromRecord(record):
    problem = record.problem

    creator = {
        'id': problem.creator.id,
        'username': problem.creator.username,
        'fullname': problem.creator.fullname,
    }

    data = {
        'id': problem.id,
        'creator': creator,
        'title': problem.problem_title,
        'themis_name': problem.name_in_themis,
        'content': problem.problem_content,
        'max_point': problem.max_score,
        'point': record.user_point,
        'time_limit': record.problem.time_limit,
        'memory_limit': record.problem.memory_limit
    }

    return data


@csrf_exempt
def problems(request):
    response = {
        'code': '1',
        'message': 'Success',
        'data': [],
    }

    if not user_logged_in(request):
        response['code'] = 403
        response['message'] = 'Unauthorize!!!'
        return JsonResponse(response)

    if request.method == 'GET':
        Record.object.refresh_record()
        user_id = request.GET.get('sender_id')
        problem_id = request.GET.get('problem_id')

        user = Account.object.filter(id=user_id).first()

        if not user is None:
            # Check if user request a problem
            if not problem_id is None:
                problem = Problem.object.filter(id=problem_id).first()
                record = Record.object.filter(
                    problem=problem, user=user).first()

                response['data'] = getProblemDataFromRecord(record=record)
                return JsonResponse(response)

            records = Record.object.get_record_from_user(user)
            for record in records:
                data = getProblemDataFromRecord(record=record)
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
        'data': {},
    }

    if not user_logged_in(request):
        response['code'] = 403
        response['message'] = 'Unauthorize!!!'
        return JsonResponse(response)

    if request.method == 'POST':
        creatorId = request.POST.get('sender_id')
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

            # If there's any error on create a problem, it return a string
            if type(new_problem) == str:
                response['code'] = 0
                response['message'] = new_problem
                response['data'] = None
                return JsonResponse(response)

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

    response['code'] = 404
    response['message'] = 'Invalid request!!!'
    return JsonResponse(response)


def ranking(request):
    response = {
        'code': 1,
        'message': 'Success!',
        'data': [],
    }

    if not user_logged_in(request):
        response['code'] = 403
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
                'id': user.id,
                'username': user.username,
                'fullname': user.fullname,
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
        response['code'] = 403
        response['message'] = 'Unauthorize!!!'
        return JsonResponse(response)

    if request.method == 'POST':
        # parameter
        problem_id = request.POST.get('problem_id')
        user_id = request.POST.get('sender_id')
        language = request.POST.get('lang')
        solution = request.POST.get('solution')

        submission = Submission.object.create_submission(
            problem_id, user_id, language, solution)
        
        if type(submission) == str:
            response['code'] = 0
            response['message'] = submission
            return JsonResponse(response)

        # give for themis backend to submit and get result
        ThemisBackend.submit_problem(ThemisBackend, submission)
        return JsonResponse(response)

    response['code'] = 0
    response['message'] = 'Invalid request!'
    return JsonResponse(response)


def getSubmissionData(submissions):
    data = []
    for submisison in submissions:
        submitData = {
            'id': submisison.id,
            'problem': {
                'id': submisison.problem.id,
                'title': submisison.problem.problem_title,
            },
            'user': {
                'id': submisison.user.id,
                'username': submisison.user.username,
                'fullname': submisison.user.fullname,
                'is_admin': submisison.user.is_admin
            },
            'result': submisison.user_point,
            'lang': submisison.language,
            'time': submisison.time,
            'memory': submisison.memory,
        }

        data.append(submitData)
    return data[::-1]


@csrf_exempt
def get_list_submission(request):
    response = {
        'code': 1,
        'message': 'Success!',
        'data': [],
    }
    if not user_logged_in(request):
        response['code'] = 403
        response['message'] = 'Unauthorize!!!'
        return JsonResponse(response)

    if request.method == 'GET':
        problem_id = request.GET.get('problem_id')

        if not problem_id is None:
            problem = Problem.object.filter(id=problem_id).first()
            submissions = list(Submission.object.filter(problem=problem))

            response['data'] = getSubmissionData(submissions)
            return JsonResponse(response)

        submissions = list(Submission.object.all())
        response['data'] = getSubmissionData(submissions)

        return JsonResponse(response)

    response['code'] = 404
    response['message'] = 'Invalid request!!!'
    return JsonResponse(response)
