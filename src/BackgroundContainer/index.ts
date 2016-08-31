import UtilMath from '../Util/Math';
import Browser from '../Browser';
import BaserElement from '../BaserElement';
import Dimension from '../BaserElement/IDimension';
import BackgroundContainerOption from './IBackgroundContainerOption';

/**
 * 擬似背景のコンテナ
 *
 * @version 1.0.0
 * @since 0.11.0
 *
 */
class BackgroundContainer<E extends HTMLElement> extends BaserElement<E> {

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
	constructor (el: E, options: BackgroundContainerOption) {

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
			el.style.position = 'absolute';
			el.style.width = `${width}px`;
			el.style.maxWidth = 'none';
			el.style.minWidth = '0';
			el.style.height = `${height}px`;
			el.style.maxHeight = 'none';
			el.style.minHeight = '0';
			el.style.top = `${top}px`;
			el.style.left = `${left}px`;
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
