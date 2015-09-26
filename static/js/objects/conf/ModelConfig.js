define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');

    var Object = require('objects/Object');

    var ModelConfig = Class.create(Object, {

        INPUTS: {},

        LocalStorageKey: "modelConfig",

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
        },

        save: function() {
            var config = this.getConfig();
            window.localStorage.setItem(this.LocalStorageKey, JSON.stringify(config));
        },

        restore: function() {
            var config = window.localStorage.getItem(this.LocalStorageKey);
            config = JSON.parse(config);
            if (config) {
                this.applyConfig(config);
            }
        },

        checkLocalStorage: function() {
            var config = window.localStorage.getItem(this.LocalStorageKey);
            return !!config;
        },

        removeSaved: function() {
            window.localStorage.removeItem(this.LocalStorageKey);
        }
    });

    return ModelConfig;
});