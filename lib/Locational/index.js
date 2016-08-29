"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var String_1 = require('../Util/String');
/**
 * URLの情報を管理するクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 */

var Locational = function () {
    /**
     * コンストラクタ
     *
     * @version 0.7.0
     * @since 0.7.0
     * @param originalLocation 元となるロケーションオブジェクト
     *
     */
    function Locational(originalLocation) {
        _classCallCheck(this, Locational);

        // ex) http:
        this.protocol = originalLocation.protocol;
        // ex) www.sample.com:80
        this.host = originalLocation.host;
        // ex) www.sample.com
        this.hostname = originalLocation.hostname;
        // ex) 80
        this.port = originalLocation.port;
        // /path/dir/file.ext
        this.pathname = originalLocation.pathname;
        // ?key=value&key2=value
        this.search = originalLocation.search;
        // #hash
        this.hash = originalLocation.hash;
        this.update();
    }
    /**
     * クエリー文字列をハッシュにして返す
     *
     * @version 0.10.0
     * @since 0.7.0
     * @param queryString クエリー文字列
     * @return ハッシュデータ
     *
     */


    _createClass(Locational, [{
        key: 'update',

        /**
         * プロパティを最適化する
         *
         * @version 0.9.0
         * @since 0.7.0
         * @return インスタンス自身
         *
         */
        value: function update() {
            // ex) http://www.sample.com:80
            this.origin = this.protocol + '//' + this.host;
            // ex) /path/dir/file.ext?key=value&key2=value#hash
            this.path = '' + this.pathname + this.search + this.hash;
            // ex) http://www.sample.com:80/path/dir/file.ext?key=value&key2=value#hash
            this.href = '' + this.origin + this.path;
            // ex) key=value&key2=value
            this.query = this.search.replace(/^\?/, '');
            // ex) { "key": "value", "key2": "value" }
            this.params = Locational.parseQueryString(this.query);
            return this;
        }
        /**
         * パラメータを追加する
         *
         * @version 0.9.0
         * @since 0.7.0
         * @param key パラメータのキー
         * @param value パラメータの値
         * @return インスタンス自身
         *
         */

    }, {
        key: 'addParam',
        value: function addParam(key, value) {
            if (typeof value === 'string' || !value) {
                var eqAndValue = '';
                if (value !== undefined) {
                    eqAndValue = '=' + value;
                }
                if (this.search) {
                    this.search += '&' + key + eqAndValue;
                } else {
                    this.search = '?' + key + eqAndValue;
                }
            } else {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var val = _step.value;

                        var _eqAndValue = '';
                        if (val !== undefined) {
                            _eqAndValue = '=' + val;
                        }
                        if (this.search) {
                            this.search += '&' + key + '[]' + _eqAndValue;
                        } else {
                            this.search = '?' + key + '[]' + _eqAndValue;
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
            }
            this.update();
            return this;
        }
        /**
         * パラメータを削除する
         *
         * @version 0.7.0
         * @since 0.7.0
         * @param key パラメータのキー
         * @return インスタンス自身
         *
         */

    }, {
        key: 'removeParam',
        value: function removeParam(key) {
            this.search = this.search.replace(new RegExp(key + '(?:\\[\\])?(?:=[^&]*)?(&|$)', 'g'), '');
            this.update();
            return this;
        }
        /**
         * 暗黙の文字列変換
         *
         * @version 0.7.0
         * @since 0.7.0
         * @return 変換された文字列
         *
         */

    }, {
        key: 'toString',
        value: function toString() {
            this.update();
            return this.href;
        }
    }], [{
        key: 'parseQueryString',
        value: function parseQueryString(queryString) {
            var params = {};
            if (queryString) {
                var queries = queryString.split(/&/g);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = queries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var query = _step2.value;

                        var keyValue = String_1.default.divide(query, '=');
                        var key = keyValue[0];
                        var value = keyValue[1];
                        if (key) {
                            if (/\[\]$/.test(key)) {
                                key = key.replace(/\[\]$/, '');
                                var child = params[key];
                                if (child && child instanceof Array) {
                                    child.push(value);
                                    params[key] = child;
                                } else {
                                    params[key] = [value];
                                }
                            } else {
                                params[key] = value;
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            return params;
        }
    }]);

    return Locational;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Locational;