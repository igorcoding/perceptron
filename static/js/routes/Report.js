define(function(require) {
    var $ = require('jquery');
    var alertify = require('alertify');
    require('flot');

    var Page = require('routes/Page');
    var FieldEditor = require('objects/FieldEditor');
    var Client = require('api/Client');

    var Templates = require('util/Templates');

    var Report = Class.create(Page, {

        initialize: function($super, $root) {
            $super($root);
            this.reportTableWrapper = $root.find('.report-table-wrapper');


            this.bindEvents();
        },

        bindEvents: function() {
            var self = this;

        },

        displayData: function(data) {
            var templ = Templates['weights-report-table'](data);
            this.reportTableWrapper.html(templ);

            var ymin = _.min(_.map(data.iterations, function(w) { return _.min(w) }));
            var ymax = _.max(_.map(data.iterations, function(w) { return _.max(w) }));

            var defaultOptions = {
                series: {
                    lines: { show: true },
                    points: { show: false }
                }
            };
            var plotOptions = _.assign({}, defaultOptions, {
                yaxis: {
                    min: ymin - 1.0,
                    max: ymax + 1.0
                }
            });
            var X = _.range(1, data.iterations[0].length + 1);
            _.forEach(data.iterations, function(w, i) {
                var d = _.zip(X, w);
                $.plot('#graph-weights-w' + i, [d], plotOptions);
            });


            var d = _.zip(X, data.iterations_errors);
            $.plot('.errors-table', [d], defaultOptions);
        }
    });

    return Report;
});

