define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    var ModelConfig = require('objects/conf/ModelConfig');
    require('tagsinput');

    var NNModelConfig = Class.create(ModelConfig, {

        INPUTS: {
            layers: '#config_layers',
            activation: '#config_activation',
            learningRate: '#config_learning_rate',
            momentum: '#config_momentum',
            regularization: '#config_regularization',
            bias: '#config_bias',
            iterations: '#config_iterations'
        },

        initialize: function($super, initialConfig) {
            $super(initialConfig);
            this._initLayersConf();
        },

        getConfig: function() {
            var values = this.$INPUTS;
            this.config = {
                layers: values.layers.tagsinput('items'),
                activation: values.activation.val(),
                learningRate: parseFloat(values.learningRate.val()),
                momentum: parseFloat(values.momentum.val()),
                regularization: parseFloat(values.regularization.val()),
                bias: values.bias.is(':checked'),
                iterations: parseInt(values.iterations.val())
            };

            return this.config;
        },

        _initLayersConf: function() {
            var $configLayers = this.$INPUTS.layers;
            $configLayers.tagsinput({
                //addOnBlur: true,
                confirmKeys: [13, 32, 44],
                allowDuplicates: true
            });
            $configLayers.on('beforeItemRemove', function(event) {
                // event.item: contains the item
                // event.cancel: set to true to prevent the item getting removed
                if (event.options.tagIndex == 0) {
                    event.cancel = true;
                }
            });
            $configLayers.on('beforeItemAdd', function(event) {
                console.log(event);
                // event.item: contains the item
                // event.cancel: set to true to prevent the item getting added
            });

            _.forEach(this.config.layers, function(l) {
                $configLayers.tagsinput('add', l);
            });
        }
    });

    return NNModelConfig;
});