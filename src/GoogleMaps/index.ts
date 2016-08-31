import BaserElement from '../BaserElement';
import Browser from '../Browser';
import GoogleMapsOption from './IGoogleMapsOption/';

/**
 * このモジュール（スコープ）ではjQueryを使用しない
 */
declare var $: {};

/**
 * マップ要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */
class GoogleMaps extends BaserElement<HTMLDivElement> {

	/**
	 *
	 */
	public static defaultOptions: GoogleMapsOption = {

	};

	/**
	 * 初期設定用の緯度
	 * 東京都庁
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	public static defaultLat: number = 35.681382;

	/**
	 * 初期設定用の経度
	 * 東京都庁
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	public static defaultLng: number = 139.766084;

	/**
	 * 管理対象の要素に付加するclass属性値のプレフィックス
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	public static className: string = '-bc-map-element';

	/**
	 * クラス名
	 */
	protected static _name: Symbol = Symbol('GoogleMaps');

	/**
	 * 緯度
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 */
	public lat: number;

	/**
	 * 経度
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 */
	public lng: number;

	/**
	 * Google Mapsのインスタンス
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	public gmap: google.maps.Map;

	/**
	 * インフォウィンドウ
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	public info: google.maps.InfoWindow;

	/**
	 * ピンを置いた座標の要素
	 *
	 * @version 1.0.0
	 * @since 0.0.6
	 *
	 */
	public coordinates: HTMLElement[];

	/**
	 * マップオプション
	 *
	 * @version 0.0.9
	 * @since 0.0.9
	 *
	 */
	public mapOption: GoogleMapsOption;

	/**
	 * バウンズオブジェクト
	 *
	 * @version 0.6.0
	 * @since 0.6.0
	 *
	 */
	public markerBounds: google.maps.LatLngBounds;

	/**
	 * 住所文字列から座標を非同期で取得
	 *
	 * @version 0.12.0
	 * @since 0.2.0
	 *
	 */
	public static getLatLngByAddress (address: string, callback: (lat: number, lng: number) => void): void {
		const geocoder: google.maps.Geocoder = new google.maps.Geocoder();
		geocoder.geocode(
			<google.maps.GeocoderRequest> {
				address: address,
			},
			(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus): void => {
				switch (status) {
					case google.maps.GeocoderStatus.OK: {
						const lat: number = results[0].geometry.location.lat();
						const lng: number = results[0].geometry.location.lng();
						callback(lat, lng);
					}
					break;
					case google.maps.GeocoderStatus.INVALID_REQUEST:
					case google.maps.GeocoderStatus.ZERO_RESULTS: {
						if (console && console.warn) {
							console.warn(`ReferenceError: "${address}は不正な住所だったため結果を返すことができませんでした。"`);
						}
					}
					break;
					case google.maps.GeocoderStatus.OVER_QUERY_LIMIT: {
						if (console && console.warn) {
							console.warn(`Error: "リクエスト数の上限を超えました。${address}は処理されません。"`);
						}
					}
					break;
					case google.maps.GeocoderStatus.ERROR:
					case google.maps.GeocoderStatus.UNKNOWN_ERROR: {
						if (console && console.warn) {
							console.warn(`Error: "エラーが発生しました。${address}は処理されません。"`);
						}
					}
					break;
					default: {
						// void
					}
				}
			}
		);
	}

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
	constructor (el: HTMLDivElement, options?: GoogleMapsOption) {
		super(el);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		if ('google' in window && google.maps) {
			this.addClass(GoogleMaps.className);

			this.mapOption = this.mergeOptions(GoogleMaps.defaultOptions, options);
			this._init();

			this.data(GoogleMaps.className, this);
		} else {
			if ('console' in window) {
				console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
				return;
			}
		}
	}

	/**
	 * 再読み込み・再設定
	 *
	 * @version 0.6.0
	 * @since 0.2.0
	 *
	 */
	public reload (options?: GoogleMapsOption): void {
		this.mapOption = options ? this.mergeOptions(GoogleMaps.defaultOptions, options) : this.mapOption;
		this._init();
	}

