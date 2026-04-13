"use client";

import React, { useMemo, useState } from "react";

const styles = `
  :root {
    --bg: #FCFAF2;
    --paper: #F6F1E6;
    --paper-2: #F2ECE0;
    --ink: #1F2933;
    --muted: #5F6B76;
    --line: #D8CFC0;
    --teal: #2E5C6E;
    --plum: #622954;
    --gold: #B98B2F;
    --sage: #5E7A65;
    --rust: #9A5034;
    --soft-green: #EEF4EC;
    --soft-rust: #F9EEEA;
    --soft-gold: #FBF6E7;
    --ink-soft: #32414B;
    --white: #FFFFFF;
    --max: 1440px;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: Inter, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
  }

  .quiz-app { min-height: 100vh; background: var(--bg); color: var(--ink); }
  .quiz-shell { max-width: var(--max); margin: 0 auto; padding: 24px 24px 56px; }

  .hero, .section, .nav-card, .core-card, .footer-card {
    border: 1px solid var(--line);
    background: var(--paper);
    border-radius: 26px;
  }

  .hero { padding: 26px; margin-bottom: 22px; }
  .section { padding: 22px; }
  .nav-card { padding: 16px; }
  .core-card, .footer-card { padding: 18px; background: var(--white); border-radius: 20px; }

  .meta-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 14px;
  }

  .meta-pill, .section-source, .tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--paper-2);
    color: var(--ink-soft);
    font-size: 12px;
    line-height: 1.25;
    white-space: nowrap;
  }

  .hero-top {
    display: flex;
    gap: 18px;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 18px;
  }

  .hero-title, .section-title, .core-title, .nav-title {
    margin: 0;
    color: var(--plum);
    font-family: "Source Serif 4", Georgia, "Times New Roman", "Noto Serif TC", serif;
    letter-spacing: -0.02em;
  }

  .hero-title { font-size: clamp(32px, 5vw, 52px); line-height: 1.02; }
  .section-title { font-size: clamp(28px, 3.8vw, 40px); line-height: 1.05; }
  .core-title { font-size: 22px; line-height: 1.15; margin-bottom: 10px; }
  .nav-title { font-size: 18px; line-height: 1.2; margin-bottom: 10px; }

  .hero-subtitle, .body-copy, .small-copy, .html-block p, .html-block li, .html-block td, .html-block th, .html-block blockquote {
    color: var(--ink-soft);
    font-size: 14px;
    line-height: 1.65;
  }

  .hero-subtitle { font-size: 16px; max-width: 920px; margin: 10px 0 0; }
  .small-copy { font-size: 12px; line-height: 1.55; }

  .toggle-wrap { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
  .toggle-group {
    display: inline-flex;
    border: 1px solid var(--line);
    border-radius: 999px;
    overflow: hidden;
    background: var(--white);
  }
  .toggle-btn {
    border: 0;
    background: transparent;
    color: var(--muted);
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }
  .toggle-btn.active { background: var(--teal); color: var(--white); }

  .hero-grid, .overview-grid, .section-grid, .footer-grid {
    display: grid;
    gap: 16px;
  }

  .hero-grid { grid-template-columns: 1.25fr 1fr; margin-top: 18px; }
  .overview-grid { grid-template-columns: 1fr 1fr; }
  .section-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .footer-grid { grid-template-columns: 1.1fr 0.9fr; }

  .chain-wrap { display: grid; gap: 10px; }
  .chain-row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
  }
  .chain-step {
    border: 1px solid var(--line);
    border-radius: 18px;
    background: var(--white);
    padding: 14px 12px;
    min-height: 112px;
  }
  .chain-kicker {
    color: var(--gold);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .chain-head {
    color: var(--teal);
    font-size: 15px;
    font-weight: 800;
    line-height: 1.28;
    margin-bottom: 8px;
  }
  .chain-text {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.5;
  }
  .arrow-row {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 10px;
  }
  .arrow-box {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    font-size: 22px;
  }

  .layout {
    display: grid;
    grid-template-columns: 290px minmax(0, 1fr);
    gap: 22px;
    align-items: start;
  }

  .side-nav {
    position: sticky;
    top: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .nav-list { display: grid; gap: 8px; }
  .nav-link {
    display: block;
    padding: 12px 12px;
    border-radius: 14px;
    border: 1px solid var(--line);
    background: var(--white);
    color: var(--ink-soft);
    text-decoration: none;
    font-size: 13px;
    line-height: 1.45;
    font-weight: 600;
  }
  .nav-link:hover { border-color: var(--teal); color: var(--teal); }

  .content { display: grid; gap: 22px; }
  .section-head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 18px;
  }
  .section-kicker {
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 11px;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .quote-band {
    border: 1px solid var(--line);
    border-radius: 18px;
    background: var(--white);
    padding: 16px;
  }
  .quote-kicker {
    color: var(--sage);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 800;
    margin-bottom: 8px;
  }
  .quote-text {
    color: var(--teal);
    font-size: 18px;
    line-height: 1.5;
    font-weight: 700;
  }

  .core-card {
    border: 1px solid var(--line);
    background: var(--white);
  }

  .dual { display: grid; gap: 8px; }
  .dual.en-only .zh, .dual.zh-only .en { display: none; }
  .dual.bi { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .dual .en, .dual .zh { color: var(--ink-soft); font-size: 14px; line-height: 1.65; }
  .dual.bi .en, .dual.bi .zh {
    border: 1px dashed var(--line);
    border-radius: 14px;
    background: #FFFCF6;
    padding: 12px;
  }

  .backbone-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  .backbone-item {
    border: 1px solid var(--line);
    border-radius: 18px;
    background: var(--white);
    padding: 14px;
    display: grid;
    gap: 8px;
  }
  .backbone-number {
    color: var(--gold);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .backbone-en {
    color: var(--teal);
    font-weight: 800;
    line-height: 1.45;
    font-size: 14px;
  }
  .backbone-zh {
    color: var(--ink-soft);
    line-height: 1.55;
    font-size: 13px;
  }

  .html-block h4 {
    margin: 0 0 10px;
    color: var(--plum);
    font-size: 18px;
    line-height: 1.2;
    font-weight: 800;
    font-family: "Source Serif 4", Georgia, serif;
  }
  .html-block h5 {
    margin: 16px 0 8px;
    color: var(--teal);
    font-size: 15px;
    line-height: 1.3;
    font-weight: 800;
  }
  .html-block p { margin: 0 0 10px; }
  .html-block ul, .html-block ol { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
  .html-block table { width: 100%; border-collapse: collapse; min-width: 680px; }
  .html-block .scroll { overflow-x: auto; border: 1px solid var(--line); border-radius: 16px; }
  .html-block th, .html-block td {
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    padding: 10px 10px;
    vertical-align: top;
    text-align: left;
  }
  .html-block th { background: #FBF7ED; color: var(--teal); font-weight: 800; }
  .html-block td:last-child, .html-block th:last-child { border-right: 0; }
  .html-block tr:last-child td { border-bottom: 0; }
  .html-block .eq {
    display: inline-block;
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: #FFFCF6;
    color: var(--plum);
    font-weight: 800;
    font-family: "JetBrains Mono", Menlo, Consolas, monospace;
    font-size: 13px;
    margin: 6px 0 12px;
  }
  .html-block .mini-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 12px;
  }
  .html-block .mini-card {
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--paper);
    padding: 12px;
  }
  .html-block .scenario-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 12px;
  }
  .html-block .scenario {
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--white);
    padding: 14px;
  }
  .html-block .scenario.good { border-color: rgba(94, 122, 101, 0.4); }
  .html-block .scenario.bad { border-color: rgba(154, 80, 52, 0.4); }
  .html-block .scenario .big {
    font-size: 28px;
    line-height: 1;
    font-weight: 900;
    color: var(--teal);
    margin: 4px 0 8px;
  }
  .html-block .scenario.bad .big { color: var(--rust); }
  .html-block .status-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 12px;
  }
  .html-block .status {
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--white);
    padding: 12px;
  }
  .html-block .status .top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    margin-bottom: 8px;
  }
  .html-block .badge {
    padding: 5px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.04em;
    border: 1px solid var(--line);
  }
  .html-block .badge.yes { background: var(--soft-green); color: var(--sage); }
  .html-block .badge.no { background: var(--soft-rust); color: var(--rust); }
  .html-block .badge.debatable { background: var(--soft-gold); color: var(--gold); }

  @media (max-width: 1200px) {
    .layout { grid-template-columns: 1fr; }
    .side-nav { position: static; }
    .hero-grid, .overview-grid, .section-grid, .footer-grid, .backbone-grid { grid-template-columns: 1fr; }
    .chain-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .arrow-row { display: none; }
  }

  @media (max-width: 820px) {
    .quiz-shell { padding: 16px 14px 44px; }
    .hero, .section { padding: 16px; border-radius: 22px; }
    .hero-top { flex-direction: column; }
    .toggle-wrap { align-items: flex-start; }
    .dual.bi { grid-template-columns: 1fr; }
    .chain-row { grid-template-columns: 1fr; }
    .backbone-grid { grid-template-columns: 1fr; }
    .html-block .mini-grid, .html-block .scenario-grid, .html-block .status-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 34px; }
  }
`;

const modeClass = (mode) => {
  if (mode === "en") return "dual en-only";
  if (mode === "zh") return "dual zh-only";
  return "dual bi";
};

function Dual({ mode, en, zh }) {
  return (
    <div className={modeClass(mode)}>
      <div className="en">{en}</div>
      <div className="zh">{zh}</div>
    </div>
  );
}

function HeadingDual({ mode, en, zh }) {
  if (mode === "en") return <>{en}</>;
  if (mode === "zh") return <>{zh}</>;
  return (
    <>
      <div>{en}</div>
      <div style={{ marginTop: 6, fontSize: "0.82em", color: "#5F6B76" }}>{zh}</div>
    </>
  );
}

