/**
 * FirstCube
 *
 * The first cube experiment
 *
 * @author leoncoto@gmail.com
 */
define(function (require) {
  var $ = require('jquery'),
      configurator = require('app/configurator'),

      auto = true,
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

    var up     = 38,
        down   = 40,
        left   = 37,
        right  = 39,
        zLeft  = 65, // A
        zRight = 83, // S
        toggle = 32, // Space
        values  = {
          '#slow':    2,
          '#normal':  1,
          '#fast':    0.4,
          '#intense': 30,
          '#mild':    800,
          '#flat':    100000,
          '#tiny':    20,
          '#regular': 200,
          '#huge':    2000
        },
        getValue = function ($el) {
          var key = $el.attr('href');
          return values[key];
        },
        shutUp = function (e) {
          e.preventDefault();
          e.stopPropagation();
        };

    if (auto) play(); else stop();

    $('a.play-mode').click(function(e) {
      shutUp(e);
      toggleMode();
    });

    $('a.speed').click(function(e) {
      shutUp(e);
      configurator.setSpeed(getValue($(this)));
    });

    $('a.perspective').click(function(e) {
      shutUp(e);
      configurator.setPerspective(getValue($(this)));
    });

    $('a.size').click(function(e) {
      shutUp(e);
      configurator.setSize(getValue($(this)));
    });

    $('a.shape').click(function(e) {
      shutUp(e);
      $(this).html(configurator.toggleRounded() ? 'Squared' : 'Rounded');
    });

    $('a.translation').click(function(e) {
      shutUp(e);
      $(this).html(configurator.toggleTrans() ? 'Tidy' : 'Loose');
    });

    $('a.border').click(function (e) {
      shutUp(e);
      $(this).html(configurator.toggleBorder() ? 'Without border' : 'With border');
    });

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
