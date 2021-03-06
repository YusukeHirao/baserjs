import InteractiveNode from './InteractiveNode';

export interface ComponentConfig {
	autoId: boolean;
}

/**
 * Abstract Interactive Element Structure Class
 *
 * @class Component
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 * @template C Config
 *
 */
export default abstract class Component<E extends Element = Element, C extends ComponentConfig = ComponentConfig> extends InteractiveNode<E> {
	/**
	 *
	 */
	public readonly defaultConfig: Readonly<C> = Object.freeze({
		autoId: true,
	} as C);

	/**
	 *
	 */
	private _config: Readonly<C>;

	/**
	 * Abstract Interactive Element Structure Class
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 * @param el Assigned DOM Element
	 * @template E DOM Element Interface
	 *
	 */
	constructor (el: E, options: {[P in keyof C]?: C[P]} = {}) {
		super(el);
		const config = Object.assign({}, this.defaultConfig, options) as C;
		this._config = Object.freeze(config);
	}
}
