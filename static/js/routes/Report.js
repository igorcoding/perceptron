define(function(require) {
    var $ = require('jquery');
    var alertify = require('alertify');

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
        }
    });

    return Report;
});