function BackboneItem({ mode, index, en, zh }) {
  return (
    <div className="backbone-item">
      <div className="backbone-number">Core {index}</div>
      {(mode === "en" || mode === "bi") && <div className="backbone-en">{en}</div>}
      {(mode === "zh" || mode === "bi") && <div className="backbone-zh">{zh}</div>}
    </div>
  );
}

function HtmlDual({ mode, enHtml, zhHtml }) {
  if (mode === "en") {
    return <div className="html-block" dangerouslySetInnerHTML={{ __html: enHtml }} />;
  }
  if (mode === "zh") {
    return <div className="html-block" dangerouslySetInnerHTML={{ __html: zhHtml }} />;
  }
  return (
    <div className="dual bi">
      <div className="html-block en" dangerouslySetInnerHTML={{ __html: enHtml }} />
      <div className="html-block zh" dangerouslySetInnerHTML={{ __html: zhHtml }} />
    </div>
  );
}

const chainSteps = [
  {
    kicker: "Module 5",
    en: "Data assets",
    zh: "資料資產",
    copyEn: "What can be observed shapes what can be predicted.",
    copyZh: "先看得到，才有後續可預測的空間。",
  },
  {
    kicker: "Module 5",
    en: "Prediction problem",
    zh: "預測問題",
    copyEn: "Choose the decision and the target before choosing the model.",
    copyZh: "先決策與目標，再談模型。",
  },
  {
    kicker: "Module 5",
    en: "Algorithm",
    zh: "演算法",
    copyEn: "Decision rule plus prediction model.",
    copyZh: "決策規則加上預測模型。",
  },
  {
    kicker: "Module 5",
    en: "Prediction factory",
    zh: "預測工廠",
    copyEn: "Live run, train, refine, feedback.",
    copyZh: "即時執行、訓練精煉、持續回饋。",
  },
  {
    kicker: "Module 6",
    en: "Scale economics",
    zh: "規模經濟",
    copyEn: "LLM economics differ because inference cost stays real.",
    copyZh: "LLM 經濟結構不同，因為推論成本真實存在。",
  },
  {
    kicker: "Module 7",
    en: "Takeoff",
    zh: "起飛",
    copyEn: "Critical mass requires net benefits above adoption cost.",
    copyZh: "要先讓淨效益壓過採用成本，才摸得到 critical mass。",
  },
  {
    kicker: "Module 8",
    en: "Competition and tipping",
    zh: "競爭與 tipping",
    copyEn: "Multiple equilibria make the market outcome path dependent.",
    copyZh: "多重均衡使結果高度路徑依賴。",
  },
];

const backbone = [
  { en: "Prediction is constrained by observability.", zh: "預測先受限於可觀測性。" },
  { en: "Data inventory comes before model design.", zh: "先做 data inventory，再談模型。" },
  { en: "An algorithm equals a decision rule plus a prediction model.", zh: "演算法等於決策規則加上預測模型。" },
  { en: "Choose the decision first, then y, then X, and only then f(.).", zh: "先決策，再 y，再 X，最後才選 f(.)。" },
  { en: "A good target y is observable, actionable, timely, and hard to game.", zh: "好的 y 要可觀測、可行動、夠即時、不容易被操弄。" },
  { en: "If you observe y, it is supervised. If you do not, it is unsupervised.", zh: "有 y 是 supervised，沒 y 是 unsupervised。" },
  { en: "A prediction factory has live use, training and refinement, and feedback.", zh: "Prediction factory 包含即時執行、訓練精煉，以及 feedback。" },
  { en: "Weak AI is specialized. LLMs are more general-purpose, but not automatically AGI.", zh: "弱 AI 是專用型。LLM 更通用，但不等於 AGI。" },
  { en: "LLMs change platform economics because inference cost is real.", zh: "LLM 會改變平臺經濟，因為推論成本是真實存在的。" },
  { en: "Google’s strategic paradox is cannibalization risk.", zh: "Google 的策略矛盾在於自我侵蝕風險。" },
  { en: "Platform takeoff begins with the chicken-and-egg problem.", zh: "平臺起飛先碰到 chicken-and-egg 問題。" },
  { en: "There are two launch families: coaxing and coordinating.", zh: "起飛策略主要分成 coaxing 與 coordinating 兩大類。" },
  { en: "Most platforms do not take off. There is no silver bullet.", zh: "大多數平臺根本起飛不了，沒有銀彈。" },
  { en: "Platform competition is different because of multiple equilibria and tipping.", zh: "平臺競爭不同，關鍵在多重均衡與 tipping。" },
  { en: "Winner-take-all requires all three conditions, not just one or two.", zh: "WTA 必須三條件都很強，不是只強一兩個。" },
  { en: "Uber China shows that firms can fight as if a market is winner-take-all even when the market itself is not fully winner-take-all.", zh: "Uber China 說明企業可以照 WTA 邏輯開戰，但市場本身未必真是 WTA。" },
];

const overviewFocusEn = `
  <ul>
    <li><strong>Framework first.</strong> This quiz is not just about definitions. It is about diagnosing cases through the framework.</li>
    <li><strong>Case traps matter.</strong> eHarmony, Google, SaferTaxi, and Uber China each carry a specific trap.</li>
    <li><strong>Numbers are anchors.</strong> You do not need endless numbers, only the few that change the diagnosis.</li>
    <li><strong>Final study move.</strong> Read the 16-sentence backbone until you can restate it without looking.</li>
  </ul>
`;

const overviewFocusZh = `
  <ul>
    <li><strong>先抓 framework。</strong> 這份 quiz 不是只考名詞定義，而是要用架構去診斷案例。</li>
    <li><strong>案例陷阱要會講。</strong> eHarmony、Google、SaferTaxi、Uber China 各自都有明確考點與陷阱。</li>
    <li><strong>數字是錨點。</strong> 不需要記海量數字，只要掌握會改變判斷的少數關鍵數字。</li>
    <li><strong>考前最後動作。</strong> 把 16 句主幹讀到能不看稿複述，再練案例陷阱與數字錨點。</li>
  </ul>
`;

