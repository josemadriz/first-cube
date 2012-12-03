# First Cube

Based on http://www.webkit.org/blog-files/3d-transforms/perspective-by-example.html

## Grunt tasks:
  * grunt-volo /remove
  * grunt-reload https://github.com/webxl/grunt-reload
  * grunt-contrib-less /remove
  * grunt-contrib-compass : https://github.com/gruntjs/grunt-contrib-compass
  * grunt-bower-task : https://github.com/yatskevich/grunt-bower-task

## Node dependencies:
  * Volo /remove
  * Bower
  * Less /remove
  * sass-compass https://npmjs.org/package/node-compass

## TODO: review VOLO structure
## Volo default setup:
This web project has the following setup:

* www/ - the web assets for the project
    * index.html - the entry point into the app.
    * js/
        * app.js - the top-level config script used by index.html
        * app/ - the directory to store project-specific scripts.
        * lib/ - the directory to hold third party scripts.
* tools/ - the build tools to optimize the project. 

To optimize, run:

    volo build // TODO: something more gruntlike https://github.com/asciidisco/grunt-requirejs

This will run the "build" command in the volofile that is in this directory.

That build command creates an optimized version of the project in a
**www-built** directory. The js/app.js file will be optimized to include
all of its dependencies.

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html
