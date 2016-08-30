"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventDispatcher_1 = require('../EventDispatcher');
var Locational_1 = require('../Locational');
/**
 * ブラウザの情報を管理するクラス
 *
 * TODO: テストを書く（テストフレームワークの選定から）
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */

var Browser = function (_EventDispatcher_1$de) {
    _inherits(Browser, _EventDispatcher_1$de);

    /**
     * コンストラクタ
     *
     * @version 0.12.0
     * @since 0.0.2
     *
     */
    function Browser() {
        _classCallCheck(this, Browser);

        /**
         * リサイズイベントからリサイズエンドイベントまでのインターバル
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        var _this = _possibleConstructorReturn(this, (Browser.__proto__ || Object.getPrototypeOf(Browser)).call(this));

        _this.resizeEndInterval = 100;
        /**
         * スクロールイベントからスクロールエンドイベントまでのインターバル
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        _this.scrollEndInterval = 100;
        /**
         * 現在リサイズ中かどうか
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        _this.isResize = false;
        /**
         * 現在スクロール中かどうか
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        _this.isScroll = false;
        // リサイズイベント
        window.addEventListener('resize', _this._onResize.bind(_this), false);
        // スクロールイベント
        window.addEventListener('scroll', _this._onScroll.bind(_this), false);
        return _this;
    }

    _createClass(Browser, [{
        key: 'jumpTo',

        /**
         * ページ遷移する
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */
        value: function jumpTo(path) {
            var isBlank = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var href = void 0;
            if (typeof path === 'string') {
                href = path;
            } else {
                href = path.href;
            }
            if (!isBlank) {
                window.location.href = href;
            } else {
                window.open(href, undefined);
            }
        }
        /**
         * 現在のURLのパラメータをリンク先へ引き継がせる
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */

    }, {
        key: 'inheritParams',
        value: function inheritParams(targetParam) {
            var target = document.querySelectorAll('a[href], area[href]');
            var thisLocation = new Locational_1.default(location);
            if (!(targetParam in thisLocation.params)) {
                return;
            }
            var query = targetParam;
            var value = thisLocation.params[targetParam];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = target[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elem = _step.value;

                    var targetElem = elem;
                    var loc = new Locational_1.default(targetElem);
                    if (thisLocation.host === loc.host) {
                        loc.addParam(query, value);
                        targetElem.href = loc.href;
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
    }, {
        key: '_onResize',
        value: function _onResize() {
            var _this2 = this;

            if (!this.isResize) {
                this.trigger('resizestart');
            }
            this.isResize = true;
            this.trigger('resize');
            window.clearTimeout(this._resizeEndTimer);
            this._resizeEndTimer = window.setTimeout(function () {
                _this2.isResize = false;
                _this2.trigger('resize');
                _this2.trigger('resizeend');
            }, this.resizeEndInterval);
        }
    }, {
        key: '_onScroll',
        value: function _onScroll() {
            var _this3 = this;

            if (!this.isScroll) {
                this.trigger('scrollstart');
            }
            this.isScroll = true;
            this.trigger('scroll');
            window.clearTimeout(this._scrollEndTimer);
            this._scrollEndTimer = window.setTimeout(function () {
                _this3.isScroll = false;
                _this3.trigger('scroll');
                _this3.trigger('scrollend');
            }, this.resizeEndInterval);
        }
        /**
         * ユーザーエージェント情報を取得する
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */

    }, {
        key: '_getUA',
        value: function _getUA() {
            var ua = navigator.userAgent;
            var bua = {
                iOS: false,
                android: /android/i.test(ua),
                iPad: /ipad/i.test(ua),
                iPhone: /iphone/i.test(ua),
                iPod: /ipod/i.test(ua),
                safari: /safari/i.test(ua),
                chrome: /crios|chrome/i.test(ua),
                edge: /edge/i.test(ua),
                ie: /msie/.test(ua)
            };
            bua.iOS = bua.iPad || bua.iPhone || bua.iPod || false;
            if (bua.chrome) {
                bua.safari = false;
            }
            if (bua.edge) {
                bua.safari = false;
                bua.chrome = false;
            }
            return bua;
        }
    }, {
        key: 'width',
        get: function get() {
            return window.document.documentElement.clientWidth;
        }
    }, {
        key: 'height',
        get: function get() {
            return window.document.documentElement.clientWidth;
        }
    }, {
        key: 'scrollTop',
        set: function set(y) {
            window.scrollTo(this.scrollLeft, y);
        },
        get: function get() {
            return window.pageYOffset;
        }
    }, {
        key: 'scrollLeft',
        set: function set(x) {
            window.scrollTo(x, this.scrollTop);
        },
        get: function get() {
            return window.pageXOffset;
        }
        /**
         * デバイス・OS・ブラウザの情報
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */

    }, {
        key: 'spec',
        get: function get() {
            return {
                isTouchable: 'ontouchstart' in window,
                ua: this._getUA()
            };
        }
        /**
         * 参照するAPIのスキーム
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */

    }, {
        key: 'availableScheme',
        get: function get() {
            return (/https?:/i.test(location.protocol) ? '//' : 'http://'
            );
        }
    }], [{
        key: 'getBrowser',
        value: function getBrowser() {
            if (!Browser._browser) {
                Browser._browser = new Browser();
            }
            return Browser._browser;
        }
    }]);

    return Browser;
}(EventDispatcher_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Browser;