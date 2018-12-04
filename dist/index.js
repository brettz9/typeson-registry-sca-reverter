(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.typesonRegistrySCAReverter = {})));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var sparseUndefined = createCommonjsModule(function (module, exports) {
  !function (e, n) {
    module.exports = n();
  }(commonjsGlobal, function () {

    return [{
      sparseArrays: {
        testPlainObjects: !0,
        test: function test(e) {
          return Array.isArray(e);
        },
        replace: function replace(e, n) {
          return n.iterateUnsetNumeric = !0, e;
        }
      }
    }, {
      sparseUndefined: {
        test: function test(e, n) {
          return void 0 === e && !1 === n.ownKeys;
        },
        replace: function replace(e) {
          return null;
        },
        revive: function revive(e) {}
      }
    }];
  });
  });

  var newTypeNamesToLegacy = {
    IntlCollator: 'Intl.Collator',
    IntlDateTimeFormat: 'Intl.DateTimeFormat',
    IntlNumberFormat: 'Intl.NumberFormat',
    userObject: 'userObjects',
    undef: 'undefined',
    negativeInfinity: 'NegativeInfinity',
    nonbuiltinIgnore: 'nonBuiltInIgnore',
    arraybuffer: 'ArrayBuffer',
    blob: 'Blob',
    dataview: 'DataView',
    date: 'Date',
    error: 'Error',
    file: 'File',
    filelist: 'FileList',
    imagebitmap: 'ImageBitmap',
    imagedata: 'ImageData',
    infinity: 'Infinity',
    map: 'Map',
    nan: 'NaN',
    regexp: 'RegExp',
    set: 'Set',
    int8array: 'Int8Array',
    uint8array: 'Uint8Array',
    uint8clampedarray: 'Uint8ClampedArray',
    int16array: 'Int16Array',
    uint16array: 'Uint16Array',
    int32array: 'Int32Array',
    uint32array: 'Uint32Array',
    float32array: 'Float32Array',
    float64array: 'Float64Array'
  };
  var typesonRegistrySCAReverter = function traverseMapToRevertToLegacyTypeNames(obj) {
    if (Array.isArray(obj)) {
      // Structured Cloning and Builtins had been used `sparseUndefined`
      //   previously (through the `undef` preset) instead of
      //   `arrayNonindexKeys`.
      obj.some(function (type, i) {
        if ('arrayNonindexKeys' in type) {
          obj.splice(i, 1, sparseUndefined);
          return true;
        }

        return false;
      });
      return obj.forEach(traverseMapToRevertToLegacyTypeNames);
    }

    if (obj && _typeof(obj) === 'object') {
      // Should be all
      Object.entries(obj).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            prop = _ref2[0],
            val = _ref2[1];

        if (prop in newTypeNamesToLegacy) {
          var legacyProp = newTypeNamesToLegacy[prop];
          delete obj[prop];
          obj[legacyProp] = val;
        }
      });
    }
  };

  exports.typesonRegistrySCAReverter = typesonRegistrySCAReverter;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
