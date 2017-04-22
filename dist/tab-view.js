'use strict';
'use babel';

/** @jsx etch.dom */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _etchComponent = require('./etch-component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabView = exports.TabView = function (_EtchComponent) {
  _inherits(TabView, _EtchComponent);

  function TabView(options, componentOptions) {
    _classCallCheck(this, TabView);

    var _this = _possibleConstructorReturn(this, (TabView.__proto__ || Object.getPrototypeOf(TabView)).call(this, options.state, [], componentOptions));

    _this.title = options.title;
    _this.icon = options.icon;

    _this.element.scrollTop = _this.props.scroll ? _this.props.scroll.y : _this.element.scrollTop;
    _this.element.scrollLeft = _this.props.scroll ? _this.props.scroll.x : _this.element.scrollLeft;
    return _this;
  }

  _createClass(TabView, [{
    key: 'open',
    value: function open() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var pane = options.pane || atom.workspace.getActivePane();
      if (options.newPane) {
        atom.workspace.pane;
      }

      this.subscriptions.add(pane.addItem(this, { pending: options.pending, index: options.index }));

      if (!options.background) {
        pane.activateItem(this);
      }

      if (options.on) {
        switch (options.on) {
          case 'left':
            pane.splitLeft({ items: [this] });
            break;
          case 'right':
            pane.splitRight({ items: [this] });
            break;
          case 'top':
            pane.splitTop({ items: [this] });
            break;
          default:
            pane.splitBottom({ items: [this] });
            break;
        }
      }
      this.pane = pane;
      return this;
    }
  }, {
    key: 'readAfterUpdate',
    value: function readAfterUpdate() {
      var _this2 = this;

      this.element.addEventListener('scroll', function (evt) {
        _this2.props.scroll = {
          x: window.scrollX,
          y: window.scrollY
        };
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.pane) {
        this.pane.destroyItem(this);
      }
      _get(TabView.prototype.__proto__ || Object.getPrototypeOf(TabView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return this.props;
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      return this.title;
    }
  }, {
    key: 'getIconName',
    value: function getIconName() {
      return this.icon;
    }
  }]);

  return TabView;
}(_etchComponent.EtchComponent);