const sections = [
  {
    id: "module-5",
    kickerEn: "Module 5",
    kickerZh: "模組 5",
    titleEn: "Building Prediction Factories",
    titleZh: "建構 Prediction Factories",
    sourceEn: "Cross-checked to uploaded notes and slides",
    sourceZh: "已對照上傳 notes 與 slides",
    quoteEn: "Prediction is constrained first by observability, not by model sophistication.",
    quoteZh: "預測的第一限制不是模型多高級，而是可觀測性。",
    blocks: [
      {
        titleEn: "What this module wants from you",
        titleZh: "這個模組真正要你做甚麼",
        enHtml: `
          <ul>
            <li>Inventory the available data before romanticizing the model.</li>
            <li>Define the automated decision and the target <strong>y</strong> before choosing <strong>f(.)</strong>.</li>
            <li>Diagnose whether a platform has a real learning loop rather than mere data theater.</li>
            <li>Use eHarmony and Grow to compare weak feedback systems, stronger feedback systems, and different human-machine allocations.</li>
          </ul>
        `,
        zhHtml: `
          <ul>
            <li>先盤點資料，再談模型，不要先浪漫化演算法。</li>
            <li>先定義自動化決策與目標 <strong>y</strong>，再選 <strong>f(.)</strong>。</li>
            <li>判斷平臺是否真的有學習迴路，而不是只有資料表演。</li>
            <li>用 eHarmony 與 Grow 比較弱回饋系統、強回饋系統，以及不同的人機分工配置。</li>
          </ul>
        `,
      },
      {
        titleEn: "Data inventory and algorithm design order",
        titleZh: "Data Inventory 與演算法設計順序",
        enHtml: `
          <p>Data inventory is not paperwork. It defines both the constraint set and the opportunity set. Every source should be characterized by source, ownership and access, unit of observation, variables actually observed, whether the data are structured or unstructured, coverage and missingness, sampling conditions, and whether the asset is cross-sectional or time-series.</p>
          <div class="eq">Decision first → y → X → f(.)</div>
          <div class="mini-grid">
            <div class="mini-card"><h5>Step 1</h5><p>What decision should be automated?</p></div>
            <div class="mini-card"><h5>Step 2</h5><p>What outcome y should be predicted?</p></div>
            <div class="mini-card"><h5>Step 3</h5><p>Which inputs X are actually available?</p></div>
            <div class="mini-card"><h5>Step 4</h5><p>Only then, choose the model f(.).</p></div>
          </div>
          <h5>Good targets for y</h5>
          <ul>
            <li><strong>Observable:</strong> you can measure it reliably.</li>
            <li><strong>Actionable:</strong> moving it connects to platform goals.</li>
            <li><strong>Timely:</strong> the signal returns fast enough to support learning.</li>
            <li><strong>Hard to game:</strong> otherwise the platform amplifies the wrong behavior.</li>
          </ul>
          <h5>Model ladder</h5>
          <p>Heuristic → Linear or logistic → Trees and ensembles → Deep nets. Each more complex model must beat the simplest baseline.</p>
        `,
        zhHtml: `
          <p>Data inventory 不是形式作業，而是在決定後面能做甚麼。每個資料來源都要問清楚：來源、所有權與存取、觀察單位、實際可觀測變數、結構化或非結構化、覆蓋與缺漏、樣本與選取條件，以及橫斷面或時間序列。</p>
          <div class="eq">先決策 → y → X → 最後才選 f(.)</div>
          <div class="mini-grid">
            <div class="mini-card"><h5>Step 1</h5><p>要自動化甚麼決策？</p></div>
            <div class="mini-card"><h5>Step 2</h5><p>要預測甚麼結果 y？</p></div>
            <div class="mini-card"><h5>Step 3</h5><p>實際可用的 X 有哪些？</p></div>
            <div class="mini-card"><h5>Step 4</h5><p>最後才選模型 f(.)。</p></div>
          </div>
          <h5>好的 y 要符合四條件</h5>
          <ul>
            <li><strong>可觀測：</strong>要能穩定量測。</li>
            <li><strong>可行動：</strong>推動它時，真的會連到平臺目標。</li>
            <li><strong>夠即時：</strong>訊號要回來得夠快，才能支撐學習。</li>
            <li><strong>不易操弄：</strong>否則平臺會放大錯誤行為。</li>
          </ul>
          <h5>模型複雜度階梯</h5>
          <p>Heuristic → 線性或邏輯斯模型 → Trees 與 ensembles → Deep nets。每往上一層，都必須先打贏最簡單的基準線。</p>
        `,
      },
      {
        titleEn: "Supervised, unsupervised, and the broad ML contrast",
        titleZh: "Supervised、Unsupervised 與 ML 方法對比",
        enHtml: `
          <div class="mini-grid">
            <div class="mini-card">
              <h5>Supervised</h5>
              <p>You observe <strong>y</strong> and use <strong>X</strong> to predict it. Example: probability of happiness as a function of country, wealth, hobbies, and other variables.</p>
            </div>
            <div class="mini-card">
              <h5>Unsupervised</h5>
              <p>You do not observe <strong>y</strong>, so you can only explore relations inside <strong>X</strong>. Example: viewer categories inferred from Netflix-style watching patterns.</p>
            </div>
          </div>
          <p>The lecture’s blunt warning is worth memorizing: unsupervised sounds sophisticated, but often it simply means you do not have labels.</p>
          <h5>Method progression</h5>
          <ul>
            <li><strong>Expert systems:</strong> external expert knowledge is hard-coded into f(.).</li>
            <li><strong>Statistical regression:</strong> humans specify f(.) through theory.</li>
            <li><strong>Old data mining:</strong> weak theory, high risk of naive overfitting.</li>
            <li><strong>Machine learning:</strong> the machine iteratively learns f(.), usually strong on prediction and weak on causal explanation, assuming the world does not change too much.</li>
          </ul>
          <p>The broader course contrast is traditional analysis as theory plus statistical inference, versus modern ML as an empirical prediction engine with limited causal power.</p>
        `,
        zhHtml: `
          <div class="mini-grid">
            <div class="mini-card">
              <h5>Supervised</h5>
              <p>你觀測得到 <strong>y</strong>，用 <strong>X</strong> 去預測它。例子是用國家、財富、興趣等變數預測快樂機率。</p>
            </div>
            <div class="mini-card">
              <h5>Unsupervised</h5>
              <p>你觀測不到 <strong>y</strong>，因此只能在 <strong>X</strong> 裡探索關係。例子是像 Netflix 那樣，從觀看行為推估觀眾類型。</p>
            </div>
          </div>
          <p>課上最直接的提醒值得背下來：unsupervised 聽起來很高級，但很多時候只是因為你沒有標籤可學。</p>
          <h5>方法演進</h5>
          <ul>
            <li><strong>Expert systems：</strong>把外部專家知識硬編進 f(.)。</li>
            <li><strong>Statistical regression：</strong>人先依理論指定 f(.)。</li>
            <li><strong>Old data mining：</strong>理論弱，容易天真地過擬合。</li>
            <li><strong>Machine learning：</strong>讓機器迭代學出 f(.)，預測強，因果解釋弱，而且假設世界沒有大幅改變。</li>
          </ul>
          <p>整體對比是：傳統分析強調 theory 加 statistical inference，現代 ML 更像高維資料上的 empirical prediction engine。</p>
        `,
      },
      {
        titleEn: "Prediction factory loop",
        titleZh: "Prediction Factory 迴路",
        enHtml: `
          <div class="mini-grid">
            <div class="mini-card"><h5>Live use</h5><p>New inputs X arrive, the model runs, predicts y-hat, and the decision rule triggers a feature or function.</p></div>
            <div class="mini-card"><h5>Training and refinement</h5><p>Historical {y, X} data train and test the model, which is then tuned and revalidated.</p></div>
            <div class="mini-card"><h5>Feedback</h5><p>Observable outcomes return to the database and let the system learn over time.</p></div>
            <div class="mini-card"><h5>Managerial implication</h5><p>No feedback means no real learning loop. The organization also needs engineering, monitoring, governance, experimentation, and clear human-machine boundaries.</p></div>
          </div>
          <p>One reason platforms are structurally different is that the marginal cost of generating an additional prediction is often low once the system is built, relative to manual decision-making.</p>
        `,
        zhHtml: `
          <div class="mini-grid">
            <div class="mini-card"><h5>Live use</h5><p>新的 X 進來，模型跑出 y-hat，接著由決策規則觸發功能或動作。</p></div>
            <div class="mini-card"><h5>Training and refinement</h5><p>用歷史 {y, X} 訓練與測試模型，再進一步精煉與驗證。</p></div>
            <div class="mini-card"><h5>Feedback</h5><p>可觀測結果回到資料庫，系統才有機會持續學習。</p></div>
            <div class="mini-card"><h5>管理意涵</h5><p>沒有 feedback，就沒有真正的學習迴路。組織面還要補上工程、監控、治理、實驗設計，以及清楚的人機邊界。</p></div>
          </div>
          <p>平臺之所以結構上不同，其中一點在於：系統建好之後，額外生成一個預測的邊際成本，通常比人工決策低很多。</p>
        `,
      },
      {
        titleEn: "eHarmony",
        titleZh: "eHarmony",
        enHtml: `
          <p>This is the canonical survey-rich but feedback-poor case.</p>
          <div class="scroll">
            <table>
              <thead>
                <tr><th>Data source</th><th>What it contains</th><th>Coverage and unit</th><th>Time form</th></tr>
              </thead>
              <tbody>
                <tr><td>Questionnaire</td><td>Personality, preferences, demographics, psychographics, location, lifestyle.</td><td>Everyone on the platform, including attempted sign-ups. Individual-level.</td><td>Cross-sectional snapshot.</td></tr>
                <tr><td>Follow-up focus groups</td><td>Rich relationship-dynamics data.</td><td>4,000 successful couples who chose to participate. Dyad-level.</td><td>Cross-sectional snapshot.</td></tr>
                <tr><td>Platform clickstream</td><td>Sign-up, renewal, cancellation, sign-ins, scrolling, time spent, clicks, communications.</td><td>Mostly active users. Individual and dyad.</td><td>Time series.</td></tr>
                <tr><td>Other possible sources</td><td>Census, academic studies, and other enrichment data.</td><td>External, varying unit.</td><td>Variable.</td></tr>
              </tbody>
            </table>
          </div>
          <p>The files show two questionnaire counts, 140 questions and 300 questions compressed to six dimensions. Do not force a false certainty on the count. The stable conclusion is that many survey items were compressed into six factors.</p>
          <h5>Professor-defined six factors</h5>
          <ul>
            <li>Agreeableness.</li>
            <li>Preference for closeness with a partner.</li>
            <li>Degree of sexual and romantic passion.</li>
            <li>Level of extroversion and openness.</li>
            <li>How important spirituality is.</li>
            <li>How optimistic and happy each one is.</li>
          </ul>
          <h5>Operational weakness</h5>
          <p><strong>No data tracking, no feedback to model tuning, and very little scope for learning.</strong> That is the line to remember.</p>
          <h5>Method traps</h5>
          <ul>
            <li><strong>Method C fails:</strong> 4,000 successful couples means y equals 1 for everyone. A supervised model cannot be estimated when you have no negative outcomes.</li>
            <li><strong>Method D is a hard-coded score:</strong> it may be a starting point, but it is not a genuinely data-driven model.</li>
          </ul>
          <h5>Two viable paths</h5>
          <ul>
            <li><strong>Unsupervised:</strong> do not model outcomes. Group by similarity and map survey responses into six dimensions of distance.</li>
            <li><strong>Supervised:</strong> use clickstream to observe outcomes and map those outcomes back to traits and behavior.</li>
          </ul>
          <h5>eHarmony versus Tinder</h5>
          <ul>
            <li>eHarmony: rich survey, proprietary compatibility framing, long-term relationship orientation, limited real-time feedback, slow evolution.</li>
            <li>Tinder: simpler clickstream, ELO-style ranking logic, strong behavioral signals, systematic feedback, faster adaptation.</li>
          </ul>
          <p><strong>Bottom line:</strong> a simple clickstream with systematic feedback can often outpace richer but static data assets.</p>
        `,
        zhHtml: `
          <p>這是最典型的問卷很豐富，但 feedback 很弱的案例。</p>
          <div class="scroll">
            <table>
              <thead>
                <tr><th>資料來源</th><th>內容</th><th>覆蓋與觀察單位</th><th>時間形式</th></tr>
              </thead>
              <tbody>
                <tr><td>Questionnaire</td><td>人格、偏好、人口資料、心理特徵、位置、生活型態。</td><td>平臺上所有人，含曾嘗試註冊者。個體層級。</td><td>橫斷面快照。</td></tr>
                <tr><td>Follow-up Focus Groups</td><td>關係動態的豐富資料。</td><td>4,000 對自願參加的 successful couples。配對層級。</td><td>橫斷面快照。</td></tr>
                <tr><td>Platform Clickstream</td><td>註冊、續約、取消、登入、滑動、停留時間、點擊與溝通。</td><td>以活躍用戶為主。個人與配對。</td><td>時間序列。</td></tr>
                <tr><td>其他可能來源</td><td>人口普查、學術研究與其他補充資料。</td><td>外部，觀察單位不固定。</td><td>不固定。</td></tr>
              </tbody>
            </table>
          </div>
          <p>檔案中同時出現 140 題與 300 題壓成 6 維度兩種寫法。不要硬選一個確定值。真正穩的是：大量 survey 問題最後被壓縮成 6 個因素。</p>
          <h5>教授定義的 6 個因素</h5>
          <ul>
            <li>Agreeableness。</li>
            <li>Preference for closeness with a partner。</li>
            <li>Degree of sexual and romantic passion。</li>
            <li>Level of extroversion and openness。</li>
            <li>How important spirituality is。</li>
            <li>How optimistic and happy each one is。</li>
          </ul>
          <h5>營運弱點</h5>
          <p><strong>No data tracking、no feedback to model tuning、very little scope for learning。</strong> 這句要直接背下來。</p>
          <h5>方法陷阱</h5>
          <ul>
            <li><strong>Method C 行不通：</strong>4,000 successful couples 代表每個 y 都等於 1。若沒有負向結果，就無法估計 supervised model。</li>
            <li><strong>Method D 是 hard-code score：</strong>它也許能當起點，但不是資料驅動模型。</li>
          </ul>
          <h5>理論上可行的兩條路</h5>
          <ul>
            <li><strong>Unsupervised：</strong>不建模結果，而是把 survey 映射成 6 維距離，再依相似性分群。</li>
            <li><strong>Supervised：</strong>用 clickstream 觀察結果，再把結果回映到個人特徵與行為。</li>
          </ul>
          <h5>eHarmony 對比 Tinder</h5>
          <ul>
            <li>eHarmony：問卷資料豐富、相容性演算法專有、偏長期關係，但即時回饋有限，演進緩慢。</li>
            <li>Tinder：clickstream 較簡單，但行為訊號強，且有系統性 feedback，因此適應更快。</li>
          </ul>
          <p><strong>結論：</strong>有系統性 feedback 的簡單 clickstream，常常能勝過更豐富但靜態的資料來源。</p>
        `,
      },
      {
        titleEn: "Grow optional",
        titleZh: "Grow Optional",
        enHtml: `
          <p>The point of Grow is not HR detail. The point is that the same prediction logic can support very different allocations of responsibility between humans and machines.</p>
          <h5>Data assets</h5>
          <ul>
            <li>Peer 360-degree behavioral ratings.</li>
            <li>Self competency ratings.</li>
            <li>Personality IAT behavioral data.</li>
            <li>Evaluator bias calibration data.</li>
            <li>Social network graph data.</li>
            <li>Company historical hiring and performance data.</li>
            <li>Recruitment process outcome data.</li>
          </ul>
          <p>The logic is roughly y-hat equals weighted X. It can be built as an unsupervised 25-dimension mapping or as a supervised model with feedback.</p>
          <div class="mini-grid">
            <div class="mini-card"><h5>Septeni</h5><p>AI as substitute. Replaces group interviews, expands the pool, and pushes toward the highest automation.</p></div>
            <div class="mini-card"><h5>ANA</h5><p>AI as screen-in tool. Finds needles in the haystack, adds confidence scores, but keeps humans central.</p></div>
            <div class="mini-card"><h5>Mitsubishi Corporation</h5><p>AI as network expander. Uses the social graph of ideal candidates to widen the pipeline while human judgment remains dominant.</p></div>
            <div class="mini-card"><h5>Managerial prompts</h5><p>Which use case scales best, where does bias risk rise the most, and which one creates the most company value?</p></div>
          </div>
        `,
        zhHtml: `
          <p>Grow 的價值不在 HR 細節，而在於：同一套 prediction logic 可以支援非常不同的人機分工配置。</p>
          <h5>資料資產</h5>
          <ul>
            <li>Peer 360-degree behavioral ratings。</li>
            <li>Self competency ratings。</li>
            <li>Personality IAT behavioral data。</li>
            <li>Evaluator bias calibration data。</li>
            <li>Social network graph data。</li>
            <li>Company historical hiring 與 performance data。</li>
            <li>Recruitment process outcome data。</li>
          </ul>
          <p>模型邏輯可視為 y-hat 近似於加權後的 X。既可走 25 維 mapping 的非監督式，也可走有 feedback 的監督式版本。</p>
          <div class="mini-grid">
            <div class="mini-card"><h5>Septeni</h5><p>AI as substitute。取代團體面試、擴大候選池，並朝最高自動化前進。</p></div>
            <div class="mini-card"><h5>ANA</h5><p>AI as screen-in tool。找大海裡的針，加入信心分數，但人類仍在核心位置。</p></div>
            <div class="mini-card"><h5>Mitsubishi Corporation</h5><p>AI as network expander。用理想候選人的社交圖譜擴大管道，而人類判斷仍占主導。</p></div>
            <div class="mini-card"><h5>管理追問</h5><p>哪個最 scalable、哪個偏誤風險最大、哪個對公司價值最大？</p></div>
          </div>
        `,
      },
    ],
  },
  {
    id: "module-6",
    kickerEn: "Module 6",
    kickerZh: "模組 6",
    titleEn: "Road to General AI, LLMs",
    titleZh: "邁向通用 AI 與 LLMs",
    sourceEn: "Cross-checked to uploaded notes and slides",
    sourceZh: "已對照上傳 notes 與 slides",
    quoteEn: "Weak AI means one model for one task. LLMs shift toward a highly flexible general-purpose super f(.).",
    quoteZh: "弱 AI 是一個任務一個模型。LLM 則把事情推向高度彈性的通用 super f(.)。",
    blocks: [
      {
        titleEn: "Weak AI versus general AI",
        titleZh: "弱 AI 對比通用 AI",
        enHtml: `
          <p>Weak, narrow, or specialized AI means purpose-built models for specific tasks. Humans choose the target, the training data, and the decision rule. General or strong AI refers to capabilities that can transfer across many tasks and contexts. LLMs are not automatically AGI, but they are a meaningful step toward more general machine intelligence.</p>
          <p>Keep the hierarchy straight: AI → Machine Learning → Neural Networks → Transformer → Foundation Models → LLMs and other generative models.</p>
        `,
        zhHtml: `
          <p>弱、窄、專用 AI 指的是針對單一任務打造的模型。人類先指定 target、training data 與 decision rule。通用或強 AI 則是能力可跨任務與情境遷移。LLM 不等於 AGI，但確實是往更通用機器智慧前進的一步。</p>
          <p>層級要分清楚：AI → Machine Learning → Neural Networks → Transformer → Foundation Models → LLMs 與其他生成式模型。</p>
        `,
      },
      {
        titleEn: "Four core intuitions behind LLMs",
        titleZh: "LLM 的四個核心直覺",
        enHtml: `
          <div class="mini-grid">
            <div class="mini-card"><h5>Reframing the labeling problem</h5><p>Instead of manually labeling examples, the model predicts the next token. Massive unlabeled text becomes self-labeled training data.</p></div>
            <div class="mini-card"><h5>Tokens and embeddings</h5><p>Words are broken into tokens and represented as vectors. Nearby points in vector space reflect similar context and meaning.</p></div>
            <div class="mini-card"><h5>Neural network as f(.)</h5><p>The model learns a rich statistical mapping between inputs and outputs by adjusting huge numbers of parameters.</p></div>
            <div class="mini-card"><h5>Transformer with attention</h5><p>Attention lets the system weigh long-range relationships across the sequence, which is why scale becomes so powerful.</p></div>
          </div>
          <p>LLMs still fit the broad prediction-machine logic, but now X is prompt plus context, and f(.) is a general-purpose super function rather than a task-specific model.</p>
        `,
        zhHtml: `
          <div class="mini-grid">
            <div class="mini-card"><h5>重構標註問題</h5><p>不再靠人工一筆一筆標註，而是改成預測下一個 token。海量未標注文字因此自動變成有標籤資料。</p></div>
            <div class="mini-card"><h5>Tokens 與 Embeddings</h5><p>文字先拆成 tokens，再用向量表示。高維空間中彼此接近，代表語境與語意較相近。</p></div>
            <div class="mini-card"><h5>Neural Network 作為 f(.)</h5><p>模型透過大量參數調整，學出輸入與輸出之間高度豐富的統計映射。</p></div>
            <div class="mini-card"><h5>具 attention 的 Transformer</h5><p>Attention 能抓住序列中的長距離關係，這也是 Transformer 能擴張規模的關鍵。</p></div>
          </div>
          <p>LLM 仍然符合廣義 prediction machine 的架構，只是此時 X 變成 prompt 加 context，而 f(.) 變成通用 super function，而不是一個任務一個模型。</p>
        `,
      },
      {
        titleEn: "Terms and scaling logic",
        titleZh: "術語與 scaling 邏輯",
        enHtml: `
          <h5>Terms worth memorizing</h5>
          <ul>
            <li><strong>Training:</strong> learning model parameters from data, often as a large one-off compute event.</li>
            <li><strong>Inference:</strong> running the trained model on new inputs. This is the ongoing cost side.</li>
            <li><strong>Foundation model:</strong> a general-purpose pretrained model that can support many downstream tasks.</li>
            <li><strong>Embedding:</strong> a numeric vector representation in which distance reflects semantic similarity.</li>
            <li><strong>Frontier model:</strong> the most advanced model tier available at a given point in time.</li>
          </ul>
          <h5>Scaling laws</h5>
          <p>AI performance is presented as a function of parameters, data, compute, and architecture.</p>
          <ul>
            <li><strong>Scaling era, roughly 2012 to 2023:</strong> more parameters, more data, more compute.</li>
            <li><strong>Systems era, 2023 onward:</strong> more gains now come from architecture, tools, synthetic data, orchestration, and efficiency.</li>
            <li><strong>Emerging frontier:</strong> possibly shaped by energy infrastructure, closed-loop learning, and physical-system integration.</li>
          </ul>
          <h5>Cost economics</h5>
          <p>Traditional digital products often have high fixed cost and near-zero marginal cost. LLM systems also have huge fixed cost, but they add meaningful inference cost for every prompt. The supplied master file gives anchor ranges of roughly $0.005 to $0.03 per thousand input tokens and $0.015 to $0.12 per thousand output tokens.</p>
        `,
        zhHtml: `
          <h5>必背術語</h5>
          <ul>
            <li><strong>Training：</strong>從資料中學模型參數，通常是一次性的大型算力事件。</li>
            <li><strong>Inference：</strong>用已訓練好的模型跑新輸入，這是持續發生的成本面。</li>
            <li><strong>Foundation Model：</strong>可支援多種下游任務的通用預訓練模型。</li>
            <li><strong>Embedding：</strong>一種數值向量表示法，其中距離反映語意相近程度。</li>
            <li><strong>Frontier Model：</strong>某個時間點最先進的模型層級。</li>
          </ul>
          <h5>Scaling Laws</h5>
          <p>課內整理把 AI 表現概括成參數、資料、算力與架構的函數。</p>
          <ul>
            <li><strong>Scaling era，約 2012 到 2023：</strong>更多參數、更多資料、更多算力。</li>
            <li><strong>Systems era，2023 之後：</strong>越來越多進步來自架構、工具、合成資料、編排與效率。</li>
            <li><strong>Emerging frontier：</strong>可能更受能源基礎設施、閉環學習與物理系統整合影響。</li>
          </ul>
          <h5>成本經濟學</h5>
          <p>傳統數位產品通常是高固定成本、近零邊際成本。LLM 系統同樣有巨大固定成本，但每個 prompt 還要額外支付真實的 inference cost。整合 master file 提供的錨點範圍約為每千輸入記號 0.005 到 0.03 美元，每千輸出記號 0.015 到 0.12 美元。</p>
        `,
      },
      {
        titleEn: "Google",
        titleZh: "Google",
        enHtml: `
          <p>Google’s paradox is that it helped build the modern GenAI stack, yet GenAI can undermine the economics of the search business it already dominates.</p>
          <div class="scroll">
            <table>
              <thead>
                <tr><th>Unit economics anchor</th><th>Value</th></tr>
              </thead>
              <tbody>
                <tr><td>Revenue per search</td><td>0.01610</td></tr>
                <tr><td>Index search cost</td><td>0.01060</td></tr>
                <tr><td>AI inference cost</td><td>0.00356</td></tr>
                <tr><td>Searches per year</td><td>5 trillion</td></tr>
                <tr><td>Users</td><td>6.25 billion</td></tr>
              </tbody>
            </table>
          </div>
          <div class="scenario-grid">
            <div class="scenario good"><h5>Scenario 1: Baseline, no AI</h5><div class="big">$27.5B</div><p>Income per search is about $0.00550.</p></div>
            <div class="scenario bad"><h5>Scenario 2: GenAI, 10x inference</h5><div class="big">-$150.5B</div><p>Total cost per search rises to about $0.04620, income per search falls to about -$0.03010, and the annual swing is roughly -$178B.</p></div>
          </div>
          <p><strong>Line to memorize:</strong> Google is highly profitable in baseline search, but AI search can flip the economics because inference cost is real.</p>
          <h5>Tech-stack anchor shares in the supplied master file</h5>
          <ul>
            <li>Applications: ChatGPT about 30%, Copilot about 20%, Gemini about 18%, Claude about 8%.</li>
            <li>Developer tools: OpenAI API about 35%, Azure AI about 18%, AWS Bedrock about 15%, Google Vertex about 12%.</li>
            <li>Foundation models: OpenAI about 33%, Google about 22%, Meta about 15%, Anthropic about 12%.</li>
            <li>Cloud: AWS about 31%, Azure about 25%, GCP about 12%.</li>
            <li>Chips: NVIDIA around 80% of AI training GPU share.</li>
          </ul>
        `,
        zhHtml: `
          <p>Google 的矛盾是：它幾乎就是現代 GenAI 技術堆疊的重要發明者之一，但 GenAI 卻可能反過來威脅它已經主導的搜尋經濟。</p>
          <div class="scroll">
            <table>
              <thead>
                <tr><th>單位經濟學錨點</th><th>數值</th></tr>
              </thead>
              <tbody>
                <tr><td>每次搜尋收入</td><td>0.01610</td></tr>
                <tr><td>傳統索引搜尋成本</td><td>0.01060</td></tr>
                <tr><td>AI inference cost</td><td>0.00356</td></tr>
                <tr><td>每年搜尋次數</td><td>5 trillion</td></tr>
                <tr><td>使用者數</td><td>6.25 billion</td></tr>
              </tbody>
            </table>
          </div>
          <div class="scenario-grid">
            <div class="scenario good"><h5>Scenario 1：Baseline，沒有 AI 搜尋</h5><div class="big">$27.5B</div><p>每次搜尋收入約 0.00550 美元。</p></div>
            <div class="scenario bad"><h5>Scenario 2：GenAI，10 倍推論</h5><div class="big">-$150.5B</div><p>每次搜尋總成本升至約 0.04620 美元，每次搜尋收入變成約 -0.03010 美元，年度擺盪約 -1780 億美元。</p></div>
          </div>
          <p><strong>最該背的一句：</strong>Google 在 baseline search 很賺錢，但 AI search 可能因為 inference cost 真實存在而把整個經濟翻掉。</p>
          <h5>整合 master file 的 tech stack 錨點</h5>
          <ul>
            <li>Applications：ChatGPT 約 30%、Copilot 約 20%、Gemini 約 18%、Claude 約 8%。</li>
            <li>Developer tools：OpenAI API 約 35%、Azure AI 約 18%、AWS Bedrock 約 15%、Google Vertex 約 12%。</li>
            <li>Foundation models：OpenAI 約 33%、Google 約 22%、Meta 約 15%、Anthropic 約 12%。</li>
            <li>Cloud：AWS 約 31%、Azure 約 25%、GCP 約 12%。</li>
            <li>Chips：NVIDIA 約占 AI 訓練 GPU 80%。</li>
          </ul>
        `,
      },
      {
        titleEn: "Anthropic Agents optional",
        titleZh: "Anthropic Agents Optional",
        enHtml: `
          <p>The supplied master file frames the shift from chat to agents as a qualitative change rather than a small feature update.</p>
          <div class="mini-grid">
            <div class="mini-card"><h5>Observe</h5><p>Read files, inspect errors, gather data.</p></div>
            <div class="mini-card"><h5>Think</h5><p>Plan, reason, decide next steps.</p></div>
            <div class="mini-card"><h5>Act</h5><p>Edit code, run tests, send messages, use tools.</p></div>
            <div class="mini-card"><h5>Repeat</h5><p>Continue until the task is actually done.</p></div>
          </div>
          <h5>Three agent ingredients</h5>
          <ul>
            <li>A foundation model as the brain.</li>
            <li>Tools as the means to act on the outside world.</li>
            <li>A task-setting loop that keeps the system going until the task is done.</li>
          </ul>
          <p><strong>Compact line:</strong> chat is one turn, while an agent is many turns with tools and planning between them.</p>
          <h5>Chat versus agent</h5>
          <ul>
            <li>Chat: human starts each prompt, reads each answer, and decides each next step.</li>
            <li>Agent: human may start once, then the agent continues across a multi-step workflow.</li>
          </ul>
          <h5>Why this matters strategically</h5>
          <ul>
            <li>The stack is being rewritten, which creates new power layers.</li>
            <li>Open standards can function as competitive weapons. The master file frames MCP as a kind of USB-C for AI.</li>
            <li>If agents absorb more tasks, the application layer may thin out.</li>
          </ul>
          <p>Market anchors in the supplied master file: Anthropic annualized revenue above roughly $19B, valuation around $380B, enterprise API share rising from 12% to 40%, while OpenAI falls from 50% to 27%.</p>
        `,
        zhHtml: `
          <p>整合 master file 把從 chat 走向 agent 的變化，視為質的轉變，而不是小幅功能更新。</p>
          <div class="mini-grid">
            <div class="mini-card"><h5>Observe</h5><p>讀檔、看錯誤、抓資料。</p></div>
            <div class="mini-card"><h5>Think</h5><p>規劃、推理、決定下一步。</p></div>
            <div class="mini-card"><h5>Act</h5><p>改程式、跑測試、發訊息、使用工具。</p></div>
            <div class="mini-card"><h5>Repeat</h5><p>持續重複，直到任務真的完成。</p></div>
          </div>
          <h5>Agent 三要素</h5>
          <ul>
            <li>Foundation model 作為腦。</li>
            <li>Tools 作為對外行動能力。</li>
            <li>Task-setting loop 讓系統持續推進，直到任務完成。</li>
          </ul>
          <p><strong>最簡潔的句子：</strong>Chat 是 one turn，Agent 是 many turns，而且中間有工具與規劃。</p>
          <h5>Chat 對比 Agent</h5>
          <ul>
            <li>Chat：人類每次輸入 prompt、看完輸出，再自己決定下一步。</li>
            <li>Agent：人類可能只啟動一次，之後 agent 橫跨多步驟工作流持續推進。</li>
          </ul>
          <h5>為甚麼有策略意義</h5>
          <ul>
            <li>技術堆疊正在被重寫，因此新層級會創造新權力結構。</li>
            <li>開放標準可以成為競爭武器。master file 把 MCP 比喻成 AI 的 USB-C。</li>
            <li>若 agents 接管更多任務，application layer 可能會變薄。</li>
          </ul>
          <p>整合 master file 的市場錨點包括：Anthropic annualized revenue 約 190 億美元以上，估值約 3800 億美元，enterprise API share 從 12% 升至 40%，而 OpenAI 從 50% 降至 27%。</p>
        `,
      },
    ],
  },
  {
    id: "module-7",
    kickerEn: "Module 7",
    kickerZh: "模組 7",
    titleEn: "Platform Early Growth and Takeoff",
    titleZh: "平臺早期成長與起飛",
    sourceEn: "Built from the supplied master file",
    sourceZh: "依整合 master file 重建",
    quoteEn: "Critical mass requires net benefits above adoption cost.",
    quoteZh: "要先讓淨效益壓過採用成本，才摸得到 critical mass。",
    blocks: [
      {
        titleEn: "Adoption logic, chicken-and-egg, and launch families",
        titleZh: "採用邏輯、Chicken-and-Egg 與起飛策略",
        enHtml: `
          <div class="eq">Net Benefits = Stand-Alone Benefits + Network Benefits - Adopter Costs</div>
          <p>Two minimum conditions must hold for adoption: potential adopters must know about the platform and be able to reach it, and they must also have enough incentive to adopt. Stand-alone benefits exist even if nobody else joins. Network benefits rise as more participants join.</p>
          <h5>Chicken-and-egg</h5>
          <p>The first users are asked to adopt when the platform offers the least value and imposes the highest cost. Critical mass is the threshold beyond which growth becomes self-propelling.</p>
          <p>In the supplied 2x2 launch game, two adopters each face cost 1 and receive benefit 2 only if both adopt. That generates two equilibria: both adopt or nobody adopts.</p>
          <h5>Coaxing</h5>
          <ul>
            <li>Give one side enough stand-alone value to move first.</li>
            <li>Use subsidies or penetration pricing.</li>
            <li>Feed early influencers or colonizers first.</li>
            <li>Examples listed in the master file include LinkedIn’s free page, Zillow’s teaser function, Amazon’s one-side entry, and early creator seeding on TikTok.</li>
          </ul>
          <h5>Coordinating</h5>
          <ul>
            <li>Get multiple sides to move together or believe that others will move together.</li>
            <li>Use bounded launch environments such as campuses or events.</li>
            <li>Borrow from existing networks or piggyback on another system.</li>
            <li>Examples include Facebook campuses, Diner’s Club in Manhattan, Airbnb’s Craigslist bridge, invitation-only Clubhouse, Etsy’s dual-role users, and YouTube plus MySpace.</li>
          </ul>
        `,
        zhHtml: `
          <div class="eq">Net Benefits = Stand-Alone Benefits + Network Benefits - Adopter Costs</div>
          <p>採用至少要滿足兩個基本條件：潛在採用者必須知道這個平臺，且接觸得到；同時也要有足夠誘因願意採用。Stand-alone benefits 在沒別人加入時也存在，Network benefits 則會隨其他人加入而增加。</p>
          <h5>Chicken-and-Egg</h5>
          <p>最早的使用者被要求在平臺價值最少、成本最高時先採用。Critical mass 是成長開始能自我推動的門檻。</p>
          <p>整合 master file 裡的 2x2 起點賽局是：兩位採用者各自成本 1，只有雙方都採用時各得益 2，因此存在兩個均衡，全部採用或無人採用。</p>
          <h5>Coaxing</h5>
          <ul>
            <li>先讓某一邊單獨就有足夠價值願意先動。</li>
            <li>用補貼或滲透定價。</li>
            <li>先餵早期 influencer 或 colonizer。</li>
            <li>master file 舉的例子包括 LinkedIn 免費頁面、Zillow teaser、Amazon 先單邊進場，以及 TikTok 早期創作者種子。</li>
          </ul>
          <h5>Coordinating</h5>
          <ul>
            <li>讓多邊一起動，或至少讓大家相信別人也會一起動。</li>
            <li>用校園或活動這類有邊界的啟動環境。</li>
            <li>借用既有網路，或 piggyback 在別的系統上。</li>
            <li>例子包括 Facebook 校園、Diner's Club 曼哈頓、Airbnb 對 Craigslist 的橋接、邀請制 Clubhouse、Etsy 的雙邊角色，以及 YouTube 加上 MySpace。</li>
          </ul>
        `,
      },
      {
        titleEn: "No silver bullet and the rocket checklist",
        titleZh: "沒有銀彈與火箭檢查表",
        enHtml: `
          <p>Most platforms do not take off. Heavy subsidy alone is often expensive and still insufficient. The launch problem should be handled like a rocket-design problem rather than a generic marketing problem.</p>
          <div class="mini-grid">
            <div class="mini-card"><h5>01</h5><p>How many sides are required at the start, and which can be delayed?</p></div>
            <div class="mini-card"><h5>02</h5><p>What user count is needed for critical mass on each side? Write down numbers.</p></div>
            <div class="mini-card"><h5>03</h5><p>Can the platform go directly to the mainstream, or must it begin with a niche?</p></div>
            <div class="mini-card"><h5>04</h5><p>What tactics are used for each side and each stage, and what backup plan exists?</p></div>
          </div>
        `,
        zhHtml: `
          <p>大多數平臺根本起飛不了。單靠砸補貼通常又貴又未必有效。起飛問題比較像火箭設計問題，不只是一般行銷問題。</p>
          <div class="mini-grid">
            <div class="mini-card"><h5>01</h5><p>一開始到底需要幾個 sides，哪些可以延後？</p></div>
            <div class="mini-card"><h5>02</h5><p>每一邊的 critical mass 需要多少採用者？要寫出數字。</p></div>
            <div class="mini-card"><h5>03</h5><p>能直接進主流，還是必須先從 niche 開始？</p></div>
            <div class="mini-card"><h5>04</h5><p>每一邊、每一階段用甚麼 tactics，有沒有備案？</p></div>
          </div>
        `,
      },
      {
        titleEn: "SaferTaxi",
        titleZh: "SaferTaxi",
        enHtml: `
          <p>This case matters because it shows a platform can have a real value proposition and still fail to match scale, cost, and reachable market.</p>
          <ul>
            <li>A Latin American ride-hailing platform operating in three cities before Uber’s major entry, with total population around 30 million and a taxi market around $2.2B.</li>
            <li>Economic pain point: roughly $1M annual cost, at one point only 46 cabs, and revenue needing to grow tenfold just to break even.</li>
            <li>Smartphone penetration is extremely low, only 9% to 19%, which limits reachable demand.</li>
          </ul>
          <div class="scroll">
            <table>
              <thead>
                <tr><th>Metric</th><th>Buenos Aires</th><th>Santiago</th><th>São Paulo</th></tr>
              </thead>
              <tbody>
                <tr><td>Population</td><td>12,801,000</td><td>6,027,000</td><td>11,320,000</td></tr>
                <tr><td>Per-capita income</td><td>US$10,959</td><td>US$15,415</td><td>US$12,340</td></tr>
                <tr><td>Smartphone penetration</td><td>10%</td><td>19%</td><td>9%</td></tr>
                <tr><td>Number of taxis</td><td>37,860</td><td>22,107</td><td>32,000</td></tr>
                <tr><td>Average cost per ride</td><td>US$8.00</td><td>US$6.00</td><td>US$12.50</td></tr>
                <tr><td>Average wait, RadioTaxi</td><td>30 min</td><td>20 min</td><td>30 min</td></tr>
                <tr><td>Average wait, SaferTaxi</td><td>9 min</td><td>6 min</td><td>12 min</td></tr>
              </tbody>
            </table>
          </div>
          <h5>Growth tactics</h5>
          <ul>
            <li>Driver side: cheap smartphones, training, on-site taxi-stand managers, agreements with RadioTaxi operators, 11.5% electronic commission and 7% cash commission with free trial.</li>
            <li>Passenger side: mobile advertising, PR, friend networks, corporate contracts, and events.</li>
          </ul>
          <h5>Strategic options listed</h5>
          <ul>
            <li>Minimal investment and narrower positioning.</li>
            <li>Larger investment to build a bigger position and perhaps coexist or be acquired.</li>
            <li>Stop altogether.</li>
            <li>Another option.</li>
          </ul>
          <p><strong>Takeaway:</strong> SaferTaxi is not a case of zero value. It is a case in which scale, cost, and reachable market fail to fit one another. The real managerial question is whether the platform should move toward a smaller, sharper differentiated position.</p>
        `,
        zhHtml: `
          <p>這個案例重要，因為它說明平臺即使有真正的 value proposition，仍然可能在規模、成本與可觸及市場之間出現不匹配。</p>
          <ul>
            <li>拉丁美洲叫車平臺，在 Uber 等大玩家大舉進入前已經進入三個城市，總人口約 3,000 萬，計程車市場約 22 億美元。</li>
            <li>經濟壓力很明顯：每年成本約 100 萬美元，一度只有 46 輛車，營收還要再成長 10 倍才有機會打平。</li>
            <li>智慧型手機滲透率只有 9% 到 19%，可觸及市場因此受到嚴重限制。</li>
          </ul>
          <div class="scroll">
            <table>
              <thead>
                <tr><th>指標</th><th>Buenos Aires</th><th>Santiago</th><th>São Paulo</th></tr>
              </thead>
              <tbody>
                <tr><td>Population</td><td>12,801,000</td><td>6,027,000</td><td>11,320,000</td></tr>
                <tr><td>Per-capita income</td><td>US$10,959</td><td>US$15,415</td><td>US$12,340</td></tr>
                <tr><td>Smartphone penetration</td><td>10%</td><td>19%</td><td>9%</td></tr>
                <tr><td>Number of taxis</td><td>37,860</td><td>22,107</td><td>32,000</td></tr>
                <tr><td>Average cost per ride</td><td>US$8.00</td><td>US$6.00</td><td>US$12.50</td></tr>
                <tr><td>RadioTaxi 平均等待</td><td>30 min</td><td>20 min</td><td>30 min</td></tr>
                <tr><td>SaferTaxi 平均等待</td><td>9 min</td><td>6 min</td><td>12 min</td></tr>
              </tbody>
            </table>
          </div>
          <h5>成長 tactics</h5>
          <ul>
            <li>司機端：廉價手機、培訓、計程車站現場經理、與 RadioTaxi 營運者合作、電子 11.5% 與現金 7% 的抽成安排，並提供免費試用。</li>
            <li>乘客端：行動廣告、公關、朋友網路、企業客戶合約與活動。</li>
          </ul>
          <h5>投影片列出的策略選項</h5>
          <ul>
            <li>最小化投資並找更小更準的定位。</li>
            <li>加大投資以建立更大位置，並可能與 Uber 共存或被收購。</li>
            <li>直接停止。</li>
            <li>其他方案。</li>
          </ul>
          <p><strong>結論：</strong>SaferTaxi 不是沒有 value proposition，而是規模、成本與可觸及市場彼此不夠匹配。教授真正要你判斷的是，它是否應該轉向更小、更準、更有差異化的定位。</p>
        `,
      },
    ],
  },
  {
    id: "module-8",
    kickerEn: "Module 8",
    kickerZh: "模組 8",
    titleEn: "Platform Competition",
    titleZh: "平臺競爭",
    sourceEn: "Built from the supplied master file",
    sourceZh: "依整合 master file 重建",
    quoteEn: "Platform competition is not only about who has the better position. It is also about which equilibrium the market tips toward.",
    quoteZh: "平臺競爭不是只問誰位置比較好，還要問市場最後會 tip 到哪個 equilibrium。",
    blocks: [
      {
        titleEn: "Why platform competition is different",
        titleZh: "為甚麼平臺競爭不同",
        enHtml: `
          <p>Traditional competition asks who has the better position. Platform competition adds a second question: which equilibrium the market will tip toward.</p>
          <p>When returns to scale are strong, the market can settle into multiple equilibria, such as no adoption, Platform A wins, or Platform B wins. That means uncertainty, path dependence, and tipping dynamics become central.</p>
          <p><strong>Compact line:</strong> competition becomes competition <em>for</em> the market, not merely competition <em>in</em> the market.</p>
        `,
        zhHtml: `
          <p>傳統競爭主要問誰位置比較好。平臺競爭還多了一個問題，就是市場最後會 tip 到哪個 equilibrium。</p>
          <p>當規模報酬很強時，市場可能停在多個均衡之一，例如無採用、平臺 A 勝，或平臺 B 勝。於是未來不確定性、路徑依賴與 tipping 動態都會變成核心問題。</p>
          <p><strong>最短的記法：</strong>競爭會從在市場中競爭，轉成爭奪整個市場。</p>
        `,
      },
      {
        titleEn: "Switching costs, multi-homing costs, and WTA conditions",
        titleZh: "Switching Costs、Multi-Homing Costs 與 WTA 條件",
        enHtml: `
          <p><strong>Switching cost</strong> is the cost of moving from Platform A to Platform B. <strong>Multi-homing cost</strong> is the cost of using an additional platform while already on one.</p>
          <h5>Raise these costs</h5>
          <ul>
            <li>Loyalty programs such as Amazon Prime.</li>
            <li>Data that are hard to port, such as iCloud lock-in.</li>
            <li>Exclusive features, such as Spotify podcasts.</li>
            <li>Bundled subscriptions, such as Microsoft 365.</li>
          </ul>
          <h5>Lower these costs</h5>
          <ul>
            <li>Seamless onboarding and data migration, such as WhatsApp-style moves.</li>
            <li>Subsidizing the switching burden, such as T-Mobile style offers.</li>
            <li>Compatibility with the rival ecosystem, such as Slack-style integration logic.</li>
            <li>Free trials.</li>
          </ul>
          <p><strong>Winner-take-all requires all three conditions to be strong:</strong></p>
          <ul>
            <li>Strong scale effects.</li>
            <li>Little scope for differentiation.</li>
            <li>Large switching and multi-homing costs.</li>
          </ul>
          <p>Strong scale alone is not enough. The supplied master file uses online search as a closer WTA case and magazines as a non-WTA contrast because magazines still allow differentiation and low switching cost.</p>
        `,
        zhHtml: `
          <p><strong>Switching cost</strong> 是從平臺 A 移去平臺 B 的成本。<strong>Multi-homing cost</strong> 是已經在一個平臺上時，再多用一個平臺的成本。</p>
          <h5>提高這些成本</h5>
          <ul>
            <li>像 Amazon Prime 的忠誠計畫。</li>
            <li>像 iCloud 那樣難以移轉的資料。</li>
            <li>獨家功能，例如 Spotify podcasts。</li>
            <li>訂閱綑綁，例如 Microsoft 365。</li>
          </ul>
          <h5>降低這些成本</h5>
          <ul>
            <li>像 WhatsApp 那樣的無縫導入與資料遷移。</li>
            <li>補貼轉換成本，例如 T-Mobile 那種做法。</li>
            <li>與對手生態系相容，例如 Slack 類型的整合策略。</li>
            <li>免費試用。</li>
          </ul>
          <p><strong>Winner-take-all 必須三條件都很強：</strong></p>
          <ul>
            <li>Strong scale effects。</li>
            <li>Little scope for differentiation。</li>
            <li>Large switching 與 multi-homing costs。</li>
          </ul>
          <p>單靠規模效應並不夠。整合 master file 用 online search 當比較接近 WTA 的例子，用 magazines 當反例，因為後者仍有差異化空間，而且轉換成本低。</p>
        `,
      },
      {
        titleEn: "Uber China",
        titleZh: "Uber China",
        enHtml: `
          <p>This case matters because it separates <strong>fighting like winner-take-all</strong> from <strong>actually being in a winner-take-all market</strong>.</p>
          <ul>
            <li>Uber’s early form resembled a premium pre-booked black-car service, then it scaled globally and formed Uber China as a separate operating entity to confront Didi.</li>
            <li>The supplied master file highlights a later profitability fact: Uber first reached annual operating profit in 2023 at about $1.1B, driven by scope expansion through Uber Eats and Uber Freight, cost management, and post-pandemic recovery.</li>
            <li>The stable strategic line is <strong>scope rather than scale</strong>.</li>
          </ul>
          <div class="status-grid">
            <div class="status"><div class="top"><strong>Strong scale effects</strong><span class="badge yes">YES</span></div><p>The market had meaningful scale effects.</p></div>
            <div class="status"><div class="top"><strong>Little scope for differentiation</strong><span class="badge debatable">DEBATABLE</span></div><p>Differentiation was not absent enough to make the market cleanly WTA.</p></div>
            <div class="status"><div class="top"><strong>Large switching and multi-homing costs</strong><span class="badge no">NO</span></div><p>Riders and drivers could multi-home too easily.</p></div>
          </div>
          <p>Because only two of the three WTA conditions were strong, the outcome looks more like a war of attrition than a clean network tipping story.</p>
          <h5>Outcome anchors</h5>
          <ul>
            <li>Didi acquired Uber China.</li>
            <li>Didi valuation anchor: about $35B.</li>
            <li>Uber’s stake: 17.7%.</li>
            <li>Implied payoff anchor: about $6.2B, roughly six times the invested capital upon exit.</li>
          </ul>
          <h5>Robot-car comparison</h5>
          <div class="scroll">
            <table>
              <thead>
                <tr><th>Metric</th><th>Robot cars, Uber-owned</th><th>Human drivers, driver-owned</th></tr>
              </thead>
              <tbody>
                <tr><td>Fixed operating cost</td><td>~$26,800 per year</td><td>$0</td></tr>
                <tr><td>Variable cost</td><td>~$10,000</td><td>~$40,000 in driver earnings</td></tr>
                <tr><td>Annual revenue per car</td><td>$60,000 to $80,000</td><td>$60,000 to $80,000</td></tr>
                <tr><td>Uber’s share</td><td>100%</td><td>20% to 30%, about $12,000 to $24,000</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Line to memorize:</strong> firms can fight as if the market is winner-take-all even when the market itself is not fully winner-take-all.</p>
        `,
        zhHtml: `
          <p>這個案例重要，因為它把 <strong>照 winner-take-all 邏輯打仗</strong> 與 <strong>市場本身真的屬於 winner-take-all</strong> 兩件事拆開來了。</p>
          <ul>
            <li>Uber 最初比較像預約黑色禮車服務，之後才快速全球擴張，並設立獨立的 Uber China 來面對 Didi。</li>
            <li>整合 master file 特別指出 Uber 後來在 2023 年首次達到年度營運獲利約 11 億美元，改善原因包括 Uber Eats 與 Uber Freight 帶來的 scope expansion、成本管理與疫情後復甦。</li>
            <li>最穩的策略結論是 <strong>scope rather than scale</strong>。</li>
          </ul>
          <div class="status-grid">
            <div class="status"><div class="top"><strong>Strong scale effects</strong><span class="badge yes">YES</span></div><p>這個市場確實有相當明顯的規模效應。</p></div>
            <div class="status"><div class="top"><strong>Little scope for differentiation</strong><span class="badge debatable">DEBATABLE</span></div><p>差異化空間並沒有小到能把市場判成乾淨的 WTA。</p></div>
            <div class="status"><div class="top"><strong>Large switching and multi-homing costs</strong><span class="badge no">NO</span></div><p>乘客與司機都太容易多棲，轉換與多棲成本不高。</p></div>
          </div>
          <p>因為只滿足 2/3 條件，結果更像 war of attrition，而不是乾淨的 network tipping。</p>
          <h5>結局與數字錨點</h5>
          <ul>
            <li>Didi 買下 Uber China。</li>
            <li>Didi 估值錨點：約 350 億美元。</li>
            <li>Uber 持股：約 17.7%。</li>
            <li>推算出的 payoff 錨點：約 62 億美元，離場時約為投資額的 6 倍。</li>
          </ul>
          <h5>Robot Car 比較</h5>
          <div class="scroll">
            <table>
              <thead>
                <tr><th>指標</th><th>Robot cars，Uber 自有</th><th>Human drivers，司機自有</th></tr>
              </thead>
              <tbody>
                <tr><td>固定營運成本</td><td>~$26,800 / 年</td><td>$0</td></tr>
                <tr><td>變動成本</td><td>~$10,000</td><td>~$40,000 司機收入</td></tr>
                <tr><td>每車年收入</td><td>$60,000 到 $80,000</td><td>$60,000 到 $80,000</td></tr>
                <tr><td>Uber 可拿份額</td><td>100%</td><td>20% 到 30%，約 $12,000 到 $24,000</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>最該背的一句：</strong>企業可以照 WTA 邏輯開戰，但市場本身未必真的符合 WTA。</p>
        `,
      },
    ],
  },
];

