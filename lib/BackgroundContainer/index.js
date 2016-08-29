"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Math_1 = require('../Util/Math');
var Browser_1 = require('../Browser');
var BaserElement_1 = require('../BaserElement');
/**
 * ラジオボタンとチェックボックスの抽象クラス
 *
 * @version 0.11.0
 * @since 0.11.0
 *
 */

var BackgroundContainer = function (_BaserElement_1$defau) {
    _inherits(BackgroundContainer, _BaserElement_1$defau);

    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.11.0
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function BackgroundContainer(el, options) {
        _classCallCheck(this, BackgroundContainer);

        // 既にエレメント化されていた場合は何もしない
        var _this = _possibleConstructorReturn(this, (BackgroundContainer.__proto__ || Object.getPrototypeOf(BackgroundContainer)).call(this, el));

        if (_this._elementized) {
            return _possibleConstructorReturn(_this);
        }
        _this.addClass(BackgroundContainer.className);
        _this._config = _this.mergeOptions(BackgroundContainer.defaultOption, options);
        if (_this._config.child) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this.el.querySelectorAll(_this._config.child)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elem = _step.value;

                    _this._bgElements.push(elem);
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
        var currentCSSPosition = getComputedStyle(_this.el).position;
        if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
            _this.el.style.position = 'relative';
        }
        // 初期計算
        _this.calc();
        Browser_1.default.getBrowser().on('resizeend', _this.calc.bind(_this));
        return _this;
    }
    /**
     * 計算
     *
     * @version 1.0.0
     * @since 0.11.0
     *
     */


    _createClass(BackgroundContainer, [{
        key: 'calc',
        value: function calc() {
            var containerWidth = this._config.outer ? this.el.offsetWidth : this.el.clientWidth;
            var containerHeight = this._config.outer ? this.el.offsetHeight : this.el.clientHeight;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._bgElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var el = _step2.value;

                    var _Math_1$default$stret = Math_1.default.stretchDimension(containerWidth, containerHeight, el.offsetWidth, el.offsetHeight, this._config.size, this._config.align, this._config.valign);

                    var width = _Math_1$default$stret.width;
                    var height = _Math_1$default$stret.height;
                    var top = _Math_1$default$stret.top;
                    var left = _Math_1$default$stret.left;

                    var bgStyle = {
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        top: 0,
                        left: 0,
                        maxWidth: 'none',
                        minWidth: 0,
                        maxHeight: 'none',
                        minHeight: 0
                    };
                    bgStyle.width = width;
                    bgStyle.height = height;
                    bgStyle.top = top;
                    bgStyle.left = left;
                    BaserElement_1.default.css(el, bgStyle);
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
        /**
         * 既にbaserJSのエレメント化しているかどうか確認する
         *
         * @version 1.0.0
         * @since 1.0.0
         */

    }, {
        key: '_isElementized',
        value: function _isElementized() {
            return this.__isElementized(BackgroundContainer);
        }
        /**
         * baserJSのエレメント化したフラグを登録する
         *
         * @version 1.0.0
         * @since 1.0.0
         */

    }, {
        key: '_elementize',
        value: function _elementize() {
            this.__elementize(BackgroundContainer);
        }
    }]);

    return BackgroundContainer;
}(BaserElement_1.default);
/**
 * 管理対象の要素に付加するclass属性値のプレフィックス
 *
 * @version 0.11.0
 * @since 0.11.0
 *
 */


BackgroundContainer.className = '-bc-background-container-element';
/**
 * オプションのデフォルト値
 *
 * @since 0.11.0
 *
 */
BackgroundContainer.defaultOption = {
    align: 'center',
    valign: 'center',
    size: 'contain',
    child: '>*:first',
    outer: false
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackgroundContainer;