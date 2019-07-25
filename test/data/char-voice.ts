/**
 * Created by user on 2019/7/20.
 */
import { array_unique } from 'array-hyper-unique';

export default array_unique(`哎
吔
吶喏
嗶哩
啪唧
哞
撒
噫
哦
啊
唔咕
咿
噗咻
噗嗤
哼
誒
唔
咔噠
嗚
噠
喏
咳哼
唔噗
吆喝
咻咚
噗啪
咻嗡嗡
嘿
噗嗤
噗嚇
囉
嗚噫
唔溜
咕嚕
怎吶
庫庫
咚啌
咔嘰
唔咕
嘩啦
耶嘿

`.split('\n').filter(v => v).sort());
