define(function (require) {
  var $ = require('jquery');
  var xAngle = 0, yAngle = 0,
      transform = 'rotateX(${xAngle}deg) rotateY(${yAngle}deg)';
  $(function () {
    $('body').keydown(function (e) {
      var transformed;
      console.log(e.keyCode);
      switch(e.keyCode) {
        case 37:
        yAngle -= 90;
        break;
        case 38:
        xAngle -= 90;
        break;
        case 39:
        yAngle += 90;
        break;
        case 40:
        xAngle -= 90;
        break;
      }
      transformed = transform
        .replace('${xAngle}', xAngle)
        .replace('${yAngle}', yAngle);
      $('#cube').css('webkitTransform', transformed)
    });
  });
});
