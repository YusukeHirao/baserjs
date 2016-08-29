"use strict";
/**
 * ユーティリティ算術クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilMath = function () {
    function UtilMath() {
        _classCallCheck(this, UtilMath);
    }

    _createClass(UtilMath, null, [{
        key: 'random',

        /**
         * 指定の範囲のランダムな数を返す
         *
         * @version 0.9.0
         * @since 0.2.0
         * @param base 基準の数
         * @param dist 基準からこの数までの範囲の乱数になる
         * @return 乱数
         *
         */
        value: function random() {
            var base = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var dist = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var rand = Math.random();
            var from = Math.min(base, dist);
            var to = Math.max(base, dist);
            return rand * (to - from) + from;
        }
        /**
         * 配列内の数値の合計を算出する
         *
         * @version 0.9.0
         * @since 0.2.0
         * @param numberList 数の配列
         * @return 合計値
         *
         */

    }, {
        key: 'sum',
        value: function sum(numberList) {
            var numbers = numberList.slice();
            var result = 0;
            while (numbers.length) {
                result += numbers.shift();
            }
            return result;
        }
        /**
         * 均等に分割する
         *
         * @version 0.9.0
         * @since 0.2.0
         * @param n 分割される数
         * @param devide 分割する数
         * @return 分割された数値で構成された配列
         *
         */

    }, {
        key: 'split',
        value: function split(n, devide) {
            var result = [];
            n = Math.floor(n);
            devide = Math.floor(devide);
            // 分割した数
            var splited = Math.floor(n / devide);
            if (0 < devide) {
                var i = devide;
                // 余り
                var rem = n % devide;
                // 余りの数だけ+1される
                var addtion = rem;
                while (i--) {
                    if (0 < addtion || rem < 0 && 0 === addtion) {
                        result.push(splited + 1);
                    } else {
                        result.push(splited);
                    }
                    addtion += rem < 0 ? 1 : -1;
                }
            }
            return result;
        }
        /**
         * コンテナオブジェクトとターゲットオブジェクトのサイズから、
         * ターゲットオブジェクトの収まる位置とサイズを算出する
         *
         * @param containerWidth コンテナの幅
         * @param containerHeight コンテナの高さ
         * @param targetWidth ターゲットの幅
         * @param targetHeight ターゲットの高さ
         * @param sizing ターゲットを収める基準 `"contain" | "cover"`
         * @param align 水平位置 `"left" | "center" | "right"`
         * @param valign 垂直位置 `"top" | "center" | "bottom"`
         * @return 算出された位置とサイズ
         */

    }, {
        key: 'stretchDimension',
        value: function stretchDimension(containerWidth, containerHeight, targetWidth, targetHeight) {
            var sizing = arguments.length <= 4 || arguments[4] === undefined ? 'contain' : arguments[4];
            var align = arguments.length <= 5 || arguments[5] === undefined ? 'center' : arguments[5];
            var valign = arguments.length <= 6 || arguments[6] === undefined ? 'center' : arguments[6];

            var scale = 1;
            var objectAspectRatio = targetWidth / targetHeight;
            var containerAspectRatio = containerWidth / containerHeight;
            // オブジェクトの拡縮率の算出
            // アス比が1以上なら横長/1以下なら縦長
            // コンテナが横長
            switch (sizing) {
                case 'contain':
                    if (1 < containerAspectRatio) {
                        // オブジェクトが横長 もしくは コンテナのアス比の方が大きい
                        if (1 < targetWidth && objectAspectRatio < containerAspectRatio) {
                            scale = containerWidth / targetWidth;
                        } else {
                            scale = containerHeight / targetHeight;
                        }
                    } else {
                        // オブジェクトが横長 もしくは オブジェクトのアス比の方が大きい
                        if (1 < targetHeight && containerAspectRatio < objectAspectRatio) {
                            scale = containerHeight / targetHeight;
                        } else {
                            scale = containerWidth / targetWidth;
                        }
                    }
                    break;
                case 'cover':
                    if (1 < containerAspectRatio) {
                        // オブジェクトが横長 もしくは コンテナのアス比の方が大きい
                        if (1 < targetWidth && objectAspectRatio < containerAspectRatio) {
                            scale = containerHeight / targetHeight;
                        } else {
                            scale = containerWidth / targetWidth;
                        }
                    } else {
                        // オブジェクトが横長 もしくは オブジェクトのアス比の方が大きい
                        if (1 < targetHeight && containerAspectRatio < objectAspectRatio) {
                            scale = containerWidth / targetWidth;
                        } else {
                            scale = containerHeight / targetHeight;
                        }
                    }
                    break;
                default:
            }
            // オブジェクトの幅と高さ
            var width = targetWidth * scale;
            var height = targetHeight * scale;
            var top = void 0;
            switch (valign) {
                case 'top':
                    {
                        top = 0;
                    }
                    break;
                case 'bottom':
                    {
                        top = containerHeight - height;
                    }
                    break;
                default:
                    {
                        top = containerHeight / 2 - height / 2;
                    }
            }
            var left = void 0;
            switch (align) {
                case 'left':
                    {
                        left = 0;
                    }
                    break;
                case 'right':
                    {
                        left = containerWidth - width;
                    }
                    break;
                default:
                    {
                        left = containerWidth / 2 - width / 2;
                    }
            }
            return {
                width: width,
                height: height,
                top: top,
                left: left
            };
        }
    }]);

    return UtilMath;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UtilMath;