	/**
	 * 既にbaserJSのエレメント化しているかどうか確認する
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	protected _isElementized (): boolean {
		return this.__isElementized(GoogleMaps);
	}

	/**
	 * baserJSのエレメント化したフラグを登録する
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	protected _elementize (): void {
		this.__elementize(GoogleMaps);
	}

	/**
	 * 初期化
	 *
	 * @version 1.0.0
	 * @since 0.0.6
	 *
	 */
	private _init (): void {

		// data-*属性からの継承
		this.mapOption = this.mergeOptions(this.mapOption, {
			zoom: this.data('zoom'),
			fitBounds: this.data('fit-bounds'),
		});

		this.markerBounds = new google.maps.LatLngBounds();

		const mapCenterLat: number = parseInt(this.data('lat'), 10) || GoogleMaps.defaultLat;
		const mapCenterLng: number = parseInt(this.data('lng'), 10) || GoogleMaps.defaultLng;

		const mapCenterAddress: string = this.data('address') || '';

		if (mapCenterAddress) {
			// 住所から緯度・経度を検索する（非同期）
			GoogleMaps.getLatLngByAddress(mapCenterAddress, (lat: number, lng: number): void => {
				this._render(lat, lng);
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
	private _render (mapCenterLat: number, mapCenterLng: number): void {

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

}

/**
 * 座標要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */
class Coordinate {

	public title: string;
	public icon: google.maps.Icon | undefined;
	public el: HTMLElement;
	public $el: JQuery;
	public lat: number;
	public lng: number;
	public position: google.maps.LatLng; // @since 0.6.0
	public marker: google.maps.Marker;
	private _map: GoogleMaps; // @since 0.8.0
	private _promiseLatLng: JQueryPromise<void>; // @since 0.6.0

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
	constructor (el: HTMLElement, map: GoogleMaps) {

		this.el = el;
		this._map = map;

		const address: string = this.$el.data('address');
		// const dfd: JQueryDeferred<void> = $.Deferred<void>();

		if (address) {
			GoogleMaps.getLatLngByAddress(address, (lat: number, lng: number): void => {
				this.lat = lat;
				this.lng = lng;
				this.position = new google.maps.LatLng(this.lat, this.lng);
				// dfd.resolve();
			});
		} else {
			this.lat = <number> +this.$el.data('lat');
			this.lng = <number> +this.$el.data('lng');
			this.position = new google.maps.LatLng(this.lat, this.lng);
			// dfd.resolve();
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
	public markTo (callback?: (coordinate: Coordinate) => void): void {
		this._promiseLatLng.done( (): void => {
			this._markTo();
			if (callback) {
				callback(this);
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
	public openInfoWindow (): void {
		this._map.info.setContent(this.el);
		this._map.info.open(this._map.gmap, this.marker);
		this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);

		// マップの中心を移動する
		const content: HTMLElement = <HTMLElement> this._map.info.getContent();
		const proj: google.maps.Projection = this._map.gmap.getProjection();
		const currentPoint: google.maps.Point = proj.fromLatLngToPoint(this.position);
		const scale: number = Math.pow(2, this._map.gmap.getZoom());
		const height: number = content.offsetHeight;
		const y: number = (currentPoint.y * scale - height) / scale;
		const newPoint: google.maps.Point = new google.maps.Point(currentPoint.x, y);
		const newPosition: google.maps.LatLng = proj.fromPointToLatLng(newPoint);
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
	private _markTo (): void {
		this.title = this.$el.attr('title') || this.$el.data('title') || this.$el.find('h1,h2,h3,h4,h5,h6').text() || null;
		const iconURL: string = this.$el.data('icon');
		const iconSize: string = this.$el.data('iconSize');
		const iconHref: string = this.$el.data('iconHref');
		const iconTarget: boolean = (this.$el.data('iconTarget') === '_blank') || false;
		if (iconURL) {
			this.icon = {};
			this.icon.url = iconURL;
			if (iconSize) {
				const sizeQ: string[] = `${iconSize}`.split(/\s+/);
				const width: number = +sizeQ[0];
				if (!isNaN(width)) {
					const height: number = +sizeQ[1] || width;
					const size: google.maps.Size = new google.maps.Size(width, height);
					this.icon.size = size;
					this.icon.scaledSize = size;
				}
			}
		}
		this.marker = new google.maps.Marker(<google.maps.MarkerOptions> {
			position: this.position,
			title: this.title,
			icon: this.icon,
			map: this._map.gmap,
		});
		if (iconHref) {
			google.maps.event.addListener(this.marker, 'click', Browser.getBrowser().jumpTo.bind(null, iconHref, iconTarget));
		} else if (this._map.coordinates[0] !== this._map.el) {
			google.maps.event.addListener(this.marker, 'click', this.openInfoWindow.bind(this));
		}
	}

}

export default GoogleMaps;
