define(function (require) {
    var Backbone = require('Backbone');
    var MainApp = Backbone.View.extend({
      initialize: function () {
        console.log(this.options.message);
      }
    });
    new MainApp({
      message: 'Hello world!'
    });
});
