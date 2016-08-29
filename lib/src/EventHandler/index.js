"use strict";

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
    this.context = context;
    this.id = String_1["default"].UID();
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
  EventHandler.prototype.fire = function (context, e, args) {
    var handlerReturn = this._handler.apply(context, [e].concat(args));
    return handlerReturn !== undefined && !handlerReturn;
  };
  return EventHandler;
}();
exports.__esModule = true;
exports["default"] = EventHandler;