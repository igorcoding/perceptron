define(function(require) {
    var $ = require('jquery');
    var alertify = require('alertify');

    var Page = require('routes/Page');
    var FieldEditor = require('objects/FieldEditor');
    var FieldCollection = require('objects/FieldCollection');
    var Client = require('api/Client');

    var Train = Class.create(Page, {

        onTrained: function() {},

        initialize: function($super, $root, modelConfig) {
            $super($root);
            var self = this;
            this.fieldEditor = new FieldEditor($root.find('.field-editor'));
            this.fieldEditor.setup(modelConfig.size);

            this.fieldCollection = new FieldCollection($root.find('.field-collection'));

            this.fieldEditor.fieldCreated.add(function(field) {
                self.fieldCollection.addField(field);
                console.log(field);
            });

            this.bindEvents();
        },

        sizeChanged: function(data) {
            this.fieldEditor.setup(data.size);
        },

        bindEvents: function() {
            var self = this;
            this.$root.find('.learn-button').click(function() {
                var $this = $(this);
                $this.attr("disabled", true);
                Client.learn(modelConfig.getConfig(), self.fieldCollection.getData(), function(err, resp) {
                    $this.attr("disabled", false);
                    if (err) {
                        return alertify.error('Error happened: ' + JSON.stringify(err.data));
                    }
                    self.onTrained(resp);
                    console.log(resp);
                    alertify.success('Train completed successfully');
                });
            });
        }
    });

    return Train;
});

