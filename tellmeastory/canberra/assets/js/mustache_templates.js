var EVENT_TEMPLATE = 
  '<div class="tile event">'+
    '<h2><img src="/static/images/DIDYOUKNOW.png" />Did You Know?</h2>' + 
    '<div class="tile-content">' +
    '  <p>{{ message }}<p/>' +
    '</div>' +
  '</div>';

var YOUTUBE_TEMPLATE =
  '<div class="tile youtube">' +
    '<h2><img src="/static/images/VIDEO.png" /> YouTube</h2>' + 
    '<div class="tile-content">' +
      '<iframe width="300" height="225" src="{{embed_url}}" frameborder="0" allowfullscreen></iframe>' +
    '</div>' +
  '</div>';

var IMAGE_TEMPLATE =
  '<div class="tile youtube">' +
    '<h2><img src="/static/images/CAMERA.png" />Photo</h2>' + 
    '<div class="tile-content">' +
      '<img src="{{image_url}}" width="100%" alt="{{caption}}" title="{{caption}}" />' +
    '</div>' +
  '</div>';

var WEATHER_TEMPLATE =
   '<div class="tile weather">' +
    '<h2><img src="/static/images/WEATHER.png" />Weather</h2>' + 
    '<div class="tile-content" style="text-align: center;">' +
    '  <img src="/static/images/SUMMER.png" />' + 
    '  <p>The hottest month in summer that year was {{max_temp_month}} at {{max_temp}} degrees and...</p>' +
    '  <img src="/static/images/WINTER.png" />' + 
    '  <p>the coldest month in winter that year was {{min_temp_month}} at {{min_temp}} degrees.</p>' +
    '  <img src="/static/images/RAIN.png" />' + 
    '  <p>It rained the most in {{most_rainfall_month}}.</p>' +
    '</div>' +
  '</div>';

var DEMOGRAPHIC_TEMPLATE =
  '<div class="tile demographic">' +
    '<h2><img src="/static/images/PEOPLE.png" />Demographic</h2>' + 
    '<div class="tile-content">' +
      '<div>' +
      '<p>There were more {{max_gender}}s than {{min_gender}}s and...</p>' +
      '</div class="clearfix">' +
      '<img src="/static/images/FEMALE.png" style="float: left;" /><img src="/static/images/MALE.png" style="float: right;" />' + 
      '<div class="clearfix">' +
      '<p>their average ages were {{avg_female_age}} for women and {{avg_male_age}} for men.</p>' +
      '</div>' +
      '<div class="pad clearfix">' +
      '<img style="float: left;" src="/static/images/BABY.png" />' + 
      '<p style="margin-top: 65px;">{{birth_count}} beautiful canberrans entered the world and...</p>' +
      '</div>' +
      '<div style="text-align: center;">' +
      '<img src="/static/images/FAMILY.png" />' + 
      '<p>made the common canberran family consist of {{avg_family_size}} people with...</p>' +
      '</div>' +
      '<div class="pad clearfix">' +
      '<img style="float:left;" src="/static/images/WEDDING.png" />' + 
      '<p style="margin-top: 85px;">most getting married at the age of {{avg_marriage_age}}.</p>' +
      '</div>' +
    '</div>' + 
  '</div>';

  var ARTICLE_TEMPLATE = 
    '<div class="tile article">' + 
      '<h2><img src="/static/images/NEWSPAPER.png" />Article</h2>' +
      '<div class="tile-content">' +
        '<p>{{heading}}</p>' +
        '<img src="{{image_url}}" width="100%" alt="{{heading}}" />' +
      '</div>' +
    '</div>'

  var GOVHACKINFO_TEMPLATE = 
    '<div class="tile govhack">' + 
      '<h2><img src="/static/images/GOVHACK.png" />GovHack</h2>' +
      '<div class="tile-content">' +
        '<p>This project was developed by Mike Leonard, Emily Reid, Simon Schwartz as part of GovHack 2013 in Canberra. Code released on <a href="https://github.com/mleonard87/govhack2013" target="_blank">GitHub</a> under an MIT open source license. Please check with the respective owners for licensing and copyright terms for content loaded from mashed up data sources.</p>' +
      '</div>' +
    '</div>'