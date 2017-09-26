import StructureError from '../error/StructureError';
import Component, {
	ComponentConfig,
} from './Component';
import TabElement from './TabElement';
import TabListElement from './TabListElement';
import TabPanelElement from './TabPanelElement';

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
export default class TabsComponent extends Component<Element, TabsComponentConfig> {
	/**
	 *
	 */
	public readonly defaultConfig: Readonly<TabsComponentConfig> = Object.freeze({
		autoId: true,
	});

	private _tabList: TabListElement;

	private _tabRelations: Map<TabElement, TabPanelElement> = new Map();

	private _tabs: {[id: string]: TabElement} = {};

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
		super(el, options);
		this._traversal();
	}

	private _traversal () {
		/**
		 * Tab list
		 */
		const tabList = this.find('[role="tablist"]');
		if (tabList.length > 1) {
			throw new StructureError(`Two or more role "tablist" were found in the component.`);
		} else if (tabList.length < 1) {
			throw new StructureError(`Role "tablist" is not found in the component.`);
		}
		this._tabList = new TabListElement(tabList.item(0));

		/**
		 * Tabs
		 */
		const tabs = this._tabList.find('[role="tab"]');
		const $tabs: TabElement[] = [];
		const selectedTabs: number[] = [];
		if (tabs.length < 1) {
			throw new StructureError(`Role "tab" is not found in the component.`);
		}
		for (let i = 0, l = tabs.length; i < l; i++) {
			const $tab = new TabElement(tabs[i]);
			$tab.owns.set(this._tabList.id);
			$tabs.push($tab);
			this._tabs[$tab.id] = $tab;
			// selected state
			if ($tab.selected.get()) {
				selectedTabs.push(i);
			}
		}

		// default selected index is 0
		if (selectedTabs.length === 0) {
			selectedTabs.push(0);
		}

		/**
		 * Tab panels
		 */
		const panels = this.find('[role="tabpanel"]');
		const _setTab = this._setTab.bind(this);
		if (panels.length < 1) {
			throw new StructureError(`Role "tabpanel" is not found in the component.`);
		} else if (panels.length !== $tabs.length) {
			throw new StructureError(`The number of role "tab" and role "tabpanel" must be the same.`);
		}
		for (let i = 0, l = $tabs.length; i < l; i++) {
			const $tab = $tabs[i];
			const $panel = new TabPanelElement(panels[i]);
			$tab.controls.set($panel.id);
			$panel.owns.set($tab.id);
			this._tabRelations.set($tab, $panel);
			// selected and hidden
			const selected = selectedTabs.includes(i);
			$panel.hidden.set(!selected);
			// event
			$tab.onClick(_setTab, true);
		}
	}

	private _setTab (id: string) {
		// all
		this._tabRelations.forEach((panel, tab) => {
			tab.selected.set(tab.id === id);
			panel.hidden.set(tab.id !== id);
		});
	}
}
