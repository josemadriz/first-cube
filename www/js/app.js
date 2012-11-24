requirejs.config({
    urlArgs: 'buster=' + new Date().getTime(),
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});
requirejs(['app/cube']);

