"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaserElement_1 = require('../BaserElement');
var Browser_1 = require('../Browser');
/**
 * マップ要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */

var GoogleMaps = function (_BaserElement_1$defau) {
    _inherits(GoogleMaps, _BaserElement_1$defau);

    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.6
     * @param el 管理するDOM要素
     * @param options マップオプション
     *
     */
    function GoogleMaps(el, options) {
        _classCallCheck(this, GoogleMaps);

        // 既にエレメント化されていた場合は何もしない
        var _this = _possibleConstructorReturn(this, (GoogleMaps.__proto__ || Object.getPrototypeOf(GoogleMaps)).call(this, el));

        if (_this._elementized) {
            return _possibleConstructorReturn(_this);
        }
        if ('google' in window && google.maps) {
            _this.addClass(GoogleMaps.className);
            _this.mapOption = _this.mergeOptions(GoogleMaps.defaultOptions, options);
            _this._init();
            _this.data(GoogleMaps.className, _this);
        } else {
            if ('console' in window) {
                console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
                return _possibleConstructorReturn(_this);
            }
        }
        return _this;
    }
    /**
     * 住所文字列から座標を非同期で取得
     *
     * @version 0.12.0
     * @since 0.2.0
     *
     */


    _createClass(GoogleMaps, [{
        key: 'reload',

        /**
         * 再読み込み・再設定
         *
         * @version 0.6.0
         * @since 0.2.0
         *
         */
        value: function reload(options) {
            this.mapOption = options ? this.mergeOptions(GoogleMaps.defaultOptions, options) : this.mapOption;
            this._init();
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
            return this.__isElementized(GoogleMaps);
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
            this.__elementize(GoogleMaps);
        }
        /**
         * 初期化
         *
         * @version 1.0.0
         * @since 0.0.6
         *
         */

    }, {
        key: '_init',
        value: function _init() {
            var _this2 = this;

            // data-*属性からの継承
            this.mapOption = this.mergeOptions(this.mapOption, {
                zoom: this.data('zoom'),
                fitBounds: this.data('fit-bounds')
            });
            this.markerBounds = new google.maps.LatLngBounds();
            var mapCenterLat = parseInt(this.data('lat'), 10) || GoogleMaps.defaultLat;
            var mapCenterLng = parseInt(this.data('lng'), 10) || GoogleMaps.defaultLng;
            var mapCenterAddress = this.data('address') || '';
            if (mapCenterAddress) {
                // 住所から緯度・経度を検索する（非同期）
                GoogleMaps.getLatLngByAddress(mapCenterAddress, function (lat, lng) {
                    _this2._render(lat, lng);
                });
            } else {
                this._render(mapCenterLat, mapCenterLng);
            }
        }
        /**
         * レンダリング
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.2.0
         * @param mapCenterLat 緯度
         * @param mapCenterLng 経度
         *
         */

    }, {
        key: '_render',
        value: function _render(mapCenterLat, mapCenterLng) {
            // this.$coordinates[0] = this.$coordinates[0] || this.$el.find('[data-lat][data-lng], [data-address]').detach();
            // if (this.$coordinates[0.length <= 0) {
            // 	this.$coordinates[0] = this.$el;
            // }
            // const coordinates[0: Coordinate[] = [];
            // this.$coordinates[0.each( (i: number, el: HTMLElement): void => {
            // 	const coordinate: Coordinate = new Coordinate(el, this);
            // 	coordinates[0.push(coordinate);
            // });
            // this.mapOption = <GoogleMapsOption> $.extend(
            // 	{
            // 		zoom: 14,
            // 		mapTypeControlOptions: <google.maps.MapTypeControlOptions> {
            // 			mapTypeIds: <google.maps.MapTypeId[]> [
            // 				google.maps.MapTypeId.HYBRID,
            // 				google.maps.MapTypeId.ROADMAP,
            // 			],
            // 		},
            // 		scrollwheel: <boolean> false,
            // 		center: <google.maps.LatLng> new google.maps.LatLng(mapCenterLat, mapCenterLng),
            // 		styles: null,
            // 	},
            // 	this.mapOption
            // );
            // this.info = new google.maps.InfoWindow({
            // 	disableAutoPan: <boolean> true,
            // });
            // this.gmap = new google.maps.Map(this.el, $.extend({}, this.mapOption, {
            // 	fitBounds: google.maps.Map.prototype.fitBounds,
            // }));
            // $.each(coordinates[0, (i: number, coordinate: Coordinate ): void => {
            // 	coordinate.markTo( (coordinate: Coordinate): void => {
            // 		if (this.mapOption.fitBounds) {
            // 			this.markerBounds.extend(coordinate.position);
            // 			this.gmap.fitBounds(this.markerBounds);
            // 		}
            // 	});
            // });
        }
    }], [{
        key: 'getLatLngByAddress',
        value: function getLatLngByAddress(address, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: address
            }, function (results, status) {
                switch (status) {
                    case google.maps.GeocoderStatus.OK:
                        {
                            var lat = results[0].geometry.location.lat();
                            var lng = results[0].geometry.location.lng();
                            callback(lat, lng);
                        }
                        break;
                    case google.maps.GeocoderStatus.INVALID_REQUEST:
                    case google.maps.GeocoderStatus.ZERO_RESULTS:
                        {
                            if (console && console.warn) {
                                console.warn('ReferenceError: "' + address + 'は不正な住所だったため結果を返すことができませんでした。"');
                            }
                        }
                        break;
                    case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
                        {
                            if (console && console.warn) {
                                console.warn('Error: "リクエスト数の上限を超えました。' + address + 'は処理されません。"');
                            }
                        }
                        break;
                    case google.maps.GeocoderStatus.ERROR:
                    case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                        {
                            if (console && console.warn) {
                                console.warn('Error: "エラーが発生しました。' + address + 'は処理されません。"');
                            }
                        }
                        break;
                    default:
                        {}
                }
            });
        }
    }]);

    return GoogleMaps;
}(BaserElement_1.default);
/**
 *
 */


