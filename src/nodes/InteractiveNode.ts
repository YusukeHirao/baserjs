// TODO: IntersectionObserve

import CoreNode from './CoreNode';

/**
 * Abstract Interactive Element Wrapper Class
 *
 * @class InteractiveNode
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class InteractiveNode<E extends Element = Element> extends CoreNode<E> {
	/**
	 * Abstract Interactive Element Wrapper Class
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 * @param el Assigned DOM Element
	 * @template E DOM Element Interface
	 *
	 */
	constructor (el: E) {
		super(el);
		el.addEventListener(
			'click',
			(e: MouseEvent) => {
				const t = this.trigger<string>('click', [(e.currentTarget as Element).id]);
				if (t.isDefaultPrevented()) {
					e.preventDefault();
				}
			},
			false,
		);
	}

	public onClick (eventHandler: (id: string) => void, preventDefault: boolean) {
		this.on('click', (e, id: string) => {
			eventHandler(id);
			if (preventDefault) {
				e.preventDefault();
			}
		});
	}
}
