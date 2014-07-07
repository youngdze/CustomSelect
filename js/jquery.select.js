(function($, window, undefined) {

    $.fn.customSelect = function() {

        var _this = $(this),
            _option = _this.children('option');

        var addElement = function() {
            var newElement = document.createElement(arguments[0]);
            var newContent = document.createTextNode(arguments[1]);
            var newAttribute = document.createAttribute('class');
            newAttribute.value = arguments[2];
            newElement.setAttributeNode(newAttribute);
            newElement.appendChild(newContent);
            return newElement;
        };

        var selected = function() {
            for (var i = 0; i < _option.length; i++) {
                if (_option.eq(i).attr('selected')) {
                    return _option.eq(i).text();
                }
            }
        };

        var addLi = function() {
            var list_ul = addElement('ul', '', 'custom-select-ul');
            for (var i = 0; i < _option.length; i++) {
                var list_li = addElement('li', _option.eq(i).text(), _option.eq(i).attr('class'));
                if (_option.eq(i).attr('disabled')) {
                    list_li.className += ' custom-select-disabled';
                }
                list_ul.appendChild(list_li);
            }
            return list_ul;
        };

        _this.wrap(addElement('div', '', 'custom-select'));
        _this.parent().append(addElement('div', selected(), 'selected'));
        _this.parent().append(addLi());

        _this.css({
            'display': 'none'
        });

        _this.parent('.custom-select').css({
            'position': 'relative'
        });

        _this.siblings('.selected').css({
            'display': 'inline-block',
            'position': 'position',
            'cursor': 'pointer'
        });

        _this.siblings('.custom-select-ul').css({
            'display': 'none',
            'cursor': 'pointer',
            'position': 'absolute',
            'list-style': 'none',
            'padding': 0,
            'margin': 0
        });
        _this.siblings('.custom-select-ul').find('.custom-select-disabled').css({
            'cursor': 'not-allowed',
            'opacity': .3,
            'filter': 'alpha(opacity=30)'
        });

        _this.siblings('.selected').click(function(event) {
            _this.siblings('.custom-select-ul').toggle();
        });

        _this.parent('.custom-select').click(function(e) {
            e.stopPropagation();
        });

        $(document).click(function() {
            _this.siblings('.custom-select-ul').hide();
        });

        _this.siblings('.custom-select-ul').find('.custom-select-disabled').off('click');

        _this.siblings('.custom-select-ul').find('li').not('.custom-select-disabled').click(function(event) {
            var _li = $(this);
            for (var i = 0; i < _option.length; i++) {
                if (_option.eq(i).text() == _li.text()) {
                    _option.eq(i).attr('selected', 'selected').siblings().removeAttr('seleted');
                }
            }
            _this.siblings('.selected').text(_li.text());
            _this.siblings('.custom-select-ul').hide();
        });
    }

})(jQuery, window);