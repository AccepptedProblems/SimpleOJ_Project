# Generated by Django 3.2.9 on 2021-11-21 08:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem_content', models.TextField()),
                ('max_score', models.IntegerField(default=0)),
                ('limit_time', models.IntegerField(default=0)),
                ('limit_memory', models.IntegerField(default=0)),
                ('path_to_test_file', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_score', models.IntegerField()),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onlinejudge.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_score', models.IntegerField()),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onlinejudge.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
