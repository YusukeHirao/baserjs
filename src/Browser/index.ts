import EventDispatcher from '../EventDispatcher';
import Locational from '../Locational';
import BrowserUserAgent from './IBrowserUserAgent';

/**
 * このモジュール（スコープ）ではjQueryを使用しない
 */
declare var $: {};

/**
 * ブラウザの情報を管理するクラス
 *
 * TODO: テストを書く（テストフレームワークの選定から）
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */
export default class Browser extends EventDispatcher {

	/**
	 *
	 */
	private static _browser: Browser;

	/**
	 * リサイズイベントからリサイズエンドイベントまでのインターバル
	 *
	 * @version 0.0.2
	 * @since 0.0.2
	 *
	 */
	public resizeEndInterval: number = 100;

	/**
	 * スクロールイベントからスクロールエンドイベントまでのインターバル
	 *
	 * @version 0.0.2
	 * @since 0.0.2
	 *
	 */
	public scrollEndInterval: number = 100;

	/**
	 * 現在リサイズ中かどうか
	 *
	 * @version 0.0.2
	 * @since 0.0.2
	 *
	 */
	public isResize: boolean = false;

	/**
	 * 現在スクロール中かどうか
	 *
	 * @version 0.0.2
	 * @since 0.0.2
	 *
	 */
	public isScroll: boolean = false;

	/**
	 *
	 */
	private _resizeEndTimer: number;

	/**
	 *
	 */
	private _scrollEndTimer: number;

	public static getBrowser (): Browser {
		if (!Browser._browser) {
			Browser._browser = new Browser();
		}
		return Browser._browser;
	}

	/**
	 * コンストラクタ
	 *
	 * @version 0.12.0
	 * @since 0.0.2
	 *
	 */
	constructor () {
		super();
		// リサイズイベント
		window.addEventListener('resize', this._onResize.bind(this), false);
		// スクロールイベント
		window.addEventListener('scroll', this._onScroll.bind(this), false);
	}

	public get width (): number {
		return window.document.documentElement.clientWidth;
	}

	public get height (): number {
		return window.document.documentElement.clientWidth;
	}

	public set scrollTop (y: number) {
		window.scrollTo(this.scrollLeft, y);
	}

	public get scrollTop (): number {
		return window.pageYOffset;
	}

	public set scrollLeft (x: number) {
		window.scrollTo(x, this.scrollTop);
	}

	public get scrollLeft (): number {
		return window.pageXOffset;
	}

	/**
	 * デバイス・OS・ブラウザの情報
	 *
	 * @version 0.12.0
	 * @since 0.12.0
	 *
	 */
	public get spec (): { isTouchable: boolean; ua: BrowserUserAgent; } {
		return {
			isTouchable: 'ontouchstart' in window,
			ua: this._getUA(),
		};
	}

	/**
	 * 参照するAPIのスキーム
	 *
	 * @version 0.12.0
	 * @since 0.12.0
	 *
	 */
	public get availableScheme (): '//' | 'http://' {
		return /https?:/i.test(location.protocol) ? '//' : 'http://';
	}

	/**
	 * ページ遷移する
	 *
	 * @version 0.12.0
	 * @since 0.12.0
	 *
	 */
	public jumpTo (path: string | Locational, isBlank: boolean = false): void {
		let href: string;
		if (typeof path === 'string') {
			href = path;
		} else {
			href = path.href;
		}
		if (!isBlank) {
			window.location.href = href;
		} else {
			window.open(href, undefined);
		}
	}

	/**
	 * 現在のURLのパラメータをリンク先へ引き継がせる
	 *
	 * @version 0.12.0
	 * @since 0.12.0
	 *
	 */
	public inheritParams (targetParam: string): void {
		type LinkElement = HTMLAnchorElement | HTMLAreaElement;
		const target: NodeListOf<Element> = document.querySelectorAll('a[href], area[href]');
		const thisLocation: Locational = new Locational(location);
		if (!(targetParam in thisLocation.params)) {
			return;
		}
		const query: string = targetParam;
		const value: string | (string | undefined)[] | undefined = thisLocation.params[targetParam];
		for (const elem of target) {
			const targetElem: LinkElement = <LinkElement> elem;
			const loc: Locational = new Locational(targetElem);
			if (thisLocation.host === loc.host) {
				loc.addParam(query, value);
				targetElem.href = loc.href;
			}
		}
	}

	private _onResize (): void {
		if (!this.isResize) {
			this.trigger('resizestart');
		}
		this.isResize = true;
		this.trigger('resize');
		window.clearTimeout(this._resizeEndTimer);
		this._resizeEndTimer = window.setTimeout(
			(): void => {
				this.isResize = false;
				this.trigger('resize');
				this.trigger('resizeend');
			},
			this.resizeEndInterval
		);
	}

	private _onScroll (): void {
		if (!this.isScroll) {
			this.trigger('scrollstart');
		}
		this.isScroll = true;
		this.trigger('scroll');
		window.clearTimeout(this._scrollEndTimer);
		this._scrollEndTimer = window.setTimeout(
			(): void => {
				this.isScroll = false;
				this.trigger('scroll');
				this.trigger('scrollend');
			},
			this.resizeEndInterval
		);
	}

	/**
	 * ユーザーエージェント情報を取得する
	 *
	 * @version 0.12.0
	 * @since 0.12.0
	 *
	 */
	private _getUA (): BrowserUserAgent {
		const ua: string = navigator.userAgent;
		const bua: BrowserUserAgent = {
			iOS: false,
			android: /android/i.test(ua),
			iPad: /ipad/i.test(ua),
			iPhone: /iphone/i.test(ua),
			iPod: /ipod/i.test(ua),
			safari: /safari/i.test(ua),
			chrome: /crios|chrome/i.test(ua),
			edge: /edge/i.test(ua),
			ie: /msie/.test(ua),
		};
		bua.iOS = bua.iPad || bua.iPhone || bua.iPod || false;
		if (bua.chrome) {
			bua.safari = false;
		}
		if (bua.edge) {
			bua.safari = false;
			bua.chrome = false;
		}
		return bua;
	}

}
