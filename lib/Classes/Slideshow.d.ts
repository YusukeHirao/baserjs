import BaserElement from './BaserElement';
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
    private _seq;
    x(i: number): void;
    readonly length: number;
    protected _create(): void;
    private _init(el);
    private _loaded();
    private _createDOM();
    private _setPanels(panels);
}
