function _typeof(obj) {
  "@babel/helpers - typeof";

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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sparseUndefined = createCommonjsModule(function (module, exports) {
!function (e, t) {
   module.exports = t() ;
}(commonjsGlobal, function () {

  return [{
    sparseArrays: {
      testPlainObjects: !0,
      test: function test(e) {
        return Array.isArray(e);
      },
      replace: function replace(e, t) {
        return t.iterateUnsetNumeric = !0, e;
      }
    }
  }, {
    sparseUndefined: {
      test: function test(e, t) {
        return void 0 === e && !1 === t.ownKeys;
      },
      replace: function replace(e) {
        return 0;
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
var typesonRegistrySCAReverter = function typesonRegistrySCAReverter(obj) {
  if (Array.isArray(obj)) {
    // Structured Cloning and Builtins had been using `sparseUndefined`
    //   previously (through the `undef` preset) instead of
    //   `arrayNonindexKeys`.
    obj.some(function (type, i) {
      if ('arrayNonindexKeys' in type) {
        var j = i + 1;
        var nextObject = obj[j];

        if (nextObject && _typeof(nextObject) === 'object' && 'sparseUndefined' in nextObject) {
          // Remove `sparseUndefined` if also present
          //   (latest version has both), so we can
          //   add back with full preset in next step
          obj.splice(j, 1);
        }

        obj.splice.apply(obj, [i, 1].concat(_toConsumableArray(sparseUndefined)));
        return true;
      }

      return false;
    });
    obj.forEach(function (x) {
      return typesonRegistrySCAReverter(x);
    });
    return;
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

export { typesonRegistrySCAReverter };
