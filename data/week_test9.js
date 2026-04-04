// 朝学習テスト⑨
const WEEK_TEST9_ITEMS = [
  {no:401, en:"melt", ja:"溶ける、溶かす", d:"★★★"},
  {no:402, en:"feed", ja:"食べ物を与える", d:"★★★"},
  {no:403, en:"prohibit", alt:["forbid", "ban"], ja:"禁止する", d:"★★☆"},
  {no:404, en:"equipment", ja:"装備、設備", d:"★★☆"},
  {no:405, en:"instrument", ja:"器具、楽器", d:"★★★", h:"musical instrument = 楽器"},
  {no:406, en:"furniture", ja:"家具", d:"★★☆"},
  {no:407, en:"remind", ja:"思い出させる", d:"★★☆"},
  {no:408, en:"encourage", ja:"励ます、奨励する", d:"★★☆"},
  {no:409, en:"fascinate", ja:"魅了する", d:"★★★"},
  {no:410, en:"relieve", ja:"安心させる、和らげる", d:"★★★"},
  {no:411, en:"force", ja:"無理やり〜させる", d:"★★☆"},
  {no:412, en:"confuse", ja:"混乱させる", d:"★★☆"},
  {no:413, en:"army", ja:"陸軍、軍隊", d:"★★★"},
  {no:414, en:"victim", ja:"犠牲者", d:"★★☆"},
  {no:415, en:"defeat", ja:"敗北、打ち負かす", d:"★★★"},
  {no:416, en:"figure", ja:"名詞：姿、数字　動詞：思う、計算する", d:"★★★"},
  {no:417, en:"disappoint", ja:"失望させる", d:"★★★"},
  {no:418, en:"admire", ja:"賞賛する、感心する", d:"★★★"},
  {no:419, en:"rely", ja:"あてにする、頼る", d:"★★★", h:"rely on ~"},
  {no:420, en:"refuse", ja:"断る", d:"★★☆"},
  {no:421, en:"avoid", ja:"避ける", d:"★★☆"},
  {no:422, en:"remain", ja:"〜のままでいる", d:"★★★"},
  {no:423, en:"require", ja:"〜を必要とする", d:"★★☆"},
  {no:424, en:"politics", ja:"政治", d:"★★★"},
  {no:425, en:"democracy", ja:"民主主義", d:"★★☆"},
  {no:426, en:"election", ja:"選挙", d:"★★☆"},
  {no:427, en:"investigation", ja:"調査、捜査", d:"★★★"},
  {no:428, en:"factor", ja:"要因、要素", d:"★★★"},
  {no:429, en:"analyze", ja:"分析する", d:"★★☆"},
  {no:430, en:"focus", alt:["focus on"], ja:"焦点を合わせる、焦点", d:"★★☆"},
  {no:431, en:"effect", ja:"影響", d:"★★☆"},
  {no:432, en:"education", ja:"教育", d:"★★☆"},
  {no:433, en:"experiment", ja:"実験", d:"★★☆"},
  {no:434, en:"principle", ja:"主義、原理（則）", d:"★★★"},
  {no:435, en:"gradually", ja:"徐々に", d:"★★★"},
  {no:436, en:"entire", ja:"全体の", d:"★★★"},
  {no:437, en:"direction", ja:"方向、指示", d:"★★☆"},
  {no:438, en:"impression", ja:"印象", d:"★★☆"},
  {no:439, en:"ingredient", ja:"成分、原料、材料", d:"★★★"},
  {no:440, en:"ancestor", ja:"先祖", d:"★★★"},
  {no:441, en:"crowd", ja:"群衆、群がる", d:"★★★",h:"crowded = 混雑した"},
  {no:442, en:"immigrant", ja:"移民", d:"★★★"},
  {no:443, en:"severe", ja:"厳しい、（天候など）激しい、（痛みが）ひどい", d:"★★★"},
  {no:444, en:"cruel", ja:"残酷な", d:"★★★"},
  {no:445, en:"suburb", alt:["the suburbs"], ja:"郊外", d:"★★★"},
  {no:446, en:"upstairs", ja:"階上へ、2階へ", d:"★★★"},
  {no:447, en:"obey", alt:["follow"], ja:"従う", d:"★★☆"},
  {no:448, en:"weapon", ja:"武器", d:"★★☆"},
  {no:449, en:"crime", ja:"犯罪", d:"★★☆"},
  {no:450, en:"poison", ja:"毒", d:"★★☆"},
];

const WEEK_TEST9_LABELS = ["ア", "イ", "ウ"];

function weekTest9Uniq(arr){
  return Array.from(new Set((arr || []).filter(Boolean)));
}

function weekTest9AnswersOf(item){
  return weekTest9Uniq([item.en].concat(item.alt || []));
}

function weekTest9WithOptionalHint(base, item){
  if(item.h) return {...base, h:item.h};
  return base;
}

function weekTest9BuildCharSortQuestion(item){
  const q =
    `次の文字を並び替えて正しい英語の表現にせよ。\n` +
    `${item.ja}`;

  return weekTest9WithOptionalHint({
    q,
    d: item.d,
    a: weekTest9AnswersOf(item),
  }, item);
}

function weekTest9BuildInputQuestion(item){
  const q =
    `次の日本語に合う英語を書け。\n` +
    `${item.ja}`;

  return weekTest9WithOptionalHint({
    q,
    d: item.d,
    a: weekTest9AnswersOf(item),
  }, item);
}

function weekTest9BuildChoiceQuestion(item, idx, items){
  const len = items.length;
  const d1 = items[(idx + 11) % len].en;
  const d2 = items[(idx + 23) % len].en;

  let options = [item.en, d1, d2];
  let correct = "ア";

  if(idx % 3 === 1){
    options = [d1, item.en, d2];
    correct = "イ";
  }else if(idx % 3 === 2){
    options = [d1, d2, item.en];
    correct = "ウ";
  }

  const q =
    `次の意味に当てはまる語を選べ。\n` +
    `${item.ja}\n` +
    `${WEEK_TEST9_LABELS[0]}：${options[0]}\n` +
    `${WEEK_TEST9_LABELS[1]}：${options[1]}\n` +
    `${WEEK_TEST9_LABELS[2]}：${options[2]}`;

  return weekTest9WithOptionalHint({
    q,
    d: item.d,
    a: weekTest9Uniq([correct].concat(weekTest9AnswersOf(item))),
  }, item);
}

const WEEK_TEST9_DATA = {
  "3択から選ぶ": WEEK_TEST9_ITEMS.map((item, idx, arr)=>weekTest9BuildChoiceQuestion(item, idx, arr)),
  "文字並び替え": WEEK_TEST9_ITEMS.map(weekTest9BuildCharSortQuestion),
  "文字入力": WEEK_TEST9_ITEMS.map(weekTest9BuildInputQuestion),
};
