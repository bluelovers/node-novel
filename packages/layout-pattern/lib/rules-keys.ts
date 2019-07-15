
export const enum EnumRuleListKeys
{
	BASE_OLD = "base-old",
	BASE_V2 = "base-v2",
	DEMO = "demo",
	DEMO_ZHT = "demo.zht",
}

export type IRuleListKey = EnumRuleListKeys.BASE_OLD | EnumRuleListKeys.BASE_V2 | EnumRuleListKeys.DEMO | EnumRuleListKeys.DEMO_ZHT | "base-old" | "base-v2" | "demo" | "demo.zht";

export type IRuleListKey2 = EnumRuleListKeys.BASE_OLD | EnumRuleListKeys.BASE_V2 | EnumRuleListKeys.DEMO | EnumRuleListKeys.DEMO_ZHT;

export type IRuleListKey3 = "base-old" | "base-v2" | "demo" | "demo.zht";

export const RULE_LIST = [EnumRuleListKeys.BASE_OLD, EnumRuleListKeys.BASE_V2, EnumRuleListKeys.DEMO, EnumRuleListKeys.DEMO_ZHT] as const;
