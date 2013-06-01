// Config
var TILE_TARGET_SELECTOR = '#tile-display';

// Templates


// Scroll vars
var scrollDuration = 100;
var scrollPosition = 0;
var scrollTimerId, scrollPerMs, scrollToPosition;

var storyapi = {
  get_story: function(year) {

    $('#loading-story').css('display', 'block');

    $.ajax({
      type: 'GET'
      , url: '/tell-me-a-story/' + year
      , crossDomain: false
      , success: function(response, status, xhr) {
          storyapi.process_story(response);
          $('#loading-story').css('display', 'none');
          storyapi.begin_story();
        }
      });
    }
, process_story: function(story) {

    $(TILE_TARGET_SELECTOR).html('');

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
        , most_rainfall_month: tile.most_rainfall_month
        }
        storyapi.add_tile(WEATHER_TEMPLATE, tile_data);
      }

      if (tile.type == 'youtube') {
        var tile_data = {
          embed_url: tile.embed_url
        }
        storyapi.add_tile(YOUTUBE_TEMPLATE, tile_data);
      }

      if (tile.type == 'demographic') {
        var tile_data = {
          max_gender: tile.max_gender
        , min_gender: tile.min_gender
        , avg_female_age: tile.avg_female_age
        , avg_male_age: tile.avg_male_age
        , birth_count: tile.birth_count
        , avg_family_size: tile.avg_family_size
        , avg_marriage_age: tile.avg_marriage_age
        }
        storyapi.add_tile(DEMOGRAPHIC_TEMPLATE, tile_data);
      }

    }
  }
, add_tile: function(template, data) {
    var html = Mustache.to_html(template, data);
    $(TILE_TARGET_SELECTOR).append(html);
  }

, begin_story: function() {
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





$(document).ready(function() {
  $('#story-year').change(function() {
    storyapi.get_story($(this).val());
  });
});

