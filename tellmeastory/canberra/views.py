from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.utils import simplejson
from django.http import HttpResponse
from django.db.models import Avg, Sum, Max
from django.conf import settings
from django.core.cache import cache
from canberra.models import *
from random import shuffle
import urllib2
import xml.etree.ElementTree as et

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
    photo_count = 0
    photos = Photo.objects.filter(start_date=str(year))
    for photo in photos:
        photo_count += 1
        if photo_count <= settings.MAX_PHOTOS:
            photo_dict = {
                'type': 'image',
                'image_url': photo.large_image_url,
                'caption': photo.title,
                }
            story_tiles.append(photo_dict)

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
            try:
                avg_minimum = round(temp['minimum__avg'], 2)
                avg_minimum_month = i
            except TypeError: 
                pass
        temp = Temperature.objects.filter(station_name='Canberra', year=year, month=i).aggregate(Avg('maximum'))
        if temp['maximum__avg'] >= avg_maximum:
            try:
                avg_maximum = round(temp['maximum__avg'], 2)
                avg_maximum_month = i
            except TypeError: 
                pass
        temp = Rainfall.objects.filter(station_name='Canberra', year=year, month=i).aggregate(Avg('rainfall'))
        if temp['rainfall__avg'] >= avg_maximum_rainfall:
            try:
                avg_maximum = round(temp['rainfall__avg'], 2)
                avg_maximum_rainfall_month = i
            except TypeError: 
                pass

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

    # Dont have data for all years so get the most recent year before the target year
    usable_year = Age.objects.filter(year__lte=year).aggregate(Max('year'))['year__max']

    try:
        birth_record = Age.objects.get(year=usable_year, age=0) 
        birth_count = birth_record.male + birth_record.female
    except Age.DoesNotExist:
        birth_count = 1 

    ages = Age.objects.filter(year=usable_year)
    male_count = 0
    male_total_age = 0
    female_count = 0
    female_total_age = 0
    for age in ages:
        male_count += age.male
        male_total_age += (age.age * age.male)
        female_count += age.female
        female_total_age += (age.age * age.female)

    usable_year = FamilySize.objects.filter(year__lte=year).aggregate(Max('year'))['year__max']
    child_count = 1
    total_children = 1
    for family_size in FamilySize.objects.filter(year=usable_year):
        child_count += family_size.child_count
        total_children += (family_size.child_count * family_size.age)

    usable_year = Marriage.objects.filter(year__lte=year).aggregate(Max('year'))['year__max']
    marriage_count = 1
    total_marriage_people = 1
    for marriage in Marriage.objects.filter(year=usable_year):
        marriage_count += marriage.total
        total_marriage_people += (marriage.total * marriage.age)

    demographic_dict = {
        'type': 'demographic',
        'max_gender': max_gender,
        'min_gender': min_gender,
        'avg_female_age': (female_total_age / female_count),
        'avg_male_age': (male_total_age / male_count),
        'birth_count': birth_count,
        'avg_family_size': round((float(total_children) / float(child_count)) + 2, 2),
        'avg_marriage_age': round((float(total_marriage_people) / float(marriage_count)) + 2),
        }

    story_tiles.append(demographic_dict)

    # Trove
    # ------------

    trove_query_url = 'http://api.trove.nla.gov.au/result?key=%s&zone=newspaper&q=canberra%%20%s&encoding=json' % (settings.TROVE_API_KEY, year)
    response = urllib2.urlopen(trove_query_url)
    trove_json = simplejson.load(response)
    articles = trove_json.get('response').get('zone')[0].get('records').get('article')

    article_count = 0
    for article in articles:
        article_count += 1
        if article_count <= settings.MAX_ARTICLES:
            cache_key = 'article_image_%s' % article.get('id')
            image_src = cache.get(cache_key)
            if not image_src:
                print 'image_src cache miss'
                image_page_url = 'http://trove.nla.gov.au/ndp/del/printArticleJpg/%s/3?print=n' % article.get('id')
                response = urllib2.urlopen(image_page_url)
                page_xml = et.parse(response)
                image_src = dict((page_xml.findall('.//img')[0]).items())['src']
                cache.set(cache_key, image_src, 86400)
            else:
                print 'image_src cache hit!'

            article_dict = {
                'type': 'article',
                'id': article.get('id'),
                'heading': article.get('heading'),
                'image_url': 'http://trove.nla.gov.au%s' % image_src,
                }
            story_tiles.append(article_dict)

    shuffle(story_tiles)

    story_dict = {'tiles': story_tiles}
    json = simplejson.dumps(story_dict)
    return HttpResponse(json, content_type='application/json')




