/**
 * FirstCube
 *
 * The first cube experiment
 *
 * @author leoncoto@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var auto = true,
      xAngle = 0, yAngle = 0, zAngle = 0,
      transformCount = 0,
      every = 5,
      colorProvider = [
        'rgba(105, 210, 231, 0.3)',
        'rgba(167, 219, 216, 0.3)',
        'rgba(224, 228, 204, 0.3)',
        'rgba(243, 134, 48, 0.3)',
        'rgba(250, 105, 0, 0.3)'
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
  };

  var atZeros = function () {
    return xAngle === 0 && yAngle === 0 && zAngle === 0;
  };

  var willChange = function (newX, newY, newZ) {
    return newX !== xAngle || newY !== yAngle || newZ !== zAngle;
  };

  var reset = function () {
    if (!atZeros()) {
      $('#cube').on('webkitTransitionEnd', resetOneStep);
      resetOneStep();
    }
  };

  var resetOneStep = function () {
    var newX, newY, newZ;
    if (atZeros()) $('#cube').off('webkitTransitionEnd', resetOneStep);
    else {
      newX = stepBack(xAngle);
      newY = stepBack(yAngle);
      newZ = stepBack(zAngle);
      applyTransform(newX, newY, newZ);
    }
  };

  var stepBack = function (angle) {
    var newAngle;
    if (angle === 0) newAngle = angle;
    else if (angle > 0) newAngle = angle - 90;
    else if (angle < 0) newAngle = angle + 90;
    return newAngle;
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
    var newX = randomAngle(),
        newY = randomAngle(),
        newZ  = randomAngle();
    if (willChange(newX, newY, newZ))
      applyTransform(newX, newY, newZ);
    else
      applyRandomTransform();
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

    $('a.play-mode').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMode();
    });

    $('a.reset').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
         reset();
    });

    var up     = 38,
        down   = 40,
        left   = 37,
        right  = 39,
        zLeft  = 65, // A
        zRight = 83; // S
        toggle = 32; // Space

    $('body').keydown(function (e) {
      var newX = xAngle, newY = yAngle, newZ = zAngle, keyCode = e.keyCode;

      if(keyCode === toggle) toggleMode();
      else {
        switch(keyCode) {
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
        if (willChange(newX, newY, newZ)) {
          if (auto) stop();
          applyTransform(newX, newY, newZ);
        }
      }

    });
  });
});
