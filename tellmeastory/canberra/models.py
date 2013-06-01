from django.db import models

class Event(models.Model):
  year = models.IntegerField(max_length=4)
  message = models.TextField()