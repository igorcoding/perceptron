define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    require('prototype');

    var ModelConfig = Class.create({

        INPUTS: {},

        initialize: function(initialConfig) {
            this.config = initialConfig;
            this._jqFind('INPUTS');
            this.applyConfig(this.config);
        },

        getConfig: function() {
            throw "not implemented";
        },

        _jqFind: function(obj) {
            var $obj = '$' + obj;
            this[$obj] = {};
            if (!this[obj]) return;

            var self = this;
            _.forOwn(this[obj], function(value, key) {
                self[$obj][key] = $(value);
            });
        },

        applyConfig: function(config) {
            throw "not implemented";
        }
    });

    return ModelConfig;
});