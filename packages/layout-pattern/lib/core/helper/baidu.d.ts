/**
 * Created by user on 2018/1/31/031.
 */
import { IWords } from '../word';
export * from 'tieba-harmony';
import tiebaHarmony from 'tieba-harmony';
export declare function getTable(options?: tiebaHarmony.IOptions): IWords[];
export default getTable;
