from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.utils import simplejson
from django.http import HttpResponse
from canberra.models import *

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

        story_dict = {'tiles': story_tiles}

    json = simplejson.dumps(story_dict)
    return HttpResponse(json, content_type='application/json')