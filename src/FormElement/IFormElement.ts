import IElement from '../BaserElement/IElement';

interface IFormElement<E> extends IElement<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
	labelText: string;
	hasFocus: boolean;
	disabled: boolean;
	defaultValue: string | number;
	isWrappedByLabel: boolean;
	label: HTMLLabelElement;
	wrapper: HTMLSpanElement;
	setValue (value: string | number | boolean): void;
	setDisabled (isDisabled: boolean): void;
}

export default IFormElement;
