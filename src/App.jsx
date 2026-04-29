import { useState } from "react";

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Noto+Serif+JP:wght@300;400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0612; font-family: 'Noto Serif JP', serif; color: #e8d5b7; min-height: 100vh; }

  .stars { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .star { position: absolute; border-radius: 50%; background: white; animation: twinkle var(--d) ease-in-out infinite alternate; }
  @keyframes twinkle { from { opacity: 0.1; transform: scale(0.8); } to { opacity: 0.9; transform: scale(1.2); } }

  .container { position: relative; z-index: 1; max-width: 480px; margin: 0 auto; padding: 32px 20px 80px; min-height: 100vh; }

  .header { text-align: center; margin-bottom: 28px; }
  .header .moon { font-size: 48px; display: block; margin-bottom: 8px; filter: drop-shadow(0 0 18px #c9a96e88); animation: float 4s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  .header h1 { font-family: 'Cinzel Decorative', serif; font-size: 12px; letter-spacing: 0.25em; color: #c9a96e; text-transform: uppercase; margin-bottom: 6px; }
  .header h2 { font-size: 26px; font-weight: 300; color: #f0e6d0; letter-spacing: 0.15em; }
  .divider { display: flex; align-items: center; gap: 10px; margin: 10px 0 0; justify-content: center; color: #c9a96e66; font-size: 11px; }
  .divider::before, .divider::after { content: ''; width: 40px; height: 1px; background: linear-gradient(to right, transparent, #c9a96e88); }
  .divider::after { background: linear-gradient(to left, transparent, #c9a96e88); }

  .premium-toggle { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; }
  .toggle-track { width: 44px; height: 24px; background: #1e1530; border-radius: 12px; border: 1px solid #2a1f3d; cursor: pointer; position: relative; transition: background 0.3s; }
  .toggle-track.on { background: linear-gradient(135deg, #c9a96e, #a07840); border-color: #c9a96e55; }
  .toggle-thumb { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: #3a2f4d; border-radius: 50%; transition: all 0.3s; }
  .toggle-track.on .toggle-thumb { left: 23px; background: #0a0612; }
  .toggle-label { font-size: 12px; color: #9a8aaa; letter-spacing: 0.1em; }
  .toggle-label.on { color: #c9a96e; }
  .premium-badge { background: linear-gradient(135deg, #c9a96e, #a07840); color: #0a0612; font-size: 9px; font-weight: 600; padding: 2px 7px; border-radius: 8px; letter-spacing: 0.1em; }

  .tabs { display: flex; background: #150d22; border: 1px solid #2a1f3d; border-radius: 12px; padding: 4px; margin-bottom: 24px; gap: 4px; }
  .tab { flex: 1; padding: 10px 4px; background: transparent; border: none; color: #7a6a8a; font-family: 'Noto Serif JP', serif; font-size: 12px; cursor: pointer; border-radius: 8px; transition: all 0.3s; letter-spacing: 0.04em; }
  .tab.active { background: linear-gradient(135deg, #2a1f3d, #1e1530); color: #c9a96e; box-shadow: 0 2px 12px #c9a96e22; }
  .tab .tab-lock { font-size: 9px; margin-left: 2px; opacity: 0.6; }

  .card { background: linear-gradient(145deg, #150d22, #0f0919); border: 1px solid #2a1f3d; border-radius: 20px; padding: 24px 20px; margin-bottom: 16px; box-shadow: 0 8px 32px #00000066; }
  .card-title { font-size: 11px; letter-spacing: 0.25em; color: #c9a96e; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .card-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, #c9a96e44, transparent); }

  label { display: block; font-size: 12px; color: #9a8aaa; letter-spacing: 0.1em; margin-bottom: 8px; }
  input { width: 100%; background: #0a0612; border: 1px solid #2a1f3d; border-radius: 10px; padding: 12px 14px; color: #e8d5b7; font-family: 'Noto Serif JP', serif; font-size: 14px; outline: none; transition: border-color 0.3s, box-shadow 0.3s; margin-bottom: 14px; }
  input:focus { border-color: #c9a96e66; box-shadow: 0 0 0 3px #c9a96e11; }
  input::placeholder { color: #3a2f4d; }

  .btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #c9a96e, #a07840); border: none; border-radius: 12px; color: #0a0612; font-family: 'Noto Serif JP', serif; font-size: 14px; font-weight: 600; letter-spacing: 0.15em; cursor: pointer; transition: all 0.3s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px #c9a96e44; }
  .btn:active { transform: translateY(0); }

  .result-card { background: linear-gradient(145deg, #1a1028, #120d1e); border: 1px solid #c9a96e33; border-radius: 20px; padding: 24px 20px; animation: fadeUp 0.6s ease forwards; margin-bottom: 16px; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  .number-display { text-align: center; margin: 16px 0; }
  .number-circle { width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, #2a1f3d, #1a1028); border: 2px solid #c9a96e55; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; box-shadow: 0 0 30px #c9a96e22, inset 0 0 20px #c9a96e11; position: relative; }
  .number-circle::before { content: ''; position: absolute; inset: -6px; border-radius: 50%; border: 1px solid #c9a96e22; }
  .number-circle span { font-family: 'Cinzel Decorative', serif; font-size: 36px; color: #c9a96e; text-shadow: 0 0 20px #c9a96e88; }
  .number-name { font-size: 12px; color: #9a8aaa; letter-spacing: 0.2em; }

  .keyword-row { display: flex; flex-wrap: wrap; gap: 7px; margin: 14px 0; justify-content: center; }
  .keyword { background: #2a1f3d; border: 1px solid #c9a96e33; border-radius: 20px; padding: 4px 12px; font-size: 11px; color: #c9a96e; letter-spacing: 0.1em; }
  .fortune-text { font-size: 13px; line-height: 2.1; color: #c8b8a2; letter-spacing: 0.05em; border-top: 1px solid #2a1f3d; padding-top: 16px; margin-top: 4px; }

  .lucky-row { display: flex; gap: 8px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #2a1f3d; }
  .lucky-item { flex: 1; text-align: center; background: #0a0612; border-radius: 10px; padding: 10px 6px; border: 1px solid #1e1530; }
  .lucky-item .l-label { font-size: 9px; color: #6a5a7a; letter-spacing: 0.15em; margin-bottom: 5px; }
  .lucky-item .l-value { font-size: 13px; color: #e8d5b7; }

  .stroke-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 14px 0; }
  .stroke-item { background: #0a0612; border: 1px solid #1e1530; border-radius: 12px; padding: 12px; text-align: center; }
  .stroke-item .s-label { font-size: 9px; color: #6a5a7a; letter-spacing: 0.15em; margin-bottom: 5px; }
  .stroke-item .s-name { font-size: 13px; color: #c9a96e; margin-bottom: 4px; }
  .stroke-item .s-num { font-family: 'Cinzel Decorative', serif; font-size: 20px; color: #e8d5b7; }

  .rating-bar { margin-top: 12px; }
  .rating-label { display: flex; justify-content: space-between; font-size: 11px; color: #6a5a7a; margin-bottom: 5px; }
  .bar-bg { height: 4px; background: #1e1530; border-radius: 2px; overflow: hidden; margin-bottom: 8px; }
  .bar-fill { height: 100%; border-radius: 2px; background: linear-gradient(to right, #c9a96e, #e8c87c); transition: width 1.2s ease; }

  /* Premium locked */
  .premium-locked { position: relative; border-radius: 20px; overflow: hidden; margin-bottom: 16px; }
  .premium-locked-blur { filter: blur(4px); pointer-events: none; user-select: none; }
  .premium-locked-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0a061288; backdrop-filter: blur(2px); border-radius: 20px; border: 1px solid #c9a96e44; gap: 10px; }
  .lock-icon { font-size: 32px; }
  .lock-msg { font-size: 13px; color: #c9a96e; letter-spacing: 0.1em; text-align: center; line-height: 1.8; }
  .lock-price { font-size: 11px; color: #7a6a8a; }
  .btn-unlock { padding: 10px 24px; background: linear-gradient(135deg, #c9a96e, #a07840); border: none; border-radius: 20px; color: #0a0612; font-family: 'Noto Serif JP', serif; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; cursor: pointer; transition: all 0.3s; }
  .btn-unlock:hover { box-shadow: 0 6px 20px #c9a96e44; transform: translateY(-1px); }

  /* Yearly */
  .year-header { text-align: center; margin-bottom: 20px; }
  .year-num { font-family: 'Cinzel Decorative', serif; font-size: 52px; color: #c9a96e; text-shadow: 0 0 30px #c9a96e66; line-height: 1; }
  .year-label { font-size: 11px; color: #7a6a8a; letter-spacing: 0.15em; margin-top: 8px; }

  .quarter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 16px 0; }
  .quarter-card { background: #0a0612; border: 1px solid #1e1530; border-radius: 14px; padding: 14px 12px; }
  .q-label { font-size: 9px; color: #c9a96e; letter-spacing: 0.15em; margin-bottom: 6px; }
  .q-rank { font-size: 18px; font-weight: 600; margin-bottom: 6px; }
  .q-desc { font-size: 11px; color: #8a7a9a; line-height: 1.8; }

  .theme-row { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #1e1530; }
  .theme-tag { background: #150d22; border: 1px solid #2a1f3d; border-radius: 20px; padding: 4px 12px; font-size: 11px; color: #9a8aaa; }

  /* Compatibility */
  .compat-orbs { display: flex; align-items: center; justify-content: center; margin: 20px 0; }
  .compat-orb { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #2a1f3d, #1a1028); border: 2px solid #c9a96e44; display: flex; align-items: center; justify-content: center; flex-direction: column; box-shadow: 0 0 20px #c9a96e22; }
  .compat-orb span { font-family: 'Cinzel Decorative', serif; font-size: 26px; color: #c9a96e; }
  .compat-orb .orb-label { font-size: 9px; color: #7a6a8a; margin-top: 2px; }
  .compat-line { flex: 1; height: 2px; background: linear-gradient(to right, #c9a96e33, #c9a96e88, #c9a96e33); max-width: 36px; }
  .compat-heart { font-size: 22px; margin: 0 8px; filter: drop-shadow(0 0 8px #f4a0b5aa); animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }

  .compat-score { text-align: center; margin: 16px 0; }
  .compat-score-num { font-family: 'Cinzel Decorative', serif; font-size: 52px; color: #c9a96e; text-shadow: 0 0 30px #c9a96e66; line-height: 1; }
  .compat-score-label { font-size: 11px; color: #7a6a8a; letter-spacing: 0.15em; margin-top: 6px; }

  .compat-aspects { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
  .aspect-card { background: #0a0612; border: 1px solid #1e1530; border-radius: 12px; padding: 12px; text-align: center; }
  .aspect-icon { font-size: 20px; margin-bottom: 4px; }
  .aspect-label { font-size: 9px; color: #6a5a7a; letter-spacing: 0.1em; margin-bottom: 4px; }
  .aspect-val { font-size: 14px; color: #e8d5b7; font-weight: 600; }

  .advice-box { background: #150d22; border: 1px solid #c9a96e22; border-radius: 14px; padding: 16px; margin-top: 14px; }
  .advice-title { font-size: 10px; color: #c9a96e; letter-spacing: 0.2em; margin-bottom: 8px; }
  .advice-text { font-size: 12px; color: #b0a090; line-height: 2.1; }
`;

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const numerologyData = {
  1: { name: "太陽数", keywords: ["リーダーシップ", "独立心", "創造力"], fortune: "あなたは先頭に立つ生まれながらのリーダーです。強い意志と独立心を持ち、新しいことへの挑戦を恐れません。自分の直感を信じて行動することで、大きな成果を得られるでしょう。", lucky: { number: "1", color: "ゴールド", day: "日曜日" }, love: 72, work: 88, money: 65 },
  2: { name: "月数", keywords: ["協調性", "感受性", "直感力"], fortune: "繊細な感受性と深い共感力を持つあなたは、人との絆を大切にします。パートナーシップや協力関係の中で最も輝きます。感情のバランスを保つことが開運の鍵です。", lucky: { number: "2", color: "シルバー", day: "月曜日" }, love: 90, work: 70, money: 60 },
  3: { name: "木星数", keywords: ["表現力", "創造性", "社交性"], fortune: "豊かな表現力と明るいエネルギーで周囲を惹きつけます。芸術・コミュニケーションの分野で才能を発揮。喜びを分かち合うことが運気を高めます。", lucky: { number: "3", color: "イエロー", day: "木曜日" }, love: 80, work: 75, money: 70 },
  4: { name: "土星数", keywords: ["堅実さ", "忍耐力", "誠実さ"], fortune: "地に足ついた堅実な性格で、コツコツと積み上げる力があります。信頼と誠実さを武器に、長期的な成功を手に入れられます。焦らず着実に進むことが大切です。", lucky: { number: "4", color: "アース", day: "土曜日" }, love: 65, work: 92, money: 80 },
  5: { name: "水星数", keywords: ["自由", "冒険心", "変化"], fortune: "変化と自由を愛するあなたは、柔軟な適応力を持っています。新しい経験や旅が運気を開きます。好奇心のままに動くことで、思わぬ幸運が訪れるでしょう。", lucky: { number: "5", color: "グリーン", day: "水曜日" }, love: 75, work: 68, money: 72 },
  6: { name: "金星数", keywords: ["愛情", "調和", "美意識"], fortune: "深い愛情と美への感受性を持つあなたは、調和のとれた環境を作り出す才能があります。家庭・愛情・芸術に縁があり、与えることで豊かさが返ってきます。", lucky: { number: "6", color: "ピンク", day: "金曜日" }, love: 95, work: 72, money: 68 },
  7: { name: "海王星数", keywords: ["探究心", "知性", "神秘性"], fortune: "深い思慮と分析力を持つ哲学者タイプ。直感と論理の両方に優れ、真実を探求することに喜びを見出します。内なる声に耳を傾けることが開運につながります。", lucky: { number: "7", color: "パープル", day: "月曜日" }, love: 62, work: 85, money: 74 },
  8: { name: "冥王星数", keywords: ["野心", "物質的成功", "権力"], fortune: "強い野心と実行力を持ち、物質的な成功を引き寄せる力があります。ビジネスや投資において鋭い判断力を発揮します。バランスを大切にすることで、より大きな繁栄が訪れます。", lucky: { number: "8", color: "レッド", day: "土曜日" }, love: 68, work: 95, money: 92 },
  9: { name: "火星数", keywords: ["人道主義", "叡智", "完成"], fortune: "大きな視野と深い叡智を持ち、人のために尽くすことに使命感を感じます。芸術・教育・スピリチュアルな分野に縁があります。手放すことで、より大きなものが入ってきます。", lucky: { number: "9", color: "ゴールド", day: "火曜日" }, love: 85, work: 78, money: 70 },
  11: { name: "マスター数11", keywords: ["直感", "啓示", "インスピレーション"], fortune: "特別なマスターナンバーを持つあなたは、強い直感と霊的感受性に恵まれています。人々を導き、インスピレーションを与える使命があります。高い理想を保ちましょう。", lucky: { number: "11", color: "ホワイト", day: "月曜日" }, love: 88, work: 82, money: 66 },
  22: { name: "マスター数22", keywords: ["大建築家", "実現力", "マスタリー"], fortune: "最も強力なマスターナンバー。大きな夢を現実に変える力を持ちます。社会に影響を与えるプロジェクトや、長期的なビジョンの実現に向いています。責任の重さを謙虚に受け止めてください。", lucky: { number: "22", color: "ゴールド", day: "土曜日" }, love: 75, work: 98, money: 88 },
};

const nameFortuneData = (total) => {
  const n = ((total - 1) % 9) + 1;
  return ({
    1: { rank: "大吉", desc: "強運に恵まれ、何事も積極的に取り組むことで成功を掴めます。指導力と独立心が人生を切り開きます。" },
    2: { rank: "吉", desc: "協調性と感受性に優れ、人間関係が良縁を呼びます。パートナーとの絆が運を高めます。" },
    3: { rank: "大吉", desc: "創造的なエネルギーが溢れ、表現力で多くの人を魅了します。明るい未来が待っています。" },
    4: { rank: "小吉", desc: "努力と忍耐が実を結ぶ運勢。地道な積み重ねが必ず報われます。信頼を大切にしましょう。" },
    5: { rank: "吉", desc: "変化と行動力で運を開く数。旅や新しい挑戦があなたを輝かせます。" },
    6: { rank: "大吉", desc: "愛情と調和に満ちた運勢。家庭運・恋愛運ともに恵まれます。与える心が豊かさを呼びます。" },
    7: { rank: "吉", desc: "深い知性と直感力が武器。研究・学問・スピリチュアルな分野で才能を発揮します。" },
    8: { rank: "大吉", desc: "強力な成功運を持ちます。ビジネスや財運に恵まれ、大きな目標を達成できる運勢です。" },
    9: { rank: "吉", desc: "完成と知恵の数。人道的な奉仕が運を高め、多くの人から慕われる運命です。" },
  })[n];
};

const strokesByName = (name) => [...name].map(ch => (ch.charCodeAt(0) % 25) + 1);

function calcLifeNumber(bd) {
  const d = bd.replace(/\D/g, '');
  if (d.length < 8) return null;
  let s = d.split('').reduce((a, x) => a + +x, 0);
  while (s > 9 && s !== 11 && s !== 22) s = s.toString().split('').reduce((a, x) => a + +x, 0);
  return s;
}

function getYearlyFortune(n) {
  const py = ((n + 2025 % 9) % 9) || 9;
  const themes = {
    1: { title: "新出発の年", overview: "新しいサイクルの始まり。勇気ある一歩が未来を変える重要な年です。積極的に動くことで大きなチャンスが訪れます。", theme: ["新しい挑戦", "自立", "独創性"] },
    2: { title: "関係深化の年", overview: "人との繋がりを深める年。パートナーシップや協力関係に恵まれます。感謝と誠実さが運気を高めます。", theme: ["協力", "忍耐", "感謝"] },
    3: { title: "表現開花の年", overview: "創造性と社交性が花開く年。自分を表現することが開運の鍵。喜びを周囲と分かち合いましょう。", theme: ["創造", "喜び", "コミュニケーション"] },
    4: { title: "基盤構築の年", overview: "堅固な基盤を築く年。計画的に行動することで着実な成果が得られます。焦らず丁寧に積み上げましょう。", theme: ["努力", "規律", "安定"] },
    5: { title: "変化と自由の年", overview: "大きな変化が訪れる年。柔軟に対応することで新たなチャンスが生まれます。行動力が運命を開きます。", theme: ["変化", "旅", "冒険"] },
    6: { title: "愛と責任の年", overview: "家族・愛情・コミュニティに焦点が当たる年。与えることで豊かさが返ってきます。", theme: ["愛情", "家族", "調和"] },
    7: { title: "内省と成長の年", overview: "内なる知恵を深める年。瞑想・学習・精神的探求が実を結びます。静寂の中に答えがあります。", theme: ["内省", "知恵", "精神性"] },
    8: { title: "豊穣と達成の年", overview: "物質的な成功と達成の年。これまでの努力が実を結ぶ収穫の時期です。大きな目標を掲げましょう。", theme: ["成功", "豊かさ", "達成"] },
    9: { title: "完成と手放しの年", overview: "一つのサイクルが完成する年。不要なものを手放すことで次の扉が開きます。感謝で締めくくりましょう。", theme: ["完成", "解放", "感謝"] },
  };
  const quarters = [
    { q: "第1四半期（1〜3月）", rank: "◎", color: "#c9a96e", desc: "新たな動きが芽生えます。直感を信じて積極的に行動しましょう。" },
    { q: "第2四半期（4〜6月）", rank: "○", color: "#90be6d", desc: "人間関係が運気のカギ。誰かとの協力が大きな成果を生みます。" },
    { q: "第3四半期（7〜9月）", rank: "◎", color: "#c9a96e", desc: "エネルギーが最高潮に。チャレンジするなら今がベストタイミングです。" },
    { q: "第4四半期（10〜12月）", rank: "△", color: "#7a6a8a", desc: "立ち止まって内省する時期。焦らず着実に歩みを進めましょう。" },
  ];
  return { personalYear: py, quarters, ...themes[py] };
}

function getCompatibility(n1, n2) {
  const score = Math.min(95, ((n1 * 7 + n2 * 3) % 41) + 55);
  const aspects = [
    { icon: "💑", label: "恋愛相性", val: Math.min(99, score + ((n1 + n2) % 10) - 3) },
    { icon: "🤝", label: "友情相性", val: Math.min(99, score + ((n1 * n2) % 8)) },
    { icon: "💼", label: "仕事相性", val: Math.min(99, score - Math.abs(n1 - n2) % 9) },
    { icon: "🌱", label: "成長相性", val: Math.min(99, score + ((n1 + n2 * 2) % 7)) },
  ];
  const rankLabel = score >= 90 ? "奇跡の相性 ✨" : score >= 80 ? "素晴らしい相性 💫" : score >= 70 ? "良好な相性 ☆" : "成長し合える相性";
  const advice = `数${n1}と数${n2}の組み合わせは、互いの強みを引き出し合える関係です。${n1 > n2 ? "あなた" : "相手"}の積極性と${n1 > n2 ? "相手" : "あなた"}の包容力が絶妙なバランスを生みます。定期的に感謝を伝え合うことで、この縁はより深く輝きを増していきます。`;
  return { score, rankLabel, aspects, advice, n1, n2 };
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────
const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, delay: Math.random() * 4, duration: 2 + Math.random() * 3,
  }));
  return (
    <div className="stars">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size,
          '--d': `${s.duration}s`, animationDelay: `${s.delay}s`, opacity: 0.3 + Math.random() * 0.4,
        }} />
      ))}
    </div>
  );
};

const RatingBar = ({ label, value }) => (
  <div className="rating-bar">
    <div className="rating-label"><span>{label}</span><span>{value}%</span></div>
    <div className="bar-bg"><div className="bar-fill" style={{ width: `${value}%` }} /></div>
  </div>
);

const PremiumLock = ({ isPremium, onUnlock, children }) => {
  if (isPremium) return children;
  return (
    <div className="premium-locked">
      <div className="premium-locked-blur">{children}</div>
      <div className="premium-locked-overlay">
        <div className="lock-icon">🔮</div>
        <div className="lock-msg">プレミアム限定の鑑定です<br />月額 ¥480 でフル解放</div>
        <button className="btn-unlock" onClick={onUnlock}>今すぐ解放する</button>
        <div className="lock-price">※ デモではタップで体験できます</div>
      </div>
    </div>
  );
};

const YearlyTab = ({ isPremium, onUnlock }) => {
  const [bd, setBd] = useState("");
  const [result, setResult] = useState(null);
  const handle = () => {
    const n = calcLifeNumber(bd);
    if (!n) return alert("生年月日を正しく入力してください（例：1990/05/15）");
    setResult(getYearlyFortune(n));
  };
  return (
    <>
      <div className="card">
        <div className="card-title">✦ 生年月日を入力</div>
        <label>生年月日</label>
        <input value={bd} onChange={e => setBd(e.target.value)} placeholder="例：1990/05/15" />
        <button className="btn" onClick={handle}>2025年の運勢を鑑定する</button>
      </div>
      {result && (
        <PremiumLock isPremium={isPremium} onUnlock={onUnlock}>
          <div className="result-card">
            <div className="card-title">✦ 2025年の運勢</div>
            <div className="year-header">
              <div className="year-num">{result.personalYear}</div>
              <div className="year-label">パーソナルイヤー {result.personalYear} ｜ {result.title}</div>
            </div>
            <div className="fortune-text">{result.overview}</div>
            <div className="quarter-grid">
              {result.quarters.map((q, i) => (
                <div key={i} className="quarter-card">
                  <div className="q-label">{q.q}</div>
                  <div className="q-rank" style={{ color: q.color }}>{q.rank}</div>
                  <div className="q-desc">{q.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 14, borderTop: "1px solid #1e1530", marginTop: 4 }}>
              <div className="card-title" style={{ marginBottom: 8 }}>✦ 今年のテーマ</div>
              <div className="theme-row">
                {result.theme.map(t => <span key={t} className="theme-tag">✦ {t}</span>)}
              </div>
            </div>
          </div>
        </PremiumLock>
      )}
    </>
  );
};

const CompatibilityTab = ({ isPremium, onUnlock }) => {
  const [bd1, setBd1] = useState("");
  const [bd2, setBd2] = useState("");
  const [result, setResult] = useState(null);
  const handle = () => {
    const n1 = calcLifeNumber(bd1), n2 = calcLifeNumber(bd2);
    if (!n1 || !n2) return alert("両方の生年月日を正しく入力してください");
    setResult(getCompatibility(n1, n2));
  };
  return (
    <>
      <div className="card">
        <div className="card-title">✦ 2人の生年月日を入力</div>
        <label>あなたの生年月日</label>
        <input value={bd1} onChange={e => setBd1(e.target.value)} placeholder="例：1990/05/15" />
        <label>相手の生年月日</label>
        <input value={bd2} onChange={e => setBd2(e.target.value)} placeholder="例：1995/11/03" />
        <button className="btn" onClick={handle}>相性を鑑定する</button>
      </div>
      {result && (
        <PremiumLock isPremium={isPremium} onUnlock={onUnlock}>
          <div className="result-card">
            <div className="card-title">✦ 相性鑑定結果</div>
            <div className="compat-orbs">
              <div className="compat-orb"><span>{result.n1}</span><div className="orb-label">あなた</div></div>
              <div className="compat-line" />
              <div className="compat-heart">💗</div>
              <div className="compat-line" />
              <div className="compat-orb"><span>{result.n2}</span><div className="orb-label">相手</div></div>
            </div>
            <div className="compat-score">
              <div className="compat-score-num">{result.score}</div>
              <div className="compat-score-label">相性スコア ｜ {result.rankLabel}</div>
            </div>
            <div className="compat-aspects">
              {result.aspects.map((a, i) => (
                <div key={i} className="aspect-card">
                  <div className="aspect-icon">{a.icon}</div>
                  <div className="aspect-label">{a.label}</div>
                  <div className="aspect-val">{a.val}%</div>
                </div>
              ))}
            </div>
            <div className="advice-box">
              <div className="advice-title">✦ 関係を深めるアドバイス</div>
              <div className="advice-text">{result.advice}</div>
            </div>
          </div>
        </PremiumLock>
      )}
    </>
  );
};

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("numerology");
  const [isPremium, setIsPremium] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [numResult, setNumResult] = useState(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nameResult, setNameResult] = useState(null);

  const handleNumerology = () => {
    const n = calcLifeNumber(birthdate);
    if (!n) return alert("生年月日を正しく入力してください（例：1990/05/15）");
    setNumResult({ number: n, ...numerologyData[n] });
  };

  const handleName = () => {
    if (!lastName || !firstName) return alert("姓と名を入力してください");
    const ls = strokesByName(lastName), fs = strokesByName(firstName);
    const lt = ls.reduce((a, b) => a + b, 0), ft = fs.reduce((a, b) => a + b, 0);
    setNameResult({ lastName, firstName, lastTotal: lt, firstTotal: ft, total: lt + ft, ...nameFortuneData(lt + ft) });
  };

  const handleUnlock = () => {
    if (window.confirm("プレミアムプランを体験しますか？\n（デモ版：実際の決済はありません）")) setIsPremium(true);
  };

  const tabs = [
    { id: "numerology", label: "数秘術", free: true },
    { id: "name", label: "姓名判断", free: true },
    { id: "yearly", label: "今年の運勢", free: false },
    { id: "compat", label: "相性占い", free: false },
  ];

  return (
    <>
      <style>{styles}</style>
      <StarField />
      <div className="container">

        <div className="header">
          <span className="moon">🌙</span>
          <h1>Celestial Fortune</h1>
          <h2>星の導き占い</h2>
          <div className="divider">✦</div>
        </div>

        {/* Premium toggle */}
        <div className="premium-toggle">
          <span className="toggle-label">フリー</span>
          <div className={`toggle-track ${isPremium ? "on" : ""}`} onClick={() => setIsPremium(v => !v)}>
            <div className="toggle-thumb" />
          </div>
          <span className={`toggle-label ${isPremium ? "on" : ""}`}>プレミアム</span>
          {isPremium && <span className="premium-badge">PREMIUM</span>}
        </div>

        {/* Tabs */}
        <div className="tabs">
          {tabs.map(t => (
            <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.label}{!t.free && !isPremium && <span className="tab-lock"> 🔒</span>}
            </button>
          ))}
        </div>

        {/* 数秘術 */}
        {tab === "numerology" && (
          <>
            <div className="card">
              <div className="card-title">✦ 生年月日を入力</div>
              <label>生年月日</label>
              <input value={birthdate} onChange={e => setBirthdate(e.target.value)} placeholder="例：1990/05/15" />
              <button className="btn" onClick={handleNumerology}>運命数を鑑定する</button>
            </div>
            {numResult && (
              <div className="result-card">
                <div className="card-title">✦ 鑑定結果</div>
                <div className="number-display">
                  <div className="number-circle"><span>{numResult.number}</span></div>
                  <div className="number-name">{numResult.name}</div>
                </div>
                <div className="keyword-row">{numResult.keywords.map(k => <span key={k} className="keyword">{k}</span>)}</div>
                <div className="fortune-text">{numResult.fortune}</div>
                <div className="lucky-row">
                  <div className="lucky-item"><div className="l-label">ラッキーナンバー</div><div className="l-value">{numResult.lucky.number}</div></div>
                  <div className="lucky-item"><div className="l-label">ラッキーカラー</div><div className="l-value" style={{ fontSize: 12 }}>{numResult.lucky.color}</div></div>
                  <div className="lucky-item"><div className="l-label">開運曜日</div><div className="l-value" style={{ fontSize: 12 }}>{numResult.lucky.day}</div></div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <RatingBar label="恋愛運" value={numResult.love} />
                  <RatingBar label="仕事運" value={numResult.work} />
                  <RatingBar label="金運" value={numResult.money} />
                </div>
              </div>
            )}
          </>
        )}

        {/* 姓名判断 */}
        {tab === "name" && (
          <>
            <div className="card">
              <div className="card-title">✦ お名前を入力</div>
              <label>姓（苗字）</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="例：山田" />
              <label>名（名前）</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="例：太郎" />
              <button className="btn" onClick={handleName}>姓名を鑑定する</button>
            </div>
            {nameResult && (
              <div className="result-card">
                <div className="card-title">✦ 鑑定結果</div>
                <div className="number-display">
                  <div className="number-circle"><span style={{ fontSize: 26 }}>{nameResult.rank}</span></div>
                  <div className="number-name">総画数 {nameResult.total} 画</div>
                </div>
                <div className="stroke-grid">
                  <div className="stroke-item">
                    <div className="s-label">姓の画数</div>
                    <div className="s-name">{nameResult.lastName}</div>
                    <div className="s-num">{nameResult.lastTotal}</div>
                  </div>
                  <div className="stroke-item">
                    <div className="s-label">名の画数</div>
                    <div className="s-name">{nameResult.firstName}</div>
                    <div className="s-num">{nameResult.firstTotal}</div>
                  </div>
                </div>
                <div className="fortune-text">{nameResult.desc}</div>
              </div>
            )}
          </>
        )}

        {/* 今年の運勢（プレミアム） */}
        {tab === "yearly" && <YearlyTab isPremium={isPremium} onUnlock={handleUnlock} />}

        {/* 相性占い（プレミアム） */}
        {tab === "compat" && <CompatibilityTab isPremium={isPremium} onUnlock={handleUnlock} />}

      </div>
    </>
  );
}

