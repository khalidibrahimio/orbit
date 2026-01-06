from django.db import models

class Task(models.Model):
  task_id = models.AutoField(primary_key=True)
  name = models.TextField(null=False)
  description = models.TextField(null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  # status = models.TextField(default="pending", null=False)

class Orbit(models.Model):
  orbit_id = models.AutoField(primary_key=True)
  name = models.TextField(null=False)
  created_at = models.DateTimeField(auto_now_add=True)
  estimated_cycles = models.IntegerField(default=2, null=False)

class Cycle(models.Model):
  STATUS_CHOICES = [
			("in_progress", "In Progress"),
			("completed", "Completed"),
      ("paused", "Paused"),
	]
  cycle_id = models.AutoField(primary_key=True)
  start_time = models.DateTimeField(default=None, null=False)
  end_time = models.DateTimeField(default=None, null=True)
  work_duration = models.TimeField(default=None, null=False)     # in HH:MM:SS
  rest_duration = models.TimeField(default=None, null=False)     # in HH:MM:SS
  created_at = models.DateTimeField(auto_now_add=True)
  orbit_id = models.ForeignKey(Orbit, on_delete=models.CASCADE, null=False)
  task_id = models.ForeignKey(Task, on_delete=models.CASCADE, null=False)
  status = models.TextField(choices=STATUS_CHOICES, default="in_progress", null=False)
  

