define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    var signals = require('signals');

    var Object = require('objects/Object');
    var Field = require('objects/Field');

    var Templates = require('util/Templates');

    return Class.create(Object, {

        ELEMS: {

        },

        fields: [],

        initialize: function ($root) {
            this.$root = $root;
        },

        addField: function(field) {
            this.fields.push(field);
            var id = this.fields.length - 1;
            this.renderFieldCard(field, id);
        },

        renderFieldCard: function(field, id) {
            var data = {
                field_table: field.getTableElem().clone(true),
                field_label: field.getLabelElem().clone(true)
            };
            var templ = Templates['field-card']();
            var $templ = $(templ);
            _.forOwn(data, function(value, key) {
                $templ.find('#__' + key + '__').replaceWith(value);
            });

            this.$root.append($templ);

            var self = this;
            $templ.find('.field-card__remove-icon').click(function() {
                $templ.remove();
                if (id !== null) {
                    self.fields.splice(id, 1);
                }
            });
        },

        getData: function() {
            var arr = [];
            _.forEach(this.fields, function(field) {
                arr.push({
                    input: field.getData(),
                    output: field.getLabel()
                });
            });
            return arr;
        }
    });
});