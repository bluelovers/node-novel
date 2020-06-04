import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export declare const lang: "";
/**
 * 在這裡放此小說專屬的取代樣本
 */
export declare const words_source: IPatternRule["words_source"];
/**
 * @private
 */
export declare const words_layout: IPatternRule["words_layout"];
/**
 * 實際使用的取代樣式
 */
export declare const words: IPatternRule["words"];
/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export declare const words_maybe: IPatternRule["words_maybe"];
/**
 * 分析取代完成後執行的代碼
 *
 * @param {string} text
 * @returns {string}
 */
export declare function words_callback(text: string): string;
declare const _default: IPatternRule;
export default _default;
