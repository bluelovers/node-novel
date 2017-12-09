/**
 * Created by user on 2017/12/9/009.
 */

import * as i18next from 'i18next';
import * as StrUtil from 'str-util';
import * as path from 'path';

const localesPath = path.join(__dirname, './locales');

const locales_def = loadLocales('');

const defaultNS = 'translation';

i18next.init({
	//lng: locales_def.lang,
	fallbackLng: [locales_def.lang],
	fallbackNS: [defaultNS],

	interpolation: {
		format: function (value, format, lng)
		{

			if (format == 'toFullNumber')
			{
				return StrUtil.toFullNumber(value);
			}

			return value;
		}
	}
});

addResourceBundle(locales_def);

export { i18next };

export function loadLocales(name, basepath = localesPath): { lang?, value?, resource? }
{
	return require(basepath ? path.join(basepath, name) : name);
}

export function addResourceBundle(locales, ns?, deep = true, overwrite = false)
{
	let _lng = locales.lang || locales_def.lang;
	let _ns = ns || locales.ns || defaultNS;

	i18next.addResourceBundle(
		_lng,
		_ns,
		locales.value,
		deep,
		overwrite,
	);

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
}

// @ts-ignore
export default i18next;
