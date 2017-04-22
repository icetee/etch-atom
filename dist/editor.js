'use strict';
'use babel';

/** @jsx etch.dom */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atom = require('atom');

var _etchComponent = require('./etch-component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = exports.Editor = function (_EtchComponent) {
  _inherits(Editor, _EtchComponent);

  function Editor() {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));

    var text = '';
    var explore = function explore(elt) {
      if (elt.text) {
        text += elt.text;
      }

      if (elt.children) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = elt.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ch = _step.value;

            explore(ch);
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
    };
    explore(_this);

    _this.model = _this.refs.editor;
    _this.element = _this.model.element;
    _this.model.setText(text);
    _this.subscribeToEvents();
    if (_this.props.grammar) {
      _this.model.setGrammar(atom.grammars.grammarForScopeName(_this.props.grammar));
    }
    return _this;
  }

  _createClass(Editor, [{
    key: 'render',
    value: function render() {
      return _etch2.default.dom(_atom.TextEditor, { ref: 'editor', mini: this.props.mini, placeholderText: this.props.placeholder });
    }
  }, {
    key: 'subscribeToEvents',
    value: function subscribeToEvents() {
      // event subscription!
      if (this.props) {
        for (var evt in this.props.on) {
          var modelEvent = 'on' + evt[0].toUpperCase() + evt.substring(1);
          if (this.model[modelEvent]) {
            var handler = this.props.on[evt];
            this.subscriptions.add(this.model[modelEvent](handler));
            this.props.on[evt] = null;
          }
        }
      }
    }
  }]);

  return Editor;
}(_etchComponent.EtchComponent);