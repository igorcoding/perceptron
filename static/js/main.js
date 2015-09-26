require.config({
    urlArgs: "_=",// + (new Date()).getTime(),
    baseUrl: "/static/js",
    paths: {
        jquery: "lib/jquery-2.1.4.min",
        lodash: "lib/lodash.min",
        fileinput: "lib/fileinput.min",
        tagsinput: "lib/bootstrap-tagsinput",
        prototype: "lib/prototype",
        signals: "lib/signals.min",
        handlebars: "lib/handlebars.runtime-v4.0.2"
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
        },
        signals: {
            exports: 'signals'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

define(function(require) {
    var $ = require('jquery');
    var Handlebars = require('handlebars');
    console.log(Handlebars);

    var PerceptronModelConfig = require('objects/conf/PerceptronModelConfig');
    var FieldEditor = require('objects/FieldEditor');

    var FieldCollection = require('objects/FieldCollection');

    window.modelConfig = new PerceptronModelConfig({
        inputs: 9,
        outputs: 1,
        iterations: 10000
    });

    window.fieldEditor = new FieldEditor($('.field-editor'));
    fieldEditor.setup(modelConfig.size);

    window.fieldCollection = new FieldCollection($('.field-collection'));

    modelConfig.sizeChanged.add(function(data) {
        fieldEditor.setup(data.size);
    });

    fieldEditor.fieldCreated.add(function(field) {
        fieldCollection.addField(field);
        console.log(field);
    });
    window.DEBUG = true;
});