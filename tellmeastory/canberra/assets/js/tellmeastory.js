// Config
var TILE_TARGET_SELECTOR = '#tile-display';

// Templates
var EVENT_TEMPLATE = '<div class="tile event"><h2>Did You Know?</h2><div class="tile-content"><p>{{ message }}<p/></div></div>';
var YOUTUBE_TEMPLATE = '<div class="tile youtube"><h2>YouTube</h2><div class="tile-content"><iframe width="420" height="315" src="{{embed_url}}" frameborder="0" allowfullscreen></iframe></div></div>';
var IMAGE_TEMPLATE = '<div class="tile youtube"><h2>YouTube</h2><div class="tile-content"><img src="{{ image_url }}" alt="{{ image_caption }}" /></div></div>';
var WEATHER_TEMPLATE = '<div class="tile weather"><h2>Weather</h2><div class="tile-content"><p>The hottest month in summer this year is {{max_temp_month}} degrees and...</p><p>The coldest month in winter this year is {{min_temp_month}} degrees.</p><p>It rained the most in INSERT_RAIN_HERE.</p></div>';




// Scroll vars
var scrollDuration = 100;
var scrollPosition = 0;
var scrollTimerId, scrollPerMs, scrollToPosition;

var storyapi = {
  get_story: function(year) {
    $.ajax({
      type: 'GET'
      , url: '/tell-me-a-story/' + year
      , crossDomain: false
      , success: function(response, status, xhr) {
          storyapi.process_story(response);
        }
      });
    }
, process_story: function(story) {

    var tiles = story.tiles;

    for (var i = 0; i < tiles.length; i++) {
      tile = tiles[i];

      if (tile.type == 'event') {
        var tile_data = {
          message: tile.message
        }
        storyapi.add_tile(EVENT_TEMPLATE, tile_data);
      }

      if (tile.type == 'weather') {
        var tile_data = {
          max_temp_month: tile.max_temp_month
        , min_temp_month: tile.min_temp_month
        }
        storyapi.add_tile(WEATHER_TEMPLATE, tile_data);
      }

      if (tile.type == 'youtube') {
        var tile_data = {
          embed_url: tile.embed_url
        }
        storyapi.add_tile(YOUTUBE_TEMPLATE, tile_data);
      }

    }
  }
, add_tile: function(template, data) {
    var html = Mustache.to_html(template, data);
    $(TILE_TARGET_SELECTOR).append(html);
  }

, beginStory: function() {
    $('body').removeClass('no-scroll');

    scrollToPosition = $('#story-start').position().top - 10;
    scrollPerMs = scrollToPosition / scrollDuration;

    scrollPosition = 0;

    scrollTimerId = setInterval(function () {
      if (scrollPosition >= scrollToPosition) {
        clearInterval(scrollTimerId);
      } else {
        scrollPosition += scrollPerMs;
        window.scrollTo(0, scrollPosition);  
      }
    }, 1);
  }  
}