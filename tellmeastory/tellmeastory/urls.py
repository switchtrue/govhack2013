from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^tell-me-a-story/(?P<year>[0-9]{0,4})$', 'canberra.views.tell_me_a_story', name='tell_me_a_story'),
    url(r'^$', 'canberra.views.home', name='home'),
)
