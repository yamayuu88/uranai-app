import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Noto+Serif+JP:wght@300;400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0612;
    font-family: 'Noto Serif JP', serif;
    color: #e8d5b7;
    min-height: 100vh;
  }

  .stars {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .star {
    position: absolute;
    border-radius: 50%;
    background: white;
    animation: twinkle var(--d) ease-in-out infinite alternate;
  }

  @keyframes twinkle {
    from { opacity: 0.1; transform: scale(0.8); }
    to { opacity: 0.9; transform: scale(1.2); }
  }

  .container {
    position: relative;
    z-index: 1;
    max-width: 480px;
    margin: 0 auto;
    padding: 32px 20px 60px;
    min-height: 100vh;
  }

  .header {
    text-align: center;
    margin-bottom: 36px;
  }

  .header .moon {
    font-size: 48px;
    display: block;
    margin-bottom: 8px;
    filter: drop-shadow(0 0 18px #c9a96e88);
    animation: float 4s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .header h1 {
    font-family: 'Cinzel Decorative', serif;
    font-size: 13px;
    letter-spacing: 0.25em;
    color: #c9a96e;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .header h2 {
    font-family: 'Noto Serif JP', serif;
    font-size: 26px;
    font-weight: 300;
    color: #f0e6d0;
    letter-spacing: 0.15em;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 0;
    justify-content: center;
    color: #c9a96e66;
    font-size: 11px;
    letter-spacing: 0.3em;
  }

  .divider::before, .divider::after {
    content: '';
    width: 40px;
    height: 1px;
    background: linear-gradient(to right, transparent, #c9a96e88);
  }
  .divider::after { background: linear-gradient(to left, transparent, #c9a96e88); }

  .tabs {
    display: flex;
    background: #150d22;
    border: 1px solid #2a1f3d;
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 28px;
    gap: 4px;
  }

  .tab {
    flex: 1;
    padding: 10px 6px;
    background: transparent;
    border: none;
    color: #7a6a8a;
    font-family: 'Noto Serif JP', serif;
    font-size: 13px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s;
    letter-spacing: 0.05em;
  }

  .tab.active {
    background: linear-gradient(135deg, #2a1f3d, #1e1530);
    color: #c9a96e;
    box-shadow: 0 2px 12px #c9a96e22;
  }

  .card {
    background: linear-gradient(145deg, #150d22, #0f0919);
    border: 1px solid #2a1f3d;
    border-radius: 20px;
    padding: 28px 24px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px #00000066;
  }

  .card-title {
    font-size: 12px;
    letter-spacing: 0.25em;
    color: #c9a96e;
    text-transform: uppercase;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, #c9a96e44, transparent);
  }

  label {
    display: block;
    font-size: 12px;
    color: #9a8aaa;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    background: #0a0612;
    border: 1px solid #2a1f3d;
    border-radius: 10px;
    padding: 13px 16px;
    color: #e8d5b7;
    font-family: 'Noto Serif JP', serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    margin-bottom: 16px;
  }

  input:focus {
    border-color: #c9a96e66;
    box-shadow: 0 0 0 3px #c9a96e11;
  }

  input::placeholder { color: #3a2f4d; }

  .btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #c9a96e, #a07840);
    border: none;
    border-radius: 12px;
    color: #0a0612;
    font-family: 'Noto Serif JP', serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 4px;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px #c9a96e44;
  }

  .btn:active { transform: translateY(0); }

  .result-card {
    background: linear-gradient(145deg, #1a1028, #120d1e);
    border: 1px solid #c9a96e33;
    border-radius: 20px;
    padding: 28px 24px;
    animation: fadeUp 0.6s ease forwards;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .number-display {
    text-align: center;
    margin: 20px 0;
  }

  .number-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2a1f3d, #1a1028);
    border: 2px solid #c9a96e55;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    box-shadow: 0 0 30px #c9a96e22, inset 0 0 20px #c9a96e11;
    position: relative;
  }

  .number-circle::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid #c9a96e22;
  }

  .number-circle span {
    font-family: 'Cinzel Decorative', serif;
    font-size: 40px;
    color: #c9a96e;
    text-shadow: 0 0 20px #c9a96e88;
  }

  .number-name {
    font-size: 13px;
    color: #9a8aaa;
    letter-spacing: 0.2em;
  }

  .keyword-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0;
    justify-content: center;
  }

  .keyword {
    background: #2a1f3d;
    border: 1px solid #c9a96e33;
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 12px;
    color: #c9a96e;
    letter-spacing: 0.1em;
  }

  .fortune-text {
    font-size: 14px;
    line-height: 2;
    color: #c8b8a2;
    letter-spacing: 0.05em;
    border-top: 1px solid #2a1f3d;
    padding-top: 18px;
    margin-top: 4px;
  }

  .lucky-row {
    display: flex;
    gap: 10px;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid #2a1f3d;
  }

  .lucky-item {
    flex: 1;
    text-align: center;
    background: #0a0612;
    border-radius: 12px;
    padding: 12px 8px;
    border: 1px solid #1e1530;
  }

  .lucky-item .l-label {
    font-size: 10px;
    color: #6a5a7a;
    letter-spacing: 0.2em;
    margin-bottom: 6px;
  }

  .lucky-item .l-value {
    font-size: 15px;
    color: #e8d5b7;
  }

  .stroke-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 16px 0;
  }

  .stroke-item {
    background: #0a0612;
    border: 1px solid #1e1530;
    border-radius: 12px;
    padding: 14px 12px;
    text-align: center;
  }

  .stroke-item .s-label {
    font-size: 10px;
    color: #6a5a7a;
    letter-spacing: 0.15em;
    margin-bottom: 6px;
  }

  .stroke-item .s-name {
    font-size: 13px;
    color: #c9a96e;
    margin-bottom: 4px;
  }

  .stroke-item .s-num {
    font-family: 'Cinzel Decorative', serif;
    font-size: 22px;
    color: #e8d5b7;
  }

  .rating-bar {
    margin-top: 16px;
  }

  .rating-label {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #6a5a7a;
    margin-bottom: 6px;
  }

  .bar-bg {
    height: 4px;
    background: #1e1530;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .bar-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(to right, #c9a96e, #e8c87c);
    transition: width 1s ease;
  }

  .premium-banner {
    background: linear-gradient(135deg, #1e1530, #150d22);
    border: 1px solid #c9a96e44;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    margin-top: 20px;
  }

  .premium-banner .p-icon { font-size: 28px; margin-bottom: 8px; }
  .premium-banner .p-title {
    font-size: 14px;
    color: #c9a96e;
    letter-spacing: 0.15em;
    margin-bottom: 6px;
  }
  .premium-banner .p-desc {
    font-size: 12px;
    color: #7a6a8a;
    line-height: 1.8;
    margin-bottom: 14px;
  }

  .btn-premium {
    display: inline-block;
    padding: 10px 28px;
    background: transparent;
    border: 1px solid #c9a96e;
    border-radius: 20px;
    color: #c9a96e;
    font-family: 'Noto Serif JP', serif;
    font-size: 13px;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-premium:hover {
    background: #c9a96e11;
    box-shadow: 0 0 16px #c9a96e22;
  }
`;

// ── 数秘術データ ──
const numerologyData = {
  1: { name: "太陽数", keywords: ["リーダーシップ", "独立心", "創造力"], color: "#e8c87c",
    fortune: "あなたは先頭に立つ生まれながらのリーダーです。強い意志と独立心を持ち、新しいことへの挑戦を恐れません。自分の直感を信じて行動することで、大きな成果を得られるでしょう。",
    lucky: { number: "1", color: "ゴールド", day: "日曜日" }, love: 72, work: 88, money: 65 },
  2: { name: "月数", keywords: ["協調性", "感受性", "直感力"], color: "#a8d8ea",
    fortune: "繊細な感受性と深い共感力を持つあなたは、人との絆を大切にします。パートナーシップや協力関係の中で最も輝きます。感情のバランスを保つことが開運の鍵です。",
    lucky: { number: "2", color: "シルバー", day: "月曜日" }, love: 90, work: 70, money: 60 },
  3: { name: "木星数", keywords: ["表現力", "創造性", "社交性"], color: "#f9c74f",
    fortune: "豊かな表現力と明るいエネルギーで周囲を惹きつけます。芸術・コミュニケーション・エンターテインメントの分野で才能を発揮。喜びを分かち合うことが運気を高めます。",
    lucky: { number: "3", color: "イエロー", day: "木曜日" }, love: 80, work: 75, money: 70 },
  4: { name: "土星数", keywords: ["堅実さ", "忍耐力", "誠実さ"], color: "#8d8741",
    fortune: "地に足ついた堅実な性格で、コツコツと積み上げる力があります。信頼と誠実さを武器に、長期的な成功を手に入れられます。焦らず着実に進むことが大切です。",
    lucky: { number: "4", color: "アース", day: "土曜日" }, love: 65, work: 92, money: 80 },
  5: { name: "水星数", keywords: ["自由", "冒険心", "変化"], color: "#52b788",
    fortune: "変化と自由を愛するあなたは、柔軟な適応力を持っています。新しい経験や旅が運気を開きます。好奇心のままに動くことで、思わぬ出会いや幸運が訪れるでしょう。",
    lucky: { number: "5", color: "グリーン", day: "水曜日" }, love: 75, work: 68, money: 72 },
  6: { name: "金星数", keywords: ["愛情", "調和", "美意識"], color: "#f4a0b5",
    fortune: "深い愛情と美への感受性を持つあなたは、調和のとれた環境を作り出す才能があります。家庭・愛情・芸術に縁があり、与えることで豊かさが返ってきます。",
    lucky: { number: "6", color: "ピンク", day: "金曜日" }, love: 95, work: 72, money: 68 },
  7: { name: "海王星数", keywords: ["探究心", "知性", "神秘性"], color: "#7b7fd4",
    fortune: "深い思慮と分析力を持つ哲学者タイプ。直感と論理の両方に優れ、真実を探求することに喜びを見出します。孤独を恐れず、内なる声に耳を傾けることが開運につながります。",
    lucky: { number: "7", color: "パープル", day: "月曜日" }, love: 62, work: 85, money: 74 },
  8: { name: "冥王星数", keywords: ["野心", "物質的成功", "権力"], color: "#e76f51",
    fortune: "強い野心と実行力を持ち、物質的な成功を引き寄せる力があります。ビジネスや投資において鋭い判断力を発揮します。バランスを大切にすることで、より大きな繁栄が訪れます。",
    lucky: { number: "8", color: "レッド", day: "土曜日" }, love: 68, work: 95, money: 92 },
  9: { name: "火星数", keywords: ["人道主義", "叡智", "完成"], color: "#90be6d",
    fortune: "大きな視野と深い叡智を持ち、人のために尽くすことに使命感を感じます。芸術・教育・スピリチュアルな分野に縁があります。手放すことで、より大きなものが入ってきます。",
    lucky: { number: "9", color: "ゴールド", day: "火曜日" }, love: 85, work: 78, money: 70 },
  11: { name: "マスター数11", keywords: ["直感", "啓示", "インスピレーション"], color: "#c9a96e",
    fortune: "特別なマスターナンバーを持つあなたは、強い直感と霊的感受性に恵まれています。人々を導き、インスピレーションを与える使命があります。感情の波に流されず、高い理想を保ちましょう。",
    lucky: { number: "11", color: "ホワイト", day: "月曜日" }, love: 88, work: 82, money: 66 },
  22: { name: "マスター数22", keywords: ["大建築家", "実現力", "マスタリー"], color: "#c9a96e",
    fortune: "最も強力なマスターナンバー。大きな夢を現実に変える力を持ちます。社会に影響を与えるプロジェクトや、長期的なビジョンの実現に向いています。責任の重さを謙虚に受け止めてください。",
    lucky: { number: "22", color: "ゴールド", day: "土曜日" }, love: 75, work: 98, money: 88 },
};

// ── 姓名判断データ ──
const nameFortuneData = (total) => {
  const n = ((total - 1) % 9) + 1;
  const map = {
    1: { rank: "大吉", desc: "強運に恵まれ、何事も積極的に取り組むことで成功を掴めます。指導力と独立心が人生を切り開きます。" },
    2: { rank: "吉", desc: "協調性と感受性に優れ、人間関係が良縁を呼びます。パートナーとの絆が運を高めます。" },
    3: { rank: "大吉", desc: "創造的なエネルギーが溢れ、表現力で多くの人を魅了します。明るい未来が待っています。" },
    4: { rank: "小吉", desc: "努力と忍耐が実を結ぶ運勢。地道な積み重ねが必ず報われます。信頼を大切にしましょう。" },
    5: { rank: "吉", desc: "変化と行動力で運を開く数。旅や新しい挑戦があなたを輝かせます。" },
    6: { rank: "大吉", desc: "愛情と調和に満ちた運勢。家庭運・恋愛運ともに恵まれます。与える心が豊かさを呼びます。" },
    7: { rank: "吉", desc: "深い知性と直感力が武器。研究・学問・スピリチュアルな分野で才能を発揮します。" },
    8: { rank: "大吉", desc: "強力な成功運を持ちます。ビジネスや財運に恵まれ、大きな目標を達成できる運勢です。" },
    9: { rank: "吉", desc: "完成と知恵の数。人道的な奉仕が運を高め、多くの人から慕われる運命です。" },
  };
  return map[n];
};

const strokesByName = (name) => {
  // 簡易的な画数（文字コードベース）
  const strokes = [];
  for (let ch of name) {
    const code = ch.charCodeAt(0);
    strokes.push((code % 25) + 1);
  }
  return strokes;
};

// ── 数秘術計算 ──
function calcLifeNumber(birthdate) {
  const digits = birthdate.replace(/\D/g, '');
  if (digits.length < 8) return null;
  let sum = digits.split('').reduce((a, d) => a + parseInt(d), 0);
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split('').reduce((a, d) => a + parseInt(d), 0);
  }
  return sum;
}

// ── Stars ──
const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
  }));
  return (
    <div className="stars">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          '--d': `${s.duration}s`,
          animationDelay: `${s.delay}s`,
          opacity: 0.3 + Math.random() * 0.4,
        }} />
      ))}
    </div>
  );
};

// ── Rating Bar ──
const RatingBar = ({ label, value }) => (
  <div className="rating-bar">
    <div className="rating-label"><span>{label}</span><span>{value}%</span></div>
    <div className="bar-bg"><div className="bar-fill" style={{ width: `${value}%` }} /></div>
  </div>
);

export default function App() {
  const [tab, setTab] = useState("numerology");
  const [birthdate, setBirthdate] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [numResult, setNumResult] = useState(null);
  const [nameResult, setNameResult] = useState(null);
  const [showPremium, setShowPremium] = useState(false);

  const handleNumerology = () => {
    const n = calcLifeNumber(birthdate);
    if (!n) return alert("生年月日を正しく入力してください（例：1990/05/15）");
    setNumResult({ number: n, ...numerologyData[n] });
    setShowPremium(false);
    setTimeout(() => setShowPremium(true), 800);
  };

  const handleName = () => {
    if (!lastName || !firstName) return alert("姓と名を入力してください");
    const lastStrokes = strokesByName(lastName);
    const firstStrokes = strokesByName(firstName);
    const lastTotal = lastStrokes.reduce((a, b) => a + b, 0);
    const firstTotal = firstStrokes.reduce((a, b) => a + b, 0);
    const total = lastTotal + firstTotal;
    const fortune = nameFortuneData(total);
    setNameResult({ lastName, firstName, lastStrokes, firstStrokes, lastTotal, firstTotal, total, ...fortune });
    setShowPremium(false);
    setTimeout(() => setShowPremium(true), 800);
  };

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

        <div className="tabs">
          <button className={`tab ${tab === "numerology" ? "active" : ""}`} onClick={() => { setTab("numerology"); setNumResult(null); setShowPremium(false); }}>
            ✦ 数秘術
          </button>
          <button className={`tab ${tab === "name" ? "active" : ""}`} onClick={() => { setTab("name"); setNameResult(null); setShowPremium(false); }}>
            ✦ 姓名判断
          </button>
        </div>

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
                  <div className="number-circle">
                    <span>{numResult.number}</span>
                  </div>
                  <div className="number-name">{numResult.name}</div>
                </div>
                <div className="keyword-row">
                  {numResult.keywords.map(k => <span key={k} className="keyword">{k}</span>)}
                </div>
                <div className="fortune-text">{numResult.fortune}</div>
                <div className="lucky-row">
                  <div className="lucky-item"><div className="l-label">ラッキーナンバー</div><div className="l-value">{numResult.lucky.number}</div></div>
                  <div className="lucky-item"><div className="l-label">ラッキーカラー</div><div className="l-value" style={{ fontSize: 13 }}>{numResult.lucky.color}</div></div>
                  <div className="lucky-item"><div className="l-label">開運曜日</div><div className="l-value" style={{ fontSize: 13 }}>{numResult.lucky.day}</div></div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <RatingBar label="恋愛運" value={numResult.love} />
                  <RatingBar label="仕事運" value={numResult.work} />
                  <RatingBar label="金運" value={numResult.money} />
                </div>
              </div>
            )}
          </>
        )}

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
                  <div className="number-circle">
                    <span style={{ fontSize: 28 }}>{nameResult.rank}</span>
                  </div>
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

        {showPremium && (
          <div className="premium-banner">
            <div className="p-icon">🔮</div>
            <div className="p-title">✦ プレミアム鑑定 ✦</div>
            <div className="p-desc">
              今年の運勢・相性占い・転機の時期など<br />
              より詳しい鑑定は月額 ¥480 で
            </div>
            <button className="btn-premium" onClick={() => alert("プレミアムプランへようこそ！\n（決済機能は実装中です）")}>
              詳しく見る
            </button>
          </div>
        )}
      </div>
    </>
  );
}

