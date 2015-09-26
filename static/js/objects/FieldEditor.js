define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    var signals = require('signals');

    var Object = require('objects/Object');
    var Field = require('objects/Field');

    var FieldEditor = Class.create(Object, {

        ELEMS: {
            fieldEditorConfAddButton: '.field__conf__addbtn'
        },

        fieldCreated: new signals.Signal(),
        field: null,

        initialize: function($root) {
            this.$root = $root;
            this._jqFind('ELEMS', $root);

            var self = this;
            this.$ELEMS.fieldEditorConfAddButton.attr('disabled', true);
            this.$ELEMS.fieldEditorConfAddButton.click(function() {
                self.fieldCreated.dispatch(self.field.disable());
                self.field = new Field(self.field.size, self.$root);
            });
        },

        setup: function(size) {
            this.field = new Field(size, this.$root);
            this.$ELEMS.fieldEditorConfAddButton.attr('disabled', false);
        }
    });

    return FieldEditor;
});