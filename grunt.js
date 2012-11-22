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
      tasks: 'reload'
    }
  });

  grunt.loadNpmTasks('grunt-sample');
  grunt.loadNpmTasks('grunt-volo');
  grunt.loadNpmTasks('grunt-reload');
  grunt.registerTask('default', 'lint sample server');

};
