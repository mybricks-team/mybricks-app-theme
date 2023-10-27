(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("antd"), require("icons"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "antd", "icons"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("antd"), require("icons")) : factory(root["React"], root["antd"], root["icons"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_antd__, __WEBPACK_EXTERNAL_MODULE__ant_design_icons__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);
      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }
      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names

  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }
      list.push(item);
    }
  };
  return list;
};
function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }
  return [content].join('\n');
} // Adapted from convert-source-map (MIT)

function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/base64-js/index.js":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/base64-js/index.js ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}

// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }
  return parts.join('');
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/buffer/index.js":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/buffer/index.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var base64 = __webpack_require__(/*! base64-js */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/base64-js/index.js");
var ieee754 = __webpack_require__(/*! ieee754 */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/ieee754/index.js");
var customInspectSymbol = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' // eslint-disable-line dot-notation
? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
: null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
var K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
  console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
}
function typedArraySupport() {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1);
    var proto = {
      foo: function foo() {
        return 42;
      }
    };
    Object.setPrototypeOf(proto, Uint8Array.prototype);
    Object.setPrototypeOf(arr, proto);
    return arr.foo() === 42;
  } catch (e) {
    return false;
  }
}
Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function get() {
    if (!Buffer.isBuffer(this)) return undefined;
    return this.buffer;
  }
});
Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function get() {
    if (!Buffer.isBuffer(this)) return undefined;
    return this.byteOffset;
  }
});
function createBuffer(length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"');
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length);
  Object.setPrototypeOf(buf, Buffer.prototype);
  return buf;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError('The "string" argument must be of type string. Received type number');
    }
    return allocUnsafe(arg);
  }
  return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192; // not used by this implementation

function from(value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset);
  }
  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value);
  }
  if (value == null) {
    throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + _typeof(value));
  }
  if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
    return fromArrayBuffer(value, encodingOrOffset, length);
  }
  if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('The "value" argument must not be of type number. Received type number');
  }
  var valueOf = value.valueOf && value.valueOf();
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length);
  }
  var b = fromObject(value);
  if (b) return b;
  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
  }
  throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + _typeof(value));
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length);
};

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number');
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"');
  }
}
function alloc(size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
  }
  return createBuffer(size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0);
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size);
};
function fromString(string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }
  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding);
  }
  var length = byteLength(string, encoding) | 0;
  var buf = createBuffer(length);
  var actual = buf.write(string, encoding);
  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }
  return buf;
}
function fromArrayLike(array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(length);
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf;
}
function fromArrayView(arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView);
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
  }
  return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds');
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds');
  }
  var buf;
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype);
  return buf;
}
function fromObject(obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(len);
    if (buf.length === 0) {
      return buf;
    }
    obj.copy(buf, 0, 0, len);
    return buf;
  }
  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0);
    }
    return fromArrayLike(obj);
  }
  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data);
  }
}
function checked(length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
  }
  return length | 0;
}
function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
  return b != null && b._isBuffer === true && b !== Buffer.prototype; // so Buffer.isBuffer(Buffer.prototype) will be false
};

Buffer.compare = function compare(a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
  }
  if (a === b) return 0;
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};
Buffer.concat = function concat(list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }
  if (list.length === 0) {
    return Buffer.alloc(0);
  }
  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }
  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos);
      } else {
        Uint8Array.prototype.set.call(buffer, buf, pos);
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    } else {
      buf.copy(buffer, pos);
    }
    pos += buf.length;
  }
  return buffer;
};
function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + _typeof(string));
  }
  var len = string.length;
  var mustMatch = arguments.length > 2 && arguments[2] === true;
  if (!mustMatch && len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length; // assume utf8
        }

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }
  if (end === undefined || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return '';
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return '';
  }
  if (!encoding) encoding = 'utf8';
  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);
      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);
      case 'ascii':
        return asciiSlice(this, start, end);
      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);
      case 'base64':
        return base64Slice(this, start, end);
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};
Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};
Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};
Buffer.prototype.toString = function toString() {
  var length = this.length;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
  if (this.length > max) str += ' ... ';
  return '<Buffer ' + str + '>';
};
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
}
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength);
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + _typeof(target));
  }
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }
  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }
  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }
  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);
  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }
  return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (numberIsNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0;
    if (isFinite(length)) {
      length = length >>> 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }
  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;
  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }
  if (!encoding) encoding = 'utf8';
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);
      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);
      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length);
      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);
      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};
Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }
    res.push(codePoint);
    i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]];
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}
Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;
  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }
  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }
  if (end < start) end = start;
  var newBuf = this.subarray(start, end);
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype);
  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }
  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }
  return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }
  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }
  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  this[offset] = value & 0xff;
  return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = value >>> 8;
  this[offset + 1] = value & 0xff;
  return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset + 3] = value >>> 24;
  this[offset + 2] = value >>> 16;
  this[offset + 1] = value >>> 8;
  this[offset] = value & 0xff;
  return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset] = value >>> 24;
  this[offset + 1] = value >>> 16;
  this[offset + 2] = value >>> 8;
  this[offset + 3] = value & 0xff;
  return offset + 4;
};
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }
  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }
  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = value >>> 8;
  this[offset + 1] = value & 0xff;
  return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  this[offset + 2] = value >>> 16;
  this[offset + 3] = value >>> 24;
  return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  this[offset] = value >>> 24;
  this[offset + 1] = value >>> 16;
  this[offset + 2] = value >>> 8;
  this[offset + 3] = value & 0xff;
  return offset + 4;
};
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }
  var len = end - start;
  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
  }
  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code;
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } else if (typeof val === 'boolean') {
    val = Number(val);
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }
  if (end <= start) {
    return this;
  }
  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
    var len = bytes.length;
    if (len === 0) {
      throw new TypeError('The value "' + val + '" is invalid for argument "value"');
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }
  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0];
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;
        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }
    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
  return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
  // For IE11 support
  return obj !== obj; // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = function () {
  var alphabet = '0123456789abcdef';
  var table = new Array(256);
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16;
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j];
    }
  }
  return table;
}();

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/copy-to-clipboard/index.js":
/*!***************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/copy-to-clipboard/index.js ***!
  \***************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__(/*! toggle-selection */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/toggle-selection/index.js");
var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";
function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}
function copy(text, options) {
  var debug,
    message,
    reselectPrevious,
    range,
    selection,
    mark,
    success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();
    range = document.createRange();
    selection = document.getSelection();
    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true";
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function (e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        if (typeof e.clipboardData === "undefined") {
          // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format, text);
        } else {
          // all other browsers
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });
    document.body.appendChild(mark);
    range.selectNodeContents(mark);
    selection.addRange(range);
    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }
    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }
  return success;
}
module.exports = copy;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/gm-crypto/dist/index.esm.js":
/*!****************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/gm-crypto/dist/index.esm.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SM2: function() { return /* binding */ E; },
/* harmony export */   SM3: function() { return /* binding */ F; },
/* harmony export */   SM4: function() { return /* binding */ D; }
/* harmony export */ });
/* harmony import */ var to_arraybuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! to-arraybuffer */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/to-arraybuffer/index.js");
/* harmony import */ var to_arraybuffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(to_arraybuffer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/buffer/index.js");
/* harmony import */ var jsbn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsbn */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsbn/index.js");
/* harmony import */ var jsbn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsbn__WEBPACK_IMPORTED_MODULE_2__);



var i = jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.prototype.Barrett;
function o(t, r) {
  this.x = r, this.q = t;
}
function u(t, r, n, i) {
  this.curve = t, this.x = r, this.y = n, this.z = null == i ? jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ONE : i, this.zinv = null;
}
function s(t, r, e) {
  this.q = t, this.a = this.fromBigInteger(r), this.b = this.fromBigInteger(e), this.infinity = new u(this, null, null), this.reducer = new i(this.q);
}
o.prototype.equals = function (t) {
  return t == this || this.q.equals(t.q) && this.x.equals(t.x);
}, o.prototype.toBigInteger = function () {
  return this.x;
}, o.prototype.negate = function () {
  return new o(this.q, this.x.negate().mod(this.q));
}, o.prototype.add = function (t) {
  return new o(this.q, this.x.add(t.toBigInteger()).mod(this.q));
}, o.prototype.subtract = function (t) {
  return new o(this.q, this.x.subtract(t.toBigInteger()).mod(this.q));
}, o.prototype.multiply = function (t) {
  return new o(this.q, this.x.multiply(t.toBigInteger()).mod(this.q));
}, o.prototype.square = function () {
  return new o(this.q, this.x.square().mod(this.q));
}, o.prototype.divide = function (t) {
  return new o(this.q, this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q));
}, u.prototype.getX = function () {
  null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
  var t = this.x.toBigInteger().multiply(this.zinv);
  return this.curve.reduce(t), this.curve.fromBigInteger(t);
}, u.prototype.getY = function () {
  null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
  var t = this.y.toBigInteger().multiply(this.zinv);
  return this.curve.reduce(t), this.curve.fromBigInteger(t);
}, u.prototype.equals = function (t) {
  return t == this || (this.isInfinity() ? t.isInfinity() : t.isInfinity() ? this.isInfinity() : !!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ZERO) && t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ZERO));
}, u.prototype.isInfinity = function () {
  return null == this.x && null == this.y || this.z.equals(jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ZERO) && !this.y.toBigInteger().equals(jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ZERO);
}, u.prototype.negate = function () {
  return new u(this.curve, this.x, this.y.negate(), this.z);
}, u.prototype.add = function (t) {
  if (this.isInfinity()) return t;
  if (t.isInfinity()) return this;
  var r = t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q),
    n = t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q);
  if (jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ZERO.equals(n)) return jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ZERO.equals(r) ? this.twice() : this.curve.getInfinity();
  var i = new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger("3"),
    o = this.x.toBigInteger(),
    s = this.y.toBigInteger(),
    f = (t.x.toBigInteger(), t.y.toBigInteger(), n.square()),
    a = f.multiply(n),
    h = o.multiply(f),
    l = r.square().multiply(this.z),
    c = l.subtract(h.shiftLeft(1)).multiply(t.z).subtract(a).multiply(n).mod(this.curve.q),
    g = h.multiply(i).multiply(r).subtract(s.multiply(a)).subtract(l.multiply(r)).multiply(t.z).add(r.multiply(a)).mod(this.curve.q),
    p = a.multiply(this.z).multiply(t.z).mod(this.curve.q);
  return new u(this.curve, this.curve.fromBigInteger(c), this.curve.fromBigInteger(g), p);
}, u.prototype.twice = function () {
  if (this.isInfinity()) return this;
  if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
  var t = new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger("3"),
    r = this.x.toBigInteger(),
    n = this.y.toBigInteger(),
    i = n.multiply(this.z),
    o = i.multiply(n).mod(this.curve.q),
    s = this.curve.a.toBigInteger(),
    f = r.square().multiply(t);
  jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ZERO.equals(s) || (f = f.add(this.z.square().multiply(s)));
  var a = (f = f.mod(this.curve.q)).square().subtract(r.shiftLeft(3).multiply(o)).shiftLeft(1).multiply(i).mod(this.curve.q),
    h = f.multiply(t).multiply(r).subtract(o.shiftLeft(1)).shiftLeft(2).multiply(o).subtract(f.square().multiply(f)).mod(this.curve.q),
    l = i.square().multiply(i).shiftLeft(3).mod(this.curve.q);
  return new u(this.curve, this.curve.fromBigInteger(a), this.curve.fromBigInteger(h), l);
}, u.prototype.multiply = function (t) {
  if (this.isInfinity()) return this;
  if (0 == t.signum()) return this.curve.getInfinity();
  var r,
    n = t,
    i = n.multiply(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger("3")),
    o = this.negate(),
    u = this;
  for (r = i.bitLength() - 2; r > 0; --r) {
    u = u.twice();
    var s = i.testBit(r);
    s != n.testBit(r) && (u = u.add(s ? this : o));
  }
  return u;
}, u.prototype.multiplyTwo = function (t, r, e) {
  var n;
  n = t.bitLength() > e.bitLength() ? t.bitLength() - 1 : e.bitLength() - 1;
  for (var i = this.curve.getInfinity(), o = this.add(r); n >= 0;) i = i.twice(), t.testBit(n) ? i = e.testBit(n) ? i.add(o) : i.add(this) : e.testBit(n) && (i = i.add(r)), --n;
  return i;
}, s.prototype.getQ = function () {
  return this.q;
}, s.prototype.getA = function () {
  return this.a;
}, s.prototype.getB = function () {
  return this.b;
}, s.prototype.equals = function (t) {
  return t == this || this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b);
}, s.prototype.getInfinity = function () {
  return this.infinity;
}, s.prototype.fromBigInteger = function (t) {
  return new o(this.q, t);
}, s.prototype.reduce = function (t) {
  this.reducer.reduce(t);
}, s.prototype.decodePointHex = function (t) {
  switch (parseInt(t.substr(0, 2), 16)) {
    case 0:
      return this.infinity;
    case 2:
    case 3:
      return null;
    case 4:
    case 6:
    case 7:
      var r = (t.length - 2) / 2,
        n = t.substr(2, r),
        i = t.substr(r + 2, r);
      return new u(this, this.fromBigInteger(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(n, 16)), this.fromBigInteger(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(i, 16)));
    default:
      return null;
  }
}, s.prototype.encodePointHex = function (t) {
  if (t.isInfinity()) return "00";
  var r = t.getX().toBigInteger().toString(16),
    e = t.getY().toBigInteger().toString(16),
    n = this.getQ().toString(16).length;
  for (n % 2 != 0 && n++; r.length < n;) r = "0" + r;
  for (; e.length < n;) e = "0" + e;
  return "04" + r + e;
};
var f = function f(t, r) {
    return t << (r %= 32) | t >>> 32 - r;
  },
  a = function a(t, r) {
    var e = r - t.length;
    return (e > 0 ? "0".repeat(e) : "") + t;
  },
  h = function h(t) {
    return t < 16 ? 2043430169 : 2055708042;
  },
  l = function l(t, r, e, n) {
    return n < 16 ? t ^ r ^ e : t & r | t & e | r & e;
  },
  c = function c(t, r, e, n) {
    return n < 16 ? t ^ r ^ e : t & r | ~t & e;
  },
  g = function g(t, r, e) {
    for (var n, i, o, u, s, a = function (t) {
        var r,
          e = new Array(132);
        t.forEach(function (t, r) {
          e[r] = t;
        });
        for (var n = 16; n < 68; n++) e[n] = (r = e[n - 16] ^ e[n - 9] ^ f(e[n - 3], 15)) ^ f(r, 15) ^ f(r, 23) ^ f(e[n - 13], 7) ^ e[n - 6];
        for (var i = 0; i < 64; i++) e[i + 68] = e[i] ^ e[i + 4];
        return e;
      }(r), g = t[0], p = t[1], F = t[2], y = t[3], d = t[4], v = t[5], B = t[6], m = t[7], I = 0; I < 64; I++) i = (n = f(f(g, 12) + d + f(h(I), I), 7)) ^ f(g, 12), o = l(g, p, F, I) + y + i + a[I + 68], u = c(d, v, B, I) + m + n + a[I], y = F, F = f(p, 9), p = g, g = o, m = B, B = f(v, 19), v = d, d = (s = u) ^ f(s, 9) ^ f(s, 17);
    return [g ^ t[0], p ^ t[1], F ^ t[2], y ^ t[3], d ^ t[4], v ^ t[5], B ^ t[6], m ^ t[7]];
  },
  p = function p(e, n, i) {
    if ("string" == typeof e ? e = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(e, n || "utf8") : e instanceof ArrayBuffer && (e = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(e)), !buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.isBuffer(e)) throw new TypeError('Expected "string" | "Buffer" | "ArrayBuffer" but received "' + Object.prototype.toString.call(e) + '"');
    var o, u, s, f, a, h;
    o = e, u = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(1, 128), f = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(s = (s = o.length % 64) >= 56 ? 64 - s % 56 - 1 : 56 - s - 1, 0), a = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(8), h = 8 * o.length, a.writeUInt32BE(Math.floor(h / Math.pow(2, 32)), 0), a.writeUInt32BE(h % Math.pow(2, 32), 4);
    for (var l = (e = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.concat([o, u, f, a], o.length + 1 + s + 8)).length / 64, c = new Array(l), p = 0; p < l; p++) {
      c[p] = new Array(16);
      for (var F = 0; F < 16; F++) c[p][F] = e.readUInt32BE(64 * p + 4 * F);
    }
    var y = new Array(l);
    y[0] = [1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214];
    for (var d = 0; d < l; d++) y[d + 1] = g(y[d], c[d]);
    var v = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(32);
    return y[l].forEach(function (t, r) {
      return v.writeInt32BE(t, 4 * r);
    }), i ? v.toString(i) : to_arraybuffer__WEBPACK_IMPORTED_MODULE_0___default()(v);
  },
  F = {
    __proto__: null,
    digest: p
  },
  y = new jsbn__WEBPACK_IMPORTED_MODULE_2__.SecureRandom(),
  d = function () {
    var t = new s(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16), new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16), new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16)),
      r = t.decodePointHex("0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0");
    return {
      curve: t,
      G: r,
      n: new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16)
    };
  }(),
  v = d.curve,
  B = d.G,
  m = d.n;
function I(t, e) {
  for (var n = [], i = Math.ceil(e / 32), o = e % 32, u = 1; u <= i; u++) {
    var s = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.allocUnsafe(4);
    s.writeUInt32BE(u);
    var f = p(buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.concat([t, s]));
    n.push(u === i && o ? buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(f).slice(0, o) : buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(f));
  }
  return buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.concat(n, e);
}
var E = {
    __proto__: null,
    constants: {
      C1C2C3: 0,
      C1C3C2: 1,
      PC: "04"
    },
    generateKeyPair: function generateKeyPair() {
      var t = new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(m.bitLength(), y).mod(m.subtract(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger("2"))).add(jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ONE),
        r = a(t.toString(16), 64),
        n = B.multiply(t);
      return {
        privateKey: r,
        publicKey: "04" + a(n.getX().toBigInteger().toString(16), 64) + a(n.getY().toBigInteger().toString(16), 64)
      };
    },
    encrypt: function encrypt(n, i, o) {
      var u = o || {},
        s = u.mode,
        f = void 0 === s ? 1 : s,
        h = u.outputEncoding,
        l = u.pc;
      if ("string" == typeof n ? n = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(n, u.inputEncoding || "utf8") : n instanceof ArrayBuffer && (n = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(n)), !buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.isBuffer(n)) throw new TypeError('Expected "string" | "Buffer" | "ArrayBuffer" but received "' + Object.prototype.toString.call(n) + '"');
      var c = new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(m.bitLength(), y).mod(m.subtract(jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ONE)).add(jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger.ONE),
        g = B.multiply(c),
        F = a(g.getX().toBigInteger().toString(16), 64) + a(g.getY().toBigInteger().toString(16), 64),
        d = v.decodePointHex(i).multiply(c),
        E = a(d.getX().toBigInteger().toString(16), 64),
        w = a(d.getY().toBigInteger().toString(16), 64),
        q = I(buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(E + w, "hex"), n.length),
        x = a(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(n.toString("hex"), 16).xor(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(q.toString("hex"), 16)).toString(16), 2 * n.length),
        b = p(E + n.toString("hex") + w, "hex", "hex"),
        S = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from((l ? "04" : "") + (0 === f ? F + x + b : F + b + x), "hex");
      return h ? S.toString(h) : to_arraybuffer__WEBPACK_IMPORTED_MODULE_0___default()(S);
    },
    decrypt: function decrypt(n, i, o) {
      var u = o || {},
        s = u.mode,
        f = void 0 === s ? 1 : s,
        h = u.outputEncoding,
        l = u.pc;
      if ("string" == typeof n ? n = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(n, u.inputEncoding) : n instanceof ArrayBuffer && (n = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(n)), !buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.isBuffer(n)) throw new TypeError('Expected "string" | "Buffer" | "ArrayBuffer" but received "' + Object.prototype.toString.call(n) + '"');
      var c = (n = l ? n.slice(1) : n).slice(0, 32).toString("hex"),
        g = n.slice(32, 64).toString("hex"),
        F = v.decodePointHex("04" + c + g).multiply(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(i, 16)),
        y = a(F.getX().toBigInteger().toString(16), 64),
        d = a(F.getY().toBigInteger().toString(16), 64),
        B = n.slice(64, 96),
        m = n.slice(96);
      0 === f && (B = n.slice(n.length - 32), m = n.slice(64, n.length - 32));
      var E = I(buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(y + d, "hex"), m.length),
        w = new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(m.toString("hex"), 16).xor(new jsbn__WEBPACK_IMPORTED_MODULE_2__.BigInteger(E.toString("hex"), 16)).toString(16),
        q = p(y + w + d, "hex", "hex") === B.toString("hex") ? buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(w, "hex") : buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(0);
      return h ? q.toString(h) : to_arraybuffer__WEBPACK_IMPORTED_MODULE_0___default()(q);
    }
  },
  w = [[214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5], [43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153], [156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98], [228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166], [71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168], [104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53], [30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135], [212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158], [234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161], [224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227], [29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111], [213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81], [141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216], [10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176], [137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198, 132], [24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57, 72]],
  q = [2746333894, 1453994832, 1736282519, 2993693404],
  x = [462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617, 2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825, 1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337, 4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545, 2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753, 1213159005, 1684763257],
  b = /^[0-9a-f]{32}$/i,
  S = function S(t) {
    return w[(4026531840 & t) >>> 28][(251658240 & t) >>> 24] << 24 | w[(15728640 & t) >>> 20][(983040 & t) >>> 16] << 16 | w[(61440 & t) >>> 12][(3840 & t) >>> 8] << 8 | w[(240 & t) >>> 4][(15 & t) >>> 0] << 0;
  },
  A = function A(t) {
    return (r = S(t)) ^ f(r, 2) ^ f(r, 10) ^ f(r, 18) ^ f(r, 24);
    var r;
  },
  z = function z(t) {
    var r,
      e = new Array(36);
    e[0] = t[0] ^ q[0], e[1] = t[1] ^ q[1], e[2] = t[2] ^ q[2], e[3] = t[3] ^ q[3];
    for (var n = new Array(32), i = 0; i < 32; i++) e[i + 4] = e[i] ^ (r = S(e[i + 1] ^ e[i + 2] ^ e[i + 3] ^ x[i])) ^ f(r, 13) ^ f(r, 23), n[i] = e[i + 4];
    return n;
  },
  C = function C(t, r) {
    for (var e = z(r), n = 0; n < 32; n++) t[n + 4] = t[n] ^ A(t[n + 1] ^ t[n + 2] ^ t[n + 3] ^ e[n]);
    return [t[35], t[34], t[33], t[32]];
  },
  O = function O(t, r) {
    for (var e = z(r).reverse(), n = 0; n < 32; n++) t[n + 4] = t[n] ^ A(t[n + 1] ^ t[n + 2] ^ t[n + 3] ^ e[n]);
    return [t[35], t[34], t[33], t[32]];
  },
  L = function L(t) {
    return [t.readInt32BE(0), t.readInt32BE(4), t.readInt32BE(8), t.readInt32BE(12)];
  },
  _ = function _(t) {
    for (var e = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(16), n = 0; n < 4; n++) e.writeInt32BE(t[n], 4 * n);
    return e;
  },
  D = {
    __proto__: null,
    constants: {
      ECB: 1,
      CBC: 2
    },
    encrypt: function encrypt(e, n, i) {
      var o = i || {},
        u = o.mode,
        s = o.iv,
        f = o.outputEncoding;
      if ("string" == typeof e ? e = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(e, o.inputEncoding || "utf8") : e instanceof ArrayBuffer && (e = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(e)), !buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.isBuffer(e)) throw new TypeError('Expected "string" | "Buffer" | "ArrayBuffer" but received "' + Object.prototype.toString.call(e) + '"');
      if (!b.test(n)) throw new TypeError("Invalid value of cipher `key`");
      if (n = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(n, "hex"), 2 === u && !b.test(s)) throw new TypeError("Invalid value of `iv` option");
      return function (e, n, i, o) {
        i && (i = L(i)), n = L(n);
        for (var u = [], s = (e = function (t) {
            var e = 16 - t.length % 16,
              n = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(e, e);
            return buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.concat([t, n], t.length + e);
          }(e)).length / 16, f = 0; f < s; f++) if (i) {
          var a = 16 * f,
            h = [i[0] ^ e.readInt32BE(a), i[1] ^ e.readInt32BE(a + 4), i[2] ^ e.readInt32BE(a + 8), i[3] ^ e.readInt32BE(a + 12)],
            l = C(h, n);
          u.push(_(l)), i = l.slice(0);
        } else {
          var c = 16 * f,
            g = [e.readInt32BE(c), e.readInt32BE(c + 4), e.readInt32BE(c + 8), e.readInt32BE(c + 12)],
            p = C(g, n);
          u.push(_(p));
        }
        var F = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.concat(u, e.length);
        return o ? F.toString(o) : to_arraybuffer__WEBPACK_IMPORTED_MODULE_0___default()(F);
      }(e, n, s = 2 === u ? buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(s, "hex") : null, f);
    },
    decrypt: function decrypt(e, n, i) {
      var o = i || {},
        u = o.mode,
        s = o.iv,
        f = o.outputEncoding;
      if ("string" == typeof e ? e = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(e, o.inputEncoding) : e instanceof ArrayBuffer && (e = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(e)), !buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.isBuffer(e)) throw new TypeError('Expected "string" | "Buffer" | "ArrayBuffer" but received "' + Object.prototype.toString.call(e) + '"');
      if (!b.test(n)) throw new TypeError("Invalid value of cipher `key`");
      if (n = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(n, "hex"), 2 === u && !b.test(s)) throw new TypeError("Invalid value of `iv` option");
      return function (e, n, i, o) {
        i && (i = L(i)), n = L(n);
        var u = [],
          s = e.length / 16;
        if (i) for (var f = s - 1; f >= 0; f--) {
          var a,
            h = 16 * f;
          a = f > 0 ? [e.readInt32BE(h - 16), e.readInt32BE(h - 16 + 4), e.readInt32BE(h - 16 + 8), e.readInt32BE(h - 16 + 12)] : i;
          var l = [e.readInt32BE(h), e.readInt32BE(h + 4), e.readInt32BE(h + 8), e.readInt32BE(h + 12)],
            c = O(l, n);
          u.unshift(_([c[0] ^ a[0], c[1] ^ a[1], c[2] ^ a[2], c[3] ^ a[3]]));
        } else for (var g = 0; g < s; g++) {
          var p = 16 * g,
            F = [e.readInt32BE(p), e.readInt32BE(p + 4), e.readInt32BE(p + 8), e.readInt32BE(p + 12)],
            y = O(F, n);
          u.push(_(y));
        }
        var d = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.concat(u, e.length - u[u.length - 1][15]);
        return o ? d.toString(o) : to_arraybuffer__WEBPACK_IMPORTED_MODULE_0___default()(d);
      }(e, n, s = 2 === u ? buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(s, "hex") : null, f);
    }
  };


/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/ieee754/index.js":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/ieee754/index.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
  buffer[offset + i - d] |= s * 128;
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsbn/index.js":
/*!**************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsbn/index.js ***!
  \**************************************************************************************/
/***/ (function(module, exports) {

(function () {
  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // See "LICENSE" for details.

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = (canary & 0xffffff) == 0xefcafe;

  // (public) Constructor
  function BigInteger(a, b, c) {
    if (a != null) if ("number" == typeof a) this.fromNumber(a, b, c);else if (b == null && "string" != typeof a) this.fromString(a, 256);else this.fromString(a, b);
  }

  // return new, unset BigInteger
  function nbi() {
    return new BigInteger(null);
  }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff,
      xh = x >> 15;
    while (--n >= 0) {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff,
      xh = x >> 14;
    while (--n >= 0) {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }
    return c;
  }
  var inBrowser = typeof navigator !== "undefined";
  if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = am2;
    dbits = 30;
  } else if (inBrowser && j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else {
    // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = (1 << dbits) - 1;
  BigInteger.prototype.DV = 1 << dbits;
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr, vv;
  rr = "0".charCodeAt(0);
  for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  function int2char(n) {
    return BI_RM.charAt(n);
  }
  function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return c == null ? -1 : c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = x < 0 ? -1 : 0;
    if (x > 0) this[0] = x;else if (x < -1) this[0] = x + this.DV;else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
  }

  // (protected) set from string and radix
  function bnpFromString(s, b) {
    var k;
    if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 256) k = 8; // byte array
    else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else {
      this.fromRadix(s, b);
      return;
    }
    this.t = 0;
    this.s = 0;
    var i = s.length,
      mi = false,
      sh = 0;
    while (--i >= 0) {
      var x = k == 8 ? s[i] & 0xff : intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if (sh == 0) this[this.t++] = x;else if (sh + k > this.DB) {
        this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
        this[this.t++] = x >> this.DB - sh;
      } else this[this.t - 1] |= x << sh;
      sh += k;
      if (sh >= this.DB) sh -= this.DB;
    }
    if (k == 8 && (s[0] & 0x80) != 0) {
      this.s = -1;
      if (sh > 0) this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
    }
    this.clamp();
    if (mi) BigInteger.ZERO.subTo(this, this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c) --this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if (this.s < 0) return "-" + this.negate().toString(b);
    var k;
    if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else return this.toRadix(b);
    var km = (1 << k) - 1,
      d,
      m = false,
      r = "",
      i = this.t;
    var p = this.DB - i * this.DB % k;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) > 0) {
        m = true;
        r = int2char(d);
      }
      while (i >= 0) {
        if (p < k) {
          d = (this[i] & (1 << p) - 1) << k - p;
          d |= this[--i] >> (p += this.DB - k);
        } else {
          d = this[i] >> (p -= k) & km;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if (d > 0) m = true;
        if (m) r += int2char(d);
      }
    }
    return m ? r : "0";
  }

  // (public) -this
  function bnNegate() {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
  }

  // (public) |this|
  function bnAbs() {
    return this.s < 0 ? this.negate() : this;
  }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s - a.s;
    if (r != 0) return r;
    var i = this.t;
    r = i - a.t;
    if (r != 0) return this.s < 0 ? -r : r;
    while (--i >= 0) if ((r = this[i] - a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1,
      t;
    if ((t = x >>> 16) != 0) {
      x = t;
      r += 16;
    }
    if ((t = x >> 8) != 0) {
      x = t;
      r += 8;
    }
    if ((t = x >> 4) != 0) {
      x = t;
      r += 4;
    }
    if ((t = x >> 2) != 0) {
      x = t;
      r += 2;
    }
    if ((t = x >> 1) != 0) {
      x = t;
      r += 1;
    }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if (this.t <= 0) return 0;
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
    for (i = n - 1; i >= 0; --i) r[i] = 0;
    r.t = this.t + n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n, r) {
    for (var i = n; i < this.t; ++i) r[i - n] = this[i];
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB),
      c = this.s << bs & this.DM,
      i;
    for (i = this.t - 1; i >= 0; --i) {
      r[i + ds + 1] = this[i] >> cbs | c;
      c = (this[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
      r.t = 0;
      return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
      r[i - ds - 1] |= (this[i] & bm) << cbs;
      r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
    r.t = this.t - ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a, r) {
    var i = 0,
      c = 0,
      m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] - a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c -= a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    } else {
      c += this.s;
      while (i < a.t) {
        c -= a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c < -1) r[i++] = this.DV + c;else if (c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a, r) {
    var x = this.abs(),
      y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) r[i] = 0;
    for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    r.s = 0;
    r.clamp();
    if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) r[i] = 0;
    for (i = 0; i < x.t - 1; ++i) {
      var c = x.am(i, x[i], r, 2 * i, 0, 1);
      if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
        r[i + x.t] -= x.DV;
        r[i + x.t + 1] = 1;
      }
    }
    if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) return;
    var pt = this.abs();
    if (pt.t < pm.t) {
      if (q != null) q.fromInt(0);
      if (r != null) this.copyTo(r);
      return;
    }
    if (r == null) r = nbi();
    var y = nbi(),
      ts = this.s,
      ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
    if (nsh > 0) {
      pm.lShiftTo(nsh, y);
      pt.lShiftTo(nsh, r);
    } else {
      pm.copyTo(y);
      pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) return;
    var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt,
      d2 = (1 << this.F1) / yt,
      e = 1 << this.F2;
    var i = r.t,
      j = i - ys,
      t = q == null ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y); // "negative" y so we can replace sub with am later
    while (y.t < ys) y[y.t++] = 0;
    while (--j >= 0) {
      // Estimate quotient digit
      var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
      if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
        // Try it out
        y.dlShiftTo(j, t);
        r.subTo(t, r);
        while (r[i] < --qd) r.subTo(t, r);
      }
    }
    if (q != null) {
      r.drShiftTo(ys, q);
      if (ts != ms) BigInteger.ZERO.subTo(q, q);
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
    if (ts < 0) BigInteger.ZERO.subTo(r, r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) {
    this.m = m;
  }
  function cConvert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);else return x;
  }
  function cRevert(x) {
    return x;
  }
  function cReduce(x) {
    x.divRemTo(this.m, null, x);
  }
  function cMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  }
  function cSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
  }
  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if (this.t < 1) return 0;
    var x = this[0];
    if ((x & 1) == 0) return 0;
    var y = x & 3; // y == 1/x mod 2^2
    y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4
    y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8
    y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return y > 0 ? this.DV - y : -y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << m.DB - 15) - 1;
    this.mt2 = 2 * m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while (x.t <= this.mt2)
    // pad x so am has enough room later
    x[x.t++] = 0;
    for (var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i] & 0x7fff;
      var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i + this.m.t;
      x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
      // propagate carry
      while (x[j] >= x.DV) {
        x[j] -= x.DV;
        x[++j]++;
      }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
  }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  }
  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() {
    return (this.t > 0 ? this[0] & 1 : this.s) == 0;
  }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e, z) {
    if (e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(),
      r2 = nbi(),
      g = z.convert(this),
      i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
      z.sqrTo(r, r2);
      if ((e & 1 << i) > 0) z.mulTo(r2, g, r);else {
        var t = r;
        r = r2;
        r2 = t;
      }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e, m) {
    var z;
    if (e < 256 || m.isEven()) z = new Classic(m);else z = new Montgomery(m);
    return this.exp(e, z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // Copyright (c) 2005-2009  Tom Wu
  // All Rights Reserved.
  // See "LICENSE" for details.

  // Extended JavaScript BN functions, required for RSA private ops.

  // Version 1.1: new BigInteger("0", 10) returns "proper" zero
  // Version 1.2: square() API, isProbablePrime fix

  // (public)
  function bnClone() {
    var r = nbi();
    this.copyTo(r);
    return r;
  }

  // (public) return value as integer
  function bnIntValue() {
    if (this.s < 0) {
      if (this.t == 1) return this[0] - this.DV;else if (this.t == 0) return -1;
    } else if (this.t == 1) return this[0];else if (this.t == 0) return 0;
    // assumes 16 < DB < 32
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
  }

  // (public) return value as byte
  function bnByteValue() {
    return this.t == 0 ? this.s : this[0] << 24 >> 24;
  }

  // (public) return value as short (assumes DB>=16)
  function bnShortValue() {
    return this.t == 0 ? this.s : this[0] << 16 >> 16;
  }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) {
    return Math.floor(Math.LN2 * this.DB / Math.log(r));
  }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if (this.s < 0) return -1;else if (this.t <= 0 || this.t == 1 && this[0] <= 0) return 0;else return 1;
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if (b == null) b = 10;
    if (this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b, cs);
    var d = nbv(a),
      y = nbi(),
      z = nbi(),
      r = "";
    this.divRemTo(d, y, z);
    while (y.signum() > 0) {
      r = (a + z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d, y, z);
    }
    return z.intValue().toString(b) + r;
  }

  // (protected) convert from radix string
  function bnpFromRadix(s, b) {
    this.fromInt(0);
    if (b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b, cs),
      mi = false,
      j = 0,
      w = 0;
    for (var i = 0; i < s.length; ++i) {
      var x = intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b * w + x;
      if (++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w, 0);
        j = 0;
        w = 0;
      }
    }
    if (j > 0) {
      this.dMultiply(Math.pow(b, j));
      this.dAddOffset(w, 0);
    }
    if (mi) BigInteger.ZERO.subTo(this, this);
  }

  // (protected) alternate constructor
  function bnpFromNumber(a, b, c) {
    if ("number" == typeof b) {
      // new BigInteger(int,int,RNG)
      if (a < 2) this.fromInt(1);else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1))
          // force MSB set
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
        if (this.isEven()) this.dAddOffset(1, 0); // force odd
        while (!this.isProbablePrime(b)) {
          this.dAddOffset(2, 0);
          if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
        }
      }
    } else {
      // new BigInteger(int,RNG)
      var x = new Array(),
        t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) x[0] &= (1 << t) - 1;else x[0] = 0;
      this.fromString(x, 256);
    }
  }

  // (public) convert to bigendian byte array
  function bnToByteArray() {
    var i = this.t,
      r = new Array();
    r[0] = this.s;
    var p = this.DB - i * this.DB % 8,
      d,
      k = 0;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) r[k++] = d | this.s << this.DB - p;
      while (i >= 0) {
        if (p < 8) {
          d = (this[i] & (1 << p) - 1) << 8 - p;
          d |= this[--i] >> (p += this.DB - 8);
        } else {
          d = this[i] >> (p -= 8) & 0xff;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if ((d & 0x80) != 0) d |= -256;
        if (k == 0 && (this.s & 0x80) != (d & 0x80)) ++k;
        if (k > 0 || d != this.s) r[k++] = d;
      }
    }
    return r;
  }
  function bnEquals(a) {
    return this.compareTo(a) == 0;
  }
  function bnMin(a) {
    return this.compareTo(a) < 0 ? this : a;
  }
  function bnMax(a) {
    return this.compareTo(a) > 0 ? this : a;
  }

  // (protected) r = this op a (bitwise)
  function bnpBitwiseTo(a, op, r) {
    var i,
      f,
      m = Math.min(a.t, this.t);
    for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
    if (a.t < this.t) {
      f = a.s & this.DM;
      for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
      r.t = this.t;
    } else {
      f = this.s & this.DM;
      for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
      r.t = a.t;
    }
    r.s = op(this.s, a.s);
    r.clamp();
  }

  // (public) this & a
  function op_and(x, y) {
    return x & y;
  }
  function bnAnd(a) {
    var r = nbi();
    this.bitwiseTo(a, op_and, r);
    return r;
  }

  // (public) this | a
  function op_or(x, y) {
    return x | y;
  }
  function bnOr(a) {
    var r = nbi();
    this.bitwiseTo(a, op_or, r);
    return r;
  }

  // (public) this ^ a
  function op_xor(x, y) {
    return x ^ y;
  }
  function bnXor(a) {
    var r = nbi();
    this.bitwiseTo(a, op_xor, r);
    return r;
  }

  // (public) this & ~a
  function op_andnot(x, y) {
    return x & ~y;
  }
  function bnAndNot(a) {
    var r = nbi();
    this.bitwiseTo(a, op_andnot, r);
    return r;
  }

  // (public) ~this
  function bnNot() {
    var r = nbi();
    for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
    r.t = this.t;
    r.s = ~this.s;
    return r;
  }

  // (public) this << n
  function bnShiftLeft(n) {
    var r = nbi();
    if (n < 0) this.rShiftTo(-n, r);else this.lShiftTo(n, r);
    return r;
  }

  // (public) this >> n
  function bnShiftRight(n) {
    var r = nbi();
    if (n < 0) this.lShiftTo(-n, r);else this.rShiftTo(n, r);
    return r;
  }

  // return index of lowest 1-bit in x, x < 2^31
  function lbit(x) {
    if (x == 0) return -1;
    var r = 0;
    if ((x & 0xffff) == 0) {
      x >>= 16;
      r += 16;
    }
    if ((x & 0xff) == 0) {
      x >>= 8;
      r += 8;
    }
    if ((x & 0xf) == 0) {
      x >>= 4;
      r += 4;
    }
    if ((x & 3) == 0) {
      x >>= 2;
      r += 2;
    }
    if ((x & 1) == 0) ++r;
    return r;
  }

  // (public) returns index of lowest 1-bit (or -1 if none)
  function bnGetLowestSetBit() {
    for (var i = 0; i < this.t; ++i) if (this[i] != 0) return i * this.DB + lbit(this[i]);
    if (this.s < 0) return this.t * this.DB;
    return -1;
  }

  // return number of 1 bits in x
  function cbit(x) {
    var r = 0;
    while (x != 0) {
      x &= x - 1;
      ++r;
    }
    return r;
  }

  // (public) return number of set bits
  function bnBitCount() {
    var r = 0,
      x = this.s & this.DM;
    for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
    return r;
  }

  // (public) true iff nth bit is set
  function bnTestBit(n) {
    var j = Math.floor(n / this.DB);
    if (j >= this.t) return this.s != 0;
    return (this[j] & 1 << n % this.DB) != 0;
  }

  // (protected) this op (1<<n)
  function bnpChangeBit(n, op) {
    var r = BigInteger.ONE.shiftLeft(n);
    this.bitwiseTo(r, op, r);
    return r;
  }

  // (public) this | (1<<n)
  function bnSetBit(n) {
    return this.changeBit(n, op_or);
  }

  // (public) this & ~(1<<n)
  function bnClearBit(n) {
    return this.changeBit(n, op_andnot);
  }

  // (public) this ^ (1<<n)
  function bnFlipBit(n) {
    return this.changeBit(n, op_xor);
  }

  // (protected) r = this + a
  function bnpAddTo(a, r) {
    var i = 0,
      c = 0,
      m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] + a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c += a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    } else {
      c += this.s;
      while (i < a.t) {
        c += a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c > 0) r[i++] = c;else if (c < -1) r[i++] = this.DV + c;
    r.t = i;
    r.clamp();
  }

  // (public) this + a
  function bnAdd(a) {
    var r = nbi();
    this.addTo(a, r);
    return r;
  }

  // (public) this - a
  function bnSubtract(a) {
    var r = nbi();
    this.subTo(a, r);
    return r;
  }

  // (public) this * a
  function bnMultiply(a) {
    var r = nbi();
    this.multiplyTo(a, r);
    return r;
  }

  // (public) this^2
  function bnSquare() {
    var r = nbi();
    this.squareTo(r);
    return r;
  }

  // (public) this / a
  function bnDivide(a) {
    var r = nbi();
    this.divRemTo(a, r, null);
    return r;
  }

  // (public) this % a
  function bnRemainder(a) {
    var r = nbi();
    this.divRemTo(a, null, r);
    return r;
  }

  // (public) [this/a,this%a]
  function bnDivideAndRemainder(a) {
    var q = nbi(),
      r = nbi();
    this.divRemTo(a, q, r);
    return new Array(q, r);
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n, w) {
    if (n == 0) return;
    while (this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while (this[w] >= this.DV) {
      this[w] -= this.DV;
      if (++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // A "null" reducer
  function NullExp() {}
  function nNop(x) {
    return x;
  }
  function nMulTo(x, y, r) {
    x.multiplyTo(y, r);
  }
  function nSqrTo(x, r) {
    x.squareTo(r);
  }
  NullExp.prototype.convert = nNop;
  NullExp.prototype.revert = nNop;
  NullExp.prototype.mulTo = nMulTo;
  NullExp.prototype.sqrTo = nSqrTo;

  // (public) this^e
  function bnPow(e) {
    return this.exp(e, new NullExp());
  }

  // (protected) r = lower n words of "this * a", a.t <= n
  // "this" should be the larger one if appropriate.
  function bnpMultiplyLowerTo(a, n, r) {
    var i = Math.min(this.t + a.t, n);
    r.s = 0; // assumes a,this >= 0
    r.t = i;
    while (i > 0) r[--i] = 0;
    var j;
    for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
    for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
    r.clamp();
  }

  // (protected) r = "this * a" without lower n words, n > 0
  // "this" should be the larger one if appropriate.
  function bnpMultiplyUpperTo(a, n, r) {
    --n;
    var i = r.t = this.t + a.t - n;
    r.s = 0; // assumes a,this >= 0
    while (--i >= 0) r[i] = 0;
    for (i = Math.max(n - this.t, 0); i < a.t; ++i) r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
    r.clamp();
    r.drShiftTo(1, r);
  }

  // Barrett modular reduction
  function Barrett(m) {
    // setup Barrett
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
    this.mu = this.r2.divide(m);
    this.m = m;
  }
  function barrettConvert(x) {
    if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);else if (x.compareTo(this.m) < 0) return x;else {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }
  }
  function barrettRevert(x) {
    return x;
  }

  // x = x mod m (HAC 14.42)
  function barrettReduce(x) {
    x.drShiftTo(this.m.t - 1, this.r2);
    if (x.t > this.m.t + 1) {
      x.t = this.m.t + 1;
      x.clamp();
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
    x.subTo(this.r2, x);
    while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
  }

  // r = x^2 mod m; x != r
  function barrettSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
  }

  // r = x*y mod m; x,y != r
  function barrettMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  }
  Barrett.prototype.convert = barrettConvert;
  Barrett.prototype.revert = barrettRevert;
  Barrett.prototype.reduce = barrettReduce;
  Barrett.prototype.mulTo = barrettMulTo;
  Barrett.prototype.sqrTo = barrettSqrTo;

  // (public) this^e % m (HAC 14.85)
  function bnModPow(e, m) {
    var i = e.bitLength(),
      k,
      r = nbv(1),
      z;
    if (i <= 0) return r;else if (i < 18) k = 1;else if (i < 48) k = 3;else if (i < 144) k = 4;else if (i < 768) k = 5;else k = 6;
    if (i < 8) z = new Classic(m);else if (m.isEven()) z = new Barrett(m);else z = new Montgomery(m);

    // precomputation
    var g = new Array(),
      n = 3,
      k1 = k - 1,
      km = (1 << k) - 1;
    g[1] = z.convert(this);
    if (k > 1) {
      var g2 = nbi();
      z.sqrTo(g[1], g2);
      while (n <= km) {
        g[n] = nbi();
        z.mulTo(g2, g[n - 2], g[n]);
        n += 2;
      }
    }
    var j = e.t - 1,
      w,
      is1 = true,
      r2 = nbi(),
      t;
    i = nbits(e[j]) - 1;
    while (j >= 0) {
      if (i >= k1) w = e[j] >> i - k1 & km;else {
        w = (e[j] & (1 << i + 1) - 1) << k1 - i;
        if (j > 0) w |= e[j - 1] >> this.DB + i - k1;
      }
      n = k;
      while ((w & 1) == 0) {
        w >>= 1;
        --n;
      }
      if ((i -= n) < 0) {
        i += this.DB;
        --j;
      }
      if (is1) {
        // ret == 1, don't bother squaring or multiplying it
        g[w].copyTo(r);
        is1 = false;
      } else {
        while (n > 1) {
          z.sqrTo(r, r2);
          z.sqrTo(r2, r);
          n -= 2;
        }
        if (n > 0) z.sqrTo(r, r2);else {
          t = r;
          r = r2;
          r2 = t;
        }
        z.mulTo(r2, g[w], r);
      }
      while (j >= 0 && (e[j] & 1 << i) == 0) {
        z.sqrTo(r, r2);
        t = r;
        r = r2;
        r2 = t;
        if (--i < 0) {
          i = this.DB - 1;
          --j;
        }
      }
    }
    return z.revert(r);
  }

  // (public) gcd(this,a) (HAC 14.54)
  function bnGCD(a) {
    var x = this.s < 0 ? this.negate() : this.clone();
    var y = a.s < 0 ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
      var t = x;
      x = y;
      y = t;
    }
    var i = x.getLowestSetBit(),
      g = y.getLowestSetBit();
    if (g < 0) return x;
    if (i < g) g = i;
    if (g > 0) {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    while (x.signum() > 0) {
      if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
      if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
      if (x.compareTo(y) >= 0) {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      } else {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
    }
    if (g > 0) y.lShiftTo(g, y);
    return y;
  }

  // (protected) this % n, n < 2^26
  function bnpModInt(n) {
    if (n <= 0) return 0;
    var d = this.DV % n,
      r = this.s < 0 ? n - 1 : 0;
    if (this.t > 0) if (d == 0) r = this[0] % n;else for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
    return r;
  }

  // (public) 1/this % m (HAC 14.61)
  function bnModInverse(m) {
    var ac = m.isEven();
    if (this.isEven() && ac || m.signum() == 0) return BigInteger.ZERO;
    var u = m.clone(),
      v = this.clone();
    var a = nbv(1),
      b = nbv(0),
      c = nbv(0),
      d = nbv(1);
    while (u.signum() != 0) {
      while (u.isEven()) {
        u.rShiftTo(1, u);
        if (ac) {
          if (!a.isEven() || !b.isEven()) {
            a.addTo(this, a);
            b.subTo(m, b);
          }
          a.rShiftTo(1, a);
        } else if (!b.isEven()) b.subTo(m, b);
        b.rShiftTo(1, b);
      }
      while (v.isEven()) {
        v.rShiftTo(1, v);
        if (ac) {
          if (!c.isEven() || !d.isEven()) {
            c.addTo(this, c);
            d.subTo(m, d);
          }
          c.rShiftTo(1, c);
        } else if (!d.isEven()) d.subTo(m, d);
        d.rShiftTo(1, d);
      }
      if (u.compareTo(v) >= 0) {
        u.subTo(v, u);
        if (ac) a.subTo(c, a);
        b.subTo(d, b);
      } else {
        v.subTo(u, v);
        if (ac) c.subTo(a, c);
        d.subTo(b, d);
      }
    }
    if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
    if (d.compareTo(m) >= 0) return d.subtract(m);
    if (d.signum() < 0) d.addTo(m, d);else return d;
    if (d.signum() < 0) return d.add(m);else return d;
  }
  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];

  // (public) test primality with certainty >= 1-.5^t
  function bnIsProbablePrime(t) {
    var i,
      x = this.abs();
    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
      for (i = 0; i < lowprimes.length; ++i) if (x[0] == lowprimes[i]) return true;
      return false;
    }
    if (x.isEven()) return false;
    i = 1;
    while (i < lowprimes.length) {
      var m = lowprimes[i],
        j = i + 1;
      while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
      m = x.modInt(m);
      while (i < j) if (m % lowprimes[i++] == 0) return false;
    }
    return x.millerRabin(t);
  }

  // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
  function bnpMillerRabin(t) {
    var n1 = this.subtract(BigInteger.ONE);
    var k = n1.getLowestSetBit();
    if (k <= 0) return false;
    var r = n1.shiftRight(k);
    t = t + 1 >> 1;
    if (t > lowprimes.length) t = lowprimes.length;
    var a = nbi();
    for (var i = 0; i < t; ++i) {
      //Pick bases at random, instead of starting at 2
      a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
      var y = a.modPow(r, this);
      if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
        var j = 1;
        while (j++ < k && y.compareTo(n1) != 0) {
          y = y.modPowInt(2, this);
          if (y.compareTo(BigInteger.ONE) == 0) return false;
        }
        if (y.compareTo(n1) != 0) return false;
      }
    }
    return true;
  }

  // protected
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.fromNumber = bnpFromNumber;
  BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
  BigInteger.prototype.changeBit = bnpChangeBit;
  BigInteger.prototype.addTo = bnpAddTo;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
  BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
  BigInteger.prototype.modInt = bnpModInt;
  BigInteger.prototype.millerRabin = bnpMillerRabin;

  // public
  BigInteger.prototype.clone = bnClone;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.byteValue = bnByteValue;
  BigInteger.prototype.shortValue = bnShortValue;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.toByteArray = bnToByteArray;
  BigInteger.prototype.equals = bnEquals;
  BigInteger.prototype.min = bnMin;
  BigInteger.prototype.max = bnMax;
  BigInteger.prototype.and = bnAnd;
  BigInteger.prototype.or = bnOr;
  BigInteger.prototype.xor = bnXor;
  BigInteger.prototype.andNot = bnAndNot;
  BigInteger.prototype.not = bnNot;
  BigInteger.prototype.shiftLeft = bnShiftLeft;
  BigInteger.prototype.shiftRight = bnShiftRight;
  BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
  BigInteger.prototype.bitCount = bnBitCount;
  BigInteger.prototype.testBit = bnTestBit;
  BigInteger.prototype.setBit = bnSetBit;
  BigInteger.prototype.clearBit = bnClearBit;
  BigInteger.prototype.flipBit = bnFlipBit;
  BigInteger.prototype.add = bnAdd;
  BigInteger.prototype.subtract = bnSubtract;
  BigInteger.prototype.multiply = bnMultiply;
  BigInteger.prototype.divide = bnDivide;
  BigInteger.prototype.remainder = bnRemainder;
  BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
  BigInteger.prototype.modPow = bnModPow;
  BigInteger.prototype.modInverse = bnModInverse;
  BigInteger.prototype.pow = bnPow;
  BigInteger.prototype.gcd = bnGCD;
  BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

  // JSBN-specific extension
  BigInteger.prototype.square = bnSquare;

  // Expose the Barrett function
  BigInteger.prototype.Barrett = Barrett;

  // BigInteger interfaces not implemented in jsbn:

  // BigInteger(int signum, byte[] magnitude)
  // double doubleValue()
  // float floatValue()
  // int hashCode()
  // long longValue()
  // static BigInteger valueOf(long val)

  // Random number generator - requires a PRNG backend, e.g. prng4.js

  // For best results, put code like
  // <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
  // in your main HTML document.

  var rng_state;
  var rng_pool;
  var rng_pptr;

  // Mix in a 32-bit integer into the pool
  function rng_seed_int(x) {
    rng_pool[rng_pptr++] ^= x & 255;
    rng_pool[rng_pptr++] ^= x >> 8 & 255;
    rng_pool[rng_pptr++] ^= x >> 16 & 255;
    rng_pool[rng_pptr++] ^= x >> 24 & 255;
    if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;
  }

  // Mix in the current time (w/milliseconds) into the pool
  function rng_seed_time() {
    rng_seed_int(new Date().getTime());
  }

  // Initialize the pool with junk if needed.
  if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (typeof window !== "undefined" && window.crypto) {
      if (window.crypto.getRandomValues) {
        // Use webcrypto if available
        var ua = new Uint8Array(32);
        window.crypto.getRandomValues(ua);
        for (t = 0; t < 32; ++t) rng_pool[rng_pptr++] = ua[t];
      } else if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
        // Extract entropy (256 bits) from NS4 RNG if available
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
      }
    }
    while (rng_pptr < rng_psize) {
      // extract some randomness from Math.random()
      t = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = t >>> 8;
      rng_pool[rng_pptr++] = t & 255;
    }
    rng_pptr = 0;
    rng_seed_time();
    //rng_seed_int(window.screenX);
    //rng_seed_int(window.screenY);
  }

  function rng_get_byte() {
    if (rng_state == null) {
      rng_seed_time();
      rng_state = prng_newstate();
      rng_state.init(rng_pool);
      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
      rng_pptr = 0;
      //rng_pool = null;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
  }
  function rng_get_bytes(ba) {
    var i;
    for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
  }
  function SecureRandom() {}
  SecureRandom.prototype.nextBytes = rng_get_bytes;

  // prng4.js - uses Arcfour as a PRNG

  function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array();
  }

  // Initialize arcfour context from key, an array of ints, each from [0..255]
  function ARC4init(key) {
    var i, j, t;
    for (i = 0; i < 256; ++i) this.S[i] = i;
    j = 0;
    for (i = 0; i < 256; ++i) {
      j = j + this.S[i] + key[i % key.length] & 255;
      t = this.S[i];
      this.S[i] = this.S[j];
      this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
  }
  function ARC4next() {
    var t;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[t + this.S[this.i] & 255];
  }
  Arcfour.prototype.init = ARC4init;
  Arcfour.prototype.next = ARC4next;

  // Plug in your RNG constructor here
  function prng_newstate() {
    return new Arcfour();
  }

  // Pool size must be a multiple of 4 and greater than 32.
  // An array of bytes the size of the pool will be passed to init()
  var rng_psize = 256;
  if (true) {
    exports = module.exports = {
      default: BigInteger,
      BigInteger: BigInteger,
      SecureRandom: SecureRandom
    };
  } else {}
}).call(this);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/JSEncrypt.js":
/*!***************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/JSEncrypt.js ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSEncrypt: function() { return /* binding */ JSEncrypt; }
/* harmony export */ });
/* harmony import */ var _lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/jsbn/base64 */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/base64.js");
/* harmony import */ var _JSEncryptRSAKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JSEncryptRSAKey */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/JSEncryptRSAKey.js");
var _a;


var version = typeof process !== 'undefined' ? (_a = process.env) === null || _a === void 0 ? void 0 : _a.npm_package_version : undefined;
/**
 *
 * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
 * possible parameters are:
 * - default_key_size        {number}  default: 1024 the key size in bit
 * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
 * - log                     {boolean} default: false whether log warn/error or not
 * @constructor
 */
var JSEncrypt = /** @class */function () {
  function JSEncrypt(options) {
    if (options === void 0) {
      options = {};
    }
    options = options || {};
    this.default_key_size = options.default_key_size ? parseInt(options.default_key_size, 10) : 1024;
    this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type
    this.log = options.log || false;
    // The private and public key.
    this.key = null;
  }
  /**
   * Method to set the rsa key parameter (one method is enough to set both the public
   * and the private key, since the private key contains the public key paramenters)
   * Log a warning if logs are enabled
   * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
   * @public
   */
  JSEncrypt.prototype.setKey = function (key) {
    if (this.log && this.key) {
      console.warn("A key was already set, overriding existing.");
    }
    this.key = new _JSEncryptRSAKey__WEBPACK_IMPORTED_MODULE_1__.JSEncryptRSAKey(key);
  };
  /**
   * Proxy method for setKey, for api compatibility
   * @see setKey
   * @public
   */
  JSEncrypt.prototype.setPrivateKey = function (privkey) {
    // Create the key.
    this.setKey(privkey);
  };
  /**
   * Proxy method for setKey, for api compatibility
   * @see setKey
   * @public
   */
  JSEncrypt.prototype.setPublicKey = function (pubkey) {
    // Sets the public key.
    this.setKey(pubkey);
  };
  /**
   * Proxy method for RSAKey object's decrypt, decrypt the string using the private
   * components of the rsa key object. Note that if the object was not set will be created
   * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
   * @param {string} str base64 encoded crypted string to decrypt
   * @return {string} the decrypted string
   * @public
   */
  JSEncrypt.prototype.decrypt = function (str) {
    // Return the decrypted string.
    try {
      return this.getKey().decrypt((0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.b64tohex)(str));
    } catch (ex) {
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's encrypt, encrypt the string using the public
   * components of the rsa key object. Note that if the object was not set will be created
   * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
   * @param {string} str the string to encrypt
   * @return {string} the encrypted string encoded in base64
   * @public
   */
  JSEncrypt.prototype.encrypt = function (str) {
    // Return the encrypted string.
    try {
      return (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.hex2b64)(this.getKey().encrypt(str));
    } catch (ex) {
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's sign.
   * @param {string} str the string to sign
   * @param {function} digestMethod hash method
   * @param {string} digestName the name of the hash algorithm
   * @return {string} the signature encoded in base64
   * @public
   */
  JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
    // return the RSA signature of 'str' in 'hex' format.
    try {
      return (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.hex2b64)(this.getKey().sign(str, digestMethod, digestName));
    } catch (ex) {
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's verify.
   * @param {string} str the string to verify
   * @param {string} signature the signature encoded in base64 to compare the string to
   * @param {function} digestMethod hash method
   * @return {boolean} whether the data and signature match
   * @public
   */
  JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
    // Return the decrypted 'digest' of the signature.
    try {
      return this.getKey().verify(str, (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.b64tohex)(signature), digestMethod);
    } catch (ex) {
      return false;
    }
  };
  /**
   * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
   * will be created and returned
   * @param {callback} [cb] the callback to be called if we want the key to be generated
   * in an async fashion
   * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
   * @public
   */
  JSEncrypt.prototype.getKey = function (cb) {
    // Only create new if it does not exist.
    if (!this.key) {
      // Get a new private key.
      this.key = new _JSEncryptRSAKey__WEBPACK_IMPORTED_MODULE_1__.JSEncryptRSAKey();
      if (cb && {}.toString.call(cb) === "[object Function]") {
        this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
        return;
      }
      // Generate the key.
      this.key.generate(this.default_key_size, this.default_public_exponent);
    }
    return this.key;
  };
  /**
   * Returns the pem encoded representation of the private key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the private key WITH header and footer
   * @public
   */
  JSEncrypt.prototype.getPrivateKey = function () {
    // Return the private representation of this key.
    return this.getKey().getPrivateKey();
  };
  /**
   * Returns the pem encoded representation of the private key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the private key WITHOUT header and footer
   * @public
   */
  JSEncrypt.prototype.getPrivateKeyB64 = function () {
    // Return the private representation of this key.
    return this.getKey().getPrivateBaseKeyB64();
  };
  /**
   * Returns the pem encoded representation of the public key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the public key WITH header and footer
   * @public
   */
  JSEncrypt.prototype.getPublicKey = function () {
    // Return the private representation of this key.
    return this.getKey().getPublicKey();
  };
  /**
   * Returns the pem encoded representation of the public key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the public key WITHOUT header and footer
   * @public
   */
  JSEncrypt.prototype.getPublicKeyB64 = function () {
    // Return the private representation of this key.
    return this.getKey().getPublicBaseKeyB64();
  };
  JSEncrypt.version = version;
  return JSEncrypt;
}();


/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/JSEncryptRSAKey.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/JSEncryptRSAKey.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSEncryptRSAKey: function() { return /* binding */ JSEncryptRSAKey; }
/* harmony export */ });
/* harmony import */ var _lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/jsbn/base64 */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/base64.js");
/* harmony import */ var _lib_asn1js_hex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/asn1js/hex */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/hex.js");
/* harmony import */ var _lib_asn1js_base64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/asn1js/base64 */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/base64.js");
/* harmony import */ var _lib_asn1js_asn1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/asn1js/asn1 */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/asn1.js");
/* harmony import */ var _lib_jsbn_rsa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/jsbn/rsa */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/rsa.js");
/* harmony import */ var _lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/jsbn/jsbn */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/jsbn.js");
/* harmony import */ var _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/jsrsasign/asn1-1.0 */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsrsasign/asn1-1.0.js");
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();







/**
 * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
 * This object is just a decorator for parsing the key parameter
 * @param {string|Object} key - The key in string format, or an object containing
 * the parameters needed to build a RSAKey object.
 * @constructor
 */
var JSEncryptRSAKey = /** @class */function (_super) {
  __extends(JSEncryptRSAKey, _super);
  function JSEncryptRSAKey(key) {
    var _this = _super.call(this) || this;
    // Call the super constructor.
    //  RSAKey.call(this);
    // If a key key was provided.
    if (key) {
      // If this is a string...
      if (typeof key === "string") {
        _this.parseKey(key);
      } else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) || JSEncryptRSAKey.hasPublicKeyProperty(key)) {
        // Set the values for the key.
        _this.parsePropertiesFrom(key);
      }
    }
    return _this;
  }
  /**
   * Method to parse a pem encoded string containing both a public or private key.
   * The method will translate the pem encoded string in a der encoded string and
   * will parse private key and public key parameters. This method accepts public key
   * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
   *
   * @todo Check how many rsa formats use the same format of pkcs #1.
   *
   * The format is defined as:
   * PublicKeyInfo ::= SEQUENCE {
   *   algorithm       AlgorithmIdentifier,
   *   PublicKey       BIT STRING
   * }
   * Where AlgorithmIdentifier is:
   * AlgorithmIdentifier ::= SEQUENCE {
   *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
   *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
   * }
   * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
   * RSAPublicKey ::= SEQUENCE {
   *   modulus           INTEGER,  -- n
   *   publicExponent    INTEGER   -- e
   * }
   * it's possible to examine the structure of the keys obtained from openssl using
   * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
   * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
   * @private
   */
  JSEncryptRSAKey.prototype.parseKey = function (pem) {
    try {
      var modulus = 0;
      var public_exponent = 0;
      var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
      var der = reHex.test(pem) ? _lib_asn1js_hex__WEBPACK_IMPORTED_MODULE_1__.Hex.decode(pem) : _lib_asn1js_base64__WEBPACK_IMPORTED_MODULE_2__.Base64.unarmor(pem);
      var asn1 = _lib_asn1js_asn1__WEBPACK_IMPORTED_MODULE_3__.ASN1.decode(der);
      // Fixes a bug with OpenSSL 1.0+ private keys
      if (asn1.sub.length === 3) {
        asn1 = asn1.sub[2].sub[0];
      }
      if (asn1.sub.length === 9) {
        // Parse the private key.
        modulus = asn1.sub[1].getHexStringValue(); // bigint
        this.n = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(modulus, 16);
        public_exponent = asn1.sub[2].getHexStringValue(); // int
        this.e = parseInt(public_exponent, 16);
        var private_exponent = asn1.sub[3].getHexStringValue(); // bigint
        this.d = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(private_exponent, 16);
        var prime1 = asn1.sub[4].getHexStringValue(); // bigint
        this.p = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(prime1, 16);
        var prime2 = asn1.sub[5].getHexStringValue(); // bigint
        this.q = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(prime2, 16);
        var exponent1 = asn1.sub[6].getHexStringValue(); // bigint
        this.dmp1 = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(exponent1, 16);
        var exponent2 = asn1.sub[7].getHexStringValue(); // bigint
        this.dmq1 = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(exponent2, 16);
        var coefficient = asn1.sub[8].getHexStringValue(); // bigint
        this.coeff = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(coefficient, 16);
      } else if (asn1.sub.length === 2) {
        if (asn1.sub[0].sub) {
          // Parse ASN.1 SubjectPublicKeyInfo type as defined by X.509
          var bit_string = asn1.sub[1];
          var sequence = bit_string.sub[0];
          modulus = sequence.sub[0].getHexStringValue();
          this.n = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(modulus, 16);
          public_exponent = sequence.sub[1].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
        } else {
          // Parse ASN.1 RSAPublicKey type as defined by PKCS #1
          modulus = asn1.sub[0].getHexStringValue();
          this.n = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(modulus, 16);
          public_exponent = asn1.sub[1].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
        }
      } else {
        return false;
      }
      return true;
    } catch (ex) {
      return false;
    }
  };
  /**
   * Translate rsa parameters in a hex encoded string representing the rsa key.
   *
   * The translation follow the ASN.1 notation :
   * RSAPrivateKey ::= SEQUENCE {
   *   version           Version,
   *   modulus           INTEGER,  -- n
   *   publicExponent    INTEGER,  -- e
   *   privateExponent   INTEGER,  -- d
   *   prime1            INTEGER,  -- p
   *   prime2            INTEGER,  -- q
   *   exponent1         INTEGER,  -- d mod (p1)
   *   exponent2         INTEGER,  -- d mod (q-1)
   *   coefficient       INTEGER,  -- (inverse of q) mod p
   * }
   * @returns {string}  DER Encoded String representing the rsa private key
   * @private
   */
  JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
    var options = {
      array: [new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        int: 0
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        bigint: this.n
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        int: this.e
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        bigint: this.d
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        bigint: this.p
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        bigint: this.q
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        bigint: this.dmp1
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        bigint: this.dmq1
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        bigint: this.coeff
      })]
    };
    var seq = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERSequence(options);
    return seq.getEncodedHex();
  };
  /**
   * base64 (pem) encoded version of the DER encoded representation
   * @returns {string} pem encoded representation without header and footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {
    return (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.hex2b64)(this.getPrivateBaseKey());
  };
  /**
   * Translate rsa parameters in a hex encoded string representing the rsa public key.
   * The representation follow the ASN.1 notation :
   * PublicKeyInfo ::= SEQUENCE {
   *   algorithm       AlgorithmIdentifier,
   *   PublicKey       BIT STRING
   * }
   * Where AlgorithmIdentifier is:
   * AlgorithmIdentifier ::= SEQUENCE {
   *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
   *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
   * }
   * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
   * RSAPublicKey ::= SEQUENCE {
   *   modulus           INTEGER,  -- n
   *   publicExponent    INTEGER   -- e
   * }
   * @returns {string} DER Encoded String representing the rsa public key
   * @private
   */
  JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
    var first_sequence = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERSequence({
      array: [new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERObjectIdentifier({
        oid: "1.2.840.113549.1.1.1"
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERNull()]
    });
    var second_sequence = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERSequence({
      array: [new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        bigint: this.n
      }), new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({
        int: this.e
      })]
    });
    var bit_string = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERBitString({
      hex: "00" + second_sequence.getEncodedHex()
    });
    var seq = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERSequence({
      array: [first_sequence, bit_string]
    });
    return seq.getEncodedHex();
  };
  /**
   * base64 (pem) encoded version of the DER encoded representation
   * @returns {string} pem encoded representation without header and footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {
    return (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.hex2b64)(this.getPublicBaseKey());
  };
  /**
   * wrap the string in block of width chars. The default value for rsa keys is 64
   * characters.
   * @param {string} str the pem encoded string without header and footer
   * @param {Number} [width=64] - the length the string has to be wrapped at
   * @returns {string}
   * @private
   */
  JSEncryptRSAKey.wordwrap = function (str, width) {
    width = width || 64;
    if (!str) {
      return str;
    }
    var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
    return str.match(RegExp(regex, "g")).join("\n");
  };
  /**
   * Retrieve the pem encoded private key
   * @returns {string} the pem encoded private key with header/footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPrivateKey = function () {
    var key = "-----BEGIN RSA PRIVATE KEY-----\n";
    key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
    key += "-----END RSA PRIVATE KEY-----";
    return key;
  };
  /**
   * Retrieve the pem encoded public key
   * @returns {string} the pem encoded public key with header/footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPublicKey = function () {
    var key = "-----BEGIN PUBLIC KEY-----\n";
    key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
    key += "-----END PUBLIC KEY-----";
    return key;
  };
  /**
   * Check if the object contains the necessary parameters to populate the rsa modulus
   * and public exponent parameters.
   * @param {Object} [obj={}] - An object that may contain the two public key
   * parameters
   * @returns {boolean} true if the object contains both the modulus and the public exponent
   * properties (n and e)
   * @todo check for types of n and e. N should be a parseable bigInt object, E should
   * be a parseable integer number
   * @private
   */
  JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
    obj = obj || {};
    return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
  };
  /**
   * Check if the object contains ALL the parameters of an RSA key.
   * @param {Object} [obj={}] - An object that may contain nine rsa key
   * parameters
   * @returns {boolean} true if the object contains all the parameters needed
   * @todo check for types of the parameters all the parameters but the public exponent
   * should be parseable bigint objects, the public exponent should be a parseable integer number
   * @private
   */
  JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
    obj = obj || {};
    return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
  };
  /**
   * Parse the properties of obj in the current rsa object. Obj should AT LEAST
   * include the modulus and public exponent (n, e) parameters.
   * @param {Object} obj - the object containing rsa parameters
   * @private
   */
  JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
    this.n = obj.n;
    this.e = obj.e;
    if (obj.hasOwnProperty("d")) {
      this.d = obj.d;
      this.p = obj.p;
      this.q = obj.q;
      this.dmp1 = obj.dmp1;
      this.dmq1 = obj.dmq1;
      this.coeff = obj.coeff;
    }
  };
  return JSEncryptRSAKey;
}(_lib_jsbn_rsa__WEBPACK_IMPORTED_MODULE_4__.RSAKey);


/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/index.js":
/*!***********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/index.js ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSEncrypt: function() { return /* reexport safe */ _JSEncrypt__WEBPACK_IMPORTED_MODULE_0__.JSEncrypt; }
/* harmony export */ });
/* harmony import */ var _JSEncrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JSEncrypt */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/JSEncrypt.js");


/* harmony default export */ __webpack_exports__["default"] = (_JSEncrypt__WEBPACK_IMPORTED_MODULE_0__.JSEncrypt);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/asn1.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/asn1.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ASN1: function() { return /* binding */ ASN1; },
/* harmony export */   ASN1Tag: function() { return /* binding */ ASN1Tag; },
/* harmony export */   Stream: function() { return /* binding */ Stream; }
/* harmony export */ });
/* harmony import */ var _int10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./int10 */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/int10.js");
// ASN.1 JavaScript decoder
// Copyright (c) 2008-2014 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
/*global oids */

var ellipsis = "\u2026";
var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function stringCut(str, len) {
  if (str.length > len) {
    str = str.substring(0, len) + ellipsis;
  }
  return str;
}
var Stream = /** @class */function () {
  function Stream(enc, pos) {
    this.hexDigits = "0123456789ABCDEF";
    if (enc instanceof Stream) {
      this.enc = enc.enc;
      this.pos = enc.pos;
    } else {
      // enc should be an array or a binary string
      this.enc = enc;
      this.pos = pos;
    }
  }
  Stream.prototype.get = function (pos) {
    if (pos === undefined) {
      pos = this.pos++;
    }
    if (pos >= this.enc.length) {
      throw new Error("Requesting byte offset ".concat(pos, " on a stream of length ").concat(this.enc.length));
    }
    return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
  };
  Stream.prototype.hexByte = function (b) {
    return this.hexDigits.charAt(b >> 4 & 0xF) + this.hexDigits.charAt(b & 0xF);
  };
  Stream.prototype.hexDump = function (start, end, raw) {
    var s = "";
    for (var i = start; i < end; ++i) {
      s += this.hexByte(this.get(i));
      if (raw !== true) {
        switch (i & 0xF) {
          case 0x7:
            s += "  ";
            break;
          case 0xF:
            s += "\n";
            break;
          default:
            s += " ";
        }
      }
    }
    return s;
  };
  Stream.prototype.isASCII = function (start, end) {
    for (var i = start; i < end; ++i) {
      var c = this.get(i);
      if (c < 32 || c > 176) {
        return false;
      }
    }
    return true;
  };
  Stream.prototype.parseStringISO = function (start, end) {
    var s = "";
    for (var i = start; i < end; ++i) {
      s += String.fromCharCode(this.get(i));
    }
    return s;
  };
  Stream.prototype.parseStringUTF = function (start, end) {
    var s = "";
    for (var i = start; i < end;) {
      var c = this.get(i++);
      if (c < 128) {
        s += String.fromCharCode(c);
      } else if (c > 191 && c < 224) {
        s += String.fromCharCode((c & 0x1F) << 6 | this.get(i++) & 0x3F);
      } else {
        s += String.fromCharCode((c & 0x0F) << 12 | (this.get(i++) & 0x3F) << 6 | this.get(i++) & 0x3F);
      }
    }
    return s;
  };
  Stream.prototype.parseStringBMP = function (start, end) {
    var str = "";
    var hi;
    var lo;
    for (var i = start; i < end;) {
      hi = this.get(i++);
      lo = this.get(i++);
      str += String.fromCharCode(hi << 8 | lo);
    }
    return str;
  };
  Stream.prototype.parseTime = function (start, end, shortYear) {
    var s = this.parseStringISO(start, end);
    var m = (shortYear ? reTimeS : reTimeL).exec(s);
    if (!m) {
      return "Unrecognized time: " + s;
    }
    if (shortYear) {
      // to avoid querying the timer, use the fixed range [1970, 2069]
      // it will conform with ITU X.400 [-10, +40] sliding window until 2030
      m[1] = +m[1];
      m[1] += +m[1] < 70 ? 2000 : 1900;
    }
    s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
    if (m[5]) {
      s += ":" + m[5];
      if (m[6]) {
        s += ":" + m[6];
        if (m[7]) {
          s += "." + m[7];
        }
      }
    }
    if (m[8]) {
      s += " UTC";
      if (m[8] != "Z") {
        s += m[8];
        if (m[9]) {
          s += ":" + m[9];
        }
      }
    }
    return s;
  };
  Stream.prototype.parseInteger = function (start, end) {
    var v = this.get(start);
    var neg = v > 127;
    var pad = neg ? 255 : 0;
    var len;
    var s = "";
    // skip unuseful bits (not allowed in DER)
    while (v == pad && ++start < end) {
      v = this.get(start);
    }
    len = end - start;
    if (len === 0) {
      return neg ? -1 : 0;
    }
    // show bit length of huge integers
    if (len > 4) {
      s = v;
      len <<= 3;
      while (((+s ^ pad) & 0x80) == 0) {
        s = +s << 1;
        --len;
      }
      s = "(" + len + " bit)\n";
    }
    // decode the integer
    if (neg) {
      v = v - 256;
    }
    var n = new _int10__WEBPACK_IMPORTED_MODULE_0__.Int10(v);
    for (var i = start + 1; i < end; ++i) {
      n.mulAdd(256, this.get(i));
    }
    return s + n.toString();
  };
  Stream.prototype.parseBitString = function (start, end, maxLength) {
    var unusedBit = this.get(start);
    var lenBit = (end - start - 1 << 3) - unusedBit;
    var intro = "(" + lenBit + " bit)\n";
    var s = "";
    for (var i = start + 1; i < end; ++i) {
      var b = this.get(i);
      var skip = i == end - 1 ? unusedBit : 0;
      for (var j = 7; j >= skip; --j) {
        s += b >> j & 1 ? "1" : "0";
      }
      if (s.length > maxLength) {
        return intro + stringCut(s, maxLength);
      }
    }
    return intro + s;
  };
  Stream.prototype.parseOctetString = function (start, end, maxLength) {
    if (this.isASCII(start, end)) {
      return stringCut(this.parseStringISO(start, end), maxLength);
    }
    var len = end - start;
    var s = "(" + len + " byte)\n";
    maxLength /= 2; // we work in bytes
    if (len > maxLength) {
      end = start + maxLength;
    }
    for (var i = start; i < end; ++i) {
      s += this.hexByte(this.get(i));
    }
    if (len > maxLength) {
      s += ellipsis;
    }
    return s;
  };
  Stream.prototype.parseOID = function (start, end, maxLength) {
    var s = "";
    var n = new _int10__WEBPACK_IMPORTED_MODULE_0__.Int10();
    var bits = 0;
    for (var i = start; i < end; ++i) {
      var v = this.get(i);
      n.mulAdd(128, v & 0x7F);
      bits += 7;
      if (!(v & 0x80)) {
        // finished
        if (s === "") {
          n = n.simplify();
          if (n instanceof _int10__WEBPACK_IMPORTED_MODULE_0__.Int10) {
            n.sub(80);
            s = "2." + n.toString();
          } else {
            var m = n < 80 ? n < 40 ? 0 : 1 : 2;
            s = m + "." + (n - m * 40);
          }
        } else {
          s += "." + n.toString();
        }
        if (s.length > maxLength) {
          return stringCut(s, maxLength);
        }
        n = new _int10__WEBPACK_IMPORTED_MODULE_0__.Int10();
        bits = 0;
      }
    }
    if (bits > 0) {
      s += ".incomplete";
    }
    return s;
  };
  return Stream;
}();

var ASN1 = /** @class */function () {
  function ASN1(stream, header, length, tag, sub) {
    if (!(tag instanceof ASN1Tag)) {
      throw new Error("Invalid tag value.");
    }
    this.stream = stream;
    this.header = header;
    this.length = length;
    this.tag = tag;
    this.sub = sub;
  }
  ASN1.prototype.typeName = function () {
    switch (this.tag.tagClass) {
      case 0:
        // universal
        switch (this.tag.tagNumber) {
          case 0x00:
            return "EOC";
          case 0x01:
            return "BOOLEAN";
          case 0x02:
            return "INTEGER";
          case 0x03:
            return "BIT_STRING";
          case 0x04:
            return "OCTET_STRING";
          case 0x05:
            return "NULL";
          case 0x06:
            return "OBJECT_IDENTIFIER";
          case 0x07:
            return "ObjectDescriptor";
          case 0x08:
            return "EXTERNAL";
          case 0x09:
            return "REAL";
          case 0x0A:
            return "ENUMERATED";
          case 0x0B:
            return "EMBEDDED_PDV";
          case 0x0C:
            return "UTF8String";
          case 0x10:
            return "SEQUENCE";
          case 0x11:
            return "SET";
          case 0x12:
            return "NumericString";
          case 0x13:
            return "PrintableString";
          // ASCII subset
          case 0x14:
            return "TeletexString";
          // aka T61String
          case 0x15:
            return "VideotexString";
          case 0x16:
            return "IA5String";
          // ASCII
          case 0x17:
            return "UTCTime";
          case 0x18:
            return "GeneralizedTime";
          case 0x19:
            return "GraphicString";
          case 0x1A:
            return "VisibleString";
          // ASCII subset
          case 0x1B:
            return "GeneralString";
          case 0x1C:
            return "UniversalString";
          case 0x1E:
            return "BMPString";
        }
        return "Universal_" + this.tag.tagNumber.toString();
      case 1:
        return "Application_" + this.tag.tagNumber.toString();
      case 2:
        return "[" + this.tag.tagNumber.toString() + "]";
      // Context
      case 3:
        return "Private_" + this.tag.tagNumber.toString();
    }
  };
  ASN1.prototype.content = function (maxLength) {
    if (this.tag === undefined) {
      return null;
    }
    if (maxLength === undefined) {
      maxLength = Infinity;
    }
    var content = this.posContent();
    var len = Math.abs(this.length);
    if (!this.tag.isUniversal()) {
      if (this.sub !== null) {
        return "(" + this.sub.length + " elem)";
      }
      return this.stream.parseOctetString(content, content + len, maxLength);
    }
    switch (this.tag.tagNumber) {
      case 0x01:
        // BOOLEAN
        return this.stream.get(content) === 0 ? "false" : "true";
      case 0x02:
        // INTEGER
        return this.stream.parseInteger(content, content + len);
      case 0x03:
        // BIT_STRING
        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);
      case 0x04:
        // OCTET_STRING
        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
      // case 0x05: // NULL
      case 0x06:
        // OBJECT_IDENTIFIER
        return this.stream.parseOID(content, content + len, maxLength);
      // case 0x07: // ObjectDescriptor
      // case 0x08: // EXTERNAL
      // case 0x09: // REAL
      // case 0x0A: // ENUMERATED
      // case 0x0B: // EMBEDDED_PDV
      case 0x10: // SEQUENCE
      case 0x11:
        // SET
        if (this.sub !== null) {
          return "(" + this.sub.length + " elem)";
        } else {
          return "(no elem)";
        }
      case 0x0C:
        // UTF8String
        return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
      case 0x12: // NumericString
      case 0x13: // PrintableString
      case 0x14: // TeletexString
      case 0x15: // VideotexString
      case 0x16: // IA5String
      // case 0x19: // GraphicString
      case 0x1A:
        // VisibleString
        // case 0x1B: // GeneralString
        // case 0x1C: // UniversalString
        return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
      case 0x1E:
        // BMPString
        return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
      case 0x17: // UTCTime
      case 0x18:
        // GeneralizedTime
        return this.stream.parseTime(content, content + len, this.tag.tagNumber == 0x17);
    }
    return null;
  };
  ASN1.prototype.toString = function () {
    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
  };
  ASN1.prototype.toPrettyString = function (indent) {
    if (indent === undefined) {
      indent = "";
    }
    var s = indent + this.typeName() + " @" + this.stream.pos;
    if (this.length >= 0) {
      s += "+";
    }
    s += this.length;
    if (this.tag.tagConstructed) {
      s += " (constructed)";
    } else if (this.tag.isUniversal() && (this.tag.tagNumber == 0x03 || this.tag.tagNumber == 0x04) && this.sub !== null) {
      s += " (encapsulates)";
    }
    s += "\n";
    if (this.sub !== null) {
      indent += "  ";
      for (var i = 0, max = this.sub.length; i < max; ++i) {
        s += this.sub[i].toPrettyString(indent);
      }
    }
    return s;
  };
  ASN1.prototype.posStart = function () {
    return this.stream.pos;
  };
  ASN1.prototype.posContent = function () {
    return this.stream.pos + this.header;
  };
  ASN1.prototype.posEnd = function () {
    return this.stream.pos + this.header + Math.abs(this.length);
  };
  ASN1.prototype.toHexString = function () {
    return this.stream.hexDump(this.posStart(), this.posEnd(), true);
  };
  ASN1.decodeLength = function (stream) {
    var buf = stream.get();
    var len = buf & 0x7F;
    if (len == buf) {
      return len;
    }
    // no reason to use Int10, as it would be a huge buffer anyways
    if (len > 6) {
      throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
    }
    if (len === 0) {
      return null;
    } // undefined
    buf = 0;
    for (var i = 0; i < len; ++i) {
      buf = buf * 256 + stream.get();
    }
    return buf;
  };
  /**
   * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
   * @returns {string}
   * @public
   */
  ASN1.prototype.getHexStringValue = function () {
    var hexString = this.toHexString();
    var offset = this.header * 2;
    var length = this.length * 2;
    return hexString.substr(offset, length);
  };
  ASN1.decode = function (str) {
    var stream;
    if (!(str instanceof Stream)) {
      stream = new Stream(str, 0);
    } else {
      stream = str;
    }
    var streamStart = new Stream(stream);
    var tag = new ASN1Tag(stream);
    var len = ASN1.decodeLength(stream);
    var start = stream.pos;
    var header = start - streamStart.pos;
    var sub = null;
    var getSub = function getSub() {
      var ret = [];
      if (len !== null) {
        // definite length
        var end = start + len;
        while (stream.pos < end) {
          ret[ret.length] = ASN1.decode(stream);
        }
        if (stream.pos != end) {
          throw new Error("Content size is not correct for container starting at offset " + start);
        }
      } else {
        // undefined length
        try {
          for (;;) {
            var s = ASN1.decode(stream);
            if (s.tag.isEOC()) {
              break;
            }
            ret[ret.length] = s;
          }
          len = start - stream.pos; // undefined lengths are represented as negative values
        } catch (e) {
          throw new Error("Exception while decoding undefined length content: " + e);
        }
      }
      return ret;
    };
    if (tag.tagConstructed) {
      // must have valid content
      sub = getSub();
    } else if (tag.isUniversal() && (tag.tagNumber == 0x03 || tag.tagNumber == 0x04)) {
      // sometimes BitString and OctetString are used to encapsulate ASN.1
      try {
        if (tag.tagNumber == 0x03) {
          if (stream.get() != 0) {
            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
          }
        }
        sub = getSub();
        for (var i = 0; i < sub.length; ++i) {
          if (sub[i].tag.isEOC()) {
            throw new Error("EOC is not supposed to be actual content.");
          }
        }
      } catch (e) {
        // but silently ignore when they don't
        sub = null;
      }
    }
    if (sub === null) {
      if (len === null) {
        throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
      }
      stream.pos = start + Math.abs(len);
    }
    return new ASN1(streamStart, header, len, tag, sub);
  };
  return ASN1;
}();

var ASN1Tag = /** @class */function () {
  function ASN1Tag(stream) {
    var buf = stream.get();
    this.tagClass = buf >> 6;
    this.tagConstructed = (buf & 0x20) !== 0;
    this.tagNumber = buf & 0x1F;
    if (this.tagNumber == 0x1F) {
      // long tag
      var n = new _int10__WEBPACK_IMPORTED_MODULE_0__.Int10();
      do {
        buf = stream.get();
        n.mulAdd(128, buf & 0x7F);
      } while (buf & 0x80);
      this.tagNumber = n.simplify();
    }
  }
  ASN1Tag.prototype.isUniversal = function () {
    return this.tagClass === 0x00;
  };
  ASN1Tag.prototype.isEOC = function () {
    return this.tagClass === 0x00 && this.tagNumber === 0x00;
  };
  return ASN1Tag;
}();


/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/base64.js":
/*!***********************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/base64.js ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base64: function() { return /* binding */ Base64; }
/* harmony export */ });
// Base64 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var decoder;
var Base64 = {
  decode: function decode(a) {
    var i;
    if (decoder === undefined) {
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var ignore = "= \f\n\r\t\xA0\u2028\u2029";
      decoder = Object.create(null);
      for (i = 0; i < 64; ++i) {
        decoder[b64.charAt(i)] = i;
      }
      decoder['-'] = 62; //+
      decoder['_'] = 63; //-
      for (i = 0; i < ignore.length; ++i) {
        decoder[ignore.charAt(i)] = -1;
      }
    }
    var out = [];
    var bits = 0;
    var char_count = 0;
    for (i = 0; i < a.length; ++i) {
      var c = a.charAt(i);
      if (c == "=") {
        break;
      }
      c = decoder[c];
      if (c == -1) {
        continue;
      }
      if (c === undefined) {
        throw new Error("Illegal character at offset " + i);
      }
      bits |= c;
      if (++char_count >= 4) {
        out[out.length] = bits >> 16;
        out[out.length] = bits >> 8 & 0xFF;
        out[out.length] = bits & 0xFF;
        bits = 0;
        char_count = 0;
      } else {
        bits <<= 6;
      }
    }
    switch (char_count) {
      case 1:
        throw new Error("Base64 encoding incomplete: at least 2 bits missing");
      case 2:
        out[out.length] = bits >> 10;
        break;
      case 3:
        out[out.length] = bits >> 16;
        out[out.length] = bits >> 8 & 0xFF;
        break;
    }
    return out;
  },
  re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
  unarmor: function unarmor(a) {
    var m = Base64.re.exec(a);
    if (m) {
      if (m[1]) {
        a = m[1];
      } else if (m[2]) {
        a = m[2];
      } else {
        throw new Error("RegExp out of sync");
      }
    }
    return Base64.decode(a);
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/hex.js":
/*!********************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/hex.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hex: function() { return /* binding */ Hex; }
/* harmony export */ });
// Hex JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var decoder;
var Hex = {
  decode: function decode(a) {
    var i;
    if (decoder === undefined) {
      var hex = "0123456789ABCDEF";
      var ignore = " \f\n\r\t\xA0\u2028\u2029";
      decoder = {};
      for (i = 0; i < 16; ++i) {
        decoder[hex.charAt(i)] = i;
      }
      hex = hex.toLowerCase();
      for (i = 10; i < 16; ++i) {
        decoder[hex.charAt(i)] = i;
      }
      for (i = 0; i < ignore.length; ++i) {
        decoder[ignore.charAt(i)] = -1;
      }
    }
    var out = [];
    var bits = 0;
    var char_count = 0;
    for (i = 0; i < a.length; ++i) {
      var c = a.charAt(i);
      if (c == "=") {
        break;
      }
      c = decoder[c];
      if (c == -1) {
        continue;
      }
      if (c === undefined) {
        throw new Error("Illegal character at offset " + i);
      }
      bits |= c;
      if (++char_count >= 2) {
        out[out.length] = bits;
        bits = 0;
        char_count = 0;
      } else {
        bits <<= 4;
      }
    }
    if (char_count) {
      throw new Error("Hex encoding incomplete: 4 bits missing");
    }
    return out;
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/int10.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/asn1js/int10.js ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Int10: function() { return /* binding */ Int10; }
/* harmony export */ });
// Big integer base-10 printing library
// Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256
var Int10 = /** @class */function () {
  function Int10(value) {
    this.buf = [+value || 0];
  }
  Int10.prototype.mulAdd = function (m, c) {
    // assert(m <= 256)
    var b = this.buf;
    var l = b.length;
    var i;
    var t;
    for (i = 0; i < l; ++i) {
      t = b[i] * m + c;
      if (t < max) {
        c = 0;
      } else {
        c = 0 | t / max;
        t -= c * max;
      }
      b[i] = t;
    }
    if (c > 0) {
      b[i] = c;
    }
  };
  Int10.prototype.sub = function (c) {
    // assert(m <= 256)
    var b = this.buf;
    var l = b.length;
    var i;
    var t;
    for (i = 0; i < l; ++i) {
      t = b[i] - c;
      if (t < 0) {
        t += max;
        c = 1;
      } else {
        c = 0;
      }
      b[i] = t;
    }
    while (b[b.length - 1] === 0) {
      b.pop();
    }
  };
  Int10.prototype.toString = function (base) {
    if ((base || 10) != 10) {
      throw new Error("only base 10 is supported");
    }
    var b = this.buf;
    var s = b[b.length - 1].toString();
    for (var i = b.length - 2; i >= 0; --i) {
      s += (max + b[i]).toString().substring(1);
    }
    return s;
  };
  Int10.prototype.valueOf = function () {
    var b = this.buf;
    var v = 0;
    for (var i = b.length - 1; i >= 0; --i) {
      v = v * max + b[i];
    }
    return v;
  };
  Int10.prototype.simplify = function () {
    var b = this.buf;
    return b.length == 1 ? b[0] : this;
  };
  return Int10;
}();


/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/base64.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/base64.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b64toBA: function() { return /* binding */ b64toBA; },
/* harmony export */   b64tohex: function() { return /* binding */ b64tohex; },
/* harmony export */   hex2b64: function() { return /* binding */ hex2b64; }
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/util.js");

var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}
// convert a base64 string to hex
function b64tohex(s) {
  var ret = "";
  var i;
  var k = 0; // b64 state, 0-3
  var slop = 0;
  for (i = 0; i < s.length; ++i) {
    if (s.charAt(i) == b64pad) {
      break;
    }
    var v = b64map.indexOf(s.charAt(i));
    if (v < 0) {
      continue;
    }
    if (k == 0) {
      ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(v >> 2);
      slop = v & 3;
      k = 1;
    } else if (k == 1) {
      ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(slop << 2 | v >> 4);
      slop = v & 0xf;
      k = 2;
    } else if (k == 2) {
      ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(slop);
      ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(v >> 2);
      slop = v & 3;
      k = 3;
    } else {
      ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(slop << 2 | v >> 4);
      ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(v & 0xf);
      k = 0;
    }
  }
  if (k == 1) {
    ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(slop << 2);
  }
  return ret;
}
// convert a base64 string to a byte/number array
function b64toBA(s) {
  // piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = [];
  for (i = 0; 2 * i < h.length; ++i) {
    a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
  }
  return a;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/jsbn.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/jsbn.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BigInteger: function() { return /* binding */ BigInteger; },
/* harmony export */   intAt: function() { return /* binding */ intAt; },
/* harmony export */   nbi: function() { return /* binding */ nbi; },
/* harmony export */   nbits: function() { return /* binding */ nbits; },
/* harmony export */   nbv: function() { return /* binding */ nbv; },
/* harmony export */   parseBigInt: function() { return /* binding */ parseBigInt; }
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/util.js");
// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.
// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;
// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = (canary & 0xffffff) == 0xefcafe;
//#region
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
//#endregion
// (public) Constructor
var BigInteger = /** @class */function () {
  function BigInteger(a, b, c) {
    if (a != null) {
      if ("number" == typeof a) {
        this.fromNumber(a, b, c);
      } else if (b == null && "string" != typeof a) {
        this.fromString(a, 256);
      } else {
        this.fromString(a, b);
      }
    }
  }
  //#region PUBLIC
  // BigInteger.prototype.toString = bnToString;
  // (public) return string representation in given radix
  BigInteger.prototype.toString = function (b) {
    if (this.s < 0) {
      return "-" + this.negate().toString(b);
    }
    var k;
    if (b == 16) {
      k = 4;
    } else if (b == 8) {
      k = 3;
    } else if (b == 2) {
      k = 1;
    } else if (b == 32) {
      k = 5;
    } else if (b == 4) {
      k = 2;
    } else {
      return this.toRadix(b);
    }
    var km = (1 << k) - 1;
    var d;
    var m = false;
    var r = "";
    var i = this.t;
    var p = this.DB - i * this.DB % k;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) > 0) {
        m = true;
        r = (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(d);
      }
      while (i >= 0) {
        if (p < k) {
          d = (this[i] & (1 << p) - 1) << k - p;
          d |= this[--i] >> (p += this.DB - k);
        } else {
          d = this[i] >> (p -= k) & km;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if (d > 0) {
          m = true;
        }
        if (m) {
          r += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(d);
        }
      }
    }
    return m ? r : "0";
  };
  // BigInteger.prototype.negate = bnNegate;
  // (public) -this
  BigInteger.prototype.negate = function () {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
  };
  // BigInteger.prototype.abs = bnAbs;
  // (public) |this|
  BigInteger.prototype.abs = function () {
    return this.s < 0 ? this.negate() : this;
  };
  // BigInteger.prototype.compareTo = bnCompareTo;
  // (public) return + if this > a, - if this < a, 0 if equal
  BigInteger.prototype.compareTo = function (a) {
    var r = this.s - a.s;
    if (r != 0) {
      return r;
    }
    var i = this.t;
    r = i - a.t;
    if (r != 0) {
      return this.s < 0 ? -r : r;
    }
    while (--i >= 0) {
      if ((r = this[i] - a[i]) != 0) {
        return r;
      }
    }
    return 0;
  };
  // BigInteger.prototype.bitLength = bnBitLength;
  // (public) return the number of bits in "this"
  BigInteger.prototype.bitLength = function () {
    if (this.t <= 0) {
      return 0;
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
  };
  // BigInteger.prototype.mod = bnMod;
  // (public) this mod a
  BigInteger.prototype.mod = function (a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
      a.subTo(r, r);
    }
    return r;
  };
  // BigInteger.prototype.modPowInt = bnModPowInt;
  // (public) this^e % m, 0 <= e < 2^32
  BigInteger.prototype.modPowInt = function (e, m) {
    var z;
    if (e < 256 || m.isEven()) {
      z = new Classic(m);
    } else {
      z = new Montgomery(m);
    }
    return this.exp(e, z);
  };
  // BigInteger.prototype.clone = bnClone;
  // (public)
  BigInteger.prototype.clone = function () {
    var r = nbi();
    this.copyTo(r);
    return r;
  };
  // BigInteger.prototype.intValue = bnIntValue;
  // (public) return value as integer
  BigInteger.prototype.intValue = function () {
    if (this.s < 0) {
      if (this.t == 1) {
        return this[0] - this.DV;
      } else if (this.t == 0) {
        return -1;
      }
    } else if (this.t == 1) {
      return this[0];
    } else if (this.t == 0) {
      return 0;
    }
    // assumes 16 < DB < 32
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
  };
  // BigInteger.prototype.byteValue = bnByteValue;
  // (public) return value as byte
  BigInteger.prototype.byteValue = function () {
    return this.t == 0 ? this.s : this[0] << 24 >> 24;
  };
  // BigInteger.prototype.shortValue = bnShortValue;
  // (public) return value as short (assumes DB>=16)
  BigInteger.prototype.shortValue = function () {
    return this.t == 0 ? this.s : this[0] << 16 >> 16;
  };
  // BigInteger.prototype.signum = bnSigNum;
  // (public) 0 if this == 0, 1 if this > 0
  BigInteger.prototype.signum = function () {
    if (this.s < 0) {
      return -1;
    } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
      return 0;
    } else {
      return 1;
    }
  };
  // BigInteger.prototype.toByteArray = bnToByteArray;
  // (public) convert to bigendian byte array
  BigInteger.prototype.toByteArray = function () {
    var i = this.t;
    var r = [];
    r[0] = this.s;
    var p = this.DB - i * this.DB % 8;
    var d;
    var k = 0;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
        r[k++] = d | this.s << this.DB - p;
      }
      while (i >= 0) {
        if (p < 8) {
          d = (this[i] & (1 << p) - 1) << 8 - p;
          d |= this[--i] >> (p += this.DB - 8);
        } else {
          d = this[i] >> (p -= 8) & 0xff;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if ((d & 0x80) != 0) {
          d |= -256;
        }
        if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
          ++k;
        }
        if (k > 0 || d != this.s) {
          r[k++] = d;
        }
      }
    }
    return r;
  };
  // BigInteger.prototype.equals = bnEquals;
  BigInteger.prototype.equals = function (a) {
    return this.compareTo(a) == 0;
  };
  // BigInteger.prototype.min = bnMin;
  BigInteger.prototype.min = function (a) {
    return this.compareTo(a) < 0 ? this : a;
  };
  // BigInteger.prototype.max = bnMax;
  BigInteger.prototype.max = function (a) {
    return this.compareTo(a) > 0 ? this : a;
  };
  // BigInteger.prototype.and = bnAnd;
  BigInteger.prototype.and = function (a) {
    var r = nbi();
    this.bitwiseTo(a, _util__WEBPACK_IMPORTED_MODULE_0__.op_and, r);
    return r;
  };
  // BigInteger.prototype.or = bnOr;
  BigInteger.prototype.or = function (a) {
    var r = nbi();
    this.bitwiseTo(a, _util__WEBPACK_IMPORTED_MODULE_0__.op_or, r);
    return r;
  };
  // BigInteger.prototype.xor = bnXor;
  BigInteger.prototype.xor = function (a) {
    var r = nbi();
    this.bitwiseTo(a, _util__WEBPACK_IMPORTED_MODULE_0__.op_xor, r);
    return r;
  };
  // BigInteger.prototype.andNot = bnAndNot;
  BigInteger.prototype.andNot = function (a) {
    var r = nbi();
    this.bitwiseTo(a, _util__WEBPACK_IMPORTED_MODULE_0__.op_andnot, r);
    return r;
  };
  // BigInteger.prototype.not = bnNot;
  // (public) ~this
  BigInteger.prototype.not = function () {
    var r = nbi();
    for (var i = 0; i < this.t; ++i) {
      r[i] = this.DM & ~this[i];
    }
    r.t = this.t;
    r.s = ~this.s;
    return r;
  };
  // BigInteger.prototype.shiftLeft = bnShiftLeft;
  // (public) this << n
  BigInteger.prototype.shiftLeft = function (n) {
    var r = nbi();
    if (n < 0) {
      this.rShiftTo(-n, r);
    } else {
      this.lShiftTo(n, r);
    }
    return r;
  };
  // BigInteger.prototype.shiftRight = bnShiftRight;
  // (public) this >> n
  BigInteger.prototype.shiftRight = function (n) {
    var r = nbi();
    if (n < 0) {
      this.lShiftTo(-n, r);
    } else {
      this.rShiftTo(n, r);
    }
    return r;
  };
  // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
  // (public) returns index of lowest 1-bit (or -1 if none)
  BigInteger.prototype.getLowestSetBit = function () {
    for (var i = 0; i < this.t; ++i) {
      if (this[i] != 0) {
        return i * this.DB + (0,_util__WEBPACK_IMPORTED_MODULE_0__.lbit)(this[i]);
      }
    }
    if (this.s < 0) {
      return this.t * this.DB;
    }
    return -1;
  };
  // BigInteger.prototype.bitCount = bnBitCount;
  // (public) return number of set bits
  BigInteger.prototype.bitCount = function () {
    var r = 0;
    var x = this.s & this.DM;
    for (var i = 0; i < this.t; ++i) {
      r += (0,_util__WEBPACK_IMPORTED_MODULE_0__.cbit)(this[i] ^ x);
    }
    return r;
  };
  // BigInteger.prototype.testBit = bnTestBit;
  // (public) true iff nth bit is set
  BigInteger.prototype.testBit = function (n) {
    var j = Math.floor(n / this.DB);
    if (j >= this.t) {
      return this.s != 0;
    }
    return (this[j] & 1 << n % this.DB) != 0;
  };
  // BigInteger.prototype.setBit = bnSetBit;
  // (public) this | (1<<n)
  BigInteger.prototype.setBit = function (n) {
    return this.changeBit(n, _util__WEBPACK_IMPORTED_MODULE_0__.op_or);
  };
  // BigInteger.prototype.clearBit = bnClearBit;
  // (public) this & ~(1<<n)
  BigInteger.prototype.clearBit = function (n) {
    return this.changeBit(n, _util__WEBPACK_IMPORTED_MODULE_0__.op_andnot);
  };
  // BigInteger.prototype.flipBit = bnFlipBit;
  // (public) this ^ (1<<n)
  BigInteger.prototype.flipBit = function (n) {
    return this.changeBit(n, _util__WEBPACK_IMPORTED_MODULE_0__.op_xor);
  };
  // BigInteger.prototype.add = bnAdd;
  // (public) this + a
  BigInteger.prototype.add = function (a) {
    var r = nbi();
    this.addTo(a, r);
    return r;
  };
  // BigInteger.prototype.subtract = bnSubtract;
  // (public) this - a
  BigInteger.prototype.subtract = function (a) {
    var r = nbi();
    this.subTo(a, r);
    return r;
  };
  // BigInteger.prototype.multiply = bnMultiply;
  // (public) this * a
  BigInteger.prototype.multiply = function (a) {
    var r = nbi();
    this.multiplyTo(a, r);
    return r;
  };
  // BigInteger.prototype.divide = bnDivide;
  // (public) this / a
  BigInteger.prototype.divide = function (a) {
    var r = nbi();
    this.divRemTo(a, r, null);
    return r;
  };
  // BigInteger.prototype.remainder = bnRemainder;
  // (public) this % a
  BigInteger.prototype.remainder = function (a) {
    var r = nbi();
    this.divRemTo(a, null, r);
    return r;
  };
  // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
  // (public) [this/a,this%a]
  BigInteger.prototype.divideAndRemainder = function (a) {
    var q = nbi();
    var r = nbi();
    this.divRemTo(a, q, r);
    return [q, r];
  };
  // BigInteger.prototype.modPow = bnModPow;
  // (public) this^e % m (HAC 14.85)
  BigInteger.prototype.modPow = function (e, m) {
    var i = e.bitLength();
    var k;
    var r = nbv(1);
    var z;
    if (i <= 0) {
      return r;
    } else if (i < 18) {
      k = 1;
    } else if (i < 48) {
      k = 3;
    } else if (i < 144) {
      k = 4;
    } else if (i < 768) {
      k = 5;
    } else {
      k = 6;
    }
    if (i < 8) {
      z = new Classic(m);
    } else if (m.isEven()) {
      z = new Barrett(m);
    } else {
      z = new Montgomery(m);
    }
    // precomputation
    var g = [];
    var n = 3;
    var k1 = k - 1;
    var km = (1 << k) - 1;
    g[1] = z.convert(this);
    if (k > 1) {
      var g2 = nbi();
      z.sqrTo(g[1], g2);
      while (n <= km) {
        g[n] = nbi();
        z.mulTo(g2, g[n - 2], g[n]);
        n += 2;
      }
    }
    var j = e.t - 1;
    var w;
    var is1 = true;
    var r2 = nbi();
    var t;
    i = nbits(e[j]) - 1;
    while (j >= 0) {
      if (i >= k1) {
        w = e[j] >> i - k1 & km;
      } else {
        w = (e[j] & (1 << i + 1) - 1) << k1 - i;
        if (j > 0) {
          w |= e[j - 1] >> this.DB + i - k1;
        }
      }
      n = k;
      while ((w & 1) == 0) {
        w >>= 1;
        --n;
      }
      if ((i -= n) < 0) {
        i += this.DB;
        --j;
      }
      if (is1) {
        // ret == 1, don't bother squaring or multiplying it
        g[w].copyTo(r);
        is1 = false;
      } else {
        while (n > 1) {
          z.sqrTo(r, r2);
          z.sqrTo(r2, r);
          n -= 2;
        }
        if (n > 0) {
          z.sqrTo(r, r2);
        } else {
          t = r;
          r = r2;
          r2 = t;
        }
        z.mulTo(r2, g[w], r);
      }
      while (j >= 0 && (e[j] & 1 << i) == 0) {
        z.sqrTo(r, r2);
        t = r;
        r = r2;
        r2 = t;
        if (--i < 0) {
          i = this.DB - 1;
          --j;
        }
      }
    }
    return z.revert(r);
  };
  // BigInteger.prototype.modInverse = bnModInverse;
  // (public) 1/this % m (HAC 14.61)
  BigInteger.prototype.modInverse = function (m) {
    var ac = m.isEven();
    if (this.isEven() && ac || m.signum() == 0) {
      return BigInteger.ZERO;
    }
    var u = m.clone();
    var v = this.clone();
    var a = nbv(1);
    var b = nbv(0);
    var c = nbv(0);
    var d = nbv(1);
    while (u.signum() != 0) {
      while (u.isEven()) {
        u.rShiftTo(1, u);
        if (ac) {
          if (!a.isEven() || !b.isEven()) {
            a.addTo(this, a);
            b.subTo(m, b);
          }
          a.rShiftTo(1, a);
        } else if (!b.isEven()) {
          b.subTo(m, b);
        }
        b.rShiftTo(1, b);
      }
      while (v.isEven()) {
        v.rShiftTo(1, v);
        if (ac) {
          if (!c.isEven() || !d.isEven()) {
            c.addTo(this, c);
            d.subTo(m, d);
          }
          c.rShiftTo(1, c);
        } else if (!d.isEven()) {
          d.subTo(m, d);
        }
        d.rShiftTo(1, d);
      }
      if (u.compareTo(v) >= 0) {
        u.subTo(v, u);
        if (ac) {
          a.subTo(c, a);
        }
        b.subTo(d, b);
      } else {
        v.subTo(u, v);
        if (ac) {
          c.subTo(a, c);
        }
        d.subTo(b, d);
      }
    }
    if (v.compareTo(BigInteger.ONE) != 0) {
      return BigInteger.ZERO;
    }
    if (d.compareTo(m) >= 0) {
      return d.subtract(m);
    }
    if (d.signum() < 0) {
      d.addTo(m, d);
    } else {
      return d;
    }
    if (d.signum() < 0) {
      return d.add(m);
    } else {
      return d;
    }
  };
  // BigInteger.prototype.pow = bnPow;
  // (public) this^e
  BigInteger.prototype.pow = function (e) {
    return this.exp(e, new NullExp());
  };
  // BigInteger.prototype.gcd = bnGCD;
  // (public) gcd(this,a) (HAC 14.54)
  BigInteger.prototype.gcd = function (a) {
    var x = this.s < 0 ? this.negate() : this.clone();
    var y = a.s < 0 ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
      var t = x;
      x = y;
      y = t;
    }
    var i = x.getLowestSetBit();
    var g = y.getLowestSetBit();
    if (g < 0) {
      return x;
    }
    if (i < g) {
      g = i;
    }
    if (g > 0) {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    while (x.signum() > 0) {
      if ((i = x.getLowestSetBit()) > 0) {
        x.rShiftTo(i, x);
      }
      if ((i = y.getLowestSetBit()) > 0) {
        y.rShiftTo(i, y);
      }
      if (x.compareTo(y) >= 0) {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      } else {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
    }
    if (g > 0) {
      y.lShiftTo(g, y);
    }
    return y;
  };
  // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
  // (public) test primality with certainty >= 1-.5^t
  BigInteger.prototype.isProbablePrime = function (t) {
    var i;
    var x = this.abs();
    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
      for (i = 0; i < lowprimes.length; ++i) {
        if (x[0] == lowprimes[i]) {
          return true;
        }
      }
      return false;
    }
    if (x.isEven()) {
      return false;
    }
    i = 1;
    while (i < lowprimes.length) {
      var m = lowprimes[i];
      var j = i + 1;
      while (j < lowprimes.length && m < lplim) {
        m *= lowprimes[j++];
      }
      m = x.modInt(m);
      while (i < j) {
        if (m % lowprimes[i++] == 0) {
          return false;
        }
      }
    }
    return x.millerRabin(t);
  };
  //#endregion PUBLIC
  //#region PROTECTED
  // BigInteger.prototype.copyTo = bnpCopyTo;
  // (protected) copy this to r
  BigInteger.prototype.copyTo = function (r) {
    for (var i = this.t - 1; i >= 0; --i) {
      r[i] = this[i];
    }
    r.t = this.t;
    r.s = this.s;
  };
  // BigInteger.prototype.fromInt = bnpFromInt;
  // (protected) set from integer value x, -DV <= x < DV
  BigInteger.prototype.fromInt = function (x) {
    this.t = 1;
    this.s = x < 0 ? -1 : 0;
    if (x > 0) {
      this[0] = x;
    } else if (x < -1) {
      this[0] = x + this.DV;
    } else {
      this.t = 0;
    }
  };
  // BigInteger.prototype.fromString = bnpFromString;
  // (protected) set from string and radix
  BigInteger.prototype.fromString = function (s, b) {
    var k;
    if (b == 16) {
      k = 4;
    } else if (b == 8) {
      k = 3;
    } else if (b == 256) {
      k = 8;
      /* byte array */
    } else if (b == 2) {
      k = 1;
    } else if (b == 32) {
      k = 5;
    } else if (b == 4) {
      k = 2;
    } else {
      this.fromRadix(s, b);
      return;
    }
    this.t = 0;
    this.s = 0;
    var i = s.length;
    var mi = false;
    var sh = 0;
    while (--i >= 0) {
      var x = k == 8 ? +s[i] & 0xff : intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-") {
          mi = true;
        }
        continue;
      }
      mi = false;
      if (sh == 0) {
        this[this.t++] = x;
      } else if (sh + k > this.DB) {
        this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
        this[this.t++] = x >> this.DB - sh;
      } else {
        this[this.t - 1] |= x << sh;
      }
      sh += k;
      if (sh >= this.DB) {
        sh -= this.DB;
      }
    }
    if (k == 8 && (+s[0] & 0x80) != 0) {
      this.s = -1;
      if (sh > 0) {
        this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
      }
    }
    this.clamp();
    if (mi) {
      BigInteger.ZERO.subTo(this, this);
    }
  };
  // BigInteger.prototype.clamp = bnpClamp;
  // (protected) clamp off excess high words
  BigInteger.prototype.clamp = function () {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c) {
      --this.t;
    }
  };
  // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  // (protected) r = this << n*DB
  BigInteger.prototype.dlShiftTo = function (n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) {
      r[i + n] = this[i];
    }
    for (i = n - 1; i >= 0; --i) {
      r[i] = 0;
    }
    r.t = this.t + n;
    r.s = this.s;
  };
  // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  // (protected) r = this >> n*DB
  BigInteger.prototype.drShiftTo = function (n, r) {
    for (var i = n; i < this.t; ++i) {
      r[i - n] = this[i];
    }
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
  };
  // BigInteger.prototype.lShiftTo = bnpLShiftTo;
  // (protected) r = this << n
  BigInteger.prototype.lShiftTo = function (n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB);
    var c = this.s << bs & this.DM;
    for (var i = this.t - 1; i >= 0; --i) {
      r[i + ds + 1] = this[i] >> cbs | c;
      c = (this[i] & bm) << bs;
    }
    for (var i = ds - 1; i >= 0; --i) {
      r[i] = 0;
    }
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
  };
  // BigInteger.prototype.rShiftTo = bnpRShiftTo;
  // (protected) r = this >> n
  BigInteger.prototype.rShiftTo = function (n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
      r.t = 0;
      return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
      r[i - ds - 1] |= (this[i] & bm) << cbs;
      r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) {
      r[this.t - ds - 1] |= (this.s & bm) << cbs;
    }
    r.t = this.t - ds;
    r.clamp();
  };
  // BigInteger.prototype.subTo = bnpSubTo;
  // (protected) r = this - a
  BigInteger.prototype.subTo = function (a, r) {
    var i = 0;
    var c = 0;
    var m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] - a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c -= a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    } else {
      c += this.s;
      while (i < a.t) {
        c -= a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c < -1) {
      r[i++] = this.DV + c;
    } else if (c > 0) {
      r[i++] = c;
    }
    r.t = i;
    r.clamp();
  };
  // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyTo = function (a, r) {
    var x = this.abs();
    var y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = 0; i < y.t; ++i) {
      r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    }
    r.s = 0;
    r.clamp();
    if (this.s != a.s) {
      BigInteger.ZERO.subTo(r, r);
    }
  };
  // BigInteger.prototype.squareTo = bnpSquareTo;
  // (protected) r = this^2, r != this (HAC 14.16)
  BigInteger.prototype.squareTo = function (r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = 0; i < x.t - 1; ++i) {
      var c = x.am(i, x[i], r, 2 * i, 0, 1);
      if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
        r[i + x.t] -= x.DV;
        r[i + x.t + 1] = 1;
      }
    }
    if (r.t > 0) {
      r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    }
    r.s = 0;
    r.clamp();
  };
  // BigInteger.prototype.divRemTo = bnpDivRemTo;
  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  BigInteger.prototype.divRemTo = function (m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) {
      return;
    }
    var pt = this.abs();
    if (pt.t < pm.t) {
      if (q != null) {
        q.fromInt(0);
      }
      if (r != null) {
        this.copyTo(r);
      }
      return;
    }
    if (r == null) {
      r = nbi();
    }
    var y = nbi();
    var ts = this.s;
    var ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
    if (nsh > 0) {
      pm.lShiftTo(nsh, y);
      pt.lShiftTo(nsh, r);
    } else {
      pm.copyTo(y);
      pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) {
      return;
    }
    var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt;
    var d2 = (1 << this.F1) / yt;
    var e = 1 << this.F2;
    var i = r.t;
    var j = i - ys;
    var t = q == null ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y); // "negative" y so we can replace sub with am later
    while (y.t < ys) {
      y[y.t++] = 0;
    }
    while (--j >= 0) {
      // Estimate quotient digit
      var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
      if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
        // Try it out
        y.dlShiftTo(j, t);
        r.subTo(t, r);
        while (r[i] < --qd) {
          r.subTo(t, r);
        }
      }
    }
    if (q != null) {
      r.drShiftTo(ys, q);
      if (ts != ms) {
        BigInteger.ZERO.subTo(q, q);
      }
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) {
      r.rShiftTo(nsh, r);
    } // Denormalize remainder
    if (ts < 0) {
      BigInteger.ZERO.subTo(r, r);
    }
  };
  // BigInteger.prototype.invDigit = bnpInvDigit;
  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  BigInteger.prototype.invDigit = function () {
    if (this.t < 1) {
      return 0;
    }
    var x = this[0];
    if ((x & 1) == 0) {
      return 0;
    }
    var y = x & 3; // y == 1/x mod 2^2
    y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4
    y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8
    y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return y > 0 ? this.DV - y : -y;
  };
  // BigInteger.prototype.isEven = bnpIsEven;
  // (protected) true iff this is even
  BigInteger.prototype.isEven = function () {
    return (this.t > 0 ? this[0] & 1 : this.s) == 0;
  };
  // BigInteger.prototype.exp = bnpExp;
  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  BigInteger.prototype.exp = function (e, z) {
    if (e > 0xffffffff || e < 1) {
      return BigInteger.ONE;
    }
    var r = nbi();
    var r2 = nbi();
    var g = z.convert(this);
    var i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
      z.sqrTo(r, r2);
      if ((e & 1 << i) > 0) {
        z.mulTo(r2, g, r);
      } else {
        var t = r;
        r = r2;
        r2 = t;
      }
    }
    return z.revert(r);
  };
  // BigInteger.prototype.chunkSize = bnpChunkSize;
  // (protected) return x s.t. r^x < DV
  BigInteger.prototype.chunkSize = function (r) {
    return Math.floor(Math.LN2 * this.DB / Math.log(r));
  };
  // BigInteger.prototype.toRadix = bnpToRadix;
  // (protected) convert to radix string
  BigInteger.prototype.toRadix = function (b) {
    if (b == null) {
      b = 10;
    }
    if (this.signum() == 0 || b < 2 || b > 36) {
      return "0";
    }
    var cs = this.chunkSize(b);
    var a = Math.pow(b, cs);
    var d = nbv(a);
    var y = nbi();
    var z = nbi();
    var r = "";
    this.divRemTo(d, y, z);
    while (y.signum() > 0) {
      r = (a + z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d, y, z);
    }
    return z.intValue().toString(b) + r;
  };
  // BigInteger.prototype.fromRadix = bnpFromRadix;
  // (protected) convert from radix string
  BigInteger.prototype.fromRadix = function (s, b) {
    this.fromInt(0);
    if (b == null) {
      b = 10;
    }
    var cs = this.chunkSize(b);
    var d = Math.pow(b, cs);
    var mi = false;
    var j = 0;
    var w = 0;
    for (var i = 0; i < s.length; ++i) {
      var x = intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-" && this.signum() == 0) {
          mi = true;
        }
        continue;
      }
      w = b * w + x;
      if (++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w, 0);
        j = 0;
        w = 0;
      }
    }
    if (j > 0) {
      this.dMultiply(Math.pow(b, j));
      this.dAddOffset(w, 0);
    }
    if (mi) {
      BigInteger.ZERO.subTo(this, this);
    }
  };
  // BigInteger.prototype.fromNumber = bnpFromNumber;
  // (protected) alternate constructor
  BigInteger.prototype.fromNumber = function (a, b, c) {
    if ("number" == typeof b) {
      // new BigInteger(int,int,RNG)
      if (a < 2) {
        this.fromInt(1);
      } else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1)) {
          // force MSB set
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), _util__WEBPACK_IMPORTED_MODULE_0__.op_or, this);
        }
        if (this.isEven()) {
          this.dAddOffset(1, 0);
        } // force odd
        while (!this.isProbablePrime(b)) {
          this.dAddOffset(2, 0);
          if (this.bitLength() > a) {
            this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
          }
        }
      }
    } else {
      // new BigInteger(int,RNG)
      var x = [];
      var t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) {
        x[0] &= (1 << t) - 1;
      } else {
        x[0] = 0;
      }
      this.fromString(x, 256);
    }
  };
  // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
  // (protected) r = this op a (bitwise)
  BigInteger.prototype.bitwiseTo = function (a, op, r) {
    var i;
    var f;
    var m = Math.min(a.t, this.t);
    for (i = 0; i < m; ++i) {
      r[i] = op(this[i], a[i]);
    }
    if (a.t < this.t) {
      f = a.s & this.DM;
      for (i = m; i < this.t; ++i) {
        r[i] = op(this[i], f);
      }
      r.t = this.t;
    } else {
      f = this.s & this.DM;
      for (i = m; i < a.t; ++i) {
        r[i] = op(f, a[i]);
      }
      r.t = a.t;
    }
    r.s = op(this.s, a.s);
    r.clamp();
  };
  // BigInteger.prototype.changeBit = bnpChangeBit;
  // (protected) this op (1<<n)
  BigInteger.prototype.changeBit = function (n, op) {
    var r = BigInteger.ONE.shiftLeft(n);
    this.bitwiseTo(r, op, r);
    return r;
  };
  // BigInteger.prototype.addTo = bnpAddTo;
  // (protected) r = this + a
  BigInteger.prototype.addTo = function (a, r) {
    var i = 0;
    var c = 0;
    var m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] + a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c += a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    } else {
      c += this.s;
      while (i < a.t) {
        c += a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c > 0) {
      r[i++] = c;
    } else if (c < -1) {
      r[i++] = this.DV + c;
    }
    r.t = i;
    r.clamp();
  };
  // BigInteger.prototype.dMultiply = bnpDMultiply;
  // (protected) this *= n, this >= 0, 1 < n < DV
  BigInteger.prototype.dMultiply = function (n) {
    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
  };
  // BigInteger.prototype.dAddOffset = bnpDAddOffset;
  // (protected) this += n << w words, this >= 0
  BigInteger.prototype.dAddOffset = function (n, w) {
    if (n == 0) {
      return;
    }
    while (this.t <= w) {
      this[this.t++] = 0;
    }
    this[w] += n;
    while (this[w] >= this.DV) {
      this[w] -= this.DV;
      if (++w >= this.t) {
        this[this.t++] = 0;
      }
      ++this[w];
    }
  };
  // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
  // (protected) r = lower n words of "this * a", a.t <= n
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
    var i = Math.min(this.t + a.t, n);
    r.s = 0; // assumes a,this >= 0
    r.t = i;
    while (i > 0) {
      r[--i] = 0;
    }
    for (var j = r.t - this.t; i < j; ++i) {
      r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
    }
    for (var j = Math.min(a.t, n); i < j; ++i) {
      this.am(0, a[i], r, i, 0, n - i);
    }
    r.clamp();
  };
  // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
  // (protected) r = "this * a" without lower n words, n > 0
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
    --n;
    var i = r.t = this.t + a.t - n;
    r.s = 0; // assumes a,this >= 0
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
      r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
    }
    r.clamp();
    r.drShiftTo(1, r);
  };
  // BigInteger.prototype.modInt = bnpModInt;
  // (protected) this % n, n < 2^26
  BigInteger.prototype.modInt = function (n) {
    if (n <= 0) {
      return 0;
    }
    var d = this.DV % n;
    var r = this.s < 0 ? n - 1 : 0;
    if (this.t > 0) {
      if (d == 0) {
        r = this[0] % n;
      } else {
        for (var i = this.t - 1; i >= 0; --i) {
          r = (d * r + this[i]) % n;
        }
      }
    }
    return r;
  };
  // BigInteger.prototype.millerRabin = bnpMillerRabin;
  // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
  BigInteger.prototype.millerRabin = function (t) {
    var n1 = this.subtract(BigInteger.ONE);
    var k = n1.getLowestSetBit();
    if (k <= 0) {
      return false;
    }
    var r = n1.shiftRight(k);
    t = t + 1 >> 1;
    if (t > lowprimes.length) {
      t = lowprimes.length;
    }
    var a = nbi();
    for (var i = 0; i < t; ++i) {
      // Pick bases at random, instead of starting at 2
      a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
      var y = a.modPow(r, this);
      if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
        var j = 1;
        while (j++ < k && y.compareTo(n1) != 0) {
          y = y.modPowInt(2, this);
          if (y.compareTo(BigInteger.ONE) == 0) {
            return false;
          }
        }
        if (y.compareTo(n1) != 0) {
          return false;
        }
      }
    }
    return true;
  };
  // BigInteger.prototype.square = bnSquare;
  // (public) this^2
  BigInteger.prototype.square = function () {
    var r = nbi();
    this.squareTo(r);
    return r;
  };
  //#region ASYNC
  // Public API method
  BigInteger.prototype.gcda = function (a, callback) {
    var x = this.s < 0 ? this.negate() : this.clone();
    var y = a.s < 0 ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
      var t = x;
      x = y;
      y = t;
    }
    var i = x.getLowestSetBit();
    var g = y.getLowestSetBit();
    if (g < 0) {
      callback(x);
      return;
    }
    if (i < g) {
      g = i;
    }
    if (g > 0) {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
    var gcda1 = function gcda1() {
      if ((i = x.getLowestSetBit()) > 0) {
        x.rShiftTo(i, x);
      }
      if ((i = y.getLowestSetBit()) > 0) {
        y.rShiftTo(i, y);
      }
      if (x.compareTo(y) >= 0) {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      } else {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
      if (!(x.signum() > 0)) {
        if (g > 0) {
          y.lShiftTo(g, y);
        }
        setTimeout(function () {
          callback(y);
        }, 0); // escape
      } else {
        setTimeout(gcda1, 0);
      }
    };
    setTimeout(gcda1, 10);
  };
  // (protected) alternate constructor
  BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
    if ("number" == typeof b) {
      if (a < 2) {
        this.fromInt(1);
      } else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1)) {
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), _util__WEBPACK_IMPORTED_MODULE_0__.op_or, this);
        }
        if (this.isEven()) {
          this.dAddOffset(1, 0);
        }
        var bnp_1 = this;
        var bnpfn1_1 = function bnpfn1_1() {
          bnp_1.dAddOffset(2, 0);
          if (bnp_1.bitLength() > a) {
            bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
          }
          if (bnp_1.isProbablePrime(b)) {
            setTimeout(function () {
              callback();
            }, 0); // escape
          } else {
            setTimeout(bnpfn1_1, 0);
          }
        };
        setTimeout(bnpfn1_1, 0);
      }
    } else {
      var x = [];
      var t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) {
        x[0] &= (1 << t) - 1;
      } else {
        x[0] = 0;
      }
      this.fromString(x, 256);
    }
  };
  return BigInteger;
}();

//#region REDUCERS
//#region NullExp
var NullExp = /** @class */function () {
  function NullExp() {}
  // NullExp.prototype.convert = nNop;
  NullExp.prototype.convert = function (x) {
    return x;
  };
  // NullExp.prototype.revert = nNop;
  NullExp.prototype.revert = function (x) {
    return x;
  };
  // NullExp.prototype.mulTo = nMulTo;
  NullExp.prototype.mulTo = function (x, y, r) {
    x.multiplyTo(y, r);
  };
  // NullExp.prototype.sqrTo = nSqrTo;
  NullExp.prototype.sqrTo = function (x, r) {
    x.squareTo(r);
  };
  return NullExp;
}();
// Modular reduction using "classic" algorithm
var Classic = /** @class */function () {
  function Classic(m) {
    this.m = m;
  }
  // Classic.prototype.convert = cConvert;
  Classic.prototype.convert = function (x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) {
      return x.mod(this.m);
    } else {
      return x;
    }
  };
  // Classic.prototype.revert = cRevert;
  Classic.prototype.revert = function (x) {
    return x;
  };
  // Classic.prototype.reduce = cReduce;
  Classic.prototype.reduce = function (x) {
    x.divRemTo(this.m, null, x);
  };
  // Classic.prototype.mulTo = cMulTo;
  Classic.prototype.mulTo = function (x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  };
  // Classic.prototype.sqrTo = cSqrTo;
  Classic.prototype.sqrTo = function (x, r) {
    x.squareTo(r);
    this.reduce(r);
  };
  return Classic;
}();
//#endregion
//#region Montgomery
// Montgomery reduction
var Montgomery = /** @class */function () {
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << m.DB - 15) - 1;
    this.mt2 = 2 * m.t;
  }
  // Montgomery.prototype.convert = montConvert;
  // xR mod m
  Montgomery.prototype.convert = function (x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
      this.m.subTo(r, r);
    }
    return r;
  };
  // Montgomery.prototype.revert = montRevert;
  // x/R mod m
  Montgomery.prototype.revert = function (x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  };
  // Montgomery.prototype.reduce = montReduce;
  // x = x/R mod m (HAC 14.32)
  Montgomery.prototype.reduce = function (x) {
    while (x.t <= this.mt2) {
      // pad x so am has enough room later
      x[x.t++] = 0;
    }
    for (var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i] & 0x7fff;
      var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i + this.m.t;
      x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
      // propagate carry
      while (x[j] >= x.DV) {
        x[j] -= x.DV;
        x[++j]++;
      }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) {
      x.subTo(this.m, x);
    }
  };
  // Montgomery.prototype.mulTo = montMulTo;
  // r = "xy/R mod m"; x,y != r
  Montgomery.prototype.mulTo = function (x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  };
  // Montgomery.prototype.sqrTo = montSqrTo;
  // r = "x^2/R mod m"; x != r
  Montgomery.prototype.sqrTo = function (x, r) {
    x.squareTo(r);
    this.reduce(r);
  };
  return Montgomery;
}();
//#endregion Montgomery
//#region Barrett
// Barrett modular reduction
var Barrett = /** @class */function () {
  function Barrett(m) {
    this.m = m;
    // setup Barrett
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
    this.mu = this.r2.divide(m);
  }
  // Barrett.prototype.convert = barrettConvert;
  Barrett.prototype.convert = function (x) {
    if (x.s < 0 || x.t > 2 * this.m.t) {
      return x.mod(this.m);
    } else if (x.compareTo(this.m) < 0) {
      return x;
    } else {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }
  };
  // Barrett.prototype.revert = barrettRevert;
  Barrett.prototype.revert = function (x) {
    return x;
  };
  // Barrett.prototype.reduce = barrettReduce;
  // x = x mod m (HAC 14.42)
  Barrett.prototype.reduce = function (x) {
    x.drShiftTo(this.m.t - 1, this.r2);
    if (x.t > this.m.t + 1) {
      x.t = this.m.t + 1;
      x.clamp();
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (x.compareTo(this.r2) < 0) {
      x.dAddOffset(1, this.m.t + 1);
    }
    x.subTo(this.r2, x);
    while (x.compareTo(this.m) >= 0) {
      x.subTo(this.m, x);
    }
  };
  // Barrett.prototype.mulTo = barrettMulTo;
  // r = x*y mod m; x,y != r
  Barrett.prototype.mulTo = function (x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  };
  // Barrett.prototype.sqrTo = barrettSqrTo;
  // r = x^2 mod m; x != r
  Barrett.prototype.sqrTo = function (x, r) {
    x.squareTo(r);
    this.reduce(r);
  };
  return Barrett;
}();
//#endregion
//#endregion REDUCERS
// return new, unset BigInteger
function nbi() {
  return new BigInteger(null);
}
function parseBigInt(str, r) {
  return new BigInteger(str, r);
}
// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.
var inBrowser = typeof navigator !== "undefined";
if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  BigInteger.prototype.am = function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff;
    var xh = x >> 15;
    while (--n >= 0) {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }
    return c;
  };
  dbits = 30;
} else if (inBrowser && j_lm && navigator.appName != "Netscape") {
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  BigInteger.prototype.am = function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }
    return c;
  };
  dbits = 26;
} else {
  // Mozilla/Netscape seems to prefer am3
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  BigInteger.prototype.am = function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff;
    var xh = x >> 14;
    while (--n >= 0) {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }
    return c;
  };
  dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
// Digit conversions
var BI_RC = [];
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function intAt(s, i) {
  var c = BI_RC[s.charCodeAt(i)];
  return c == null ? -1 : c;
}
// return bigint initialized to value
function nbv(i) {
  var r = nbi();
  r.fromInt(i);
  return r;
}
// returns bit length of the integer x
function nbits(x) {
  var r = 1;
  var t;
  if ((t = x >>> 16) != 0) {
    x = t;
    r += 16;
  }
  if ((t = x >> 8) != 0) {
    x = t;
    r += 8;
  }
  if ((t = x >> 4) != 0) {
    x = t;
    r += 4;
  }
  if ((t = x >> 2) != 0) {
    x = t;
    r += 2;
  }
  if ((t = x >> 1) != 0) {
    x = t;
    r += 1;
  }
  return r;
}
// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/prng4.js":
/*!********************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/prng4.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arcfour: function() { return /* binding */ Arcfour; },
/* harmony export */   prng_newstate: function() { return /* binding */ prng_newstate; },
/* harmony export */   rng_psize: function() { return /* binding */ rng_psize; }
/* harmony export */ });
// prng4.js - uses Arcfour as a PRNG
var Arcfour = /** @class */function () {
  function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = [];
  }
  // Arcfour.prototype.init = ARC4init;
  // Initialize arcfour context from key, an array of ints, each from [0..255]
  Arcfour.prototype.init = function (key) {
    var i;
    var j;
    var t;
    for (i = 0; i < 256; ++i) {
      this.S[i] = i;
    }
    j = 0;
    for (i = 0; i < 256; ++i) {
      j = j + this.S[i] + key[i % key.length] & 255;
      t = this.S[i];
      this.S[i] = this.S[j];
      this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
  };
  // Arcfour.prototype.next = ARC4next;
  Arcfour.prototype.next = function () {
    var t;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[t + this.S[this.i] & 255];
  };
  return Arcfour;
}();

// Plug in your RNG constructor here
function prng_newstate() {
  return new Arcfour();
}
// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/rng.js":
/*!******************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/rng.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SecureRandom: function() { return /* binding */ SecureRandom; }
/* harmony export */ });
/* harmony import */ var _prng4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prng4 */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/prng4.js");
// Random number generator - requires a PRNG backend, e.g. prng4.js

var rng_state;
var rng_pool = null;
var rng_pptr;
// Initialize the pool with junk if needed.
if (rng_pool == null) {
  rng_pool = [];
  rng_pptr = 0;
  var t = void 0;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    // Extract entropy (2048 bits) from RNG if available
    var z = new Uint32Array(256);
    window.crypto.getRandomValues(z);
    for (t = 0; t < z.length; ++t) {
      rng_pool[rng_pptr++] = z[t] & 255;
    }
  }
  // Use mouse events for entropy, if we do not have enough entropy by the time
  // we need it, entropy will be generated by Math.random.
  var count = 0;
  var onMouseMoveListener_1 = function onMouseMoveListener_1(ev) {
    count = count || 0;
    if (count >= 256 || rng_pptr >= _prng4__WEBPACK_IMPORTED_MODULE_0__.rng_psize) {
      if (window.removeEventListener) {
        window.removeEventListener("mousemove", onMouseMoveListener_1, false);
      } else if (window.detachEvent) {
        window.detachEvent("onmousemove", onMouseMoveListener_1);
      }
      return;
    }
    try {
      var mouseCoordinates = ev.x + ev.y;
      rng_pool[rng_pptr++] = mouseCoordinates & 255;
      count += 1;
    } catch (e) {
      // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
    }
  };
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener("mousemove", onMouseMoveListener_1, false);
    } else if (window.attachEvent) {
      window.attachEvent("onmousemove", onMouseMoveListener_1);
    }
  }
}
function rng_get_byte() {
  if (rng_state == null) {
    rng_state = (0,_prng4__WEBPACK_IMPORTED_MODULE_0__.prng_newstate)();
    // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
    while (rng_pptr < _prng4__WEBPACK_IMPORTED_MODULE_0__.rng_psize) {
      var random = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
      rng_pool[rng_pptr] = 0;
    }
    rng_pptr = 0;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}
var SecureRandom = /** @class */function () {
  function SecureRandom() {}
  SecureRandom.prototype.nextBytes = function (ba) {
    for (var i = 0; i < ba.length; ++i) {
      ba[i] = rng_get_byte();
    }
  };
  return SecureRandom;
}();


/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/rsa.js":
/*!******************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/rsa.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RSAKey: function() { return /* binding */ RSAKey; }
/* harmony export */ });
/* harmony import */ var _jsbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsbn */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/jsbn.js");
/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/rng.js");
// Depends on jsbn.js and rng.js
// Version 1.1: support utf-8 encoding in pkcs1pad2
// convert a (hex) string to a bignum object


// function linebrk(s,n) {
//   var ret = "";
//   var i = 0;
//   while(i + n < s.length) {
//     ret += s.substring(i,i+n) + "\n";
//     i += n;
//   }
//   return ret + s.substring(i,s.length);
// }
// function byte2Hex(b) {
//   if(b < 0x10)
//     return "0" + b.toString(16);
//   else
//     return b.toString(16);
// }
function pkcs1pad1(s, n) {
  if (n < s.length + 22) {
    console.error("Message too long for RSA");
    return null;
  }
  var len = n - s.length - 6;
  var filler = "";
  for (var f = 0; f < len; f += 2) {
    filler += "ff";
  }
  var m = "0001" + filler + "00" + s;
  return (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(m, 16);
}
// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s, n) {
  if (n < s.length + 11) {
    // TODO: fix for utf-8
    console.error("Message too long for RSA");
    return null;
  }
  var ba = [];
  var i = s.length - 1;
  while (i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if (c < 128) {
      // encode using utf-8
      ba[--n] = c;
    } else if (c > 127 && c < 2048) {
      ba[--n] = c & 63 | 128;
      ba[--n] = c >> 6 | 192;
    } else {
      ba[--n] = c & 63 | 128;
      ba[--n] = c >> 6 & 63 | 128;
      ba[--n] = c >> 12 | 224;
    }
  }
  ba[--n] = 0;
  var rng = new _rng__WEBPACK_IMPORTED_MODULE_1__.SecureRandom();
  var x = [];
  while (n > 2) {
    // random non-zero pad
    x[0] = 0;
    while (x[0] == 0) {
      rng.nextBytes(x);
    }
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(ba);
}
// "empty" RSA key constructor
var RSAKey = /** @class */function () {
  function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
  }
  //#region PROTECTED
  // protected
  // RSAKey.prototype.doPublic = RSADoPublic;
  // Perform raw public operation on "x": return x^e (mod n)
  RSAKey.prototype.doPublic = function (x) {
    return x.modPowInt(this.e, this.n);
  };
  // RSAKey.prototype.doPrivate = RSADoPrivate;
  // Perform raw private operation on "x": return x^d (mod n)
  RSAKey.prototype.doPrivate = function (x) {
    if (this.p == null || this.q == null) {
      return x.modPow(this.d, this.n);
    }
    // TODO: re-calculate any missing CRT params
    var xp = x.mod(this.p).modPow(this.dmp1, this.p);
    var xq = x.mod(this.q).modPow(this.dmq1, this.q);
    while (xp.compareTo(xq) < 0) {
      xp = xp.add(this.p);
    }
    return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
  };
  //#endregion PROTECTED
  //#region PUBLIC
  // RSAKey.prototype.setPublic = RSASetPublic;
  // Set the public key fields N and e from hex strings
  RSAKey.prototype.setPublic = function (N, E) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(N, 16);
      this.e = parseInt(E, 16);
    } else {
      console.error("Invalid RSA public key");
    }
  };
  // RSAKey.prototype.encrypt = RSAEncrypt;
  // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
  RSAKey.prototype.encrypt = function (text) {
    var maxLength = this.n.bitLength() + 7 >> 3;
    var m = pkcs1pad2(text, maxLength);
    if (m == null) {
      return null;
    }
    var c = this.doPublic(m);
    if (c == null) {
      return null;
    }
    var h = c.toString(16);
    var length = h.length;
    // fix zero before result
    for (var i = 0; i < maxLength * 2 - length; i++) {
      h = "0" + h;
    }
    return h;
  };
  // RSAKey.prototype.setPrivate = RSASetPrivate;
  // Set the private key fields N, e, and d from hex strings
  RSAKey.prototype.setPrivate = function (N, E, D) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(N, 16);
      this.e = parseInt(E, 16);
      this.d = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(D, 16);
    } else {
      console.error("Invalid RSA private key");
    }
  };
  // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
  // Set the private key fields N, e, d and CRT params from hex strings
  RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(N, 16);
      this.e = parseInt(E, 16);
      this.d = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(D, 16);
      this.p = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(P, 16);
      this.q = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(Q, 16);
      this.dmp1 = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(DP, 16);
      this.dmq1 = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(DQ, 16);
      this.coeff = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(C, 16);
    } else {
      console.error("Invalid RSA private key");
    }
  };
  // RSAKey.prototype.generate = RSAGenerate;
  // Generate a new random private key B bits long, using public expt E
  RSAKey.prototype.generate = function (B, E) {
    var rng = new _rng__WEBPACK_IMPORTED_MODULE_1__.SecureRandom();
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(E, 16);
    for (;;) {
      for (;;) {
        this.p = new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(B - qs, 1, rng);
        if (this.p.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE).gcd(ee).compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
          break;
        }
      }
      for (;;) {
        this.q = new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(qs, 1, rng);
        if (this.q.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE).gcd(ee).compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
          break;
        }
      }
      if (this.p.compareTo(this.q) <= 0) {
        var t = this.p;
        this.p = this.q;
        this.q = t;
      }
      var p1 = this.p.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);
      var q1 = this.q.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);
      var phi = p1.multiply(q1);
      if (phi.gcd(ee).compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0) {
        this.n = this.p.multiply(this.q);
        this.d = ee.modInverse(phi);
        this.dmp1 = this.d.mod(p1);
        this.dmq1 = this.d.mod(q1);
        this.coeff = this.q.modInverse(this.p);
        break;
      }
    }
  };
  // RSAKey.prototype.decrypt = RSADecrypt;
  // Return the PKCS#1 RSA decryption of "ctext".
  // "ctext" is an even-length hex string and the output is a plain string.
  RSAKey.prototype.decrypt = function (ctext) {
    var c = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(ctext, 16);
    var m = this.doPrivate(c);
    if (m == null) {
      return null;
    }
    return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
  };
  // Generate a new random private key B bits long, using public expt E
  RSAKey.prototype.generateAsync = function (B, E, callback) {
    var rng = new _rng__WEBPACK_IMPORTED_MODULE_1__.SecureRandom();
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(E, 16);
    var rsa = this;
    // These functions have non-descript names because they were originally for(;;) loops.
    // I don't know about cryptography to give them better names than loop1-4.
    var loop1 = function loop1() {
      var loop4 = function loop4() {
        if (rsa.p.compareTo(rsa.q) <= 0) {
          var t = rsa.p;
          rsa.p = rsa.q;
          rsa.q = t;
        }
        var p1 = rsa.p.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);
        var q1 = rsa.q.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);
        var phi = p1.multiply(q1);
        if (phi.gcd(ee).compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0) {
          rsa.n = rsa.p.multiply(rsa.q);
          rsa.d = ee.modInverse(phi);
          rsa.dmp1 = rsa.d.mod(p1);
          rsa.dmq1 = rsa.d.mod(q1);
          rsa.coeff = rsa.q.modInverse(rsa.p);
          setTimeout(function () {
            callback();
          }, 0); // escape
        } else {
          setTimeout(loop1, 0);
        }
      };
      var loop3 = function loop3() {
        rsa.q = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.nbi)();
        rsa.q.fromNumberAsync(qs, 1, rng, function () {
          rsa.q.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE).gcda(ee, function (r) {
            if (r.compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
              setTimeout(loop4, 0);
            } else {
              setTimeout(loop3, 0);
            }
          });
        });
      };
      var loop2 = function loop2() {
        rsa.p = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.nbi)();
        rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
          rsa.p.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE).gcda(ee, function (r) {
            if (r.compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
              setTimeout(loop3, 0);
            } else {
              setTimeout(loop2, 0);
            }
          });
        });
      };
      setTimeout(loop2, 0);
    };
    setTimeout(loop1, 0);
  };
  RSAKey.prototype.sign = function (text, digestMethod, digestName) {
    var header = getDigestHeader(digestName);
    var digest = header + digestMethod(text).toString();
    var m = pkcs1pad1(digest, this.n.bitLength() / 4);
    if (m == null) {
      return null;
    }
    var c = this.doPrivate(m);
    if (c == null) {
      return null;
    }
    var h = c.toString(16);
    if ((h.length & 1) == 0) {
      return h;
    } else {
      return "0" + h;
    }
  };
  RSAKey.prototype.verify = function (text, signature, digestMethod) {
    var c = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(signature, 16);
    var m = this.doPublic(c);
    if (m == null) {
      return null;
    }
    var unpadded = m.toString(16).replace(/^1f+00/, "");
    var digest = removeDigestHeader(unpadded);
    return digest == digestMethod(text).toString();
  };
  return RSAKey;
}();

// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
function pkcs1unpad2(d, n) {
  var b = d.toByteArray();
  var i = 0;
  while (i < b.length && b[i] == 0) {
    ++i;
  }
  if (b.length - i != n - 1 || b[i] != 2) {
    return null;
  }
  ++i;
  while (b[i] != 0) {
    if (++i >= b.length) {
      return null;
    }
  }
  var ret = "";
  while (++i < b.length) {
    var c = b[i] & 255;
    if (c < 128) {
      // utf-8 decode
      ret += String.fromCharCode(c);
    } else if (c > 191 && c < 224) {
      ret += String.fromCharCode((c & 31) << 6 | b[i + 1] & 63);
      ++i;
    } else {
      ret += String.fromCharCode((c & 15) << 12 | (b[i + 1] & 63) << 6 | b[i + 2] & 63);
      i += 2;
    }
  }
  return ret;
}
// https://tools.ietf.org/html/rfc3447#page-43
var DIGEST_HEADERS = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function getDigestHeader(name) {
  return DIGEST_HEADERS[name] || "";
}
function removeDigestHeader(str) {
  for (var name_1 in DIGEST_HEADERS) {
    if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
      var header = DIGEST_HEADERS[name_1];
      var len = header.length;
      if (str.substr(0, len) == header) {
        return str.substr(len);
      }
    }
  }
  return str;
}
// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
// function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
// }
// public
// RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/util.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/util.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cbit: function() { return /* binding */ cbit; },
/* harmony export */   int2char: function() { return /* binding */ int2char; },
/* harmony export */   lbit: function() { return /* binding */ lbit; },
/* harmony export */   op_and: function() { return /* binding */ op_and; },
/* harmony export */   op_andnot: function() { return /* binding */ op_andnot; },
/* harmony export */   op_or: function() { return /* binding */ op_or; },
/* harmony export */   op_xor: function() { return /* binding */ op_xor; }
/* harmony export */ });
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) {
  return BI_RM.charAt(n);
}
//#region BIT_OPERATIONS
// (public) this & a
function op_and(x, y) {
  return x & y;
}
// (public) this | a
function op_or(x, y) {
  return x | y;
}
// (public) this ^ a
function op_xor(x, y) {
  return x ^ y;
}
// (public) this & ~a
function op_andnot(x, y) {
  return x & ~y;
}
// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if (x == 0) {
    return -1;
  }
  var r = 0;
  if ((x & 0xffff) == 0) {
    x >>= 16;
    r += 16;
  }
  if ((x & 0xff) == 0) {
    x >>= 8;
    r += 8;
  }
  if ((x & 0xf) == 0) {
    x >>= 4;
    r += 4;
  }
  if ((x & 3) == 0) {
    x >>= 2;
    r += 2;
  }
  if ((x & 1) == 0) {
    ++r;
  }
  return r;
}
// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while (x != 0) {
    x &= x - 1;
    ++r;
  }
  return r;
}
//#endregion BIT_OPERATIONS

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsrsasign/asn1-1.0.js":
/*!****************************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsrsasign/asn1-1.0.js ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KJUR: function() { return /* binding */ KJUR; }
/* harmony export */ });
/* harmony import */ var _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsbn/jsbn */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsbn/jsbn.js");
/* harmony import */ var _yahoo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./yahoo */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsrsasign/yahoo.js");
/* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
/*
 * asn1.js - ASN.1 DER encoder classes
 *
 * Copyright (c) 2013-2017 Kenji Urushima (kenji.urushima@gmail.com)
 *
 * This software is licensed under the terms of the MIT License.
 * https://kjur.github.io/jsrsasign/license
 *
 * The above copyright and license notice shall be
 * included in all copies or substantial portions of the Software.
 */


/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
/**
 * kjur's class library name space
 * <p>
 * This name space provides following name spaces:
 * <ul>
 * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
 * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
 * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
 * class and utilities</li>
 * </ul>
 * </p>
 * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
 * @name KJUR
 * @namespace kjur's class library name space
 */
var KJUR = {};
/**
 * kjur's ASN.1 class library name space
 * <p>
 * This is ITU-T X.690 ASN.1 DER encoder class library and
 * class structure and methods is very similar to
 * org.bouncycastle.asn1 package of
 * well known BouncyCaslte Cryptography Library.
 * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
 * Here are ASN.1 DER primitive classes.
 * <ul>
 * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>
 * <li>0x02 {@link KJUR.asn1.DERInteger}</li>
 * <li>0x03 {@link KJUR.asn1.DERBitString}</li>
 * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>
 * <li>0x05 {@link KJUR.asn1.DERNull}</li>
 * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>
 * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>
 * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>
 * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>
 * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>
 * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>
 * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>
 * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>
 * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>
 * <li>0x30 {@link KJUR.asn1.DERSequence}</li>
 * <li>0x31 {@link KJUR.asn1.DERSet}</li>
 * </ul>
 * <h4>OTHER ASN.1 CLASSES</h4>
 * <ul>
 * <li>{@link KJUR.asn1.ASN1Object}</li>
 * <li>{@link KJUR.asn1.DERAbstractString}</li>
 * <li>{@link KJUR.asn1.DERAbstractTime}</li>
 * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
 * <li>{@link KJUR.asn1.DERTaggedObject}</li>
 * </ul>
 * <h4>SUB NAME SPACES</h4>
 * <ul>
 * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>
 * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>
 * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>
 * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>
 * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>
 * </ul>
 * </p>
 * NOTE: Please ignore method summary and document of this namespace.
 * This caused by a bug of jsdoc2.
 * @name KJUR.asn1
 * @namespace
 */
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};
/**
 * ASN1 utilities class
 * @name KJUR.asn1.ASN1Util
 * @class ASN1 utilities class
 * @since asn1 1.0.2
 */
KJUR.asn1.ASN1Util = new function () {
  this.integerToByteHex = function (i) {
    var h = i.toString(16);
    if (h.length % 2 == 1) h = '0' + h;
    return h;
  };
  this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
    var h = bigIntegerValue.toString(16);
    if (h.substr(0, 1) != '-') {
      if (h.length % 2 == 1) {
        h = '0' + h;
      } else {
        if (!h.match(/^[0-7]/)) {
          h = '00' + h;
        }
      }
    } else {
      var hPos = h.substr(1);
      var xorLen = hPos.length;
      if (xorLen % 2 == 1) {
        xorLen += 1;
      } else {
        if (!h.match(/^[0-7]/)) {
          xorLen += 2;
        }
      }
      var hMask = '';
      for (var i = 0; i < xorLen; i++) {
        hMask += 'f';
      }
      var biMask = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(hMask, 16);
      var biNeg = biMask.xor(bigIntegerValue).add(_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);
      h = biNeg.toString(16).replace(/^-/, '');
    }
    return h;
  };
  /**
   * get PEM string from hexadecimal data and header string
   * @name getPEMStringFromHex
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {String} dataHex hexadecimal string of PEM body
   * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
   * @return {String} PEM formatted string of input data
   * @description
   * This method converts a hexadecimal string to a PEM string with
   * a specified header. Its line break will be CRLF("\r\n").
   * @example
   * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
   * // value of pem will be:
   * -----BEGIN PRIVATE KEY-----
   * YWFh
   * -----END PRIVATE KEY-----
   */
  this.getPEMStringFromHex = function (dataHex, pemHeader) {
    return hextopem(dataHex, pemHeader);
  };
  /**
   * generate ASN1Object specifed by JSON parameters
   * @name newObject
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {Array} param JSON parameter to generate ASN1Object
   * @return {KJUR.asn1.ASN1Object} generated object
   * @since asn1 1.0.3
   * @description
   * generate any ASN1Object specified by JSON param
   * including ASN.1 primitive or structured.
   * Generally 'param' can be described as follows:
   * <blockquote>
   * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}
   * </blockquote>
   * 'TYPE-OF-ASN1OBJ' can be one of following symbols:
   * <ul>
   * <li>'bool' - DERBoolean</li>
   * <li>'int' - DERInteger</li>
   * <li>'bitstr' - DERBitString</li>
   * <li>'octstr' - DEROctetString</li>
   * <li>'null' - DERNull</li>
   * <li>'oid' - DERObjectIdentifier</li>
   * <li>'enum' - DEREnumerated</li>
   * <li>'utf8str' - DERUTF8String</li>
   * <li>'numstr' - DERNumericString</li>
   * <li>'prnstr' - DERPrintableString</li>
   * <li>'telstr' - DERTeletexString</li>
   * <li>'ia5str' - DERIA5String</li>
   * <li>'utctime' - DERUTCTime</li>
   * <li>'gentime' - DERGeneralizedTime</li>
   * <li>'seq' - DERSequence</li>
   * <li>'set' - DERSet</li>
   * <li>'tag' - DERTaggedObject</li>
   * </ul>
   * @example
   * newObject({'prnstr': 'aaa'});
   * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})
   * // ASN.1 Tagged Object
   * newObject({'tag': {'tag': 'a1',
   *                    'explicit': true,
   *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});
   * // more simple representation of ASN.1 Tagged Object
   * newObject({'tag': ['a1',
   *                    true,
   *                    {'seq': [
   *                      {'int': 3},
   *                      {'prnstr': 'aaa'}]}
   *                   ]});
   */
  this.newObject = function (param) {
    var _KJUR = KJUR,
      _KJUR_asn1 = _KJUR.asn1,
      _DERBoolean = _KJUR_asn1.DERBoolean,
      _DERInteger = _KJUR_asn1.DERInteger,
      _DERBitString = _KJUR_asn1.DERBitString,
      _DEROctetString = _KJUR_asn1.DEROctetString,
      _DERNull = _KJUR_asn1.DERNull,
      _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier,
      _DEREnumerated = _KJUR_asn1.DEREnumerated,
      _DERUTF8String = _KJUR_asn1.DERUTF8String,
      _DERNumericString = _KJUR_asn1.DERNumericString,
      _DERPrintableString = _KJUR_asn1.DERPrintableString,
      _DERTeletexString = _KJUR_asn1.DERTeletexString,
      _DERIA5String = _KJUR_asn1.DERIA5String,
      _DERUTCTime = _KJUR_asn1.DERUTCTime,
      _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime,
      _DERSequence = _KJUR_asn1.DERSequence,
      _DERSet = _KJUR_asn1.DERSet,
      _DERTaggedObject = _KJUR_asn1.DERTaggedObject,
      _newObject = _KJUR_asn1.ASN1Util.newObject;
    var keys = Object.keys(param);
    if (keys.length != 1) throw "key of param shall be only one.";
    var key = keys[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1) throw "undefined key: " + key;
    if (key == "bool") return new _DERBoolean(param[key]);
    if (key == "int") return new _DERInteger(param[key]);
    if (key == "bitstr") return new _DERBitString(param[key]);
    if (key == "octstr") return new _DEROctetString(param[key]);
    if (key == "null") return new _DERNull(param[key]);
    if (key == "oid") return new _DERObjectIdentifier(param[key]);
    if (key == "enum") return new _DEREnumerated(param[key]);
    if (key == "utf8str") return new _DERUTF8String(param[key]);
    if (key == "numstr") return new _DERNumericString(param[key]);
    if (key == "prnstr") return new _DERPrintableString(param[key]);
    if (key == "telstr") return new _DERTeletexString(param[key]);
    if (key == "ia5str") return new _DERIA5String(param[key]);
    if (key == "utctime") return new _DERUTCTime(param[key]);
    if (key == "gentime") return new _DERGeneralizedTime(param[key]);
    if (key == "seq") {
      var paramList = param[key];
      var a = [];
      for (var i = 0; i < paramList.length; i++) {
        var asn1Obj = _newObject(paramList[i]);
        a.push(asn1Obj);
      }
      return new _DERSequence({
        'array': a
      });
    }
    if (key == "set") {
      var paramList = param[key];
      var a = [];
      for (var i = 0; i < paramList.length; i++) {
        var asn1Obj = _newObject(paramList[i]);
        a.push(asn1Obj);
      }
      return new _DERSet({
        'array': a
      });
    }
    if (key == "tag") {
      var tagParam = param[key];
      if (Object.prototype.toString.call(tagParam) === '[object Array]' && tagParam.length == 3) {
        var obj = _newObject(tagParam[2]);
        return new _DERTaggedObject({
          tag: tagParam[0],
          explicit: tagParam[1],
          obj: obj
        });
      } else {
        var newParam = {};
        if (tagParam.explicit !== undefined) newParam.explicit = tagParam.explicit;
        if (tagParam.tag !== undefined) newParam.tag = tagParam.tag;
        if (tagParam.obj === undefined) throw "obj shall be specified for 'tag'.";
        newParam.obj = _newObject(tagParam.obj);
        return new _DERTaggedObject(newParam);
      }
    }
  };
  /**
   * get encoded hexadecimal string of ASN1Object specifed by JSON parameters
   * @name jsonToASN1HEX
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {Array} param JSON parameter to generate ASN1Object
   * @return hexadecimal string of ASN1Object
   * @since asn1 1.0.4
   * @description
   * As for ASN.1 object representation of JSON object,
   * please see {@link newObject}.
   * @example
   * jsonToASN1HEX({'prnstr': 'aaa'});
   */
  this.jsonToASN1HEX = function (param) {
    var asn1Obj = this.newObject(param);
    return asn1Obj.getEncodedHex();
  };
}();
/**
 * get dot noted oid number string from hexadecimal value of OID
 * @name oidHexToInt
 * @memberOf KJUR.asn1.ASN1Util
 * @function
 * @param {String} hex hexadecimal value of object identifier
 * @return {String} dot noted string of object identifier
 * @since jsrsasign 4.8.3 asn1 1.0.7
 * @description
 * This static method converts from hexadecimal string representation of
 * ASN.1 value of object identifier to oid number string.
 * @example
 * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; "2.5.4.6"
 */
KJUR.asn1.ASN1Util.oidHexToInt = function (hex) {
  var s = "";
  var i01 = parseInt(hex.substr(0, 2), 16);
  var i0 = Math.floor(i01 / 40);
  var i1 = i01 % 40;
  var s = i0 + "." + i1;
  var binbuf = "";
  for (var i = 2; i < hex.length; i += 2) {
    var value = parseInt(hex.substr(i, 2), 16);
    var bin = ("00000000" + value.toString(2)).slice(-8);
    binbuf = binbuf + bin.substr(1, 7);
    if (bin.substr(0, 1) == "0") {
      var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(binbuf, 2);
      s = s + "." + bi.toString(10);
      binbuf = "";
    }
  }
  ;
  return s;
};
/**
 * get hexadecimal value of object identifier from dot noted oid value
 * @name oidIntToHex
 * @memberOf KJUR.asn1.ASN1Util
 * @function
 * @param {String} oidString dot noted string of object identifier
 * @return {String} hexadecimal value of object identifier
 * @since jsrsasign 4.8.3 asn1 1.0.7
 * @description
 * This static method converts from object identifier value string.
 * to hexadecimal string representation of it.
 * @example
 * KJUR.asn1.ASN1Util.oidIntToHex("2.5.4.6") &rarr; "550406"
 */
KJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {
  var itox = function itox(i) {
    var h = i.toString(16);
    if (h.length == 1) h = '0' + h;
    return h;
  };
  var roidtox = function roidtox(roid) {
    var h = '';
    var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7) padLen = 0;
    var bPad = '';
    for (var i = 0; i < padLen; i++) bPad += '0';
    b = bPad + b;
    for (var i = 0; i < b.length - 1; i += 7) {
      var b8 = b.substr(i, 7);
      if (i != b.length - 7) b8 = '1' + b8;
      h += itox(parseInt(b8, 2));
    }
    return h;
  };
  if (!oidString.match(/^[0-9.]+$/)) {
    throw "malformed oid string: " + oidString;
  }
  var h = '';
  var a = oidString.split('.');
  var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
  h += itox(i0);
  a.splice(0, 2);
  for (var i = 0; i < a.length; i++) {
    h += roidtox(a[i]);
  }
  return h;
};
// ********************************************************************
//  Abstract ASN.1 Classes
// ********************************************************************
// ********************************************************************
/**
 * base class for ASN.1 DER encoder object
 * @name KJUR.asn1.ASN1Object
 * @class base class for ASN.1 DER encoder object
 * @property {Boolean} isModified flag whether internal data was changed
 * @property {String} hTLV hexadecimal string of ASN.1 TLV
 * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
 * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
 * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
 * @description
 */
KJUR.asn1.ASN1Object = function () {
  var isModified = true;
  var hTLV = null;
  var hT = '00';
  var hL = '00';
  var hV = '';
  /**
   * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
   * @name getLengthHexFromValue
   * @memberOf KJUR.asn1.ASN1Object#
   * @function
   * @return {String} hexadecimal string of ASN.1 TLV length(L)
   */
  this.getLengthHexFromValue = function () {
    if (typeof this.hV == "undefined" || this.hV == null) {
      throw "this.hV is null or undefined.";
    }
    if (this.hV.length % 2 == 1) {
      throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
    }
    var n = this.hV.length / 2;
    var hN = n.toString(16);
    if (hN.length % 2 == 1) {
      hN = "0" + hN;
    }
    if (n < 128) {
      return hN;
    } else {
      var hNlen = hN.length / 2;
      if (hNlen > 15) {
        throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
      }
      var head = 128 + hNlen;
      return head.toString(16) + hN;
    }
  };
  /**
   * get hexadecimal string of ASN.1 TLV bytes
   * @name getEncodedHex
   * @memberOf KJUR.asn1.ASN1Object#
   * @function
   * @return {String} hexadecimal string of ASN.1 TLV
   */
  this.getEncodedHex = function () {
    if (this.hTLV == null || this.isModified) {
      this.hV = this.getFreshValueHex();
      this.hL = this.getLengthHexFromValue();
      this.hTLV = this.hT + this.hL + this.hV;
      this.isModified = false;
      //alert("first time: " + this.hTLV);
    }

    return this.hTLV;
  };
  /**
   * get hexadecimal string of ASN.1 TLV value(V) bytes
   * @name getValueHex
   * @memberOf KJUR.asn1.ASN1Object#
   * @function
   * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
   */
  this.getValueHex = function () {
    this.getEncodedHex();
    return this.hV;
  };
  this.getFreshValueHex = function () {
    return '';
  };
};
// == BEGIN DERAbstractString ================================================
/**
 * base class for ASN.1 DER string classes
 * @name KJUR.asn1.DERAbstractString
 * @class base class for ASN.1 DER string classes
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @property {String} s internal string of value
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERAbstractString = function (params) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  var s = null;
  var hV = null;
  /**
   * get string value of this string object
   * @name getString
   * @memberOf KJUR.asn1.DERAbstractString#
   * @function
   * @return {String} string value of this string object
   */
  this.getString = function () {
    return this.s;
  };
  /**
   * set value by a string
   * @name setString
   * @memberOf KJUR.asn1.DERAbstractString#
   * @function
   * @param {String} newS value by a string to set
   */
  this.setString = function (newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(this.s);
  };
  /**
   * set value by a hexadecimal string
   * @name setStringHex
   * @memberOf KJUR.asn1.DERAbstractString#
   * @function
   * @param {String} newHexString value by a hexadecimal string to set
   */
  this.setStringHex = function (newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params == "string") {
      this.setString(params);
    } else if (typeof params['str'] != "undefined") {
      this.setString(params['str']);
    } else if (typeof params['hex'] != "undefined") {
      this.setStringHex(params['hex']);
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
// == END   DERAbstractString ================================================
// == BEGIN DERAbstractTime ==================================================
/**
 * base class for ASN.1 DER Generalized/UTCTime class
 * @name KJUR.asn1.DERAbstractTime
 * @class base class for ASN.1 DER Generalized/UTCTime class
 * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERAbstractTime = function (params) {
  KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
  var s = null;
  var date = null;
  // --- PRIVATE METHODS --------------------
  this.localDateToUTC = function (d) {
    utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var utcDate = new Date(utc);
    return utcDate;
  };
  /*
   * format date string by Data object
   * @name formatDate
   * @memberOf KJUR.asn1.AbstractTime;
   * @param {Date} dateObject
   * @param {string} type 'utc' or 'gen'
   * @param {boolean} withMillis flag for with millisections or not
   * @description
   * 'withMillis' flag is supported from asn1 1.0.6.
   */
  this.formatDate = function (dateObject, type, withMillis) {
    var pad = this.zeroPadding;
    var d = this.localDateToUTC(dateObject);
    var year = String(d.getFullYear());
    if (type == 'utc') year = year.substr(2, 2);
    var month = pad(String(d.getMonth() + 1), 2);
    var day = pad(String(d.getDate()), 2);
    var hour = pad(String(d.getHours()), 2);
    var min = pad(String(d.getMinutes()), 2);
    var sec = pad(String(d.getSeconds()), 2);
    var s = year + month + day + hour + min + sec;
    if (withMillis === true) {
      var millis = d.getMilliseconds();
      if (millis != 0) {
        var sMillis = pad(String(millis), 3);
        sMillis = sMillis.replace(/[0]+$/, "");
        s = s + "." + sMillis;
      }
    }
    return s + "Z";
  };
  this.zeroPadding = function (s, len) {
    if (s.length >= len) return s;
    return new Array(len - s.length + 1).join('0') + s;
  };
  // --- PUBLIC METHODS --------------------
  /**
   * get string value of this string object
   * @name getString
   * @memberOf KJUR.asn1.DERAbstractTime#
   * @function
   * @return {String} string value of this time object
   */
  this.getString = function () {
    return this.s;
  };
  /**
   * set value by a string
   * @name setString
   * @memberOf KJUR.asn1.DERAbstractTime#
   * @function
   * @param {String} newS value by a string to set such like "130430235959Z"
   */
  this.setString = function (newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(newS);
  };
  /**
   * set value by a Date object
   * @name setByDateValue
   * @memberOf KJUR.asn1.DERAbstractTime#
   * @function
   * @param {Integer} year year of date (ex. 2013)
   * @param {Integer} month month of date between 1 and 12 (ex. 12)
   * @param {Integer} day day of month
   * @param {Integer} hour hours of date
   * @param {Integer} min minutes of date
   * @param {Integer} sec seconds of date
   */
  this.setByDateValue = function (year, month, day, hour, min, sec) {
    var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
    this.setByDate(dateObject);
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
// == END   DERAbstractTime ==================================================
// == BEGIN DERAbstractStructured ============================================
/**
 * base class for ASN.1 DER structured class
 * @name KJUR.asn1.DERAbstractStructured
 * @class base class for ASN.1 DER structured class
 * @property {Array} asn1Array internal array of ASN1Object
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERAbstractStructured = function (params) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  var asn1Array = null;
  /**
   * set value by array of ASN1Object
   * @name setByASN1ObjectArray
   * @memberOf KJUR.asn1.DERAbstractStructured#
   * @function
   * @param {array} asn1ObjectArray array of ASN1Object to set
   */
  this.setByASN1ObjectArray = function (asn1ObjectArray) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array = asn1ObjectArray;
  };
  /**
   * append an ASN1Object to internal array
   * @name appendASN1Object
   * @memberOf KJUR.asn1.DERAbstractStructured#
   * @function
   * @param {ASN1Object} asn1Object to add
   */
  this.appendASN1Object = function (asn1Object) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array.push(asn1Object);
  };
  this.asn1Array = new Array();
  if (typeof params != "undefined") {
    if (typeof params['array'] != "undefined") {
      this.asn1Array = params['array'];
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
// ********************************************************************
//  ASN.1 Object Classes
// ********************************************************************
// ********************************************************************
/**
 * class for ASN.1 DER Boolean
 * @name KJUR.asn1.DERBoolean
 * @class class for ASN.1 DER Boolean
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERBoolean = function () {
  KJUR.asn1.DERBoolean.superclass.constructor.call(this);
  this.hT = "01";
  this.hTLV = "0101ff";
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER Integer
 * @name KJUR.asn1.DERInteger
 * @class class for ASN.1 DER Integer
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>int - specify initial ASN.1 value(V) by integer value</li>
 * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERInteger = function (params) {
  KJUR.asn1.DERInteger.superclass.constructor.call(this);
  this.hT = "02";
  /**
   * set value by Tom Wu's BigInteger object
   * @name setByBigInteger
   * @memberOf KJUR.asn1.DERInteger#
   * @function
   * @param {BigInteger} bigIntegerValue to set
   */
  this.setByBigInteger = function (bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
  };
  /**
   * set value by integer value
   * @name setByInteger
   * @memberOf KJUR.asn1.DERInteger
   * @function
   * @param {Integer} integer value to set
   */
  this.setByInteger = function (intValue) {
    var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(String(intValue), 10);
    this.setByBigInteger(bi);
  };
  /**
   * set value by integer value
   * @name setValueHex
   * @memberOf KJUR.asn1.DERInteger#
   * @function
   * @param {String} hexadecimal string of integer value
   * @description
   * <br/>
   * NOTE: Value shall be represented by minimum octet length of
   * two's complement representation.
   * @example
   * new KJUR.asn1.DERInteger(123);
   * new KJUR.asn1.DERInteger({'int': 123});
   * new KJUR.asn1.DERInteger({'hex': '1fad'});
   */
  this.setValueHex = function (newHexString) {
    this.hV = newHexString;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params['bigint'] != "undefined") {
      this.setByBigInteger(params['bigint']);
    } else if (typeof params['int'] != "undefined") {
      this.setByInteger(params['int']);
    } else if (typeof params == "number") {
      this.setByInteger(params);
    } else if (typeof params['hex'] != "undefined") {
      this.setValueHex(params['hex']);
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER encoded BitString primitive
 * @name KJUR.asn1.DERBitString
 * @class class for ASN.1 DER encoded BitString primitive
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>bin - specify binary string (ex. '10111')</li>
 * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
 * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
 * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}
 * argument for "BitString encapsulates" structure.</li>
 * </ul>
 * NOTE1: 'params' can be omitted.<br/>
 * NOTE2: 'obj' parameter have been supported since
 * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>
 * @example
 * // default constructor
 * o = new KJUR.asn1.DERBitString();
 * // initialize with binary string
 * o = new KJUR.asn1.DERBitString({bin: "1011"});
 * // initialize with boolean array
 * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});
 * // initialize with hexadecimal string (04 is unused bits)
 * o = new KJUR.asn1.DEROctetString({hex: "04bac0"});
 * // initialize with ASN1Util.newObject argument for encapsulated
 * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
 * // above generates a ASN.1 data like this:
 * // BIT STRING, encapsulates {
 * //   SEQUENCE {
 * //     INTEGER 3
 * //     PrintableString 'aaa'
 * //     }
 * //   }
 */
KJUR.asn1.DERBitString = function (params) {
  if (params !== undefined && typeof params.obj !== "undefined") {
    var o = KJUR.asn1.ASN1Util.newObject(params.obj);
    params.hex = "00" + o.getEncodedHex();
  }
  KJUR.asn1.DERBitString.superclass.constructor.call(this);
  this.hT = "03";
  /**
   * set ASN.1 value(V) by a hexadecimal string including unused bits
   * @name setHexValueIncludingUnusedBits
   * @memberOf KJUR.asn1.DERBitString#
   * @function
   * @param {String} newHexStringIncludingUnusedBits
   */
  this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = newHexStringIncludingUnusedBits;
  };
  /**
   * set ASN.1 value(V) by unused bit and hexadecimal string of value
   * @name setUnusedBitsAndHexValue
   * @memberOf KJUR.asn1.DERBitString#
   * @function
   * @param {Integer} unusedBits
   * @param {String} hValue
   */
  this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {
    if (unusedBits < 0 || 7 < unusedBits) {
      throw "unused bits shall be from 0 to 7: u = " + unusedBits;
    }
    var hUnusedBits = "0" + unusedBits;
    this.hTLV = null;
    this.isModified = true;
    this.hV = hUnusedBits + hValue;
  };
  /**
   * set ASN.1 DER BitString by binary string<br/>
   * @name setByBinaryString
   * @memberOf KJUR.asn1.DERBitString#
   * @function
   * @param {String} binaryString binary value string (i.e. '10111')
   * @description
   * Its unused bits will be calculated automatically by length of
   * 'binaryValue'. <br/>
   * NOTE: Trailing zeros '0' will be ignored.
   * @example
   * o = new KJUR.asn1.DERBitString();
   * o.setByBooleanArray("01011");
   */
  this.setByBinaryString = function (binaryString) {
    binaryString = binaryString.replace(/0+$/, '');
    var unusedBits = 8 - binaryString.length % 8;
    if (unusedBits == 8) unusedBits = 0;
    for (var i = 0; i <= unusedBits; i++) {
      binaryString += '0';
    }
    var h = '';
    for (var i = 0; i < binaryString.length - 1; i += 8) {
      var b = binaryString.substr(i, 8);
      var x = parseInt(b, 2).toString(16);
      if (x.length == 1) x = '0' + x;
      h += x;
    }
    this.hTLV = null;
    this.isModified = true;
    this.hV = '0' + unusedBits + h;
  };
  /**
   * set ASN.1 TLV value(V) by an array of boolean<br/>
   * @name setByBooleanArray
   * @memberOf KJUR.asn1.DERBitString#
   * @function
   * @param {array} booleanArray array of boolean (ex. [true, false, true])
   * @description
   * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.
   * @example
   * o = new KJUR.asn1.DERBitString();
   * o.setByBooleanArray([false, true, false, true, true]);
   */
  this.setByBooleanArray = function (booleanArray) {
    var s = '';
    for (var i = 0; i < booleanArray.length; i++) {
      if (booleanArray[i] == true) {
        s += '1';
      } else {
        s += '0';
      }
    }
    this.setByBinaryString(s);
  };
  /**
   * generate an array of falses with specified length<br/>
   * @name newFalseArray
   * @memberOf KJUR.asn1.DERBitString
   * @function
   * @param {Integer} nLength length of array to generate
   * @return {array} array of boolean falses
   * @description
   * This static method may be useful to initialize boolean array.
   * @example
   * o = new KJUR.asn1.DERBitString();
   * o.newFalseArray(3) &rarr; [false, false, false]
   */
  this.newFalseArray = function (nLength) {
    var a = new Array(nLength);
    for (var i = 0; i < nLength; i++) {
      a[i] = false;
    }
    return a;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
      this.setHexValueIncludingUnusedBits(params);
    } else if (typeof params['hex'] != "undefined") {
      this.setHexValueIncludingUnusedBits(params['hex']);
    } else if (typeof params['bin'] != "undefined") {
      this.setByBinaryString(params['bin']);
    } else if (typeof params['array'] != "undefined") {
      this.setByBooleanArray(params['array']);
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER OctetString<br/>
 * @name KJUR.asn1.DEROctetString
 * @class class for ASN.1 DER OctetString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * This class provides ASN.1 OctetString simple type.<br/>
 * Supported "params" attributes are:
 * <ul>
 * <li>str - to set a string as a value</li>
 * <li>hex - to set a hexadecimal string as a value</li>
 * <li>obj - to set a encapsulated ASN.1 value by JSON object
 * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>
 * </ul>
 * NOTE: A parameter 'obj' have been supported
 * for "OCTET STRING, encapsulates" structure.
 * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).
 * @see KJUR.asn1.DERAbstractString - superclass
 * @example
 * // default constructor
 * o = new KJUR.asn1.DEROctetString();
 * // initialize with string
 * o = new KJUR.asn1.DEROctetString({str: "aaa"});
 * // initialize with hexadecimal string
 * o = new KJUR.asn1.DEROctetString({hex: "616161"});
 * // initialize with ASN1Util.newObject argument
 * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
 * // above generates a ASN.1 data like this:
 * // OCTET STRING, encapsulates {
 * //   SEQUENCE {
 * //     INTEGER 3
 * //     PrintableString 'aaa'
 * //     }
 * //   }
 */
KJUR.asn1.DEROctetString = function (params) {
  if (params !== undefined && typeof params.obj !== "undefined") {
    var o = KJUR.asn1.ASN1Util.newObject(params.obj);
    params.hex = o.getEncodedHex();
  }
  KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
  this.hT = "04";
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER Null
 * @name KJUR.asn1.DERNull
 * @class class for ASN.1 DER Null
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERNull = function () {
  KJUR.asn1.DERNull.superclass.constructor.call(this);
  this.hT = "05";
  this.hTLV = "0500";
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER ObjectIdentifier
 * @name KJUR.asn1.DERObjectIdentifier
 * @class class for ASN.1 DER ObjectIdentifier
 * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERObjectIdentifier = function (params) {
  var itox = function itox(i) {
    var h = i.toString(16);
    if (h.length == 1) h = '0' + h;
    return h;
  };
  var roidtox = function roidtox(roid) {
    var h = '';
    var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7) padLen = 0;
    var bPad = '';
    for (var i = 0; i < padLen; i++) bPad += '0';
    b = bPad + b;
    for (var i = 0; i < b.length - 1; i += 7) {
      var b8 = b.substr(i, 7);
      if (i != b.length - 7) b8 = '1' + b8;
      h += itox(parseInt(b8, 2));
    }
    return h;
  };
  KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
  this.hT = "06";
  /**
   * set value by a hexadecimal string
   * @name setValueHex
   * @memberOf KJUR.asn1.DERObjectIdentifier#
   * @function
   * @param {String} newHexString hexadecimal value of OID bytes
   */
  this.setValueHex = function (newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
  };
  /**
   * set value by a OID string<br/>
   * @name setValueOidString
   * @memberOf KJUR.asn1.DERObjectIdentifier#
   * @function
   * @param {String} oidString OID string (ex. 2.5.4.13)
   * @example
   * o = new KJUR.asn1.DERObjectIdentifier();
   * o.setValueOidString("2.5.4.13");
   */
  this.setValueOidString = function (oidString) {
    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }
    var h = '';
    var a = oidString.split('.');
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);
    for (var i = 0; i < a.length; i++) {
      h += roidtox(a[i]);
    }
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = h;
  };
  /**
   * set value by a OID name
   * @name setValueName
   * @memberOf KJUR.asn1.DERObjectIdentifier#
   * @function
   * @param {String} oidName OID name (ex. 'serverAuth')
   * @since 1.0.1
   * @description
   * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
   * Otherwise raise error.
   * @example
   * o = new KJUR.asn1.DERObjectIdentifier();
   * o.setValueName("serverAuth");
   */
  this.setValueName = function (oidName) {
    var oid = KJUR.asn1.x509.OID.name2oid(oidName);
    if (oid !== '') {
      this.setValueOidString(oid);
    } else {
      throw "DERObjectIdentifier oidName undefined: " + oidName;
    }
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (params !== undefined) {
    if (typeof params === "string") {
      if (params.match(/^[0-2].[0-9.]+$/)) {
        this.setValueOidString(params);
      } else {
        this.setValueName(params);
      }
    } else if (params.oid !== undefined) {
      this.setValueOidString(params.oid);
    } else if (params.hex !== undefined) {
      this.setValueHex(params.hex);
    } else if (params.name !== undefined) {
      this.setValueName(params.name);
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER Enumerated
 * @name KJUR.asn1.DEREnumerated
 * @class class for ASN.1 DER Enumerated
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>int - specify initial ASN.1 value(V) by integer value</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 * @example
 * new KJUR.asn1.DEREnumerated(123);
 * new KJUR.asn1.DEREnumerated({int: 123});
 * new KJUR.asn1.DEREnumerated({hex: '1fad'});
 */
KJUR.asn1.DEREnumerated = function (params) {
  KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
  this.hT = "0a";
  /**
   * set value by Tom Wu's BigInteger object
   * @name setByBigInteger
   * @memberOf KJUR.asn1.DEREnumerated#
   * @function
   * @param {BigInteger} bigIntegerValue to set
   */
  this.setByBigInteger = function (bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
  };
  /**
   * set value by integer value
   * @name setByInteger
   * @memberOf KJUR.asn1.DEREnumerated#
   * @function
   * @param {Integer} integer value to set
   */
  this.setByInteger = function (intValue) {
    var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(String(intValue), 10);
    this.setByBigInteger(bi);
  };
  /**
   * set value by integer value
   * @name setValueHex
   * @memberOf KJUR.asn1.DEREnumerated#
   * @function
   * @param {String} hexadecimal string of integer value
   * @description
   * <br/>
   * NOTE: Value shall be represented by minimum octet length of
   * two's complement representation.
   */
  this.setValueHex = function (newHexString) {
    this.hV = newHexString;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params['int'] != "undefined") {
      this.setByInteger(params['int']);
    } else if (typeof params == "number") {
      this.setByInteger(params);
    } else if (typeof params['hex'] != "undefined") {
      this.setValueHex(params['hex']);
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER UTF8String
 * @name KJUR.asn1.DERUTF8String
 * @class class for ASN.1 DER UTF8String
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERUTF8String = function (params) {
  KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
  this.hT = "0c";
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER NumericString
 * @name KJUR.asn1.DERNumericString
 * @class class for ASN.1 DER NumericString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERNumericString = function (params) {
  KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
  this.hT = "12";
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER PrintableString
 * @name KJUR.asn1.DERPrintableString
 * @class class for ASN.1 DER PrintableString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERPrintableString = function (params) {
  KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
  this.hT = "13";
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER TeletexString
 * @name KJUR.asn1.DERTeletexString
 * @class class for ASN.1 DER TeletexString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERTeletexString = function (params) {
  KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
  this.hT = "14";
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER IA5String
 * @name KJUR.asn1.DERIA5String
 * @class class for ASN.1 DER IA5String
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERIA5String = function (params) {
  KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
  this.hT = "16";
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER UTCTime
 * @name KJUR.asn1.DERUTCTime
 * @class class for ASN.1 DER UTCTime
 * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
 * @extends KJUR.asn1.DERAbstractTime
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * <li>date - specify Date object.</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 * <h4>EXAMPLES</h4>
 * @example
 * d1 = new KJUR.asn1.DERUTCTime();
 * d1.setString('130430125959Z');
 *
 * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
 * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
 * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');
 */
KJUR.asn1.DERUTCTime = function (params) {
  KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
  this.hT = "17";
  /**
   * set value by a Date object<br/>
   * @name setByDate
   * @memberOf KJUR.asn1.DERUTCTime#
   * @function
   * @param {Date} dateObject Date object to set ASN.1 value(V)
   * @example
   * o = new KJUR.asn1.DERUTCTime();
   * o.setByDate(new Date("2016/12/31"));
   */
  this.setByDate = function (dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, 'utc');
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function () {
    if (typeof this.date == "undefined" && typeof this.s == "undefined") {
      this.date = new Date();
      this.s = this.formatDate(this.date, 'utc');
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (params !== undefined) {
    if (params.str !== undefined) {
      this.setString(params.str);
    } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
      this.setString(params);
    } else if (params.hex !== undefined) {
      this.setStringHex(params.hex);
    } else if (params.date !== undefined) {
      this.setByDate(params.date);
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
// ********************************************************************
/**
 * class for ASN.1 DER GeneralizedTime
 * @name KJUR.asn1.DERGeneralizedTime
 * @class class for ASN.1 DER GeneralizedTime
 * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
 * @property {Boolean} withMillis flag to show milliseconds or not
 * @extends KJUR.asn1.DERAbstractTime
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * <li>date - specify Date object.</li>
 * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>
 * </ul>
 * NOTE1: 'params' can be omitted.
 * NOTE2: 'withMillis' property is supported from asn1 1.0.6.
 */
KJUR.asn1.DERGeneralizedTime = function (params) {
  KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
  this.hT = "18";
  this.withMillis = false;
  /**
   * set value by a Date object
   * @name setByDate
   * @memberOf KJUR.asn1.DERGeneralizedTime#
   * @function
   * @param {Date} dateObject Date object to set ASN.1 value(V)
   * @example
   * When you specify UTC time, use 'Date.UTC' method like this:<br/>
   * o1 = new DERUTCTime();
   * o1.setByDate(date);
   *
   * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
   */
  this.setByDate = function (dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, 'gen', this.withMillis);
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function () {
    if (this.date === undefined && this.s === undefined) {
      this.date = new Date();
      this.s = this.formatDate(this.date, 'gen', this.withMillis);
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (params !== undefined) {
    if (params.str !== undefined) {
      this.setString(params.str);
    } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
      this.setString(params);
    } else if (params.hex !== undefined) {
      this.setStringHex(params.hex);
    } else if (params.date !== undefined) {
      this.setByDate(params.date);
    }
    if (params.millis === true) {
      this.withMillis = true;
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
// ********************************************************************
/**
 * class for ASN.1 DER Sequence
 * @name KJUR.asn1.DERSequence
 * @class class for ASN.1 DER Sequence
 * @extends KJUR.asn1.DERAbstractStructured
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>array - specify array of ASN1Object to set elements of content</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERSequence = function (params) {
  KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
  this.hT = "30";
  this.getFreshValueHex = function () {
    var h = '';
    for (var i = 0; i < this.asn1Array.length; i++) {
      var asn1Obj = this.asn1Array[i];
      h += asn1Obj.getEncodedHex();
    }
    this.hV = h;
    return this.hV;
  };
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
// ********************************************************************
/**
 * class for ASN.1 DER Set
 * @name KJUR.asn1.DERSet
 * @class class for ASN.1 DER Set
 * @extends KJUR.asn1.DERAbstractStructured
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>array - specify array of ASN1Object to set elements of content</li>
 * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>
 * </ul>
 * NOTE1: 'params' can be omitted.<br/>
 * NOTE2: sortflag is supported since 1.0.5.
 */
KJUR.asn1.DERSet = function (params) {
  KJUR.asn1.DERSet.superclass.constructor.call(this, params);
  this.hT = "31";
  this.sortFlag = true; // item shall be sorted only in ASN.1 DER
  this.getFreshValueHex = function () {
    var a = new Array();
    for (var i = 0; i < this.asn1Array.length; i++) {
      var asn1Obj = this.asn1Array[i];
      a.push(asn1Obj.getEncodedHex());
    }
    if (this.sortFlag == true) a.sort();
    this.hV = a.join('');
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params.sortflag != "undefined" && params.sortflag == false) this.sortFlag = false;
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
// ********************************************************************
/**
 * class for ASN.1 DER TaggedObject
 * @name KJUR.asn1.DERTaggedObject
 * @class class for ASN.1 DER TaggedObject
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
 * For example, if you find '[1]' tag in a ASN.1 dump,
 * 'tagNoHex' will be 'a1'.
 * <br/>
 * As for optional argument 'params' for constructor, you can specify *ANY* of
 * following properties:
 * <ul>
 * <li>explicit - specify true if this is explicit tag otherwise false
 *     (default is 'true').</li>
 * <li>tag - specify tag (default is 'a0' which means [0])</li>
 * <li>obj - specify ASN1Object which is tagged</li>
 * </ul>
 * @example
 * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
 * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
 * hex = d2.getEncodedHex();
 */
KJUR.asn1.DERTaggedObject = function (params) {
  KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
  this.hT = "a0";
  this.hV = '';
  this.isExplicit = true;
  this.asn1Object = null;
  /**
   * set value by an ASN1Object
   * @name setString
   * @memberOf KJUR.asn1.DERTaggedObject#
   * @function
   * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
   * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
   * @param {ASN1Object} asn1Object ASN.1 to encapsulate
   */
  this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
    this.hT = tagNoHex;
    this.isExplicit = isExplicitFlag;
    this.asn1Object = asn1Object;
    if (this.isExplicit) {
      this.hV = this.asn1Object.getEncodedHex();
      this.hTLV = null;
      this.isModified = true;
    } else {
      this.hV = null;
      this.hTLV = asn1Object.getEncodedHex();
      this.hTLV = this.hTLV.replace(/^../, tagNoHex);
      this.isModified = false;
    }
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params['tag'] != "undefined") {
      this.hT = params['tag'];
    }
    if (typeof params['explicit'] != "undefined") {
      this.isExplicit = params['explicit'];
    }
    if (typeof params['obj'] != "undefined") {
      this.asn1Object = params['obj'];
      this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
    }
  }
};
_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsrsasign/yahoo.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/lib/jsrsasign/yahoo.js ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YAHOO: function() { return /* binding */ YAHOO; }
/* harmony export */ });
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
var YAHOO = {};
YAHOO.lang = {
  /**
   * Utility to set up the prototype, constructor and superclass properties to
   * support an inheritance strategy that can chain constructors and methods.
   * Static members will not be inherited.
   *
   * @method extend
   * @static
   * @param {Function} subc   the object to modify
   * @param {Function} superc the object to inherit
   * @param {Object} overrides  additional properties/methods to add to the
   *                              subclass prototype.  These will override the
   *                              matching items obtained from the superclass
   *                              if present.
   */
  extend: function extend(subc, superc, overrides) {
    if (!superc || !subc) {
      throw new Error("YAHOO.lang.extend failed, please check that " + "all dependencies are included.");
    }
    var F = function F() {};
    F.prototype = superc.prototype;
    subc.prototype = new F();
    subc.prototype.constructor = subc;
    subc.superclass = superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
      superc.prototype.constructor = superc;
    }
    if (overrides) {
      var i;
      for (i in overrides) {
        subc.prototype[i] = overrides[i];
      }
      /*
       * IE will not enumerate native functions in a derived object even if the
       * function was overridden.  This is a workaround for specific functions
       * we care about on the Object prototype.
       * @property _IEEnumFix
       * @param {Function} r  the object to receive the augmentation
       * @param {Function} s  the object that supplies the properties to augment
       * @static
       * @private
       */
      var _IEEnumFix = function _IEEnumFix() {},
        ADD = ["toString", "valueOf"];
      try {
        if (/MSIE/.test(navigator.userAgent)) {
          _IEEnumFix = function _IEEnumFix(r, s) {
            for (i = 0; i < ADD.length; i = i + 1) {
              var fname = ADD[i],
                f = s[fname];
              if (typeof f === 'function' && f != Object.prototype[fname]) {
                r[fname] = f;
              }
            }
          };
        }
      } catch (ex) {}
      ;
      _IEEnumFix(subc.prototype, overrides);
    }
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_Symbol.js":
/*!******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_Symbol.js ***!
  \******************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_root.js");

/** Built-in value references. */
var _Symbol = root.Symbol;
module.exports = _Symbol;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_baseGetTag.js":
/*!**********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_baseGetTag.js ***!
  \**********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(/*! ./_Symbol */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_Symbol.js"),
  getRawTag = __webpack_require__(/*! ./_getRawTag */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_getRawTag.js"),
  objectToString = __webpack_require__(/*! ./_objectToString */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
  undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
module.exports = baseGetTag;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_baseTrim.js":
/*!********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_baseTrim.js ***!
  \********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
}
module.exports = baseTrim;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_freeGlobal.js":
/*!**********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_freeGlobal.js ***!
  \**********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
module.exports = freeGlobal;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_getRawTag.js":
/*!*********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_getRawTag.js ***!
  \*********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(/*! ./_Symbol */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
    tag = value[symToStringTag];
  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
module.exports = getRawTag;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_objectToString.js":
/*!**************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_objectToString.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}
module.exports = objectToString;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_root.js":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_root.js ***!
  \****************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_trimmedEndIndex.js":
/*!***************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_trimmedEndIndex.js ***!
  \***************************************************************************************************/
/***/ (function(module) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}
module.exports = trimmedEndIndex;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/debounce.js":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/debounce.js ***!
  \*******************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isObject.js"),
  now = __webpack_require__(/*! ./now */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/now.js"),
  toNumber = __webpack_require__(/*! ./toNumber */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
  nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs,
      thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(),
      isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
module.exports = debounce;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isObject.js":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isObject.js ***!
  \*******************************************************************************************/
/***/ (function(module) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}
module.exports = isObject;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isObjectLike.js":
/*!***********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isObjectLike.js ***!
  \***********************************************************************************************/
/***/ (function(module) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}
module.exports = isObjectLike;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isSymbol.js":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isSymbol.js ***!
  \*******************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_baseGetTag.js"),
  isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
module.exports = isSymbol;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/now.js":
/*!**************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/now.js ***!
  \**************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};
module.exports = now;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/throttle.js":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/throttle.js ***!
  \*******************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var debounce = __webpack_require__(/*! ./debounce */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/debounce.js"),
  isObject = __webpack_require__(/*! ./isObject */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isObject.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
    trailing = true;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}
module.exports = throttle;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/toNumber.js":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/toNumber.js ***!
  \*******************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/_baseTrim.js"),
  isObject = __webpack_require__(/*! ./isObject */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isObject.js"),
  isSymbol = __webpack_require__(/*! ./isSymbol */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = toNumber;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/to-arraybuffer/index.js":
/*!************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/to-arraybuffer/index.js ***!
  \************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Buffer = (__webpack_require__(/*! buffer */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/buffer/index.js").Buffer);
module.exports = function (buf) {
  // If the buffer is backed by a Uint8Array, a faster version will work
  if (buf instanceof Uint8Array) {
    // If the buffer isn't a subarray, return the underlying ArrayBuffer
    if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
      return buf.buffer;
    } else if (typeof buf.buffer.slice === 'function') {
      // Otherwise we need to get a proper copy
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
  }
  if (Buffer.isBuffer(buf)) {
    // This is the slow version that will work with any Buffer
    // implementation (even in old browsers)
    var arrayCopy = new Uint8Array(buf.length);
    var len = buf.length;
    for (var i = 0; i < len; i++) {
      arrayCopy[i] = buf[i];
    }
    return arrayCopy.buffer;
  } else {
    throw new Error('Argument must be a Buffer');
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/toggle-selection/index.js":
/*!**************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/node_modules/toggle-selection/index.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;
  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }
  switch (active.tagName.toUpperCase()) {
    // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;
    default:
      active = null;
      break;
  }
  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' && selection.removeAllRanges();
    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }
    active && active.focus();
  };
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_copy/runtime.tsx":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_copy/runtime.tsx ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! copy-to-clipboard */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/copy-to-clipboard/index.js");
/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var env = props.env,
    inputs = props.inputs,
    outputs = props.outputs,
    data = props.data;
  var runtime = env.runtime;
  if (runtime) {
    inputs['copy'](function (val, outputRels) {
      //数据处理
      //1、输入为函数
      if (Object.prototype.toString.call(val) === '[object Function]') {
        val = String(val);
      } else if (typeof val !== 'string') {
        //输入为数组，对象，布尔，null
        if (val === null) {
          val = 'null';
        } else if (val === undefined) {
          val = 'undefined';
        } else {
          val = JSON.stringify(val);
        }
      } else if (val === '') {
        val = ' ';
      }
      data.text = val;
      try {
        copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0___default()(data.text);
        outputRels['success'](val);
      } catch (e) {
        outputRels['error'](e);
      }
    });
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/constants.ts":
/*!**************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_download/constants.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DownloadType: function() { return /* binding */ DownloadType; },
/* harmony export */   SaveTypeOptions: function() { return /* binding */ SaveTypeOptions; },
/* harmony export */   downloadOptions: function() { return /* binding */ downloadOptions; }
/* harmony export */ });
var DownloadType;
(function (DownloadType) {
  DownloadType["Network"] = "network";
  DownloadType["Local"] = "local";
})(DownloadType || (DownloadType = {}));
var downloadOptions = [{
  label: "网络请求",
  value: DownloadType.Network
}, {
  label: "本地数据",
  value: DownloadType.Local
}];
var mimeType = [["txt", "text/plain"], ["json", "application/json"], ["png", "image/png"], ["jpg,.jpeg", "image/jpeg"], ["gif", "image/gif"], ["pdf", "application/pdf"], ["html", "text/html"], ["mp3", "audio/mpeg"], ["mp4", "video/mp4"], ["ogv,ogg", "video/ogg"], ["doc,dot", "application/msword"], ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"], ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"], ["docm", "application/vnd.ms-word.document.macroEnabled.12"], ["dotm", "application/vnd.ms-word.template.macroEnabled.12"], ["xls,xlt,xla", "application/vnd.ms-excel"], ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"], ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"], ["xlsm", ".application/vnd.ms-excel.sheet.macroEnabled.12"], ["xltm", "application/vnd.ms-excel.template.macroEnabled.12"], ["xlam", "application/vnd.ms-excel.addin.macroEnabled.12"], ["xlsb", ".application/vnd.ms-excel.sheet.binary.macroEnabled.12"], ["ppt,pot,pps,ppa", "application/vnd.ms-powerpoint"], ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"], ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"], ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"], ["ppam", "application/vnd.ms-powerpoint.addin.macroEnabled.12"], ["pptm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12"], ["potm", "application/vnd.ms-powerpoint.template.macroEnabled.12"], ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"], ["mdb", "application/vnd.ms-access"], ["zip", "application/zip"]];
var SaveTypeOptions = mimeType.map(function (type) {
  return {
    label: type[0],
    value: type[1]
  };
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/editors.ts":
/*!************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_download/editors.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/constants.ts");

var setSchema = function setSchema(input, status) {
  if (status === 0) {
    input === null || input === void 0 ? void 0 : input.get("url").setSchema({
      title: "输入数据",
      type: "string"
    });
  }
  if (status === 1) {
    input.get("url").setSchema({
      title: "输入数据",
      type: "object",
      properties: {
        url: {
          title: "资源链接",
          type: "string"
        },
        filename: {
          title: "资源文件名",
          type: "string"
        }
      }
    });
  }
};
var getExtname = function getExtname(filename) {
  var _a;
  var index = filename.lastIndexOf(".");
  var extName = index < 1 ? null : filename.substring(index + 1);
  if (!extName) return;
  var value = ((_a = _constants__WEBPACK_IMPORTED_MODULE_0__.SaveTypeOptions.find(function (_a) {
    var label = _a.label;
    return label.includes(extName);
  })) !== null && _a !== void 0 ? _a : {}).value;
  return value;
};
/* harmony default export */ __webpack_exports__["default"] = ({
  ":root": [{
    title: "文件名配置",
    type: "select",
    options: [{
      key: 0,
      label: "手动配置",
      value: 0
    }, {
      key: 1,
      label: "动态配置",
      value: 1
    }],
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.nameConfig;
      },
      set: function set(_a, val) {
        var data = _a.data,
          input = _a.input;
        setSchema(input, val);
        data.nameConfig = val;
      }
    }
  }, {
    title: "文件名称",
    type: "text",
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.nameConfig === 0;
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.filename;
      },
      set: function set(_a, filename) {
        var data = _a.data;
        data.filename = filename;
        if (data.downloadType === _constants__WEBPACK_IMPORTED_MODULE_0__.DownloadType.Local) {
          var extName = getExtname(filename);
          data.saveType = extName;
        }
      }
    }
  }, {
    title: "下载源",
    type: "select",
    options: {
      options: _constants__WEBPACK_IMPORTED_MODULE_0__.downloadOptions
    },
    value: {
      get: function get(_a) {
        var _b;
        var data = _a.data;
        return (_b = data.downloadType) !== null && _b !== void 0 ? _b : _constants__WEBPACK_IMPORTED_MODULE_0__.DownloadType.Network;
      },
      set: function set(_a, value) {
        var data = _a.data;
        data.downloadType = value;
      }
    }
  }, {
    title: "保存类型",
    type: "select",
    options: {
      options: _constants__WEBPACK_IMPORTED_MODULE_0__.SaveTypeOptions
    },
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.downloadType === _constants__WEBPACK_IMPORTED_MODULE_0__.DownloadType.Local;
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.saveType;
      },
      set: function set(_a, val) {
        var data = _a.data;
        data.saveType = val;
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/runtime.ts":
/*!************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_download/runtime.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/constants.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var defaultFilename = "download";
var matchFilename = function matchFilename(url) {
  try {
    if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
      return url.substring(url.lastIndexOf("/") + 1);
    }
  } catch (error) {
    console.error(error);
  }
};
var getBlob = function getBlob(source, mimeType) {
  if (source instanceof Blob) {
    return source;
  }
  try {
    var blob = new Blob([source], {
      type: mimeType
    });
    return blob;
  } catch (error) {
    throw error;
  }
};
var fetchBlob = function fetchBlob(url) {
  return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, fetch(url)];
        case 1:
          res = _a.sent();
          return [2 /*return*/, res.blob()];
      }
    });
  });
};
var download = function download(blob, filename) {
  var blobUrl = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.setAttribute("href", blobUrl);
  link.setAttribute("download", filename);
  link.setAttribute("target", "_blank");
  link.click();
  URL.revokeObjectURL(blobUrl);
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var _this = this;
  var data = _a.data,
    env = _a.env,
    inputs = _a.inputs,
    onError = _a.onError,
    logger = _a.logger;
  var filename = data.filename,
    downloadType = data.downloadType,
    saveType = data.saveType;
  var runtime = env.runtime;
  if (runtime) {
    inputs.url(function (val) {
      return __awaiter(_this, void 0, void 0, function () {
        var _filename_1, blob_1, url, blob, _filename, error_1;
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
          switch (_h.label) {
            case 0:
              if (!val) return [3 /*break*/, 4];
              _h.label = 1;
            case 1:
              _h.trys.push([1, 3,, 4]);
              if (downloadType === _constants__WEBPACK_IMPORTED_MODULE_0__.DownloadType.Local) {
                _filename_1 = (_b = (_a = val.filename) !== null && _a !== void 0 ? _a : filename) !== null && _b !== void 0 ? _b : defaultFilename;
                blob_1 = getBlob((_c = val.url) !== null && _c !== void 0 ? _c : val, saveType);
                download(blob_1, _filename_1);
                return [2 /*return*/];
              }

              url = new URL((_d = val.url) !== null && _d !== void 0 ? _d : val);
              return [4 /*yield*/, fetchBlob(url.href)];
            case 2:
              blob = _h.sent();
              _filename = (_g = (_f = (_e = val.filename) !== null && _e !== void 0 ? _e : matchFilename(url.href)) !== null && _f !== void 0 ? _f : filename) !== null && _g !== void 0 ? _g : defaultFilename;
              download(blob, _filename);
              return [3 /*break*/, 4];
            case 3:
              error_1 = _h.sent();
              logger.error("[资源下载]：数据类型错误");
              onError("[资源下载]：数据类型错误");
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    });
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/constants.ts":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/constants.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   bufferEncodings: function() { return /* binding */ bufferEncodings; }
/* harmony export */ });
var InputIds = {
  INPUT: "input"
};
var OutputIds = {
  ENCRYPTION_VALUE: "encryptionValue"
};
var bufferEncodings = function bufferEncodings() {
  return ["ascii", "utf8", "utf-8", "utf16le", "ucs2", "ucs-2", "base64", "base64url", "latin1", "binary", "hex"].map(function (encoding) {
    return {
      label: encoding,
      value: encoding
    };
  });
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/editors.ts":
/*!**************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/editors.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/constants.ts");

/* harmony default export */ __webpack_exports__["default"] = ({
  "@init": function init(_a) {
    var data = _a.data;
  },
  ":root": [{
    title: "加密算法",
    type: "select",
    options: function options() {
      return [{
        label: "SM2国密算法",
        value: "SM2"
      }, {
        label: "SM3国密算法",
        value: "SM3"
      }, {
        label: "SM4国密算法",
        value: "SM4"
      }];
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.encryptionAlgorithm;
      },
      set: function set(_a, val) {
        var data = _a.data;
        data.encryptionAlgorithm = val;
      }
    }
  }, {
    title: "操作类型",
    type: "select",
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.encryptionAlgorithm !== "SM3";
    },
    options: function options() {
      return [{
        label: "公钥加密",
        value: "public"
      }, {
        label: "私钥解密",
        value: "private"
      }];
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.encryptionType;
      },
      set: function set(_a, val) {
        var data = _a.data,
          input = _a.input,
          output = _a.output;
        data.encryptionType = val;
        if (data.encryptionType === "private") {
          output === null || output === void 0 ? void 0 : output.setTitle(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.ENCRYPTION_VALUE, "明文");
          input === null || input === void 0 ? void 0 : input.setTitle("input.key", "私钥");
          input === null || input === void 0 ? void 0 : input.setTitle("input.value", "密文");
        } else {
          output.setTitle(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.ENCRYPTION_VALUE, "密文");
          input === null || input === void 0 ? void 0 : input.setTitle("input.key", "公钥");
          input === null || input === void 0 ? void 0 : input.setTitle("input.value", "明文");
        }
      }
    }
  }, {
    title: "输入编码格式",
    type: "select",
    options: function options() {
      return (0,_constants__WEBPACK_IMPORTED_MODULE_0__.bufferEncodings)();
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.inputEncoding;
      },
      set: function set(_a, val) {
        var data = _a.data;
        data.inputEncoding = val;
      }
    }
  }, {
    title: "输出编码格式",
    type: "select",
    options: function options() {
      return (0,_constants__WEBPACK_IMPORTED_MODULE_0__.bufferEncodings)();
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.outputEncoding;
      },
      set: function set(_a, val) {
        var data = _a.data;
        data.outputEncoding = val;
      }
    }
  }, {
    title: "密码模式",
    type: "select",
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.encryptionAlgorithm === "SM2";
    },
    options: function options() {
      return [{
        label: "C1C3C2",
        value: 1
      }, {
        label: "C1C2C3",
        value: 0
      }];
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.cipherMode;
      },
      set: function set(_a, val) {
        var data = _a.data;
        data.cipherMode = val;
      }
    }
  }, {
    title: "分组密码模式",
    type: "select",
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.encryptionAlgorithm === "SM4";
    },
    options: function options() {
      return [{
        label: "ECB",
        value: 1
      }, {
        label: "CBC",
        value: 0
      }];
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.BlockCipherModes;
      },
      set: function set(_a, val) {
        var data = _a.data;
        data.BlockCipherModes = val;
      }
    }
  }, {
    title: "初始向量 IV",
    type: "text",
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.encryptionAlgorithm === "SM4" && !data.BlockCipherModes;
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.iv;
      },
      set: function set(_a, val) {
        var data = _a.data;
        data.iv = val;
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM2.ts":
/*!******************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM2.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gm_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gm-crypto */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/gm-crypto/dist/index.esm.js");

// https://www.npmjs.com/package/gm-crypto
/* harmony default export */ __webpack_exports__["default"] = (function (parameters) {
  var encryptionType = parameters.encryptionType,
    value = parameters.value,
    key = parameters.key,
    inputEncoding = parameters.inputEncoding,
    outputEncoding = parameters.outputEncoding,
    cipherMode = parameters.cipherMode;
  // 加密的key需要加"04"
  return encryptionType === "public" ? gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM2.encrypt(value, "04" + key, {
    inputEncoding: inputEncoding,
    outputEncoding: outputEncoding,
    mode: cipherMode || 1
  }) : gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM2.decrypt(value, key, {
    inputEncoding: inputEncoding,
    outputEncoding: outputEncoding,
    mode: cipherMode || 1
  });
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM3.ts":
/*!******************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM3.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gm_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gm-crypto */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/gm-crypto/dist/index.esm.js");

// https://www.npmjs.com/package/gm-crypto
/* harmony default export */ __webpack_exports__["default"] = (function (parameters) {
  var value = parameters.value,
    inputEncoding = parameters.inputEncoding,
    outputEncoding = parameters.outputEncoding;
  return gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM3.digest(value, inputEncoding, outputEncoding);
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM4.ts":
/*!******************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM4.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gm_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gm-crypto */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/gm-crypto/dist/index.esm.js");

/* harmony default export */ __webpack_exports__["default"] = (function (parameters) {
  var encryptionType = parameters.encryptionType,
    value = parameters.value,
    key = parameters.key,
    iv = parameters.iv,
    inputEncoding = parameters.inputEncoding,
    outputEncoding = parameters.outputEncoding,
    BlockCipherModes = parameters.BlockCipherModes;
  if (encryptionType === "public") {
    return gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM4.encrypt(value, key, {
      inputEncoding: inputEncoding,
      outputEncoding: outputEncoding,
      iv: !BlockCipherModes ? iv : undefined,
      mode: !BlockCipherModes ? gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM4.constants.CBC : gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM4.constants.ECB
    });
  } else {
    return gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM4.decrypt(value, key, {
      inputEncoding: inputEncoding,
      outputEncoding: outputEncoding,
      iv: !BlockCipherModes ? iv : undefined,
      mode: !BlockCipherModes ? gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM4.constants.CBC : gm_crypto__WEBPACK_IMPORTED_MODULE_0__.SM4.constants.ECB
    });
  }
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/index.ts":
/*!********************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/index.ts ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SM2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SM2 */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM2.ts");
/* harmony import */ var _SM3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SM3 */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM3.ts");
/* harmony import */ var _SM4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SM4 */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/SM4.ts");



/* harmony default export */ __webpack_exports__["default"] = ({
  SM2: _SM2__WEBPACK_IMPORTED_MODULE_0__["default"],
  SM3: _SM3__WEBPACK_IMPORTED_MODULE_1__["default"],
  SM4: _SM4__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/runtime.ts":
/*!**************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/runtime.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/constants.ts");
/* harmony import */ var _encryptionAlgorithm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./encryptionAlgorithm */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/encryptionAlgorithm/index.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var env = _a.env,
    data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  var encrypt = function encrypt(key, value) {
    if (typeof key !== "string" || typeof value !== "string") {
      console.error("加解密组件入参有误");
      return false;
    }
    return _encryptionAlgorithm__WEBPACK_IMPORTED_MODULE_1__["default"][data.encryptionAlgorithm](__assign({
      value: value,
      key: key
    }, data));
  };
  try {
    if (env.runtime) {
      inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.INPUT](function (val) {
        if (val) {
          outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.ENCRYPTION_VALUE](encrypt(val.key, val.value));
        }
      });
    }
  } catch (ex) {
    onError === null || onError === void 0 ? void 0 : onError(ex);
    console.error("加解密组件运行错误.", ex);
    logger.error("".concat(ex));
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/editors.ts":
/*!************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/editors.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  ':root': [{
    title: '数据类型',
    type: 'select',
    options: function options(_a) {
      var data = _a.data;
      return [{
        label: '对象',
        value: 'object'
      }, {
        label: '数组',
        value: 'array'
      }, {
        label: '随机数字',
        value: 'randomNumber'
      }, {
        label: '随机字符',
        value: 'randomString'
      }];
    },
    value: {
      get: function get(_a, val) {
        var data = _a.data,
          inputs = _a.inputs;
        return data.type;
      },
      set: function set(_a, val) {
        var data = _a.data,
          inputs = _a.inputs,
          outputs = _a.outputs;
        if (data.type === val) {
          return;
        }
        data.type = val;
        data.value = void 0;
        if (val === 'object') {
          outputs.setSchema('result', {
            type: 'object',
            properties: {
              type: 'string'
            }
          });
        } else if (val === 'array') {
          outputs.setSchema('result', {
            type: 'array',
            items: {
              type: 'string'
            }
          });
        } else if (val === 'randomNumber') {
          outputs.setSchema('result', {
            type: 'number'
          });
        } else if (val === 'randomString') {
          outputs.setSchema('result', {
            type: 'string'
          });
        }
      }
    }
  }, {
    title: '对象数据',
    type: 'map',
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.type === 'object';
    },
    value: {
      get: function get(_a, val) {
        var data = _a.data,
          inputs = _a.inputs;
        return Object.prototype.toString.call(data.value) === '[object Object]' ? data.value : {};
      },
      set: function set(_a, val) {
        var data = _a.data,
          inputs = _a.inputs;
        data.value = val;
      }
    }
  }, {
    title: '列表数据',
    type: 'list',
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.type === 'array';
    },
    value: {
      get: function get(_a, val) {
        var data = _a.data,
          inputs = _a.inputs;
        return Array.isArray(data.value) ? data.value : [];
      },
      set: function set(_a, val) {
        var data = _a.data,
          inputs = _a.inputs;
        data.value = val;
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/runtime.ts":
/*!************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/runtime.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var env = _a.env,
    data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  inputs['input'](function (val) {
    if (data.type === 'randomNumber') {
      outputs['result'](Math.random());
    } else if (data.type === 'randomString') {
      outputs['result'](new String(Math.random()));
    } else {
      outputs['result'](data.value);
    }
  });
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/constants.ts":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/constants.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var OutputIds = {
  Output: 'output'
};
var Schemas = {
  Follow: {
    type: 'follow'
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/editors.ts":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/editors.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/constants.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/utils.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
  '@inputUpdated': function inputUpdated(_a, updatePin) {
    var data = _a.data,
      input = _a.input,
      output = _a.output;
    if (updatePin.id !== _constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output).setSchema((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getOutputSchema)(data, input));
    }
  },
  '@inputConnected': function inputConnected(_a) {
    var data = _a.data,
      output = _a.output,
      input = _a.input;
    output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output).setSchema((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getOutputSchema)(data, input));
  },
  '@pinRemoved': function pinRemoved(_a) {
    var data = _a.data,
      output = _a.output,
      input = _a.input;
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      arg[_i - 1] = arguments[_i];
    }
    output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output).setSchema((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getOutputSchema)(data, input));
  },
  '@inputDisConnected': function inputDisConnected(_a) {
    var data = _a.data,
      output = _a.output,
      input = _a.input;
    output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output).setSchema((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getOutputSchema)(data, input));
  },
  ':root': [{
    title: '添加输入项',
    type: 'Button',
    value: {
      set: function set(_a) {
        var input = _a.input;
        var idx = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getInputOrder)({
          input: input
        });
        var title = "\u8F93\u5165\u9879".concat(idx);
        var hostId = "input".concat(idx);
        input.add({
          id: hostId,
          title: title,
          schema: _constants__WEBPACK_IMPORTED_MODULE_0__.Schemas.Follow,
          deletable: true
        });
      }
    }
  }
  // {
  //   title: '是否合并',
  //   type: 'switch',
  //   value: {
  //     get({ data }: EditorResult<Data>) {
  //       return !!data.isMerge;
  //     },
  //     set({ data, input, output }: EditorResult<Data>, val: boolean) {
  //       data.isMerge = val;
  //       output.get(OutputIds.Output).setSchema(getOutputSchema(data, input));
  //     }
  //   }
  // }
  ]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/runtime.ts":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/runtime.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/constants.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/utils.ts");
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var env = _a.env,
    data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs;
  var runtime = env.runtime;
  var isMerge = data.isMerge;
  var inputNum = Object.keys(inputs).length;
  var list = [];
  var triggerKeys = new Set();
  var mergeStrategy = {
    Array: _utils__WEBPACK_IMPORTED_MODULE_1__.arrayMerge,
    Object: _utils__WEBPACK_IMPORTED_MODULE_1__.objMerge
  };
  if (runtime) {
    Object.keys(inputs).forEach(function (key, index) {
      inputs[key](function (val) {
        list[index] = val;
        triggerKeys.add(key);
        if (triggerKeys.size === inputNum) {
          var type = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isSameInputType)(list);
          if (!!isMerge && !!type) {
            outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output](mergeStrategy[type](list));
          } else {
            outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output](__spreadArray([], list, true));
          }
          list = [];
          triggerKeys.clear();
        }
      });
    });
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/utils.ts":
/*!*******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/utils.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayMerge: function() { return /* binding */ arrayMerge; },
/* harmony export */   getInputOrder: function() { return /* binding */ getInputOrder; },
/* harmony export */   getOutputSchema: function() { return /* binding */ getOutputSchema; },
/* harmony export */   getType: function() { return /* binding */ getType; },
/* harmony export */   isSameInputType: function() { return /* binding */ isSameInputType; },
/* harmony export */   objMerge: function() { return /* binding */ objMerge; }
/* harmony export */ });
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var SupportType = ['Array', 'Object'];
var isSameInputType = function isSameInputType(inputs) {
  var first = inputs[0],
    rest = inputs.slice(1);
  var type = getType(first);
  if (!type || !SupportType.includes(type)) return;
  var isSame = Object.values(rest).every(function (item) {
    return getType(item) === type;
  });
  return isSame ? type : null;
};
var getType = function getType(obj) {
  var _a;
  return (_a = Object.prototype.toString.call(obj).match(/\[object (.*)\]/)) === null || _a === void 0 ? void 0 : _a[1];
};
var arrayMerge = function arrayMerge(inputs) {
  var ret = new Set(inputs.reduce(function (pre, cur) {
    if (pre === void 0) {
      pre = [];
    }
    return __spreadArray(__spreadArray([], pre, true), cur, true);
  }, []));
  return Array.from(ret);
};
var objMerge = function objMerge(inputs) {
  var ret = inputs.reduce(function (pre, cur) {
    if (pre === void 0) {
      pre = {};
    }
    return __assign(__assign({}, pre), cur);
  }, {});
  return ret;
};
// 获取输入项序号
function getInputOrder(_a) {
  var _b;
  var input = _a.input;
  var ports = input.get();
  var id = (((_b = ports === null || ports === void 0 ? void 0 : ports.pop) === null || _b === void 0 ? void 0 : _b.call(ports)) || {}).id;
  return (Number(id.slice(5)) || 0) + 1;
}
// 获取输出schema
function getOutputSchema(data, input) {
  var _a;
  var res = {};
  var inputList = input.get() || [];
  var first = inputList[0],
    rest = inputList.slice(1);
  var firstSchema = (_a = input.get(first === null || first === void 0 ? void 0 : first.id)) === null || _a === void 0 ? void 0 : _a.schema;
  var firstSchemaJSON = JSON.stringify(firstSchema);
  // 1. 对象合并
  var isMergeObject = data.isMerge && (inputList || []).every(function (item) {
    var _a;
    var schema = (_a = input.get(item === null || item === void 0 ? void 0 : item.id)) === null || _a === void 0 ? void 0 : _a.schema;
    return (schema === null || schema === void 0 ? void 0 : schema.type) === 'object';
  });
  if (isMergeObject) {
    (inputList || []).forEach(function (item) {
      var _a;
      var schema = (_a = input.get(item === null || item === void 0 ? void 0 : item.id)) === null || _a === void 0 ? void 0 : _a.schema;
      Object.assign(res, schema === null || schema === void 0 ? void 0 : schema.properties);
    });
    return {
      type: 'object',
      properties: res
    };
  }
  // 2. 数组子项类型相同
  var isArraySameSchema = rest.every(function (item) {
    var _a;
    var schema = (_a = input.get(item === null || item === void 0 ? void 0 : item.id)) === null || _a === void 0 ? void 0 : _a.schema;
    return JSON.stringify(schema) === firstSchemaJSON;
  });
  if (isArraySameSchema) {
    return data.isMerge ? firstSchema : {
      type: 'array',
      items: firstSchema
    };
  }
  // 其他情形
  return {
    type: 'array',
    items: {
      type: 'any'
    }
  };
}


/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/ai.ts":
/*!************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/ai.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unknownType = ['unknown', 'enum', 'tuple', 'indexObject', 'follow'];
var anyType = ['object', 'string', 'number', 'array', 'boolean', 'null'];
function getCodeTemplate(_a) {
  var useInputs = _a.useInputs;
  return "({outputs".concat(useInputs ? ',inputs' : '', "})=>{}");
}
/* harmony default export */ __webpack_exports__["default"] = ({
  ':root': function root(props) {
    var input = props.input,
      output = props.output,
      inputs = props.inputs,
      outputs = props.outputs;
    var inputSchemaArray = input.get().map(function (_a) {
      var id = _a.id;
      var schema = inputs.get(id).schema;
      return {
        id: id.split('.')[1],
        schema: JSON.stringify(unknownType.includes(schema.type) ? {
          type: anyType
        } : schema)
      };
    });
    var outputSchemaArray = output.get().map(function (_a) {
      var id = _a.id;
      var schema = outputs.get(id).schema;
      return {
        id: id,
        schema: JSON.stringify(unknownType.includes(schema.type) ? {
          type: anyType
        } : schema)
      };
    });
    var useInputs = !!inputSchemaArray.length;
    var inputsSchemaStr = '';
    var outputsSchemaStr = 'outputs含有以下几个输出方法,';
    if (useInputs) {
      inputSchemaArray.forEach(function (_a) {
        var id = _a.id,
          schema = _a.schema;
        inputsSchemaStr = (inputsSchemaStr ? ',' : '') + "\"".concat(id, "\":").concat(schema);
      });
      inputsSchemaStr = "inputs\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"object\",\"additionalProperties\":false,\"properties\":{".concat(inputsSchemaStr, "}},");
    }
    outputSchemaArray.forEach(function (_a) {
      var id = _a.id,
        schema = _a.schema;
      outputsSchemaStr = outputsSchemaStr + "".concat(id, "\u51FD\u6570\u8F93\u51FA\u7684\u503C\u7684JSON Schema\u5B9A\u4E49\u4E3A").concat(schema, ",");
    });
    return {
      prompts: "\n      \u4F60\u662F\u4E00\u540D\u4F18\u79C0\u7684\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08,\n      \u73B0\u5728\u6709\u4E00\u4E2A\u51FD\u6570\u6A21\u7248A\u201C".concat(getCodeTemplate({
        useInputs: useInputs
      }), "\u201D,\n      \u9700\u8981\u4F60\u6839\u636E\u95EE\u9898\u57FA\u4E8E\u51FD\u6570\u6A21\u7248A\u7F16\u5199Javascript\u4EE3\u7801,\u95EE\u9898\u4E2D\u63D0\u5230\u7684\u5404\u79CD\u6570\u636E\u5982\u679C\u6CA1\u6709\u660E\u786E\u8868\u8FBE\u6765\u81EA\u8F93\u5165\u65F6\u9700\u8981\u4F60\u6765mock\u6570\u636E,\u5426\u5219\u9700\u8981\u4E25\u683C\u53C2\u7167JSON Schema\u5B9A\u4E49,\u56DE\u7B54\u4E0D\u9700\u8981\u4EFB\u4F55\u5176\u5B83\u7684\u89E3\u91CA\u6216\u6CE8\u91CA,\u4EE5\u4E0B\u662F\u4F8B\u5B50:\n\n      outputs\u542B\u6709\u4EE5\u4E0B\u51E0\u4E2A\u8F93\u51FA\u65B9\u6CD5,output0\u51FD\u6570\u8F93\u51FA\u7684\u503C\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"number\"},\n      \u8BF7\u56DE\u7B54\uFF1A\u5C06\u65F6\u95F4\u6233\u589E\u52A024\u5C0F\u65F6\n      ({outputs})=>{const time=new Date().getTime();outputs.output0(time+24*60*60*1000)}\n  \n      inputs\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"object\",\"additionalProperties\":false,\"properties\":{\"inputValue0\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"score\":{\"type\":\"number\"}}}}}},outputs\u542B\u6709\u4EE5\u4E0B\u51E0\u4E2A\u8F93\u51FA\u65B9\u6CD5,output0\u51FD\u6570\u8F93\u51FA\u7684\u503C\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"score\":{\"type\":\"number\"}}}},\n      \u8BF7\u56DE\u7B54\uFF1A\u4ECE\u5217\u8868\u4E2D\u83B7\u53D6\u6210\u7EE9\u5927\u4E8E\u7B49\u4E8E60\u7684\u5B66\u751F\n      ({outputs})=>{const list=[{score:1},{score:60},{score:99}];outputs.output0(list.filter(item=>item.score>=60))}\n\n      inputs\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"object\",\"additionalProperties\":false,\"properties\":{\"inputValue0\":{\"type\":\"number\"}}},outputs\u542B\u6709\u4EE5\u4E0B\u51E0\u4E2A\u8F93\u51FA\u65B9\u6CD5,output0\u51FD\u6570\u8F93\u51FA\u7684\u503C\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"number\"},\n      \u8BF7\u56DE\u7B54\uFF1A\u5C06\u8F93\u5165\u7684\u65F6\u95F4\u6233\u589E\u52A024\u5C0F\u65F6\n      ({outputs,inputs})=>{outputs.output0(inputs.inputValue0+24*60*60*1000)}\n\n      inputs\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"object\",\"additionalProperties\":false,\"properties\":{\"inputValue0\":{\"type\":\"number\"}}},outputs\u542B\u6709\u4EE5\u4E0B\u51E0\u4E2A\u8F93\u51FA\u65B9\u6CD5,output0\u51FD\u6570\u8F93\u51FA\u7684\u503C\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"number\"},output1\u51FD\u6570\u8F93\u51FA\u7684\u503C\u7684JSON Schema\u5B9A\u4E49\u4E3A{\"type\":\"number\"},\n      \u8BF7\u56DE\u7B54\uFF1A\u5982\u679C\u8F93\u5165\u7684\u6570\u5B57\u5927\u4E8E1\u4ECE\u8F93\u51FA\u98791\u8F93\u51FA\u5426\u5219\u4ECE\u8F93\u51FA\u98792\u8F93\u51FA\n      ({outputs,inputs})=>{if(inputs.inputValue0>1){outputs.output0(inputs.inputValue0)}else{outputs.output1(inputs.inputValue0)}}\n      \n      ").concat(inputsSchemaStr).concat(outputsSchemaStr, "\u5982\u679C\u63D0\u95EE\u4E2D\u6CA1\u6709\u8BF4\u660E\u6570\u636E\u6765\u81EA\u8F93\u5165(\u8F93\u5165\u9879\u3001inputs)\u65F6\u9700\u8981\u751F\u6210\u7B26\u5408\u8981\u6C42\u7684mock\u6570\u636E,\u5426\u5219\u4E0D\u5141\u8BB8\u51FA\u73B0mock\u6570\u636E\u4E14\u5FC5\u987B\u4E25\u683C\u6309\u7167inputs\u7684JSON Schema\u4EE5\u53CAoutputs\u4E0B\u5404\u51FD\u6570\u7684JSON Schema\u5B9A\u4E49\u6765\u5B9E\u73B0,\u56DE\u7B54\u4EE3\u7801\u5373\u53EF\u4E0D\u5141\u8BB8\u51FA\u73B0\u4EFB\u4F55\u89E3\u91CA\u6216\u6CE8\u91CA"),
      execute: function execute(props) {
        var data = props.data,
          newData = props.newData;
        if (typeof newData === 'function') {
          data.fns = newData.toString();
          console.log('生成可执行代码: ', data.fns);
        } else {
          console.log('生成代码错误: ', newData);
        }
      }
    };
    // return {
    //   prompts: `
    //   你是一名优秀的前端开发工程师,
    //   现在有一个函数模版A“${getCodeTemplate({useInputs})}”,
    //   功能描述中所表达的输入均来自inputs,所有的返回均使用outputs下函数处理,如果功能描述中没有强调数据来自输入,就不要使用inputs下的数据,请根据功能描述按需正确使用函数入参inputs和outputs编写基于函数模版A的Javascript代码,inputs以及outputs需要严格按照给定的JSON Schema定义来使用,不需要任何其它的解释或注释,以下是例子:
    //   inputs的JSON Schema定义为{"type":"object","additionalProperties":false,"properties":{"inputValue0":{"type":"number"}}},outputs含有以下几个输出方法,output0函数输出的值的JSON Schema定义为{"type":"number"},
    //   请回答：将输入的时间戳增加24小时
    //   ({outputs,inputs})=>{outputs.output0(inputs.inputValue0+24*60*60*1000)}
    //   inputs的JSON Schema定义为{"type":"object","additionalProperties":false,"properties":{"inputValue0":{"type":"number"}}},outputs含有以下几个输出方法,output0函数输出的值的JSON Schema定义为{"type":"number"},output1函数输出的值的JSON Schema定义为{"type":"number"},
    //   请回答：如果输入的数字大于1从输出项1输出否则从输出项2输出
    //   ({outputs,inputs})=>{if(inputs.inputValue0>1){outputs.output0(inputs.inputValue0)}else{outputs.output1(inputs.inputValue0)}}
    //   outputs含有以下几个输出方法,output0函数输出的值的JSON Schema定义为{"type":"number"},
    //   请回答：将时间戳增加24小时
    //   ({outputs})=>{outputs.output0(new Date().getTime()+24*60*60*1000)}
    //   inputs的JSON Schema定义为{"type":"object","additionalProperties":false,"properties":{"inputValue0":{"type":"array","items":{"type":"object","properties":{"score":{"type":"number"}}}}}},outputs含有以下几个输出方法,output0函数输出的值的JSON Schema定义为{"type":"array","items":{"type":"object","properties":{"score":{"type":"number"}}}},
    //   请回答：从列表中获取成绩大于等于60的学生
    //   ({outputs,inputs})=>{outputs.output0(inputs.inputValue0.filter(item=>item.score>=60))}
    //   ${inputsSchemaStr}${outputsSchemaStr}`,
    //   execute(props) {
    //     console.log('execute: ', props)
    //     const { data, newData } = props
    //     data.fns = newData.toString()
    //     console.log('data.fns: ', data.fns)
    //   }
    // }
  }
});
/**
 * 生成0-10的随机数，如果大于5从输出项1输出，否则从输出项2输出
 * +10输出
 * 将输入+10输出
 * 返回一个商品信息
 * 商品信息，包含商品名称、价格以及描述
 * 从商品列表中获取所有折扣商品，按价格从低到高排序，取前3个商品
 * 从今天上班的工人列表中找出工作时间最长的工人
 * 从今天上班的老师中找出年龄最大的5个
 * 返回商品信息
 * 如果输入的商品是折扣商品，输出折扣价格否则输出正常价格
 */

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/expression.ts":
/*!******************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/expression.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runExpression: function() { return /* binding */ runExpression; }
/* harmony export */ });
var getCodeFromTemplate = function getCodeFromTemplate(template) {
  // const code = template.match(/(?<=\{)(.+?)(?=\})/g)
  var _a;
  // Safari 不支持正则表达式中的 lookbehind，可以改为使用捕获组来提取大括号内的内容：
  // 该代码在 Chrome 和 Safari 中都能够执行，并返回大括号内的内容列表。
  var code = (_a = template.match(/\{(.+?)\}/g)) === null || _a === void 0 ? void 0 : _a.map(function (match) {
    return match.slice(1, -1);
  });
  return code ? code[0] : "";
};
var sandbox = function sandbox(code) {
  var fn = new Function("context", "with(context){\n      if(typeof ".concat(code, " !== 'undefined'){\n        return ").concat(code, "\n      }else{\n        return ''\n      }\n  }"));
  return function (context) {
    return fn(context);
  };
};
var runSuccess = function runSuccess(ret) {
  return {
    success: ret
  };
};
var runFail = function runFail(err) {
  return {
    error: err
  };
};
var runExpression = function runExpression(tpl, context) {
  try {
    var code = getCodeFromTemplate(tpl);
    if (!code || code.endsWith(".")) {
      return runSuccess('');
    }
    var ret = sandbox(code)(context);
    if (typeof ret === 'undefined') {
      throw new Error("".concat(code, " is not defined"));
    }
    return runSuccess(ret);
  } catch (error) {
    return runFail([{
      message: error === null || error === void 0 ? void 0 : error.message,
      startLineNumber: 0,
      endLineNumber: "".concat(tpl).split("\n").length + 1,
      length: tpl.length + 1
    }]);
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/index.ts":
/*!*************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/index.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runExpression: function() { return /* reexport safe */ _expression__WEBPACK_IMPORTED_MODULE_2__.runExpression; },
/* harmony export */   runJs: function() { return /* binding */ runJs; },
/* harmony export */   utils: function() { return /* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _sandbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sandbox */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/sandbox.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/utils.ts");
/* harmony import */ var _expression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expression */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/expression.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


function runJs(scriptText, model, props) {
  var _a;
  var _b = props || {},
    env = _b.env,
    _c = _b.callback,
    callback = _c === void 0 ? function () {} : _c;
  var isRuntime = (env === null || env === void 0 ? void 0 : env.runtime) && !((_a = env === null || env === void 0 ? void 0 : env.runtime) === null || _a === void 0 ? void 0 : _a.debug);
  if (_typeof(scriptText) === 'object') {
    scriptText = isRuntime ? (scriptText === null || scriptText === void 0 ? void 0 : scriptText.transformCode) || (scriptText === null || scriptText === void 0 ? void 0 : scriptText.code) : scriptText === null || scriptText === void 0 ? void 0 : scriptText.code;
  }
  var fn = null;
  if (model && model.length) {
    var sandBox = new _sandbox__WEBPACK_IMPORTED_MODULE_0__["default"]({
      module: true
    });
    var sourceStr = decodeURIComponent(scriptText);
    if (/export\s+default.*async.*function.*\(/g.test(sourceStr)) {
      fn = sandBox.compile("".concat(sourceStr.replace(/export\s+default.*function.*\(/g, 'async function _RT_(')));
    } else {
      fn = sandBox.compile("".concat(sourceStr.replace(/export\s+default.*function.*\(/g, 'function _RT_(')));
    }
  } else {
    var sandBox = new _sandbox__WEBPACK_IMPORTED_MODULE_0__["default"]();
    fn = sandBox.compile("".concat(decodeURIComponent(scriptText)));
  }
  return fn.run(model, callback);
}



/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/sandbox.ts":
/*!***************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/sandbox.ts ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var rawWindowInterval = window.setInterval;
var rawWindowClearInterval = window.clearInterval;
var rawWindowTimeout = window.setTimeout;
var rawWindowClearTimeout = window.clearTimeout;
var originWindow = window;
var constructableMap = new WeakMap();
function isConstructable(fn) {
  if (constructableMap.has(fn)) {
    return constructableMap.get(fn);
  }
  var constructableFunctionRegex = /^function\b\s[A-Z].*/;
  var classRegex = /^class\b/;
  var constructable = fn.prototype && fn.prototype.constructor === fn && Object.getOwnPropertyNames(fn.prototype).length > 1 || constructableFunctionRegex.test(fn.toString()) || classRegex.test(fn.toString());
  constructableMap.set(fn, constructable);
  return constructable;
}
var isCallable = function isCallable(fn) {
  return typeof fn === 'function';
};
var boundedMap = new WeakMap();
function isBoundedFunction(fn) {
  if (boundedMap.has(fn)) {
    return boundedMap.get(fn);
  }
  var bounded = fn.name.indexOf('bound ') === 0 && !fn.hasOwnProperty('prototype');
  boundedMap.set(fn, bounded);
  return bounded;
}
var functionBoundedValueMap = new WeakMap();
function getTargetValue(target, value) {
  var cachedBoundFunction = functionBoundedValueMap.get(value);
  if (cachedBoundFunction) {
    return cachedBoundFunction;
  }
  var boundValue = Function.prototype.bind.call(value, target);
  for (var key in value) {
    boundValue[key] = value[key];
  }
  if (value.hasOwnProperty('prototype') && !boundValue.hasOwnProperty('prototype')) boundValue.prototype = value.prototype;
  functionBoundedValueMap.set(value, boundValue);
  return boundValue;
}
var unscopables = {
  undefined: true,
  Array: true,
  Object: true,
  String: true,
  Boolean: true,
  Math: true,
  Number: true,
  Symbol: true,
  parseFloat: true,
  Float32Array: true
};
function getModuleScript(scriptText) {
  return "(\n                function(window, params, cb) {\n                    with(window) {\n                        return (".concat(scriptText, ")(...params, cb)\n                    }\n                }\n            )");
}
function getScript(scriptText) {
  return "(\n                function(window) {\n                    with(window){\n                        ".concat(scriptText, "\n                    } \n                }\n            ).bind(window.proxy)\n        ");
}
/**
 * 创建fakeWindow
 * @returns fakeWindow
 */
function createFakeWindow() {
  var fakeWindow = {};
  Object.getOwnPropertyNames(originWindow).forEach(function (key) {
    var descriptor = Object.getOwnPropertyDescriptor(originWindow, key);
    if (descriptor && !descriptor.configurable) {
      var hasGetter = Object.prototype.hasOwnProperty.call(descriptor, 'get');
      if (key === 'top' || key === 'parent' || key === 'self' || key === 'window') {
        descriptor.configurable = true;
        if (!hasGetter) {
          descriptor.writable = true;
        }
      }
      Object.defineProperty(fakeWindow, key, Object.freeze(descriptor));
    }
  });
  return fakeWindow;
}
/**
 * 将 window 的属性 p 拷贝到 fakeWindow
 * @param p
 * @param fakeWindow
 */
function copyFromWindow(p, fakeWindow) {
  var descriptor = Object.getOwnPropertyDescriptor(window, p);
  if (descriptor && descriptor.writable) {
    Object.defineProperty(fakeWindow, p, {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      writable: descriptor.writable,
      value: descriptor.value
    });
  }
}
var Sandbox = /** @class */function () {
  // @ts-ignore
  function Sandbox(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = this;
    this.hasDisposed = false;
    this.fakeWindow = createFakeWindow();
    this.timeoutList = [];
    this.intervalList = [];
    this.options = {};
    this.options = options || {};
    this.proxy = new Proxy(window, {
      set: function set(target, key, value) {
        if (!_this.hasDisposed) {
          try {
            if (!_this.fakeWindow.hasOwnProperty(key) && target.hasOwnProperty(key)) {
              // @ts-ignore
              copyFromWindow(key, _this.fakeWindow);
            }
            // @ts-ignore
            _this.fakeWindow[key] = value; // 赋值
          } catch (error) {
            console.error('set-key-error', key, error);
            throw error;
          }
        }
        return true;
      },
      get: function get(target, key) {
        if (key === Symbol.unscopables) {
          return unscopables;
        }
        if (key === 'window' || key === 'self') {
          return _this.proxy;
        }
        if (key === 'document') {
          return undefined;
        }
        if (key === 'hasOwnProperty') {
          return target.hasOwnProperty;
        }
        if (key === 'eval') {
          return target.eval;
        }
        if (key === 'location') {
          return target.location;
        }
        try {
          // @ts-ignore
          var value = key in _this.fakeWindow ? _this.fakeWindow[key] : target[key];
          // 仅绑定 isCallable && !isBoundedFunction && !isConstructable 的函数对象，如 window.console、window.atob 这类，
          // 不然微应用中调用时会抛出 Illegal invocation 异常
          if (isCallable(value) && !isBoundedFunction(value) && !isConstructable(value)) {
            value = Function.prototype.bind.call(value, target);
            return getTargetValue(window, value);
          }
          return value;
        } catch (error) {
          console.error('get-key-error', key, error);
          throw error;
        }
      },
      has: function has(target, key) {
        // @ts-ignore
        if (_this.options.module) {
          //参数允许逃逸到函数局部变量
          if (key === 'params' || key === 'cb') {
            return false;
          }
        }
        return true; // 伪造属性的存在性阻止沙盒逃逸
      }
    });

    this.proxy.setTimeout = function (handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      if (!_this.hasDisposed) {
        var timeoutId = rawWindowTimeout.apply(void 0, __spreadArray([handler, timeout], args, false));
        // @ts-ignore
        _this.timeoutList.push(timeoutId);
        return timeoutId;
      } else {
        return 0;
      }
    };
    this.proxy.clearTimeout = function (timeoutId) {
      // @ts-ignore
      var timeoutIndex = _this.timeoutList.indexOf(timeoutId);
      if (timeoutIndex !== -1) {
        _this.timeoutList.splice(timeoutIndex, 1);
      }
      return rawWindowClearTimeout(timeoutId);
    };
    this.proxy.setInterval = function (handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      if (!_this.hasDisposed) {
        var intervalId = rawWindowInterval.apply(void 0, __spreadArray([handler, timeout], args, false));
        // @ts-ignore
        _this.intervalList.push(intervalId);
        return intervalId;
      } else {
        return 0;
      }
    };
    this.proxy.clearInterval = function (intervalId) {
      // @ts-ignore
      var intervalIndex = _this.intervalList.indexOf(intervalId);
      if (intervalIndex !== -1) {
        _this.intervalList.splice(intervalIndex, 1);
      }
      return rawWindowClearInterval(intervalId);
    };
    // @ts-ignore
    originWindow.proxy = this.proxy;
  }
  // @ts-ignore
  Sandbox.prototype.compile = function (scriptText) {
    if (this.hasDisposed) {
      throw new Error('sandbox has been destroyed');
    }
    // @ts-ignore
    var isModule = this.options.module;
    var scriptTextWithSandbox;
    if (isModule) {
      scriptTextWithSandbox = getModuleScript(scriptText);
    } else {
      scriptTextWithSandbox = getScript(scriptText);
    }
    var fn = originWindow.eval("".concat(scriptTextWithSandbox, ";//@ sourceURL=sandbox-code.js"));
    return {
      // @ts-ignore
      run: function run(model, cb) {
        try {
          if (isModule) {
            // @ts-ignore
            return fn(window.proxy, model, cb);
          } else {
            // @ts-ignore
            return fn(window.proxy);
          }
        } catch (err) {
          console.error("js sandbox error occur:", err);
          throw err;
        }
      }
    };
  };
  //沙箱销毁功能
  Sandbox.prototype.dispose = function () {
    this.timeoutList.forEach(function (timeoutId) {
      window.clearTimeout(timeoutId);
    });
    this.timeoutList = [];
    this.intervalList.forEach(function (intervalId) {
      return rawWindowClearInterval(intervalId);
    });
    this.intervalList = [];
    this.fakeWindow = createFakeWindow();
    this.options = {};
    // @ts-ignore
    delete originWindow.proxy;
    this.hasDisposed = true;
    console.log('Sandbox was successfully destroyed');
  };
  return Sandbox;
}();
/* harmony default export */ __webpack_exports__["default"] = (Sandbox);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/utils.ts":
/*!*************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/utils.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isEmailPrefix(str) {
  return /^[a-zA-Z]+[\d\w_-]*$/.test(str);
}
function isNumber(str) {
  return /^\d+$/.test(str);
}
function isCommaNumber(str) {
  return /^\d+(,\d+)*$/.test(str);
}
function numToPercent(num, bit) {
  if (num === void 0) return 'input error';
  return "".concat((num * 100).toFixed(bit || 2), "%");
}
function isUrl(url) {
  return /^((https?):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i.test(url);
}
function getCookies() {
  return document.cookie.split('; ').reduce(function (s, e) {
    var p = e.indexOf('=');
    s[e.slice(0, p)] = e.slice(p + 1);
    return s;
  }, {});
}
function getParams() {
  return location.search.slice(1).split('&').reduce(function (s, a) {
    var m = a.split('=');
    if (m[0]) {
      s[m[0]] = decodeURIComponent(m[1]);
    }
    return s;
  }, {});
}
var transformCodeByBabel = function transformCodeByBabel(val, props) {
  var _a = props || {},
    presets = _a.presets,
    errorCallback = _a.errorCallback,
    _b = _a.babelInstance,
    babelInstance = _b === void 0 ? window === null || window === void 0 ? void 0 : window.Babel : _b;
  if (typeof (babelInstance === null || babelInstance === void 0 ? void 0 : babelInstance.transform) !== 'function' || typeof val !== 'string') {
    return val;
  }
  var res = {
    code: val,
    transformCode: ''
  };
  try {
    var temp = decodeURIComponent(val);
    if (/export\s+default.*async.*function.*\(/g.test(temp)) {
      temp = temp.replace(/export\s+default.*function.*\(/g, '_RTFN_ = async function _RT_(');
    } else if (/export\s+default.*function.*\(/g.test(temp)) {
      temp = temp.replace(/export\s+default.*function.*\(/g, '_RTFN_ = function _RT_(');
    } else {
      temp = "_RTFN_ = ".concat(temp, " ");
    }
    res.transformCode = encodeURIComponent(babelInstance.transform(temp, {
      presets: presets || ['env'],
      comments: false
    }).code);
    res.transformCode = "".concat(encodeURIComponent("(function() { var _RTFN_; \n")).concat(res.transformCode).concat(encodeURIComponent("\n; return _RTFN_; })()"));
  } catch (e) {
    if (typeof errorCallback === 'function') {
      errorCallback(e);
    }
    return val;
  }
  return res;
};
/* harmony default export */ __webpack_exports__["default"] = ({
  isEmailPrefix: isEmailPrefix,
  isCommaNumber: isCommaNumber,
  numToPercent: numToPercent,
  isNumber: isNumber,
  isUrl: isUrl,
  getCookies: getCookies,
  getParams: getParams,
  transformCodeByBabel: transformCodeByBabel
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/constants.ts":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/constants.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CODE_TEMPLATE: function() { return /* binding */ CODE_TEMPLATE; },
/* harmony export */   COMMENTS: function() { return /* binding */ COMMENTS; },
/* harmony export */   IMMEDIATE_CODE_TEMPLATE: function() { return /* binding */ IMMEDIATE_CODE_TEMPLATE; }
/* harmony export */ });
var CODE_TEMPLATE = "({ outputs, inputs }) => {\n  const [ inputValue0 ] = inputs;\n  const [ output0 ] = outputs;\n  output0(inputValue0);\n}";
var IMMEDIATE_CODE_TEMPLATE = "({ outputs }) => {\n  const [ output0 ] = outputs;\n  output0(0);\n}";
var COMMENTS = "/**\n* @parma inputs: any[] \u8F93\u5165\u9879\n* @parma outputs: any[] \u8F93\u51FA\u9879\n*\n* \u4F8B\u5B50\n* ({ inputs, outputs }) => {\n*   const [ inputValue0, inputValue1 ] = inputs;\n*   const [ output0, output1, output2 ] = outputs;\n*   const res = '\u8BE5\u503C\u8F93\u51FA\u7ED9\u4E0B\u4E00\u4E2A\u7EC4\u4EF6\u4F7F\u7528' + inputValue0\n*   \n*   // \u5411\u8F93\u51FA\u9879\uFF08output0\uFF09\u8F93\u51FA\u7ED3\u679C\n*   output0(res); \n\n*   // \u591A\u8F93\u51FA\u7684\u60C5\u51B5\n*   // \u5411\u8F93\u51FA\u9879\uFF08output1\uFF09\u8F93\u51FA\u8F93\u5165\u98790\u7684\u503C\n*   // output1(inputValue0); \n*   // \u5411\u8F93\u51FA\u9879\uFF08output2\uFF09\u8F93\u51FA\u8F93\u5165\u98791\u7684\u503C\n*   // output2(inputValue1); \n* }\n*/";

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/editors.ts":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/editors.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/constants.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/util.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
  '@init': function init(_a) {
    var data = _a.data,
      setAutoRun = _a.setAutoRun,
      isAutoRun = _a.isAutoRun,
      output = _a.output;
    var autoRun = isAutoRun ? isAutoRun() : false;
    if (autoRun || data.runImmediate) {
      setAutoRun(true);
      data.runImmediate = true;
      output.get('output0').setSchema({
        type: 'number'
      });
    }
    data.fns = data.fns || (data.runImmediate ? _constants__WEBPACK_IMPORTED_MODULE_0__.IMMEDIATE_CODE_TEMPLATE : _constants__WEBPACK_IMPORTED_MODULE_0__.CODE_TEMPLATE);
  },
  '@inputConnected': function inputConnected(_a, fromPin) {
    var data = _a.data,
      output = _a.output;
    if (data.fns === _constants__WEBPACK_IMPORTED_MODULE_0__.CODE_TEMPLATE) {
      output.get('output0').setSchema({
        type: 'unknown'
      });
    }
  },
  ':root': [{
    title: '添加输入项',
    type: 'Button',
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return !data.runImmediate;
    },
    value: {
      set: function set(_a) {
        var input = _a.input;
        var idx = getIoOrder(input);
        var hostId = "input.inputValue".concat(idx);
        var title = "\u53C2\u6570".concat(idx);
        input.add(hostId, title, {
          type: 'follow'
        }, true);
      }
    }
  }, {
    title: '添加输出项',
    type: 'Button',
    value: {
      set: function set(_a) {
        var output = _a.output;
        var idx = getIoOrder(output);
        var hostId = "output".concat(idx);
        var title = "\u8F93\u51FA\u9879".concat(idx);
        output.add({
          id: hostId,
          title: title,
          schema: {
            type: 'unknown'
          },
          editable: true,
          deletable: true
        });
      }
    }
  }, {
    type: 'code',
    options: function options(_a) {
      var data = _a.data,
        output = _a.output;
      var option = {
        babel: true,
        comments: _constants__WEBPACK_IMPORTED_MODULE_0__.COMMENTS,
        theme: 'light',
        minimap: {
          enabled: false
        },
        lineNumbers: 'on',
        eslint: {
          parserOptions: {
            ecmaVersion: '2020',
            sourceType: 'module'
          }
        },
        autoSave: false,
        onBlur: function onBlur() {
          updateOutputSchema(output, data.fns);
        }
      };
      return option;
    },
    title: '代码编辑',
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.fns;
      },
      set: function set(_a, fns) {
        var data = _a.data;
        data.fns = fns;
      }
    }
  }]
});
function updateOutputSchema(output, code) {
  var outputs = {};
  var inputs = {};
  output.get().forEach(function (_a) {
    var id = _a.id;
    outputs[id] = function (v) {
      try {
        var schema = (0,_util__WEBPACK_IMPORTED_MODULE_1__.jsonToSchema)(v);
        output.get(id).setSchema(schema);
      } catch (error) {
        output.get(id).setSchema({
          type: 'unknown'
        });
      }
    };
  });
  setTimeout(function () {
    try {
      var fn = eval(decodeURIComponent(code.code || code));
      fn({
        inputValue: void 0,
        outputs: (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertObject2Array)(outputs),
        inputs: (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertObject2Array)(inputs)
      });
    } catch (error) {
      console.error(error);
    }
  });
}
function getIoOrder(io) {
  var ports = io.get();
  var id = ports.pop().id;
  return Number(id.replace(/\D+/, '')) + 1;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/runtime.ts":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/runtime.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./com-utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/com-utils/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/util.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var env = _a.env,
    data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  var fns = data.fns,
    runImmediate = data.runImmediate;
  var runJSParams = {
    outputs: (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertObject2Array)(outputs)
  };
  try {
    if (runImmediate) {
      if (env.runtime) {
        (0,_com_utils__WEBPACK_IMPORTED_MODULE_0__.runJs)(fns, [runJSParams]);
      }
    }
    inputs['input'](function (val) {
      try {
        (0,_com_utils__WEBPACK_IMPORTED_MODULE_0__.runJs)(fns, [__assign(__assign({}, runJSParams), {
          inputs: (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertObject2Array)(val)
        })]);
      } catch (ex) {
        onError === null || onError === void 0 ? void 0 : onError(ex);
        console.error('js计算组件运行错误.', ex);
        logger.error("".concat(ex));
      }
    });
  } catch (ex) {
    onError === null || onError === void 0 ? void 0 : onError(ex);
    console.error('js计算组件运行错误.', ex);
    logger.error("".concat(ex));
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/util.ts":
/*!**************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/util.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertObject2Array: function() { return /* binding */ convertObject2Array; },
/* harmony export */   jsonToSchema: function() { return /* binding */ jsonToSchema; }
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function jsonToSchema(json) {
  var schema = {
    type: void 0
  };
  proItem({
    schema: schema,
    val: json
  });
  if (schema.type) {
    return schema;
  } else {
    return;
  }
}
function proItem(_c) {
  var schema = _c.schema,
    val = _c.val,
    key = _c.key,
    fromAry = _c.fromAry;
  if (Array.isArray(val)) {
    var items = {};
    if (key) {
      schema[key] = {
        type: 'array',
        items: items
      };
    } else {
      schema.type = 'array';
      schema.items = items;
    }
    proAry(items, val);
  } else {
    if (_typeof(val) === 'object' && val) {
      var nSchema = void 0;
      if (fromAry) {
        schema.type = 'object';
        nSchema = schema.properties = {};
      }
      var properties = fromAry ? nSchema : {};
      if (!fromAry) {
        if (key) {
          schema[key] = {
            type: 'object',
            properties: properties
          };
        } else {
          schema.type = 'object';
          schema.properties = properties;
        }
      }
      proObj(properties, val);
    } else {
      var type = val === null || val === void 0 ? 'any' : _typeof(val);
      if (key === void 0) {
        schema.type = type;
      } else {
        schema[key] = {
          type: type
        };
      }
    }
  }
}
function proObj(curSchema, obj) {
  Object.keys(obj).map(function (key) {
    return proItem({
      schema: curSchema,
      val: obj[key],
      key: key
    });
  });
}
function proAry(curSchema, ary) {
  var sample;
  if (ary.length > 0) {
    sample = ary[0];
  }
  proItem({
    schema: curSchema,
    val: sample,
    fromAry: true
  });
}
function convertObject2Array(input) {
  var result = [];
  Object.keys(input).sort(function (a, b) {
    var _c, _d;
    var _a = ((_c = a === null || a === void 0 ? void 0 : a.match(/\d+/g)) === null || _c === void 0 ? void 0 : _c[0]) || 0;
    var _b = ((_d = b === null || b === void 0 ? void 0 : b.match(/\d+/g)) === null || _d === void 0 ? void 0 : _d[0]) || 0;
    return +_a - +_b;
  }).forEach(function (key) {
    result.push(input[key]);
  });
  return result;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/constants.ts":
/*!******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/constants.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var OutputIds = {
  Output: 'output'
};
var Schemas = {
  Follow: {
    type: 'follow'
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/editors.ts":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/editors.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/constants.ts");

// 获取输出schema
function getOutputSchema(input) {
  var res = {};
  var inputList = input.get();
  (inputList || []).forEach(function (item) {
    var _a;
    var schema = (_a = input.get(item === null || item === void 0 ? void 0 : item.id)) === null || _a === void 0 ? void 0 : _a.schema;
    Object.assign(res, schema === null || schema === void 0 ? void 0 : schema.properties);
  });
  return {
    type: 'object',
    properties: res
  };
}
// 获取输入项序号
function getInputOrder(_a) {
  var _b;
  var input = _a.input;
  var ports = input.get();
  var id = (((_b = ports === null || ports === void 0 ? void 0 : ports.pop) === null || _b === void 0 ? void 0 : _b.call(ports)) || {}).id;
  return (Number(id.slice(5)) || 0) + 1;
}
/* harmony default export */ __webpack_exports__["default"] = ({
  '@inputUpdated': function inputUpdated(_a, updatePin) {
    var input = _a.input,
      output = _a.output;
    if (updatePin.id !== _constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output).setSchema(getOutputSchema(input));
    }
  },
  '@inputConnected': function inputConnected(_a) {
    var output = _a.output,
      input = _a.input;
    output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output).setSchema(getOutputSchema(input));
  },
  '@inputDisConnected': function inputDisConnected(_a) {
    var output = _a.output,
      input = _a.input;
    output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output).setSchema(getOutputSchema(input));
  },
  ':root': [{
    title: '添加输入项',
    type: 'Button',
    value: {
      set: function set(_a) {
        var input = _a.input;
        var idx = getInputOrder({
          input: input
        });
        var title = "\u8F93\u5165\u9879".concat(idx);
        var hostId = "input".concat(idx);
        input.add(hostId, title, _constants__WEBPACK_IMPORTED_MODULE_0__.Schemas.Follow, true);
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/runtime.ts":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/runtime.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/constants.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  try {
    var valList_1 = [];
    var inputNum_1 = Object.keys(inputs).length;
    var triggerKeys_1 = new Set();
    var getOutputVal_1 = function getOutputVal_1() {
      var res = {};
      valList_1.forEach(function (val) {
        if (val && _typeof(val) === 'object' && !Array.isArray(val)) {
          res = __assign(__assign({}, res), val);
        }
      });
      return res;
    };
    Object.keys(inputs).forEach(function (key, index) {
      inputs[key](function (val) {
        triggerKeys_1.add(key);
        valList_1[index] = val;
        if (triggerKeys_1.size === inputNum_1) {
          outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output](getOutputVal_1());
          triggerKeys_1.clear();
          valList_1 = [];
        }
      });
    });
  } catch (ex) {
    console.error('js计算组件运行错误.', ex);
    logger.error("".concat(ex));
    onError === null || onError === void 0 ? void 0 : onError(ex);
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/constants.ts":
/*!********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/constants.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; }
/* harmony export */ });
var InputIds = {
  INPUT: "input"
};
var OutputIds = {
  ENCRYPTION_VALUE: "encryptionValue"
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/editors.ts":
/*!******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/editors.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  "@init": function init(_a) {
    var data = _a.data;
  },
  ":root": []
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/runtime.ts":
/*!******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/runtime.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/constants.ts");
/* harmony import */ var jsencrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsencrypt */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/jsencrypt/lib/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var env = _a.env,
    data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  var encrypt = function encrypt(key, value) {
    if (typeof key !== "string" || typeof value !== "string") {
      console.error("RSA加密组件入参有误");
      return false;
    }
    // 公钥加密
    if (data.encryptionType === "public") {
      var encryptor = new jsencrypt__WEBPACK_IMPORTED_MODULE_1__["default"]();
      encryptor.setPublicKey(key);
      return encryptor.encrypt(value);
    }
    // 私钥解密
    else if (data.encryptionType === "private") {
      var decrypt = new jsencrypt__WEBPACK_IMPORTED_MODULE_1__["default"]();
      decrypt.setPrivateKey(key);
      return decrypt.decrypt(value);
    }
    return false;
  };
  try {
    if (env.runtime) {
      inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.INPUT](function (val) {
        if (val) {
          outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.ENCRYPTION_VALUE](encrypt(val.key, val.value));
        }
      });
    }
  } catch (ex) {
    onError === null || onError === void 0 ? void 0 : onError(ex);
    console.error("RSA加密组件运行错误.", ex);
    logger.error("".concat(ex));
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/editors.tsx":
/*!*********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/editors.tsx ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  //“any类型”
  // '@outputConnected'({ data, output }, fromPin, toPin) {
  //   //如果是“any”，schema跟着后面的schema
  //   if (fromPin.schema.type === 'any') {
  //     data.outSchema = toPin.schema;
  //     output.get('outputData').setSchema(data.outSchema);
  //   } else {
  //     //否则，schema拿到自己编辑好的
  //     data.outSchema = fromPin.schema;
  //     output.get('outputData').setSchema(data.outSchema);
  //   }
  // },
  // '@outputUpdated'({ data, input, output, slots }, pin) {
  //   //编辑区更新了，重重存储
  //   data.outSchema = pin.schema;
  // },
  //"follow类型"
  '@outputUpdated': function outputUpdated(_a, pin) {
    var data = _a.data,
      input = _a.input,
      output = _a.output,
      slots = _a.slots;
    //编辑区更新了，重重存储
    data.outSchema = pin.schema;
    //加上这一句会死循环
    //output.get('outputData').setSchema(data.outSchema);
  },

  ':root': [{
    title: '数组长度',
    type: 'inputnumber',
    options: [{
      min: 1,
      max: 100,
      width: 60
    }],
    value: {
      get: function get(_a) {
        var data = _a.data;
        return [data.arrLength];
      },
      set: function set(_a, value) {
        var data = _a.data;
        data.arrLength = value[0];
      }
    }
  }, {
    title: '字符串长度',
    type: 'inputnumber',
    options: [{
      min: 1,
      max: 20,
      width: 60
    }],
    value: {
      get: function get(_a) {
        var data = _a.data;
        return [data.strLength];
      },
      set: function set(_a, value) {
        var data = _a.data;
        data.strLength = value[0];
      }
    }
  }, {
    title: '随机数范围',
    type: 'InputNumber',
    options: [{
      title: '最小',
      min: 0,
      width: 100
    }, {
      title: '最大',
      max: 999999,
      width: 100
    }],
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.numberRange || [0, 100];
      },
      set: function set(_a, value) {
        var data = _a.data;
        data.numberRange = value;
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/runtime.tsx":
/*!*********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/runtime.tsx ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
//随机生成字符串
function randomString(e) {
  e = e || 32;
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = '';
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}
//生成随机数
function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return Min + Math.round(Rand * Range);
}
//生成随机布尔值
function GetRandomBoolean() {
  var bool = GetRandomNum(0, 1);
  if (bool === 0) {
    return false;
  } else {
    return true;
  }
}
//如果any的话，可以生成字符串、随机数、布尔值、{}和[]
function GetRandomAny(e) {
  var random = GetRandomNum(0, 4);
  switch (random) {
    //随机字符串
    case 0:
      return randomString(e.strLength);
    //随机数
    case 1:
      return GetRandomNum(e.numberRange[0], e.numberRange[1]);
    //随机布尔值
    case 2:
      return GetRandomBoolean();
    //空对象
    case 3:
      return {};
    case 4:
      return [];
  }
}
//递归计算最小单元schema
var minCulation = function minCulation(schema, data) {
  //如果不是数组和对象，是最小单元了，就可以生成最小模块了
  //考虑了schema.type写错或者不存在的情况，返回空对象
  if (schema === undefined) {
    return undefined;
  } else if (schema.type === 'string' || schema.type === 'number' || schema.type === 'boolean' || schema.type === 'any' || schema.type === undefined) {
    switch (schema.type) {
      case 'string':
        return randomString(data.strLength);
      case 'number':
        return GetRandomNum(data.numberRange[0], data.numberRange[1]);
      case 'boolean':
        return GetRandomBoolean();
      case 'any':
        return GetRandomAny(data);
      case undefined:
        return {};
    }
  } else if (schema.type === 'object' || schema.type === 'array') {
    if (schema.type === 'object') {
      //考虑对象中的properties写错或者不存在的情况，返回空对象
      if (schema.properties === undefined) {
        return {};
      } else {
        var keys = Object.keys(schema.properties);
        var vals = keys.map(function (e) {
          return minCulation(schema.properties[e], data);
        });
        var newObj = {};
        for (var i = 0; i < keys.length; i++) {
          newObj[keys[i]] = vals[i];
        }
        return newObj;
      }
    } else if (schema.type === 'array') {
      //考虑对象中的items写错或者不存在的情况，返回空数组
      if (schema.items === undefined) {
        return [];
      } else {
        var newArr = [];
        var items = schema.items;
        //for (let i = 0; i < 10; i++) {
        for (var i = 0; i < data.arrLength; i++) {
          newArr.push(minCulation(items, data));
        }
        return newArr;
      }
    }
  }
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data,
    env = _a.env,
    inputs = _a.inputs,
    outputs = _a.outputs;
  var runtime = env.runtime;
  if (runtime) {
    //触发输出
    inputs['mockTouch'](function (val, outputRels) {
      outputRels['outputData'](minCulation(data.outSchema, data));
    });
    //连接组件直接输出
    if (outputs['outputData']) {
      outputs['outputData'](minCulation(data.outSchema, data));
    }
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/constants.ts":
/*!********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/constants.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var InputIds = {
  Trigger: 'trigger'
};
var OutputIds = {
  Trigger: 'trigger'
};
var Schemas = {
  Any: {
    type: 'any'
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/editors.tsx":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/editors.tsx ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/constants.ts");

var setDescByData = function setDescByData(_a) {
  var data = _a.data,
    setDesc = _a.setDesc;
  var delay = data.delay;
  var info = ["\u9632\u6B62\u6296\u52A8".concat(delay, "ms")];
  setDesc(info.join('\n'));
};
/* harmony default export */ __webpack_exports__["default"] = ({
  '@inputUpdated': function inputUpdated(_a, pin) {
    var output = _a.output;
    if (pin.id === _constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Trigger).setSchema(pin.schema);
    }
  },
  '@inputDisConnected': function inputDisConnected(_a, fromPin, toPin) {
    var output = _a.output;
    if (toPin.id === _constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Trigger).setSchema(_constants__WEBPACK_IMPORTED_MODULE_0__.Schemas.Any);
    }
  },
  '@init': function init(_a) {
    var data = _a.data,
      setDesc = _a.setDesc;
    setDescByData({
      data: data,
      setDesc: setDesc
    });
  },
  ':root': [{
    title: '防抖时间(ms)',
    type: 'text',
    options: {
      type: 'number'
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.delay;
      },
      set: function set(_a, value) {
        var data = _a.data,
          setDesc = _a.setDesc;
        data.delay = parseInt("".concat(value), 10) || 0;
        setDescByData({
          data: data,
          setDesc: setDesc
        });
      }
    }
  }, {
    title: '立即执行',
    type: 'switch',
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.isleading;
      },
      set: function set(_a, value) {
        var data = _a.data;
        data.isleading = value;
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/runtime.ts":
/*!******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/runtime.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/constants.ts");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/debounce */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var env = props.env,
    data = props.data,
    outputs = props.outputs,
    inputs = props.inputs;
  // 防抖
  var debounceOutput = lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(function (val) {
    outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Trigger](val);
  }, data.delay, data.isleading ? {
    leading: true
  } : void 0);
  if ((env === null || env === void 0 ? void 0 : env.runtime) && inputs) {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](function (val) {
      debounceOutput(val);
    });
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/upgrade.ts":
/*!******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/upgrade.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data;
  //1.0.0 ->1.0.1，增加立即执行
  if (typeof data.isleading === "undefined") {
    data.isleading = false;
  }
  ;
  return true;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/constants.ts":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/constants.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var InputIds = {
  Trigger: 'trigger',
  Cancel: 'cancel'
};
var OutputIds = {
  Trigger: 'trigger'
};
var Schemas = {
  Any: {
    type: 'any'
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/editors.tsx":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/editors.tsx ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/constants.ts");


var setDescByData = function setDescByData(_a) {
  var data = _a.data,
    setDesc = _a.setDesc;
  var delay = data.delay;
  var info = ["\u5EF6\u8FDF".concat(delay, "ms\u6267\u884C")];
  setDesc(info.join('\n'));
};
/* harmony default export */ __webpack_exports__["default"] = ({
  '@inputUpdated': function inputUpdated(_a, pin) {
    var output = _a.output;
    if (pin.id === _constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.Trigger) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_1__.OutputIds.Trigger).setSchema(pin.schema);
    }
  },
  '@inputDisConnected': function inputDisConnected(_a, fromPin, toPin) {
    var output = _a.output;
    if (toPin.id === _constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.Trigger) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_1__.OutputIds.Trigger).setSchema(_constants__WEBPACK_IMPORTED_MODULE_1__.Schemas.Any);
    }
  },
  '@init': function init(_a) {
    var data = _a.data,
      setDesc = _a.setDesc;
    data.id = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)();
    setDescByData({
      data: data,
      setDesc: setDesc
    });
  },
  ':root': [{
    title: '延迟时间（ms）',
    type: 'text',
    options: {
      type: 'number'
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.delay;
      },
      set: function set(_a, value) {
        var data = _a.data,
          setDesc = _a.setDesc;
        data.delay = parseInt("".concat(value), 10) || 0;
        setDescByData({
          data: data,
          setDesc: setDesc
        });
      }
    }
  }, {
    title: '取消操作',
    description: '开启后，支持取消当前延迟执行',
    type: 'Switch',
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.useCancel;
      },
      set: function set(_a, value) {
        var data = _a.data,
          input = _a.input;
        data.useCancel = value;
        if (value) {
          input.add(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.Cancel, '取消', _constants__WEBPACK_IMPORTED_MODULE_1__.Schemas.Any);
        } else {
          input.remove(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.Cancel);
        }
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/runtime.ts":
/*!***************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/runtime.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/constants.ts");

// TODO: 调试结束清除定时器
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var _a;
  var env = props.env,
    data = props.data,
    outputs = props.outputs,
    inputs = props.inputs;
  var timer;
  if ((env === null || env === void 0 ? void 0 : env.runtime) && inputs) {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](function (val) {
      clearInterval(timer);
      timer = setTimeout(function () {
        outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](val);
      }, data.delay);
    });
    (_a = inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Cancel]) === null || _a === void 0 ? void 0 : _a.call(inputs, function () {
      clearTimeout(timer);
    });
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/constants.ts":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/constants.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var InputIds = {
  Trigger: 'trigger',
  Cancel: 'cancel'
};
var OutputIds = {
  Trigger: 'trigger'
};
var Schemas = {
  Any: {
    type: 'any'
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/editors.tsx":
/*!***************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/editors.tsx ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/constants.ts");


var setDescByData = function setDescByData(_a) {
  var data = _a.data,
    setDesc = _a.setDesc;
  var delay = data.delay,
    immediate = data.immediate;
  var info = [immediate && '立即执行一次', "\u6BCF".concat(delay, "ms\u6267\u884C\u4E00\u6B21")];
  setDesc(info.filter(function (item) {
    return !!item;
  }).join('\n'));
};
/* harmony default export */ __webpack_exports__["default"] = ({
  '@inputUpdated': function inputUpdated(_a, pin) {
    var output = _a.output;
    if (pin.id === _constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.Trigger) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_1__.OutputIds.Trigger).setSchema(pin.schema);
    }
  },
  '@inputDisConnected': function inputDisConnected(_a, fromPin, toPin) {
    var output = _a.output;
    if (toPin.id === _constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.Trigger) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_1__.OutputIds.Trigger).setSchema(_constants__WEBPACK_IMPORTED_MODULE_1__.Schemas.Any);
    }
  },
  '@init': function init(_a) {
    var data = _a.data,
      setDesc = _a.setDesc;
    data.id = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)();
    setDescByData({
      data: data,
      setDesc: setDesc
    });
  },
  ':root': [{
    title: '循环时间（ms）',
    type: 'Text',
    options: {
      type: 'Number'
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.delay;
      },
      set: function set(_a, value) {
        var data = _a.data,
          setDesc = _a.setDesc;
        data.delay = parseInt("".concat(value), 10) || 0;
        setDescByData({
          data: data,
          setDesc: setDesc
        });
      }
    }
  }, {
    title: '立即触发',
    description: '开启后会立即触发一次执行',
    type: 'Switch',
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.immediate;
      },
      set: function set(_a, value) {
        var data = _a.data,
          setDesc = _a.setDesc;
        data.immediate = value;
        setDescByData({
          data: data,
          setDesc: setDesc
        });
      }
    }
  }, {
    title: '取消操作',
    description: '开启后，支持取消当前循环执行',
    type: 'Switch',
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.useCancel;
      },
      set: function set(_a, value) {
        var data = _a.data,
          input = _a.input;
        data.useCancel = value;
        if (value) {
          input.add(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.Cancel, '取消', _constants__WEBPACK_IMPORTED_MODULE_1__.Schemas.Any);
        } else {
          input.remove(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.Cancel);
        }
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/runtime.ts":
/*!**************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/runtime.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/constants.ts");

// TODO: 调试结束清除定时器
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var _a;
  var env = props.env,
    data = props.data,
    outputs = props.outputs,
    inputs = props.inputs;
  var timer;
  if ((env === null || env === void 0 ? void 0 : env.runtime) && inputs) {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](function (val) {
      clearInterval(timer);
      if (data.immediate) {
        outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](val);
      }
      timer = setInterval(function () {
        outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](val);
      }, data.delay);
    });
    (_a = inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Cancel]) === null || _a === void 0 ? void 0 : _a.call(inputs, function () {
      clearInterval(timer);
    });
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/constants.ts":
/*!********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/constants.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var InputIds = {
  Trigger: 'trigger'
};
var OutputIds = {
  Trigger: 'trigger'
};
var Schemas = {
  Any: {
    type: 'any'
  }
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/editors.tsx":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/editors.tsx ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/constants.ts");

var setDescByData = function setDescByData(_a) {
  var data = _a.data,
    setDesc = _a.setDesc;
  var delay = data.delay;
  var info = ["\u8282\u6D41".concat(delay, "ms")];
  setDesc(info.join('\n'));
};
/* harmony default export */ __webpack_exports__["default"] = ({
  '@inputUpdated': function inputUpdated(_a, pin) {
    var output = _a.output;
    if (pin.id === _constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Trigger).setSchema(pin.schema);
    }
  },
  '@inputDisConnected': function inputDisConnected(_a, fromPin, toPin) {
    var output = _a.output;
    if (toPin.id === _constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger) {
      output.get(_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Trigger).setSchema(_constants__WEBPACK_IMPORTED_MODULE_0__.Schemas.Any);
    }
  },
  '@init': function init(_a) {
    var data = _a.data,
      setDesc = _a.setDesc;
    setDescByData({
      data: data,
      setDesc: setDesc
    });
  },
  ':root': [{
    title: '节流时间(ms)',
    type: 'text',
    options: {
      type: 'number'
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.delay;
      },
      set: function set(_a, value) {
        var data = _a.data,
          setDesc = _a.setDesc;
        data.delay = parseInt("".concat(value), 10) || 0;
        setDescByData({
          data: data,
          setDesc: setDesc
        });
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/runtime.ts":
/*!******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/runtime.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/constants.ts");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/throttle */ "../../../../../../../../Kuai/workplace/comlib-basic/node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var env = props.env,
    data = props.data,
    outputs = props.outputs,
    inputs = props.inputs;
  // 节流
  var throttleOutput = lodash_throttle__WEBPACK_IMPORTED_MODULE_1___default()(function (val) {
    outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Trigger](val);
  }, data.delay);
  if ((env === null || env === void 0 ? void 0 : env.runtime) && inputs) {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](function (val) {
      throttleOutput(val);
    });
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_type-change/editors.tsx":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_type-change/editors.tsx ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  '@init': function init(_a) {
    var data = _a.data,
      setDesc = _a.setDesc;
    if (!data.exchange) {
      setDesc("\u672A\u914D\u7F6E\u89C4\u5219");
    }
  },
  ':root': [{
    title: '类型转换',
    type: '_typeChange',
    options: function options(_a) {
      var data = _a.data,
        input = _a.input,
        output = _a.output;
      var from = input.get('from').schema;
      var to = output.get('to').schema;
      return {
        from: from,
        to: to
      };
    },
    value: {
      get: function get(_a) {
        var data = _a.data,
          input = _a.input,
          output = _a.output;
        return data.exchange;
      },
      set: function set(_a, val) {
        var data = _a.data,
          setDesc = _a.setDesc;
        data.exchange = val;
        if (val.script) {
          setDesc("".concat(val.title));
        } else {
          setDesc("\u672A\u914D\u7F6E\u89C4\u5219");
        }
      }
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_type-change/rt.tsx":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_type-change/rt.tsx ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data,
    outputs = _a.outputs,
    inputs = _a.inputs,
    onError = _a.onError;
  inputs['from'](function (val, relOutpus) {
    var _a;
    var script = (_a = data.exchange) === null || _a === void 0 ? void 0 : _a.script;
    if (script) {
      var fn = void 0,
        returnVal = void 0,
        isOk = void 0;
      try {
        eval("fn = ".concat(script));
        returnVal = fn(val);
        isOk = true;
      } catch (ex) {
        console.error(ex);
        onError("\u6570\u636E\u8F6C\u6362\u9519\u8BEF:".concat(ex.message), ex);
      }
      if (isOk) {
        outputs['to'](returnVal);
      }
    } else {
      onError('未配置转换规则');
    }
  });
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.tsx":
/*!**********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.tsx ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_1__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};


var Resizable = function Resizable(_a) {
  var _b = _a.axis,
    axis = _b === void 0 ? "x" : _b,
    _c = _a.zoom,
    zoom = _c === void 0 ? 1 : _c,
    onResizeStart = _a.onResizeStart,
    onResize = _a.onResize,
    onResizeStop = _a.onResizeStop,
    children = _a.children,
    className = _a.className;
  var preRect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var _d = children.props,
    targetChildren = _d.children,
    rest = __rest(_d, ["children"]);
  var resizeStartHandler = function resizeStartHandler(e, axis) {
    preRect.current = e.target.parentNode.getBoundingClientRect();
    onResizeStart && onResizeStart();
  };
  var resizeHandler = function resizeHandler(axis, offset) {
    var _a;
    var _b = (_a = preRect.current) !== null && _a !== void 0 ? _a : {},
      _c = _b.width,
      width = _c === void 0 ? 0 : _c,
      _d = _b.height,
      height = _d === void 0 ? 0 : _d;
    var dx = offset[0];
    var dy = offset[1];
    onResize && onResize({
      width: Math.max(Math.floor((width + dx) / zoom), 0),
      height: Math.max(Math.floor((height + dy) / zoom), 0)
    });
  };
  var resizeStopHandler = function resizeStopHandler(axis) {
    onResizeStop && onResizeStop();
  };
  var resizerTypes = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (axis === "x" || axis === "y") return [axis];
    if (axis === "both") return ["x", "y"];
    return [];
  }, [axis]);
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children, __assign(__assign({}, rest), {
    className: "".concat(rest.className, " ").concat((_index_less__WEBPACK_IMPORTED_MODULE_1___default().resizable))
  }), __spreadArray(__spreadArray([], react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(targetChildren), true), resizerTypes.map(function (type) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResizeBar, {
      key: "resizer-".concat(type),
      axis: type,
      onMouseDown: function onMouseDown(e) {
        return resizeStartHandler(e, axis);
      },
      onMouseMove: function onMouseMove(offset) {
        return resizeHandler(axis, offset);
      },
      onMouseUp: function onMouseUp() {
        return resizeStopHandler(axis);
      },
      className: className
    });
  }), true));
};
var ResizeBar = function ResizeBar(_a) {
  var _b = _a.axis,
    axis = _b === void 0 ? "x" : _b,
    onMouseDown = _a.onMouseDown,
    onMouseMove = _a.onMouseMove,
    onMouseUp = _a.onMouseUp,
    className = _a.className;
  var resizerBarRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var startPosition = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([0, 0]);
  var mouseDownHandler = function mouseDownHandler(e) {
    startPosition.current = [e.clientX, e.clientY];
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    onMouseDown && onMouseDown(e);
    e.stopPropagation();
  };
  var mouseMoveHandler = function mouseMoveHandler(e) {
    var dx = e.clientX - startPosition.current[0];
    var dy = e.clientY - startPosition.current[1];
    onMouseMove && onMouseMove([dx, dy]);
  };
  var mouseUpHandler = function mouseUpHandler() {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    onMouseUp && onMouseUp();
  };
  var mouseOverHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var _a;
    if (resizerBarRef.current) {
      var hoverEvent = new CustomEvent("hover", {
        detail: {
          axis: axis
        }
      });
      (_a = resizerBarRef.current.parentNode) === null || _a === void 0 ? void 0 : _a.dispatchEvent(hoverEvent);
    }
  }, [axis, resizerBarRef.current]);
  var mouseLeaveHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var _a;
    if (resizerBarRef.current) {
      var leaveEvent = new CustomEvent("leave", {
        detail: {
          axis: axis
        }
      });
      (_a = resizerBarRef.current.parentNode) === null || _a === void 0 ? void 0 : _a.dispatchEvent(leaveEvent);
    }
  }, [axis, resizerBarRef.current]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: resizerBarRef,
    className: "".concat(axis === "x" ? (_index_less__WEBPACK_IMPORTED_MODULE_1___default()["resizer-r"]) : (_index_less__WEBPACK_IMPORTED_MODULE_1___default()["resizer-b"]), " ").concat(className !== null && className !== void 0 ? className : ""),
    onMouseDown: mouseDownHandler,
    onMouseOver: mouseOverHandler,
    onMouseLeave: mouseLeaveHandler
  });
};
/* harmony default export */ __webpack_exports__["default"] = (Resizable);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/constant.ts":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/constant.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_SPAN: function() { return /* binding */ MAX_SPAN; },
/* harmony export */   getPercentBySpan: function() { return /* binding */ getPercentBySpan; }
/* harmony export */ });
var MAX_SPAN = 24;
var getPercentBySpan = function getPercentBySpan(span) {
  if (span === void 0) {
    span = 12;
  }
  return "".concat(100 / MAX_SPAN * span, "%");
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/colEdit.ts":
/*!***********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/colEdit.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/index.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constant */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/constant.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};



/* harmony default export */ __webpack_exports__["default"] = ({
  "[data-layout-col-key]": {
    title: "列",
    items: function items(props) {
      var cate = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        cate[_i - 1] = arguments[_i];
      }
      if (!props.focusArea) return;
      var col = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).col;
      cate[0].title = "配置";
      cate[0].items = [{
        title: "宽度填充",
        type: "Select",
        options: [{
          value: _types__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Span,
          label: "24栅格"
        }, {
          value: _types__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Auto,
          label: "自动填充"
        }, {
          value: _types__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Px,
          label: "固定宽度"
        }],
        value: {
          get: function get(props) {
            var _a;
            return (_a = col.widthMode) !== null && _a !== void 0 ? _a : _types__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Auto;
          },
          set: function set(props, value) {
            col.widthMode = value;
          }
        }
      }, {
        title: '宽度(共24格)',
        type: 'Slider',
        options: [{
          max: _constant__WEBPACK_IMPORTED_MODULE_2__.MAX_SPAN,
          min: 1,
          steps: 1,
          formatter: "/".concat(_constant__WEBPACK_IMPORTED_MODULE_2__.MAX_SPAN)
        }],
        ifVisible: function ifVisible(props) {
          return (col === null || col === void 0 ? void 0 : col.widthMode) === _types__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Span;
        },
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return col === null || col === void 0 ? void 0 : col.span;
          },
          set: function set(_a, value) {
            var data = _a.data,
              slot = _a.slot,
              focusArea = _a.focusArea;
            col.span = value;
          }
        }
      }, {
        title: '指定宽度(px)',
        type: 'Text',
        options: {
          type: 'Number'
        },
        ifVisible: function ifVisible(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return (col === null || col === void 0 ? void 0 : col.widthMode) === _types__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Px;
        },
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return col === null || col === void 0 ? void 0 : col.width;
          },
          set: function set(_a, value) {
            var data = _a.data,
              slot = _a.slot,
              focusArea = _a.focusArea;
            col.width = parseFloat(value);
          }
        }
      }, {
        title: "内容布局",
        type: "layout",
        value: {
          get: function get(props) {
            var col = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).col;
            var _a = col.slotStyle,
              slotStyle = _a === void 0 ? {} : _a;
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setSlotLayout)(__assign({
              slotStyle: slotStyle
            }, props));
            return slotStyle;
          },
          set: function set(props, val) {
            var _a;
            var col = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).col;
            col.slotStyle = __assign(__assign({}, (_a = col === null || col === void 0 ? void 0 : col.slotStyle) !== null && _a !== void 0 ? _a : {}), val);
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setSlotLayout)(__assign({
              slotStyle: val
            }, props));
          }
        }
      }, {
        title: "操作",
        items: [{
          title: "前面添加列",
          type: "Button",
          value: {
            set: function set(props) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCol)(props, "BEFORE");
            }
          }
        }, {
          title: "后面添加列",
          type: "Button",
          value: {
            set: function set(props) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCol)(props, "AFTER");
            }
          }
        }, {
          title: "前移",
          type: "Button",
          ifVisible: function ifVisible(props) {
            var index = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).index;
            return index !== undefined && index > 0;
          },
          value: {
            set: function set(props) {
              var _a;
              var _b = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
                row = _b.row,
                index = _b.index;
              if (index < 1) return;
              _a = [row.cols[index], row.cols[index - 1]], row.cols[index - 1] = _a[0], row.cols[index] = _a[1];
            }
          }
        }, {
          title: "后移",
          type: "Button",
          ifVisible: function ifVisible(props) {
            var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
              row = _a.row,
              index = _a.index;
            return index !== undefined && index < row.cols.length - 1;
          },
          value: {
            set: function set(props) {
              var _a;
              var _b = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
                row = _b.row,
                index = _b.index;
              if (index === row.cols.length - 1) return;
              _a = [row.cols[index + 1], row.cols[index]], row.cols[index] = _a[0], row.cols[index + 1] = _a[1];
            }
          }
        }, {
          title: "删除",
          type: "Button",
          value: {
            set: function set(props) {
              var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
                row = _a.row,
                col = _a.col,
                index = _a.index;
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.removeEffect)(__assign({
                col: col
              }, props));
              row.cols.splice(index, 1);
            }
          }
        }]
      }, {
        title: "点击",
        type: "_Event",
        options: function options(props) {
          var col = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).col;
          return {
            outputId: col === null || col === void 0 ? void 0 : col.key
          };
        }
      }];
    },
    style: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createStyleForCol)({
      target: function target(props) {
        var id = props.id,
          focusArea = props.focusArea;
        var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
          row = _a.row,
          col = _a.col;
        var key = "".concat(row.key, ",").concat(col.key);
        return ".mybricks-layout div[data-layout-col-key=\"".concat(key, "\"]").concat((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getFilterSelector)(id));
      }
    })
  }
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/index.ts":
/*!*********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/index.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/index.ts");
/* harmony import */ var _rowEdit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rowEdit */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/rowEdit.ts");
/* harmony import */ var _colEdit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colEdit */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/colEdit.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};



/* harmony default export */ __webpack_exports__["default"] = (__assign(__assign({
  ":root": {
    items: function items(_a) {
      var data = _a.data;
      var cate = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        cate[_i - 1] = arguments[_i];
      }
      cate[0].title = "配置";
      cate[0].items = [{
        title: "添加行（2列）",
        type: "Button",
        value: {
          set: function set(props) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.addRow)(props, 2);
          }
        }
      }, {
        title: "添加行（3列）",
        type: "Button",
        value: {
          set: function set(props) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.addRow)(props, 3);
          }
        }
      }];
      cate[1].title = "高级";
      cate[1].items = [{
        title: "宽度可调整",
        type: "switch",
        value: {
          get: function get(_a) {
            var data = _a.data;
            return !!data.resizable;
          },
          set: function set(_a, val) {
            var data = _a.data;
            data.resizable = val;
          }
        }
      }];
    },
    style: [(0,_utils__WEBPACK_IMPORTED_MODULE_0__.createStyleForGrid)({
      target: function target(_a) {
        var id = _a.id;
        return ".mybricks-layout".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getFilterSelector)(id));
      }
    }), (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createStyleForCol)({
      target: function target(_a) {
        var id = _a.id;
        return ".mybricks-layout .mybricks-col".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getFilterSelector)(id));
      }
    })]
  }
}, _rowEdit__WEBPACK_IMPORTED_MODULE_1__["default"]), _colEdit__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/rowEdit.ts":
/*!***********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/rowEdit.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/index.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};


/* harmony default export */ __webpack_exports__["default"] = ({
  "[data-layout-row-key]": {
    title: "行",
    items: function items(_a) {
      var data = _a.data,
        focusArea = _a.focusArea;
      var cate = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        cate[_i - 1] = arguments[_i];
      }
      if (!focusArea) return;
      cate[0].title = "配置";
      cate[0].items = [{
        title: "布局",
        type: "layout",
        options: {},
        value: {
          get: function get(props) {
            var row = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).row;
            return __assign({
              flexDirection: "row"
            }, row.style);
          },
          set: function set(props, val) {
            var _a;
            var row = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).row;
            row.style = __assign(__assign({}, (_a = row === null || row === void 0 ? void 0 : row.style) !== null && _a !== void 0 ? _a : {}), val);
          }
        }
      }, {
        title: "行操作",
        items: [{
          title: "前面添加行",
          type: "Button",
          value: {
            set: function set(props, val) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendRow)(props, 2, "BEFORE");
            }
          }
        }, {
          title: "后面添加行",
          type: "Button",
          value: {
            set: function set(props, val) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendRow)(props, 2, "AFTER");
            }
          }
        }, {
          title: "上移",
          type: "Button",
          ifVisible: function ifVisible(props) {
            var index = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).index;
            return index !== undefined && index > 0;
          },
          value: {
            set: function set(props) {
              var _a;
              var index = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).index;
              if (index < 1) return;
              _a = [data.rows[index], data.rows[index - 1]], data.rows[index - 1] = _a[0], data.rows[index] = _a[1];
            }
          }
        }, {
          title: "下移",
          type: "Button",
          ifVisible: function ifVisible(props) {
            var index = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).index;
            return index !== undefined && index < data.rows.length - 1;
          },
          value: {
            set: function set(props) {
              var _a;
              var index = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).index;
              if (index === data.rows.length - 1) return;
              _a = [data.rows[index + 1], data.rows[index]], data.rows[index] = _a[0], data.rows[index + 1] = _a[1];
            }
          }
        }, {
          title: "删除",
          type: "Button",
          value: {
            set: function set(props) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.removeRow)(props);
            }
          }
        }]
      }, {
        title: "列操作",
        items: [{
          title: "添加列",
          type: "Button",
          value: {
            set: function set(props) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addCol)(props);
            }
          }
        }, {
          title: "列等分",
          type: "Button",
          value: {
            set: function set(props) {
              var row = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).row;
              row === null || row === void 0 ? void 0 : row.cols.forEach(function (col) {
                col.width = "auto";
              });
            }
          }
        }]
      }];
    },
    style: [(0,_utils__WEBPACK_IMPORTED_MODULE_1__.createStyleForRow)({
      target: function target(_a) {
        var id = _a.id,
          focusArea = _a.focusArea;
        var index = focusArea.index;
        return ".mybricks-layout > .mybricks-row:nth-child(".concat(index + 1, ")").concat((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getFilterSelector)(id));
      }
    }), {
      title: "高度填充",
      type: "Select",
      options: [{
        value: _types__WEBPACK_IMPORTED_MODULE_0__.HeightUnitEnum.Auto,
        label: "自动填充"
      }, {
        value: _types__WEBPACK_IMPORTED_MODULE_0__.HeightUnitEnum.Px,
        label: "固定高度"
      }, {
        value: _types__WEBPACK_IMPORTED_MODULE_0__.HeightUnitEnum.Percent,
        label: "百分比"
      }],
      value: {
        get: function get(props) {
          var _a;
          var row = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).row;
          return (_a = row.heightMode) !== null && _a !== void 0 ? _a : _types__WEBPACK_IMPORTED_MODULE_0__.HeightUnitEnum.Auto;
        },
        set: function set(props, value) {
          var row = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).row;
          row.heightMode = value;
        }
      }
    }, {
      title: "指定高度",
      type: "Text",
      options: {
        type: "Number"
      },
      ifVisible: function ifVisible(props) {
        var row = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).row;
        return [_types__WEBPACK_IMPORTED_MODULE_0__.HeightUnitEnum.Px, _types__WEBPACK_IMPORTED_MODULE_0__.HeightUnitEnum.Percent].includes(row === null || row === void 0 ? void 0 : row.heightMode);
      },
      value: {
        get: function get(props) {
          var row = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).row;
          return row.height;
        },
        set: function set(props, val) {
          var row = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRow)(props).row;
          row.height = parseFloat(val);
        }
      }
    }]
  }
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/runtime.tsx":
/*!************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/runtime.tsx ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/index.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constant */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/constant.ts");
/* harmony import */ var _edit_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/edit.less");
/* harmony import */ var _edit_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_edit_less__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../runtime.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_5__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};






/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var data = props.data,
    style = props.style;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "".concat((_runtime_less__WEBPACK_IMPORTED_MODULE_5___default().layout), " mybricks-layout"),
    style: style
  }, data.rows.map(function (row) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Row, __assign({
      key: row.key,
      row: row
    }, props), row.cols.map(function (col) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Col, __assign({
        key: col.key,
        row: row,
        col: col
      }, props));
    }));
  }));
});
var Row = function Row(_a) {
  var row = _a.row,
    children = _a.children,
    props = __rest(_a, ["row", "children"]);
  var env = props.env,
    data = props.data;
  var dragHeight = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    var currentHeight, editFinish;
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.dragable)(e, function (_a, state) {
      var _b, _c;
      var dpo = _a.dpo;
      if (state === "start") {
        var rowEle = e.target.parentNode;
        currentHeight = rowEle.offsetHeight;
        editFinish = env.edit.focusPaasive();
        row.isDragging = true;
      }
      if (state === "ing") {
        row.height = currentHeight += dpo.dy / ((_c = (_b = env === null || env === void 0 ? void 0 : env.canvas) === null || _b === void 0 ? void 0 : _b.zoom) !== null && _c !== void 0 ? _c : 1);
        row.heightMode = _types__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Px;
      }
      if (state === "finish") {
        if (editFinish) {
          editFinish();
        }
        row.isDragging = false;
      }
    });
    e.stopPropagation();
  }, []);
  var style = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _a;
    var style = __assign({}, (_a = row.style) !== null && _a !== void 0 ? _a : {});
    if (row.heightMode === _types__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Px) {
      style.height = typeof row.height === 'number' ? row.height + "px" : row.height;
    }
    if (row.heightMode === _types__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Percent) {
      style.height = typeof row.height === 'number' ? row.height + "%" : row.height;
    }
    return style;
  }, [JSON.stringify(row.style), row.heightMode, row.height]);
  var hasDragTarget = data.rows.some(function (_row) {
    return _row.isDragging;
  });
  var isDragTarget = row.isDragging;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "".concat((_runtime_less__WEBPACK_IMPORTED_MODULE_5___default().row), " mybricks-row"),
    style: style,
    "data-layout-row-key": row.key
  }, children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_edit_less__WEBPACK_IMPORTED_MODULE_4___default().resizeH),
    onMouseDown: function onMouseDown(e) {
      return dragHeight(e);
    }
  }), hasDragTarget && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: isDragTarget ? (_edit_less__WEBPACK_IMPORTED_MODULE_4___default().draggingTipH) : "".concat((_edit_less__WEBPACK_IMPORTED_MODULE_4___default().draggingTipH), " ").concat((_edit_less__WEBPACK_IMPORTED_MODULE_4___default().dashed))
  }, row.height));
};
var Col = function Col(_a) {
  var _b;
  var row = _a.row,
    col = _a.col,
    slots = _a.slots,
    outputs = _a.outputs,
    env = _a.env;
  var key = col.key,
    slotStyle = col.slotStyle;
  var dragWidth = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    var currentWidth, editFinish;
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.dragable)(e, function (_a, state) {
      var _b, _c;
      var dpo = _a.dpo;
      if (state === "start") {
        var colEle = e.target.parentNode;
        currentWidth = colEle.offsetWidth;
        editFinish = env.edit.focusPaasive();
        col.isDragging = true;
      }
      if (state === "ing") {
        col.width = currentWidth += dpo.dx / ((_c = (_b = env === null || env === void 0 ? void 0 : env.canvas) === null || _b === void 0 ? void 0 : _b.zoom) !== null && _c !== void 0 ? _c : 1);
        col.widthMode = _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Px;
      }
      if (state === "finish") {
        if (editFinish) {
          editFinish();
        }
        col.isDragging = false;
      }
    });
    e.stopPropagation();
  }, []);
  var style = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _a;
    var style = __assign({}, (_a = col.style) !== null && _a !== void 0 ? _a : {});
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto) {
      style.flex = 1;
    }
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Px) {
      style.width = typeof col.width === 'number' ? col.width + 'px' : col.width;
    }
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Span) {
      var percent = (0,_constant__WEBPACK_IMPORTED_MODULE_3__.getPercentBySpan)(col.span);
      style.flex = "0 0 ".concat(percent);
      style.maxWidth = percent;
    }
    /**
     * 栅格化实现
     */
    // if (
    //   row.style &&
    //   "columnGap" in row.style &&
    //   (row.style.columnGap as number) > 0
    // ) {
    //   style.paddingLeft = `${(row.style.columnGap as number) / 2}px`;
    //   style.paddingRight = `${(row.style.columnGap as number) / 2}px`;
    // }
    return style;
  }, [JSON.stringify(col.style), col.width, col.widthMode, col.span, JSON.stringify(row.style)]);
  var dragText = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto) {
      return col.widthMode;
    }
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Px) {
      return col.width;
    }
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Span) {
      return "".concat(col.span, "\u6805\u683C");
    }
  }, [col.widthMode, col.width, col.span]);
  var hasDragTarget = row.cols.some(function (_col) {
    return _col.isDragging;
  });
  var isDragTarget = col.isDragging;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "".concat((_runtime_less__WEBPACK_IMPORTED_MODULE_5___default().col), " mybricks-col"),
    style: style,
    "data-layout-col-key": "".concat(row.key, ",").concat(key)
  }, (_b = slots[key]) === null || _b === void 0 ? void 0 : _b.render({
    style: slotStyle
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_edit_less__WEBPACK_IMPORTED_MODULE_4___default().resizeW),
    onMouseDown: function onMouseDown(e) {
      return dragWidth(e);
    }
  }), hasDragTarget && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: isDragTarget ? (_edit_less__WEBPACK_IMPORTED_MODULE_4___default().draggingTipW) : "".concat((_edit_less__WEBPACK_IMPORTED_MODULE_4___default().draggingTipW), " ").concat((_edit_less__WEBPACK_IMPORTED_MODULE_4___default().dashed))
  }, dragText));
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/change.ts":
/*!****************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/change.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCol: function() { return /* binding */ addCol; },
/* harmony export */   addEffect: function() { return /* binding */ addEffect; },
/* harmony export */   addRow: function() { return /* binding */ addRow; },
/* harmony export */   appendCol: function() { return /* binding */ appendCol; },
/* harmony export */   appendRow: function() { return /* binding */ appendRow; },
/* harmony export */   createCol: function() { return /* binding */ createCol; },
/* harmony export */   createRow: function() { return /* binding */ createRow; },
/* harmony export */   removeEffect: function() { return /* binding */ removeEffect; },
/* harmony export */   removeRow: function() { return /* binding */ removeRow; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/index.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/common.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};



var createRow = function createRow(_a) {
  var colCount = _a.colCount,
    props = __rest(_a, ["colCount"]);
  var key = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.uuid)();
  var cols = Array.from({
    length: colCount
  }, function () {
    return createCol(props);
  });
  return {
    key: key,
    height: "auto",
    heightMode: _types__WEBPACK_IMPORTED_MODULE_0__.HeightUnitEnum.Px,
    style: {
      flexDirection: "row",
      display: "flex",
      flexWrap: "wrap",
      position: "relative",
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    cols: cols
  };
};
var createCol = function createCol(props) {
  var key = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.uuid)();
  addEffect(__assign({
    key: key
  }, props));
  return {
    key: key,
    width: 300,
    widthMode: _types__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Auto,
    span: 12,
    slotStyle: {
      display: "flex",
      position: "inherit",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexWrap: "nowrap"
    }
  };
};
var addRow = function addRow(props, colCount) {
  if (colCount === void 0) {
    colCount = 2;
  }
  var data = props.data;
  var row = createRow(__assign({
    colCount: colCount
  }, props));
  data.rows.push(row);
};
var addCol = function addCol(props) {
  var col = createCol(props);
  var row = (0,_common__WEBPACK_IMPORTED_MODULE_2__.getRow)(props).row;
  row === null || row === void 0 ? void 0 : row.cols.push(col);
};
var appendRow = function appendRow(props, colCount, position) {
  if (colCount === void 0) {
    colCount = 2;
  }
  if (position === void 0) {
    position = "AFTER";
  }
  var data = props.data;
  var index = (0,_common__WEBPACK_IMPORTED_MODULE_2__.getRow)(props).index;
  var row = createRow(__assign({
    colCount: colCount
  }, props));
  if (position === "BEFORE") {
    data.rows.splice(index, 0, row);
  } else if (position === "AFTER") {
    data.rows.splice(index + 1, 0, row);
  }
};
var appendCol = function appendCol(props, position) {
  if (position === void 0) {
    position = "AFTER";
  }
  var _a = (0,_common__WEBPACK_IMPORTED_MODULE_2__.getCol)(props),
    row = _a.row,
    index = _a.index;
  var col = createCol(props);
  if (position === "BEFORE") {
    row.cols.splice(index, 0, col);
  } else if (position === "AFTER") {
    row.cols.splice(index + 1, 0, col);
  }
};
var removeRow = function removeRow(props) {
  var data = props.data;
  var _a = (0,_common__WEBPACK_IMPORTED_MODULE_2__.getRow)(props),
    row = _a.row,
    index = _a.index;
  row === null || row === void 0 ? void 0 : row.cols.forEach(function (col) {
    return removeEffect(__assign({
      col: col
    }, props));
  });
  data.rows.splice(index, 1);
};
var addEffect = function addEffect(_a) {
  var key = _a.key,
    slots = _a.slots,
    output = _a.output;
  slots.add({
    id: key,
    title: "列（竖向排列）"
  });
  output.add(key, "列点击", {
    type: "any"
  });
};
var removeEffect = function removeEffect(_a) {
  var col = _a.col,
    slot = _a.slot,
    output = _a.output;
  slot.remove(col.key);
  output.remove(col.key);
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/common.ts":
/*!****************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/common.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCol: function() { return /* binding */ getCol; },
/* harmony export */   getFilterSelector: function() { return /* binding */ getFilterSelector; },
/* harmony export */   getRow: function() { return /* binding */ getRow; },
/* harmony export */   setSlotLayout: function() { return /* binding */ setSlotLayout; }
/* harmony export */ });
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var getRow = function getRow(_a) {
  var data = _a.data,
    focusArea = _a.focusArea;
  var layoutRowKey = focusArea.dataset.layoutRowKey;
  var row = data.rows.find(function (row) {
    return row.key === layoutRowKey;
  });
  var index = data.rows.findIndex(function (row) {
    return row.key === layoutRowKey;
  });
  return {
    row: row,
    index: index
  };
};
var getCol = function getCol(_a) {
  var data = _a.data,
    focusArea = _a.focusArea;
  var key = focusArea.dataset.layoutColKey;
  var _b = key.split(","),
    rowKey = _b[0],
    colKey = _b[1];
  var row = data.rows.find(function (row) {
    return row.key === rowKey;
  });
  var col = row === null || row === void 0 ? void 0 : row.cols.find(function (col) {
    return col.key === colKey;
  });
  var index = row === null || row === void 0 ? void 0 : row.cols.findIndex(function (col) {
    return col.key === colKey;
  });
  return {
    row: row,
    col: col,
    index: index
  };
};
var setSlotLayout = function setSlotLayout(_a) {
  var slotStyle = _a.slotStyle,
    props = __rest(_a, ["slotStyle"]);
  var col = getCol(props).col;
  var slotInstance = props.slot.get(col === null || col === void 0 ? void 0 : col.key);
  if (slotStyle.position === "absolute") {
    slotInstance.setLayout(slotStyle.position);
  } else if (slotStyle.display === "flex") {
    if (slotStyle.flexDirection === "row") {
      slotInstance.setLayout("flex-row");
    } else if (slotStyle.flexDirection === "column") {
      slotInstance.setLayout("flex-column");
    }
  }
};
var getFilterSelector = function getFilterSelector(id) {
  return ":not(#".concat(id, " *[data-isslot=\"1\"] *)");
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/index.ts":
/*!***************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/index.ts ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCol: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.addCol; },
/* harmony export */   addEffect: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.addEffect; },
/* harmony export */   addRow: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.addRow; },
/* harmony export */   appendCol: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.appendCol; },
/* harmony export */   appendRow: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.appendRow; },
/* harmony export */   createCol: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.createCol; },
/* harmony export */   createRow: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.createRow; },
/* harmony export */   createStyleForCol: function() { return /* reexport safe */ _style__WEBPACK_IMPORTED_MODULE_2__.createStyleForCol; },
/* harmony export */   createStyleForGrid: function() { return /* reexport safe */ _style__WEBPACK_IMPORTED_MODULE_2__.createStyleForGrid; },
/* harmony export */   createStyleForRow: function() { return /* reexport safe */ _style__WEBPACK_IMPORTED_MODULE_2__.createStyleForRow; },
/* harmony export */   getCol: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.getCol; },
/* harmony export */   getFilterSelector: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.getFilterSelector; },
/* harmony export */   getRow: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.getRow; },
/* harmony export */   removeEffect: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.removeEffect; },
/* harmony export */   removeRow: function() { return /* reexport safe */ _change__WEBPACK_IMPORTED_MODULE_1__.removeRow; },
/* harmony export */   setSlotLayout: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.setSlotLayout; }
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/common.ts");
/* harmony import */ var _change__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./change */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/change.ts");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/style.ts");




/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/style.ts":
/*!***************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/utils/style.ts ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStyleForCol: function() { return /* binding */ createStyleForCol; },
/* harmony export */   createStyleForGrid: function() { return /* binding */ createStyleForGrid; },
/* harmony export */   createStyleForRow: function() { return /* binding */ createStyleForRow; }
/* harmony export */ });
var createStyleForGrid = function createStyleForGrid(_a) {
  var _b = _a === void 0 ? {} : _a,
    target = _b.target;
  return {
    title: "容器",
    options: ["background", "border", "padding"],
    target: target
  };
};
var createStyleForRow = function createStyleForRow(_a) {
  var _b = _a === void 0 ? {} : _a,
    target = _b.target;
  return {
    title: "行",
    options: ["background"],
    target: target
  };
};
var createStyleForCol = function createStyleForCol(_a) {
  var target = _a.target;
  return {
    title: "单元格",
    options: ["background", "border", "padding", {
      type: "size",
      config: {
        disableWidth: true
      }
    }, "overflow"],
    target: target
  };
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.tsx":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.tsx ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/types.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constant */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/constant.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/index.ts");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_4__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};





/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var data = props.data,
    style = props.style,
    inputs = props.inputs,
    onError = props.onError,
    logger = props.logger;
  inputs.setWidth(function (val) {
    var coordinate = val.coordinate,
      width = val.width;
    var errorMsg = "找不到布局列，检查参数设置";
    try {
      var col = data.rows[coordinate[0] - 1].cols[coordinate[1] - 1];
      if (!col) throw Error(errorMsg);
      if (width === "auto") {
        col.widthMode = _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto;
      } else {
        col.widthMode = _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Px;
      }
      col.width = width;
    } catch (error) {
      logger.error(errorMsg);
      onError === null || onError === void 0 ? void 0 : onError(errorMsg);
    }
  });
  var onResize = function onResize(row, col) {
    var index = row.cols.findIndex(function (_a) {
      var key = _a.key;
      return key === col.key;
    });
    row.cols[index] = __assign({}, col);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "".concat((_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().layout), " mybricks-layout"),
    style: style
  }, data.rows.map(function (row) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Row, __assign({
      key: row.key,
      row: row
    }, props), row.cols.map(function (col) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Col, __assign({
        key: col.key,
        row: row,
        onResize: onResize,
        col: col
      }, props));
    }));
  }));
});
var Row = function Row(_a) {
  var row = _a.row,
    children = _a.children;
  var style = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _a;
    var style = __assign({}, (_a = row.style) !== null && _a !== void 0 ? _a : {});
    if (row.heightMode === _types__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Px) {
      style.height = typeof row.height === "number" ? row.height + "px" : row.height;
    }
    if (row.heightMode === _types__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Percent) {
      style.height = typeof row.height === "number" ? row.height + "%" : row.height;
    }
    return style;
  }, [JSON.stringify(row.style), row.heightMode, row.height]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "".concat((_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().row), " mybricks-row"),
    style: style,
    "data-layout-row-key": row.key
  }, children);
};
var Col = function Col(_a) {
  var row = _a.row,
    col = _a.col,
    slots = _a.slots,
    data = _a.data,
    outputs = _a.outputs,
    onResize = _a.onResize;
  var key = col.key,
    slotStyle = col.slotStyle;
  var dragWidth = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    var currentWidth;
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.dragable)(e, function (_a, state) {
      var dpo = _a.dpo;
      if (state === "start") {
        var colEle = e.target.parentNode;
        currentWidth = colEle.offsetWidth;
        col.isDragging = true;
      }
      if (state === "ing") {
        col.width = currentWidth += dpo.dx;
        col.widthMode = _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Px;
        typeof onResize === 'function' && onResize(row, __assign({}, col));
      }
      if (state === "finish") {
        col.isDragging = false;
      }
    });
    e.stopPropagation();
  }, []);
  var style = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _a;
    var style = __assign({}, (_a = col.style) !== null && _a !== void 0 ? _a : {});
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto) {
      style.flex = 1;
    }
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Px) {
      style.width = typeof col.width === "number" ? col.width + "px" : col.width;
    }
    if (col.widthMode === _types__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Span) {
      var percent = (0,_constant__WEBPACK_IMPORTED_MODULE_2__.getPercentBySpan)(col.span);
      style.flex = "0 0 ".concat(percent);
      style.maxWidth = percent;
    }
    /**
     * 栅格化实现
     */
    // if (
    //   row.style &&
    //   "columnGap" in row.style &&
    //   (row.style.columnGap as number) > 0
    // ) {
    //   style.paddingLeft = `${(row.style.columnGap as number) / 2}px`;
    //   style.paddingRight = `${(row.style.columnGap as number) / 2}px`;
    // }
    return style;
  }, [JSON.stringify(col.style), col.width, col.widthMode, col.span, JSON.stringify(row.style)]);
  var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
      if (data.resizable) {
        var jsx = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().resizer),
          onMouseDown: function onMouseDown(e) {
            return dragWidth(e);
          }
        });
        var className = (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().resizable);
        return [jsx, className];
      }
      return [];
    }, [data.resizable]),
    resizer = _b[0],
    resizableClass = _b[1];
  var handlerClick = function handlerClick(e) {
    !!key && outputs[key]();
    e.stopPropagation();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "".concat((_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().col), " mybricks-col ").concat(resizableClass),
    style: style,
    "data-layout-col-key": "".concat(row.key, ",").concat(key),
    onClick: handlerClick
  }, slots[key].render({
    style: slotStyle
  }), resizer);
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/types.ts":
/*!****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/types.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeightUnitEnum: function() { return /* binding */ HeightUnitEnum; },
/* harmony export */   WidthUnitEnum: function() { return /* binding */ WidthUnitEnum; }
/* harmony export */ });
var WidthUnitEnum;
(function (WidthUnitEnum) {
  WidthUnitEnum["Px"] = "px";
  WidthUnitEnum["Auto"] = "auto";
  WidthUnitEnum["Media"] = "@media";
  WidthUnitEnum["Span"] = "%";
})(WidthUnitEnum || (WidthUnitEnum = {}));
var HeightUnitEnum;
(function (HeightUnitEnum) {
  HeightUnitEnum["Px"] = "px";
  HeightUnitEnum["Auto"] = "auto";
  HeightUnitEnum["Percent"] = "%";
})(HeightUnitEnum || (HeightUnitEnum = {}));

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/constants.ts":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/constants.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlignEnum: function() { return /* binding */ AlignEnum; },
/* harmony export */   DefaultEvent: function() { return /* binding */ DefaultEvent; },
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   Location: function() { return /* binding */ Location; }
/* harmony export */ });
/**
 * Data
 * @param title      标题
 * @param hideTitle  隐藏标题
 * @param width      抽屉宽度
 * @param height     抽屉高度
 * @param placement  弹出位置
 * @param useFooter  是否使用工具条
 * @param footerLayout 工具条布局
 * @param footerBtns 操作项
 * @param closable   是否显示右上角关闭按钮
 * @param maskClosable 点击蒙层关闭
 * @param keyboard 键盘 esc 关闭
 */
var Location;
(function (Location) {
  Location["FRONT"] = "front";
  Location["BACK"] = "back";
})(Location || (Location = {}));
var DefaultEvent = ['ok', 'cancel'];
var AlignEnum;
(function (AlignEnum) {
  AlignEnum["Unset"] = "unset";
  AlignEnum["FlexStart"] = "flex-start";
  AlignEnum["Center"] = "center";
  AlignEnum["FlexEnd"] = "flex-end";
})(AlignEnum || (AlignEnum = {}));
var InputIds = {
  SetDisable: 'setDisable',
  SetEnable: 'setEnable',
  SetHidden: 'setHidden',
  SetShow: 'setShow'
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/editors.ts":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/editors.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/utils.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/constants.ts");



function findConfig(_a, propKey) {
  var data = _a.data,
    focusArea = _a.focusArea;
  if (!focusArea) return;
  var id = focusArea.dataset['handlerButton'];
  var index = data.footerBtns.findIndex(function (item) {
    return item.id === id;
  });
  if (index === -1) return;
  if (typeof propKey === 'string') {
    return data.footerBtns[index][propKey];
  }
  return data.footerBtns[index];
}
//新增按钮操作
var btnsLength, addBtn;
var initParams = function initParams(data, output) {
  btnsLength = (data.footerBtns || []).length;
  addBtn = function addBtn(btn) {
    data.footerBtns.unshift(btn);
    output.add(btn.id, "\u70B9\u51FB".concat(btn.title), {
      type: 'any'
    });
  };
};
//图标编辑
function icon(dataset) {
  return {
    title: '图标',
    items: [{
      title: '使用图标',
      type: 'Switch',
      value: {
        get: function get(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return findConfig({
            data: data,
            focusArea: focusArea
          }).useIcon;
        },
        set: function set(_a, value) {
          var data = _a.data,
            focusArea = _a.focusArea;
          var res = findConfig({
            data: data,
            focusArea: focusArea
          }, 'icon');
          if (!(res === null || res === void 0 ? void 0 : res.length)) {
            findConfig({
              data: data,
              focusArea: focusArea
            }).icon = 'HomeOutlined';
          }
          findConfig({
            data: data,
            focusArea: focusArea
          }).useIcon = value;
        }
      }
    }, {
      title: '显示文字',
      type: 'Switch',
      ifVisible: function ifVisible(_a) {
        var data = _a.data,
          focusArea = _a.focusArea;
        var useIcon = findConfig({
          data: data,
          focusArea: focusArea
        }, 'useIcon');
        return useIcon ? true : false;
      },
      value: {
        get: function get(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return findConfig({
            data: data,
            focusArea: focusArea
          }, 'showText');
        },
        set: function set(_a, value) {
          var data = _a.data,
            focusArea = _a.focusArea;
          findConfig({
            data: data,
            focusArea: focusArea
          }).showText = value;
        }
      }
    }, {
      title: '图标位置',
      type: 'Select',
      options: [{
        label: '位于文字前',
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.Location.FRONT
      }, {
        label: '位于文字后',
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK
      }],
      ifVisible: function ifVisible(_a) {
        var data = _a.data,
          focusArea = _a.focusArea;
        var useIcon = findConfig({
          data: data,
          focusArea: focusArea
        }, 'useIcon');
        return useIcon ? true : false;
      },
      value: {
        get: function get(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return findConfig({
            data: data,
            focusArea: focusArea
          }, 'location') || _constants__WEBPACK_IMPORTED_MODULE_1__.Location.FRONT;
        },
        set: function set(_a, value) {
          var data = _a.data,
            focusArea = _a.focusArea;
          findConfig({
            data: data,
            focusArea: focusArea
          }).location = value;
        }
      }
    }, {
      type: 'Icon',
      ifVisible: function ifVisible(_a) {
        var data = _a.data,
          focusArea = _a.focusArea;
        return findConfig({
          data: data,
          focusArea: focusArea
        }, 'useIcon');
      },
      value: {
        get: function get(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return findConfig({
            data: data,
            focusArea: focusArea
          }, 'icon');
        },
        set: function set(_a, value) {
          var data = _a.data,
            focusArea = _a.focusArea;
          findConfig({
            data: data,
            focusArea: focusArea
          }).icon = value;
        }
      }
    }]
  };
}
/* harmony default export */ __webpack_exports__["default"] = ({
  '@init': function init(_a) {
    var style = _a.style;
    style.width = '100%';
    style.height = '100%';
  },
  ':root': {
    style: [{
      title: '位置',
      type: 'Select',
      description: '抽屉在屏幕展开的位置',
      options: function options() {
        return [{
          label: '上',
          value: 'top'
        }, {
          label: '下',
          value: 'bottom'
        }, {
          label: '左',
          value: 'left'
        }, {
          label: '右',
          value: 'right'
        }];
      },
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.placement;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.placement = value;
        }
      }
    }, {
      title: '宽度',
      description: '调试态和发布态,在placement为 top 或 bottom 时生效，其余方向时不生效；编辑态，这里的高度高度仅方便搭建。设置0将使用默认宽度：520',
      type: 'Slider',
      options: {
        max: 5000,
        min: 0,
        step: 100,
        formatter: 'px'
      },
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.width;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.width = value;
        }
      }
    }, {
      title: '抽屉高度',
      description: '调试态和发布态,在placement为 top 或 bottom 时生效，其余方向时不生效；编辑态，这里的高度高度仅方便搭建。设置0将使用默认高度：800',
      type: 'Slider',
      options: {
        max: 5000,
        min: 0,
        step: 100,
        formatter: 'px'
      },
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.height;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.height = value;
        }
      }
    }, {
      title: '内容',
      options: [{
        type: 'background',
        config: {
          disableBackgroundImage: true
        }
      }],
      global: true,
      target: '.{id} .ant-drawer-body'
    }],
    items: function items(_a, cate1, cate2) {
      cate1.title = '常规';
      cate1.items = [{
        title: '标题',
        type: 'Text',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.title;
          },
          set: function set(_a, value) {
            var data = _a.data;
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyString)(value)) {
              data.title = value;
            }
          }
        }
      }, {
        title: '隐藏标题',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.hideTitle;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.hideTitle = value;
          }
        }
      }, {
        title: '关闭按钮',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.closable;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.closable = value;
          }
        }
      }, {
        title: '点击蒙层关闭',
        type: 'switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return !!data.maskClosable;
          },
          set: function set(_a, val) {
            var data = _a.data;
            data.maskClosable = val;
          }
        }
      }, {
        title: '键盘esc关闭',
        type: 'switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return !!data.keyboard;
          },
          set: function set(_a, val) {
            var data = _a.data;
            data.keyboard = val;
          }
        }
      }];
      cate2.title = '操作区';
      cate2.items = [{
        title: '显示',
        type: 'switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.useFooter;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.useFooter = value;
          }
        }
      }, {
        title: '对齐方式',
        type: 'Radio',
        options: [{
          value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexStart,
          label: '居左'
        }, {
          value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.Center,
          label: '居中'
        }, {
          value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexEnd,
          label: '居右'
        }],
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.footerLayout;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.footerLayout = value;
          }
        }
      }, {
        title: '操作列表',
        description: '选中拖拽各项左侧手柄，可改变按钮的相对位置',
        type: 'array',
        options: {
          addText: '添加操作',
          deletable: false,
          editable: false,
          customOptRender: _utils__WEBPACK_IMPORTED_MODULE_0__["default"],
          getTitle: function getTitle(item) {
            return item === null || item === void 0 ? void 0 : item.title;
          },
          onAdd: function onAdd() {
            var defaultBtn = {
              title: "\u64CD\u4F5C\u9879".concat(btnsLength + 1),
              id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)(),
              icon: "",
              useIcon: false,
              showText: true,
              dynamicHidden: true,
              dynamicDisabled: true,
              type: "default",
              visible: true,
              autoClose: true,
              isConnected: false,
              disabled: false,
              useDynamicDisabled: false,
              useDynamicHidden: false
            };
            addBtn(defaultBtn);
            return defaultBtn;
          }
        },
        value: {
          get: function get(_a) {
            var data = _a.data,
              output = _a.output;
            initParams(data, output);
            return data.footerBtns || [];
          },
          set: function set(_a, val) {
            var data = _a.data;
            data.footerBtns = val;
          }
        }
      }];
    }
  },
  '.ant-drawer-title': {
    title: '标题',
    items: [{
      title: '内容',
      type: 'text',
      ifVisible: function ifVisible(_a) {
        var data = _a.data;
        return !data.isTitleCustom;
      },
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.title;
        },
        set: function set(_a, title) {
          var data = _a.data;
          data.title = title;
        }
      }
    }, {
      title: '自定义',
      type: 'switch',
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.isTitleCustom;
        },
        set: function set(_a, value) {
          var data = _a.data,
            slot = _a.slot;
          data.isTitleCustom = value;
          if (data.isTitleCustom === true) {
            slot.add('title', '标题');
          } else {
            slot.remove('title', '标题');
          }
        }
      }
    }]
  },
  '.ant-drawer-close': {
    title: '关闭按钮',
    items: [{
      title: '显示',
      type: 'Switch',
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.closable;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.closable = value;
        }
      }
    }]
  },
  '[data-toolbar]': {
    title: '操作区',
    items: [{
      title: '显示',
      type: 'Switch',
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.useFooter;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.useFooter = value;
        }
      }
    }, {
      title: '对齐方式',
      type: 'Radio',
      options: [{
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexStart,
        label: '居左'
      }, {
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.Center,
        label: '居中'
      }, {
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexEnd,
        label: '居右'
      }],
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.footerLayout;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.footerLayout = value;
        }
      }
    }, {
      title: '操作列表',
      description: '选中拖拽各项左侧手柄，可改变按钮的相对位置',
      type: 'array',
      options: {
        addText: '添加操作',
        deletable: false,
        editable: false,
        customOptRender: _utils__WEBPACK_IMPORTED_MODULE_0__["default"],
        getTitle: function getTitle(item) {
          return item === null || item === void 0 ? void 0 : item.title;
        },
        onAdd: function onAdd() {
          var defaultBtn = {
            title: "\u64CD\u4F5C\u9879".concat(btnsLength + 1),
            id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)(),
            icon: "",
            useIcon: false,
            showText: true,
            dynamicHidden: true,
            dynamicDisabled: true,
            type: "default",
            visible: true,
            autoClose: true,
            isConnected: false,
            disabled: false,
            useDynamicDisabled: false,
            useDynamicHidden: false
          };
          addBtn(defaultBtn);
          return defaultBtn;
        }
      },
      value: {
        get: function get(_a) {
          var data = _a.data,
            output = _a.output;
          initParams(data, output);
          return data.footerBtns || [];
        },
        set: function set(_a, val) {
          var data = _a.data;
          data.footerBtns = val;
        }
      }
    }]
  },
  '[data-handler-button]': {
    title: '按钮',
    items: function items(_a, cate1, cate2) {
      cate1.title = '按钮', cate1.items = [{
        title: '显示',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return !!findConfig({
              data: data,
              focusArea: focusArea
            }, 'visible');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea;
            findConfig({
              data: data,
              focusArea: focusArea
            }).visible = !!value;
          }
        }
      }, {
        title: '名称',
        type: 'Text',
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return findConfig({
              data: data,
              focusArea: focusArea
            }, 'title');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea;
            findConfig({
              data: data,
              focusArea: focusArea
            }).title = value;
          }
        }
      }, {
        title: '基础样式',
        items: [{
          title: '风格',
          type: 'Select',
          options: function options() {
            return [{
              value: 'default',
              label: '默认'
            }, {
              value: 'primary',
              label: '主按钮'
            }, {
              value: 'dashed',
              label: '虚线按钮'
            }, {
              value: 'danger',
              label: '危险按钮'
            }, {
              value: 'link',
              label: '链接按钮'
            }, {
              value: 'text',
              label: '文字按钮'
            }];
          },
          value: {
            get: function get(_a) {
              var data = _a.data,
                focusArea = _a.focusArea;
              return findConfig({
                data: data,
                focusArea: focusArea
              }, 'type');
            },
            set: function set(_a, value) {
              var data = _a.data,
                focusArea = _a.focusArea;
              findConfig({
                data: data,
                focusArea: focusArea
              }).type = value;
            }
          }
        }]
      }, icon('handlerButton'), {
        title: '事件',
        items: [{
          title: '点击自动关闭抽屉',
          description: '开启时, 单击按钮会自动关闭抽屉。特殊处理：当需要向外输出数据时, 抽屉在数据输出后关闭。',
          type: 'switch',
          ifVisible: function ifVisible(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return findConfig({
              data: data,
              focusArea: focusArea
            }, 'id') === 'cancel';
          },
          value: {
            get: function get(_a) {
              var data = _a.data,
                focusArea = _a.focusArea;
              return findConfig({
                data: data,
                focusArea: focusArea
              }, 'autoClose');
            },
            set: function set(_a, value) {
              var data = _a.data,
                focusArea = _a.focusArea;
              findConfig({
                data: data,
                focusArea: focusArea
              }).autoClose = value;
            }
          }
        }, {
          title: '点击',
          type: '_event',
          options: function options(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return {
              outputId: findConfig({
                data: data,
                focusArea: focusArea
              }, 'id')
            };
          }
        }]
      }, {
        title: '删除',
        type: 'Button',
        ifVisible: function ifVisible(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return !_constants__WEBPACK_IMPORTED_MODULE_1__.DefaultEvent.includes(findConfig({
            data: data,
            focusArea: focusArea
          }, 'id'));
        },
        value: {
          set: function set(_a) {
            var data = _a.data,
              output = _a.output,
              focusArea = _a.focusArea;
            var footerBtns = data.footerBtns;
            var itemId = findConfig({
              data: data,
              focusArea: focusArea
            }, 'id');
            var index = footerBtns.findIndex(function (item) {
              return item.id === itemId;
            });
            var item = data.footerBtns[index];
            output.remove(item.id);
            footerBtns.splice(index, 1);
          }
        }
      }], cate2.title = '高级', cate2.items = [{
        title: '动态启用/禁用',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return !!findConfig({
              data: data,
              focusArea: focusArea
            }, 'useDynamicDisabled');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea,
              input = _a.input;
            if (!focusArea) return;
            var id = findConfig({
              data: data,
              focusArea: focusArea
            }, 'id');
            var title = findConfig({
              data: data,
              focusArea: focusArea
            }, 'title');
            var eventKey1 = "".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetEnable, "_").concat(id);
            var eventKey2 = "".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetDisable, "_").concat(id);
            var event1 = input.get(eventKey1);
            var event2 = input.get(eventKey2);
            if (value) {
              !event1 && input.add(eventKey1, "\u542F\u7528-\"".concat(title, "\""), {
                type: 'any'
              });
              !event2 && input.add(eventKey2, "\u7981\u7528-\"".concat(title, "\""), {
                type: 'any'
              });
            } else {
              event1 && input.remove(eventKey1);
              event2 && input.remove(eventKey2);
            }
            findConfig({
              data: data,
              focusArea: focusArea
            }).useDynamicDisabled = value;
          }
        }
      }, {
        title: '动态显示/隐藏',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return !!findConfig({
              data: data,
              focusArea: focusArea
            }, 'useDynamicHidden');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea,
              input = _a.input;
            if (!focusArea) return;
            var id = findConfig({
              data: data,
              focusArea: focusArea
            }, 'id');
            var title = findConfig({
              data: data,
              focusArea: focusArea
            }, 'title');
            var eventKey1 = "".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetShow, "_").concat(id);
            var eventKey2 = "".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetHidden, "_").concat(id);
            var event1 = input.get(eventKey1);
            var event2 = input.get(eventKey2);
            if (value) {
              !event1 && input.add(eventKey1, "\u663E\u793A-\"".concat(title, "\""), {
                type: 'any'
              });
              !event2 && input.add(eventKey2, "\u9690\u85CF-\"".concat(title, "\""), {
                type: 'any'
              });
            } else {
              event1 && input.remove(eventKey1);
              event2 && input.remove(eventKey2);
            }
            findConfig({
              data: data,
              focusArea: focusArea
            }).useDynamicHidden = value;
          }
        }
      }];
    }
  }
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.tsx":
/*!**********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.tsx ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/constants.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var _b, _c, _d, _e;
  var env = _a.env,
    _env = _a._env,
    data = _a.data,
    slots = _a.slots,
    outputs = _a.outputs,
    inputs = _a.inputs,
    logger = _a.logger;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var isMobile = ((_b = env === null || env === void 0 ? void 0 : env.canvas) === null || _b === void 0 ? void 0 : _b.type) === 'mobile';
  var paddingMap = {
    top: {
      paddingBottom: '50px'
    },
    bottom: {
      paddingTop: '50px'
    },
    left: {
      paddingRight: '50px'
    },
    right: {
      paddingLeft: '50px'
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    inputs['title'](function (val) {
      if (typeof val !== 'string') {
        logger.error('title 必须为string类型');
      } else {
        data.title = val;
      }
    });
    if (env.runtime) {
      (data.footerBtns || []).forEach(function (item) {
        var _a, _b, _c, _d;
        var id = item.id;
        (_a = inputs["".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetDisable, "_").concat(id)]) === null || _a === void 0 ? void 0 : _a.call(inputs, function () {
          item.disabled = true;
        });
        (_b = inputs["".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetEnable, "_").concat(id)]) === null || _b === void 0 ? void 0 : _b.call(inputs, function () {
          item.disabled = false;
        });
        (_c = inputs["".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetHidden, "_").concat(id)]) === null || _c === void 0 ? void 0 : _c.call(inputs, function () {
          item.visible = false;
        });
        (_d = inputs["".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetShow, "_").concat(id)]) === null || _d === void 0 ? void 0 : _d.call(inputs, function () {
          item.visible = true;
        });
      });
    }
  }, []);
  //关闭按钮点击事件
  var handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _env.currentScenes.close();
  }, []);
  //取消按钮点击事件
  var handleCancel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (env.runtime) {
      var index = data.footerBtns.findIndex(function (item) {
        return item.id === 'cancel';
      });
      var autoClose = data.footerBtns[index].autoClose;
      if (autoClose) {
        _env.currentScenes.close();
        outputs['cancel']();
      } else {
        outputs['cancel']();
      }
    }
  }, []);
  //确认按钮点击事件
  var handleOk = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (env.runtime) {
      var okFn = outputs['ok'];
      okFn(); ////TODO 获取当前连接数
    }
  }, []);
  //普通按钮点击事件
  var handleCommon = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    if (env.runtime) {
      outputs[id]();
    }
  }, []);
  var _onClick = function onClick(id) {
    if (id === 'ok') {
      handleOk();
    } else if (id === 'cancel') {
      handleCancel();
    } else {
      handleCommon(id);
    }
  };
  var renderFooter = function renderFooter() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "data-toolbar": true,
      className: isMobile ? (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().mobileFooter) : "toolbar",
      style: {
        justifyContent: data.footerLayout || _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexEnd,
        display: 'flex'
      }
    }, (data.footerBtns || []).map(function (item) {
      var _a;
      var title = item.title,
        id = item.id,
        type = item.type,
        visible = item.visible,
        useIcon = item.useIcon,
        location = item.location,
        icon = item.icon,
        showText = item.showText,
        disabled = item.disabled;
      var Icon = useIcon && _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ && ((_a = _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__[icon]) === null || _a === void 0 ? void 0 : _a.render());
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
        onClick: function onClick() {
          return _onClick(id);
        },
        "data-handler-button": id,
        key: id,
        type: type,
        hidden: !visible,
        disabled: disabled,
        className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default()["footer-btns"])
      }, useIcon && location !== _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK && Icon, showText && env.i18n(title), useIcon && location === _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK && Icon);
    }));
  };
  //调试态
  var debugDrawer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().debugMask),
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
    visible: true,
    title: data.hideTitle ? undefined : data.isTitleCustom ? (_c = slots['title']) === null || _c === void 0 ? void 0 : _c.render() : env.i18n(data.title),
    width: data.width || 520,
    height: isMobile ? '100%' : data.height !== 0 ? data.height : 800,
    closable: data.closable,
    footer: data.useFooter ? renderFooter() : null,
    onClose: handleClose,
    mask: false,
    bodyStyle: data.bodyStyle,
    placement: isMobile ? 'bottom' : data.placement,
    maskClosable: data.maskClosable,
    keyboard: data.keyboard,
    getContainer: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().slotContainer)
  }, slots['body'].render())));
  //预览和发布态
  var publishDrawer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
    visible: true,
    title: data.hideTitle ? undefined : data.isTitleCustom ? (_d = slots['title']) === null || _d === void 0 ? void 0 : _d.render() : env.i18n(data.title),
    width: data.width || 520,
    height: isMobile ? '100%' : data.height !== 0 ? data.height : 800,
    closable: data.closable,
    footer: data.useFooter ? renderFooter() : null,
    onClose: handleClose,
    bodyStyle: data.bodyStyle,
    placement: isMobile ? 'bottom' : data.placement,
    maskClosable: data.maskClosable,
    keyboard: data.keyboard
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().slotContainer)
  }, slots['body'].render())));
  //编辑态
  var editDrawer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().antdDrawer),
    style: paddingMap[data.placement],
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
    visible: true,
    title: data.hideTitle ? undefined : data.isTitleCustom ? (_e = slots['title']) === null || _e === void 0 ? void 0 : _e.render() : env.i18n(data.title),
    closable: data.closable,
    footer: data.useFooter ? renderFooter() : null,
    onClose: handleClose,
    mask: false,
    bodyStyle: data.bodyStyle,
    maskClosable: data.maskClosable,
    style: {
      height: data.height !== 0 ? data.height : 800,
      width: data.width !== 0 ? data.width : 520
    },
    getContainer: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().slotContainer)
  }, slots['body'].render())));
  //调试态
  if (env.runtime && env.runtime.debug) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().mask)
    }, debugDrawer);
    //编辑态
  } else if (env.edit) {
    return editDrawer;
  }
  //预览态 (发布态)
  return publishDrawer;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/upgrade.ts":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/upgrade.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
//import { Data, OutputIds } from './constants';
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var _b;
  var input = _a.input,
    output = _a.output,
    data = _a.data,
    setDeclaredStyle = _a.setDeclaredStyle,
    getDeclaredStyle = _a.getDeclaredStyle,
    removeDeclaredStyle = _a.removeDeclaredStyle;
  /**
   * @description 1.0.2->1.0.3  新增 outputs -> apply(应用), inputs -> title(修改标题)
   */
  var schema = {
    type: "string"
  };
  if (!input.get('title')) {
    input.add('title', '修改标题', schema);
  }
  var follwSchem = {
    type: "follow"
  };
  if (!output.get('apply')) {
    output.add('apply', '应用', follwSchem);
  }
  /**
   * @description 1.0.5->1.0.6  新增 自定义标题
   */
  if (typeof data.isTitleCustom === "undefined") {
    data.isTitleCustom = false;
  }
  /**
   * @description 1.0.6->1.0.7  新增 操作项，禁用启用
  */
  (_b = data.footerBtns) === null || _b === void 0 ? void 0 : _b.forEach(function (act) {
    if (act && act.disabled === undefined) {
      act.disabled = false;
    }
    if (act && act.useDynamicDisabled === undefined) {
      act.useDynamicDisabled = false;
    }
    if (act && act.useDynamicHidden === undefined) {
      act.useDynamicHidden = false;
    }
  });
  /**
   * @description 1.0.8->1.0.9  更改target
  */
  var preBodyStyle = getDeclaredStyle(".ant-drawer-body");
  var bodyCss = {};
  if (preBodyStyle) {
    bodyCss = __assign({}, preBodyStyle.css);
    removeDeclaredStyle(".ant-drawer-body");
    setDeclaredStyle('.{id} .ant-drawer-body', bodyCss);
  }
  /**
   * @description 1.0.9->1.0.10  新增是否支持键盘 esc 关闭 keyboard
  */
  if (typeof data.keyboard === "undefined") {
    data.keyboard = true;
  }
  return true;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/utils.tsx":
/*!********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/utils.tsx ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEmptyString: function() { return /* binding */ isEmptyString; },
/* harmony export */   uuid: function() { return /* binding */ uuid; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__);
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};


function isEmptyString(str) {
  if (typeof str !== 'string') {
    return false;
  } else {
    return !!str.trim().length;
  }
}
function uuid(pre, len) {
  if (pre === void 0) {
    pre = 'u_';
  }
  if (len === void 0) {
    len = 6;
  }
  var seed = 'abcdefhijkmnprstwxyz0123456789',
    maxPos = seed.length;
  var rtn = '';
  for (var i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}
/* harmony default export */ __webpack_exports__["default"] = (function (_a) {
  var item = _a.item,
    index = _a.index,
    setList = _a.setList;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    onClick: function onClick() {
      setList(function (prev) {
        var copy = __spreadArray([], prev, true);
        if (copy && copy[index]) {
          copy[index].visible = !copy[index].visible;
        }
        return copy;
      });
    },
    style: {
      cursor: "pointer",
      padding: "0 10px"
    }
  }, item.visible ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.EyeOutlined, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.EyeInvisibleOutlined, null));
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.tsx":
/*!*********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.tsx ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WidthUnitEnum: function() { return /* binding */ WidthUnitEnum; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_1__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


var WidthUnitEnum;
(function (WidthUnitEnum) {
  WidthUnitEnum["Px"] = "px";
  WidthUnitEnum["Auto"] = "auto";
  WidthUnitEnum["Percent"] = "%";
})(WidthUnitEnum || (WidthUnitEnum = {}));
var Col = function Col(_a, ref) {
  var col = _a.col,
    basis = _a.basis,
    className = _a.className,
    children = _a.children,
    onClick = _a.onClick,
    rest = __rest(_a, ["col", "basis", "className", "children", "onClick"]);
  var colStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _a;
    var style = __assign({}, (_a = col.style) !== null && _a !== void 0 ? _a : {});
    if (col.widthMode === WidthUnitEnum.Auto) {
      style.flex = "1 1 ".concat(basis, "%");
      style.minWidth = 1;
    }
    if (col.widthMode === WidthUnitEnum.Px) {
      style.width = col.width;
    }
    if (col.widthMode === WidthUnitEnum.Percent) {
      style.flex = "0 0 ".concat(col.width, "%");
      style.maxWidth = "".concat(col.width, "%");
    }
    return style;
  }, [JSON.stringify(col.style), col.width, col.widthMode, basis]);
  var classnames = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var classnames = [(_index_less__WEBPACK_IMPORTED_MODULE_1___default().col)];
    if (className) {
      classnames.push(className);
    }
    return classnames.join(" ");
  }, [className]);
  var handleClick = function handleClick(e, col) {
    typeof onClick === 'function' && onClick(col);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", __assign({
    ref: ref,
    style: colStyle,
    className: classnames,
    onClick: function onClick(e) {
      return handleClick(e, col);
    }
  }, rest), children);
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Col));

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.tsx":
/*!************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.tsx ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_1__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


var Layout = function Layout(_a) {
  var className = _a.className,
    children = _a.children,
    rest = __rest(_a, ["className", "children"]);
  var classnames = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var classnames = [(_index_less__WEBPACK_IMPORTED_MODULE_1___default().layout)];
    if (className) {
      classnames.push(className);
    }
    return classnames.join(" ");
  }, [className]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", __assign({
    className: classnames
  }, rest), children);
};
/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.tsx":
/*!*********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.tsx ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeightUnitEnum: function() { return /* binding */ HeightUnitEnum; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_1__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


var HeightUnitEnum;
(function (HeightUnitEnum) {
  HeightUnitEnum["Px"] = "px";
  HeightUnitEnum["Auto"] = "auto";
  HeightUnitEnum["Percent"] = "%";
})(HeightUnitEnum || (HeightUnitEnum = {}));
var Row = function Row(_a) {
  var row = _a.row,
    className = _a.className,
    children = _a.children,
    rest = __rest(_a, ["row", "className", "children"]);
  var rowStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _a;
    var style = __assign({}, (_a = row.style) !== null && _a !== void 0 ? _a : {});
    if (row.heightMode === HeightUnitEnum.Auto) {
      style.height = row.heightMode;
    }
    if (row.heightMode === HeightUnitEnum.Px) {
      style.height = "".concat(parseFloat(row.height), "px");
    }
    if (row.heightMode === HeightUnitEnum.Percent) {
      style.height = "".concat(parseFloat(row.height), "%");
    }
    return style;
  }, [JSON.stringify(row.style), row.heightMode, row.height]);
  var classnames = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var classnames = [(_index_less__WEBPACK_IMPORTED_MODULE_1___default().row)];
    if (className) {
      classnames.push(className);
    }
    return classnames.join(" ");
  }, [className]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", __assign({
    style: rowStyle,
    className: classnames
  }, rest), children);
};
/* harmony default export */ __webpack_exports__["default"] = (Row);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/index.tsx":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/index.tsx ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Col: function() { return /* reexport safe */ _Col__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   HeightUnitEnum: function() { return /* reexport safe */ _Row__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum; },
/* harmony export */   Layout: function() { return /* reexport safe */ _Layout__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   Row: function() { return /* reexport safe */ _Row__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   WidthUnitEnum: function() { return /* reexport safe */ _Col__WEBPACK_IMPORTED_MODULE_2__.WidthUnitEnum; }
/* harmony export */ });
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layout */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.tsx");
/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Row */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.tsx");
/* harmony import */ var _Col__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Col */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.tsx");




/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/col.editor.ts":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/col.editor.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/index.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/index.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};


/* harmony default export */ __webpack_exports__["default"] = ({
  "[data-layout-col-key]": {
    title: "列",
    items: function items(props) {
      var cate = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        cate[_i - 1] = arguments[_i];
      }
      if (!props.focusArea) return;
      var col = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).col;
      cate[0].title = "常规";
      cate[0].items = [{
        title: "宽度填充",
        type: "Select",
        options: [{
          value: _components__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Auto,
          label: "自动填充"
        }, {
          value: _components__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Percent,
          label: "百分比"
        }, {
          value: _components__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Px,
          label: "固定宽度"
        }],
        value: {
          get: function get(props) {
            var _a;
            return (_a = col.widthMode) !== null && _a !== void 0 ? _a : _components__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Auto;
          },
          set: function set(props, value) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updateColWidthMode)(props, {
              widthMode: value
            });
          }
        }
      }, {
        title: "指定宽度(px)",
        type: "Text",
        options: {
          type: "Number"
        },
        ifVisible: function ifVisible(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return (col === null || col === void 0 ? void 0 : col.widthMode) === _components__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Px;
        },
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return col === null || col === void 0 ? void 0 : col.width;
          },
          set: function set(props, value) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updateColWidthMode)(props, {
              width: parseFloat(value)
            });
          }
        }
      }, {
        title: "百分比宽度(%)",
        type: "Text",
        options: {
          type: "Number",
          min: 0,
          max: 100
        },
        ifVisible: function ifVisible(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return (col === null || col === void 0 ? void 0 : col.widthMode) === _components__WEBPACK_IMPORTED_MODULE_0__.WidthUnitEnum.Percent;
        },
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return col === null || col === void 0 ? void 0 : col.width;
          },
          set: function set(props, value) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updateColWidthMode)(props, {
              width: parseFloat(value)
            });
          }
        }
      }, {
        title: "内容布局",
        type: "layout",
        value: {
          get: function get(props) {
            var col = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).col;
            var _a = col.slotStyle,
              slotStyle = _a === void 0 ? {} : _a;
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setSlotLayout)(__assign({
              slotStyle: slotStyle
            }, props));
            return slotStyle;
          },
          set: function set(props, val) {
            var _a;
            var col = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).col;
            col.slotStyle = __assign(__assign({}, (_a = col === null || col === void 0 ? void 0 : col.slotStyle) !== null && _a !== void 0 ? _a : {}), val);
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setSlotLayout)(__assign({
              slotStyle: val
            }, props));
          }
        }
      }, {
        title: "操作",
        items: [{
          title: "前面添加列",
          type: "Button",
          value: {
            set: function set(props) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCol)(props, "BEFORE");
            }
          }
        }, {
          title: "后面添加列",
          type: "Button",
          value: {
            set: function set(props) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCol)(props, "AFTER");
            }
          }
        }, {
          title: "前移",
          type: "Button",
          ifVisible: function ifVisible(props) {
            var index = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).index;
            return index !== undefined && index > 0;
          },
          value: {
            set: function set(props) {
              var _a;
              var _b = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
                row = _b.row,
                index = _b.index;
              if (index < 1) return;
              if (row.useCustom) {
                _a = [row.cols[index], row.cols[index - 1]], row.cols[index - 1] = _a[0], row.cols[index] = _a[1];
              } else {
                var data = props.data;
                data.rows.filter(function (row) {
                  return !row.useCustom;
                }).forEach(function (row) {
                  var _a;
                  _a = [row.cols[index], row.cols[index - 1]], row.cols[index - 1] = _a[0], row.cols[index] = _a[1];
                });
              }
            }
          }
        }, {
          title: "后移",
          type: "Button",
          ifVisible: function ifVisible(props) {
            var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
              row = _a.row,
              index = _a.index;
            return index !== undefined && index < row.cols.length - 1;
          },
          value: {
            set: function set(props) {
              var _a;
              var _b = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
                row = _b.row,
                index = _b.index;
              if (index === row.cols.length - 1) return;
              if (row.useCustom) {
                _a = [row.cols[index + 1], row.cols[index]], row.cols[index] = _a[0], row.cols[index + 1] = _a[1];
              } else {
                var data = props.data;
                data.rows.filter(function (row) {
                  return !row.useCustom;
                }).forEach(function (row) {
                  var _a;
                  _a = [row.cols[index + 1], row.cols[index]], row.cols[index] = _a[0], row.cols[index + 1] = _a[1];
                });
              }
            }
          }
        }, {
          title: "删除",
          type: "Button",
          value: {
            set: function set(props) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.deleteCol)(props);
            }
          }
        }]
      }];
      cate[1].title = "交互";
      cate[1].items = [{
        title: "点击",
        type: "_Event",
        options: function options(props) {
          var col = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props).col;
          return {
            outputId: col === null || col === void 0 ? void 0 : col.key
          };
        }
      }];
    },
    style: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createStyleForCol)({
      target: function target(props) {
        var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getCol)(props),
          row = _a.row,
          col = _a.col;
        var key = "".concat(row.key, ",").concat(col.key);
        return "> .mybricks-layout > .mybricks-row > div[data-layout-col-key=\"".concat(key, "\"]");
      }
    })
  }
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.ts":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/index.ts");
/* harmony import */ var _row_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./row.editor */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/row.editor.ts");
/* harmony import */ var _col_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./col.editor */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/col.editor.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};



/* harmony default export */ __webpack_exports__["default"] = (__assign(__assign({
  ":root": {
    items: function items(_a) {
      var data = _a.data;
      var cate = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        cate[_i - 1] = arguments[_i];
      }
      cate[0].title = "常规";
      cate[0].items = [{
        title: "添加行",
        type: "Button",
        value: {
          set: function set(props) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.addRow)(props);
          }
        }
      }, {
        title: "添加列",
        type: "Button",
        value: {
          set: function set(props) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.addCol)(props);
          }
        }
      }];
      cate[1].title = "交互";
      cate[1].items = [{
        title: "运行时调整列宽",
        type: "switch",
        value: {
          get: function get(_a) {
            var data = _a.data;
            return !!data.resizable;
          },
          set: function set(_a, val) {
            var data = _a.data;
            data.resizable = val;
          }
        }
      }];
    },
    style: [(0,_utils__WEBPACK_IMPORTED_MODULE_0__.createStyleForGrid)({
      target: function target(_a) {
        var id = _a.id;
        return "> .mybricks-layout";
      }
    }), (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createStyleForCol)({
      target: function target(_a) {
        var id = _a.id;
        return "> .mybricks-layout > .mybricks-row > .mybricks-col";
      }
    })]
  }
}, _row_editor__WEBPACK_IMPORTED_MODULE_1__["default"]), _col_editor__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/row.editor.ts":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/row.editor.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/index.tsx");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};



/* harmony default export */ __webpack_exports__["default"] = ({
  "[data-layout-row-key]": {
    title: "行",
    items: function items(props) {
      var cate = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        cate[_i - 1] = arguments[_i];
      }
      if (!props.focusArea) return;
      var data = props.data;
      var row = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).row;
      cate[0].title = "常规";
      cate[0].items = [{
        title: "列间距",
        type: "text",
        options: {
          type: "Number"
        },
        value: {
          get: function get(_a) {
            var _b, _c;
            var data = _a.data;
            return (_c = (_b = row.style) === null || _b === void 0 ? void 0 : _b.columnGap) !== null && _c !== void 0 ? _c : 0;
          },
          set: function set(_a, val) {
            var data = _a.data;
            if (row.useCustom) {
              row.style = __assign(__assign({}, row.style), {
                columnGap: parseFloat(val)
              });
            } else {
              data.rows.filter(function (row) {
                return !row.useCustom;
              }).forEach(function (row) {
                row.style = __assign(__assign({}, row.style), {
                  columnGap: parseFloat(val)
                });
              });
            }
          }
        }
      }, {
        title: "自定义",
        type: "switch",
        value: {
          get: function get(_a) {
            var data = _a.data;
            return !!row.useCustom;
          },
          set: function set(props, val) {
            if (val) {
              row.useCustom = val;
            } else {
              if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.canToggleToStandard)(row, props)) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__.reviseStandardColWidth)(row, props);
                row.useCustom = val;
              } else {
                antd__WEBPACK_IMPORTED_MODULE_2__.message.warn("当前行不能转换成标准行");
              }
            }
          }
        }
      }, {
        title: "操作",
        items: [{
          title: "前面添加行",
          type: "Button",
          value: {
            set: function set(props, val) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_0__.appendRow)(props, "BEFORE");
            }
          }
        }, {
          title: "后面添加行",
          type: "Button",
          value: {
            set: function set(props, val) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_0__.appendRow)(props, "AFTER");
            }
          }
        }, {
          title: "上移",
          type: "Button",
          ifVisible: function ifVisible(props) {
            var index = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).index;
            return index !== undefined && index > 0;
          },
          value: {
            set: function set(props) {
              var _a;
              var index = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).index;
              if (index < 1) return;
              _a = [data.rows[index], data.rows[index - 1]], data.rows[index - 1] = _a[0], data.rows[index] = _a[1];
            }
          }
        }, {
          title: "下移",
          type: "Button",
          ifVisible: function ifVisible(props) {
            var index = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).index;
            return index !== undefined && index < data.rows.length - 1;
          },
          value: {
            set: function set(props) {
              var _a;
              var index = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).index;
              if (index === data.rows.length - 1) return;
              _a = [data.rows[index + 1], data.rows[index]], data.rows[index] = _a[0], data.rows[index + 1] = _a[1];
            }
          }
        }, {
          title: "列等分",
          type: "Button",
          value: {
            set: function set(_a, val) {
              var data = _a.data;
              if (row.useCustom) {
                row.cols.forEach(function (col) {
                  col.widthMode = _components__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto;
                });
              } else {
                data.rows.filter(function (row) {
                  return !row.useCustom;
                }).forEach(function (row) {
                  row.cols.forEach(function (col) {
                    col.widthMode = _components__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto;
                  });
                });
              }
            }
          }
        }, {
          title: "删除",
          type: "Button",
          value: {
            set: function set(props) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_0__.deleteRow)(props);
            }
          }
        }]
      }];
    },
    style: [{
      title: "高度填充",
      type: "Select",
      options: [{
        value: _components__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Auto,
        label: "自动填充"
      }, {
        value: _components__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Px,
        label: "固定高度"
      }, {
        value: _components__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Percent,
        label: "百分比"
      }],
      value: {
        get: function get(props) {
          var _a;
          var row = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).row;
          return (_a = row.heightMode) !== null && _a !== void 0 ? _a : _components__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Auto;
        },
        set: function set(props, value) {
          var row = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).row;
          row.heightMode = value;
        }
      }
    }, {
      title: "指定高度",
      type: "Text",
      options: {
        type: "Number"
      },
      ifVisible: function ifVisible(props) {
        var row = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).row;
        return [_components__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Px, _components__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Percent].includes(row === null || row === void 0 ? void 0 : row.heightMode);
      },
      value: {
        get: function get(props) {
          var row = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).row;
          return row.height;
        },
        set: function set(props, val) {
          var row = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRow)(props).row;
          row.height = parseFloat(val);
        }
      }
    }]
  }
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/runtime.edit.tsx":
/*!********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/runtime.edit.tsx ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Resizable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Resizable */ "../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.tsx");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/index.tsx");
/* harmony import */ var _edit_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.less");
/* harmony import */ var _edit_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_edit_less__WEBPACK_IMPORTED_MODULE_3__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};




var EditLayout = function EditLayout(props) {
  var data = props.data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_2__.Layout, {
    className: "mybricks-layout"
  }, data.rows.map(function (row) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResizableRow, __assign({
      key: row.key,
      row: row
    }, props), row.cols.map(function (col, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResizableCol, __assign({
        key: col.key,
        col: col,
        row: row,
        index: index
      }, props));
    }));
  }));
};
var ResizableRow = function ResizableRow(_a) {
  var _b;
  var data = _a.data,
    row = _a.row,
    children = _a.children,
    env = _a.env;
  var editFinishRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var dragText = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (row.heightMode === _components__WEBPACK_IMPORTED_MODULE_2__.HeightUnitEnum.Auto) {
      return row.heightMode;
    }
    if (row.heightMode === _components__WEBPACK_IMPORTED_MODULE_2__.HeightUnitEnum.Px) {
      return "".concat(row.height, "px");
    }
    if (row.heightMode === _components__WEBPACK_IMPORTED_MODULE_2__.HeightUnitEnum.Percent) {
      return "".concat(row.height, "%");
    }
  }, [row.height, row.heightMode]);
  var isDragging = data.rows.find(function (row) {
    return !!row.isDragging;
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Resizable__WEBPACK_IMPORTED_MODULE_1__["default"], {
    axis: "y",
    key: row.key,
    onResizeStart: function onResizeStart() {
      row.isDragging = true;
      editFinishRef.current = env.edit.focusPaasive();
    },
    onResize: function onResize(size) {
      row.height = size.height;
      row.heightMode = _components__WEBPACK_IMPORTED_MODULE_2__.HeightUnitEnum.Px;
    },
    onResizeStop: function onResizeStop() {
      row.isDragging = false;
      editFinishRef.current && editFinishRef.current();
    },
    zoom: (_b = env.canvas) === null || _b === void 0 ? void 0 : _b.zoom
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_2__.Row, {
    row: row,
    className: "mybricks-row",
    "data-layout-row-key": row.key
  }, children, isDragging && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: row.isDragging ? (_edit_less__WEBPACK_IMPORTED_MODULE_3___default().draggingTipH) : "".concat((_edit_less__WEBPACK_IMPORTED_MODULE_3___default().draggingTipH), " ").concat((_edit_less__WEBPACK_IMPORTED_MODULE_3___default().dashed))
  }, dragText)));
};
var ResizableCol = function ResizableCol(_a) {
  var _b, _c;
  var row = _a.row,
    col = _a.col,
    data = _a.data,
    index = _a.index,
    slots = _a.slots,
    env = _a.env;
  var colRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var editFinishRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _a, _b;
    var eventHandle = function eventHandle(e) {
      if (e.detail.axis === "y") return;
      data.rows.forEach(function (row) {
        row.cols.forEach(function (col) {
          col.isHover = false;
        });
      });
      if (e.type === "hover") {
        if (row === null || row === void 0 ? void 0 : row.useCustom) {
          if (row.cols[index]) {
            row.cols[index].isHover = true;
          }
        } else {
          data.rows.filter(function (row) {
            return !row.useCustom;
          }).forEach(function (row) {
            if (row.cols[index]) {
              row.cols[index].isHover = true;
            }
          });
        }
      }
    };
    (_a = colRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener("hover", eventHandle);
    (_b = colRef.current) === null || _b === void 0 ? void 0 : _b.addEventListener("leave", eventHandle);
    return function () {
      var _a, _b;
      (_a = colRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("hover", eventHandle);
      (_b = colRef.current) === null || _b === void 0 ? void 0 : _b.removeEventListener("leave", eventHandle);
    };
  }, [JSON.stringify(row), index, colRef]);
  var dragText = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (col.widthMode === _components__WEBPACK_IMPORTED_MODULE_2__.WidthUnitEnum.Auto) {
      return col.widthMode;
    }
    if (col.widthMode === _components__WEBPACK_IMPORTED_MODULE_2__.WidthUnitEnum.Px) {
      return "".concat(parseFloat(col.width), "px");
    }
    if (col.widthMode === _components__WEBPACK_IMPORTED_MODULE_2__.WidthUnitEnum.Percent) {
      return col.width;
    }
  }, [col.widthMode, col.width]);
  var isDragging = data.rows.find(function (_a) {
    var cols = _a.cols;
    return cols.some(function (col) {
      return !!col.isDragging;
    });
  });
  var classnames = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var classnames = "mybricks-col";
    if (col.isDragging || row.isDragging) {
      classnames = "".concat(classnames, " ").concat((_edit_less__WEBPACK_IMPORTED_MODULE_3___default().dragging));
    }
    return classnames;
  }, [row.isDragging, col.isDragging]);
  var hoverClassName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return col.isHover ? (_edit_less__WEBPACK_IMPORTED_MODULE_3___default().hover) : undefined;
  }, [col.isHover]);
  var basis = 100 / row.cols.length;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Resizable__WEBPACK_IMPORTED_MODULE_1__["default"], {
    axis: "x",
    key: col.key,
    onResizeStart: function onResizeStart() {
      editFinishRef.current = env.edit.focusPaasive();
      if (row.useCustom) {
        col.isDragging = true;
      } else {
        data.rows.filter(function (row) {
          return !row.useCustom;
        }).forEach(function (row) {
          row.cols[index].isDragging = true;
        });
      }
    },
    onResize: function onResize(size) {
      if (row.useCustom) {
        col.width = size.width;
        col.widthMode = _components__WEBPACK_IMPORTED_MODULE_2__.WidthUnitEnum.Px;
      } else {
        data.rows.filter(function (row) {
          return !row.useCustom;
        }).forEach(function (row) {
          row.cols[index].width = size.width;
          row.cols[index].widthMode = _components__WEBPACK_IMPORTED_MODULE_2__.WidthUnitEnum.Px;
        });
      }
    },
    onResizeStop: function onResizeStop() {
      editFinishRef.current && editFinishRef.current();
      if (row.useCustom) {
        col.isDragging = false;
      } else {
        data.rows.filter(function (row) {
          return !row.useCustom;
        }).forEach(function (row) {
          row.cols[index].isDragging = false;
        });
      }
    },
    zoom: (_b = env.canvas) === null || _b === void 0 ? void 0 : _b.zoom,
    className: hoverClassName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_2__.Col, {
    ref: colRef,
    col: col,
    className: classnames,
    "data-layout-col-key": "".concat(row.key, ",").concat(col.key),
    basis: basis
  }, (_c = slots[col.key]) === null || _c === void 0 ? void 0 : _c.render({
    key: col.key,
    style: col.slotStyle
  }), isDragging && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: col.isDragging ? (_edit_less__WEBPACK_IMPORTED_MODULE_3___default().draggingTipW) : "".concat((_edit_less__WEBPACK_IMPORTED_MODULE_3___default().draggingTipW), " ").concat((_edit_less__WEBPACK_IMPORTED_MODULE_3___default().dashed))
  }, dragText)));
};
/* harmony default export */ __webpack_exports__["default"] = (EditLayout);

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.tsx":
/*!********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.tsx ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/index.tsx");
/* harmony import */ var _components_Resizable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Resizable */ "../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.tsx");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_3__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};




/* harmony default export */ __webpack_exports__["default"] = (function (_a) {
  var data = _a.data,
    slots = _a.slots,
    inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  inputs.setWidth(function (val) {
    var coordinate = val.coordinate,
      width = val.width;
    var errorMsg = "找不到布局列，检查参数设置";
    try {
      var col = data.rows[coordinate[0] - 1].cols[coordinate[1] - 1];
      if (!col) throw Error(errorMsg);
      if (width === "auto") {
        col.widthMode = _components__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto;
      } else {
        col.widthMode = _components__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Px;
      }
      col.width = width;
    } catch (error) {
      logger.error(errorMsg);
      onError === null || onError === void 0 ? void 0 : onError(errorMsg);
    }
  });
  var onColClick = function onColClick(_a) {
    var key = _a.key;
    !!key && outputs[key]();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_1__.Layout, {
    className: "mybricks-layout"
  }, data.rows.map(function (row) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_1__.Row, {
      row: row,
      key: row.key,
      className: "mybricks-row"
    }, row.cols.map(function (col, index) {
      var _a, _b, _c;
      var colProps = {
        col: col,
        basis: 100 / row.cols.length,
        key: col.key,
        className: "mybricks-col",
        'data-layout-col-key': "".concat(row.key, ",").concat(col.key),
        onClick: onColClick
      };
      if (data.resizable) {
        var isLastCol = index === row.cols.length - 1;
        if (!isLastCol) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Resizable__WEBPACK_IMPORTED_MODULE_2__["default"], {
            axis: "x",
            className: (_runtime_less__WEBPACK_IMPORTED_MODULE_3___default().resizer),
            key: col.key,
            onResize: function onResize(_a) {
              var width = _a.width;
              data.rows.forEach(function (row) {
                row.cols[index] = __assign(__assign({}, col), {
                  width: width,
                  widthMode: _components__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Px
                });
              });
            }
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_1__.Col, __assign({}, colProps), (_a = slots[col.key]) === null || _a === void 0 ? void 0 : _a.render({
            key: col.key,
            style: col.slotStyle
          })));
        } else {
          colProps.col = __assign(__assign({}, col), {
            widthMode: _components__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto
          }); //last col auto
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_1__.Col, __assign({}, colProps), (_b = slots[col.key]) === null || _b === void 0 ? void 0 : _b.render({
            key: col.key,
            style: col.slotStyle
          }));
        }
      } else {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components__WEBPACK_IMPORTED_MODULE_1__.Col, __assign({}, colProps), (_c = slots[col.key]) === null || _c === void 0 ? void 0 : _c.render({
          key: col.key,
          style: col.slotStyle
        }));
      }
    }));
  }));
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/upgrade.ts":
/*!*******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/upgrade.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/index.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

/* harmony default export */ __webpack_exports__["default"] = (function (_a) {
  var id = _a.id,
    data = _a.data,
    getDeclaredStyle = _a.getDeclaredStyle,
    setDeclaredStyle = _a.setDeclaredStyle,
    removeDeclaredStyle = _a.removeDeclaredStyle;
  data.rows.forEach(function (row) {
    row.cols.forEach(function (col, index) {
      /**
       * :not selector style
       */
      var preGlobalColSelector = ".mybricks-layout .mybricks-col".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getFilterSelector)(id));
      var preGlobalStyle = getDeclaredStyle(preGlobalColSelector);
      if (preGlobalStyle) {
        var css = __assign({}, preGlobalStyle.css);
        removeDeclaredStyle(preGlobalColSelector);
        setDeclaredStyle("> .mybricks-layout > .mybricks-row > .mybricks-col", css);
      }
      /**
       * remove :not selector, replace with child selector
       */
      var preColSelector = ".mybricks-layout .mybricks-row .mybricks-col:nth-child(".concat(index + 1, ")").concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getFilterSelector)(id));
      var preStyle = getDeclaredStyle(preColSelector);
      if (preStyle) {
        var css = __assign({}, preStyle.css);
        var newSelector = "> .mybricks-layout > .mybricks-row > .mybricks-col:nth-child(".concat(index + 1, ")");
        removeDeclaredStyle(preColSelector);
        setDeclaredStyle(newSelector, css);
      }
      /**
       * remove unified selector, replace with col single style
       */
      var unifiedColSelector = "> .mybricks-layout > .mybricks-row > .mybricks-col:nth-child(".concat(index + 1, ")");
      var unifiedColStyle = getDeclaredStyle(unifiedColSelector);
      if (unifiedColStyle) {
        var css = __assign({}, unifiedColStyle.css);
        var key = "".concat(row.key, ",").concat(col.key);
        var singleColSelector = "> .mybricks-layout > .mybricks-row > div[data-layout-col-key=\"".concat(key, "\"]");
        removeDeclaredStyle(unifiedColSelector);
        setDeclaredStyle(singleColSelector, css);
      }
    });
    var preContainerSelector = ".mybricks-layout".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getFilterSelector)(id));
    var preContainerStyle = getDeclaredStyle(preContainerSelector);
    if (preContainerStyle) {
      var css = __assign({}, preContainerStyle.css);
      removeDeclaredStyle(preContainerSelector);
      setDeclaredStyle("> .mybricks-layout", css);
    }
  });
  return true;
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/common.ts":
/*!************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/common.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCol: function() { return /* binding */ addCol; },
/* harmony export */   addEffect: function() { return /* binding */ addEffect; },
/* harmony export */   addRow: function() { return /* binding */ addRow; },
/* harmony export */   appendCol: function() { return /* binding */ appendCol; },
/* harmony export */   appendRow: function() { return /* binding */ appendRow; },
/* harmony export */   canToggleToStandard: function() { return /* binding */ canToggleToStandard; },
/* harmony export */   copyCol: function() { return /* binding */ copyCol; },
/* harmony export */   createCol: function() { return /* binding */ createCol; },
/* harmony export */   createRow: function() { return /* binding */ createRow; },
/* harmony export */   deleteCol: function() { return /* binding */ deleteCol; },
/* harmony export */   deleteRow: function() { return /* binding */ deleteRow; },
/* harmony export */   getCol: function() { return /* binding */ getCol; },
/* harmony export */   getRow: function() { return /* binding */ getRow; },
/* harmony export */   removeEffect: function() { return /* binding */ removeEffect; },
/* harmony export */   reviseStandardColWidth: function() { return /* binding */ reviseStandardColWidth; },
/* harmony export */   setSlotLayout: function() { return /* binding */ setSlotLayout; },
/* harmony export */   updateColWidthMode: function() { return /* binding */ updateColWidthMode; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/index.tsx");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


var defaultSlotStyle = {
  display: "flex",
  position: "inherit",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  overflow: "inherit"
};
var defaultRow = {
  key: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)(),
  height: _components__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Auto,
  heightMode: _components__WEBPACK_IMPORTED_MODULE_1__.HeightUnitEnum.Auto,
  cols: Array.from({
    length: 2
  }, function () {
    return {
      key: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)(),
      width: 50,
      widthMode: _components__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto,
      slotStyle: defaultSlotStyle
    };
  })
};
var createRow = function createRow(props) {
  var _a;
  var data = props.data;
  var rowKey = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)();
  var row = (_a = data.rows[0]) !== null && _a !== void 0 ? _a : defaultRow;
  var cols = row.cols.map(function (col) {
    return copyCol(props, col);
  });
  return __assign(__assign({}, row), {
    key: rowKey,
    cols: cols
  });
};
var createCol = function createCol(props) {
  var colKey = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)();
  addEffect(__assign({
    key: colKey
  }, props));
  return {
    key: colKey,
    width: 300,
    widthMode: _components__WEBPACK_IMPORTED_MODULE_1__.WidthUnitEnum.Auto,
    slotStyle: defaultSlotStyle
  };
};
var copyCol = function copyCol(props, col) {
  var colKey = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)();
  addEffect(__assign({
    key: colKey
  }, props));
  return __assign(__assign({}, col), {
    key: colKey
  });
};
var addEffect = function addEffect(_a) {
  var key = _a.key,
    slots = _a.slots,
    output = _a.output;
  slots.add({
    id: key,
    title: "拖拽组件到这里"
  });
  output.add(key, "列点击", {
    type: "any"
  });
};
var removeEffect = function removeEffect(_a) {
  var col = _a.col,
    slot = _a.slot,
    output = _a.output;
  slot.remove(col.key);
  output.remove(col.key);
};
var addRow = function addRow(props) {
  var row = createRow(props);
  props.data.rows.push(row);
};
var addCol = function addCol(props) {
  var data = props.data;
  data.rows.forEach(function (row) {
    var col = createCol(props);
    row.cols.push(col);
  });
};
var getRow = function getRow(_a) {
  var data = _a.data,
    focusArea = _a.focusArea;
  var layoutRowKey = focusArea.dataset.layoutRowKey;
  var row = data.rows.find(function (row) {
    return row.key === layoutRowKey;
  });
  var index = data.rows.findIndex(function (row) {
    return row.key === layoutRowKey;
  });
  return {
    row: row,
    index: index
  };
};
var getCol = function getCol(_a) {
  var data = _a.data,
    focusArea = _a.focusArea;
  var key = focusArea.dataset.layoutColKey;
  var _b = key.split(","),
    rowKey = _b[0],
    colKey = _b[1];
  var row = data.rows.find(function (row) {
    return row.key === rowKey;
  });
  var col = row === null || row === void 0 ? void 0 : row.cols.find(function (col) {
    return col.key === colKey;
  });
  var index = row === null || row === void 0 ? void 0 : row.cols.findIndex(function (col) {
    return col.key === colKey;
  });
  return {
    row: row,
    col: col,
    index: index
  };
};
var appendRow = function appendRow(props, position) {
  if (position === void 0) {
    position = "AFTER";
  }
  var data = props.data;
  var index = getRow(props).index;
  var row = createRow(props);
  if (position === "BEFORE") {
    data.rows.splice(index, 0, row);
  } else if (position === "AFTER") {
    data.rows.splice(index + 1, 0, row);
  }
};
var appendCol = function appendCol(props, position) {
  if (position === void 0) {
    position = "AFTER";
  }
  var data = props.data;
  var _a = getCol(props),
    row = _a.row,
    col = _a.col,
    index = _a.index;
  if (row.useCustom) {
    var col_1 = createCol(props);
    if (position === "BEFORE") {
      row.cols.splice(index, 0, col_1);
    } else if (position === "AFTER") {
      row.cols.splice(index + 1, 0, col_1);
    }
  } else {
    data.rows.filter(function (row) {
      return !row.useCustom;
    }).forEach(function (row) {
      var col = createCol(props);
      if (position === "BEFORE") {
        row.cols.splice(index, 0, col);
      } else if (position === "AFTER") {
        row.cols.splice(index + 1, 0, col);
      }
    });
  }
};
var setSlotLayout = function setSlotLayout(_a) {
  var slotStyle = _a.slotStyle,
    props = __rest(_a, ["slotStyle"]);
  var col = getCol(props).col;
  var slotInstance = props.slot.get(col === null || col === void 0 ? void 0 : col.key);
  if (slotStyle.position === "absolute") {
    slotInstance.setLayout(slotStyle.position);
  } else if (slotStyle.display === "flex") {
    if (slotStyle.flexDirection === "row") {
      slotInstance.setLayout("flex-row");
    } else if (slotStyle.flexDirection === "column") {
      slotInstance.setLayout("flex-column");
    }
  }
};
var deleteRow = function deleteRow(props) {
  var data = props.data;
  var _a = getRow(props),
    row = _a.row,
    index = _a.index;
  row === null || row === void 0 ? void 0 : row.cols.forEach(function (col) {
    return removeEffect(__assign({
      col: col
    }, props));
  });
  data.rows.splice(index, 1);
};
var deleteCol = function deleteCol(props) {
  var _a = getCol(props),
    row = _a.row,
    col = _a.col,
    index = _a.index;
  if (row.useCustom) {
    removeEffect(__assign({
      col: col
    }, props));
    row.cols.splice(index, 1);
  } else {
    props.data.rows.filter(function (row) {
      return !row.useCustom;
    }).forEach(function (row) {
      var col = row.cols[index];
      removeEffect(__assign({
        col: col
      }, props));
      row.cols.splice(index, 1);
    });
  }
};
var updateColWidthMode = function updateColWidthMode(props, _a) {
  var width = _a.width,
    widthMode = _a.widthMode;
  var _b = getCol(props),
    row = _b.row,
    col = _b.col,
    index = _b.index;
  if (row.useCustom) {
    if (width) {
      col.width = width;
    }
    if (widthMode) {
      col.widthMode = widthMode;
    }
  } else {
    props.data.rows.filter(function (row) {
      return !row.useCustom;
    }).forEach(function (row) {
      if (width) {
        row.cols[index].width = width;
      }
      if (widthMode) {
        row.cols[index].widthMode = widthMode;
      }
    });
  }
};
var canToggleToStandard = function canToggleToStandard(row, props) {
  var firstStandardRow = props.data.rows.find(function (row) {
    return !row.useCustom;
  });
  if (!firstStandardRow || row.cols.length === (firstStandardRow === null || firstStandardRow === void 0 ? void 0 : firstStandardRow.cols.length)) {
    return true;
  }
  return false;
};
var reviseStandardColWidth = function reviseStandardColWidth(row, props) {
  var firstStandardRow = props.data.rows.find(function (row) {
    return !row.useCustom;
  });
  firstStandardRow === null || firstStandardRow === void 0 ? void 0 : firstStandardRow.cols.forEach(function (col, index) {
    row.cols[index].widthMode = col.widthMode;
    row.cols[index].width = col.width;
  });
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/index.ts":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/index.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCol: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.addCol; },
/* harmony export */   addEffect: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.addEffect; },
/* harmony export */   addRow: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.addRow; },
/* harmony export */   appendCol: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.appendCol; },
/* harmony export */   appendRow: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.appendRow; },
/* harmony export */   canToggleToStandard: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.canToggleToStandard; },
/* harmony export */   copyCol: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.copyCol; },
/* harmony export */   createCol: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.createCol; },
/* harmony export */   createRow: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.createRow; },
/* harmony export */   createStyleForCol: function() { return /* reexport safe */ _style__WEBPACK_IMPORTED_MODULE_1__.createStyleForCol; },
/* harmony export */   createStyleForGrid: function() { return /* reexport safe */ _style__WEBPACK_IMPORTED_MODULE_1__.createStyleForGrid; },
/* harmony export */   createStyleForRow: function() { return /* reexport safe */ _style__WEBPACK_IMPORTED_MODULE_1__.createStyleForRow; },
/* harmony export */   deleteCol: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.deleteCol; },
/* harmony export */   deleteRow: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.deleteRow; },
/* harmony export */   getCol: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.getCol; },
/* harmony export */   getFilterSelector: function() { return /* reexport safe */ _style__WEBPACK_IMPORTED_MODULE_1__.getFilterSelector; },
/* harmony export */   getRow: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.getRow; },
/* harmony export */   removeEffect: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.removeEffect; },
/* harmony export */   reviseStandardColWidth: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.reviseStandardColWidth; },
/* harmony export */   setSlotLayout: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.setSlotLayout; },
/* harmony export */   updateColWidthMode: function() { return /* reexport safe */ _common__WEBPACK_IMPORTED_MODULE_0__.updateColWidthMode; }
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/common.ts");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/style.ts");



/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/style.ts":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/utils/style.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStyleForCol: function() { return /* binding */ createStyleForCol; },
/* harmony export */   createStyleForGrid: function() { return /* binding */ createStyleForGrid; },
/* harmony export */   createStyleForRow: function() { return /* binding */ createStyleForRow; },
/* harmony export */   getFilterSelector: function() { return /* binding */ getFilterSelector; }
/* harmony export */ });
var createStyleForGrid = function createStyleForGrid(_a) {
  var _b = _a === void 0 ? {} : _a,
    target = _b.target;
  return {
    title: "容器",
    options: ["background", "border", "padding"],
    target: target
  };
};
var createStyleForRow = function createStyleForRow(_a) {
  var _b = _a === void 0 ? {} : _a,
    target = _b.target;
  return {
    title: "行",
    options: ["background"],
    target: target
  };
};
var createStyleForCol = function createStyleForCol(_a) {
  var target = _a.target;
  return {
    title: "单元格",
    options: ["background", "border", "padding", {
      type: "size",
      config: {
        disableWidth: true
      }
    }, "overflow"],
    target: target
  };
};
var getFilterSelector = function getFilterSelector(id) {
  return ":not(#".concat(id, " *[data-isslot=\"1\"] *)");
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/constants.ts":
/*!**********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/constants.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlignEnum: function() { return /* binding */ AlignEnum; },
/* harmony export */   DefaultEvent: function() { return /* binding */ DefaultEvent; },
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   Location: function() { return /* binding */ Location; }
/* harmony export */ });
/**
 * Data
 * @param title      标题
 * @param closable   是否显示右上角关闭按钮
 * @param centered   是否设置垂直居中
 * @param useFooter  是否使用工具条
 * @param width      弹窗宽度
 * @param hideTitle  隐藏标题
 * @param bodyStyle  对话框样式
 * @param footerLayout 工具条布局
 * @param footerBtns 操作项
 * @param maskClosable 点击蒙层关闭
 * @param keyboard 键盘 esc 关闭
 */
var Location;
(function (Location) {
  Location["FRONT"] = "front";
  Location["BACK"] = "back";
})(Location || (Location = {}));
var DefaultEvent = ['ok', 'cancel'];
var AlignEnum;
(function (AlignEnum) {
  AlignEnum["Unset"] = "unset";
  AlignEnum["FlexStart"] = "flex-start";
  AlignEnum["Center"] = "center";
  AlignEnum["FlexEnd"] = "flex-end";
})(AlignEnum || (AlignEnum = {}));
var InputIds = {
  SetDisable: 'setDisable',
  SetEnable: 'setEnable',
  SetHidden: 'setHidden',
  SetShow: 'setShow'
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/editors.ts":
/*!********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/editors.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/utils.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/constants.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};



function findConfig(_a, propKey) {
  var data = _a.data,
    focusArea = _a.focusArea;
  if (!focusArea) return;
  var id = focusArea.dataset['handlerButton'];
  var index = data.footerBtns.findIndex(function (item) {
    return item.id === id;
  });
  if (index === -1) return;
  if (typeof propKey === 'string') {
    return data.footerBtns[index][propKey];
  }
  return data.footerBtns[index];
}
//新增按钮操作
var btnsLength, addBtn;
var initParams = function initParams(data, output) {
  btnsLength = (data.footerBtns || []).length;
  addBtn = function addBtn(btn) {
    data.footerBtns.unshift(btn);
    output.add(btn.id, "\u70B9\u51FB".concat(btn.title), {
      type: 'any'
    });
  };
};
//图标编辑
function icon(dataset) {
  return {
    title: '图标',
    items: [{
      title: '使用图标',
      type: 'Switch',
      value: {
        get: function get(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return findConfig({
            data: data,
            focusArea: focusArea
          }).useIcon;
        },
        set: function set(_a, value) {
          var data = _a.data,
            focusArea = _a.focusArea;
          var res = findConfig({
            data: data,
            focusArea: focusArea
          }, 'icon');
          if (!(res === null || res === void 0 ? void 0 : res.length)) {
            findConfig({
              data: data,
              focusArea: focusArea
            }).icon = 'HomeOutlined';
          }
          findConfig({
            data: data,
            focusArea: focusArea
          }).useIcon = value;
        }
      }
    }, {
      title: '显示文字',
      type: 'Switch',
      ifVisible: function ifVisible(_a) {
        var data = _a.data,
          focusArea = _a.focusArea;
        var useIcon = findConfig({
          data: data,
          focusArea: focusArea
        }, 'useIcon');
        return useIcon ? true : false;
      },
      value: {
        get: function get(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return findConfig({
            data: data,
            focusArea: focusArea
          }, 'showText');
        },
        set: function set(_a, value) {
          var data = _a.data,
            focusArea = _a.focusArea;
          findConfig({
            data: data,
            focusArea: focusArea
          }).showText = value;
        }
      }
    }, {
      title: '图标位置',
      type: 'Select',
      options: [{
        label: '位于文字前',
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.Location.FRONT
      }, {
        label: '位于文字后',
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK
      }],
      ifVisible: function ifVisible(_a) {
        var data = _a.data,
          focusArea = _a.focusArea;
        var useIcon = findConfig({
          data: data,
          focusArea: focusArea
        }, 'useIcon');
        return useIcon ? true : false;
      },
      value: {
        get: function get(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return findConfig({
            data: data,
            focusArea: focusArea
          }, 'location') || _constants__WEBPACK_IMPORTED_MODULE_1__.Location.FRONT;
        },
        set: function set(_a, value) {
          var data = _a.data,
            focusArea = _a.focusArea;
          findConfig({
            data: data,
            focusArea: focusArea
          }).location = value;
        }
      }
    }, {
      type: 'Icon',
      ifVisible: function ifVisible(_a) {
        var data = _a.data,
          focusArea = _a.focusArea;
        return findConfig({
          data: data,
          focusArea: focusArea
        }, 'useIcon');
      },
      value: {
        get: function get(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return findConfig({
            data: data,
            focusArea: focusArea
          }, 'icon');
        },
        set: function set(_a, value) {
          var data = _a.data,
            focusArea = _a.focusArea;
          findConfig({
            data: data,
            focusArea: focusArea
          }).icon = value;
        }
      }
    }]
  };
}
/* harmony default export */ __webpack_exports__["default"] = ({
  '@init': function init(_a) {
    var style = _a.style;
    style.width = '100%';
    style.height = '100%';
  },
  ':root': {
    style: [{
      title: '弹窗宽度',
      description: '设置0将使用默认宽度：520',
      type: 'Slider',
      options: {
        max: 5000,
        min: 0,
        step: 100,
        formatter: 'px'
      },
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.width;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.width = value || undefined;
        }
      }
    }, {
      title: '内容高度限制',
      description: '设置0为不限制，超出高度限制出现滚动条',
      type: 'Slider',
      options: {
        max: 5000,
        min: 0,
        step: 100,
        formatter: 'px'
      },
      value: {
        get: function get(_a) {
          var _b;
          var data = _a.data;
          return (_b = data.bodyStyle) === null || _b === void 0 ? void 0 : _b.maxHeight;
        },
        set: function set(_a, value) {
          var data = _a.data;
          if (!data.bodyStyle) {
            data.bodyStyle = {};
          }
          data.bodyStyle = __assign(__assign({}, data.bodyStyle), {
            maxHeight: value || undefined
          });
        }
      }
    }, {
      title: '顶部区域',
      options: ['background', 'border', 'padding', 'opacity'],
      global: true,
      target: '.{id} .ant-modal-header'
    }, {
      title: '内容区域',
      options: ['background', 'padding', 'opacity'],
      global: true,
      target: '.{id} .ant-modal-body'
    }, {
      title: '底部区域',
      options: ['background', 'border', 'padding', 'opacity'],
      global: true,
      target: '.{id} .ant-modal-footer'
    }, {
      title: '整体',
      options: ['background', 'padding', 'opacity'],
      global: true,
      target: [".{id} .ant-modal-content"]
    }],
    items: function items(_a, cate1, cate2) {
      cate1.title = '常规';
      cate1.items = [{
        title: '标题',
        type: 'Text',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.title;
          },
          set: function set(_a, value) {
            var data = _a.data;
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyString)(value)) {
              data.title = value;
            }
          }
        }
      }, {
        title: '隐藏标题',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.hideTitle;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.hideTitle = value;
          }
        }
      }, {
        title: '关闭按钮',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.closable;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.closable = value;
          }
        }
      }, {
        title: '垂直居中',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.centered;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.centered = value;
          }
        }
      }, {
        title: '点击蒙层关闭',
        type: 'switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return !!data.maskClosable;
          },
          set: function set(_a, val) {
            var data = _a.data;
            data.maskClosable = val;
          }
        }
      }, {
        title: '键盘esc关闭',
        type: 'switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return !!data.keyboard;
          },
          set: function set(_a, val) {
            var data = _a.data;
            data.keyboard = val;
          }
        }
      }];
      cate2.title = '操作区';
      cate2.items = [{
        title: '显示',
        type: 'switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.useFooter;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.useFooter = value;
          }
        }
      }, {
        title: '对齐方式',
        type: 'Radio',
        options: [{
          value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexStart,
          label: '居左'
        }, {
          value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.Center,
          label: '居中'
        }, {
          value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexEnd,
          label: '居右'
        }],
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.footerLayout;
          },
          set: function set(_a, value) {
            var data = _a.data;
            data.footerLayout = value;
          }
        }
      }, {
        title: '操作列表',
        description: '选中拖拽各项左侧手柄，可改变按钮的相对位置',
        type: 'array',
        options: {
          addText: '添加操作',
          deletable: false,
          editable: false,
          customOptRender: _utils__WEBPACK_IMPORTED_MODULE_0__["default"],
          getTitle: function getTitle(item) {
            return item === null || item === void 0 ? void 0 : item.title;
          },
          onAdd: function onAdd() {
            var defaultBtn = {
              title: "\u64CD\u4F5C\u9879".concat(btnsLength + 1),
              id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)(),
              icon: "",
              useIcon: false,
              showText: true,
              dynamicHidden: true,
              dynamicDisabled: true,
              type: "default",
              visible: true,
              autoClose: true,
              isConnected: false,
              disabled: false,
              useDynamicDisabled: false,
              useDynamicHidden: false
            };
            addBtn(defaultBtn);
            return defaultBtn;
          }
        },
        value: {
          get: function get(_a) {
            var data = _a.data,
              output = _a.output;
            initParams(data, output);
            return data.footerBtns || [];
          },
          set: function set(_a, val) {
            var data = _a.data;
            data.footerBtns = val;
          }
        }
      }];
    }
  },
  '.ant-modal-title': {
    style: [{
      title: '默认',
      options: ['font'],
      global: true,
      target: function target(_a) {
        var id = _a.id;
        return ".{id} .ant-modal-title";
      }
    }],
    items: function items(_a, cate1) {
      cate1.title = '标题', cate1.items = [{
        title: '内容',
        type: 'text',
        ifVisible: function ifVisible(_a) {
          var data = _a.data;
          return !data.isTitleCustom;
        },
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.title;
          },
          set: function set(_a, title) {
            var data = _a.data;
            data.title = title;
          }
        }
      }, {
        title: '自定义',
        type: 'switch',
        value: {
          get: function get(_a) {
            var data = _a.data;
            return data.isTitleCustom;
          },
          set: function set(_a, value) {
            var data = _a.data,
              slot = _a.slot;
            data.isTitleCustom = value;
            if (data.isTitleCustom === true) {
              slot.add('title', '标题');
            } else {
              slot.remove('title', '标题');
            }
          }
        }
      }];
    }
  },
  '.ant-modal-close': {
    style: [{
      catelog: '默认',
      options: [{
        type: 'font',
        config: {
          disableTextAlign: true
        }
      }],
      global: true,
      target: function target(_a) {
        var id = _a.id;
        return ".{id} .anticon";
      }
    }, {
      catelog: 'Hover',
      options: [{
        type: 'font',
        config: {
          disableTextAlign: true
        }
      }],
      global: true,
      target: function target(_a) {
        var id = _a.id;
        return ".{id} .anticon:hover";
      }
    }],
    title: '关闭按钮',
    items: [{
      title: '显示',
      type: 'Switch',
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.closable;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.closable = value;
        }
      }
    }]
  },
  '[data-toolbar]': {
    title: '操作区',
    items: [{
      title: '显示',
      type: 'Switch',
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.useFooter;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.useFooter = value;
        }
      }
    }, {
      title: '对齐方式',
      type: 'Radio',
      options: [{
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexStart,
        label: '居左'
      }, {
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.Center,
        label: '居中'
      }, {
        value: _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexEnd,
        label: '居右'
      }],
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.footerLayout;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.footerLayout = value;
        }
      }
    }, {
      title: '操作列表',
      description: '选中拖拽各项左侧手柄，可改变按钮的相对位置',
      type: 'array',
      options: {
        addText: '添加操作',
        deletable: false,
        editable: false,
        customOptRender: _utils__WEBPACK_IMPORTED_MODULE_0__["default"],
        getTitle: function getTitle(item) {
          return item === null || item === void 0 ? void 0 : item.title;
        },
        onAdd: function onAdd() {
          var defaultBtn = {
            title: "\u64CD\u4F5C\u9879".concat(btnsLength + 1),
            id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uuid)(),
            icon: "",
            useIcon: false,
            showText: true,
            dynamicHidden: true,
            dynamicDisabled: true,
            type: "default",
            visible: true,
            autoClose: true,
            isConnected: false,
            disabled: false,
            useDynamicDisabled: false,
            useDynamicHidden: false
          };
          addBtn(defaultBtn);
          return defaultBtn;
        }
      },
      value: {
        get: function get(_a) {
          var data = _a.data,
            output = _a.output;
          initParams(data, output);
          return data.footerBtns || [];
        },
        set: function set(_a, val) {
          var data = _a.data;
          data.footerBtns = val;
        }
      }
    }]
  },
  '[data-handler-button]': {
    style: [{
      title: '基础样式',
      items: [{
        title: '风格',
        type: 'Select',
        options: function options() {
          return [{
            value: 'default',
            label: '默认'
          }, {
            value: 'primary',
            label: '主按钮'
          }, {
            value: 'dashed',
            label: '虚线按钮'
          }, {
            value: 'danger',
            label: '危险按钮'
          }, {
            value: 'link',
            label: '链接按钮'
          }, {
            value: 'text',
            label: '文字按钮'
          }];
        },
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return findConfig({
              data: data,
              focusArea: focusArea
            }, 'type');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea;
            findConfig({
              data: data,
              focusArea: focusArea
            }).type = value;
          }
        }
      }]
    }, icon('handlerButton'), {
      items: [{
        catelog: '默认',
        options: ['border', {
          type: 'font',
          config: {
            disableTextAlign: true
          }
        }, {
          type: 'background',
          config: {
            disableBackgroundImage: true
          }
        }],
        global: true,
        target: function target(_a) {
          var focusArea = _a.focusArea,
            data = _a.data;
          return ".{id} button[data-handler-button=\"".concat(findConfig({
            data: data,
            focusArea: focusArea
          }, 'id'), "\"]");
        }
      }, {
        catelog: 'Hover',
        options: ['border', {
          type: 'font',
          config: {
            disableTextAlign: true
          }
        }, {
          type: 'background',
          config: {
            disableBackgroundImage: true
          }
        }],
        global: true,
        target: function target(_a) {
          var focusArea = _a.focusArea,
            data = _a.data;
          return ".{id} button[data-handler-button=\"".concat(findConfig({
            data: data,
            focusArea: focusArea
          }, 'id'), "\"]:hover");
        },
        domTarget: function domTarget(_a) {
          var focusArea = _a.focusArea,
            data = _a.data;
          return "button[data-handler-button=\"".concat(findConfig({
            data: data,
            focusArea: focusArea
          }, 'id'), "\"]");
        }
      }]
    }],
    items: function items(_a, cate1, cate2) {
      cate1.title = '按钮', cate1.items = [{
        title: '显示',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return !!findConfig({
              data: data,
              focusArea: focusArea
            }, 'visible');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea;
            findConfig({
              data: data,
              focusArea: focusArea
            }).visible = !!value;
          }
        }
      }, {
        title: '名称',
        type: 'Text',
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return findConfig({
              data: data,
              focusArea: focusArea
            }, 'title');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea;
            findConfig({
              data: data,
              focusArea: focusArea
            }).title = value;
          }
        }
      }, {
        title: '事件',
        items: [{
          title: '点击自动关闭对话框',
          description: '开启时, 单击按钮会自动关闭对话框。特殊处理：当需要向外输出数据时, 对话框在数据输出后关闭。',
          type: 'switch',
          ifVisible: function ifVisible(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return findConfig({
              data: data,
              focusArea: focusArea
            }, 'id') === 'cancel';
          },
          value: {
            get: function get(_a) {
              var data = _a.data,
                focusArea = _a.focusArea;
              return findConfig({
                data: data,
                focusArea: focusArea
              }, 'autoClose');
            },
            set: function set(_a, value) {
              var data = _a.data,
                focusArea = _a.focusArea;
              findConfig({
                data: data,
                focusArea: focusArea
              }).autoClose = value;
            }
          }
        }, {
          title: '点击',
          type: '_event',
          options: function options(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return {
              outputId: findConfig({
                data: data,
                focusArea: focusArea
              }, 'id')
            };
          }
        }]
      }, {
        title: '删除',
        type: 'Button',
        ifVisible: function ifVisible(_a) {
          var data = _a.data,
            focusArea = _a.focusArea;
          return !_constants__WEBPACK_IMPORTED_MODULE_1__.DefaultEvent.includes(findConfig({
            data: data,
            focusArea: focusArea
          }, 'id'));
        },
        value: {
          set: function set(_a) {
            var data = _a.data,
              output = _a.output,
              focusArea = _a.focusArea;
            var footerBtns = data.footerBtns;
            var itemId = findConfig({
              data: data,
              focusArea: focusArea
            }, 'id');
            var index = footerBtns.findIndex(function (item) {
              return item.id === itemId;
            });
            var item = data.footerBtns[index];
            output.remove(item.id);
            footerBtns.splice(index, 1);
          }
        }
      }], cate2.title = '高级', cate2.items = [{
        title: '动态启用/禁用',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return !!findConfig({
              data: data,
              focusArea: focusArea
            }, 'useDynamicDisabled');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea,
              input = _a.input;
            if (!focusArea) return;
            var id = findConfig({
              data: data,
              focusArea: focusArea
            }, 'id');
            var title = findConfig({
              data: data,
              focusArea: focusArea
            }, 'title');
            var eventKey1 = "".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetEnable, "_").concat(id);
            var eventKey2 = "".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetDisable, "_").concat(id);
            var event1 = input.get(eventKey1);
            var event2 = input.get(eventKey2);
            if (value) {
              !event1 && input.add(eventKey1, "\u542F\u7528-\"".concat(title, "\""), {
                type: 'any'
              });
              !event2 && input.add(eventKey2, "\u7981\u7528-\"".concat(title, "\""), {
                type: 'any'
              });
            } else {
              event1 && input.remove(eventKey1);
              event2 && input.remove(eventKey2);
            }
            findConfig({
              data: data,
              focusArea: focusArea
            }).useDynamicDisabled = value;
          }
        }
      }, {
        title: '动态显示/隐藏',
        type: 'Switch',
        value: {
          get: function get(_a) {
            var data = _a.data,
              focusArea = _a.focusArea;
            return !!findConfig({
              data: data,
              focusArea: focusArea
            }, 'useDynamicHidden');
          },
          set: function set(_a, value) {
            var data = _a.data,
              focusArea = _a.focusArea,
              input = _a.input;
            if (!focusArea) return;
            var id = findConfig({
              data: data,
              focusArea: focusArea
            }, 'id');
            var title = findConfig({
              data: data,
              focusArea: focusArea
            }, 'title');
            var eventKey1 = "".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetShow, "_").concat(id);
            var eventKey2 = "".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetHidden, "_").concat(id);
            var event1 = input.get(eventKey1);
            var event2 = input.get(eventKey2);
            if (value) {
              !event1 && input.add(eventKey1, "\u663E\u793A-\"".concat(title, "\""), {
                type: 'any'
              });
              !event2 && input.add(eventKey2, "\u9690\u85CF-\"".concat(title, "\""), {
                type: 'any'
              });
            } else {
              event1 && input.remove(eventKey1);
              event2 && input.remove(eventKey2);
            }
            findConfig({
              data: data,
              focusArea: focusArea
            }).useDynamicHidden = value;
          }
        }
      }];
    }
  }
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.tsx":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.tsx ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/constants.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var _b, _c, _d, _e;
  var id = _a.id,
    env = _a.env,
    _env = _a._env,
    data = _a.data,
    slots = _a.slots,
    outputs = _a.outputs,
    inputs = _a.inputs,
    logger = _a.logger;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var isMobile = ((_b = env === null || env === void 0 ? void 0 : env.canvas) === null || _b === void 0 ? void 0 : _b.type) === 'mobile';
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    inputs['title'](function (val) {
      if (typeof val !== 'string') {
        logger.error('title 必须为string类型');
      } else {
        data.title = val;
      }
    });
    if (env.runtime) {
      (data.footerBtns || []).forEach(function (item) {
        var _a, _b, _c, _d;
        var id = item.id;
        (_a = inputs["".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetDisable, "_").concat(id)]) === null || _a === void 0 ? void 0 : _a.call(inputs, function () {
          item.disabled = true;
        });
        (_b = inputs["".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetEnable, "_").concat(id)]) === null || _b === void 0 ? void 0 : _b.call(inputs, function () {
          item.disabled = false;
        });
        (_c = inputs["".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetHidden, "_").concat(id)]) === null || _c === void 0 ? void 0 : _c.call(inputs, function () {
          item.visible = false;
        });
        (_d = inputs["".concat(_constants__WEBPACK_IMPORTED_MODULE_1__.InputIds.SetShow, "_").concat(id)]) === null || _d === void 0 ? void 0 : _d.call(inputs, function () {
          item.visible = true;
        });
      });
    }
  }, []);
  //关闭按钮点击事件
  var handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _env.currentScenes.close();
  }, []);
  //取消按钮点击事件
  var handleCancel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (env.runtime) {
      var index = data.footerBtns.findIndex(function (item) {
        return item.id === 'cancel';
      });
      var autoClose = data.footerBtns[index].autoClose;
      if (autoClose) {
        _env.currentScenes.close();
        outputs['cancel']();
      } else {
        outputs['cancel']();
      }
    }
  }, []);
  //确认按钮点击事件
  var handleOk = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (env.runtime) {
      var okFn = outputs['ok'];
      okFn(); ////TODO 获取当前连接数
    }
  }, []);
  //普通按钮点击事件
  var handleCommon = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    if (env.runtime) {
      outputs[id]();
    }
  }, []);
  var _onClick = function onClick(id) {
    if (id === 'ok') {
      handleOk();
    } else if (id === 'cancel') {
      handleCancel();
    } else {
      handleCommon(id);
    }
  };
  var renderFooter = function renderFooter() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "data-toolbar": true,
      className: isMobile ? (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().mobileFooter) : "toolbar",
      style: {
        justifyContent: data.footerLayout || _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexEnd,
        display: 'flex'
      }
    }, (data.footerBtns || []).map(function (item) {
      var _a;
      var title = item.title,
        id = item.id,
        type = item.type,
        visible = item.visible,
        useIcon = item.useIcon,
        location = item.location,
        icon = item.icon,
        showText = item.showText,
        disabled = item.disabled;
      var Icon = useIcon && _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ && ((_a = _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__[icon]) === null || _a === void 0 ? void 0 : _a.render());
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
        onClick: function onClick() {
          return _onClick(id);
        },
        "data-handler-button": id,
        key: id,
        type: type,
        hidden: !visible,
        disabled: disabled
      }, useIcon && location !== _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK && Icon, showText && env.i18n(title), useIcon && location === _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK && Icon);
    }));
  };
  //调试态
  var debugPopup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    visible: true,
    title: data.hideTitle ? undefined : data.isTitleCustom ? (_c = slots['title']) === null || _c === void 0 ? void 0 : _c.render() : env.i18n(data.title),
    width: isMobile ? '100%' : data.width,
    footer: data.useFooter ? renderFooter() : null,
    onCancel: handleClose,
    centered: data.centered,
    bodyStyle: data.bodyStyle,
    maskClosable: data.maskClosable,
    keyboard: data.keyboard,
    wrapClassName: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().container),
    closable: data.closable,
    getContainer: false
  }, slots['body'].render());
  //预览态（发布态）
  var publishPopup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    visible: true,
    title: data.hideTitle ? undefined : data.isTitleCustom ? (_d = slots['title']) === null || _d === void 0 ? void 0 : _d.render() : env.i18n(data.title),
    width: isMobile ? '100%' : data.width,
    footer: data.useFooter ? renderFooter() : null,
    onCancel: handleClose,
    centered: data.centered,
    bodyStyle: data.bodyStyle,
    maskClosable: data.maskClosable,
    keyboard: data.keyboard,
    wrapClassName: "".concat((_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().container), " ").concat(id),
    closable: data.closable
  }, slots['body'].render());
  //编辑态
  var editPopup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    visible: true,
    title: data.hideTitle ? undefined : data.isTitleCustom ? (_e = slots['title']) === null || _e === void 0 ? void 0 : _e.render() : env.i18n(data.title),
    width: isMobile ? '100%' : data.width,
    footer: data.useFooter ? renderFooter() : null,
    onCancel: handleClose,
    mask: false,
    transitionName: "",
    bodyStyle: data.bodyStyle,
    wrapClassName: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().container),
    closable: data.closable,
    getContainer: false
  }, slots['body'].render());
  var getContent = function getContent() {
    //调试态
    if (env.runtime && env.runtime.debug) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().debugMask)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().mask)
      }, debugPopup));
      //编辑态
    } else if (env.edit) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().antdMask)
      }, editPopup);
    }
    //预览态 (发布态)
    return publishPopup;
  };
  return getContent();
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/upgrade.ts":
/*!********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/upgrade.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
//import { Data, OutputIds } from './constants';
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var _b;
  var data = _a.data,
    output = _a.output,
    input = _a.input,
    setDeclaredStyle = _a.setDeclaredStyle,
    getDeclaredStyle = _a.getDeclaredStyle,
    removeDeclaredStyle = _a.removeDeclaredStyle;
  /**
   * @description 隐藏标题（hideTitle）、垂直居中（centered）、对话框宽度（width）、显示工具条（useFooter）、页脚布局（footerLayout）、
   */
  if (typeof data.hideTitle === "undefined") {
    data.hideTitle = false;
  }
  if (typeof data.centered === "undefined") {
    data.centered = false;
  }
  if (typeof data.width === "undefined") {
    data.width = 520;
  }
  if (typeof data.useFooter === "undefined") {
    data.useFooter = true;
  }
  if (typeof data.footerLayout === "undefined") {
    data.footerLayout = "flex-end";
  }
  if (typeof data.footerBtns === "undefined") {
    data.footerBtns = [{
      "id": "cancel",
      "title": "取消",
      "icon": "",
      "useIcon": false,
      "showText": true,
      "dynamicHidden": true,
      "dynamicDisabled": true,
      "type": "default",
      "visible": true,
      "autoClose": true,
      "isConnected": false
    }, {
      "id": "ok",
      "title": "确认",
      "type": "primary",
      "icon": "",
      "dynamicHidden": true,
      "dynamicDisabled": true,
      "useIcon": false,
      "showText": true,
      "visible": true,
      "autoClose": true,
      "isConnected": false
    }];
  }
  /**
   * @description 1.0.1->1.0.2  新增 closable
   */
  if (typeof data.closable === "undefined") {
    data.closable = true;
  }
  /**
   * @description 1.0.3->1.0.4  新增 maskClosable, 点击蒙层关闭,
   *  取消按钮的autoClose,如果已经取消按钮之前已经连线了，点击自动关闭对话框为false，要经过rels
   */
  if (typeof data.maskClosable === "undefined") {
    data.maskClosable = true;
  }
  var cancelFn = output.get('cancel');
  var cons = cancelFn.connectionCount;
  if (cons !== 0) {
    var index = data.footerBtns.findIndex(function (item) {
      return item.id === 'cancel';
    });
    data.footerBtns[index].autoClose = false;
  }
  /**
   * @description 1.0.10->1.0.11  新增 outputs -> apply(应用), inputs -> title(修改标题)
   */
  var schema = {
    type: "string"
  };
  if (!input.get('title')) {
    input.add('title', '修改标题', schema);
  }
  var follwSchem = {
    type: "follow"
  };
  if (!output.get('apply')) {
    output.add('apply', '应用', follwSchem);
  }
  /**
   * @description 1.0.17->1.0.18  新增 自定义标题
   */
  if (typeof data.isTitleCustom === "undefined") {
    data.isTitleCustom = false;
  }
  /**
   * @description 1.0.18->1.0.19  新增 操作项，禁用启用
  */
  (_b = data.footerBtns) === null || _b === void 0 ? void 0 : _b.forEach(function (act) {
    if (act && act.disabled === undefined) {
      act.disabled = false;
    }
    if (act && act.useDynamicDisabled === undefined) {
      act.useDynamicDisabled = false;
    }
    if (act && act.useDynamicHidden === undefined) {
      act.useDynamicHidden = false;
    }
  });
  /**
   * @description 1.0.20->1.0.21  更改target
  */
  var preBodyStyle = getDeclaredStyle(".ant-modal-body");
  var preStyleList = data.footerBtns.map(function (item) {
    getDeclaredStyle("button[data-handler-button=\"".concat(item.id, "\"]"));
  });
  var preHoverStyleList = data.footerBtns.map(function (item) {
    getDeclaredStyle("button[data-handler-button=\"".concat(item.id, "\"]:hover"));
  });
  var bodyCss = {},
    css = {},
    hoverCss = {};
  if (preBodyStyle) {
    bodyCss = __assign({}, preBodyStyle.css);
    removeDeclaredStyle(".ant-modal-body");
    setDeclaredStyle('.{id} .ant-modal-body', bodyCss);
  }
  preStyleList.map(function (item) {
    if (item) {
      css = __assign({}, item.css);
      removeDeclaredStyle("button[data-handler-button=\"".concat(item.id, "\"]"));
      setDeclaredStyle('.{id} button[data-handler-button="${item.id}"]', css);
    }
  });
  preHoverStyleList.map(function (item) {
    if (item) {
      hoverCss = __assign({}, item.css);
      removeDeclaredStyle("button[data-handler-button=\"".concat(item.id, "\"]:hover"));
      setDeclaredStyle('.{id} button[data-handler-button="${item.id}"]:hover', css);
    }
  });
  /**
   * @description 1.0.21->1.0.22  新增是否支持键盘 esc 关闭 keyboard
  */
  if (typeof data.keyboard === "undefined") {
    data.keyboard = true;
  }
  return true;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/utils.tsx":
/*!*******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/utils.tsx ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEmptyString: function() { return /* binding */ isEmptyString; },
/* harmony export */   uuid: function() { return /* binding */ uuid; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__);
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};


function isEmptyString(str) {
  if (typeof str !== 'string') {
    return false;
  } else {
    return !!str.trim().length;
  }
}
function uuid(pre, len) {
  if (pre === void 0) {
    pre = 'u_';
  }
  if (len === void 0) {
    len = 6;
  }
  var seed = 'abcdefhijkmnprstwxyz0123456789',
    maxPos = seed.length;
  var rtn = '';
  for (var i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}
/* harmony default export */ __webpack_exports__["default"] = (function (_a) {
  var item = _a.item,
    index = _a.index,
    setList = _a.setList;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    onClick: function onClick() {
      setList(function (prev) {
        var copy = __spreadArray([], prev, true);
        if (copy && copy[index]) {
          copy[index].visible = !copy[index].visible;
        }
        return copy;
      });
    },
    style: {
      cursor: "pointer",
      padding: "0 10px"
    }
  }, item.visible ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.EyeOutlined, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.EyeInvisibleOutlined, null));
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/editors.tsx":
/*!*************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/editors.tsx ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
/* harmony default export */ __webpack_exports__["default"] = ({
  '@init': function init(_a) {
    var style = _a.style;
    style.height = 50;
    style.width = 100;
  },
  '@resize': {
    options: ['width', 'height']
  },
  ':root': [{
    title: '显示插槽',
    type: 'switch',
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.asSlot;
      },
      set: function set(_a, value) {
        var data = _a.data,
          slots = _a.slots;
        data.asSlot = value;
        if (value) {
          slots.add({
            id: 'container',
            title: '容器'
          });
        } else {
          slots.remove('container');
        }
      }
    }
  }, {
    title: '插槽布局',
    type: 'layout',
    ifVisible: function ifVisible(_a) {
      var data = _a.data;
      return data.asSlot;
    },
    value: {
      get: function get(_a) {
        var data = _a.data,
          slots = _a.slots,
          focusArea = _a.focusArea;
        return data.slotLayout;
      },
      set: function set(_a, ly) {
        var data = _a.data,
          slots = _a.slots,
          focusArea = _a.focusArea;
        data.slotLayout = ly;
        var slot = slots.get('container');
        if (ly.position === 'absolute') {
          slot.setLayout('absolute');
        } else {
          slot.setLayout(ly.position);
        }
      }
    }
  }, {}, {
    title: '样式',
    type: 'Style',
    options: {
      plugins: ['border', 'bgcolor']
    },
    value: {
      get: function get(_a) {
        var data = _a.data;
        return data.style;
      },
      set: function set(_a, value) {
        var data = _a.data;
        data.style = __assign(__assign({}, data.style), value);
      }
    }
  }, {
    title: '单击',
    type: '_Event',
    options: {
      outputId: 'click'
    }
  }]
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/runtime.tsx":
/*!*************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/runtime.tsx ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/css.less");
/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_less__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (_a) {
  var env = _a.env,
    data = _a.data,
    slots = _a.slots,
    inputs = _a.inputs,
    outputs = _a.outputs;
  var onClick = function onClick() {
    outputs["click"]();
  };
  // useEffect(() => {
  //   inputs["setValue"]((ds) => {
  //     data.value = ds;
  //   });
  // }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_css_less__WEBPACK_IMPORTED_MODULE_1___default().rectangle),
    onClick: onClick
  }, data.asSlot ? slots["container"].render() : null);
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/constants.ts":
/*!**********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/constants.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INPUTS: function() { return /* binding */ INPUTS; },
/* harmony export */   rotateTriangle: function() { return /* binding */ rotateTriangle; }
/* harmony export */ });
var rotateTriangle = function rotateTriangle(angle) {
  var centerX = 50,
    centerY = 50;
  var radians = angle * (Math.PI / 180);
  var cosTheta = Math.cos(radians);
  var sinTheta = Math.sin(radians);
  var points = [[50, 0], [0, 100], [100, 100] // point3
  ];

  var rotatedPoints = points.map(function (_a) {
    var x = _a[0],
      y = _a[1];
    var shiftedX = x - centerX;
    var shiftedY = y - centerY;
    var rotatedX = Math.round(shiftedX * cosTheta - shiftedY * sinTheta + centerX);
    var rotatedY = Math.round(shiftedX * sinTheta + shiftedY * cosTheta + centerY);
    return [rotatedX, rotatedY];
  });
  var point1 = rotatedPoints[0],
    point2 = rotatedPoints[1],
    point3 = rotatedPoints[2];
  return "polygon(".concat(point1[0], "% ").concat(point1[1], "%, ").concat(point2[0], "% ").concat(point2[1], "%, ").concat(point3[0], "% ").concat(point3[1], "%)");
};
var INPUTS = {
  SetStyle: 'setStyle'
};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/editors.tsx":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/editors.tsx ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/constants.ts");

/* harmony default export */ __webpack_exports__["default"] = ({
  '@init': function init(_a) {
    var style = _a.style;
    style.width = 20;
    style.height = 20;
  },
  '@resize': {
    options: ['width', 'height']
  },
  ':root': {
    style: [{
      title: '形状',
      type: 'style',
      options: ['background'],
      target: '[data-item-type="shape"]',
      domTarget: '[data-item-type="shape"]'
    }, {
      title: '内容',
      type: 'style',
      options: ['padding'],
      target: '[data-item-type="wrapper"]',
      domTarget: '[data-item-type="wrapper"]'
    }, {
      title: '边框',
      type: 'style',
      ifVisible: function ifVisible(_a) {
        var data = _a.data;
        return data.type === 'rectangle';
      },
      options: [{
        type: 'border',
        config: {
          disableBorderWidth: true,
          disableBorderStyle: true,
          disableBorderColor: true
        }
      }, 'boxshadow'],
      target: '[data-item-type="shape"]',
      domTarget: '[data-item-type="shape"]'
    }, {
      title: '边框',
      type: 'style',
      ifVisible: function ifVisible(_a) {
        var data = _a.data;
        return data.type !== 'rectangle';
      },
      options: ['boxshadow'],
      target: '[data-item-type="shape"]',
      domTarget: '[data-item-type="shape"]'
    }, {
      title: '顶点位置',
      type: 'Select',
      options: [{
        label: '上',
        value: 0
      }, {
        label: '右',
        value: 90
      }, {
        label: '下',
        value: 180
      }, {
        label: '左',
        value: 270
      }],
      ifVisible: function ifVisible(_a) {
        var data = _a.data;
        return data.type !== 'circle' && data.type !== 'rectangle';
      },
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.position || 0;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.clipPath = (0,_constants__WEBPACK_IMPORTED_MODULE_0__.rotateTriangle)(value) || "polygon(50% 0%, 0% 100%, 100% 100%)";
        }
      }
    }],
    items: [{
      title: '形状',
      type: 'Select',
      options: [{
        value: 'circle',
        label: '圆或椭圆'
      }, {
        value: 'rectangle',
        label: '矩形'
      }, {
        value: 'triangle',
        label: '三角形'
      }],
      value: {
        get: function get(_a) {
          var data = _a.data;
          return data.type;
        },
        set: function set(_a, value) {
          var data = _a.data;
          data.type = value;
        }
      }
    }]
  }
});

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.tsx":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.tsx ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/constants.ts");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_2__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data,
    inputs = _a.inputs;
  var type = data.type,
    clipPath = data.clipPath;
  var shapeStyles = {};
  var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    dynamicStyle = _b[0],
    setDynamicStyle = _b[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_1__.INPUTS.SetStyle](function (style) {
      setDynamicStyle(style);
    });
  }, []);
  switch (type) {
    case "rectangle":
      break;
    case "circle":
      shapeStyles.borderRadius = "50%";
      break;
    case "triangle":
      shapeStyles.clipPath = clipPath || "polygon(50% 0%, 0% 100%, 100% 100%)";
      break;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_2___default().wrapper),
    "data-item-type": "wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: __assign(__assign({}, shapeStyles), dynamicStyle),
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_2___default().shape),
    "data-item-type": "shape"
  }));
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/upgrade.ts":
/*!********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/upgrade.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/constants.ts");

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var input = _a.input;
  if (!input.get(_constants__WEBPACK_IMPORTED_MODULE_0__.INPUTS.SetStyle)) {
    input.add(_constants__WEBPACK_IMPORTED_MODULE_0__.INPUTS.SetStyle, "动态设置样式", {
      type: "object",
      properties: {
        background: {
          type: "string"
        }
      }
    });
  }
  return true;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/basic.ts":
/*!******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/utils/basic.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uuid: function() { return /* binding */ uuid; }
/* harmony export */ });
function uuid(pre, len) {
  if (pre === void 0) {
    pre = 'u_';
  }
  if (len === void 0) {
    len = 6;
  }
  var seed = 'abcdefhijkmnprstwxyz0123456789',
    maxPos = seed.length;
  var rtn = '';
  for (var i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/dom.ts":
/*!****************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/utils/dom.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dragable: function() { return /* binding */ dragable; },
/* harmony export */   getPosition: function() { return /* binding */ getPosition; }
/* harmony export */ });
function getPosition(ele, relativeDom) {
  var scrollBarTop = document.body.scrollTop || document.documentElement.scrollTop;
  var scrollBarLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
  if (relativeDom) {
    var currPo = ele.getBoundingClientRect();
    var targetPo = relativeDom.getBoundingClientRect();
    return {
      x: currPo.left - targetPo.left + scrollBarLeft,
      y: currPo.top - targetPo.top + scrollBarTop,
      w: ele.offsetWidth,
      h: ele.offsetHeight
    };
  } else {
    var po = ele.getBoundingClientRect();
    return {
      x: po.left + scrollBarLeft,
      y: po.top + scrollBarTop,
      w: ele.offsetWidth,
      h: ele.offsetHeight
    };
  }
}
function dragable(e, dragingFn, options) {
  var doc = (options === null || options === void 0 ? void 0 : options.document) || document;
  var dom = e.currentTarget,
    w = dom.offsetWidth,
    h = dom.offsetHeight,
    relDom = arguments.length == 3 && options && options['relDom'],
    po = getPosition(dom, relDom),
    parentPo = relDom ? getPosition(relDom) : {
      x: 0,
      y: 0
    };
  var scrollBarTop = document.body.scrollTop || document.documentElement.scrollTop;
  var scrollBarLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
  var odx = e.pageX - po.x,
    ody = e.pageY - po.y;
  var x, y, ex, ey;
  var state;
  if (dragingFn) {
    var handleMouseMove_1 = function handleMouseMove_1(e) {
      var adx = e.pageX - odx,
        ady = e.pageY - ody;
      var dx = adx - x,
        dy = ady - y;
      x = e.pageX - odx;
      y = e.pageY - ody;
      ex = e.pageX - parentPo.x - scrollBarLeft;
      ey = e.pageY - parentPo.y - scrollBarTop;
      if (state === 'finish') {
        dragingFn({
          po: {
            x: x,
            y: y
          },
          epo: {
            ex: ex,
            ey: ey
          },
          dpo: {
            dx: 0,
            dy: 0
          },
          adpo: {
            adx: adx,
            ady: ady
          },
          targetStyle: {
            x: po.x,
            y: po.y,
            w: w,
            h: h
          }
        }, state, dom);
      } else {
        if (dx != 0 || dy != 0) {
          state = state ? 'ing' : 'start';
          dragingFn({
            po: {
              x: x,
              y: y
            },
            epo: {
              ex: ex,
              ey: ey
            },
            dpo: {
              dx: dx,
              dy: dy
            },
            adpo: {
              adx: adx,
              ady: ady
            },
            targetStyle: {
              x: po.x,
              y: po.y,
              w: w,
              h: h
            }
          }, state, dom);
        }
      }
    };
    var moving_1 = false;
    doc.onmousemove = function (e) {
      if (!moving_1) {
        moving_1 = true;
      }
      try {
        handleMouseMove_1(e);
      } catch (ex) {
        console.error(ex);
      }
    };
    doc.onmouseup = function (e) {
      state = 'finish';
      handleMouseMove_1(e);
      doc.onmousemove = null;
      doc.onmouseup = null;
    };
  } else {
    return po;
  }
}

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/index.ts":
/*!******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/utils/index.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dragable: function() { return /* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_1__.dragable; },
/* harmony export */   getPosition: function() { return /* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_1__.getPosition; },
/* harmony export */   isNumber: function() { return /* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_2__.isNumber; },
/* harmony export */   uuid: function() { return /* reexport safe */ _basic__WEBPACK_IMPORTED_MODULE_0__.uuid; }
/* harmony export */ });
/* harmony import */ var _basic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basic */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/basic.ts");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/dom.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type */ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/type.ts");




/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/utils/type.ts":
/*!*****************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/utils/type.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNumber: function() { return /* binding */ isNumber; }
/* harmony export */ });
/**
 * 数字
 * @param   value 任意值
 * @returns boolean
 */
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.less":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.less ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".resizable-89d47 {\n  position: relative;\n}\n.resizer-r-10282 {\n  position: absolute;\n  height: 100%;\n  width: 3px;\n  top: 0;\n  right: 0;\n  pointer-events: auto;\n  border-radius: 10px;\n  z-index: 1000;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.resizer-r-10282:hover {\n  cursor: ew-resize !important;\n}\n.resizer-b-a7a09 {\n  position: absolute;\n  width: 100%;\n  height: 3px;\n  left: 0;\n  bottom: 0;\n  pointer-events: auto;\n  border-radius: 10px;\n  z-index: 1000;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.resizer-b-a7a09:hover {\n  cursor: ns-resize !important;\n  background-color: rgba(250, 100, 0, 0.8);\n}\n", ""]);
// Exports
exports.locals = {
	"resizable": "resizable-89d47",
	"resizer-r": "resizer-r-10282",
	"resizer-b": "resizer-b-a7a09"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/edit.less":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/edit.less ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".draggingTipW-182c9 {\n  position: absolute;\n  z-index: 999;\n  color: #FA6400;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  mix-blend-mode: difference;\n  height: 18px;\n  width: 100%;\n  inset: 0;\n  top: 50%;\n  border-bottom-width: 1px;\n  margin-top: -9px;\n}\n.draggingTipW-182c9.dashed-48308.draggingTipW-182c9.dashed-48308::after {\n  border-style: dashed;\n}\n.draggingTipW-182c9.dashed-48308.draggingTipW-182c9.dashed-48308::before {\n  border-style: dashed;\n}\n.draggingTipW-182c9.draggingTipW-182c9::after {\n  content: '';\n  flex: 1;\n  border: 0px solid #FA6400;\n  border-bottom-width: 1px;\n  margin: 0px 10px;\n}\n.draggingTipW-182c9.draggingTipW-182c9::before {\n  content: '';\n  flex: 1;\n  border: 0px solid #FA6400;\n  border-bottom-width: 1px;\n  margin: 0px 5px;\n}\n.resizeW-7bddf {\n  width: 4px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: -2px;\n  background-color: transparent;\n  z-index: 10000;\n  border-radius: 20px;\n  cursor: ew-resize !important;\n  pointer-events: auto !important;\n}\n.resizeW-7bddf:hover {\n  visibility: visible;\n  background-color: #FA6400 !important;\n}\n.draggingTipH-4fa1a {\n  position: absolute;\n  z-index: 999;\n  color: #FA6400;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  mix-blend-mode: difference;\n  flex-direction: column;\n  inset: 0;\n  width: 30px;\n  height: 100%;\n  left: 50%;\n  margin-left: -15px;\n  border-left-width: 1px;\n}\n.draggingTipH-4fa1a.dashed-48308.draggingTipH-4fa1a.dashed-48308::after {\n  border-style: dashed;\n}\n.draggingTipH-4fa1a.dashed-48308.draggingTipH-4fa1a.dashed-48308::before {\n  border-style: dashed;\n}\n.draggingTipH-4fa1a.draggingTipH-4fa1a::after {\n  content: '';\n  flex: 1;\n  border: 0px solid #FA6400;\n  border-left-width: 1px;\n  margin: 0px 10px;\n}\n.draggingTipH-4fa1a.draggingTipH-4fa1a::before {\n  content: '';\n  flex: 1;\n  border: 0px solid #FA6400;\n  border-left-width: 1px;\n  margin: 0px 5px;\n}\n.resizeH-986a3 {\n  height: 4px;\n  width: 100%;\n  position: absolute;\n  left: 0;\n  bottom: -2px;\n  border-radius: 20px;\n  background-color: transparent;\n  z-index: 10000;\n  cursor: ns-resize !important;\n  pointer-events: auto !important;\n}\n.resizeH-986a3:hover {\n  visibility: visible;\n  background-color: #FA6400 !important;\n}\n", ""]);
// Exports
exports.locals = {
	"draggingTipW": "draggingTipW-182c9",
	"dashed": "dashed-48308",
	"resizeW": "resizeW-7bddf",
	"draggingTipH": "draggingTipH-4fa1a",
	"resizeH": "resizeH-986a3"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.less":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.less ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".layout-07394 {\n  display: block;\n}\n.row-13132 {\n  display: flex !important;\n  position: relative !important;\n  box-sizing: border-box;\n}\n.row-13132:not(:first-of-type) {\n  margin-top: -1px;\n}\n.col-27f3b {\n  position: relative;\n  box-sizing: border-box;\n  overflow-x: hidden;\n  overflow-y: hidden;\n}\n.col-27f3b:not(:first-of-type) {\n  margin-left: -1px;\n}\n.resizable-25bb5 {\n  position: relative;\n  border-right: 1px solid rgba(221, 221, 221, 0.8);\n}\n.resizer-dda2c {\n  width: 4px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: -2px;\n  z-index: 2;\n  cursor: col-resize;\n  pointer-events: auto !important;\n}\n.resizer-dda2c:hover {\n  border-radius: 20px;\n  background-color: rgba(221, 221, 221, 0.8);\n}\n", ""]);
// Exports
exports.locals = {
	"layout": "layout-07394",
	"row": "row-13132",
	"col": "col-27f3b",
	"resizable": "resizable-25bb5",
	"resizer": "resizer-dda2c"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.less":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.less ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".mask-6401f {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.45);\n  z-index: 1000;\n}\n.debugMask-0a81b .ant-drawer {\n  position: absolute;\n}\n.antdDrawer-4d989 {\n  background-color: rgba(0, 0, 0, 0.45);\n}\n.antdDrawer-4d989 .ant-drawer {\n  position: unset;\n}\n.footer-btns-b92a0 {\n  margin-left: 8px;\n}\n.toolbar-b5fb8 {\n  flex-direction: row;\n  flex-flow: row wrap;\n  display: flex;\n}\n.slotContainer-44017 {\n  height: 100%;\n  overflow: auto;\n}\n.mobileFooter-8a617.mobileFooter-8a617 {\n  flex-direction: column-reverse;\n  display: flex;\n  align-items: center;\n}\n.mobileFooter-8a617.mobileFooter-8a617 button {\n  width: 100%;\n  margin: 4px 0px !important;\n}\n", ""]);
// Exports
exports.locals = {
	"mask": "mask-6401f",
	"debugMask": "debugMask-0a81b",
	"antdDrawer": "antdDrawer-4d989",
	"footer-btns": "footer-btns-b92a0",
	"toolbar": "toolbar-b5fb8",
	"slotContainer": "slotContainer-44017",
	"mobileFooter": "mobileFooter-8a617"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.less":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.less ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".col-44c0e {\n  height: 100%;\n  overflow: hidden;\n}\n", ""]);
// Exports
exports.locals = {
	"col": "col-44c0e"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.less":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.less ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".layout-c150e {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
// Exports
exports.locals = {
	"layout": "layout-c150e"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.less":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.less ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".row-f6e58 {\n  display: flex;\n  flex-flow: row nowrap;\n  position: relative;\n  align-items: stretch;\n}\n", ""]);
// Exports
exports.locals = {
	"row": "row-f6e58"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.less":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.less ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".draggingTipW-2ed2e {\n  position: absolute;\n  z-index: 1000;\n  color: #FA6400;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-style: oblique;\n  mix-blend-mode: difference;\n  height: 18px;\n  width: 100%;\n  inset: 0;\n  top: 50%;\n  border-bottom-width: 1px;\n  margin-top: -9px;\n}\n.draggingTipW-2ed2e.dashed-b79db.draggingTipW-2ed2e.dashed-b79db::after {\n  border-style: dashed;\n}\n.draggingTipW-2ed2e.dashed-b79db.draggingTipW-2ed2e.dashed-b79db::before {\n  border-style: dashed;\n}\n.draggingTipW-2ed2e.draggingTipW-2ed2e::after {\n  content: \"\";\n  flex: 1;\n  border: 0px solid #FA6400;\n  border-bottom-width: 1px;\n  margin: 0 10px;\n}\n.draggingTipW-2ed2e.draggingTipW-2ed2e::before {\n  content: \"\";\n  flex: 1;\n  border: 0px solid #FA6400;\n  border-bottom-width: 1px;\n  margin: 0 10px;\n}\n.draggingTipH-704dc {\n  position: absolute;\n  z-index: 1000;\n  color: #FA6400;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-style: oblique;\n  mix-blend-mode: difference;\n  flex-direction: column;\n  inset: 0;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: 100%;\n  left: 50%;\n  margin-left: -20px;\n  border-left-width: 1px;\n}\n.draggingTipH-704dc.dashed-b79db.draggingTipH-704dc.dashed-b79db::after {\n  border-style: dashed;\n}\n.draggingTipH-704dc.dashed-b79db.draggingTipH-704dc.dashed-b79db::before {\n  border-style: dashed;\n}\n.draggingTipH-704dc.draggingTipH-704dc::after {\n  content: '';\n  flex: 1;\n  border: 0px solid #FA6400;\n  border-left-width: 1px;\n  margin: 10px 0;\n}\n.draggingTipH-704dc.draggingTipH-704dc::before {\n  content: '';\n  flex: 1;\n  border: 0px solid #FA6400;\n  border-left-width: 1px;\n  margin: 10px 0;\n}\n.dragging-8e076 {\n  background-color: rgba(250, 100, 0, 0.2) !important;\n  mix-blend-mode: difference;\n}\n.hover-8c4fc {\n  background-color: rgba(250, 100, 0, 0.8);\n}\n.table-96ec2 {\n  width: 100%;\n}\n", ""]);
// Exports
exports.locals = {
	"draggingTipW": "draggingTipW-2ed2e",
	"dashed": "dashed-b79db",
	"draggingTipH": "draggingTipH-704dc",
	"dragging": "dragging-8e076",
	"hover": "hover-8c4fc",
	"table": "table-96ec2"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.less":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.less ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".resizer-6a895 {\n  width: 2px;\n  right: -1px;\n  background-color: rgba(221, 221, 221, 0.8);\n  z-index: 10;\n}\n.resizer-6a895:hover {\n  border-radius: 20px;\n  background-color: #dddddd;\n}\n", ""]);
// Exports
exports.locals = {
	"resizer": "resizer-6a895"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.less":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.less ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".mask-02c99 {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.45);\n  z-index: 1000;\n}\n.mask-02c99 .ant-modal-wrap {\n  position: absolute;\n}\n.container-35eba .ant-modal-close {\n  position: absolute !important;\n}\n.container-35eba .ant-modal-title {\n  margin-right: 30px;\n}\n.container-35eba .ant-modal-header {\n  padding: 16px 24px;\n  border-bottom: 1px solid #f0f0f0;\n  background: unset;\n}\n.container-35eba .ant-modal-body {\n  padding: 24px;\n  overflow: auto;\n}\n.container-35eba .ant-modal-footer {\n  padding: 10px 16px;\n  border-top: 1px solid #f0f0f0;\n}\n.container-35eba .ant-modal-footer .toolbar {\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  flex-flow: row wrap;\n}\n.antdMask-021f0 {\n  padding: 50px;\n  background-color: rgba(0, 0, 0, 0.45);\n}\n.antdMask-021f0 .ant-modal-wrap {\n  overflow: unset;\n  position: unset;\n}\n.antdMask-021f0 .ant-modal {\n  top: 0px;\n  padding: unset;\n}\n.debugMask-c8cb6 .ant-modal-mask {\n  position: unset;\n}\n.mobileFooter-ae86b.mobileFooter-ae86b {\n  flex-direction: column-reverse;\n  display: flex;\n  align-items: center;\n}\n.mobileFooter-ae86b.mobileFooter-ae86b button {\n  width: 100%;\n  margin: 4px 0px !important;\n}\n", ""]);
// Exports
exports.locals = {
	"mask": "mask-02c99",
	"container": "container-35eba",
	"antdMask": "antdMask-021f0",
	"debugMask": "debugMask-c8cb6",
	"mobileFooter": "mobileFooter-ae86b"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/css.less":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/css.less ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".rectangle-df783 {\n  border: 1px solid #ccc;\n  width: 100%;\n  height: 100%;\n}\n", ""]);
// Exports
exports.locals = {
	"rectangle": "rectangle-df783"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.less":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.less ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".wrapper-8a799 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.shape-e2741 {\n  flex-grow: 1;\n  aspect-ratio: 1/1;\n  width: 100%;\n  height: 100%;\n  background: #000;\n}\n", ""]);
// Exports
exports.locals = {
	"wrapper": "wrapper-8a799",
	"shape": "shape-e2741"
};
module.exports = exports;


/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.less":
/*!***********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.less ***!
  \***********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./index.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/components/Resizable/index.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/edit.less":
/*!**********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/edit.less ***!
  \**********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./edit.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/edit.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.less":
/*!********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.less ***!
  \********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.less":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.less ***!
  \***********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.less":
/*!**********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.less ***!
  \**********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./index.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Col/index.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.less":
/*!*************************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.less ***!
  \*************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./index.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Layout/index.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.less":
/*!**********************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.less ***!
  \**********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./index.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/components/Row/index.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.less":
/*!*************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.less ***!
  \*************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./edit.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.less":
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.less ***!
  \*********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.less":
/*!**********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.less ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/css.less":
/*!**********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/css.less ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./css.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/css.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.less":
/*!**********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.less ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../.nvm/versions/node/v18.0.0/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_antd__;

/***/ }),

/***/ "@ant-design/icons":
/*!************************!*\
  !*** external "icons" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__ant_design_icons__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_copy/data.json":
/*!*******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_copy/data.json ***!
  \*******************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = {"text":""};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/data.json":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_download/data.json ***!
  \***********************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"nameConfig":0,"filename":""}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/data.json":
/*!*************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/data.json ***!
  \*************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"encryptionAlgorithm":"SM2","encryptionType":"public","cipherMode":1,"BlockCipherModes":1,"iv":"0123456789abcdeffedcba9876543210","inputEncoding":"utf8","outputEncoding":"base64"}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/data.json":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/data.json ***!
  \***********************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = {"type":"object"};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/data.json":
/*!********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/data.json ***!
  \********************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/data.json":
/*!***************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/data.json ***!
  \***************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = {};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/data.json":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/data.json ***!
  \*****************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"encryptionType":"public"}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/data.json":
/*!*******************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/data.json ***!
  \*******************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"arrLength":10,"strLength":6,"numberRange":[0,100]}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/data.json":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/data.json ***!
  \*****************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"delay":1000,"isleading":false}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/data.json":
/*!**************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/data.json ***!
  \**************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = {"delay":1000};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/data.json":
/*!*************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/data.json ***!
  \*************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"delay":1000,"immediate":false}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/data.json":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/data.json ***!
  \*****************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = {"delay":1000};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/data.json":
/*!*****************************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/data.json ***!
  \*****************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"style":{},"rows":[{"key":"row0","height":"auto","heightMode":"auto","style":{"flexDirection":"row","position":"relative","display":"flex","flexWrap":"wrap","justifyContent":"flex-start","alignItems":"flex-start"},"cols":[{"key":"col0","width":300,"widthMode":"auto","span":12},{"key":"col1","width":300,"widthMode":"auto","span":12}]}]}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/data.json":
/*!********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/data.json ***!
  \********************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"title":"抽屉","hideTitle":false,"width":520,"height":800,"placement":"right","useFooter":true,"footerLayout":"flex-end","footerBtns":[{"id":"cancel","title":"取消","icon":"","useIcon":false,"showText":true,"dynamicHidden":true,"dynamicDisabled":true,"type":"default","visible":true,"autoClose":true,"isConnected":false,"useDynamicDisabled":false,"useDynamicHidden":false,"disabled":false},{"id":"ok","title":"确认","type":"primary","icon":"","dynamicHidden":true,"dynamicDisabled":true,"useIcon":false,"showText":true,"visible":true,"autoClose":true,"isConnected":false,"useDynamicDisabled":false,"useDynamicHidden":false,"disabled":false}],"closable":true,"maskClosable":true,"isTitleCustom":false,"keyboard":true}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/data.json":
/*!******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/data.json ***!
  \******************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"rows":[{"key":"row0","height":"auto","heightMode":"auto","cols":[{"key":"col0","width":50,"widthMode":"auto","slotStyle":{"display":"flex","position":"inherit","flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","flexWrap":"nowrap","overflow":"inherit"}},{"key":"col1","width":50,"widthMode":"auto","slotStyle":{"display":"flex","position":"inherit","flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","flexWrap":"nowrap","overflow":"inherit"}}]}]}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/data.json":
/*!*******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/data.json ***!
  \*******************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"title":"对话框","hideTitle":false,"centered":false,"width":520,"useFooter":true,"footerLayout":"flex-end","footerBtns":[{"id":"cancel","title":"取消","icon":"","useIcon":false,"showText":true,"dynamicHidden":true,"dynamicDisabled":true,"type":"default","visible":true,"autoClose":true,"isConnected":false,"useDynamicDisabled":false,"useDynamicHidden":false,"disabled":false},{"id":"ok","title":"确认","type":"primary","icon":"","dynamicHidden":true,"dynamicDisabled":true,"useIcon":false,"showText":true,"visible":true,"autoClose":true,"isConnected":false,"useDynamicDisabled":false,"useDynamicHidden":false,"disabled":false}],"closable":true,"maskClosable":true,"isTitleCustom":false,"keyboard":true}');

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/data.json":
/*!***********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/data.json ***!
  \***********************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = {"asSlot":false};

/***/ }),

/***/ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/data.json":
/*!*******************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/data.json ***!
  \*******************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"type":"circle","position":0,"clipPath":"polygon(50% 0%, 0% 100%, 100% 100%)"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************************************************************************!*\
  !*** ../../../../../../../../Kuai/workplace/comlib-basic/.temp-pub/entryEdt.js ***!
  \*********************************************************************************/
var comlibEdt = window['__comlibs_edit_'];
if (!comlibEdt) {
  comlibEdt = window['__comlibs_edit_'] = [];
}
var comAray = [];
comlibEdt.push({
  id: '7182',
  title: '基础组件库',
  author: 'Fangzhou Team',
  icon: '',
  version: '1.0.75',
  namespace: 'mybricks.basic-comlib',
  comAray: comAray
});
var comDef;
comDef = {
  "title": "矩形",
  "namespace": "mybricks.basic-comlib.rectangle",
  "author": "CheMingjun",
  "author_name": "CheMingjun",
  "version": "1.0.0",
  "description": "矩形",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "setStyle",
    "title": "设置样式",
    "schema": {
      "type": "string"
    }
  }, {
    "id": "rotate",
    "title": "旋转",
    "schema": {
      "type": "number"
    },
    "rels": ["rotateCompleted"]
  }],
  "outputs": [{
    "id": "click",
    "title": "点击",
    "schema": {
      "type": "string"
    }
  }, {
    "id": "rotateCompleted",
    "title": "旋转完成",
    "schema": {
      "type": "boolean"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/runtime.tsx")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/editors.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/editors.tsx")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/rectangle/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "形状",
  "namespace": "mybricks.normal-pc.shape",
  "version": "1.0.2",
  "description": "形状",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2250%22%20fill%3D%22%23555555%22%2F%3E%0A%3C%2Fsvg%3E%0A",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.tsx",
  "upgrade": "./upgrade.ts",
  "inputs": [{
    "id": "setStyle",
    "title": "动态设置样式",
    "schema": {
      "type": "object",
      "properties": {
        "background": {
          "type": "string"
        }
      }
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/runtime.tsx")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/editors.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/editors.tsx")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/data.json");
comDef.upgrade = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/shape/upgrade.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/shape/upgrade.ts")["default"]);
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "对话框",
  "visibility": false,
  "namespace": "mybricks.basic-comlib.popup",
  "author": "CheMingjun",
  "author_name": "车明君",
  "version": "1.0.22",
  "description": "对话框",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.ts",
  "upgrade": "./upgrade.ts",
  "slots": [{
    "id": "body",
    "title": "内容"
  }],
  "inputs": [{
    "id": "title",
    "title": "修改标题",
    "schema": {
      "type": "string"
    }
  }],
  "outputs": [{
    "id": "ok",
    "title": "确定"
  }, {
    "id": "cancel",
    "title": "取消"
  }, {
    "id": "apply",
    "title": "应用",
    "schema": {
      "type": "follow"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/runtime.tsx")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/editors.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/data.json");
comDef.upgrade = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/popup/upgrade.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/popup/upgrade.ts")["default"]);
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "抽屉",
  "visibility": false,
  "namespace": "mybricks.basic-comlib.drawer",
  "author": "HuangQiuyun",
  "author_name": "黄秋云",
  "version": "1.0.10",
  "description": "抽屉",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.ts",
  "upgrade": "./upgrade.ts",
  "slots": [{
    "id": "body",
    "title": "内容"
  }],
  "inputs": [{
    "id": "title",
    "title": "修改标题",
    "schema": {
      "type": "string"
    }
  }],
  "outputs": [{
    "id": "ok",
    "title": "确定"
  }, {
    "id": "cancel",
    "title": "取消"
  }, {
    "id": "apply",
    "title": "应用",
    "schema": {
      "type": "follow"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/runtime.tsx")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/editors.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/data.json");
comDef.upgrade = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/upgrade.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/drawer/upgrade.ts")["default"]);
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "布局",
  "visibility": false,
  "namespace": "mybricks.basic-comlib.dragable-layout",
  "author": "tangxiaoxin",
  "author_name": "tangxiaoxin",
  "version": "1.0.7",
  "description": "布局",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221690882687121%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222344%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M896%20341.333333V256a128%20128%200%200%200-128-128H256a128%20128%200%200%200-128%20128v85.333333zM128%20426.666667v341.333333a128%20128%200%200%200%20128%20128h213.333333V426.666667zM554.666667%20426.666667v469.333333h213.333333a128%20128%200%200%200%20128-128v-341.333333z%22%20p-id%3D%222345%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "runtime": "./runtime.tsx",
  "runtime.edit": "./edit/runtime.tsx",
  "data": "./data.json",
  "editors": "./edit/index.ts",
  "inputs": [{
    "id": "setWidth",
    "title": "设置列宽",
    "schema": {
      "type": "object",
      "properties": {
        "coordinate": {
          "title": "列坐标",
          "type": "enum",
          "items": [{
            "type": "number"
          }, {
            "type": "number"
          }]
        },
        "width": {
          "title": "宽度",
          "type": "string"
        }
      }
    },
    "desc": "设置布局列宽度，如[1,2]表示第一行第二列"
  }],
  "slots": [{
    "id": "col0",
    "title": "列（竖向排列）"
  }, {
    "id": "col1",
    "title": "列（竖向排列）"
  }],
  "outputs": [{
    "id": "col0",
    "title": "列点击"
  }, {
    "id": "col1",
    "title": "列点击"
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/runtime.tsx")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/index.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/index.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/data.json");
undefined;
undefined;
undefined;
comDef['runtime.edit'] = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/dragable-layout/edit/runtime.tsx")["default"]);
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "类型转换",
  "namespace": "mybricks.core-comlib.type-change",
  "author": "CheMingjun",
  "author_name": "车明君",
  "version": "1.0.0",
  "description": "类型转换",
  "icon": "data:image/svg+xml,%3Csvg%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2229627%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Cpath%20d%3D%22M821.9%20442.3c15.6%200%2029.6-9.4%2035.6-23.8s2.7-31-8.3-42L672.8%20200.1c-5.8-5.8-15.3-5.8-21.1%200l-33.4%2033.4c-5.8%205.8-5.8%2015.3%200%2021.1l110.6%20110.6H170.6c-8.2%200-14.8%206.6-14.8%2014.8v47.5c0%208.1%206.6%2014.8%2014.8%2014.8h651.3z%20m29.8%20139H200.6c-15.6%200-29.6%209.4-35.6%2023.8s-2.7%2031%208.3%2042l176.4%20176.4c5.8%205.8%2015.3%205.8%2021.1%200l33.4-33.4c5.8-5.8%205.8-15.3%200-21.1L293.6%20658.4h558.1c8.3%200%2014.9-6.7%2014.9-14.9v-47.1c0.1-8.4-6.6-15.1-14.9-15.1z%20m0%200%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "runtime": "./rt.tsx",
  "editors": "./editors.tsx",
  "rtType": "js",
  "inputs": [{
    "id": "from",
    "title": "从",
    "schema": {
      "type": "follow"
    },
    "rels": ["to"]
  }],
  "outputs": [{
    "id": "to",
    "title": "到",
    "schema": {
      "type": "follow"
    },
    "conMax": 1,
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_type-change/rt.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_type-change/rt.tsx")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_type-change/editors.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_type-change/editors.tsx")["default"]);
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "构造数据",
  "namespace": "mybricks.basic-comlib._get-data",
  "version": "1.0.0",
  "description": "生成数据",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2233945%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Cpath%20d%3D%22M213.333333%20128h85.333334v85.333333H213.333333v213.333334a85.333333%2085.333333%200%200%201-85.333333%2085.333333%2085.333333%2085.333333%200%200%201%2085.333333%2085.333333v213.333334h85.333334v85.333333H213.333333c-45.653333-11.52-85.333333-38.4-85.333333-85.333333v-170.666667a85.333333%2085.333333%200%200%200-85.333333-85.333333H0v-85.333334h42.666667a85.333333%2085.333333%200%200%200%2085.333333-85.333333V213.333333a85.333333%2085.333333%200%200%201%2085.333333-85.333333m597.333334%200a85.333333%2085.333333%200%200%201%2085.333333%2085.333333v170.666667a85.333333%2085.333333%200%200%200%2085.333333%2085.333333h42.666667v85.333334h-42.666667a85.333333%2085.333333%200%200%200-85.333333%2085.333333v170.666667a85.333333%2085.333333%200%200%201-85.333333%2085.333333h-85.333334v-85.333333h85.333334v-213.333334a85.333333%2085.333333%200%200%201%2085.333333-85.333333%2085.333333%2085.333333%200%200%201-85.333333-85.333333V213.333333h-85.333334V128h85.333334m-298.666667%20512a42.666667%2042.666667%200%200%201%2042.666667%2042.666667%2042.666667%2042.666667%200%200%201-42.666667%2042.666666%2042.666667%2042.666667%200%200%201-42.666667-42.666666%2042.666667%2042.666667%200%200%201%2042.666667-42.666667m-170.666667%200a42.666667%2042.666667%200%200%201%2042.666667%2042.666667%2042.666667%2042.666667%200%200%201-42.666667%2042.666666%2042.666667%2042.666667%200%200%201-42.666666-42.666666%2042.666667%2042.666667%200%200%201%2042.666666-42.666667m341.333334%200a42.666667%2042.666667%200%200%201%2042.666666%2042.666667%2042.666667%2042.666667%200%200%201-42.666666%2042.666666%2042.666667%2042.666667%200%200%201-42.666667-42.666666%2042.666667%2042.666667%200%200%201%2042.666667-42.666667z%22%20fill%3D%22%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "rtType": "js-autorun",
  "inputs": [{
    "id": "input",
    "title": "获取",
    "schema": {
      "type": "any"
    },
    "rels": ["result"]
  }],
  "outputs": [{
    "id": "result",
    "title": "输出",
    "schema": {
      "type": "object"
    },
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/editors.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_get-data/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "JS计算",
  "namespace": "mybricks.basic-comlib._muilt-inputJs",
  "version": "1.0.2",
  "description": "JS计算",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20class%3D%22icon%22%20viewBox%3D%220%200%201025%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2234100%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Cpath%20d%3D%22M1024%20627.2c-12.8-70.4-57.6-131.2-195.2-185.6-48-22.4-99.2-38.4-115.2-73.6-6.4-22.4-6.4-32-3.2-44.8%209.6-41.6%2057.6-54.4%2099.2-41.6%2025.6%206.4%2048%2025.6%2064%2057.6%2067.2-44.8%2067.2-44.8%20112-73.6-16-25.6-25.6-38.4-38.4-51.2-41.6-44.8-96-67.2-182.4-67.2l-44.8%206.4c-44.8%209.6-86.4%2035.2-112%2064-73.6%2083.2-51.2%20227.2%2035.2%20288%2089.6%2067.2%20217.6%2080%20233.6%20140.8%2016%2076.8-57.6%2099.2-128%2089.6-51.2-12.8-80-38.4-112-86.4l-118.4%2067.2c12.8%2032%2028.8%2044.8%2051.2%2070.4%20112%20112%20395.2%20108.8%20446.4-64%203.2-6.4%2016-44.8%206.4-105.6-1.6%206.4%201.6%209.6%201.6%209.6zM440%20158.4h-144v376c0%2080%203.2%20153.6-9.6%20176-22.4%2044.8-76.8%2038.4-102.4%2032C156.8%20729.6%20144%20713.6%20128%20688c-3.2-9.6-6.4-16-6.4-16L3.2%20745.6c19.2%2041.6%2048%2076.8%2086.4%2099.2%2054.4%2032%20128%2044.8%20208%2025.6%2051.2-16%2092.8-44.8%20118.4-89.6%2032-60.8%2025.6-134.4%2025.6-217.6V161.6c-1.6%200-1.6-3.2-1.6-3.2z%22%20fill%3D%22%23707070%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "ai": "./ai.ts",
  "rtType": "js-autorun",
  "inputs": [{
    "id": "input",
    "title": "输入项",
    "schema": [{
      "name": "inputValue0",
      "title": "参数0",
      "type": "follow"
    }]
  }],
  "outputs": [{
    "id": "output0",
    "title": "输出项0",
    "schema": {
      "type": "number"
    },
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/editors.ts")["default"]);
undefined;
undefined;
undefined;
undefined;
undefined;
comDef.ai = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/ai.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_muilt-inputJs/ai.ts")["default"]);
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "延迟执行",
  "namespace": "mybricks.normal-pc.timer-delay",
  "version": "1.0.0",
  "rtType": "js",
  "description": "延迟执行",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20t%3D%221629808038012%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20p-id%3D%222123%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%2F%3E%3C%2Fdefs%3E%3Cpath%20d%3D%22M542.117647%20121.976471V60.235294h90.352941V0h-240.941176v60.235294H481.882353v61.741177c-235.038118%2015.661176-421.647059%20211.305412-421.647059%20450.258823C60.235294%20821.368471%20262.866824%201024%20512%201024S963.764706%20821.368471%20963.764706%20572.235294c0-238.953412-186.608941-434.597647-421.647059-450.258823zM512%20963.764706C296.116706%20963.764706%20120.470588%20788.118588%20120.470588%20572.235294S296.116706%20180.705882%20512%20180.705882%20903.529412%20356.352%20903.529412%20572.235294%20727.883294%20963.764706%20512%20963.764706zM542.117647%20542.117647h240.941177v60.235294H481.882353V361.411765h60.235294v180.705882z%22%20p-id%3D%222124%22%20fill%3D%22%23555555%22%2F%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "trigger",
    "title": "触发",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "trigger",
    "title": "执行",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/editors.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/editors.tsx")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-delay/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "循环执行",
  "namespace": "mybricks.normal-pc.timer-loop",
  "version": "1.0.0",
  "rtType": "js",
  "description": "循环执行",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221663849830120%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222843%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M192%20789.333333a21.24%2021.24%200%200%201-12.8-4.28%20344.513333%20344.513333%200%200%201-99.333333-118A341.246667%20341.246667%200%200%201%20384%20170.666667h256q6.36%200%2012.733333%200.233333l-49.153333-49.146667a21.333333%2021.333333%200%200%201%2030.173333-30.173333l85.333334%2085.333333a21.333333%2021.333333%200%200%201%200%2030.173334l-85.333334%2085.333333a21.333333%2021.333333%200%200%201-30.173333-30.173333l48.666667-48.666667Q646.126667%20213.333333%20640%20213.333333H384c-164.666667%200-298.666667%20134-298.666667%20298.666667%200%2094.833333%2043.546667%20181.933333%20119.48%20238.966667A21.333333%2021.333333%200%200%201%20192%20789.333333z%20m228.433333%20143.06a21.333333%2021.333333%200%200%200%200-30.173333l-49.153333-49.146667q6.366667%200.233333%2012.733333%200.233334H640a341.46%20341.46%200%200%200%20304.146667-496.42%20344.513333%20344.513333%200%200%200-99.333334-118%2021.333333%2021.333333%200%201%200-25.626666%2034.113333C895.12%20330.066667%20938.666667%20417.166667%20938.666667%20512c0%20164.666667-134%20298.666667-298.666667%20298.666667H384q-6.12%200-12.246667-0.246667l48.666667-48.666667a21.333333%2021.333333%200%200%200-30.173333-30.173333l-85.333334%2085.333333a21.333333%2021.333333%200%200%200%200%2030.173334l85.333334%2085.333333a21.333333%2021.333333%200%200%200%2030.173333%200zM768%20512c0-70.58-57.42-128-128-128-33.546667%200-70.666667%2013.38-99.246667%2035.78a146.466667%20146.466667%200%200%200-28.753333%2029.6%20146.466667%20146.466667%200%200%200-28.753333-29.6C454.666667%20397.38%20417.546667%20384%20384%20384c-70.58%200-128%2057.42-128%20128s57.42%20128%20128%20128c33.546667%200%2070.666667-13.38%2099.246667-35.78a146.466667%20146.466667%200%200%200%2028.753333-29.6%20146.466667%20146.466667%200%200%200%2028.753333%2029.6C569.333333%20626.62%20606.453333%20640%20640%20640c70.58%200%20128-57.42%20128-128z%20m-42.666667%200a85.426667%2085.426667%200%200%201-85.333333%2085.333333c-48%200-106.666667-39.373333-106.666667-85.333333s58.666667-85.333333%20106.666667-85.333333a85.426667%2085.426667%200%200%201%2085.333333%2085.333333z%20m-234.666666%200c0%2045.96-58.666667%2085.333333-106.666667%2085.333333a85.333333%2085.333333%200%200%201%200-170.666666c48%200%20106.666667%2039.373333%20106.666667%2085.333333z%22%20fill%3D%22%23555555%22%20p-id%3D%222844%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "trigger",
    "title": "触发",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "trigger",
    "title": "执行",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/editors.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/editors.tsx")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-loop/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "防抖",
  "namespace": "mybricks.normal-pc.timer-debounce",
  "version": "1.0.1",
  "rtType": "js",
  "description": "防抖",
  "author": "HuangQiuyun",
  "author_name": "黄秋云",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221678173929706%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%228323%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M778.666667%20576h-42.666667a53.333333%2053.333333%200%200%201%200-106.666667h42.666667a53.333333%2053.333333%200%200%201%200%20106.666667zM970.666667%20576h-42.666667a53.333333%2053.333333%200%200%201%200-106.666667h42.666667a53.333333%2053.333333%200%200%201%200%20106.666667z%22%20fill%3D%22%23555555%22%20p-id%3D%228324%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M170.709333%20864.042667a53.333333%2053.333333%200%200%201-47.488-28.970667%20662.826667%20662.826667%200%200%201-66.389333-335.146667%20546.133333%20546.133333%200%200%201%20115.669333-320.896l2.090667-2.304a66.602667%2066.602667%200%200%201%2070.272-21.333333c40.704%2012.8%2053.973333%2057.728%2066.005333%20110.677333%2010.752%2047.189333%2023.253333%20120.874667%2040.576%20238.933334a481.109333%20481.109333%200%200%200%2020.736%2091.221333%20415.36%20415.36%200%200%200%2023.125334-91.562667c8.533333-55.168%2021.802667-115.2%2073.002666-128a75.562667%2075.562667%200%200%201%2073.557334%2024.448%20311.893333%20311.893333%200%200%201%2030.250666%2036.693334c5.205333%206.997333%2013.269333%2017.834667%2018.474667%2023.424a53.333333%2053.333333%200%200%201-14.549333%20104.661333%2098.133333%2098.133333%200%200%201-75.221334-45.653333v0.426666a476.928%20476.928%200%200%201-37.717333%20133.504c-29.269333%2059.733333-66.218667%2072.149333-92.16%2072.149334h-0.256c-25.344%200-61.226667-12.074667-88.32-68.821334a497.664%20497.664%200%200%201-36.352-137.173333c-6.058667-41.344-20.48-139.349333-34.133333-207.786667a555.946667%20555.946667%200%200%200%206.357333%20473.6%2053.333333%2053.333333%200%200%201-47.402667%2077.738667z%22%20fill%3D%22%23555555%22%20p-id%3D%228325%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.tsx",
  "upgrade": "./upgrade.ts",
  "inputs": [{
    "id": "trigger",
    "title": "触发",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "trigger",
    "title": "执行",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/editors.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/editors.tsx")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/data.json");
comDef.upgrade = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/upgrade.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-debounce/upgrade.ts")["default"]);
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "节流",
  "namespace": "mybricks.normal-pc.timer-throttle",
  "version": "1.0.0",
  "rtType": "js",
  "description": "节流",
  "author": "HuangQiuyun",
  "author_name": "黄秋云",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221678174141177%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%228900%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M512%20962.56c249.856%200%20450.56-200.704%20450.56-450.56S761.856%2061.44%20512%2061.44%2061.44%20262.144%2061.44%20512s200.704%20450.56%20450.56%20450.56z%20m0-53.248C292.864%20909.312%20114.688%20731.136%20114.688%20512S292.864%20114.688%20512%20114.688%20909.312%20292.864%20909.312%20512%20731.136%20909.312%20512%20909.312z%22%20fill%3D%22%23555555%22%20p-id%3D%228901%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M856.064%20512c0%2014.336-12.288%2026.624-26.624%2026.624s-26.624-12.288-26.624-26.624c0-161.792-131.072-290.816-290.816-290.816-14.336%200-26.624-12.288-26.624-26.624s12.288-26.624%2026.624-26.624c190.464%200%20344.064%20153.6%20344.064%20344.064zM167.936%20512c0-14.336%2012.288-26.624%2026.624-26.624s26.624%2012.288%2026.624%2026.624c0%20161.792%20131.072%20290.816%20290.816%20290.816%2014.336%200%2026.624%2012.288%2026.624%2026.624s-12.288%2026.624-26.624%2026.624c-190.464%200-344.064-153.6-344.064-344.064z%22%20fill%3D%22%23555555%22%20p-id%3D%228902%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M194.56%20485.376h636.928c18.432%200%2026.624%208.192%2026.624%2026.624s-8.192%2026.624-26.624%2026.624H194.56c-18.432%200-26.624-8.192-26.624-26.624s8.192-26.624%2026.624-26.624z%22%20fill%3D%22%23555555%22%20p-id%3D%228903%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M405.504%20512c0%2059.392%2047.104%20106.496%20106.496%20106.496s106.496-47.104%20106.496-106.496-47.104-106.496-106.496-106.496-106.496%2047.104-106.496%20106.496z%22%20fill%3D%22%23555555%22%20p-id%3D%228904%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "trigger",
    "title": "触发",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "trigger",
    "title": "执行",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/editors.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/editors.tsx")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_timer-throttle/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "数据合并",
  "namespace": "mybricks.normal-pc.data.merge",
  "version": "1.0.0",
  "rtType": "js",
  "description": "异步数据组合",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221670318352118%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222170%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M260.352%20431.658667C163.669333%20431.658667%2085.333333%20353.706667%2085.333333%20259.285333%2085.333333%20164.906667%20163.669333%2085.333333%20260.352%2085.333333c96.64%200%20174.976%2077.866667%20174.976%20173.994667%200%2096.085333-80%20172.288-174.976%20172.288z%20m0-246.912c-41.685333%200-75.008%2033.152-75.008%2074.581333%200%2041.386667%2033.322667%2074.538667%2075.008%2074.538667%2041.642667%200%2074.965333-33.109333%2074.965333-74.538667%200-41.429333-34.986667-74.581333-74.965333-74.581333zM765.354667%20933.717333c-96.682667%200-175.018667-77.909333-175.018667-173.994666%200-96.128%2078.336-172.330667%20174.976-172.330667%2096.682667%200%20175.018667%2077.866667%20175.018667%20173.994667%200%2096.085333-80%20172.330667-175.018667%20172.330666z%20m0-246.912c-41.685333%200-75.008%2033.152-75.008%2074.581334%200%2041.386667%2033.28%2074.538667%2075.008%2074.538666%2041.642667%200%2074.965333-33.109333%2074.965333-74.538666%200-41.429333-34.986667-74.581333-75.008-74.581334z%22%20p-id%3D%222171%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M260.352%20938.666667a48.981333%2048.981333%200%200%201-50.005333-49.706667V386.901333c0-28.16%2021.674667-49.706667%2050.005333-49.706666%2028.330667%200%2049.962667%2021.546667%2049.962667%2049.706666v502.058667c0%2026.496-23.296%2049.706667-49.962667%2049.706667z%22%20p-id%3D%222172%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M640.341333%20811.093333c-331.690667%200-426.666667-280.021333-429.994666-427.52%200-28.16%2021.674667-49.706667%2048.341333-51.370666a51.2%2051.2%200%200%201%2051.626667%2048.085333c0%2013.226667%2013.354667%20329.728%20331.690666%20329.728%2028.330667%200%2050.005333%2021.546667%2050.005334%2049.706667s-23.338667%2051.370667-51.669334%2051.370666z%22%20p-id%3D%222173%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i0%22%20class%3D%22%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "inputs": [{
    "id": "input0",
    "title": "输入项0",
    "schema": {
      "type": "follow"
    }
  }, {
    "id": "input1",
    "title": "输入项1",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "output",
    "title": "输出项",
    "schema": {
      "type": "array",
      "items": {
        "type": "any"
      }
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/editors.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_merge/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "对象合并",
  "namespace": "mybricks.normal-pc.object-merge",
  "version": "1.0.0",
  "rtType": "js",
  "description": "对象合并",
  "author": "Mybricks",
  "author_name": "Mybricks",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221663212159484%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%221673%22%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cpath%20d%3D%22M725.333333%20490.666667a64%2064%200%201%201%2064%2064%2064%2064%200%200%201-64-64m-85.333333%200a149.333333%20149.333333%200%201%200%20149.333333-149.333334%20149.333333%20149.333333%200%200%200-149.333333%20149.333334z%22%20fill%3D%22%23555555%22%20p-id%3D%221674%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M277.33333301%20490.666667m-1e-8%20106.666666a106.666667%20106.666667%200%201%200%200-213.333333%20106.666667%20106.666667%200%201%200%200%20213.333333Z%22%20fill%3D%22%23555555%22%20p-id%3D%221675%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M320%20746.666667m0%20106.666666a106.666667%20106.666667%200%201%200%200-213.333333%20106.666667%20106.666667%200%201%200%200%20213.333333Z%22%20fill%3D%22%23555555%22%20p-id%3D%221676%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M320%20234.666667m0%20106.666666a106.666667%20106.666667%200%201%200%200-213.333333%20106.666667%20106.666667%200%201%200%200%20213.333333Z%22%20fill%3D%22%23555555%22%20p-id%3D%221677%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M341.333333%20512l0-42.666667%20384%200%200%2042.666667z%22%20fill%3D%22%23555555%22%20p-id%3D%221678%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M357.504%20282.709333l30.165333-30.16533299%20225.06666699%20225.06666699-30.165333%2030.165333z%22%20fill%3D%22%23555555%22%20p-id%3D%221679%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M582.016%20465.92l30.165333%2030.165333-228.693333%20228.693334-30.165333-30.16533401z%22%20fill%3D%22%23555555%22%20p-id%3D%221680%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "inputs": [{
    "id": "input0",
    "title": "输入项0",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "output",
    "title": "输出项",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/editors.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_object-merge/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "资源下载",
  "namespace": "mybricks.normal-pc.download",
  "version": "1.0.1",
  "rtType": "js",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221670318507335%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%225572%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M955.076923%20610.461538h-59.076923c-15.753846%200-29.538462%2013.784615-29.538462%2029.538462v196.923077c0%2015.753846-13.784615%2029.538462-29.538461%2029.538461h-649.846154c-15.753846%200-29.538462-13.784615-29.538461-29.538461v-196.923077c0-15.753846-13.784615-29.538462-29.538462-29.538462h-59.076923c-15.753846%200-29.538462%2013.784615-29.538462%2029.538462V905.846154c0%2043.323077%2035.446154%2078.769231%2078.769231%2078.769231h787.692308c43.323077%200%2078.769231-35.446154%2078.769231-78.769231V640c0-15.753846-13.784615-29.538462-29.538462-29.538462zM492.307692%20740.430769c11.815385%2011.815385%2029.538462%2011.815385%2041.353846%200l265.846154-265.846154c11.815385-11.815385%2011.815385-29.538462%200-41.353846l-41.353846-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846%200l-110.276923%20110.276923c-11.815385%2011.815385-33.476923%203.938462-33.476923-13.784615V68.923077C571.076923%2053.169231%20555.323077%2039.384615%20541.538462%2039.384615h-59.076924c-15.753846%200-29.538462%2013.784615-29.538461%2029.538462v417.476923c0%2017.723077-21.661538%2025.6-33.476923%2013.784615l-110.276923-110.276923c-11.815385-11.815385-29.538462-11.815385-41.353846%200L226.461538%20433.230769c-11.815385%2011.815385-11.815385%2029.538462%200%2041.353846L492.307692%20740.430769z%22%20p-id%3D%225573%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i18%22%20class%3D%22selected%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "inputs": [{
    "id": "url",
    "title": "资源地址",
    "schema": {
      "type": "string"
    }
  }],
  "outputs": [],
  "slots": []
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_download/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_download/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/editors.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_download/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_download/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "数据模拟器",
  "namespace": "mybricks.normal-pc.dataSimulator",
  "version": "1.0.0",
  "rtType": "js-autorun",
  "description": "根据schema数据生成的数据模拟器",
  "author": "huangQiuyun",
  "author_name": "黄秋云",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221667821292965%22%20class%3D%22icon%22%20viewBox%3D%220%200%201196%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222210%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i11%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M164.19270808%20142.85937475h632.8125v738.2812505h-632.8125z%22%20fill%3D%22%23EEEEEE%22%20p-id%3D%222211%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i12%22%20class%3D%22%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M797.00520808%20670.203125a26.36718725%2026.36718725%200%200%200-26.36718725%2026.36718725v158.203125h-580.07812475V302.72363256h580.07812475V327.42968775a26.36718725%2026.36718725%200%201%200%2052.73437525%200v-158.203125c0-29.08300807-23.62500025-52.73437525-52.73437525-52.73437525h-580.07812475c-29.08300807%200-52.73437525%2023.65136719-52.73437525%2052.73437525v685.5468745c0%2029.109375%2023.65136719%2052.73437525%2052.73437525%2052.73437525h580.07812475a52.73437525%2052.73437525%200%200%200%2052.73437525-52.73437525v-158.203125a26.36718725%2026.36718725%200%200%200-26.367188-26.36718725z%20m-26.36718725-500.97656225v80.76269532h-580.07812475V169.22656275h580.07812475z%22%20fill%3D%22%23555555%22%20p-id%3D%222212%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i8%22%20class%3D%22%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M643.17903671%20485.63281275a26.36718725%2026.36718725%200%201%200%200-52.73437525H589.36360651v-52.39160131a26.36718725%2026.36718725%200%200%200-52.73437449%200V432.8984375h-104.36132863v-52.39160131a26.36718725%2026.36718725%200%200%200-52.73437449%200V432.8984375h-54.26367188a26.36718725%2026.36718725%200%200%200%200%2052.73437525h54.26367188v80.18261668h-54.26367188a26.36718725%2026.36718725%200%201%200%200%2052.73437526h54.26367188V696.57031225h-54.26367188a26.36718725%2026.36718725%200%201%200%200%2052.73437525h54.26367188v28.582031a26.36718725%2026.36718725%200%201%200%2052.73437449%200V749.3046875h104.36132863v28.582031a26.36718725%2026.36718725%200%201%200%2052.73437449%200V749.3046875h53.8154302a26.36718725%2026.36718725%200%201%200%200-52.73437525H589.36360651v-78.02050756h53.8154302a26.36718725%2026.36718725%200%201%200%200-52.73437526H589.36360651V485.63281275h53.8154302z%20m-106.54980469%20210.9374995h-104.36132863v-78.02050756h104.36132863V696.57031225z%20m0-130.75488282h-104.36132863V485.63281275h104.36132863v80.18261668zM1056.19466146%20528.29492188a25.25976537%2025.25976537%200%200%200%204.11328125-6.35449194c0.97558568-2.45214844%201.31835963-5.03613307%201.55566431-7.64648463%200.07910156-0.79101563%200.47460938-1.47656275%200.47460938-2.29394531v-0.07910156a25.97167943%2025.97167943%200%200%200-7.72558619-18.58886719l-104.65136719-104.62500025a26.34082031%2026.34082031%200%201%200-37.28320287%2037.28320363L972.29427058%20485.63281275h-198.94042969c-14.63378906%200-26.36718725%2011.81249975-26.36718725%2026.36718725s11.73339818%2026.36718725%2026.36718725%2026.36718725h199.96875l-60.93457006%2062.30566431a26.28808568%2026.28808568%200%200%200%200.47460938%2037.28320287%2026.36718725%2026.36718725%200%200%200%2037.28320287-0.47460937l104.38769556-106.89257787%200.1054685-0.07910156%200.15820312-0.15820313c0.6328125-0.55371094%200.89648412-1.34472656%201.3974612-2.05664062z%22%20fill%3D%22%23555555%22%20p-id%3D%222213%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i9%22%20class%3D%22%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "mockTouch",
    "title": "触发模拟",
    "schema": {
      "type": "any"
    },
    "rels": ["outputData"]
  }],
  "outputs": [{
    "id": "outputData",
    "title": "模拟数据",
    "schema": {
      "type": "follow"
    },
    "conMax": 1,
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/runtime.tsx")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/editors.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/editors.tsx")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_schema-simulator/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "复制",
  "namespace": "mybricks.normal-pc.copy",
  "version": "1.0.0",
  "rtType": "js",
  "description": "复制功能",
  "author": "HuangQiuyun",
  "author_name": "黄秋云",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221677729304737%22%20class%3D%22icon%22%20viewBox%3D%220%200%201025%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222580%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M89.087%20992c-31.478%200-57.087-25.591-57.087-57.062l0-725.015c0-31.478%2025.612-57.09%2057.087-57.09l330.922%200%20239.715%20239.713%200%20542.364c0%2031.476-25.614%2057.09-57.09%2057.09l-513.546-0.001zM85.744%20938.292l520.233%200%200-490.04-241.673%200%200-241.672-278.559%200%200%20731.711zM418.019%20394.508l167.658%200-167.658-167.655%200%20167.655zM726.82%20871.191l0-53.742%20211.466%200%200-490.03-241.676%200%200-241.672-332.208%200c1.734-29.932%2026.62-53.747%2056.962-53.747l330.917%200%20239.747%20239.715%200%20542.395c0%2031.48-25.61%2057.081-57.09%2057.081l-208.118%200zM750.328%20273.674l167.62%200-167.62-167.664%200%20167.664z%22%20fill%3D%22%23555555%22%20p-id%3D%222581%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "inputs": [{
    "id": "copy",
    "title": "复制",
    "schema": {
      "type": "follow"
    },
    "rels": ["success", "error"]
  }],
  "outputs": [{
    "id": "success",
    "title": "成功",
    "schema": {
      "type": "string"
    }
  }, {
    "id": "error",
    "title": "失败",
    "schema": {
      "type": "string"
    }
  }],
  "slots": []
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_copy/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_copy/runtime.tsx")["default"]);
undefined;
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_copy/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_copy/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "RSA加密",
  "namespace": "mybricks.basic-comlib._rsa-encryption",
  "version": "1.0.0",
  "description": "RSA加密",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221690976546160%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%221642%22%20id%3D%22mx_n_1690976546161%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M792%20209.1c-112.8-10.2-198.2-70.5-239-99.9-9.8-7.1-21.2-10.8-33-10.8-14.2%200-28.2%205.5-39.3%2015.6-68.7%2062.1-183.8%2088.8-246.3%2093.6-30.8%202.3-55%2030.2-55%2063.5v264.3c0%20126.5%20188.1%20392.7%20335.7%20392.7%20154.5%200%20331.5-271.8%20331.5-382.9V272.4c0-33.4-23.5-60.6-54.6-63.3zM665.5%20546.3H546.2v119.3c0%2018.3-14.9%2033.2-33.2%2033.2-18.3%200-33.2-14.9-33.2-33.2V546.3H360.5c-18.3%200-33.2-14.9-33.2-33.2s14.9-33.2%2033.2-33.2h119.3V360.7c0-18.3%2014.9-33.2%2033.2-33.2%2018.3%200%2033.2%2014.9%2033.2%2033.2V480h119.3c18.3%200%2033.2%2014.9%2033.2%2033.2s-14.9%2033.1-33.2%2033.1z%22%20fill%3D%22%23555555%22%20p-id%3D%221643%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "rtType": "js",
  "inputs": [{
    "id": "input",
    "title": "输入项",
    "schema": [{
      "name": "key",
      "title": "密钥",
      "type": "string"
    }, {
      "name": "value",
      "title": "加密内容",
      "type": "string"
    }]
  }],
  "outputs": [{
    "id": "encryptionValue",
    "title": "输出加密结果",
    "schema": {
      "type": "string"
    },
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/editors.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_rsa-encryption/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "SM国密加密",
  "namespace": "mybricks.basic-comlib._encryption",
  "version": "1.0.1",
  "description": "加密",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221690976546160%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%221642%22%20id%3D%22mx_n_1690976546161%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M792%20209.1c-112.8-10.2-198.2-70.5-239-99.9-9.8-7.1-21.2-10.8-33-10.8-14.2%200-28.2%205.5-39.3%2015.6-68.7%2062.1-183.8%2088.8-246.3%2093.6-30.8%202.3-55%2030.2-55%2063.5v264.3c0%20126.5%20188.1%20392.7%20335.7%20392.7%20154.5%200%20331.5-271.8%20331.5-382.9V272.4c0-33.4-23.5-60.6-54.6-63.3zM665.5%20546.3H546.2v119.3c0%2018.3-14.9%2033.2-33.2%2033.2-18.3%200-33.2-14.9-33.2-33.2V546.3H360.5c-18.3%200-33.2-14.9-33.2-33.2s14.9-33.2%2033.2-33.2h119.3V360.7c0-18.3%2014.9-33.2%2033.2-33.2%2018.3%200%2033.2%2014.9%2033.2%2033.2V480h119.3c18.3%200%2033.2%2014.9%2033.2%2033.2s-14.9%2033.1-33.2%2033.1z%22%20fill%3D%22%23555555%22%20p-id%3D%221643%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "rtType": "js",
  "inputs": [{
    "id": "input",
    "title": "输入项",
    "schema": [{
      "name": "key",
      "id": "key",
      "title": "密钥",
      "type": "string"
    }, {
      "name": "value",
      "id": "value",
      "title": "明文",
      "type": "string"
    }]
  }],
  "outputs": [{
    "id": "encryptionValue",
    "title": "密文",
    "schema": {
      "type": "string"
    },
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/runtime.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/runtime.ts")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/editors.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/editors.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/_encryption/data.json");
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
undefined;
comAray.push(comDef);
comDef = {
  "title": "布局",
  "visibility": true,
  "namespace": "mybricks.basic-comlib.grid",
  "author": "tangxiaoxin",
  "author_name": "tangxiaoxin",
  "version": "1.0.4",
  "description": "布局",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221690882687121%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222344%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M896%20341.333333V256a128%20128%200%200%200-128-128H256a128%20128%200%200%200-128%20128v85.333333zM128%20426.666667v341.333333a128%20128%200%200%200%20128%20128h213.333333V426.666667zM554.666667%20426.666667v469.333333h213.333333a128%20128%200%200%200%20128-128v-341.333333z%22%20p-id%3D%222345%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "runtime": "./runtime.tsx",
  "runtime.edit": "./editor/runtime.edit.tsx",
  "data": "./data.json",
  "editors": "./editor/edit.ts",
  "upgrade": "./upgrade.ts",
  "inputs": [{
    "id": "setWidth",
    "title": "设置列宽",
    "schema": {
      "type": "object",
      "properties": {
        "coordinate": {
          "title": "列坐标",
          "type": "enum",
          "items": [{
            "type": "number"
          }, {
            "type": "number"
          }]
        },
        "width": {
          "title": "宽度",
          "type": "string"
        }
      }
    },
    "desc": "设置布局列宽度，如[1,2]表示第一行第二列"
  }],
  "slots": [{
    "id": "col0",
    "title": "拖拽组件到这里"
  }, {
    "id": "col1",
    "title": "拖拽组件到这里"
  }],
  "outputs": [{
    "id": "col0",
    "title": "列点击"
  }, {
    "id": "col1",
    "title": "列点击"
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/runtime.tsx")["default"]);
comDef.editors = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/edit.ts")["default"]);
comDef.data = __webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/data.json */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/data.json");
comDef.upgrade = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/upgrade.ts */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/upgrade.ts")["default"]);
undefined;
undefined;
comDef['runtime.edit'] = (__webpack_require__(/*! ../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/runtime.edit.tsx */ "../../../../../../../../Kuai/workplace/comlib-basic/src/grid/editor/runtime.edit.tsx")["default"]);
undefined;
undefined;
undefined;
comAray.push(comDef);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=edit.js.map