/**
 * Created by user on 2017/12/9/009.
 */

import * as i18next from 'i18next';
import * as StrUtil from 'str-util';
import * as path from 'path';

export const localesPath = path.join(__dirname, './locales');

export const locales_def = loadLocales('');

export const defaultNS = 'translation';

i18next.init({
	//lng: locales_def.lang,
	fallbackLng: [locales_def.lang],
	fallbackNS: [defaultNS],

	interpolation: {
		format: function (value, format, lng)
		{
			switch (format)
			{
				case 'toFullNumber':
				case 'num2zh':
					value = (StrUtil[format] as Function)(value);
					break;
			}

			return value;
		}
	}
});

addResourceBundle(locales_def);

export { i18next };

export function loadLocales(name, basepath = localesPath): {
	lang?: string,
	value?,
	resource?,
	sp?: string,
	words?,
	words_maybe?,
	words_arr?,
	words_callback?: Function,

	__file?: string,
}
{
	if (name === null)
	{
		return null;
	}

	let id = basepath ? path.join(basepath, name) : name;

	try
	{
		let c = require.resolve(id);
		//console.log(c);

		let i = require(id);

		if (i.lang === '' || i.lang === null)
		{
			i.lang = path.basename(id);
		}

		i.__file = id;

		return i;
	}
	catch (e)
	{
		if (e.code == 'MODULE_NOT_FOUND')
		{
			console.error(e.toString());
		}
		else
		{
			console.error(e);
		}

		if (!name)
		{
			throw e;
		}
	}

	return null;
}

export function addResourceBundle(locales, ns?, deep = true, overwrite = false)
{
	let _lng = locales.lang || locales_def.lang;
	let _ns = ns || locales.ns || defaultNS;

	if (locales.value)
	{
		i18next.addResourceBundle(
			_lng,
			_ns,
			locales.value,
			deep,
			overwrite,
		);
	}

	if (locales.resource)
	{
		for (let ns in locales.resource)
		{
			i18next.addResourceBundle(
				_lng,
				ns,
				locales.resource[ns],
				deep,
				overwrite,
			);
		}
	}

	return locales;
}

export default i18next;
