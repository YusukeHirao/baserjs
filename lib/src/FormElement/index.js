"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaserElement_1 = require('../BaserElement');
/**
 * フォーム要素の抽象クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var FormElement = function (_super) {
    __extends(FormElement, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.0.1
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function FormElement(el, options) {
        _super.call(this, el);
        /**
         * フォーカスがあたっている状態かどうか
         *
         * @since 0.1.0
         *
         */
        this.hasFocus = false;
        this._config = $.extend({}, FormElement.defaultOption, options);
        // クラス名を設定す
        this._setClassName();
        // ラベル要素の割り当て
        this._asignLabel();
        // ラベルテキストの設定
        this._setLabelText();
        // ラップ要素の割り当て
        this._createWrapper();
        // 擬似要素生成
        this._createPsuedoElements();
        // イベントを登録
        this._bindEvents();
        // 初期状態を設定
        this.defaultValue = this.val();
        this.setDisabled(this.prop('disabled'));
        this._onblur();
        // フォーム要素に登録
        // TODO: 有要な処理か検討
        FormElement.elements.push(this);
    }
    /**
     * 値を設定する
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.4.0
     * @param value 設定する値
     * @param isSilent イベントを伝達しない
     *
     */
    FormElement.prototype.setValue = function (value, isSilent) {
        if (isSilent === void 0) {
            isSilent = false;
        }
        var valueString = "" + value;
        var currentValue = this.val();
        if (!this.disabled && currentValue !== valueString) {
            this.val(valueString);
            this._fireChangeEvent(isSilent);
        }
    };
    /**
     * 無効状態を設定する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param 無効状態かどうか
     *
     */
    FormElement.prototype.setDisabled = function (isDisabled) {
        this.disabled = isDisabled;
        this.el.disabled = isDisabled;
        if (this.disabled) {
            BaserElement_1["default"].addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
            BaserElement_1["default"].addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
            BaserElement_1["default"].addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
        } else {
            BaserElement_1["default"].removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
            BaserElement_1["default"].removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
            BaserElement_1["default"].removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
        }
    };
    /**
     * 既にbaserJSのエレメント化しているかどうか確認する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    FormElement.prototype._isElementized = function () {
        return this.__isElementized(FormElement);
    };
    /**
     * baserJSのエレメント化したフラグを登録する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    FormElement.prototype._elementize = function () {
        this.__elementize(FormElement);
    };
    /**
     * クラス名を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._setClassName = function () {
        // 共通のクラスを付加
        this.addClass(FormElement.classNameFormElementCommon);
    };
    /**
     * ラップ要素を生成
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._createWrapper = function () {
        var wrapper = document.createElement('span');
        BaserElement_1["default"].addClass(wrapper, FormElement.classNameFormElementCommon);
        BaserElement_1["default"].addClass(wrapper, FormElement.classNameWrapper);
        // TODO: Not use jQuery method
        if (this.isWrappedByLabel) {
            // this.label.wrapAll(wrapper);
            this.wrapper = wrapper;
        } else if (this.hasLabelByForAttr) {
            $(this.el).wrapAll(wrapper);
            this.wrapper = wrapper;
        } else {
            $(this.el).add(this.label).wrapAll(wrapper);
            this.wrapper = wrapper;
        }
    };
    /**
     * 擬似要素を生成する
     *
     * @version 0.4.1
     * @since 0.4.0
     *
     */
    FormElement.prototype._createPsuedoElements = function () {
        // void
    };
    /**
     * イベントの登録
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._bindEvents = function () {
        var _this = this;
        // TODO: Not use jQuery method
        $(this.el).on('focus.bcFormElement', function () {
            if (!_this.disabled) {
                _this._onfocus();
            }
        });
        $(this.el).on('blur.bcFormElement', function () {
            _this._onblur();
        });
        $(this.el).on('change.bcFormElement', function (e, arg) {
            if (arg && arg.isSilent) {
                _this._onSilentChange();
            } else {
                _this.trigger('change', undefined, _this);
            }
        });
    };
    /**
     * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._onSilentChange = function () {
        // void
    };
    /**
     * フォーカスがあたった時の処理
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    FormElement.prototype._onfocus = function () {
        this.hasFocus = true;
        BaserElement_1["default"].addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
        BaserElement_1["default"].addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
        BaserElement_1["default"].addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
        BaserElement_1["default"].removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
        BaserElement_1["default"].removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
        BaserElement_1["default"].removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
    };
    /**
     * フォーカスがはずれた時の処理
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    FormElement.prototype._onblur = function () {
        this.hasFocus = false;
        BaserElement_1["default"].addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
        BaserElement_1["default"].addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
        BaserElement_1["default"].addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
        BaserElement_1["default"].removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
        BaserElement_1["default"].removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
        BaserElement_1["default"].removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
    };
    /**
     * changeイベントを発火する
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.4.0
     * @param isSilent イベントを伝達しない
     *
     */
    FormElement.prototype._fireChangeEvent = function (isSilent) {
        if (isSilent === void 0) {
            isSilent = false;
        }
        if (isSilent) {
            // TODO: Not use jQuery method
            $(this.el).trigger('change.bcFormElement', [{ isSilent: true }]);
        } else {
            var e = document.createEvent('Event');
            e.initEvent('change', true, true);
            this.el.dispatchEvent(e);
        }
    };
    /**
     * ラベル要素内のテキストを取得する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._setLabelText = function () {
        if (this._config.label) {
            // this.label.prepend(this._config.label);
            this.labelBeforeText = this._config.label;
            this.labelAfterText = '';
        } else {}
        this.labelText = this.labelBeforeText + this.labelAfterText;
    };
    /**
     * ラベル要素を割り当てる
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._asignLabel = function () {
        this.hasLabelByForAttr = false;
        // 祖先のlabel要素を検索
        var $label = $(this.closest('label'));
        // label要素の存在
        var hasLabel = !!$label.length;
        // labelでネストされていたかどうか
        this.isWrappedByLabel = hasLabel;
        // for属性に関連づいたlabel要素を取得
        if (!hasLabel) {
            $label = $("label[for=\"" + this.id + "\"]");
            hasLabel = !!$label.length;
            this.hasLabelByForAttr = hasLabel;
        }
        // ラベルがないときにラベル要素を生成する
        if (this._config.autoLabeling && this._config.labelTag && !hasLabel) {
            // label(もしくは別の)要素の生成
            $label = $("<" + this._config.labelTag.toLowerCase() + " />");
            $label.insertAfter(this.el);
            if (this._config.labelClass) {
                $label.addClass(this._config.labelClass);
            }
            if (this._config.labelTag.toLowerCase() === 'label') {
                // labelを生成したのならfor属性にidを紐付ける
                $label.attr('for', this.id);
            }
        }
        // console.log({
        // 	hasLabel: hasLabel,
        // 	isWrappedByLabel: this.isWrappedByLabel,
        // 	hasLabelByForAttr: this.hasLabelByForAttr
        // });
        // BaserElement.addClass($label, FormElement.classNameFormElementCommon);
        // BaserElement.addClass($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);
        // this.label = $label;
    };
    /**
     * オプションのデフォルト値
     *
     * @version 0.0.5
     * @since 0.0.1
     *
     */
    FormElement.defaultOption = {
        label: '',
        labelTag: 'label',
        labelClass: '',
        autoLabeling: true
    };
    /**
     * FormElement関連の要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameFormElementCommon = 'form-element';
    /**
     * FormElement関連のラッパー要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameWrapper = 'wrapper';
    /**
     * FormElement関連のラベル要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameLabel = 'label';
    /**
     * FormElement関連の要素のフォーカス時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameStateFocus = 'focus';
    /**
     * FormElement関連の要素のフォーカスがはずれた時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameStateBlur = 'blur';
    /**
     * FormElement関連の要素の無効状態の時に付加されるクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    FormElement.classNameStateDisabled = 'disabled';
    /**
     * フォーム関連要素リスト
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    FormElement.elements = [];
    /**
     * クラス名
     */
    FormElement._name = Symbol('FormElement');
    return FormElement;
}(BaserElement_1["default"]);
exports.__esModule = true;
exports["default"] = FormElement;