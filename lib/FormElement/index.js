"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaserElement_1 = require('../BaserElement');
/**
 * フォーム要素の抽象クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */

var FormElement = function (_BaserElement_1$defau) {
    _inherits(FormElement, _BaserElement_1$defau);

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
        _classCallCheck(this, FormElement);

        /**
         * フォーカスがあたっている状態かどうか
         *
         * @since 0.1.0
         *
         */
        var _this = _possibleConstructorReturn(this, (FormElement.__proto__ || Object.getPrototypeOf(FormElement)).call(this, el));

        _this.hasFocus = false;
        _this._config = $.extend({}, FormElement.defaultOption, options);
        // クラス名を設定す
        _this._setClassName();
        // ラベル要素の割り当て
        _this._asignLabel();
        // ラベルテキストの設定
        _this._setLabelText();
        // ラップ要素の割り当て
        _this._createWrapper();
        // 擬似要素生成
        _this._createPsuedoElements();
        // イベントを登録
        _this._bindEvents();
        // 初期状態を設定
        _this.defaultValue = el.value;
        _this.setDisabled(el.disabled);
        _this._onblur();
        return _this;
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


    _createClass(FormElement, [{
        key: 'setValue',
        value: function setValue(value) {
            var isSilent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var el = this.el;
            var valueString = '' + value;
            var currentValue = '' + el.value;
            if (!this.disabled && currentValue !== valueString) {
                el.value = valueString;
                this._fireChangeEvent(isSilent);
            }
        }
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

    }, {
        key: 'setDisabled',
        value: function setDisabled(isDisabled) {
            var el = this.el;
            this.disabled = isDisabled;
            el.disabled = isDisabled;
            if (this.disabled) {
                BaserElement_1.default.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
                BaserElement_1.default.addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
                BaserElement_1.default.addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
            } else {
                BaserElement_1.default.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
                BaserElement_1.default.removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
                BaserElement_1.default.removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
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
            return this.__isElementized(FormElement);
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
            this.__elementize(FormElement);
        }
        /**
         * クラス名を設定する
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_setClassName',
        value: function _setClassName() {
            // 共通のクラスを付加
            this.addClass(FormElement.classNameFormElementCommon);
        }
        /**
         * ラップ要素を生成
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_createWrapper',
        value: function _createWrapper() {
            var wrapper = document.createElement('span');
            BaserElement_1.default.addClass(wrapper, FormElement.classNameFormElementCommon);
            BaserElement_1.default.addClass(wrapper, FormElement.classNameWrapper);
            // TODO: Not use jQuery method
            if (this.isWrappedByLabel) {
                $(this.label).wrapAll(wrapper);
                this.wrapper = $(this.el).closest('span').get(0);
            } else if (this.hasLabelByForAttr) {
                $(this.el).wrapAll(wrapper);
                this.wrapper = $(this.el).closest('span').get(0);
            } else {
                $(this.el).add(this.label).wrapAll(wrapper);
                this.wrapper = $(this.el).closest('span').get(0);
            }
        }
        /**
         * 擬似要素を生成する
         *
         * @version 0.4.1
         * @since 0.4.0
         *
         */

    }, {
        key: '_createPsuedoElements',
        value: function _createPsuedoElements() {}
        // void

        /**
         * イベントの登録
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_bindEvents',
        value: function _bindEvents() {
            var _this2 = this;

            // TODO: Not use jQuery method
            $(this.el).on('focus.bcFormElement', function () {
                if (!_this2.disabled) {
                    _this2._onfocus();
                }
            });
            $(this.el).on('blur.bcFormElement', function () {
                _this2._onblur();
            });
            $(this.el).on('change.bcFormElement', function (e, arg) {
                if (arg && arg.isSilent) {
                    _this2._onSilentChange();
                } else {
                    _this2.trigger('change', undefined, _this2);
                }
            });
        }
        /**
         * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_onSilentChange',
        value: function _onSilentChange() {}
        // void

        /**
         * フォーカスがあたった時の処理
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.0.1
         *
         */

    }, {
        key: '_onfocus',
        value: function _onfocus() {
            this.hasFocus = true;
            BaserElement_1.default.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
            BaserElement_1.default.addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
            BaserElement_1.default.addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
            BaserElement_1.default.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
            BaserElement_1.default.removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
            BaserElement_1.default.removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
        }
        /**
         * フォーカスがはずれた時の処理
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.0.1
         *
         */

    }, {
        key: '_onblur',
        value: function _onblur() {
            this.hasFocus = false;
            BaserElement_1.default.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
            BaserElement_1.default.addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
            BaserElement_1.default.addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
            BaserElement_1.default.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
            BaserElement_1.default.removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
            BaserElement_1.default.removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
        }
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

    }, {
        key: '_fireChangeEvent',
        value: function _fireChangeEvent() {
            var isSilent = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            if (isSilent) {
                // TODO: Not use jQuery method
                $(this.el).trigger('change.bcFormElement', [{ isSilent: true }]);
            } else {
                var e = document.createEvent('Event');
                e.initEvent('change', true, true);
                this.el.dispatchEvent(e);
            }
        }
        /**
         * ラベル要素内のテキストを取得する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_setLabelText',
        value: function _setLabelText() {
            var _this3 = this;

            if (this._config.label) {
                // this.label.prepend(this._config.label);
                this.labelBeforeText = this._config.label;
                this.labelAfterText = '';
            } else {
                (function () {
                    var $labelContents = $(_this3.label).contents();
                    var $before = $();
                    var $after = $();
                    var isBefore = true;
                    $labelContents.each(function (i, node) {
                        if (node === _this3.el) {
                            isBefore = false;
                            return;
                        }
                        if (isBefore) {
                            $before = $before.add($(node));
                        } else {
                            $after = $after.add($(node));
                        }
                    });
                    $before.text(function (i, text) {
                        return $.trim(text);
                    });
                    $after.text(function (i, text) {
                        return $.trim(text);
                    });
                    _this3.labelBeforeText = $before.text() || $(_this3.el).attr('title') || '';
                    _this3.labelAfterText = $after.text() || '';
                    if (_this3.labelBeforeText) {
                        $(_this3.label).prepend($before);
                    }
                    if (_this3.labelAfterText) {
                        $(_this3.label).append($after);
                    }
                })();
            }
            this.labelText = this.labelBeforeText + this.labelAfterText;
        }
        /**
         * ラベル要素を割り当てる
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_asignLabel',
        value: function _asignLabel() {
            this.hasLabelByForAttr = false;
            // 祖先のlabel要素を検索
            var label = this.closest('label');
            // labelでネストされていたかどうか
            this.isWrappedByLabel = !!label;
            // for属性に関連づいたlabel要素を取得
            if (!label) {
                label = document.querySelector('label[for="' + this.id + '"]');
                this.hasLabelByForAttr = !!label;
            }
            // ラベルがないときにラベル要素を生成する
            if (this._config.autoLabeling && !label) {
                // label(もしくは別の)要素の生成
                label = document.createElement('label');
                var $label = $(label);
                $label.insertAfter(this.el);
                if (this._config.labelClass) {
                    $label.addClass(this._config.labelClass);
                }
                // labelを生成したのならfor属性にidを紐付ける
                label.htmlFor = this.id;
            }
            if (label) {
                BaserElement_1.default.addClass(label, FormElement.classNameFormElementCommon);
                BaserElement_1.default.addClass(label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);
                this.label = label;
            }
        }
    }]);

    return FormElement;
}(BaserElement_1.default);
/**
 * オプションのデフォルト値
 *
 * @version 0.0.5
 * @since 0.0.1
 *
 */


FormElement.defaultOption = {
    label: '',
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
 * クラス名
 */
FormElement._name = Symbol('FormElement');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormElement;