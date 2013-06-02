// Config
var TILE_TARGET_SELECTOR = '#tile-display';
var TILE_TARGET_SELECTOR_LEFT = '#tile-display-left';
var TILE_TARGET_SELECTOR_RIGHT = '#tile-display-right';

// Templates


// Scroll vars
var scrollDuration = 100;
var backToTopDuration = 50;
var scrollPosition = 0;
var scrollTimerId, scrollPerMs, scrollToPosition;
var insertLeft = true;

var storyapi = {
  get_story: function(year) {

    $('#loading-text').css('color', 'black');
    $('#loading-text').html('Writing your story, please wait...');
    $('#loadpen').css('display', 'block');
    $('#loading-container').css('display', 'block');

    skywhale.hide();

    $.ajax({
      type: 'GET'
      , url: '/tell-me-a-story/' + year
      , crossDomain: false
      , success: function(response, status, xhr) {
          storyapi.process_story(response);
          $('#loading-container').css('display', 'none');
          storyapi.begin_story();
        }
      , error: function() {
        $('#loading-text').css('color', 'red');
        $('#loading-text').html('Uh-oh! The story writer has given up!<br/> Try another story.');
        $('#loadpen').css('display', 'none');
      }
      });
    }
, process_story: function(story) {

    $(TILE_TARGET_SELECTOR_LEFT).html('');
    $(TILE_TARGET_SELECTOR_RIGHT).html('');

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
        , max_temp: tile.max_temp
        , min_temp: tile.min_temp
        , min_temp_month: tile.min_temp_month
        , most_rainfall_month: tile.most_rainfall_month
        }
        var html = Mustache.to_html(WEATHER_TEMPLATE, tile_data);  
        $(TILE_TARGET_SELECTOR_RIGHT).prepend(html);
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

        var html = Mustache.to_html(DEMOGRAPHIC_TEMPLATE, tile_data);  
        $(TILE_TARGET_SELECTOR_LEFT).prepend(html);
      }

      if (tile.type == 'image') {
        var tile_data = {
          image_url: tile.image_url
        , caption: tile.caption
        }
        storyapi.add_tile(IMAGE_TEMPLATE, tile_data);
      }

      if (tile.type == 'article') {
        var tile_data = {
          id: tile.id
        , heading: tile.heading
        , image_url: tile.image_url
        }
        storyapi.add_tile(ARTICLE_TEMPLATE, tile_data);
      }
    }
  }
, add_tile: function(template, data) {
    var html = Mustache.to_html(template, data);  

    if (insertLeft) {  
      $(TILE_TARGET_SELECTOR_LEFT).append(html);
      insertLeft = false;
    } else {
      $(TILE_TARGET_SELECTOR_RIGHT).append(html);
      insertLeft = true;
    }
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
, back_to_top: function() {
    
    scrollToPosition = 0;
    scrollPerMs = document.body.scrollTop / scrollDuration;

    scrollPosition = document.body.scrollTop;

    scrollTimerId = setInterval(function () {
      if (scrollPosition <= scrollToPosition) {
        clearInterval(scrollTimerId);
      } else {
        scrollPosition -= scrollPerMs;
        window.scrollTo(0, scrollPosition);  
      }
    }, 1);

    return false;
  }
}





$(document).ready(function() {
  $('#story-year').change(function() {
    storyapi.get_story($(this).val());
  });

  $(window).scroll(function() {
    if (document.body.scrollTop > 0) {
      $('#back-to-top').removeClass('ghost');
    } else {
      $('#back-to-top').addClass('ghost');
    }
  })

  skywhale.launchTimerId = setTimeout(skywhale.launch, 60000);
});