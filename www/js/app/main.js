define(function (require) {
    var Backbone = require('Backbone');
    var MainApp = Backbone.View.extend({
      initialize: function () {
        console.log(this.options.message);
        this.render();
      },
      render: function () {
        this.$el.css('background-color', 'yellow');
        this.$('h1').css('background-color', 'red');
        return this;
      }
    });
    new MainApp({
      message: 'Hello world!',
      el: 'body'
    });
});
