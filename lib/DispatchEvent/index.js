"use strict";
/**
 * イベントオブジェクトのクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DispatchEvent = function () {
  /**
   * コンストラクタ
   *
   * @version 0.3.0
   * @since 0.0.10
   *
   */
  function DispatchEvent(type) {
    _classCallCheck(this, DispatchEvent);

    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    this._isImmediatePropagationStopped = false;
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    this._isDefaultPrevented = false;
    this.type = type;
  }
  /**
   * イベントの伝達を止める
   *
   * @version 0.0.10
   * @since 0.0.10
   *
   */


  _createClass(DispatchEvent, [{
    key: "stopImmediatePropagation",
    value: function stopImmediatePropagation() {
      this._isImmediatePropagationStopped = true;
    }
    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return イベントの伝達が止められているかどうか
     *
     */

  }, {
    key: "isImmediatePropagationStopped",
    value: function isImmediatePropagationStopped() {
      return this._isImmediatePropagationStopped;
    }
    /**
     * デフォルトのイベントの発火を止める
     * ※EventDispatcher.triggerでの実装に依る
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */

  }, {
    key: "preventDefault",
    value: function preventDefault() {
      this._isDefaultPrevented = true;
    }
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     * @return デフォルトのイベントの発火が止められているかどうか
     *
     */

  }, {
    key: "isDefaultPrevented",
    value: function isDefaultPrevented() {
      return this._isDefaultPrevented;
    }
  }]);

  return DispatchEvent;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DispatchEvent;