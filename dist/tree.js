'use strict';
'use babel';

/** @jsx etch.dom */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _etchComponent = require('./etch-component');

var _icon = require('./icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = exports.Tree = function (_EtchComponent) {
  _inherits(Tree, _EtchComponent);

  function Tree(props, ch) {
    _classCallCheck(this, Tree);

    return _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props, ch, { events: ['onFold'] }));
  }

  _createClass(Tree, [{
    key: 'onFold',
    value: function onFold(evt) {
      if (this.props.on && this.props.on.click) {
        var _props$on$click;

        (_props$on$click = this.props.on.click).apply.apply(_props$on$click, [this].concat(Array.prototype.slice.call(arguments)));
      }

      if (!evt.defaultPrevented && !this.props.noCollapse) {
        this.props.collapsed = !this.props.collapsed;
        this.update();
      }
    }
  }, {
    key: 'hasChildren',
    value: function hasChildren() {
      return this.children.length > 0 || this.props.forceFoldable;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.noCollapse) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ch = _step.value;

            ch.props.noCollapse = true;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      if (this.hasChildren()) {
        var events = this.props.on || {};
        events.click = this.onFold;

        return _etch2.default.dom(
          'li',
          { 'class': 'list-nested-item ' + (this.props.collapsed ? 'collapsed' : 'expanded') },
          _etch2.default.dom(
            'div',
            { 'class': 'list-item', on: events },
            _etch2.default.dom(
              'span',
              null,
              this.props.icon ? _etch2.default.dom(_icon.Icon, { name: this.props.icon }) : null,
              this.props.text
            )
          ),
          _etch2.default.dom(
            'ul',
            { 'class': 'list-tree' },
            this.children
          )
        );
      } else {
        return _etch2.default.dom(
          'li',
          { 'class': 'list-item', on: this.props.on },
          _etch2.default.dom(
            'span',
            null,
            this.props.icon ? _etch2.default.dom(_icon.Icon, { name: this.props.icon }) : null,
            this.props.text,
            this.children
          )
        );
      }
      return _etch2.default.dom(
        'p',
        null,
        'Foo!'
      );
    }
  }]);

  return Tree;
}(_etchComponent.EtchComponent);