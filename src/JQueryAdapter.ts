import UtilMath from './Util/Math';
import Timer from './Timer';
import Browser from './Browser';
import BaserElement from './BaserElement';
import AlignedBoxes from './AlignedBoxes';
import AlignedBoxCallback from './AlignedBoxes/IAlignedBoxCallback';
import BackgroundContainer from './BackgroundContainer';
import BackgroundContainerOption from './BackgroundContainer/IBackgroundContainerOption';
import Select from './Select';
import SelectOption from './Select/ISelectOption';
import Scroll from './Scroll';
import ScrollOptions from './Scroll/IScrollOptions';
import GoogleMaps from './GoogleMaps';
import GoogleMapsOption from './GoogleMaps/IGoogleMapsOption';
import YouTube from './YouTube';
import YouTubeOption from './YouTube/IYouTubeOption';
import BreakPointsOption from './BreakPoints/IBreakPointsOption';

namespace JQueryAdapter {
	'use strict';

	export function bcScrollTo (selector: any, options?: ScrollOptions): void  {
		'use strict';
		const scroll: Scroll = new Scroll();
		scroll.to(selector, options);
	}

}

namespace JQueryAdapterPrototype {
	'use strict';

	/**
	 * 自信の要素を基準に、指定の子要素を背景のように扱う
	 *
	 * TODO: BaserElement化する
	 *
	 * CSSの`background-size`の`contain`と`cover`の振る舞いに対応
	 *
	 * 基準も縦横のセンター・上下・左右に指定可能
	 *
	 * @version 1.0.0
	 * @since 0.0.9
	 * @param {Object} options オプション
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * ### Target HTML
	 *
	 * ```html
	 * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
	 * ```
	 *
	 * ### Execute
	 *
	 * ```js
	 * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
	 * ```
	 *
	 * ### Result
	 *
	 * comming soon...
	 *
	 */
	export function bcBackground (this: JQuery, options: BackgroundContainerOption): JQuery {
		'use strict';
		return this.each( (i: number, elem: HTMLElement): void => {
			/* tslint:disable */
			new BackgroundContainer(elem, options);
			/* tslint:enable */
		});
	}

	/**
	 * 要素の高さを揃える
	 *
	 * @version 0.7.0
	 * @since 0.0.15
	 *
	 */
	export function bcBoxAlignHeight (this: JQuery, columnOrKeyword: string | number | BreakPointsOption<number> = 0, detailTarget?: string, callback?: AlignedBoxCallback): JQuery {
		'use strict';
		if (typeof columnOrKeyword === 'string') {
			const keyword: string = columnOrKeyword;
			switch (keyword) {
				case 'destroy': {
					const boxes: AlignedBoxes = <AlignedBoxes> this.data(/* TODO */);
					boxes.destroy();
				}
				break;
				default: {
					// void
				}
			}

		} else {
			const column: number | BreakPointsOption<number> = columnOrKeyword;
			// 要素群の高さを揃え、setsに追加
			if (detailTarget) {
				const $detailTarget: JQuery = this.find(detailTarget);
				if ($detailTarget.length) {
					this.each(function (this: HTMLElement) {
						const $split: JQuery = $(this).find(detailTarget);
						/* tslint:disable */
						new AlignedBoxes($split[0], column, callback);
						/* tslint:enable */
					});
				}
			} else {
				/* tslint:disable */
				new AlignedBoxes(this[0], column, callback);
				/* tslint:enable */
			}
		}

		return this;

	}

	// @version 1.0.0
	// @since 0.1.0
	export function bcBoxLink (this: JQuery): JQuery {
		'use strict';
		return this.on('click', function (this: HTMLElement, e: JQueryEventObject): void {
			const $elem: JQuery = $(this);
			const $link: JQuery = $elem.find('a, area').eq(0);
			const href: string = $link.prop('href');
			if ($link.length && href) {
				const isBlank: boolean = $link.prop('target') === '_blank';
				Browser.getBrowser().jumpTo(href, isBlank);
				e.preventDefault();
			}
		});
	}

