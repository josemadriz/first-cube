define(function (require) {
  var $ = require('jquery');
  var auto = true,
      xAngle = 0, yAngle = 0,
      transform = 'rotateX(${xAngle}deg) rotateY(${yAngle}deg)';

  var toggleMode = function (playMode) {
    if (playMode) play();
    else stop();
  };

  var play = function () {
    $('a').html('stop');
    $('#cube').on('webkitTransitionEnd', function() {
      applyRandomTransform();
    });
    applyRandomTransform();
  };

  var stop = function () {
    $('a').html('play');
    $('#cube').off('webkitTransitionEnd');
  }

  var applyTransform = function (newX, newY) {
    var transformed;
    xAngle = newX;
    yAngle = newY;
    transformed = transform
      .replace('${xAngle}', xAngle)
      .replace('${yAngle}', yAngle);
    $('#cube').css('webkitTransform', transformed)
  };

  var applyRandomTransform = function () {
    var newX, newY;
    newX = randomAngle() * randomDir();
    newY = randomAngle() * randomDir();
    if ((newX === xAngle) && (newY === yAngle)) applyRandomTransform()
    else {
      applyTransform(newX, newY)
    }
  };

  var randomAngle = function () {
    return coinFlip(0, 90);
  };

  var randomDir = function () {
    return coinFlip(-1, 1);
  };

  var coinFlip = function (heads, tails) {
    return function () {
      return Math.random() < 0.5 ? heads : tails;
    }();
  };

  $(function () {

    toggleMode(auto);

    $('a').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMode(auto = !auto);
    });

    $('body').keydown(function (e) {
      var newX = xAngle, newY = yAngle;
      switch(e.keyCode) {
        case 37:
        newY -= 90;
        break;
        case 38:
        newX -= 90;
        break;
        case 39:
        newY += 90;
        break;
        case 40:
        newX += 90;
        break;
      }
      if ((newX !== xAngle) || newY !== yAngle) stop();
      applyTransform(newX, newY);
    });
  });
});
