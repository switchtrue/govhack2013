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
    female = models.IntegerField(max_length=20)
    total = models.IntegerField(max_length=10)

class Youtube(models.Model):
    year = models.IntegerField(max_length=4)
    embed_url = models.CharField(max_length=200)

class Photo(models.Model):
    barcode = models.CharField(max_length=500)
    title = models.CharField(max_length=500)
    start_date = models.CharField(max_length=500)
    archives_location = models.CharField(max_length=500)
    large_image_url = models.CharField(max_length=500)
    small_image_url = models.CharField(max_length=500)