"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventDispatcher_1 = require('../EventDispatcher');
var Browser_1 = require('../Browser');
/**
 * ブレークポイントの変化に応じた処理をする管理することができるクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 * ```
 * new BreakPoints({
 * 	340: 'sp',
 * 	768: 'tab',
 * 	1200: 'pc',
 * 	'default': 'bigger'
 * }, (value, breakPoint, windowWidth) => {
 * 	// ブレークポイントが340以下なら value = 'sp' など
 *  // 指定のブレークポイントを跨いだ際にしか発火しない
 * });
 * ```
 *
 */

var BreakPoints = function (_EventDispatcher_1$de) {
    _inherits(BreakPoints, _EventDispatcher_1$de);

    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.7.0
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     * @param callback 変化に応じたコールバック
     *
     */
    function BreakPoints(breakPoints, callback) {
        _classCallCheck(this, BreakPoints);

        /**
         * 現在のブレークポイント（ウィンドウの幅）
         *
         * @version 0.8.1
         * @since 0.7.0
         *
         */
        var _this = _possibleConstructorReturn(this, (BreakPoints.__proto__ || Object.getPrototypeOf(BreakPoints)).call(this));

        _this.currentPoint = 0;
        /**
         * ブレークポイント
         *
         * @version 0.8.1
         * @since 0.7.0
         *
         */
        _this.breakPoints = [];
        /**
         * ブレークポイントに対してハンドラに渡す値
         *
         * @version 0.8.1
         * @since 0.7.0
         *
         */
        _this._values = {};
        _this._setBreakPoints(breakPoints);
        Browser_1.default.getBrowser().on('resizeend', function () {
            var wW = Math.max(window.document.documentElement.clientWidth, window.innerWidth);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this.breakPoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var overPoint = _step.value;

                    if (wW <= overPoint) {
                        if (_this.currentPoint !== overPoint) {
                            _this.currentPoint = overPoint;
                            var value = _this._values[overPoint];
                            if (callback) {
                                callback(value, overPoint, wW);
                            }
                            _this.trigger('breakpoint', [value, overPoint, wW], _this);
                            _this.trigger('breakpoint:' + overPoint, [value, wW], _this);
                        }
                        break;
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
        });
        Browser_1.default.getBrowser().trigger('resizeend');
        return _this;
    }
    /**
     * ブレークポイントを追加する
     *
     * @version 0.7.0
     * @since 0.7.0
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     *
     */


    _createClass(BreakPoints, [{
        key: 'add',
        value: function add(breakPoints) {
            this._setBreakPoints(breakPoints);
        }
        /**
         * ブレークポイントの登録処理
         *
         * @version 0.8.1
         * @since 0.7.0
         * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
         *
         */

    }, {
        key: '_setBreakPoints',
        value: function _setBreakPoints(breakPoints) {
            for (var breakPointStr in breakPoints) {
                if (breakPoints.hasOwnProperty(breakPointStr)) {
                    var breakPoint = void 0;
                    if (/^defaults?$/i.test(breakPointStr)) {
                        breakPoint = Infinity;
                    } else {
                        breakPoint = parseFloat(breakPointStr);
                    }
                    if (breakPoint >= 1) {
                        this.breakPoints.push(breakPoint);
                        var value = breakPoints[breakPointStr];
                        this._values[breakPoint] = value;
                    }
                }
            }
            this.breakPoints.sort(function (a, b) {
                return a - b;
            });
        }
    }]);

    return BreakPoints;
}(EventDispatcher_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BreakPoints;