// eslint-disable-next-line import-x/no-extraneous-dependencies
import { bench, describe } from 'vitest';
import { decode, encode } from '../index.js';

const LONG_IN =
  '存在递归关系的数据很常见，数据常会像树或者以层级方式组织。然而，创建一个外键约束来强制执行同一表中两列之间的关系，会导致笨拙的查询。树的每一层对应着另一个连接。您将需要发出递归查询，以获得节点的所有后代或所有祖先。解决方案是构造一个附加的闭包表。它记录了树中所有节点间的关系，而不仅仅是那些具有直接的父子关系。您也可以比较不同层次的数据设计：闭包表，路径枚举，嵌套集。然后根据应用程序的需要选择一个。';
const LONG_OUT =
  '岓寎岒嫚峒五岔寈岑叉岴凉岲墮岢叆岡寤岔峂岔囚峄喟崶媾岢叆岡寤岔囚岄嫌岑冝岣亓岡嚸峂亇岄姓岔侈岴壑岢哓岔嫁岴妲岴妵屰亄岱勈峂于崶媾岑嚽岔姨岄嚢岄囌岓动峓勀岴壐岢寕岢寛岔嫬岑囘岡埍峄侒岒于岄嚢峄侮岄囏岄囆岑嚹岄垱峓嗒岲墮岑叉岴凉崶媾岄嫌岓巺峂嗒岳嫚岡姇岲墮岢巣峄巠屰亄岣亓岲墮岣巍岄嚢岔侈岓巷岔墾岲家岑巤岄嚢岄囌峅巜岡峟屰亄岡傲岔予峓媲峄咛岑巏岑嗘峒五岔寈岢巣峄巠崶媾岄姓峂峱岔峑峂墬岱僃岲墮岡垦岢媻岒亐岄姑岡嚸岡垦岢媻岳厬岑厞屰亄峄嗁岑响岢哓岣侎岢囑岢岾峒亢岄嚢岄囌峓垪岑壊岲墮峓嗋岑媷峄侮屰亄岓岽峄峪岔寋岄墰岣亓岄囏岡垦岢媻峂墬岱僃峓嗒岲墮岑叉岴凉崶媾峂于岄嚯岄妳岄妳岢囑峒傭岄壅岑反岢媻岲姢岡峟岲墮岱囘岓密岑叉岴凉屰亄岡傲岄埅岑巭岄姓岣巒峅岽岄嚯岒于岔侈岣嫓岲墮岢叆岡寤峄峸峄峛崶嫌峓嗋岑媷峄侮崶媾峅嗍岔岾岢峔岄因崶媾岔厢岓厭峓妴屰亄岱勈岒亐岣亻岡寤岔墾岲劺岳嚭岔墹岲墮峓媲峄咛峒事岡姗岄嚢岄囌屰亄';

describe('encoding', () => {
  bench('encoding - BaseCJK', () => {
    encode(LONG_IN);
  });
  bench('encoding - Base64', () => {
    btoa(String.fromCodePoint(...new TextEncoder().encode(LONG_IN)));
  });
});

describe('decoding', () => {
  bench('decoding - BaseCJK', () => {
    decode(LONG_OUT);
  });
  bench('decoding - Base64', () => {
    new TextDecoder().decode(
      Uint8Array.from(atob(LONG_OUT), (m) => m.codePointAt(0)!),
    );
  });
});
