import IElement from '../BaserElement/IElement';

interface IFormElement extends IElement {
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
