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
        handlebars: "lib/handlebars.runtime-v4.0.2",
        alertify: "lib/alertify.min"
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
        },
        alertify: {
            exports: 'alertify'
        }
    }
});

define(function(require) {
    var $ = require('jquery');
    var alertify = require('alertify');

    var PerceptronModelConfig = require('objects/conf/PerceptronModelConfig');
    var Train = require('routes/Train');
    var Recognize = require('routes/Recognize');
    var Templates = require('util/Templates');

    var $weightsPanel = $('.side-window__weights__table');

    window.modelConfig = new PerceptronModelConfig({
        inputs: 9,
        outputs: 1,
        iterations: 10000
    });

    window.trainPage = new Train($('.learn-page'), modelConfig);
    window.recognizePage = new Recognize($('.recognize-page'), modelConfig);

    trainPage.onTrained = function(data) {
        var templ = Templates['weights-table'](data);
        $weightsPanel.html(templ);
    };

    modelConfig.sizeChanged.add(function(data) {
        trainPage.sizeChanged(data);
        recognizePage.sizeChanged(data);
    });

    $('.page-switcher').find('a').click(function() {
        var $this = $(this);
        var li = $this.parents('li');
        li.siblings().removeClass('active');
        li.addClass('active');

        var selectedPage = $this.data('page');
        if (selectedPage == 'train') {
            recognizePage.hide();
            trainPage.show();
        } else if (selectedPage == 'recognize') {
            trainPage.hide();
            recognizePage.show();
        }

        return false;
    });

    $('.save-button').click(function() {
        modelConfig.save();
        //trainPage.fieldCollection.save();
        alertify.success('Saved');
        return false;
    });


    if (modelConfig.checkLocalStorage() || trainPage.fieldCollection.checkLocalStorage()) {
        alertify.confirm("There are saved data. Do you want to restore it?").set('title', "Restore data").set('labels', {
            ok: 'Yes',
            cancel: 'No'
        }).set('onok', function() {
            modelConfig.restore();
            //trainPage.fieldCollection.restore();
        }).set('oncancel', function() {
            modelConfig.removeSaved();
            trainPage.fieldCollection.removeSaved();
        });
    }


    window.DEBUG = true;
});