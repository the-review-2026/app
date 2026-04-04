// 朝学習テスト⑧
const WEEK_TEST8_ITEMS = [
    {no:351, en:"instant", ja:"即座（席）の", d:"★☆☆"},
    {no:352, en:"primitive", ja:"原始時代の、原始的な", d:"★★☆"},
    {no:353, en:"ancient", ja:"古代の", d:"★★☆"},
    {no:354, en:"annual", ja:"毎年の、年一回の", d:"★★☆"},
    {no:355, en:"recently", ja:"最近", d:"★☆☆"},
    {no:356, en:"immediately", ja:"直ちに、すぐに", d:"★★☆"},
    {no:357, en:"permanently", ja:"永久に", d:"★★☆"},
    {no:358, en:"scold", ja:"しかる", d:"★★☆"},
    {no:359, en:"punish", ja:"罰する", d:"★★☆"},
    {no:360, en:"criticize", ja:"批判（評）する", d:"★★☆"},
    {no:361, en:"complain", ja:"文句を言う", d:"★★☆"},
    {no:362, en:"rare", ja:"まれな", d:"★☆☆"},
    {no:363, en:"local", ja:"地元の、その土地の", d:"★☆☆"},
    {no:364, en:"whether", alt:["if"], ja:"〜かどうか", d:"★★★", h:"if と似ているが、「〜かどうか」の名詞節で使う語。"},
    {no:365, en:"unless", ja:"もし〜でなければ", d:"★★★", h:"if ... not を1語にした形。"},
    {no:366, en:"except", ja:"〜を除いて", d:"★★★"},
    {no:367, en:"besides", ja:"〜に加えて、その上", d:"★★★"},
    {no:368, en:"despite", alt:["in spite of"], ja:"〜にもかかわらず", d:"★★★"},
    {no:369, en:"industry", ja:"産業、工業", d:"★☆☆"},
    {no:370, en:"goods", ja:"商品", d:"★☆☆"},
    {no:371, en:"cooperation", ja:"協力", d:"★★☆"},
    {no:372, en:"benefit", ja:"利益、恩恵", d:"★★☆"},
    {no:373, en:"earn", ja:"稼ぐ、得る", d:"★★★", h:"getとは異なる。"},
    {no:374, en:"economic", ja:"経済の", d:"★★★"},
    {no:375, en:"advance", ja:"前進する", d:"★★☆"},
    {no:376, en:"progress", ja:"進歩、進歩する", d:"★★☆"},
    {no:377, en:"behave", ja:"ふるまう", d:"★★★", h:"名詞はbehaviorである。"},
    {no:378, en:"chase", ja:"追いかける", d:"★★★", h:"カーチェイスなどで用いる。"},
    {no:379, en:"overcome", ja:"打ち勝つ、克服する", d:"★★★"},
    {no:380, en:"slave", ja:"奴隷", d:"★★★", h:"～のとりこになるという意味もある。"},
    {no:381, en:"one after another", ja:"次々と", d:"★★★"},
    {no:382, en:"little by little", alt:["step by step"], ja:"少しずつ", d:"★★☆"},
    {no:383, en:"all of a sudden", ja:"突然に", d:"★★☆"},
    {no:384, en:"throw away", alt:["throw away ~"], ja:"〜を捨てる", d:"★☆☆"},
    {no:385, en:"be filled with", alt:["be full of","be filled with ~","be full of ~"], ja:"〜で一杯だ、満たされている", d:"★★★"},
    {no:386, en:"next to", alt:["next to ~"], ja:"〜のとなりに、で", d:"★☆☆"},
    {no:387, en:"for free", alt:["free of charge"], ja:"無料で", d:"★★★"},
    {no:388, en:"on foot", ja:"徒歩で", d:"★☆☆"},
    {no:389, en:"come up with", alt:["come up with ~"], ja:"〜を思いつく", d:"★★☆"},
    {no:390, en:"take place", alt:["be held"], ja:"〜が起こる、開催される", d:"★★☆"},
    {no:391, en:"give up doing", ja:"doすることをやめる、諦める", d:"★★★"},
    {no:392, en:"spend time on doing", alt:["spend time on","spend + time + on ~/doing"], ja:"時間を〜に/doすることに費やす", d:"★★☆"},
    {no:393, en:"apply for", alt:["apply for ~"], ja:"〜に申し込む", d:"★★☆"},
    {no:394, en:"be similar to", alt:["be similar to ~"], ja:"〜に似ている", d:"★★☆"},
    {no:395, en:"fall asleep", ja:"眠りに落ちる", d:"★★☆"},
    {no:396, en:"feel like doing", ja:"doしたい気分だ", d:"★★★"},
    {no:397, en:"at first", ja:"最初は", d:"★☆☆"},
    {no:398, en:"in order to do", ja:"doするために", d:"★★☆"},
    {no:399, en:"on time", ja:"時間通りに", d:"★★★", h:"in timeは「時間内に」という意味。"},
    {no:400, en:"instead of", alt:["instead of ~"], ja:"〜の代わりに", d:"★★★"},
];

const LABELS = ["ア", "イ", "ウ"];

function uniq(arr){
  return Array.from(new Set((arr || []).filter(Boolean)));
}

function answersOf(item){
  return uniq([item.en].concat(item.alt || []));
}

function toCharTokens(text){
  const compact = (text || "").toString().replace(/\s+/g, "");
  return compact.split("").join(" / ");
}

function withOptionalHint(base, item){
  if(item.h) return {...base, h:item.h};
  return base;
}

function buildCharSortQuestion(item){
  const q =
    `次の文字を並び替えて正しい英語の表現にせよ。\n` +
    `${item.ja}`;

  return withOptionalHint({
    q,
    d: item.d,
    a: answersOf(item),
  }, item);
}

function buildInputQuestion(item){
  const q =
    `次の日本語に合う英語を書け。\n` +
    `${item.ja}`;

  return withOptionalHint({
    q,
    d: item.d,
    a: answersOf(item),
  }, item);
}

function buildChoiceQuestion(item, idx, items){
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
    `${LABELS[0]}：${options[0]}\n` +
    `${LABELS[1]}：${options[1]}\n` +
    `${LABELS[2]}：${options[2]}`;

  return withOptionalHint({
    q,
    d: item.d,
    a: uniq([correct].concat(answersOf(item))),
  }, item);
}

const WEEK_TEST8_DATA = {
  "3択から選ぶ": WEEK_TEST8_ITEMS.map((item, idx, arr)=>buildChoiceQuestion(item, idx, arr)),
  "文字並び替え": WEEK_TEST8_ITEMS.map(buildCharSortQuestion),
  "文字入力": WEEK_TEST8_ITEMS.map(buildInputQuestion),
};

if (typeof LOGIC_DATA !== "undefined" && LOGIC_DATA && typeof LOGIC_DATA === "object") {
  Object.assign(LOGIC_DATA, WEEK_TEST8_DATA);
}
