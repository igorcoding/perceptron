require.config({
    urlArgs: "_=",// + (new Date()).getTime(),
    baseUrl: "/static/js",
    paths: {
        jquery: "lib/jquery-2.1.4.min",
        lodash: "lib/lodash.min",
        fileinput: "lib/fileinput.min"
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'lodash': {
            exports: '_'
        },
        fileinput: {
            exports: 'fileinput',
            deps: [
                'jquery'
            ]
        }
    }
});

define('main', ['jquery' /*,'fileinput'*/], function($) {
    //$('#input-id').fileinput();
    window.DEBUG = true;
});