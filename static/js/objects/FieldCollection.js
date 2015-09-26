define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    var signals = require('signals');

    var Object = require('objects/Object');
    var Field = require('objects/Field');

    return Class.create(Object, {

        ELEMS: {

        },

        fields: [],

        initialize: function ($root) {
            this.$root = $root;

        },

        addField: function(field) {
            this.fields.push(field);
            this.renderFieldCard(field);
        },

        renderFieldCard: function(field) {

        }
    });
});