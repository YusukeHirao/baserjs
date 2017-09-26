import StructureError from '../error/StructureError';
import Component, {
	ComponentConfig,
} from './Component';
import TabElement from './TabElement';
import TabListElement from './TabListElement';

export interface TabsComponentConfig extends ComponentConfig {
	//
}

export type TabsComponentOptions = {[P in keyof TabsComponentConfig]?: TabsComponentConfig[P]};

/**
 * Tabs Component Class
 *
 * @class Component
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 * @template C Config
 *
 */
export default abstract class TabsComponent extends Component<Element, TabsComponentConfig> {
	/**
	 *
	 */
	public readonly defaultConfig: Readonly<TabsComponentConfig> = Object.freeze({
		autoId: true,
	});

	private _$tabList: TabListElement;

	private _$tabs: Set<TabElement> = new Set();

	/**
	 * Tabs Component Class
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 * @param el Assigned DOM Element
	 * @template E DOM Element Interface
	 *
	 */
	constructor (el: Element, options: TabsComponentOptions = {}) {
		super(el);
		this._traversal();
	}

	private _traversal () {
		const tabList = this.find('[role="tablist"]');
		if (tabList.length > 1) {
			throw new StructureError(`Two or more role "tablist" were found in the component.`);
		} else if (tabList.length < 1) {
			throw new StructureError(`Role "tablist" is not found in the component.`);
		}
		this._$tabList = new TabListElement(tabList.item(0));

		const tabs = this._$tabList.find('[role="tab"]');
		if (tabs.length < 1) {
			throw new StructureError(`Role "tab" is not found in the component.`);
		}
		for (const tab of Array.from(tabs)) {
			const $tab = new TabElement(tab);
			$tab.owns.set(this._$tabList.id);
			this._$tabs.add($tab);
		}
	}
}
