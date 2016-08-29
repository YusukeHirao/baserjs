"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var String_1 = require('../Util/String');
var EventDispatcher_1 = require('../EventDispatcher');
var Browser_1 = require('../Browser');
var BreakPoints_1 = require('../BreakPoints');
var BaserElement_1 = require('../BaserElement');
/**
 * 高さ揃えをするボックスを管理するクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 */

var AlignedBoxes = function (_EventDispatcher_1$de) {
    _inherits(AlignedBoxes, _EventDispatcher_1$de);

    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.7.0
     * @param el 対象のボックス要素
     * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
     * @param callback ボックスの高さ揃えるときのコールバック
     */
    function AlignedBoxes(el) {
        var column = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var callback = arguments[2];

        _classCallCheck(this, AlignedBoxes);

        var _this = _possibleConstructorReturn(this, (AlignedBoxes.__proto__ || Object.getPrototypeOf(AlignedBoxes)).call(this));

        if (el instanceof HTMLElement) {
            _this.elList.push(el);
        } else {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = el[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elem = _step.value;

                    _this.elList.push(elem);
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
        AlignedBoxes.boot();
        _this.id = String_1.default.UID();
        AlignedBoxes.groups[_this.id] = _this;
        _this._init(column, callback);
        return _this;
    }
    /**
     * 基準の文字要素を生成する
     *
     * @version 1.0.0
     * @since 0.7.0
     *
     */


    _createClass(AlignedBoxes, [{
        key: 'destroy',

        /**
         * 高さ揃えを解除する
         *
         * @version 0.9.0
         * @since 0.7.0
         *
         */
        value: function destroy() {
            delete AlignedBoxes.groups[this.id];
        }
    }, {
        key: '_init',
        value: function _init() {
            var _this2 = this;

            var column = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var callback = arguments[1];

            var columnInfo = void 0;
            if (typeof column === 'number') {
                columnInfo = {
                    Infinity: column
                };
            } else {
                columnInfo = column;
            }
            this._columns = new BreakPoints_1.default(columnInfo, function (column, breakPoint, windowWidth) {
                _this2._currentColumn = column;
                _this2._align();
            });
            this._callback = this._callback || callback;
            this._align();
            this.on('realign', function () {
                _this2._align();
            });
        }
        /**
         * ボックスの高さ揃える
         *
         * @version 1.0.0
         * @since 0.8.1
         *
         */

    }, {
        key: '_align',
        value: function _align() {
            var $boxArray = [];
            var maxHeight = 0;
            var l = this.elList.length;
            var lastIndex = l - 1;
            for (var i = 0; i < l; i++) {
                var elem = this.elList[i];
                // 要素の高さを強制に無効にする
                BaserElement_1.default.removeCSSProp(elem, 'height');
                // column が 0 だと最初の要素の意味
                var column = i % this._currentColumn;
                if (column === 0) {
                    // 配列をリセットする
                    $boxArray = [];
                }
                // 配列に追加
                $boxArray[column] = elem;
                // 現在の高さと最大の高さを比べて最大の高さを更新
                // column が 0 ならばリセットさせるので最大の高さもリセット
                var currentHeight = elem.offsetHeight;
                if (column === 0 || currentHeight > maxHeight) {
                    maxHeight = currentHeight;
                }
                if (i === lastIndex || column === this._currentColumn - 1) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = $boxArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var $box = _step2.value;

                            if ($box) {
                                var cancel = false;
                                // コールバックを実行
                                if (this._callback) {
                                    cancel = !this._callback(maxHeight, currentHeight, this);
                                }
                                // コールバックの戻り値がfalseでなければ高さを変更
                                if (!cancel) {
                                    elem.style.height = maxHeight + 'px';
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
            }
        }
    }], [{
        key: 'createChar',
        value: function createChar() {
            AlignedBoxes.dummyCharElement = BaserElement_1.default.createElement({
                tagName: 'div',
                text: 'M'
            }, undefined, {
                display: 'block',
                visibility: 'hidden',
                position: 'absolute',
                padding: 0,
                top: 0,
                zIndex: -1
            });
            document.body.appendChild(AlignedBoxes.dummyCharElement);
            AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
        }
        /**
         * 文字の大きさが変わったかどうか
         *
         * TODO: 破壊的変更を加えていて単純な評価関数ではない
         *
         * @version 0.7.0
         * @since 0.7.0
         * @return 文字の大きさが変わったかどうか
         *
         */

    }, {
        key: 'isChanged',
        value: function isChanged() {
            if (AlignedBoxes.currentFontSize === AlignedBoxes.dummyCharElement.offsetHeight) {
                return false;
            }
            AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
            return true;
        }
        /**
         * 文字の大きさが変わったかどうかを監視するルーチン
         *
         * 文字の大きさが変わればボックスのサイズを再設定する
         *
         * @version 0.7.0
         * @since 0.7.0
         *
         */

    }, {
        key: 'observerForFontSize',
        value: function observerForFontSize() {
            if (AlignedBoxes.isChanged()) {
                AlignedBoxes.reAlign();
            }
            return;
        }
        /**
         * ボックスのサイズを再設定する
         *
         * @version 0.9.0
         * @since 0.7.0
         *
         */

    }, {
        key: 'reAlign',
        value: function reAlign() {
            for (var uid in AlignedBoxes.groups) {
                if (AlignedBoxes.groups.hasOwnProperty(uid)) {
                    AlignedBoxes.groups[uid].trigger('realign');
                }
            }
            return;
        }
        /**
         * 監視タイマーを起動する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.7.0
         *
         */

    }, {
        key: 'boot',
        value: function boot() {
            if (!AlignedBoxes.isBooted) {
                window.addEventListener('load', AlignedBoxes.reAlign, false);
                Browser_1.default.getBrowser().on('resizeend', AlignedBoxes.reAlign);
                AlignedBoxes.isBooted = true;
                AlignedBoxes.createChar();
                // TODO: タイマーによる監視をオプションでオフにできるようにする
                AlignedBoxes.watchTimer = setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
            }
        }
    }]);

    return AlignedBoxes;
}(EventDispatcher_1.default);
/**
 * 監視の間隔
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */


AlignedBoxes.watchInterval = 1000;
/**
 * 監視タイマーが起動しているかどうか
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
AlignedBoxes.isBooted = false;
/**
 * 監視対象のボックスグループ
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
AlignedBoxes.groups = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlignedBoxes;