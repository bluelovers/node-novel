/**
 * Created by user on 2019/7/20.
 */

export function fixJaKey(input: string): string
{
	if (/^(?:(.|ー)\1+|[ァアッ]+)$/.test(input))
	{
		return null
	}

	return input;
}
