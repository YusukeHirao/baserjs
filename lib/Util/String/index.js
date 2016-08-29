"use strict";
/**
 * ユーティリティ文字列クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilString = function () {
    function UtilString() {
        _classCallCheck(this, UtilString);
    }

    _createClass(UtilString, null, [{
        key: 'UID',

        /**
         * ユニークIDを発行する
         *
         * @version 0.9.0
         * @since 0.0.1
         * @param prefix 接頭辞
         * @return ユニークID
         *
         */
        value: function UID() {
            var prefix = arguments.length <= 0 || arguments[0] === undefined ? 'uid' : arguments[0];

            var random = Math.random() * 1e8;
            var seed = new Date().valueOf();
            var uniqueNumber = Math.abs(Math.floor(random + seed));
            if (prefix) {
                prefix += '-';
            }
            return '' + prefix + uniqueNumber.toString(24);
        }
        /**
         * ハイフンチェインケース化
         *
         * @version 0.9.0
         * @since 0.1.0
         * @param str 対象の文字列
         * @return ハイフンチェインケース化された文字列
         *
         */

    }, {
        key: 'hyphenDelimited',
        value: function hyphenDelimited(str) {
            var result = [];
            var words = str.replace(/[A-Z]/g, function ($1) {
                return ' ' + $1.toLowerCase();
            }).split(/[^a-z0-9]+/ig);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = words[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var word = _step.value;

                    if (word) {
                        result.push(word.toLowerCase());
                    }
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

            return result.join('-');
        }
        /**
         * スネークケース化
         *
         * @version 0.1.0
         * @since 0.1.0
         * @param str 対象の文字列
         * @return スネークケース化された文字列
         *
         */

    }, {
        key: 'snakeCase',
        value: function snakeCase(str) {
            return UtilString.hyphenDelimited(str).replace(/-/g, '_');
        }
        /**
         * キャメルケース化
         *
         * @version 0.9.0
         * @since 0.1.0
         * @param str 対象の文字列
         * @param upperCase 頭文字を大文字にするかどうか
         * @return キャメルケース化された文字列
         *
         */

    }, {
        key: 'camelCase',
        value: function camelCase(str) {
            var upperCase = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var result = UtilString.hyphenDelimited(str);
            if (upperCase && /^[a-z]/.test(result)) {
                result = '-' + result;
            }
            return result.replace(/-([a-z])/g, function ($1, $2) {
                return $2.toUpperCase();
            });
        }
        /**
         * 文字列が論理値の偽相等であるかどうか
         *
         * @version 0.9.0
         * @since 0.2.0
         * @param str 対象の文字列
         * @return 文字列が論理値の偽相等であるかどうか
         *
         */

    }, {
        key: 'isFalsy',
        value: function isFalsy(str) {
            var FALSY_PATTERN = /^\s*(?:false|null|undefined|0|0?(?:\.0+)?)?\s*$/i;
            return FALSY_PATTERN.test(str.toLowerCase());
        }
        /**
         * 最初に登場する指定の区切り文字の場所で文字列を一回だけ分割する
         *
         * TODO: テストを書く
         *
         * @version 0.9.0
         * @since 0.7.0
         * @param str 対象の文字列
         * @param separator 区切り文字
         * @return 分割した文字列
         *
         */

    }, {
        key: 'divide',
        value: function divide(str, separator) {
            var splited = str.split(separator);
            var prefix = '';
            var suffix = '';
            if (splited) {
                prefix = splited.shift() || '';
                if (splited.length) {
                    suffix = splited.join(separator);
                }
            }
            return [prefix, suffix];
        }
    }]);

    return UtilString;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UtilString;