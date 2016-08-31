import IElement from '../BaserElement/IElement';

interface IFormElement<E extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLProgressElement> extends IElement<HTMLElement> {
	labelText: string;
	hasFocus: boolean;
	disabled: boolean;
	defaultValue: string;
	isWrappedByLabel: boolean;
	label: HTMLLabelElement;
	wrapper: HTMLSpanElement;
	setValue (value: string | number | boolean): void;
	setDisabled (isDisabled: boolean): void;
}

export default IFormElement;
