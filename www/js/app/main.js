define(function (require) {
  var $ = require('jquery');
  var auto = true,
      xAngle = 0, yAngle = 0, zAngle = 0,
      transformCount = 0,
      every = 3,
      colorProvider = [
        'rgb(105, 210, 231)',
        'rgb(167, 219, 216)',
        'rgb(224, 228, 204)',
        'rgb(243, 134, 48)',
        'rgb(250, 105, 0)'
      ],
      colors = [],
      transform = 'rotateX(${xAngle}deg) rotateY(${yAngle}deg) rotateZ(${zAngle}deg)';

  var getColors = function () {
    return colorProvider.slice();
  };

  var toggleMode = function () {
    var isAuto = !auto;
    if (isAuto) play();
    else stop();
  };

  var play = function () {
    auto = true;
    $('a.play-mode').html('stop');
    $('#cube').on('webkitTransitionEnd', applyRandomTransform);
    applyRandomTransform();
  };

  var stop = function () {
    auto = false;
    $('a.play-mode').html('play');
    $('#cube').off('webkitTransitionEnd', applyRandomTransform);
    if (xAngle !== 0 || yAngle !== 0 || zAngle !== 0) {
      reset();
    }
  };

  var reset = function () {
    console.log('reset');
    applyTransform(0, 0, 0);
  };

  var changeBackground = function () {
    if (!colors.length) colors = getColors();
    $('body').css('background-color', colors.pop());
  };

  var applyTransform = function (newX, newY, newZ) {
    var transformed;
    xAngle = newX;
    yAngle = newY;
    zAngle = newZ;
    transformed = transform
      .replace('${xAngle}', xAngle)
      .replace('${yAngle}', yAngle)
      .replace('${zAngle}', zAngle);
    $('#cube').css('webkitTransform', transformed);
    transformCount += 1;
    if (transformCount % every === 0) changeBackground();
  };

  var applyRandomTransform = function () {
    var newX, newY;
    newX = randomAngle();
    newY = randomAngle();
    newZ = randomAngle();
    if ((newX === xAngle) && (newY === yAngle) && (newZ === zAngle))
        applyRandomTransform();
    else
      applyTransform(newX, newY, newZ);
  };

  var randomAngle = function () {
    return coinFlip(0, 90) * randomDir();
  };

  var randomDir = function () {
    return coinFlip(-1, 1);
  };

  var coinFlip = function (heads, tails) {
    return Math.random() < 0.5 ? heads : tails;
  };

  $(function () {

    if (auto) play();

    $('#cube').on('webkitTransitionEnd', function () {
      console.log(xAngle, yAngle, zAngle);
    });

    $('a.play-mode').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMode();
    });

    $('a.reset').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (auto) stop();
      reset();
    });

    var up     = 38,
        down   = 40,
        left   = 37,
        right  = 39,
        zLeft  = 65, // A
        zRight = 83; // S

    $('body').keydown(function (e) {
      var newX = xAngle, newY = yAngle, newZ = zAngle;

      switch(e.keyCode) {
        case up:
        newX -= 90;
        break;

        case down:
        newX += 90;
        break;

        case left:
        newY += 90;
        break;

        case right:
        newY -= 90;
        break;

        case zLeft:
        newZ += 90;
        break;

        case zRight:
        newZ -= 90;
        break;
      }
      if ((newX !== xAngle) || newY !== yAngle || newZ !== zAngle) {
        if (auto) stop();
        applyTransform(newX, newY, newZ);
      }
    });
  });
});
