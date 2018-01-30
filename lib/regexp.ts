/**
 * Created by user on 2018/1/30/030.
 */

import { parse as regexpParse, types } from 'regexp2';

export function replace_literal(r: string, cb : (text: string) => string): string
export function replace_literal(r: RegExp, cb : (text: string) => string): RegExp
export function replace_literal(r, cb : (text: string) => string)
{
	let bool = (r instanceof RegExp);

	let rb = regexpParse(r);
	let str = toRegexp(rb, cb);

	if (bool)
	{
		return new RegExp(str, r.flags) as RegExp;
	}

	return str as string;
}

function toRegexp(res, cb): string
{
	if (res.body)
	{
		if (res.body.type == types.ALTERNATE)
		{
			return toRegexp(res.body.left, cb) + '|' + toRegexp(res.body.right, cb);
		}
		else if (res.type == types.MATCH)
		{
			return res.body.reduce(function(a, b){
				a.push(_(b, cb));

				return a;
			}, []).join('');
		}
		else if (res.type == types.QUANTIFIED)
		{
			return _(res.body, cb) + toRegexp(res.quantifier, cb);
		}

		return _(res.body, cb);
	}
	if (res.type == types.ALTERNATE)
	{
		return toRegexp(res.left, cb) + '|' + toRegexp(res.right, cb);
	}
	else
	{
		//console.log(res, res.type);
	}

	return res.text;
}

function _(b, cb)
{
	switch (b.type)
	{
		case types.CHARSET:
			return b.text;
		case types.POSITIVE_LOOKAHEAD:
			return '(?=' + toRegexp(b, cb) + ')';
		case types.NEGATIVE_LOOKAHEAD:
			return '(?!' + toRegexp(b, cb) + ')';
		case types.CAPTURE_GROUP:
			//console.log(b.body, b.type, b.body.type);
			return '(' + toRegexp(b, cb) + ')';
		case types.NON_CAPTURE_GROUP:
			return '(?:' + toRegexp(b, cb) + ')';
		case types.MATCH:
			return toRegexp(b, cb);
		case types.QUANTIFIED:
			//console.log(888, b, b.type);
			return _(b.body, cb) + toRegexp(b.quantifier, cb);
		case types.LITERAL:

			let text = b.text;

			text = cb(text);

			return text;
		default:
			console.log(999, b, b.type);

			break;
	}

	return b.toString();
}
