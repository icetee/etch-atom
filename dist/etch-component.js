'use strict';
'use babel';

/** @jsx etch.dom */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtchComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atom = require('atom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A base class for etch components.
*/
var EtchComponent = exports.EtchComponent = function () {

  /**
  * Creates a new component.
  *
  * This is only meant to be used by child classes.
  *
  * @param props {Object} An object with the initial properties of this component.
  * @param children {[string]} A list of element that belongs to this one.
  * @param options {bool | [string]} If set to true, you can perform operations before your component is initialized by etch. Then you'll have to call {@link EtchComponent.ready} manually.
  */
  function EtchComponent() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { initLater: false, events: [] };

    _classCallCheck(this, EtchComponent);

    if (_etch2.default.getScheduler() !== atom.views) {
      _etch2.default.setScheduler(atom.views);
    }

    this.props = props;
    this.children = children;
    this.subscriptions = new _atom.CompositeDisposable();

    if (Array.isArray(options.events)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var evt = _step.value;

          this.event(evt);
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

    if (!options.initLater) {
      this.ready();
    }
  }

  /**
  * Tell etch that you are ready if you decided to initialize your component before.
  */


  _createClass(EtchComponent, [{
    key: 'ready',
    value: function ready() {
      if (!this.initialized) {
        _etch2.default.initialize(this);
        this.initialized = true;
      }
    }

    /**
    * The method that will be called by etch to get what to render.
    *
    * Put some JSX inside!
    */

  }, {
    key: 'render',
    value: function render() {
      throw new Error('EtchComponents should have a `render` method.');
    }

    /**
    * Call this method when you need to render your component again
    */

  }, {
    key: 'update',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.children;
        var oldProps;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                oldProps = this.props;

                this.props = Object.assign({}, oldProps, props);
                this.children = children;
                _context.next = 5;
                return _etch2.default.update(this);

              case 5:
                return _context.abrupt('return', _context.sent);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function update() {
        return _ref.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'updateSync',
    value: function updateSync() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.children;
      var replaceNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var oldProps = this.props;
      this.props = Object.assign({}, oldProps, props);
      this.children = children;
      _etch2.default.updateSync(this, replaceNode);
    }

    /**
    * Removes a component
    */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.subscriptions.dispose();
      _etch2.default.destroy(this);
    }

    /**
    * Alias for {@link EtchComponent.destroy}, to make components disposable.
    */

  }, {
    key: 'dispose',
    value: function dispose() {
      this.destroy();
    }

    /**
    * Destroys the component synchronously
    */

  }, {
    key: 'destroySync',
    value: function destroySync() {
      var removeNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      _etch2.default.destroySync(this, removeNode);
    }

    /**
    * Nice way to bind functions to this.
    *
    * If the function belongs to the component (is defined in the class), it will be replaced with the usable version.
    *
    * If the function is external (or is a closure), the bound fucntion will be returned.
    */

  }, {
    key: 'event',
    value: function event(evt) {
      if (typeof this[evt] === 'function') {
        this[evt] = this[evt].bind(this);
        return this[evt];
      } else if (typeof evt === 'function') {
        if (evt.name !== '') {
          return evt.bind(this);
        }

        this[evt.name] = evt.bind(this);
        return this[evt.name];
      }
    }
  }]);

  return EtchComponent;
}();