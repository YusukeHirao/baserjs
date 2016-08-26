import DispatchEvent from './DispatchEvent';
import Browser from './Browser';
import Timer from './Timer';
import { ScrollOptions } from '../Interface/';

/**
 * このモジュール（スコープ）ではjQueryを使用しない
 */
declare var $: {};

/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */
class Scroll {

	public static speed: number = 4;
	public static interval: number = 20;
	public static delayWhenURLHashTarget: number = 30;

	public targetX: number;
	public targetY: number;
	public prevX: number;
	public prevY: number;
	public isScroll: boolean;
	public timer: Timer = new Timer();
	public options: ScrollOptions;

	/**
	 * 対象の要素もしくは位置にスクロールを移動させる
	 *
	 * @version 1.0.0
	 * @since 0.0.8
	 * @param selector 対象の要素のセレクタ・HTMLオブジェクト・もしくはスクロール位置
	 * @param options オプション
	 * @return インスタンス自信
	 *
	 */
	public to (selector: string | HTMLElement | number, options?: ScrollOptions): Scroll {

		this.options = options || {};
		let offset: number = this.options.offset || 0;

		if (this.options.wheelCancel) {
			document.addEventListener('wheel', (): void => {
				if (this.isScroll) {
					this._finish();
					if (this.options.onScrollCancel) {
						this.options.onScrollCancel.call(this, new DispatchEvent('scrollcancel'));
					}
				}
				return;
			});
		}

		// 第一引数が数値だった場合はその値のy軸へスクロール
		if (typeof selector === 'number') {
			offset += selector || 0;
			this.targetX = 0;
			this.targetY = offset;
		} else if (selector) {
			let target: HTMLElement;
			if (typeof selector === 'string') {
				target = document.querySelector(selector) as HTMLElement;
			} else {
				target = selector;
			}
			if (!target) {
				return this;
			}
			let elem: HTMLElement = target[0];
			// スクロール先座標をセットする
			let x: number = 0;
			let y: number = 0;
			// 親のオフセットを足していって自身の座標を確定
			while (elem) {
				x += elem.offsetLeft;
				y += elem.offsetTop;
				elem = <HTMLElement> elem.offsetParent;
			}
			const winWidth: number = document.documentElement.clientWidth;
			const winHeight: number = document.documentElement.clientHeight;
			const docWidth: number = document.documentElement.scrollWidth;
			const docHeight: number = document.documentElement.scrollHeight;
			const maxScrollX: number = Math.max(winWidth, docWidth);
			const maxScrollY: number = Math.max(winHeight, docHeight);
			this.targetX = Math.min(x, maxScrollX) + offset;
			this.targetY = Math.min(y, maxScrollY) + offset;
		} else {
			const target: HTMLElement = document.getElementById(location.hash.replace('#', ''));
			if (target) {
				Timer.wait(Scroll.delayWhenURLHashTarget, (): void => {
					window.scrollTo(0, 0);
					this.to(target, {
						offset: offset
					});
					return;
				});
			}
			return this;
		}
		// スクロール停止中ならスクロール開始
		if (!this.isScroll) {
			this.isScroll = true;
			if (this.options.onScrollStart) {
				this.options.onScrollStart.call(this, new DispatchEvent('scrollstart'));
			}
			this._progress();
		}
		return this;
	}

	/**
	 * スクロール
	 *
	 * @version 1.0.0
	 * @since 0.0.8
	 *
	 */
	private _progress (): void {
		const browser: Browser = Browser.getBrowser();
		const currentX: number = browser.scrollLeft;
		const currentY: number = browser.scrollTop;
		const vx: number = (this.targetX - currentX) / Scroll.speed;
		const vy: number = (this.targetY - currentY) / Scroll.speed;
		if ((Math.abs(vx) < 1 && Math.abs(vy) < 1) || (this.prevX === currentX && this.prevY === currentY)) {
			// 目標座標付近に到達していたら終了
			window.scrollTo(this.targetX, this.targetY);
			this._finish();
			if (this.options.onScrollEnd) {
				this.options.onScrollEnd.call(this, new DispatchEvent('scrollend'));
			}
		} else {
			const nextX: number = Math.floor(currentX + vx);
			const nextY: number = Math.floor(currentY + vy);
			// 繰り返し
			window.scrollTo(nextX, nextY);
			this.prevX = currentX;
			this.prevY = currentY;
			if (this.options.onScrollProgress) {
				this.options.onScrollProgress.call(this, new DispatchEvent('scrollprogress'));
			}
			this.timer.wait(Scroll.interval, this._progress, this);
		}
	}

	/**
	 * スクロールの終了
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 *
	 */
	private _finish (): void {
		this.isScroll = false;
		this.prevX = null;
		this.prevY = null;
		this.timer.stop();
	}

}

export default Scroll;
