require.config({
    urlArgs: "_=",// + (new Date()).getTime(),
    baseUrl: "/static/js",
    paths: {
        jquery: "lib/jquery-2.1.4.min",
        lodash: "lib/lodash.min",
        fileinput: "lib/fileinput.min",
        tagsinput: "lib/bootstrap-tagsinput",
        prototype: "lib/prototype"
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
        },
        tagsinput: {
            exports: 'tagsinput',
            deps: [
                'jquery'
            ]
        },
        prototype: {
            exports: 'Prototype'
        }
    }
});

define('main', ['jquery' ,'objects/conf/PerceptronModelConfig', 'objects/Field'], function($, PerceptronModelConfig, Field) {
    window.modelConfig = new PerceptronModelConfig({
        inputs: 9,
        outputs: 1,
        iterations: 10000
    });

    window.field = new Field($('.field'));
    field.setup(3, 3);
    window.DEBUG = true;
});