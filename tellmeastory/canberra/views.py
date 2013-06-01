from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.utils import simplejson
from django.http import HttpResponse
from canberra.models import *
from django.db.models import Avg

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
        if temp <= avg_minimum:
            avg_minimum = temp
            avg_minimum_month = i
        temp = Temperature.objects.filter(station_name='Canberra', year=year, month=i).aggregate(Avg('maximum'))
        if temp >= avg_maximum:
            avg_maximum = temp
            avg_maximum_month = i
        temp = Rainfall.objects.filter(station_name='Canberra', year=year, month=i).aggregate(Avg('rainfall'))
        if temp >= avg_maximum_rainfall:
            avg_maximum = temp
            avg_maximum_rainfall_month = i

    months = ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
    weather_dict = {'type': 'weather', 'min_temp_month': months[avg_minimum_month - 1], 'max_temp_month': months[avg_maximum_month - 1], 'most_rainfall_month': months[avg_maximum_rainfall_month - 1]}
    story_tiles.append(weather_dict)

    # Demographic
    # ------------


    demographic_dict = {
          'type': 'demographic'
        , 'max_gender': ''
        , 'min_gender': ''
        , 'avg_female_age': ''
        , 'avg_male_age': ''
        , 'birth_count': ''
        , 'avg_family_size': ''
        , 'avg_marriage_age': ''
    }
    story_tiles.append(demographic_dict)


    story_dict = {'tiles': story_tiles}
    json = simplejson.dumps(story_dict)
    return HttpResponse(json, content_type='application/json')