export default function INNO6230QuizInfrastructure() {
  const [mode, setMode] = useState("en");

  const navSections = useMemo(
    () => [
      { id: "overview", en: "Backbone", zh: "主幹" },
      { id: "module-5", en: "Module 5", zh: "模組 5" },
      { id: "module-6", en: "Module 6", zh: "模組 6" },
      { id: "module-7", en: "Module 7", zh: "模組 7" },
      { id: "module-8", en: "Module 8", zh: "模組 8" },
      { id: "integrity", en: "Coverage & Source Discipline", zh: "涵蓋範圍與來源紀律" },
    ],
    []
  );

  return (
    <div className="quiz-app">
      <style>{styles}</style>
      <div className="quiz-shell">
        <section className="hero">
          <div className="meta-strip">
            <span className="meta-pill">INNO6230 Quiz Infrastructure</span>
            <span className="meta-pill">Primary scope: Modules 5 to 8</span>
            <span className="meta-pill">React JSX, responsive, English-first</span>
            <span className="meta-pill">Background: #FCFAF2</span>
          </div>

          <div className="hero-top">
            <div>
              <h1 className="hero-title">
                <HeadingDual mode={mode} en="INNO6230 Quiz Study Infrastructure" zh="INNO6230 Quiz 視覺化學習基礎設施" />
              </h1>
              <p className="hero-subtitle">
                {mode === "zh"
                  ? "以英文為主版本，並提供純中文與雙語切換。結構依因果鏈重建，重點不是堆疊術語，而是讓讀者快速看懂 framework、案例診斷、數字錨點，以及考前最後該背甚麼。"
                  : mode === "bi"
                  ? "English-first study build with Chinese and bilingual modes. The structure follows the causal chain rather than file order, so readers can move from framework to case diagnosis to anchor numbers with less friction."
                  : "English-first study build with Chinese and bilingual modes. The structure follows the causal chain rather than file order, so readers can move from framework to case diagnosis to anchor numbers with less friction."}
              </p>
            </div>

            <div className="toggle-wrap">
              <div className="toggle-group" aria-label="Language mode toggle">
                <button className={`toggle-btn ${mode === "en" ? "active" : ""}`} onClick={() => setMode("en")}>EN</button>
                <button className={`toggle-btn ${mode === "zh" ? "active" : ""}`} onClick={() => setMode("zh")}>中文</button>
                <button className={`toggle-btn ${mode === "bi" ? "active" : ""}`} onClick={() => setMode("bi")}>EN + 中文</button>
              </div>
              <span className="small-copy">
                {mode === "zh" ? "預設密度偏高，適合複習與考前快速掃描。" : "Dense by design. Built for study, scanning, and case recall."}
              </span>
            </div>
          </div>

          <div className="hero-grid">
            <div className="core-card">
              <h3 className="core-title"><HeadingDual mode={mode} en="Causal Chain" zh="因果鏈骨架" /></h3>
              <p className="body-copy">
                {mode === "zh"
                  ? "最穩的主軸不是按檔名，而是這條邏輯鏈：資料資產、預測問題、演算法、prediction factory、規模經濟、起飛、競爭與 tipping。"
                  : "The cleanest organizing spine is the causal chain itself: data assets, prediction problem, algorithm, prediction factory, scale economics, takeoff, and competition with tipping."}
              </p>
              <div className="chain-wrap">
                <div className="chain-row">
                  {chainSteps.map((step, index) => (
                    <div className="chain-step" key={index}>
                      <div className="chain-kicker">{step.kicker}</div>
                      <div className="chain-head">{mode === "zh" ? step.zh : mode === "bi" ? `${step.en} / ${step.zh}` : step.en}</div>
                      <div className="chain-text">{mode === "zh" ? step.copyZh : mode === "bi" ? `${step.copyEn} / ${step.copyZh}` : step.copyEn}</div>
                    </div>
                  ))}
                </div>
                <div className="arrow-row">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div className="arrow-box" key={index}>→</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="core-card">
              <h3 className="core-title"><HeadingDual mode={mode} en="Reader Priority" zh="讀者優先重點" /></h3>
              <HtmlDual mode={mode} enHtml={overviewFocusEn} zhHtml={overviewFocusZh} />
            </div>
          </div>
        </section>

        <div className="layout">
          <aside className="side-nav">
            <div className="nav-card">
              <h3 className="nav-title"><HeadingDual mode={mode} en="Jump to Section" zh="快速跳轉" /></h3>
              <div className="nav-list">
                {navSections.map((section) => (
                  <a key={section.id} className="nav-link" href={`#${section.id}`}>
                    {mode === "zh" ? section.zh : mode === "bi" ? `${section.en} / ${section.zh}` : section.en}
                  </a>
                ))}
              </div>
            </div>

            <div className="nav-card">
              <h3 className="nav-title"><HeadingDual mode={mode} en="Case Traps" zh="案例陷阱" /></h3>
              <div className="nav-list">
                {[
                  { id: "#module-5", en: "eHarmony: rich survey, weak learning loop", zh: "eHarmony：問卷很豐富，但學習迴路很弱" },
                  { id: "#module-6", en: "Google: inference cost can flip search economics", zh: "Google：推論成本一進來，原本獲利搜尋可能翻盤" },
                  { id: "#module-7", en: "SaferTaxi: value exists, but scale and reach do not fit the economics", zh: "SaferTaxi：價值主張存在，但規模與可觸及市場不配" },
                  { id: "#module-8", en: "Uber China: firms fought like WTA even though the market was not fully WTA", zh: "Uber China：企業照 WTA 打，但市場本身不完全符合 WTA" },
                ].map((item, index) => (
                  <a key={index} className="nav-link" href={item.id}>
                    {mode === "zh" ? item.zh : mode === "bi" ? `${item.en} / ${item.zh}` : item.en}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <main className="content">
            <section className="section" id="overview">
              <div className="section-head">
                <div>
                  <div className="section-kicker">Backbone</div>
                  <h2 className="section-title"><HeadingDual mode={mode} en="Sixteen Sentences to Memorize" zh="考前最後 16 句主幹" /></h2>
                </div>
                <span className="section-source">{mode === "zh" ? "來源：整合 master file" : mode === "bi" ? "Source: supplied master file / 來源：整合 master file" : "Source: supplied master file"}</span>
              </div>
              <div className="backbone-grid">
                {backbone.map((item, index) => (
                  <BackboneItem key={index} mode={mode} index={index + 1} en={item.en} zh={item.zh} />
                ))}
              </div>
            </section>

            {sections.map((section) => (
              <section className="section" id={section.id} key={section.id}>
                <div className="section-head">
                  <div>
                    <div className="section-kicker">{mode === "zh" ? section.kickerZh : section.kickerEn}</div>
                    <h2 className="section-title"><HeadingDual mode={mode} en={section.titleEn} zh={section.titleZh} /></h2>
                  </div>
                  <span className="section-source">{mode === "zh" ? section.sourceZh : mode === "bi" ? `${section.sourceEn} / ${section.sourceZh}` : section.sourceEn}</span>
                </div>

                <div className="overview-grid" style={{ marginBottom: 16 }}>
                  <div className="quote-band">
                    <div className="quote-kicker">Core line</div>
                    <div className="quote-text">{mode === "zh" ? section.quoteZh : mode === "bi" ? `${section.quoteEn} / ${section.quoteZh}` : section.quoteEn}</div>
                  </div>
                  <div className="core-card">
                    <h3 className="core-title"><HeadingDual mode={mode} en="Coverage note" zh="涵蓋說明" /></h3>
                    <Dual
                      mode={mode}
                      en={<>This section is reader-facing. It preserves the supplied study content and reorders it into a more teachable sequence, without adding unsupported new claims.</>}
                      zh={<>這個區塊是面向讀者的。它保留您提供的學習內容，只是改成更好讀、更好教的順序，沒有另外捏造新的主張。</>}
                    />
                  </div>
                </div>

                <div className="section-grid">
                  {section.blocks.map((block, index) => (
                    <div className="core-card" key={index}>
                      <h3 className="core-title"><HeadingDual mode={mode} en={block.titleEn} zh={block.titleZh} /></h3>
                      <HtmlDual mode={mode} enHtml={block.enHtml} zhHtml={block.zhHtml} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="section" id="integrity">
              <div className="section-head">
                <div>
                  <div className="section-kicker">Coverage and source discipline</div>
                  <h2 className="section-title"><HeadingDual mode={mode} en="What is covered, and what is not invented" zh="哪些有涵蓋，哪些沒有被捏造" /></h2>
                </div>
                <span className="section-source">{mode === "zh" ? "面向讀者的透明說明" : mode === "bi" ? "Reader-facing transparency note / 面向讀者的透明說明" : "Reader-facing transparency note"}</span>
              </div>

              <div className="footer-grid">
                <div className="footer-card">
                  <h3 className="core-title"><HeadingDual mode={mode} en="What this file does" zh="這份檔案做了甚麼" /></h3>
                  <HtmlDual
                    mode={mode}
                    enHtml={`
                      <ul>
                        <li>Rebuilt the supplied integrated quiz content into a single, dense study interface.</li>
                        <li>Shifted the structure from file order to causal logic, so the reader can move from data to competition without fragmentation.</li>
                        <li>Added comparison views, loops, tables, and anchor-number layouts to speed up understanding.</li>
                        <li>Kept English as the main presentation layer while supporting pure Chinese and bilingual use.</li>
                      </ul>
                    `}
                    zhHtml={`
                      <ul>
                        <li>把您提供的整合 quiz 內容，重建成單一且高密度的學習介面。</li>
                        <li>把原本按檔名的材料，改成按因果邏輯排列，讓讀者能從資料一路讀到競爭，不必被檔案切碎。</li>
                        <li>加入對照視角、流程、表格與數字錨點版面，讓理解速度更快。</li>
                        <li>以英文作為主呈現層，同時支援純中文與雙語模式。</li>
                      </ul>
                    `}
                  />
                </div>
                <div className="footer-card">
                  <h3 className="core-title"><HeadingDual mode={mode} en="What was intentionally not done" zh="刻意沒有做的事" /></h3>
                  <HtmlDual
                    mode={mode}
                    enHtml={`
                      <ul>
                        <li>No unsupported new framework claims were added beyond the supplied master file and uploaded class materials.</li>
                        <li>No raw-file certainty was claimed for Modules 7 and 8 beyond what exists in the supplied integrated quiz source within this workspace.</li>
                        <li>No decorative simplification was used that would strip away anchor numbers, traps, or case distinctions.</li>
                      </ul>
                    `}
                    zhHtml={`
                      <ul>
                        <li>沒有超出您提供的 master file 與目前上傳課內檔案去擅自增加新框架主張。</li>
                        <li>對模組 7 與 8，沒有假裝擁有額外 raw files 的確定性，只依目前工作區中的整合 quiz 原文處理。</li>
                        <li>沒有為了好看而把數字錨點、案例陷阱或關鍵差異刪掉。</li>
                      </ul>
                    `}
                  />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
