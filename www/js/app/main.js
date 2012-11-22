define(function (require) {
    var Backbone = require('Backbone');
    var MainApp = Backbone.View.extend({
      initialize: function () {
        console.log(this.options.message);
        this.render();
      },
      render: function () {
        this.$('a').css('display', 'block');
        this.$el.append(this.make('h1', null, 'Hello World!'));
        this.$el.css('background-color', 'pink');
        this.$('h1')
          .css('background-color', 'white')
          .css('color', 'red')
          .css('padding', '30px')
          .css('margin', '30px');
        return this;
      }
    });
    new MainApp({
      message: 'Hello world!',
      el: 'body'
    });
});
