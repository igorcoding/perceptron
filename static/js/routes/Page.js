define(function(require) {
    var $ = require('jquery');
    require('prototype');

    return Class.create({

        initialize: function ($root) {
            this.$root = $root;
        },

        isVisible: function() {
            return this.$root.is(":visible");
        },

        hide: function() {
            console.log('hide');
            //if (this.isVisible()) {
                this.$root.hide();
            //}
        },

        show: function() {
            console.log('show');
            //if (!this.isVisible()) {
                this.$root.show();
            //}
        }
    });
});