GoogleMaps.defaultOptions = {};
/**
 * 初期設定用の緯度
 * 東京都庁
 *
 * @version 0.0.6
 * @since 0.0.6
 *
 */
GoogleMaps.defaultLat = 35.681382;
/**
 * 初期設定用の経度
 * 東京都庁
 *
 * @version 0.0.6
 * @since 0.0.6
 *
 */
GoogleMaps.defaultLng = 139.766084;
/**
 * 管理対象の要素に付加するclass属性値のプレフィックス
 *
 * @version 0.0.6
 * @since 0.0.6
 *
 */
GoogleMaps.className = '-bc-map-element';
/**
 * クラス名
 */
GoogleMaps._name = Symbol('GoogleMaps');
/**
 * 座標要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */

var Coordinate = function () {
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.6
     * @param el 対象のDOM要素
     * @param map GoogleMaps要素
     *
     */
    function Coordinate(el, map) {
        var _this3 = this;

        _classCallCheck(this, Coordinate);

        this.el = el;
        this._map = map;
        var address = this.$el.data('address');
        // const dfd: JQueryDeferred<void> = $.Deferred<void>();
        if (address) {
            GoogleMaps.getLatLngByAddress(address, function (lat, lng) {
                _this3.lat = lat;
                _this3.lng = lng;
                _this3.position = new google.maps.LatLng(_this3.lat, _this3.lng);
                // dfd.resolve();
            });
        } else {
            this.lat = +this.$el.data('lat');
            this.lng = +this.$el.data('lng');
            this.position = new google.maps.LatLng(this.lat, this.lng);
        }
        // this._promiseLatLng = dfd.promise();
    }
    /**
     * ピンをマップに立てる
     *
     * @version 0.8.0
     * @since 0.0.6
     * @param callback 位置情報が取得できた後に実行するコールバック
     *
     */


    _createClass(Coordinate, [{
        key: 'markTo',
        value: function markTo(callback) {
            var _this4 = this;

            this._promiseLatLng.done(function () {
                _this4._markTo();
                if (callback) {
                    callback(_this4);
                }
            });
        }
        /**
         * インフォウィンドウを開く
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.8.0
         *
         */

    }, {
        key: 'openInfoWindow',
        value: function openInfoWindow() {
            this._map.info.setContent(this.el);
            this._map.info.open(this._map.gmap, this.marker);
            this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            // マップの中心を移動する
            var content = this._map.info.getContent();
            var proj = this._map.gmap.getProjection();
            var currentPoint = proj.fromLatLngToPoint(this.position);
            var scale = Math.pow(2, this._map.gmap.getZoom());
            var height = content.offsetHeight;
            var y = (currentPoint.y * scale - height) / scale;
            var newPoint = new google.maps.Point(currentPoint.x, y);
            var newPosition = proj.fromPointToLatLng(newPoint);
            this._map.gmap.panTo(newPosition);
        }
        /**
         * ピンをマップに立てる
         *
         * use: jQuery
         *
         * @version 0.12.0
         * @since 0.0.6
         *
         */

    }, {
        key: '_markTo',
        value: function _markTo() {
            this.title = this.$el.attr('title') || this.$el.data('title') || this.$el.find('h1,h2,h3,h4,h5,h6').text() || null;
            var iconURL = this.$el.data('icon');
            var iconSize = this.$el.data('iconSize');
            var iconHref = this.$el.data('iconHref');
            var iconTarget = this.$el.data('iconTarget') === '_blank' || false;
            if (iconURL) {
                this.icon = {};
                this.icon.url = iconURL;
                if (iconSize) {
                    var sizeQ = ('' + iconSize).split(/\s+/);
                    var width = +sizeQ[0];
                    if (!isNaN(width)) {
                        var height = +sizeQ[1] || width;
                        var size = new google.maps.Size(width, height);
                        this.icon.size = size;
                        this.icon.scaledSize = size;
                    }
                }
            }
            this.marker = new google.maps.Marker({
                position: this.position,
                title: this.title,
                icon: this.icon,
                map: this._map.gmap
            });
            if (iconHref) {
                google.maps.event.addListener(this.marker, 'click', Browser_1.default.getBrowser().jumpTo.bind(null, iconHref, iconTarget));
            } else if (this._map.coordinates[0] !== this._map.el) {
                google.maps.event.addListener(this.marker, 'click', this.openInfoWindow.bind(this));
            }
        }
    }]);

    return Coordinate;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GoogleMaps;