from django.db import models

class Event(models.Model):
    year = models.IntegerField(max_length=4)
    message = models.TextField()

class Temperature(models.Model):
    station_id = models.CharField(max_length=10)
    station_name = models.CharField(max_length=10)
    latitude = models.DecimalField(max_digits=10, decimal_places=2)
    longitude = models.DecimalField(max_digits=10, decimal_places=2)
    elevation = models.IntegerField(max_length=10)
    state = models.CharField(max_length=10)
    year = models.CharField(max_length=10)
    month = models.CharField(max_length=10)
    day = models.CharField(max_length=10)
    minimum = models.DecimalField(max_digits=10, decimal_places=2)
    maximum = models.DecimalField(max_digits=10, decimal_places=2)

class Rainfall(models.Model):
    station_id = models.CharField(max_length=10)
    station_name = models.CharField(max_length=10)
    latitude = models.DecimalField(max_digits=10, decimal_places=2)
    longitude = models.DecimalField(max_digits=10, decimal_places=2)
    elevation = models.IntegerField(max_length=10)
    state = models.CharField(max_length=10)
    year = models.CharField(max_length=10)
    month = models.CharField(max_length=10)
    day = models.CharField(max_length=10)
    rainfall = models.DecimalField(max_digits=10, decimal_places=2)

class Population(models.Model):
    year = models.IntegerField(max_length=4)
    male = models.IntegerField(max_length=20)
    female = models.IntegerField(max_length=10)
    total = models.IntegerField(max_length=10)