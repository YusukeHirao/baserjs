/**
 * FormElementクラスのオプションハッシュのインターフェイス
 *
 * @version 0.0.1
 * @since 0.0.1
 *
 */
interface FormElementOption {

	/**
	 * 任意で指定するラベルの要素名
	 *
	 * @since 0.0.1
	 *
	 */
	label?: string;

	/**
	 * 任意で指定するラベルに付加するクラス属性値
	 *
	 * @since 0.0.1
	 *
	 */
	labelClass?: string;

	/**
	 * 自動でラベルを生成するかどうか
	 *
	 * @since 0.0.5
	 * @default true
	 *
	 */
	autoLabeling?: boolean;
}

export default FormElementOption;
