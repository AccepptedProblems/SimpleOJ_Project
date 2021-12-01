from django.db import models
from django.db.models.deletion import CASCADE
from account.models import Account
from django import db
# Create your models here.

# Problem model and manager

def checkNone(value):
    return value is None or value == ''

class ProblemManager(models.Manager):
    def save(problem):
        problem.save()
    
    def create_problem(self, title, name, creator, content, max_score, time_limit, memory_limit, *args, **kwargs):
        if checkNone(title):
            return "Missing title!!!"
        if checkNone(content):
            return "Missing content!!!"
        if checkNone(name) or not self.filter(name_in_themis=name).first() is None:
            return "Missing name or name existed!!!"
        
        problem = self.model(
            creator=creator,
            problem_title=title,
            name_in_themis=name,
            problem_content=content,
            max_score=max_score if not max_score is None else 100,
            time_limit=time_limit,
            memory_limit=memory_limit
        )
        return problem


class Problem(models.Model):
    creator = models.ForeignKey(Account, on_delete=CASCADE, default=None)
    name_in_themis = models.TextField(default='')
    problem_title = models.TextField(null=False, default='')
    problem_content = models.TextField(null=False)
    max_score = models.IntegerField(default=0)
    time_limit = models.IntegerField(default=0)
    memory_limit = models.IntegerField(default=0)
    path_to_test_file = models.FileField(null=False)

    object = ProblemManager()

# Submission Model and manager


class SubmissionManager(models.Manager):
    LANGUGAGE_OPTIONS = [
        'C++',
        'Java',
        'Python',
    ]

    def create_submission(self, problem_id, user_id, lang, solution, *args, **kwargs):
        problem = Problem.object.filter(id=problem_id).first()
        user = Account.object.filter(id=user_id).first()
        
        if checkNone(problem) or checkNone(user) or checkNone(solution):
            return 'There\'s some field missing'

        if not lang in self.LANGUGAGE_OPTIONS:
            return 'Not exist this language'
        
        submission = self.model(
            problem=problem,
            user=user,
            user_point='Pending',
            language=lang,
            solution=solution,
            time=0,
            memory=0,
        )
        submission.save()
        
        return submission


class Submission(models.Model):
    problem = models.ForeignKey(Problem, on_delete=CASCADE)
    user = models.ForeignKey(Account, on_delete=CASCADE)
    user_point = models.TextField(default='')
    solution = models.TextField(default='')
    language = models.CharField(max_length=100, default="")
    time = models.FloatField(default=0.0)
    memory = models.FloatField(default=0.0)

    object = SubmissionManager()

# Record Model and manager


class RecordManager(models.Manager):
    def get_record_from_user(self, user):
        records = list(self.filter(user=user))
        return records

    def refresh_record(self):
        users = Account.object.filter(is_active=True)
        problems = Problem.object.all()
        for user in users:
            for problem in problems:
                record = self.filter(user=user, problem=problem).first()
                if record is None:
                    self.create_record(problem=problem, user=user, point=0)

    def create_record(self, problem, user, point):
        if (problem is None) or (user is None) or (point is None):
            return None

        new_record = self.model(
            problem=problem,
            user=user,
            user_point=point,
        )

        new_record.save()
        return new_record


class Record(models.Model):
    problem = models.ForeignKey(Problem, on_delete=CASCADE)
    user = models.ForeignKey(Account, on_delete=CASCADE)
    user_point = models.IntegerField()

    object = RecordManager()
