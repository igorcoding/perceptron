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

        LocalStorageKey: 'fieldsCollection',

        initialize: function ($root) {
            this.$root = $root;
        },

        addField: function(field, deleteExisting) {
            var newTable = field.getTableElem().clone(true);
            var newLabel = field.getLabelElem().clone(true);
            if (deleteExisting) {
                field.removeTableElem();
                field.removeLabelElem();
            }
            field.setTableElem(newTable);
            field.setLabelElem(newLabel);
            this.fields.push(field);
            var id = this.fields.length - 1;
            this.renderFieldCard(field, id);
        },

        renderFieldCard: function(field, id) {
            var data = {
                field_table: field.getTableElem(),
                field_label: field.getLabelElem()
            };
            var templ = Templates['field-card']();
            var $templ = $(templ);
            field.$root = $templ;
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
                    output: [field.getLabel()]
                });
            });
            return arr;
        },

        save: function() {
            window.localStorage.setItem(this.LocalStorageKey, JSON.stringify(this.getData()));
        },

        restore: function() {
            var self = this;
            var data = window.localStorage.getItem(this.LocalStorageKey);
            data = JSON.parse(data);
            _.forEach(data, function(d) {
                var f = new Field(parseInt(Math.sqrt(d.input.length)), undefined, true, ['table', 'table-bordered']);
                f.disable();
                self.addField(f, true);
            });
        },

        checkLocalStorage: function() {
            var data = window.localStorage.getItem(this.LocalStorageKey);
            return !!data;
        },

        removeSaved: function() {
            window.localStorage.removeItem(this.LocalStorageKey);
        }
    });
});