/**
 * Created by user on 2018/3/24/024.
 */

import { exec, spawn, execFile } from 'child-process-promise';
import path from 'upath2';

let myLocalesID: string;

let pathMain = 'user';
//pathMain = 'dmzj';

/**
 * 小說資料夾名稱
 *
 * @type {string}
 */
let novelID: string;

novelID = '黑之魔王';

//novelID = '黑之魔王_(2367)';
//novelID = '我的怪物眷族_(1984)';
//novelID = '被称为勇者、亦或是怪物的少女（勇者或是被称为怪物的少女）_(2018)';
novelID = '四度目は嫌な死属性魔術師';
//novelID = '虫虫酱むいむいたん';
//novelID = '那个人，后来_(2272)';

//novelID = '讨厌第四次的死属性魔术师_(2206)';
//myLocalesID = '四度目は嫌な死属性魔術師';

//pathMain = 'wenku8';
//novelID = '加速世界_(381)';
//myLocalesID = '加速世界';

//novelID = '野生のラスボスが現れた！';
//novelID = '野生的最终boss出现了_(2014)';
//myLocalesID = '野生のラスボスが現れた！';

//novelID = '火輪を抱いた少女';

//novelID = 'ウォルテニア戦記';

//pathMain = 'webqxs';
//novelID = '公会的开挂接待小姐_(20)';
//myLocalesID = 'ギルドのチートな受付嬢';

//novelID = '雪色エトランゼ';

//novelID = '自称贤者弟子的贤者';

//novelID = '抗いし者たちの系譜 逆襲の魔王';
//myLocalesID = '抗いし者たちの系譜';

//novelID = '魔拳のデイドリーマー';

//novelID = '異世界迷宮の最深部を目指そう';
//novelID = '暗黒騎士物語　～勇者を倒すために魔王に召喚されました～';

//pathMain = 'wenku8';
//
//novelID = '龙背上的骑兵_(513)';

//novelID = '呼び出された殺戮者';

//novelID = '病娇女神の箱庭';

//novelID = 'よみがえる殺戮者';
//myLocalesID = '呼び出された殺戮者';

novelID = '回復術士のやり直し～即死魔法とスキルコピーの超越ヒール～';

//novelID = '異世界で魅了チートを使って奴隷ハーレムをつくってみた';
//pathMain = 'epub';

//novelID = 'シャチになりましたオルカナティブ';

//novelID = '自分が異世界に転移するなら';

//novelID = '百魔の主';

//novelID = '奪う者　奪われる者';

novelID = '人喰い転移者の異世界復讐譚　～無能はスキル『捕食』で成り上がる～';

//novelID = '帰ってきてもファンタジー！？';

//novelID = '魔王様、リトライ！';

//novelID = '豚公爵に転生したから、今度は君に好きと言いたい';

//novelID = '転生したら剣でした';

//novelID = '天才魔法使與原娼婦新娘';

//novelID = '悠久の愚者アズリーの、賢者のすゝめ';

//novelID = '元将軍のアンデッドナイト';

//novelID = 'エルフ転生からのチート建国記';

//novelID = '再臨勇者の復讐譚　～失望しました、勇者やめて元魔王と組みます～';

//novelID = 'NO FATIGUE 24時間戦える男の転生譚';

//novelID = '２９歳独身は異世界で自由に生きた…かった。';

//novelID = '物語の中の銀の髪';

//novelID = '黒の創造召喚師';

//novelID = '俺の死亡フラグが留まるところを知らない';

//novelID = '乙女ゲームの悪（中略）ヒロインが鬼畜女装野郎だったので、助けて下さい';

//novelID = '蘇りの魔王';

//novelID = 'カルマの塔';

//novelID = '俺の異世界姉妹が自重しない！';

//novelID = 'その者。のちに・・・';

//novelID = '破壊の御子';

novelID = '没落予定なので、鍛治職人を目指す';

novelID = '最下位職から最強まで成り上がる～地道な努力はチートでした～';

(async () =>
{
	await cpCall(novelID)
		.then(function (result)
		{
			console.log(result.childProcess.pid, result.childProcess.spawnargs[result.childProcess.spawnargs.length - 1]);
		})
	;
})();

function cpCall(novelID?: string, pathMain?: string, myLocalesID?: string)
{
	let promise = spawn('node', [
			path.join(__dirname, '../src/novel-demo.js'),
			'-m',
			pathMain || '',
			'-l',
			myLocalesID || '',
			'-n',
			novelID || '',
		])
		.catch(function (err)
		{
			console.error('[spawn] ERROR: ', err);
		})
	;

	let childProcess = promise.childProcess;

	console.log('[spawn] childProcess.pid: ', childProcess.pid);
	childProcess.stdout.on('data', function (data)
	{
		//console.log('[spawn] stdout: ', data.toString());
		console.log(data.toString().replace(/\s+$/g, ''));
	});
	childProcess.stderr.on('data', function (data)
	{
		//console.error('[spawn] stderr: ', data.toString());
		console.error(data.toString().replace(/\s+$/g, ''));
	});

	return promise;
}
