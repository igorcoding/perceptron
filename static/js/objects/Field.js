define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');

    var Object = require('objects/Object');

    var Field = Class.create(Object, {

        ELEMS: {
            fieldConf: '.field__conf',
            fieldConfLabel: '.field__conf__label'
        },

        CLASSES: {
            table: 'field__table',
            row: 'field__table__row'
        },

        COLORS: {
            inactive: '#FFFFFF',
            active: '#337ab7'
        },

        enableLabelSwitch: true,
        enableEdit: true,

        initialize: function(size, $root) {
            $root = $root || $(document);
            this.$root = $root;
            this.size = size;
            this.rows = this.size;
            this.cols = this.size;

            this._jqFind('ELEMS', $root);
            this.createField();


            var self = this;

            this.$ELEMS.fieldConfLabel.find('a').click(function() {
                if (self.enableLabelSwitch) {
                    var li = $(this).parents('li');
                    li.siblings().removeClass('active');
                    li.addClass('active');
                }
                return false;
            });
        },

        createField: function() {
            this.$table = this.$root.find('.' + this.CLASSES.table);
            this.$table.empty();
            for (var i = 0; i < this.rows; ++i) {
                var $row = $('<tr></tr>');
                $row.addClass(this.CLASSES.row);
                for (var j = 0; j < this.cols; ++j) {
                    var $td = $('<td></td>');
                    $td.data('row', i);
                    $td.data('col', j);
                    $td.data('value', 0);
                    $row.append($td);
                }
                this.$table.append($row);
            }
            this.$table.css({width: (this.cols * 40) + 'px'});

            this.$rows = this.$table.find('.' + this.CLASSES.row);
            this.$cells = this.$rows.find('td');

            var self = this;
            this.$cells.click(function() {
                if (self.enableEdit) {
                    self.changeCellValue($(this));
                }
            });
        },

        changeCellValue: function($cell) {
            var row = $cell.data('row');
            var col = $cell.data('col');
            var v = $cell.data('value');
            var color;
            if (v == 0) {
                v = 1;
                color = this.COLORS.active;
            } else {
                v = 0;
                color = this.COLORS.inactive;
            }
            $cell.data('value', v);
            $cell.css({'background-color': color});
        },

        getData: function() {
            var data = [];
            _.forEach(this.$cells, function(cell) {
                data.push(parseInt($(cell).data('value')) || 0);
            });
            return data;
        },

        getLabel: function() {
            return this.$ELEMS.fieldConfLabel.find('li').filter('.active').find('a').data('value');
        },

        disable: function() {
            this.enableEdit = false;
            this.enableLabelSwitch = false;
            return this;
        },

        enable: function() {
            this.enableEdit = true;
            this.enableLabelSwitch = true;
            return this;
        }
    });

    return Field;
});