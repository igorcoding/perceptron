define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');

    var Object = require('objects/Object');

    var ModelConfig = Class.create(Object, {

        INPUTS: {},

        initialize: function(initialConfig) {
            this.config = initialConfig;
            this._jqFind('INPUTS');
            this.applyConfig(this.config);
        },

        getConfig: function() {
            throw "not implemented";
        },

        applyConfig: function(config) {
            throw "not implemented";
        }
    });

    return ModelConfig;
});