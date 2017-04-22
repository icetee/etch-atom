'use strict';
'use babel';

/** @jsx etch.dom */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _etchComponent = require('./etch-component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackgroundMessage = exports.BackgroundMessage = function (_EtchComponent) {
  _inherits(BackgroundMessage, _EtchComponent);

  function BackgroundMessage() {
    _classCallCheck(this, BackgroundMessage);

    return _possibleConstructorReturn(this, (BackgroundMessage.__proto__ || Object.getPrototypeOf(BackgroundMessage)).apply(this, arguments));
  }

  _createClass(BackgroundMessage, [{
    key: 'render',
    value: function render() {
      return _etch2.default.dom(
        'ul',
        { 'class': 'background-message ' + (this.props.notCentered ? '' : 'centered') },
        _etch2.default.dom(
          'li',
          null,
          this.children
        )
      );
    }
  }]);

  return BackgroundMessage;
}(_etchComponent.EtchComponent);