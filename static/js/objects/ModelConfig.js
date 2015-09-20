define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    require('prototype');
    require('tagsinput');

    var ModelConfig = Class.create({

        INPUTS: {
            layers: '#config_layers',
            activation: '#config_activation',
            learningRate: '#config_learning_rate',
            momentum: '#config_momentum',
            regularization: '#config_regularization',
            bias: '#config_bias',
            iterations: '#config_iterations'
        },

        initialize: function(initialConfig) {
            this.config = initialConfig;
            this._jqFind('INPUTS');
            this._initLayersConf();
        },

        getConfig: function() {
            var inputs = this.$INPUTS;
            this.config = {
                layers: inputs.layers.tagsinput('items'),
                activation: inputs.activation.val(),
                learningRate: parseFloat(inputs.learningRate.val()),
                momentum: parseFloat(inputs.momentum.val()),
                regularization: parseFloat(inputs.regularization.val()),
                bias: inputs.bias.is(':checked'),
                iterations: parseInt(inputs.iterations.val())
            };

            return this.config;
        },

        _jqFind: function(obj) {
            var $obj = '$' + obj;
            this[$obj] = {};
            if (!this[obj]) return;

            var self = this;
            _.forOwn(this[obj], function(value, key) {
                self[$obj][key] = $(value);
            });
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

    return ModelConfig;
});