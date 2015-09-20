define(function(require) {
    var $ = require('jquery');
    var _ = require('lodash');
    require('prototype');

    var Field = Class.create({

        ELEMS: {
            fieldConf: '.field__conf',
            fieldConfSizeText: '.field__conf__size__text',
            fieldConfSizeApply: '.field__conf__size__apply',
            fieldConfLabel: '.field__conf__label',
            fieldConfAddButton: '.field__conf__addbtn'
        },

        CLASSES: {
            table: 'field__table',
            row: 'field__table__row'
        },

        COLORS: {
            inactive: '#FFFFFF',
            active: '#0000FF'
        },

        initialize: function($root) {
            this.$root = $root;
            this._jqFind('ELEMS', $root);


            var self = this;
            this.$ELEMS.fieldConfSizeApply.click(function() {
                var size = parseInt(self.$ELEMS.fieldConfSizeText.val()) || 3;
                self.setup(size, size);
            });

            this.$ELEMS.fieldConfLabel.find('a').click(function() {
                var li = $(this).parents('li');
                li.siblings().removeClass('active');
                li.addClass('active');
                return false;
            });

            this.$ELEMS.fieldConfAddButton.click(function() {

            });
        },

        setup: function(rows, cols) {
            this.rows = rows;
            this.cols = cols;
            this.$ELEMS.fieldConfSizeText.val(rows);
            this.createField();
        },

        _jqFind: function(obj, $root) {
            var $obj = '$' + obj;
            this[$obj] = {};
            if (!this[obj]) return;

            var self = this;
            _.forOwn(this[obj], function(value, key) {
                self[$obj][key] = $root.find(value);
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
                self.changeCellValue($(this));
            });
        },

        changeCellValue: function($cell) {
            var row = $cell.data('row');
            var col = $cell.data('col');
            var v = $cell.data('value');
            var color = this.COLORS.inactive;
            if (v == 0) {
                v = 1;
                color = this.COLORS.active;
            } else {
                v = 0;
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
        }
    });

    return Field;
});