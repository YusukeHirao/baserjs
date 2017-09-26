import Component, { ComponentConfig } from './Component';
export interface TabsComponentConfig extends ComponentConfig {
}
export declare type TabsComponentOptions = {
    [P in keyof TabsComponentConfig]?: TabsComponentConfig[P];
};
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
    readonly defaultConfig: Readonly<TabsComponentConfig>;
    private _$tabList;
    private _$tabs;
    /**
     * Tabs Component Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: Element, options?: TabsComponentOptions);
    private _traversal();
}
