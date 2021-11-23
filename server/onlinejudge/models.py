from typing import List
from django.db import models
from django.db.models import signals
from django.db.models.deletion import CASCADE
from django.dispatch import receiver
from django.db.models.signals import post_save
from account.models import Account

# Create your models here.

# Problem model and manager


class ProblemManager(models.Manager):
    def create_problem(self, title, name, creator, content, max_score, time_limit, memory_limit, *args, **kwargs):
        if title is None:
            return None
        if content is None:
            return None
        if name is None:
            return None
        problem = self.model(
            creator=creator,
            problem_title=title,
            name_in_themis=name,
            problem_content=content,
            max_score=max_score if not max_score is None else 100,
            time_limit=time_limit,
            memory_limit=memory_limit
        )
        problem.save()
        Record.object.refresh_record()
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


class Submission(models.Model):
    problem = models.ForeignKey(Problem, on_delete=CASCADE)
    user = models.ForeignKey(Account, on_delete=CASCADE)
    user_point = models.IntegerField()

# Record Model and manager


class RecordManager(models.Manager):
    def get_record_from_user(self, user):
        records = list(self.filter(user=user).first())
        return records
    
    def refresh_record(self):
        users = Account.object.filter(is_active=True)
        problems = Problem.object.all()
        for user in users:
            for problem in problems:
                record = self.filter(user=user, problem=problem)
                if record is None:
                    self.create(problem=problem, user=user)

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
