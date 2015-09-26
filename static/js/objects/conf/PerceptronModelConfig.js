define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    var signals = require('signals');
    var ModelConfig = require('objects/conf/ModelConfig');

    var PerceptronModelConfig = Class.create(ModelConfig, {
        INPUTS: {
            inputs: '#config_inputs',
            outputs: '#config_outputs',
            learningRate: '#config_learning_rate',
            threshold: '#config_threshold',
            iterations: '#config_iterations'
        },

        ELEMS: {
            sizeChangerText: '.settings-window__config__size__text',
            sizeChangerButton: '.settings-window__config__size__apply'
        },

        sizeChanged: new signals.Signal(),
        size: 1,

        initialize: function($super, initialConfig) {
            $super(initialConfig);
            this._jqFind('ELEMS');

            var self = this;
            this.$ELEMS.sizeChangerButton.click(function() {
                self.size = parseInt(self.$ELEMS.sizeChangerText.val()) || 1;
                self._setInputs(self.size * self.size);
            });
            this.size = parseInt(Math.sqrt(this.config.inputs));
            this.$ELEMS.sizeChangerText.val(this.size);
            this._fireSizeChanged();
        },

        getConfig: function() {
            var values = this.$INPUTS;
            this.config = {
                inputs: parseInt(values.inputs.val() || 0),
                outputs: parseInt(values.outputs.val() || 0),
                learningRate: parseFloat(values.learningRate.val() || 0),
                threshold: parseFloat(values.threshold.val() || 0),
                iterations: parseInt(values.iterations.val() || 1)
            };

            return this.config;
        },

        applyConfig: function(config) {
            var values = this.$INPUTS;
            this.size = parseInt(Math.sqrt(config.inputs));
            this._setInputs(config.inputs);
            this._setOutputs(config.outputs);
            values.learningRate.val(config.learningRate || 0.1);
            values.threshold.val(config.threshold || 0);
            values.iterations.val(config.iterations || 10);
        },

        _setInputs: function(inputs, noFire) {
            if (this.$ELEMS) {
                this.$ELEMS.sizeChangerText.val(this.size || 3);
            }
            this.$INPUTS.inputs.val(inputs || 1);
            if (!noFire) {
                this._fireSizeChanged();
            }
        },

        _setOutputs: function(outputs) {
            this.$INPUTS.outputs.val(outputs || 1);
        },

        _fireSizeChanged: function() {
            this.sizeChanged.dispatch({
                size: this.size
            });
        }
    });

    return PerceptronModelConfig;

});