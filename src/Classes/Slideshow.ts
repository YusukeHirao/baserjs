import BaserElement from './BaserElement';
import Sequencer from './Sequencer';

const panelGroupDOMElements: WeakMap<Slideshow, HTMLElement> = new WeakMap();

type TPosition = 'prev' | 'current' | 'next' | null;

export interface ISlideshowConfig {
	/**
	 * 遷移時間
	 */
	speed: number;

	/**
	 * 待機時間
	 */
	wait: number;

	/**
	 * 繰り返し
	 */
	repeat: boolean;

	/**
	 * 自動再生
	 */
	autoPlay: boolean;
}

export default class Slideshow extends BaserElement<HTMLElement, ISlideshowConfig> {

	private _seq: Sequencer<SlideshowPanel>;

	public x (i: number) {
		this._seq.skipTo(i);
	}

	public get length () {
		return this._seq.length;
	}

	protected _create () {
		super._create({
			speed: 400,
			wait: 800,
			repeat: false,
			autoPlay: false,
		});
		this._init(this.el);
	}

	private _init (el: HTMLElement) {
		// Extracting resources & loading
		const imgs = el.querySelectorAll('img');
		const imgLoadPromises: Promise<string>[] = [];
		for (const img of Array.from(imgs)) {
			imgLoadPromises.push(imageLoader(img.src));
		}
		Promise.all(imgLoadPromises).then(this._loaded.bind(this));
		this._createDOM();
	}

	private _loaded () {
		this.el.setAttribute('data-slideshow-loaded', 'true');
	}

	private _createDOM () {
		const el = this.el;
		const g = el.firstElementChild as HTMLElement;
		if (!g) {
			throw new Error('Invalid HTML Architecture of "Gallery" type.');
		}
		el.setAttribute('data-slideshow-loaded', 'false');
		el.setAttribute('aria-live', 'polite');
		panelGroupDOMElements.set(this, g);
		const panelEls = Array.from(g.children);
		const panels: SlideshowPanel[] = [];
		for (let i = 0, l = panelEls.length; i < l; i++) {
			const panelEl = panelEls[i] as HTMLElement;
			panelEl.setAttribute('tabindex', '-1');
			const panel = new SlideshowPanel(panelEl);
			panels.push(panel);
			panel.appendTo(g);
			panel.hidden = i === 0;
		}
		this._setPanels(panels);
	}

	private _setPanels (panels: SlideshowPanel[]) {
		this._seq = new Sequencer(panels, this._config.wait);
		this._seq
			.repeat(this._config.repeat != null)
			.onContinue((progress) => {
				if (progress.list) {
					for (const item of progress.list) {
						item.position = 'prev';
						item.hidden = true;
					}
				}
				progress.current.position = 'current';
				progress.current.hidden = true;
				if (progress.next) {
					progress.next.position = 'next';
					progress.next.hidden = false;
				}
			})
			.onStopped((progress) => {
				console.log(`stop: ${progress.index}`);
				if (progress.list) {
					for (let i = 0, l = progress.list.length; i < l; i++) {
						const item = progress.list[i];
						if (i === progress.index) {
							item.position = 'current';
							item.hidden = false;
						} else {
							item.position = 'prev';
							item.hidden = true;
						}
					}
				}
			});
		if (this._config.autoPlay != null) {
			this._seq.start();
		}
	}

}

function imageLoader (imgPath: string) {
	return new Promise<string>((resolve) => {
		const img = new Image();
		img.onload = () => {
			resolve(img.src);
		};
		img.src = imgPath;
	});
}

function typeCasting (dataset: DOMStringMap): { [prop: string]: string | number | boolean } {
	const result: { [prop: string]: string | number | boolean } = {};
	for (const prop in dataset) {
		if (prop in dataset) {
			const value = dataset[prop];
			if (value == null) {
				continue;
			} else if (value === 'true') {
				result[prop] = true;
			} else if (value === 'false') {
				result[prop] = false;
			} else if (!isNaN(parseFloat(value))) {
				result[prop] = +value;
			} else {
				result[prop] = value;
			}
		}
	}
	return result;
}

const panelDOMElements: WeakMap<SlideshowPanel, HTMLElement> = new WeakMap();
class SlideshowPanel {
	private _hidden: boolean;
	private _position: TPosition = null;
	constructor (el: HTMLElement) {
		panelDOMElements.set(this, el);
		el.setAttribute('role', 'img');
		this.hidden = true;
	}
	public appendTo (g: HTMLElement) {
		g.appendChild(panelDOMElements.get(this)!);
	}
	public set position (position: TPosition) {
		this._position = position;
		const el = panelDOMElements.get(this)!;
		if (position) {
			el.setAttribute('data-slideshow-item-position', position);
		} else {
			el.removeAttribute('data-slideshow-item-position');
		}
	}
	public set hidden (hidden: boolean) {
		if (this._hidden !== hidden) {
			const el = panelDOMElements.get(this)!;
			el.setAttribute('aria-hidden', `${hidden}`);
			this._hidden = hidden;
		}
	}
}
