/**
 * Configurator
 *
 * Provides a sane API to configure the cube on stage.
 *
 * @author leoncoto@gmail.com
 */
define(function (require) {
    var $ = require('jquery'),
        rounded = false,
        loose = false,
        border = false,
        size = 200,
        translation = size,
        setTranslation = function () {
          var trans = size / 2;
          translation = loose ? trans + 100 : trans;
          $('#cube .one').css('-webkit-transform', 'translateZ(' + translation + 'px)');
          $('#cube .two').css('-webkit-transform', 'rotateX(90deg) translateZ(' + translation + 'px)');
          $('#cube .three').css('-webkit-transform', 'rotateY(90deg) translateZ(' + translation + 'px)');
          $('#cube .four').css('-webkit-transform', 'rotateY(180deg) translateZ(' + translation + 'px)');
          $('#cube .five').css('-webkit-transform', 'rotateY(-90deg) translateZ(' + translation + 'px)');
          $('#cube .six').css('-webkit-transform', 'rotateX(-90deg) rotate(180deg) translateZ(' + translation + 'px)');
      };

    return {
      setSpeed: function (speed) {
        $('body').css('-webkit-transition', 'background-color ' + speed + 's ease-in');
        $('#cube').css('-webkit-transition', '-webkit-transform ' + speed + 's linear');
      },
      setPerspective: function (perspective) {
        $('#camera').css('-webkit-perspective', perspective + 'px');
      },
      setSize: function (newSize) {
        size = newSize;
        $('#cube, .face').css('width', size).css('height', size);
        setTranslation();
      },
      toggleRounded: function () {
        rounded  = !rounded;
        $('.face').css('border-radius', rounded ? '100px' : '0');
        return rounded;
      },
      toggleTrans: function () {
        loose = !loose;
        setTranslation();
        return loose;
      },
      toggleBorder: function () {
        border = !border;
        $('.face').css('border', border ? '10px solid white' : 'none');
        return border;
      }
    };
});
