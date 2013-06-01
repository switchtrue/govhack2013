var skywhale_img = "/static/images/skywhale.png";

var skywhale = {
  skywhale_div: undefined
, animationTimerId: undefined
, launchTimerId: undefined
, floatDirectionFavour: 'left'
, launch: function() {
    $('body').append('<div id="skywhale"><img src="/static/images/skywhale.png" alt="Canberra Skywhale" /></div>');
    skywhale.skywhale_div = $('#skywhale');
    skywhale.skywhale_div.css('left', (Math.random() * 100) + '%');
    skywhale.skywhale_div.css('top', '100%');

    if (Math.random() < 0.5) {
      floatDirectionFavour = 'left';
    } else {
      floatDirectionFavour = 'right';
    }

    skywhale.animationTimerId = setInterval(function () {
    
      if (skywhale.skywhale_div.position().top <= (0 - skywhale.skywhale_div.height())) {
        clearInterval(skywhale.animationTimerId);
        skywhale.skywhale_div.remove();
        skywhale.launchTimerId = setTimeout(skywhale.launch, 60000);
        return;
      }

      var topPercentage = (skywhale.skywhale_div.position().top / $(window).height()) * 100;
      skywhale.skywhale_div.css('top', (topPercentage - 0.1) + '%');

      var left = skywhale.skywhale_div.position().left;

      if (floatDirectionFavour == 'left') {
        if (Math.random() < 0.8) {
          skywhale.skywhale_div.css('left', (left - (Math.random() * 1.5)) + 'px');       
        } else {
          skywhale.skywhale_div.css('left', (left + (Math.random() * 1)) + 'px');
        }  
      } else {
        if (Math.random() < 0.8) {
          skywhale.skywhale_div.css('left', (left + (Math.random() * 1.5)) + 'px');       
        } else {
          skywhale.skywhale_div.css('left', (left - (Math.random() * 1)) + 'px');
        }  
      }
    }, 10);
  }
, hide: function() {
    clearTimeout(skywhale.launchTimerId);
    clearInterval(skywhale.animationTimerId);
    if (skywhale.skywhale_div) {
      skywhale.skywhale_div.remove();
    }
  }
}


