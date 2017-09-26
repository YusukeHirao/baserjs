"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaserElement = require('./BaserElement');
var FormElement = require('./FormElement');
/**
 * テキストフィールドの拡張クラス
 *
 * @version 0.9.0
 * @since 0.4.0
 *
 */
var TextField = (function (_super) {
    __extends(TextField, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function TextField(el, options) {
        _super.call(this, el, $.extend({}, TextField.defaultOption, options));
        /**
         * プレースホルダーテキスト
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        this.placeholder = '';
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        this.placeholder = this.$el.attr('placeholder') || '';
        this.hasPlaceholder = !!this.placeholder;
        this._update();
    }
    /**
     * クラス名を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     * @override
     *
     */
    TextField.prototype._setClassName = function () {
        _super.prototype._setClassName.call(this);
        // セレクトボックス用のクラス名を設定
        this.addClass(TextField.classNameTextField);
    };
    /**
     * ラップ要素を生成
     *
     * use: jQuery
     *
     * @version 0.4.0
     * @since 0.4.0
     * @override
     *
     */
    TextField.prototype._createWrapper = function () {
        _super.prototype._createWrapper.call(this);
        BaserElement.addClassTo(this.$wrapper, TextField.classNameTextField + '-' + FormElement.classNameWrapper);
    };
    /**
     * イベントの登録
     *
     * use: jQuery
     *
     * @version 0.4.1
     * @since 0.4.0
     * @override
     *
     */
    TextField.prototype._bindEvents = function () {
        var _this = this;
        _super.prototype._bindEvents.call(this);
        // keyupイベントが起こった場合に実行するルーチン
        $(document).on('keyup.bcTextField-' + this.id, function (e) {
            if (_this.hasFocus) {
                _this._update();
            }
        });
        // プレースホルダーをサポートしていない時のイベント処理
        if (!TextField.supportPlaceholder) {
            // フォーカスを当てた時・クリックをしたときにプレースホルダーと値が同じだった場合
            // カーソル（キャレット）を先頭に持っていく
            this.$el.on('focus.bcTextField click.bcTextField', function () {
                if (_this._equalPlaceholder()) {
                    _this._msCaretMoveToTop();
                }
            });
            // キーボードを押した瞬間に、プレースホルダーと値が同じだった場合
            // プレースホルダーの値を消して、空にする
            // TODO: 文字以外のキーを押すと一瞬値が消える（クリティカルでないため保留）
            $(document).on('keydown.bcTextField-' + this.id, function (e) {
                if (_this.hasFocus) {
                    if (_this._equalPlaceholder()) {
                        _this.$el.val('');
                    }
                }
            });
        }
    };
    /**
     * 要素の状態を更新する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    TextField.prototype._update = function () {
        var currentValue = this.$el.val() || '';
        var isEmpty = !currentValue;
        if (TextField.supportPlaceholder) {
            if (isEmpty) {
                this._setStateUninputted();
            }
            else {
                this._setStateInputted();
            }
        }
        else {
            if (this._equalPlaceholder()) {
                this._setStateUninputted();
            }
            else {
                if (isEmpty) {
                    this._setStateUninputted();
                    this._setPlaceholderValue();
                }
                else {
                    this._setStateInputted();
                }
            }
        }
    };
    /**
     * 入力されている状態を設定する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    TextField.prototype._setStateInputted = function () {
        this.isEmpty = false;
        BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', TextField.classNameStateUninput);
        BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, TextField.classNameStateUninput);
        BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', TextField.classNameStateUninput);
    };
    /**
     * 入力されていない状態を設定する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    TextField.prototype._setStateUninputted = function () {
        this.isEmpty = true;
        BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', TextField.classNameStateUninput);
        BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, TextField.classNameStateUninput);
        BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', TextField.classNameStateUninput);
    };
    /**
     * プレースホルダーと値が同じかどうか
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    TextField.prototype._equalPlaceholder = function () {
        var currentValue = this.$el.val() || '';
        return this.placeholder === currentValue;
    };
    /**
     * プレースホルダーの値を設定する
     *
     * use: jQuery
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    TextField.prototype._setPlaceholderValue = function () {
        this.$el.val(this.placeholder);
        this._msCaretMoveToTop();
    };
    /**
     * 【IE用】カーソル（キャレット）を先頭に持っていく
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    TextField.prototype._msCaretMoveToTop = function () {
        // TODO: MS用の型を調査して定義
        var input = this.el;
        var range = input.createTextRange();
        range.collapse();
        range.moveStart('character', 0);
        range.moveEnd('character', 0);
        range.select();
    };
    /**
     * オプションのデフォルト値
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    TextField.defaultOption = {};
    /**
     * TextField要素のクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    TextField.classNameTextField = 'form-text-field';
    /**
     * 未入力状態に付加されるクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    TextField.classNameStateUninput = 'uninput';
    /**
     * プレースホルダー属性に対応しているかどうか
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    TextField.supportPlaceholder = $('<input />').prop('placeholder') !== undefined;
    return TextField;
}(FormElement));
module.exports = TextField;