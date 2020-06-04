import { IWords } from '../word';
import { ILazyMarkKey } from '../pattern-keys';
/**
 * 預設的修正樣式
 */
export interface ILazyMark extends Record<ILazyMarkKey, IWords[]> {
    /**
     * 排版整理 與 對話符號修正
     */
    '1': IWords[];
    /**
     * 適用於具有大量長段 而只縮減對話之間的空行使用
     */
    'ln_talk': IWords[];
    /**
     * 符號相關的排版整理
     */
    'ln': IWords[];
    /**
     * 符號 ... 相關的排版整理
     */
    'ln_0010': IWords[];
    /**
     * 符號 〈〉 相關的排版整理
     */
    'ln_0020': IWords[];
    /**
     * 對話符號修正
     *
     * 雖然這裡有BUG 但是這個BUG反而可以幫忙發現沒有正確對應的引號
     */
    '3': IWords[];
    /**
     * 對話符號修正
     */
    '33': IWords[];
    /**
     * 對話符號修正
     */
    '2': IWords[];
    /**
     * 將 [] 轉為 【$2】
     */
    '0': IWords[];
    /**
     * 無差別將 【】 轉為對話符號
     * 如果可以盡量不要使用此規則
     */
    '7': IWords[];
    /**
     * 將可能是對話的 【】 轉為對話符號
     * 如果可以盡量不要使用此規則
     */
    '8': IWords[];
    /**
     * 對話符號前後的空白
     */
    '5': IWords[];
    /**
     * 消除開頭的空白
     */
    'clear_002': IWords[];
    /**
     * 消除開頭的空白 v2
     */
    'ltrim': IWords[];
    /**
     * 消除多餘文字 例如 fin 完 之類
     */
    'clear_001': IWords[];
    /**
     * 將 xxxxx(xxxxx) 取代為 xxxxxx
     */
    'replace_001': IWords[];
    /**
     * 英文統一化
     */
    'en': IWords[];
    /**
     * 通用日文翻譯
     */
    'jp1': IWords[];
    /**
     * 英文統一化 part.2
     */
    'en2': IWords[];
    /**
     * 漢字偏好 統一化
     */
    'zh': IWords[];
    /**
     * 漢字偏好 統一化 (繁體)
     */
    'zh_cht': IWords[];
    /**
     * 中文詞偏好 統一化
     */
    'zh2': IWords[];
    /**
     * 職業 統一化
     */
    'class': IWords[];
    /**
     * 種族
     */
    'class_002': IWords[];
    /**
     * 判斷前後文的符號修正 包含數字與英文
     */
    '4': IWords[];
    /**
     * 符號統一 與 去除 bom
     */
    'c000': IWords[];
    /**
     * 符號修正 與 判斷 點 是 點 還是 句號
     */
    'c050': IWords[];
    /**
     * 等號 與 線 的相關修正 與 統一化
     */
    'c100': IWords[];
    /**
     * 修正翻譯機將單位換算成px
     */
    'unit': IWords[];
    /**
     * 數字轉為全形
     */
    'full_width_001': IWords[];
    /**
     * 單獨的英文字母轉為全形
     */
    'full_width_002': IWords[];
}
/**
 * 預設的修正樣式
 */
export declare const lazymarks: ILazyMark;
export default lazymarks;
