// Config
var TILE_TARGET_SELECTOR = '#tile-display';

// Templates
var EVENT_TEMPLATE = '<div class="tile event"><h2>Event</h2><div class="tile-content"><p>{{ message }}<p/></div></div>';
var YOUTUBE_TEMPLATE = '<div class="tile youtube"><h2>YouTube</h2><div class="tile-content"><iframe width="420" height="315" src="{{embed_url}}" frameborder="0" allowfullscreen></iframe></div></div>';


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
    scrollToPosition = $(TILE_TARGET_SELECTOR).position().top - 10
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