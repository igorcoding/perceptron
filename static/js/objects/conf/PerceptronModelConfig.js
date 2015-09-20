define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    var ModelConfig = require('objects/conf/ModelConfig');

    var PerceptronModelConfig = Class.create(ModelConfig, {
        INPUTS: {
            inputs: '#config_inputs',
            outputs: '#config_outputs',
            learningRate: '#config_learning_rate',
            bias: '#config_bias',
            iterations: '#config_iterations'
        },

        initialize: function($super, initialConfig) {
            $super(initialConfig);

        },

        getConfig: function() {
            var values = this.$INPUTS;
            this.config = {
                inputs: parseInt(values.inputs.val() || 0),
                outputs: parseInt(values.outputs.val() || 0),
                learningRate: parseFloat(values.learningRate.val() || 0),
                bias: values.bias.is(':checked'),
                iterations: parseInt(values.iterations.val() || 1)
            };

            return this.config;
        },

        applyConfig: function(config) {
            var values = this.$INPUTS;
            values.inputs.val(config.inputs || 1);
            values.outputs.val(config.outputs || 1);
            values.learningRate.val(config.learningRate || 0.1);
            values.bias.attr('checked', config.bias);
            values.iterations.val(config.iterations || 10);
        }
    });

    return PerceptronModelConfig;

});