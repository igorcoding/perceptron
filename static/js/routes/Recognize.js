define(function(require) {
    var $ = require('jquery');
    var Page = require('routes/Page');

    var FieldEditor = require('objects/FieldEditor');
    var Client = require('api/Client');

    var Recognize = Class.create(Page, {

        initialize: function($super, $root, modelConfig) {
            $super($root);
            this.fieldEditor = new FieldEditor($root.find('.field-editor'));
            this.fieldEditor.setup(modelConfig.size);
            this.fieldEditor.field.enableLabelSwitch = false;

            this.bindEvents();
        },

        sizeChanged: function(data) {
            this.fieldEditor.setup(data.size);
        },

        bindEvents: function() {
            var self = this;
            this.$root.find('.recognize-button').click(function() {
                var $this = $(this);
                $this.attr("disabled", true);
                Client.recognize(self.fieldEditor.field.getData(), function(err, resp) {
                    console.log(resp);
                    $this.attr("disabled", false);

                    self.fieldEditor.field.applyLabel(resp.prediction);
                });
            });

            this.$root.find('.clear-button').click(function() {
                self.fieldEditor.field.clear();
            });
        }
    });

    return Recognize;
});

