import { IWords, vMaybe } from './word';
/**
 * Created by user on 2019/7/13.
 */
export interface IPatternRule {
    readonly lang?: string;
    /**
     * 在這裡放此小說專屬的取代樣本
     */
    words_source: IWords[];
    words_layout?: IWords[];
    /**
     * 實際使用的取代樣式
     */
    words: IWords[];
    /**
     * 需要人工確認的屏蔽字或錯字用語等等
     */
    words_maybe: vMaybe;
    /**
     * 分析取代完成後執行的代碼
     *
     * @param {string} text
     * @returns {string}
     */
    words_callback?(text: string): string;
}
