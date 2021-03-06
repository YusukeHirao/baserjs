/**
 * DOMインターフェイスの値に近い型かどうか判定する
 *
 * 単純に`null` `boolean` `number` `string`のいずれかの型かどうか
 *
 * - `null`は値がないがプロパティは存在するとみなして真
 * - `boolean` `number` `string` は有効な値なので真
 * - `undefined`はプロパティが存在しないとみなして偽
 * - `object`や`function` `symbol` は機能や構造に関するものとみなして偽
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param obj 対象のオブジェクト
 * @return `null` `boolean` `number` `string` いずれかであれば真
 *
 */
export default function isDOMValue<T>(obj: T): boolean;
