"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DispatchEvent_1 = require('../DispatchEvent');
var EventHandler_1 = require('../EventHandler');
/**
 * イベントを検知してハンドラを発火させることができるクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 * ```
 * let dispatcher = new EventDispatcher();
 *
 * dispatcher.on('event', (e) -> {
 * 	// handler
 * });
 *
 * dispatcher.trigger('event');
 * ```
 *
 */

var EventDispatcher = function () {
    /**
     * コンストラクタ
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    function EventDispatcher() {
        _classCallCheck(this, EventDispatcher);
    }
    // void

    /**
     * イベントハンドラを登録する
     *
     * @version 0.9.0
     * @since 0.0.10
     * @param type イベントのタイプ（複数可）
     * @param handler
     * @return インスタンス自身
     *
     */


    _createClass(EventDispatcher, [{
        key: 'on',
        value: function on(type, handler) {
            var types = void 0;
            if (typeof type === 'string') {
                types = type.split(/\s+/g);
            } else {
                types = type;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _type = _step.value;

                    var eventHandler = new EventHandler_1.default(this, _type, handler);
                    EventDispatcher.eventHandlers[eventHandler.id] = eventHandler;
                    if (!EventDispatcher.types[_type]) {
                        EventDispatcher.types[_type] = [];
                    }
                    EventDispatcher.types[_type].push(eventHandler);
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

            return this;
        }
        /**
         * イベントハンドラを削除する
         *
         * @version 0.9.0
         * @since 0.0.10
         * @param type イベントのタイプ（複数可）
         * @return インスタンス自身
         *
         */

    }, {
        key: 'off',
        value: function off(type) {
            if (!type) {
                return this;
            }
            var types = void 0;
            if (typeof type === 'string') {
                types = type.split(/\s+/g);
            } else {
                types = type;
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = types[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _type2 = _step2.value;

                    delete EventDispatcher.types[_type2];
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

            return this;
        }
        /**
         * イベントハンドラを発火させる
         *
         * @version 0.9.0
         * @since 0.0.10
         * @param type イベントのタイプ
         * @param args イベントハンドラに渡す引数
         * @param context イベントハンドラのコンテキスト
         * @return インスタンス自身
         *
         */

    }, {
        key: 'trigger',
        value: function trigger(type) {
            var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            var context = arguments[2];

            context = context || this;
            var typeName = void 0;
            var e = void 0;
            if (typeof type === 'string') {
                typeName = type;
                e = new DispatchEvent_1.default(type);
            } else {
                e = type;
                typeName = e.type;
            }
            if (EventDispatcher.types[typeName]) {
                // sliceをつかってオブジェクトのコピーを渡し参照を切る
                var handlers = EventDispatcher.types[typeName].slice();
                while (handlers.length) {
                    var eventHandler = handlers.shift();
                    if (eventHandler && eventHandler.context === this) {
                        var isCancel = eventHandler.fire(context, e, args);
                        if (isCancel) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                        }
                        // イベントの伝達抑制状態であればループ抜けて以降の処理を行わない
                        if (e.isImmediatePropagationStopped()) {
                            break;
                        }
                    }
                }
            }
            return this;
        }
    }]);

    return EventDispatcher;
}();
/**
 * イベント駆動できるクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */


EventDispatcher.eventHandlers = {};
/**
 * イベント駆動できるクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
EventDispatcher.types = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventDispatcher;