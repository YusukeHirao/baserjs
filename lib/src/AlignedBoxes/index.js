"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var AlignedBoxes = function (_super) {
    __extends(AlignedBoxes, _super);
    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.7.0
     * @param el 対象のボックス要素
     * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
     * @param callback ボックスの高さ揃えるときのコールバック
     */
    function AlignedBoxes(el, column, callback) {
        if (column === void 0) {
            column = 0;
        }
        _super.call(this);
        if (el instanceof HTMLElement) {
            this.elList.push(el);
        } else {
            for (var _i = 0, el_1 = el; _i < el_1.length; _i++) {
                var elem = el_1[_i];
                this.elList.push(elem);
            }
        }
        AlignedBoxes.boot();
        this.id = String_1["default"].UID();
        AlignedBoxes.groups[this.id] = this;
        this._init(column, callback);
    }
    /**
     * 基準の文字要素を生成する
     *
     * @version 1.0.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.createChar = function () {
        AlignedBoxes.dummyCharElement = BaserElement_1["default"].createElement({
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
    };
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
    AlignedBoxes.isChanged = function () {
        if (AlignedBoxes.currentFontSize === AlignedBoxes.dummyCharElement.offsetHeight) {
            return false;
        }
        AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
        return true;
    };
    /**
     * 文字の大きさが変わったかどうかを監視するルーチン
     *
     * 文字の大きさが変わればボックスのサイズを再設定する
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.observerForFontSize = function () {
        if (AlignedBoxes.isChanged()) {
            AlignedBoxes.reAlign();
        }
        return;
    };
    /**
     * ボックスのサイズを再設定する
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.reAlign = function () {
        for (var uid in AlignedBoxes.groups) {
            if (AlignedBoxes.groups.hasOwnProperty(uid)) {
                AlignedBoxes.groups[uid].trigger('realign');
            }
        }
        return;
    };
    /**
     * 監視タイマーを起動する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.boot = function () {
        if (!AlignedBoxes.isBooted) {
            window.addEventListener('load', AlignedBoxes.reAlign, false);
            Browser_1["default"].getBrowser().on('resizeend', AlignedBoxes.reAlign);
            AlignedBoxes.isBooted = true;
            AlignedBoxes.createChar();
            // TODO: タイマーによる監視をオプションでオフにできるようにする
            AlignedBoxes.watchTimer = setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
        }
    };
    /**
     * 高さ揃えを解除する
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.prototype.destroy = function () {
        delete AlignedBoxes.groups[this.id];
    };
    AlignedBoxes.prototype._init = function (column, callback) {
        var _this = this;
        if (column === void 0) {
            column = 0;
        }
        var columnInfo;
        if (typeof column === 'number') {
            columnInfo = {
                Infinity: column
            };
        } else {
            columnInfo = column;
        }
        this._columns = new BreakPoints_1["default"](columnInfo, function (column, breakPoint, windowWidth) {
            _this._currentColumn = column;
            _this._align();
        });
        this._callback = this._callback || callback;
        this._align();
        this.on('realign', function () {
            _this._align();
        });
    };
    /**
     * ボックスの高さ揃える
     *
     * @version 1.0.0
     * @since 0.8.1
     *
     */
    AlignedBoxes.prototype._align = function () {
        var $boxArray = [];
        var maxHeight = 0;
        var l = this.elList.length;
        var lastIndex = l - 1;
        for (var i = 0; i < l; i++) {
            var elem = this.elList[i];
            // 要素の高さを強制に無効にする
            BaserElement_1["default"].removeCSSProp(elem, 'height');
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
                for (var _i = 0, $boxArray_1 = $boxArray; _i < $boxArray_1.length; _i++) {
                    var $box = $boxArray_1[_i];
                    if ($box) {
                        var cancel = false;
                        // コールバックを実行
                        if (this._callback) {
                            cancel = !this._callback(maxHeight, currentHeight, this);
                        }
                        // コールバックの戻り値がfalseでなければ高さを変更
                        if (!cancel) {
                            elem.style.height = maxHeight + "px";
                        }
                    }
                }
            }
        }
    };
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
    return AlignedBoxes;
}(EventDispatcher_1["default"]);
exports.__esModule = true;
exports["default"] = AlignedBoxes;