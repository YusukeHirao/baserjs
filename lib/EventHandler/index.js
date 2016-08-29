"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var String_1 = require('../Util/String');
/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */

var EventHandler = function () {
  /**
   * ハンドラ
   *
   * @version 0.9.0
   * @since 0.0.10
   * @param context 紐づくディスパッチャーオブジェクト
   * @param type イベントのタイプ
   * @param handler ハンドラ
   *
   */
  function EventHandler(context, type, handler) {
    _classCallCheck(this, EventHandler);

    this.context = context;
    this.id = String_1.default.UID();
    this.type = type;
    this._handler = handler;
  }
  /**
   * ハンドラを実行する
   *
   * @version 0.9.0
   * @since 0.0.10
   * @param context 紐づくディスパッチャーオブジェクト
   * @param type イベントのタイプ
   * @param handler ハンドラ
   * @return イベントの伝達を止めるかどうか
   *
   */


  _createClass(EventHandler, [{
    key: "fire",
    value: function fire(context, e, args) {
      var handlerReturn = this._handler.apply(context, [e].concat(args));
      return handlerReturn !== undefined && !handlerReturn;
    }
  }]);

  return EventHandler;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventHandler;