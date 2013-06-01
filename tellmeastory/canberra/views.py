from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.utils import simplejson
from django.http import HttpResponse
from canberra.models import *
from django.db.models import Avg, Sum
from random import shuffle

def home(request):

    context = {}
    return render_to_response('home.html', context_instance=RequestContext(request, context))

def tell_me_a_story(request, year):

    story_tiles = []

    # Events
    # ------------
    events = Event.objects.filter(year=year)
    for event in events:
        event_dict = {'type': 'event', 'message': event.message}
        story_tiles.append(event_dict)

    # YouTube
    # ------------

    videos = Youtube.objects.filter(year=year)
    for video in videos:
        video_dict = {'type': 'youtube', 'embed_url': video.embed_url}
        story_tiles.append(video_dict)

    # Photos
    # ------------

    photos = Photo.objects.filter(start_date=str(year))
    for photo in photos:
        photo_dict = {
            'type': 'image',
            'image_url': photo.large_image_url,
            'caption': photo.title,
            }
        story_tiles.append(photo_dict)

    shuffle(story_tiles)

    # Weather
    # ------------
    avg_minimum = 999.9
    avg_minimum_month = 0
    avg_maximum = 0.0
    avg_maximum_month = 0
    avg_maximum_rainfall = 0.0
    avg_maximum_rainfall_month = 0
    for i in range(1, 12):
        temp = Temperature.objects.filter(station_name='Canberra', year=year, month=i).aggregate(Avg('minimum'))
        if temp['minimum__avg'] <= avg_minimum:
            avg_minimum = round(temp['minimum__avg'], 2)
            avg_minimum_month = i
        temp = Temperature.objects.filter(station_name='Canberra', year=year, month=i).aggregate(Avg('maximum'))
        if temp['maximum__avg'] >= avg_maximum:
            avg_maximum = round(temp['maximum__avg'], 2)
            avg_maximum_month = i
        temp = Rainfall.objects.filter(station_name='Canberra', year=year, month=i).aggregate(Avg('rainfall'))
        if temp['rainfall__avg'] >= avg_maximum_rainfall:
            avg_maximum = round(temp['rainfall__avg'], 2)
            avg_maximum_rainfall_month = i

    months = ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
    weather_dict = {
        'type': 'weather',
        'min_temp_month': months[avg_minimum_month - 1],
        'min_temp': avg_minimum,
        'max_temp_month': months[avg_maximum_month - 1],
        'max_temp': avg_maximum,
        'most_rainfall_month': months[avg_maximum_rainfall_month - 1],

        }
    story_tiles.append(weather_dict)

    # Demographic
    # ------------
    max_gender = u'male'
    min_gender = u'female'
    try:
        population = Population.objects.get(year=year)
        if population.male < population.female:
            max_gender = 'female'
            min_gender = 'male'
    except Population.DoesNotExist:
        pass

    demographic_dict = {
        'type': 'demographic',
        'max_gender': max_gender,
        'min_gender': min_gender,
        'avg_female_age': '',
        'avg_male_age': '',
        'birth_count': '',
        'avg_family_size': '',
        'avg_marriage_age': '',
        }
    story_tiles.append(demographic_dict)

    story_dict = {'tiles': story_tiles}
    json = simplejson.dumps(story_dict)
    return HttpResponse(json, content_type='application/json')