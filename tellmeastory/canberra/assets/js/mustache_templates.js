var EVENT_TEMPLATE = 
  '<div class="tile event">'+
    '<h2>Did You Know?</h2>'+
    '<div class="tile-content">' +
    '  <p>{{ message }}<p/>' +
    '</div>' +
  '</div>';

var YOUTUBE_TEMPLATE =
  '<div class="tile youtube">' +
    '<h2>YouTube</h2>' +
    '<div class="tile-content">' +
      '<iframe width="420" height="315" src="{{embed_url}}" frameborder="0" allowfullscreen></iframe>' +
    '</div>' +
  '</div>';

var IMAGE_TEMPLATE =
  '<div class="tile youtube">' +
    '<h2>YouTube</h2>' +
    '<div class="tile-content">' +
      '<img src="{{ image_url }}" alt="{{ image_caption }}" />' +
    '</div>' +
  '</div>';

var WEATHER_TEMPLATE =
   '<div class="tile weather">' +
    '<h2>Weather</h2>' +
    '<div class="tile-content">' +
    '  <p>The hottest month in summer that year was {{max_temp_month}} degrees and...</p>' +
    '  <p>The coldest month in winter that year was {{min_temp_month}} degrees.</p>' +
    '  <p>It rained the most in {{most_rainfall_month}}.</p>' +
    '</div>' +
  '</div>';

var DEMOGRAPHIC_TEMPLATE =
  '<div class="tile demographic">' +
    '<h2>Demographic</h2>' +
    '<div class="tile-content">' +
      '<p>There were more {{max_gender}} than {{min_gender}} and their average ages were...</p>' +
      '<p>{{avg_female_age}} for women and {{avg_male_age}} for men.</p>' +
      '<p>{{birth_count}} beautiful canberrans entered the world and...</p>' +
      '<p>made the common canberran family consist of {{avg_family_size}} with...</p>' +
      '<p>most people getting married at the age of {{avg_marriage_age}}.</p>' +
    '</div>' + 
  '</div>';