import UtilMath from '../Util/Math';
import Browser from '../Browser';
import BaserElement from '../BaserElement';
import Dimension from '../BaserElement/IDimension';
import BackgroundContainerOption from './IBackgroundContainerOption';

/**
 * ラジオボタンとチェックボックスの抽象クラス
 *
 * @version 0.11.0
 * @since 0.11.0
 *
 */
class BackgroundContainer extends BaserElement {

	/**
	 * 管理対象の要素に付加するclass属性値のプレフィックス
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 *
	 */
	public static className: string = '-bc-background-container-element';

	/**
	 * オプションのデフォルト値
	 *
	 * @since 0.11.0
	 *
	 */
	public static defaultOption: BackgroundContainerOption = {
		align: 'center',
		valign: 'center',
		size: 'contain',
		child: '>*:first',
		outer: false,
	};

	/**
	 * オプション情報
	 *
	 * @since 0.11.0
	 *
	 */
	protected _config: BackgroundContainerOption;

	/**
	 * 背景となる対象の要素
	 *
	 * @since 1.0.0
	 */
	private _bgElements: HTMLElement[];

	/**
	 * コンストラクタ
	 *
	 * @version 1.0.0
	 * @since 0.11.0
	 * @param el 管理するDOM要素
	 * @param options オプション
	 *
	 */
	constructor (el: HTMLElement, options: BackgroundContainerOption) {

		super(el);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		this.addClass(BackgroundContainer.className);

		this._config = this.mergeOptions(BackgroundContainer.defaultOption, options);

		if (this._config.child) {
			for (const elem of this.el.querySelectorAll(this._config.child) as NodeListOf<HTMLElement>) {
				this._bgElements.push(elem);
			}
		}

		const currentCSSPosition: string | null = getComputedStyle(this.el).position;
		if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
			this.el.style.position = 'relative';
		}

		// 初期計算
		this.calc();

		Browser.getBrowser().on('resizeend', this.calc.bind(this));

	}

	/**
	 * 計算
	 *
	 * @version 1.0.0
	 * @since 0.11.0
	 *
	 */
	public calc (): void {
		const containerWidth: number = this._config.outer ? this.el.offsetWidth : this.el.clientWidth;
		const containerHeight: number = this._config.outer ? this.el.offsetHeight : this.el.clientHeight;
		for (const el of this._bgElements) {
			const { width, height, top, left }: Dimension = UtilMath.stretchDimension(
				containerWidth,
				containerHeight,
				el.offsetWidth,
				el.offsetHeight,
				this._config.size,
				this._config.align,
				this._config.valign
			);
			const bgStyle: {
				position: 'absolute';
				width: number;
				height: number;
				maxWidth: number | string;
				minWidth: number | string;
				maxHeight: number | string;
				minHeight: number | string;
				top: number;
				left: number;
			} = {
				position: 'absolute',
				width: 0,
				height: 0,
				top: 0,
				left: 0,
				maxWidth: 'none',
				minWidth: 0,
				maxHeight: 'none',
				minHeight: 0,
			};
			bgStyle.width = width;
			bgStyle.height = height;
			bgStyle.top = top;
			bgStyle.left = left;
			BaserElement.css(el, bgStyle);
		}
	}

	/**
	 * 既にbaserJSのエレメント化しているかどうか確認する
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	protected _isElementized (): boolean {
		return this.__isElementized(BackgroundContainer);
	}

	/**
	 * baserJSのエレメント化したフラグを登録する
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	protected _elementize (): void {
		this.__elementize(BackgroundContainer);
	}

}

export default BackgroundContainer;
