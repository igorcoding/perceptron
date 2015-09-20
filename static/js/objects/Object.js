define(function(require) {
    var $ = require('jquery');
    require('prototype');

    return Class.create({
        initialize: function () {
            this._jqFind('ELEMS', $root);
        },

        _jqFind: function (obj, $root) {
            $root = $root || $(document);
            var $obj = '$' + obj;
            this[$obj] = {};
            if (!this[obj]) return;

            var self = this;
            _.forOwn(this[obj], function (value, key) {
                self[$obj][key] = $root.find(value);
            });
        }
    });
});