	/**
	 * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
	 *
	 * @version 0.9.2
	 * @since 0.0.1
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * comming soon...
	 *
	 */
	export function bcSelect (this: JQuery, options: string | SelectOption): JQuery {
		'use strict';
		return this.each( (i: number, elem: HTMLSelectElement): void => {
			// const $elem: JQuery = $(elem);
			if (typeof options === 'string') {
				switch (options) {
					case 'update': {
						// const select: Select = <Select> $elem.data('bc-element');
						// select.update();
					}
					break;
					default: {
						// void
					}
				}
			} else if (elem.nodeName === 'SELECT') {
				/* tslint:disable */
				new Select(elem, options);
				/* tslint:enable */
			} else if ('console' in window) {
				console.warn('TypeError: A Node is not HTMLSelectElement');
			}
		});
	}

	/**
	 * 要素内の画像の読み込みが完了してからコールバックを実行する
	 *
	 * @version 0.9.0
	 * @since 0.0.9
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * comming soon...
	 *
	 */
	export function bcImageLoaded (this: JQuery, success: () => any, error?: (e: Event) => any): JQuery {
		'use strict';
		return this.each( (i: number, elem: HTMLElement): void => {
			const $elem: JQuery = $(elem);
			const manifest: JQueryPromise<any>[] = [];
			const $imgs: JQuery = $elem.filter('img').add($elem.find('img'));
			if ($imgs.length) {
				$imgs.hide();
				$imgs.each(function (this: HTMLImageElement): void {
					const loaded: JQueryDeferred<any> = $.Deferred();
					let img: HTMLImageElement | null = new Image();
					img.onload = function (): any {
						loaded.resolve();
						img = null; // GC
					};
					img.onabort = img.onerror = function (e: Event): any {
						loaded.reject(e);
						img = null; // GC
					};
					img.src = this.src;
					manifest.push(loaded.promise());
				});
				$.when.apply($, manifest).done( (): void => {
					$imgs.show();
					success.call(elem);
				}).fail( (e: Event): void => {
					if (error) {
						error.call(elem, e);
					}
				});
			} else {
				success.call(elem);
			}
		});
	}

	/**
	 * 親のコンテナ要素の幅に合わせて、自信の縦横比を保ったまま幅の変更に対応する
	 *
	 * iframeなどの縦横比を保ちたいが、幅を変更しても高さが変化しない要素などに有効
	 *
	 * @version 0.0.9
	 * @since 0.0.9
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * ### Target HTML
	 *
	 * ```html
	 * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
	 * ```
	 *
	 * ### Execute
	 *
	 * ```js
	 * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
	 * ```
	 *
	 * ### Result
	 *
	 * comming soon...
	 *
	 */
	export function bcKeepAspectRatio (this: JQuery): JQuery {
		'use strict';
		const $w: JQuery = $(window);
		this.each( (i: number, elem: HTMLElement): void => {
			const $elem: JQuery = $(elem);
			const baseWidth: number = <number> +$elem.data('width');
			const baseHeight: number = <number> +$elem.data('height');
			const aspectRatio: number = baseWidth / baseHeight;
			$w.on('resize', (): void => {
				const width: number = $elem.width();
				$elem.css({
					width: '100%',
					height: width / aspectRatio,
				});
			}).trigger('resize');
		});

		Timer.wait(30, () => {
			$w.trigger('resize');
		});

		return this;
	}

	/**
	 * リンク要素からのアンカーまでスムーズにスクロールをさせる
	 *
	 * @version 0.1.0
	 * @since 0.0.8
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * comming soon...
	 *
	 */
	export function bcScrollTo (this: JQuery, options?: ScrollOptions): JQuery {
		'use strict';
		return this.on('click', function (this: HTMLElement, e: JQueryMouseEventObject): void {
			const $this: JQuery = $(this);
			let href: string = $this.attr('href');
			const scroll: Scroll = new Scroll();
			if (href) {
				// キーワードを一番に優先する
				if (options && options.keywords && $.isPlainObject(options.keywords)) {
					for (const keyword in options.keywords) {
						if (options.keywords.hasOwnProperty(keyword)) {
							const target: string = options.keywords[keyword];
							if (keyword === href) {
								scroll.to(target, options);
								e.preventDefault();
								return;
							}
						}
					}
				}
				// 「/pathname/#hash」のリンクパターンの場合
				// 「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
				const absPath: string = $this.prop('href');
				const currentReferer: string = location.protocol + '//' + location.host + location.pathname + location.search;
				href = absPath.replace(currentReferer, '');
				// #top はHTML5ではページトップを意味する
				if (href === '#top') {
					scroll.to(0, options);
					e.preventDefault();
					return;
				}
				// セレクタとして要素が存在する場合はその要素に移動
				// 「/」で始まるなどセレクターとして不正な場合、例外を投げることがあるので無視する
				try {
					const target: HTMLElement = document.querySelector(href) as HTMLElement;
					if (target) {
						scroll.to(target, options);
						e.preventDefault();
						return;
					}
				} catch (err) { /* void */ }
			}
			return;
		});
	}

