'use strict';
'use babel';

/** @jsx etch.dom */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _etchComponent = require('./etch-component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* An icon. See the Styleguide for a list of available icons.
*
* Properties:
*
* - name: the name of the icon, as it is in the styleguide
* - size: large, medium or small (default)
*/
var Icon = exports.Icon = function (_EtchComponent) {
  _inherits(Icon, _EtchComponent);

  /**
  * @param name {string}
  */
  function Icon(_ref) {
    var name = _ref.name;

    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, { name: name }, []));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var style = void 0;
      switch (this.props.size) {
        case 'large':
          style = 'font-size: 48px;';
          break;
        case 'medium':
          style = 'font-size: 32px;';
          break;
      }
      return _etch2.default.dom('span', { style: style, 'class': 'icon icon-' + this.props.name });
    }
  }]);

  return Icon;
}(_etchComponent.EtchComponent);