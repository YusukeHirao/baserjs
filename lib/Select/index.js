"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaserElement_1 = require('../BaserElement');
var FormElement_1 = require('../FormElement');
var Browser_1 = require('../Browser');
/**
 * セレクトボックスの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */

var Select = function (_FormElement_1$defaul) {
    _inherits(Select, _FormElement_1$defaul);

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
    function Select(el, options) {
        _classCallCheck(this, Select);

        // 既にエレメント化されていた場合は何もしない
        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, el, options));

        if (_this._elementized) {
            return _possibleConstructorReturn(_this);
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return _possibleConstructorReturn(_this);
        }
        _this._update();
        return _this;
    }
    /**
     * クラス名を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     * @override
     *
     */


    _createClass(Select, [{
        key: '_setClassName',
        value: function _setClassName() {
            _get(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), '_setClassName', this).call(this);
            // セレクトボックス用のクラス名を設定
            this.addClass(Select.classNameSelect);
        }
        /**
         * ラップ要素を生成
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.4.0
         * @override
         *
         */

    }, {
        key: '_createWrapper',
        value: function _createWrapper() {
            _get(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), '_createWrapper', this).call(this);
            BaserElement_1.default.addClass(this.wrapper, Select.classNameSelect + '-' + FormElement_1.default.classNameWrapper);
        }
        /**
         * 擬似セレクトボックス要素を生成する
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.4.0
         * @override
         *
         */

    }, {
        key: '_createPsuedoElements',
        value: function _createPsuedoElements() {
            var _this2 = this;

            this.$pseudo = $('<a />');
            this.$pseudo.attr('href', '#'); // href属性がないとフォーカスを当てることができない
            this.$pseudo.insertAfter(this.el);
            BaserElement_1.default.addClass(this.$pseudo[0], FormElement_1.default.classNameFormElementCommon);
            BaserElement_1.default.addClass(this.$pseudo[0], Select.classNamePseudoSelect);
            this.$selected = $('<span />');
            this.$selected.appendTo(this.$pseudo);
            BaserElement_1.default.addClass(this.$selected[0], FormElement_1.default.classNameFormElementCommon);
            BaserElement_1.default.addClass(this.$selected[0], Select.classNamePseudoSelect, Select.classNamePseudoSelectedDisplay);
            if (!this._config.useDefaultOptionList) {
                this.$options = $('<ul />');
                this.$options.appendTo(this.$pseudo);
                BaserElement_1.default.addClass(this.$options[0], FormElement_1.default.classNameFormElementCommon);
                BaserElement_1.default.addClass(this.$options[0], Select.classNamePseudoSelect, Select.classNameSelectOptionList);
                $(this.el).find('option').each(function (i, opt) {
                    var $opt = $(opt);
                    var value = $opt.val();
                    var text = $opt.text();
                    var $psuedoOpt = $('<li />');
                    $psuedoOpt.appendTo(_this2.$options);
                    $psuedoOpt.data('value', value);
                    $psuedoOpt.text(text);
                    BaserElement_1.default.addClass($psuedoOpt[0], FormElement_1.default.classNameFormElementCommon);
                    BaserElement_1.default.addClass($psuedoOpt[0], Select.classNameSelectOptionList, Select.classNameSelectOption);
                });
            }
            if (Browser_1.default.getBrowser().spec.isTouchable) {
                if (Browser_1.default.getBrowser().spec.ua.iPhone || Browser_1.default.getBrowser().spec.ua.iPod) {
                    this.addClass(Select.classNameOsIOs);
                    BaserElement_1.default.addClass(this.wrapper, Select.classNameOsIOs);
                    BaserElement_1.default.addClass(this.label, Select.classNameOsIOs);
                } else if (Browser_1.default.getBrowser().spec.ua.android) {
                    this.addClass(Select.classNameOsAndroid);
                    BaserElement_1.default.addClass(this.wrapper, Select.classNameOsAndroid);
                    BaserElement_1.default.addClass(this.label, Select.classNameOsAndroid);
                }
            }
            if (this._config.useDefaultOptionList) {
                this.addClass(Select.classNameUseDefaultOptionList);
                BaserElement_1.default.addClass(this.wrapper, Select.classNameUseDefaultOptionList);
                BaserElement_1.default.addClass(this.label, Select.classNameUseDefaultOptionList);
            }
        }
        /**
         * イベントの登録
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.0
         * @override
         *
         */

    }, {
        key: '_bindEvents',
        value: function _bindEvents() {
            var _this3 = this;

            _get(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), '_bindEvents', this).call(this);
            // changeイベントが起こった場合に実行するルーチン
            $(this.el).on('change.bcSelect', function () {
                _this3._update();
            });
            // 擬似option要素を選択した時に実行する
            this.$pseudo.on('click.bcSelect', 'li', function (e) {
                var $li = $(e.target);
                var index = $li.index();
                _this3._onblur();
                _this3.setIndex(index);
                e.stopPropagation();
                e.preventDefault();
            });
            this.$pseudo.on('click.bcSelect', function (e) {
                e.preventDefault();
            });
            if (!this._config.useDefaultOptionList) {
                this._psuedoFocusEvent();
            } else {
                // href属性を削除することでフォーカスがあたらなくなる
                this.$pseudo.removeAttr('href');
            }
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
        value: function _onSilentChange() {
            this._update();
        }
        /**
         * 要素の状態を更新する
         *
         * @version 0.8.0
         * @since 0.0.1
         * @return インスタンス自身
         *
         */

    }, {
        key: 'update',
        value: function update() {
            this._update();
            return this;
        }
        /**
         * 値を設定する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.0
         * @override
         * @param value 設定したい値
         *
         */

    }, {
        key: 'setValue',
        value: function setValue(value) {
            var valueString = '' + value;
            var $targetOption = $(this.el).find('option[value="' + valueString + '"]');
            if ($targetOption.length && !$targetOption.prop('selected')) {
                $targetOption.prop('selected', true);
                this._fireChangeEvent();
            }
        }
        /**
         * インデックス番号から選択する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.0
         * @param index 対象のインデックス番号
         * @param isSilent イベントを伝達しない
         *
         */

    }, {
        key: 'setIndex',
        value: function setIndex(index) {
            var isSilent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var $targetOption = $(this.el).find('option').eq(index);
            if ($targetOption.length && !$targetOption.prop('selected') && !$targetOption.prop('disabled')) {
                $targetOption.prop('selected', true);
                this._fireChangeEvent(isSilent);
            }
        }
        /**
         * 現在の選択中のインデックス番号を取得する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.0
         * @return インデックス番号
         *
         */

    }, {
        key: 'getIndex',
        value: function getIndex() {
            var currentIndex = 0;
            $(this.el).find('option').each(function (i, el) {
                var $opt = $(el);
                if ($opt.prop('selected')) {
                    currentIndex = $opt.index();
                }
            });
            return currentIndex;
        }
        /**
         * 次の項目を選択する
         *
         * @version 0.9.0
         * @since 0.4.0
         * @param isSilent イベントを伝達しない
         *
         */

    }, {
        key: 'next',
        value: function next(isSilent) {
            var currentIndex = this.getIndex();
            var max = $(this.el).find('option').length;
            var nextIndex = currentIndex + 1;
            this.setIndex(Math.min(nextIndex, max), isSilent);
        }
        /**
         * 前の項目を選択する
         *
         * @version 0.9.0
         * @since 0.4.0
         * @param isSilent イベントを伝達しない
         *
         */

    }, {
        key: 'prev',
        value: function prev(isSilent) {
            var currentIndex = this.getIndex();
            var prevIndex = currentIndex - 1;
            this.setIndex(Math.max(prevIndex, 0), isSilent);
        }
        /**
         * 無効状態を設定する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.1
         * @override
         *
         */

    }, {
        key: 'setDisabled',
        value: function setDisabled(isDisabled) {
            _get(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'setDisabled', this).call(this, isDisabled);
            if (this.disabled) {
                this.$pseudo.attr('tabindex', -1);
            } else {
                this.$pseudo.removeAttr('tabindex');
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
            return this.__isElementized(Select);
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
            this.__elementize(Select);
        }
        /**
         * フォーカスがあたった時の処理
         *
         * use: jQuery
         *
         * @version 0.4.1
         * @since 0.0.1
         * @override
         *
         */

    }, {
        key: '_onfocus',
        value: function _onfocus() {
            if (!this.hasFocus) {
                // 全体のフォーカスを外す
                $(document).triggerHandler('click.bcSelect');
                // 親クラスのフォーカスを実行
                _get(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), '_onfocus', this).call(this);
                // DOMのclassを制御
                BaserElement_1.default.addClass(this.$pseudo[0], Select.classNamePseudoSelect, '', FormElement_1.default.classNameStateFocus);
                BaserElement_1.default.removeClass(this.$pseudo[0], Select.classNamePseudoSelect, '', FormElement_1.default.classNameStateBlur);
                // スクロール位置を調整する
                this._scrollToSelectedPosition();
                // 一覧を開いた時のインデックス番号を記録する
                this._currentIndex = this.getIndex();
            }
        }
        /**
         * フォーカスがはずれた時の処理
         *
         * use: jQuery
         *
         * @version 0.1.0
         * @since 0.0.1
         *
         */

    }, {
        key: '_onblur',
        value: function _onblur() {
            // 一旦 コンストラクタのsuper()の中で_onblur()が$pseudoプロパティを作成する前に呼び出されるため
            if (this.$pseudo) {
                _get(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), '_onblur', this).call(this);
                BaserElement_1.default.addClass(this.$pseudo[0], Select.classNamePseudoSelect, '', FormElement_1.default.classNameStateBlur);
                BaserElement_1.default.removeClass(this.$pseudo[0], Select.classNamePseudoSelect, '', FormElement_1.default.classNameStateFocus);
            }
        }
        /**
         * 要素の状態を更新する
         *
         * use: jQuery
         *
         * FIXME: 要素が足りない場合の考慮が不足している気がする
         *
         * @version 0.9.0
         * @since 0.0.1
         *
         */

    }, {
        key: '_update',
        value: function _update() {
            var _this4 = this;

            var $psuedoOptList = void 0;
            if (this.$options) {
                $psuedoOptList = this.$options.find('li');
            }
            $(this.el).find('option').each(function (i, opt) {
                var $opt = $(opt);
                var isSelected = $opt.prop('selected');
                if (isSelected) {
                    _this4.$selected.text($opt.text());
                }
                if (_this4.$options) {
                    var isDisabled = $opt.prop('disabled');
                    var $psuedoOpt = $psuedoOptList.eq(i);
                    $psuedoOpt.attr('aria-selected', '' + isSelected);
                    $psuedoOpt.attr('aria-disabled', '' + isDisabled);
                    if (isSelected) {
                        BaserElement_1.default.addClass($psuedoOpt[0], Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
                        BaserElement_1.default.removeClass($psuedoOpt[0], Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
                    } else {
                        BaserElement_1.default.addClass($psuedoOpt[0], Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
                        BaserElement_1.default.removeClass($psuedoOpt[0], Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
                    }
                    if (isDisabled) {
                        BaserElement_1.default.addClass($psuedoOpt[0], Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
                    } else {
                        BaserElement_1.default.removeClass($psuedoOpt[0], Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
                    }
                }
            });
        }
        /**
         * スクロール位置を調整する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.1.0
         *
         */

    }, {
        key: '_scrollToSelectedPosition',
        value: function _scrollToSelectedPosition() {
            var _this5 = this;

            if (this.$options) {
                (function () {
                    var $selectedPsuedoOpt = void 0;
                    var $psuedoOptList = _this5.$options.find('li');
                    $(_this5.el).find('option').each(function (i, opt) {
                        var $opt = $(opt);
                        var isSelected = $opt.prop('selected');
                        if (isSelected) {
                            $selectedPsuedoOpt = $psuedoOptList.eq(i);
                        }
                    });
                    // ポジションを正しく取得するために一度スクロール位置をリセットする
                    _this5.$options.scrollTop(0);
                    var optPos = $selectedPsuedoOpt ? $selectedPsuedoOpt.offset() : { top: 0, left: 0 };
                    var cntPos = _this5.$options.offset();
                    if (optPos && cntPos) {
                        _this5.$options.scrollTop(optPos.top - cntPos.top);
                    }
                })();
            }
        }
        /**
         * 擬似要素にフォーカスがあったった時のイベントと伝達を制御する
         *
         * use: jQuery
         *
         * @version 0.4.0
         * @since 0.0.1
         *
         */

    }, {
        key: '_psuedoFocusEvent',
        value: function _psuedoFocusEvent() {
            var _this6 = this;

            $(this.el).off('focus.bcFormElement');
            $(this.el).off('blur.bcFormElement');
            // セレクトボックス本体にフォーカスがあたったら、
            // 擬似要素のほうへフォーカスを即座に移動させる
            $(this.el).on('focus.bcSelect', function (e) {
                if (!_this6.disabled) {
                    _this6.$pseudo.focus();
                }
                e.stopPropagation();
                e.preventDefault();
            });
            // ドキュメントのどこかをフォーカスorクリックしたらフォーカスがはずれる
            // ※_onfocus()からも呼び出される
            $(document).on('click.bcSelect', function (e) {
                _this6._onblur();
            });
            // documentへ伝達するフォーカスは focusin イベント
            $(document).on('focusin', function (e) {
                _this6._onblur();
            });
            // 擬似セレクトボックスにフォーカスorクリックが起こった時に発火する
            this.$pseudo.on('focus.bcSelect', function (e) {
                if (!_this6.disabled) {
                    _this6._onfocus();
                } else {
                    _this6.$pseudo.blur();
                }
                // ドキュメントに伝達しない
                e.stopPropagation();
            }).on('click.bcSelect', function (e) {
                if (!_this6.disabled) {
                    _this6._onfocus();
                }
                // ドキュメントに伝達しない
                e.stopPropagation();
                // href="#"なのでデフォルトイベントを抑制
                e.preventDefault();
            });
            // ドキュメントへのフォーカスorクリック伝達を抑制
            $(this.label).on('click.bcSelect focus.bcSelect', function (e) {
                // ドキュメントに伝達しない
                e.stopPropagation();
            });
            this._bindKeybordEvent();
        }
        /**
         * フォーカス時のキーボードイベント
         *
         * use: jQuery
         *
         * TODO: KeyCodeの数値をマジックナンバーにせずに定数から参照するようにする
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_bindKeybordEvent',
        value: function _bindKeybordEvent() {
            var _this7 = this;

            $(document).on('keydown', function (e) {
                if (_this7.hasFocus) {
                    switch (e.keyCode) {
                        case 38:
                            {
                                // keyUp
                                _this7.prev(true);
                                _this7._scrollToSelectedPosition();
                                e.preventDefault();
                            }
                            break;
                        case 40:
                            {
                                // keyDown
                                _this7.next(true);
                                _this7._scrollToSelectedPosition();
                                e.preventDefault();
                            }
                            break;
                        case 13:
                            {
                                // Return (Enter)
                                if (_this7._currentIndex !== _this7.getIndex()) {
                                    _this7._fireChangeEvent();
                                }
                                _this7._onblur();
                                e.preventDefault();
                            }
                            break;
                        default:
                            {}
                    }
                }
            });
        }
    }]);

    return Select;
}(FormElement_1.default);
/**
 * オプションのデフォルト値
 *
 * @version 0.4.0
 * @since 0.4.0
 *
 */


Select.defaultOption = {
    useDefaultOptionList: Browser_1.default.getBrowser().spec.isTouchable && Browser_1.default.getBrowser().spec.ua.iPhone || Browser_1.default.getBrowser().spec.ua.iPod || Browser_1.default.getBrowser().spec.ua.android
};
/**
 * Select要素のクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNameSelect = 'form-select';
/**
 * Select要素の擬似要素のクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNamePseudoSelect = 'pseudo-select';
/**
 * Select要素の選択した値を表示する擬似要素のクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNamePseudoSelectedDisplay = 'selected-display';
/**
 * Select要素のoption要素をのクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNameSelectOptionList = 'option-list';
/**
 * Select要素のoption要素のクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNameSelectOption = 'item';
/**
 * iOSの場合に付加されるクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNameOsIOs = 'os-i-os';
/**
 * Androidの場合に付加されるクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNameOsAndroid = 'os-android';
/**
 * ブラウザデフォルトの選択リストを使用する場合に付加されるクラス
 *
 * @version 0.4.0
 * @since 0.4.0
 *
 */
Select.classNameUseDefaultOptionList = 'use-default-option-list';
/**
 * Select要素の擬似option要素の選択時に付加されるクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNameStateSelected = 'selected';
/**
 * Select要素の擬似option要素の選択がはずれた時に付加されるクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
Select.classNameStateUnselected = 'unselected';
/**
 * クラス名
 *
 * @override
 * @version 1.0.0
 * @since 1.0.0
 */
Select._name = Symbol('Select');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Select;