	/**
	 * リストを均等に分割する
	 *
	 * @version 0.2.0
	 * @since 0.0.14
	 *
	 */
	export function bcSplitList (this: JQuery, columnSize: number, options: any): JQuery {
		'use strict';
		const CLASS_NAME: string = 'splited-list';
		const CLASS_NAME_NTH: string = 'nth';
		const CLASS_NAME_ITEM: string = 'item';
		const config: any = $.extend(
			{
				dataKey: '-bc-split-list-index',
				splitChildren: true,
			},
			options
		);
		this.each( (index: number, elem: HTMLElement): void => {

			const $container: JQuery = $(elem);
			const $list: JQuery = $container.find('>ul');
			let $items: JQuery;
			if (!config.splitChildren) {
				// 直下のliのみ取得
				$items = $list.find('>li').detach();
			} else {
				// 入れ子のliも含めて全て取得
				$items = $list.find('li').detach();
				// 入れ子のulの削除
				$items.find('ul').remove();
			}

			// リストアイテムの総数
			const size: number = $items.length;
			const splited: number[] = UtilMath.split(size, columnSize);
			const itemArray: HTMLElement[] = $items.toArray();

			for (let i: number = 0; i < columnSize; i++) {
				const sizeByColumn: number = splited[i];
				const col: HTMLElement = document.createElement('ul');
				BaserElement.addClass(col, CLASS_NAME);
				BaserElement.addClass(col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
				col.appendChild(elem);
				for (let j: number = 0; j < sizeByColumn; j++) {
					const item: HTMLElement | undefined = itemArray.shift();
					if (item) {
						col.appendChild(item);
						// TODO: item.data(config.dataKey, i);
						BaserElement.addClass(item, CLASS_NAME, CLASS_NAME_ITEM);
						BaserElement.addClass(item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
					}
				}
			}

			$list.remove();

		});
		return this;
	}

	/**
	 * マップを埋め込む
	 *
	 * 現在の対応はGoogleMapsのみ
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * ### Target HTML
	 *
	 * ```html
	 * <div class="sample" data-lat="33.606785" data-lng="130.418314"></div>
	 * ```
	 *
	 * ### Execute
	 *
	 * ```js
	 * $('.sample').bcMaps();
	 * ```
	 *
	 * ### Result
	 *
	 * comming soon...
	 *
	 */
	export function bcMaps (this: JQuery, options?: GoogleMapsOption): JQuery {
		'use strict';
		return this.each( (i: number, elem: HTMLElement): void => {
			const $elem: JQuery = $(elem);
			const data: GoogleMaps = $elem.data(GoogleMaps.className);
			if (data) {
				data.reload(options);
			} else {
				/* tslint:disable */
				new GoogleMaps(elem, options);
				/* tslint:enable */
			}
		});
	}

	/**
	 * YouTubeを埋め込む
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * ### Target HTML
	 *
	 * ```html
	 * <div class="sample" data-id="rb0zOstIiyU" data-width="720" data-height="480"></div>
	 * ```
	 *
	 * ### Execute
	 *
	 * ```js
	 * $('.sample').bcYoutube();
	 * ```
	 *
	 */
	export function bcYoutube (this: JQuery, options?: YouTubeOption): JQuery {
		'use strict';
		return this.each( (i: number, elem: HTMLElement): void => {
			const $elem: JQuery = $(elem);
			const data: YouTube = $elem.data(YouTube.className);
			if (data) {
				data.reload(options);
			} else {
				/* tslint:disable */
				new YouTube(elem, options);
				/* tslint:enable */
			}
		});
	}

}

$.extend($, JQueryAdapter);
$.extend($.fn, JQueryAdapterPrototype);
