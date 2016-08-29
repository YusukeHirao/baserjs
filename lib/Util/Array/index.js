"use strict";
/**
 * ユーティリティ配列クラス
 *
 * @version 0.9.0
 * @since 0.2.0
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilArray = function () {
    function UtilArray() {
        _classCallCheck(this, UtilArray);
    }

    _createClass(UtilArray, null, [{
        key: "remove",

        /**
         * 配列中の指定の番号の要素を削除して詰める
         *
         * @version 0.2.0
         * @since 0.2.0
         * @param array 対象の配列
         * @param index 削除する番号
         * @return 削除された配列
         *
         */
        value: function remove(array, index) {
            array.splice(index, 1);
            return array;
        }
        /**
         * 配列をランダムに入れ替えて返す
         *
         * Fisher-Yates法
         *
         * @version 0.10.0
         * @since 0.10.0
         * @param array 対象の配列
         * @return ランダムに入れ替えられた配列
         *
         */

    }, {
        key: "shuffle",
        value: function shuffle(array) {
            var newArray = array.concat();
            var n = newArray.length;
            for (var i = n - 1; i >= 0; i--) {
                var random = Math.floor(Math.random() * (i + 1));
                var tmp = newArray[i];
                newArray[i] = newArray[random];
                newArray[random] = tmp;
            }
            return newArray;
        }
    }]);

    return UtilArray;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UtilArray;