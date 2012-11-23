module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'www/js/app/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    },
    less: {
      development: {
        options: {
        },
        files: {
          'www/css/app.css': 'www/less/app.less'
        }
      }
    },
    server: {
      port: 8000,
      base: 'www'
    },
    reload: {
      port: 6001,
      proxy: {
        host: 'localhost'
      }
    },
    watch: {
      files: ['www/**/*'],
      tasks: 'lint less reload'
    }
  });

  grunt.loadNpmTasks('grunt-volo');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-remove-logging');

  grunt.registerTask('default', 'server lint less reload watch');

};
