'use strict';
'use babel';

/** @jsx etch.dom */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputView = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _etchComponent = require('./etch-component');

var _editor = require('./editor');

var _icon = require('./icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* A generic input view, with validation.
*
* Use the {@link InputView.show} function to create a new view and to show it immediatly.
*
* If you prefer to wait before showing it, use the {@link InputView.attach} function on an instance of this class.
*
* This component is not meant to be contain any child or to be contained in another component.
*/
var InputView = exports.InputView = function (_EtchComponent) {
  _inherits(InputView, _EtchComponent);

  _createClass(InputView, null, [{
    key: 'show',
    value: function show(title, onConfirm, placeholder, validate) {
      var view = new InputView({ title: title, onConfirm: onConfirm, placeholder: placeholder, validate: validate });
      view.attach();
      return view;
    }
  }]);

  function InputView() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var ch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, InputView);

    var _this = _possibleConstructorReturn(this, (InputView.__proto__ || Object.getPrototypeOf(InputView)).call(this, props, ch, { events: ['checkName'] }));

    _this.errors = [];
    _this.warnings = [];

    _this.subscriptions.add(atom.commands.add(_this.element, 'core:cancel', function () {
      _this.onCancel();
    }));
    _this.subscriptions.add(atom.commands.add(_this.element, 'core:confirm', function () {
      _this.onConfirm();
    }));
    return _this;
  }

  _createClass(InputView, [{
    key: 'attach',
    value: function attach() {
      this.panel = atom.workspace.addModalPanel({
        item: this.element
      });
      this.refs.input.element.focused();
    }
  }, {
    key: 'checkName',
    value: function checkName() {
      var input = this.refs.input.model.getText();
      var validation = this.props.validate(input);

      if (validation) {
        this.errors = validation.errors;
        this.warnings = validation.warnings;
      } else {
        this.errors = [];
        this.warnings = [];
      }

      this.update();
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.subscriptions.dispose();
      this.destroy();
    }
  }, {
    key: 'onConfirm',
    value: function onConfirm() {
      if (!this.errors.length === 0 && this.props.onConfirm) {
        this.props.onConfirm(this.refs.input.getText());
        this.destroy();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _etch2.default.dom(
        'div',
        { className: 'block' },
        _etch2.default.dom(
          'div',
          { className: 'message' },
          this.props.title
        ),
        _etch2.default.dom(_editor.Editor, { ref: 'input', mini: true, placeholder: this.props.placeholder, on: { didChange: this.checkName } }),
        this.errors.length > 0 ? this.errors.map(function (e) {
          return _etch2.default.dom(
            'div',
            { className: 'text-error' },
            _etch2.default.dom(_icon.Icon, { name: 'x' }),
            ' ',
            e
          );
        }) : null,
        this.warnings.length > 0 ? this.warnings.map(function (w) {
          return _etch2.default.dom(
            'div',
            { className: 'text-warning' },
            _etch2.default.dom(_icon.Icon, { name: 'alert' }),
            ' ',
            w
          );
        }) : null
      );
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(InputView.prototype.__proto__ || Object.getPrototypeOf(InputView.prototype), 'destroy', this).call(this);
      if (this.panel) {
        this.panel.destroy();
      }
    }
  }]);

  return InputView;
}(_etchComponent.EtchComponent);