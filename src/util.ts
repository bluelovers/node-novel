/**
 * Created by user on 2019/5/31.
 */

import { addResourceBundle, i18next, loadLocales } from '../lib/i18n';
import { console } from 'debug-color2';

const mapLocalesCache = new Map<string, ReturnType<typeof getLocales>>();

export function getLocales(myLocalesID: string, novelID: string)
{
	// 利用 i18next 來達到根據小說切換翻譯模板
	myLocalesID = myLocalesID || novelID;

	let myLocales = loadLocales(myLocalesID);

	if (!myLocales)
	{
		console.red(`load default demo`);
		myLocales = loadLocales('demo');
	}

	if (myLocales)
	{
		addResourceBundle(myLocales);
	}
	else
	{
		myLocales = {
			lang: myLocalesID,
		};
	}

	// @ts-ignore
	i18next.changeLanguage(myLocales.lang);
// @ts-ignore
	i18next.setDefaultNamespace('i18n');

	return {
		myLocalesID,
		novelID,
		myLocales,
	}
}

export function getLocalesCache(myLocalesID: string, novelID: string)
{
	myLocalesID = myLocalesID || novelID;

	if (mapLocalesCache.has(myLocalesID))
	{
		return mapLocalesCache.get(myLocalesID)
	}

	let ret = getLocales(myLocalesID, novelID);

	mapLocalesCache.set(myLocalesID, ret);

	return ret;
}
