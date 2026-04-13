import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   INNO6230 Quiz Infrastructure v14
   Scope: Modules 5-8 (Notes + Slides, including optionals)
   ═══════════════════════════════════════════════════════════════ */

// ─── Nippon-inspired palette ───
const C = {
  bg: "#FCFAF2",
  paper: "#F7F3E8",
  paperAlt: "#F0EBD8",
  white: "#FFFFFF",
  ink: "#2B2B2B",
  inkSoft: "#4A4A4A",
  muted: "#7A7A7A",
  line: "#D5CEBC",
  lineLight: "#E8E2D2",
  // Nippon Colors
  ai: "#2D4B5E",       // 藍鉄 (tetsu)
  aiLight: "#EBF0F3",
  suo: "#8B3C2A",       // 蘇芳 (suo)
  suoLight: "#F5EBE8",
  kitsune: "#C78A2D",   // 狐色 (kitsune)
  kitsuneLight: "#FBF5E4",
  matsu: "#4A6E50",     // 松葉色 (matsuba)
  matsuLight: "#ECF2ED",
  fuji: "#6B4C7D",      // 藤色 (fuji)
  fujiLight: "#F2EDF5",
  beni: "#CB4042",      // 紅 (beni)
  beniLight: "#FAEAEA",
};

const FONT_BODY = `"Noto Sans", "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
const FONT_HEAD = `"Crimson Pro", "Noto Serif TC", Georgia, "Times New Roman", serif`;
const FONT_MONO = `"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace`;

// ─── CSS ───
const css = `
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap');

*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
body{background:${C.bg};color:${C.ink};font-family:${FONT_BODY};line-height:1.62;-webkit-font-smoothing:antialiased;}

.app{min-height:100vh;background:${C.bg};}
.shell{max-width:1280px;margin:0 auto;padding:18px 18px 84px;}

/* ── Typography ── */
h1,h2,h3{font-family:${FONT_HEAD};letter-spacing:-0.02em;color:${C.fuji};}
.h1{font-size:clamp(26px,4.5vw,44px);line-height:1.1;font-weight:800;}
.h2{font-size:clamp(22px,3vw,30px);line-height:1.15;font-weight:700;}
.h3{font-size:18px;line-height:1.28;font-weight:700;color:${C.ai};}
.body{font-size:15px;line-height:1.68;color:${C.inkSoft};max-width:700px;}
.sm{font-size:13px;line-height:1.55;color:${C.muted};}

/* ── Cards & surfaces ── */
 .card{background:${C.white};border:1px solid ${C.line};border-radius:14px;padding:16px 16px 18px;overflow:hidden;}
.card-paper{background:${C.paper};border:1px solid ${C.line};border-radius:14px;padding:16px;}

/* ── Kicker labels ── */
.kicker{font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:5px;}
.kicker-gold{color:${C.kitsune};}
.kicker-teal{color:${C.ai};}
.kicker-green{color:${C.matsu};}
.kicker-plum{color:${C.fuji};}
.kicker-red{color:${C.suo};}

/* ── Hero ── */
.hero{padding:22px;margin-bottom:18px;background:${C.paper};border:1px solid ${C.line};border-radius:18px;}
.hero-meta{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;}
.pill{display:inline-flex;align-items:center;padding:5px 11px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid ${C.line};background:${C.white};color:${C.inkSoft};white-space:nowrap;}
.hero-sub{font-size:15px;line-height:1.65;color:${C.inkSoft};max-width:700px;margin-top:10px;}

/* ── Layout ── */
.layout{display:grid;grid-template-columns:230px minmax(0,1fr);gap:16px;align-items:start;}
.sidebar{position:sticky;top:12px;display:flex;flex-direction:column;gap:10px;max-height:calc(100vh - 24px);overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;}
.sidebar::-webkit-scrollbar{display:none;}
.main{display:grid;gap:18px;}

/* ── Sidebar nav ── */
.nav-box{background:${C.paper};border:1px solid ${C.line};border-radius:12px;padding:11px;}
.nav-list{display:grid;gap:3px;}
.nav-item{display:block;width:100%;padding:7px 9px;border-radius:8px;font-size:13px;font-weight:600;color:${C.inkSoft};text-decoration:none;border:1px solid transparent;cursor:pointer;transition:all 0.15s;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;line-height:1.4;background:transparent;appearance:none;-webkit-appearance:none;text-align:left;}
.nav-item:hover{border-color:${C.ai};color:${C.ai};background:${C.aiLight};}
.nav-item.active{background:${C.aiLight};border-color:${C.ai};color:${C.ai};}
.nav-item:focus-visible{outline:2px solid ${C.ai};outline-offset:2px;}

/* ── Section wrapper ── */
.sec{background:${C.paper};border:1px solid ${C.line};border-radius:16px;padding:18px;scroll-margin-top:14px;}
.sec-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
.sec-source{font-size:11px;font-weight:600;color:${C.muted};padding:4px 10px;border-radius:999px;border:1px solid ${C.lineLight};background:${C.white};white-space:nowrap;flex-shrink:0;margin-top:4px;}

/* ═══ QUIZ-OPTIMIZED: Quote band (core line per module) ═══ */
.quote{position:relative;background:${C.kitsuneLight};border:1.5px solid ${C.kitsune}44;border-radius:12px;padding:16px 16px 16px 20px;box-shadow:0 1px 0 rgba(0,0,0,0.02);}
.quote::before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:5px;border-radius:999px;background:${C.kitsune};}
.quote-label{font-size:11.5px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${C.suo};margin-bottom:6px;}
.quote-text{font-size:17px;line-height:1.48;font-weight:700;color:${C.ai};font-family:${FONT_HEAD};}

/* ── Grid helpers ── */
.g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}
.g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}
.g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;}
.g2-keep{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}

/* ═══ QUIZ-OPTIMIZED: Backbone flashcards ═══ */
.bb-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}
.bb{background:${C.white};border:1px solid ${C.line};border-left:4px solid ${C.kitsune};border-radius:12px;padding:13px 14px;box-shadow:inset 0 3px 0 ${C.kitsuneLight};}
.bb-num{font-size:11px;font-weight:800;color:${C.kitsune};letter-spacing:0.08em;margin-bottom:4px;}
.bb-en{font-size:14.5px;font-weight:700;line-height:1.48;color:${C.ai};}
.bb-zh{font-size:14px;line-height:1.55;color:${C.inkSoft};margin-top:4px;}

/* ── HTML content blocks ── */
.htb{display:grid;gap:4px;}
.htb p{margin:0 0 10px;font-size:15px;line-height:1.68;color:${C.inkSoft};max-width:68ch;}
.htb ul,.htb ol{margin:0 0 10px;padding-left:20px;display:grid;gap:6px;}
.htb li::marker{color:${C.kitsune};font-weight:800;}
.htb li{font-size:15px;line-height:1.62;color:${C.inkSoft};}
.htb strong{color:${C.ai};font-weight:800;background:linear-gradient(transparent 54%,${C.kitsuneLight} 54%);padding:0 0.1em;box-decoration-break:clone;-webkit-box-decoration-break:clone;}
.htb h4{font-size:17px;font-weight:800;color:${C.fuji};font-family:${FONT_HEAD};margin:0 0 8px;}
.htb h5{display:inline-block;font-size:14.5px;font-weight:800;color:${C.ai};margin:14px 0 7px;padding:3px 10px;border-radius:999px;background:${C.aiLight};border:1px solid ${C.lineLight};}
.htb h5:first-child{margin-top:0;}

/* ── Tables ── */
.tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid ${C.line};border-radius:10px;}
.htb table{width:100%;border-collapse:collapse;min-width:480px;table-layout:auto;}
.htb th,.htb td{border-right:1px solid ${C.lineLight};border-bottom:1px solid ${C.lineLight};padding:6px 8px;text-align:left;vertical-align:top;font-size:13.5px;line-height:1.5;overflow-wrap:anywhere;word-break:break-word;hyphens:auto;}
.htb th{background:${C.kitsuneLight};color:${C.ai};font-weight:800;font-size:12.5px;white-space:normal;line-height:1.35;}
.htb td:last-child,.htb th:last-child{border-right:0;}
.htb tr:last-child td{border-bottom:0;}
.scan .htb table{min-width:320px;}
.scan .htb th,.scan .htb td{font-size:12.5px;padding:5px 7px;}

/* ── Equation pills ── */
.eq{display:inline-block;padding:8px 14px;border-radius:999px;border:1px solid ${C.line};background:${C.kitsuneLight};color:${C.fuji};font-weight:800;font-family:${FONT_MONO};font-size:14px;margin:6px 0 12px;word-break:break-word;box-shadow:0 1px 0 rgba(0,0,0,0.02);}

/* ── Mini cards ── */
.mc{border:1px solid ${C.lineLight};border-radius:10px;background:${C.paper};padding:10px 12px;}
.mc h5{margin:0 0 4px;font-size:14.5px;font-weight:700;color:${C.ai};}
.mc p{margin:0;font-size:14px;line-height:1.55;color:${C.inkSoft};}

/* ── Scenario cards ── */
.scn{border:1px solid ${C.line};border-radius:12px;background:${C.white};padding:14px;}
.scn.good{border-color:rgba(74,110,80,0.4);}
.scn.bad{border-color:rgba(203,64,66,0.35);}
.scn .big{font-size:28px;font-weight:900;line-height:1;color:${C.ai};margin:4px 0 6px;}
.scn.bad .big{color:${C.beni};}
.scn h5{font-size:14px;margin:0 0 3px;}
.scn p{font-size:14px;line-height:1.5;color:${C.inkSoft};margin:0;}

/* ── Status badges ── */
.badge{padding:3px 8px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:0.04em;border:1px solid ${C.lineLight};}
.badge-yes{background:${C.matsuLight};color:${C.matsu};}
.badge-no{background:${C.beniLight};color:${C.beni};}
.badge-maybe{background:${C.kitsuneLight};color:${C.kitsune};}

/* ── Status card row ── */
.st{border:1px solid ${C.line};border-radius:10px;background:${C.white};padding:11px 12px;}
.st-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px;}
.st-top strong{font-size:13.5px;}

/* ── Metric cards ── */
.met{border:1px solid ${C.line};border-radius:10px;background:${C.kitsuneLight};padding:11px 12px;}
.met-label{font-size:11px;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:0.04em;margin-bottom:3px;}
.met-val{font-size:24px;font-weight:900;color:${C.ai};letter-spacing:-0.03em;line-height:1;font-variant-numeric:tabular-nums;}
.met-note{font-size:13px;line-height:1.48;color:${C.inkSoft};margin-top:4px;}

/* ── SVG diagrams ── */
.dia{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;}
.dia svg{display:block;max-width:100%;height:auto;}

/* ── Scan board ── */
.scan-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px;}
.scan{background:${C.white};border:1px solid ${C.line};border-radius:14px;padding:14px;display:grid;gap:8px;overflow:hidden;}

/* ── Chain ── */
.chain-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;}
.chain-card{background:${C.white};border:1px solid ${C.line};border-radius:12px;padding:10px;min-height:100px;}
.chain-kicker{font-size:10px;font-weight:800;color:${C.kitsune};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;}
.chain-head{font-size:13px;font-weight:800;color:${C.ai};line-height:1.3;margin-bottom:4px;}
.chain-body{font-size:12px;line-height:1.5;color:${C.muted};}
.chain-arrows{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin-top:-1px;}
.chain-arrow{display:flex;align-items:center;justify-content:center;font-size:16px;color:${C.kitsune};}

/* ── Dual language ── */
.dual{display:grid;gap:6px;}
.mt-hero{margin-top:16px;}
.dual.en-only .zh-part{display:none;}
.dual.zh-only .en-part{display:none;}
.dual.bi-mode{grid-template-columns:1fr;gap:12px;}
.dual.bi-mode .bi-lane{border:1px solid ${C.lineLight};border-radius:12px;background:#FFFDF6;padding:0;overflow:hidden;}
.dual.bi-mode .bi-label{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid ${C.lineLight};font-size:11.5px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${C.ai};background:${C.paperAlt};}
.dual.bi-mode .bi-copy{padding:12px 12px 14px;}

/* ═══ QUIZ-OPTIMIZED: Case-trap drill cards ═══ */
.trap-card{border:2px solid ${C.suo};border-left:5px solid ${C.suo};border-radius:12px;background:${C.suoLight};padding:12px 14px;}
.trap-card h5{margin:0 0 5px;font-size:15px;font-weight:800;color:${C.suo};}
.trap-card p{margin:0;font-size:14.5px;line-height:1.55;color:${C.ink};font-weight:600;}

/* ═══ Concept primer ═══ */
.primer-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:14px;}
.primer-terms{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}
.term-card{background:${C.white};border:1px solid ${C.line};border-radius:12px;padding:12px 13px;}
.term-sym{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;padding:0 10px;border-radius:999px;background:${C.aiLight};color:${C.ai};font-family:${FONT_MONO};font-weight:800;font-size:15px;margin-bottom:8px;}
.term-head{font-size:13.5px;font-weight:800;line-height:1.45;color:${C.ai};margin-bottom:4px;}
.term-body{font-size:13.5px;line-height:1.58;color:${C.inkSoft};}
.term-note{font-size:12.5px;line-height:1.55;color:${C.muted};margin-top:6px;}
.flow-card{background:${C.white};border:1px solid ${C.line};border-radius:12px;padding:14px;}
.flow-list{display:grid;gap:8px;margin-top:10px;}
.flow-step{display:grid;grid-template-columns:24px 1fr;gap:10px;align-items:start;}
.flow-num{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:999px;background:${C.kitsuneLight};color:${C.suo};font-size:11px;font-weight:800;}
.flow-text{font-size:13.75px;line-height:1.58;color:${C.inkSoft};}
.primer-mini{margin-top:12px;padding:11px 12px;border-radius:10px;border:1px solid ${C.lineLight};background:${C.paper};}
.primer-mini strong{color:${C.ai};}
.formula-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px;}
.formula-card{background:${C.white};border:1px solid ${C.line};border-radius:12px;padding:12px 13px;display:grid;gap:8px;}
.formula-label{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${C.kitsune};}
.formula-text{display:inline-block;padding:8px 12px;border-radius:999px;border:1px solid ${C.line};background:${C.kitsuneLight};color:${C.fuji};font-weight:800;font-family:${FONT_MONO};font-size:13.5px;line-height:1.4;max-width:100%;overflow-wrap:anywhere;}
.formula-sub{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${C.ai};margin-bottom:3px;}
.formula-copy{font-size:13px;line-height:1.58;color:${C.inkSoft};}
.formula-note{font-size:12.5px;line-height:1.55;color:${C.muted};margin-top:2px;}
.formula-example{padding:9px 10px;border-radius:10px;border:1px solid ${C.lineLight};background:${C.paper};}


/* ── Module 5 flowchart visuals ── */
.module5-viz{display:grid;gap:16px;margin:14px 0 16px;}
.flow-viz-grid{display:grid;grid-template-columns:1fr;gap:16px;}
.flow-viz-card{background:${C.white};border:1px solid ${C.line};border-radius:16px;padding:18px;display:grid;gap:12px;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,0.02);}
.flow-viz-head{display:grid;gap:5px;}
.flow-viz-note{font-size:14px;line-height:1.68;color:${C.inkSoft};max-width:82ch;}
.flow-badges{display:flex;flex-wrap:wrap;gap:6px;}
.flow-badge{display:inline-flex;align-items:center;padding:4px 9px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:0.04em;border:1px solid ${C.lineLight};}
.flow-badge.good{background:${C.matsuLight};color:${C.matsu};}
.flow-badge.warn{background:${C.kitsuneLight};color:${C.kitsune};}
.flow-badge.bad{background:${C.beniLight};color:${C.beni};}
.flow-badge.info{background:${C.aiLight};color:${C.ai};}
.flow-caption{font-size:13.5px;line-height:1.62;color:${C.muted};max-width:84ch;}
.flow-svg{border:1px solid ${C.lineLight};border-radius:14px;background:linear-gradient(180deg,#fffdf7,${C.paper});padding:10px;}
.flow-svg svg{width:100%;height:auto;min-width:980px;display:block;}
.flow-oral{border:1px solid ${C.line};border-left:4px solid ${C.fuji};border-radius:12px;background:${C.fujiLight};padding:12px 14px;display:grid;gap:7px;}
.flow-oral-kicker{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${C.fuji};}
.flow-oral-copy{font-size:14px;line-height:1.62;color:${C.ink};font-weight:600;max-width:84ch;}
.flow-oral-copy strong{color:${C.ai};}
.svg-label{font-family:${FONT_BODY};fill:${C.inkSoft};}
.final10-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;}
.final10-card{background:${C.white};border:1px solid ${C.line};border-top:4px solid ${C.matsu};border-radius:12px;padding:12px 13px;}
.final10-time{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${C.matsu};margin-bottom:5px;}
.final10-head{font-size:14px;font-weight:800;line-height:1.45;color:${C.ai};margin-bottom:5px;}
.final10-copy{font-size:13px;line-height:1.58;color:${C.inkSoft};}
.final10-table{display:grid;grid-template-columns:1.2fr 1fr 1.1fr;gap:0;border:1px solid ${C.line};border-radius:12px;overflow:hidden;background:${C.white};}
.final10-th,.final10-td{padding:10px 11px;border-right:1px solid ${C.lineLight};border-bottom:1px solid ${C.lineLight};}
.final10-th{background:${C.kitsuneLight};font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${C.ai};}
.final10-td{font-size:13px;line-height:1.55;color:${C.inkSoft};}
.final10-table > :nth-child(3n){border-right:0;}
.final10-table > :nth-last-child(-n+3){border-bottom:0;}
.final10-say{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px;}
.say-card{background:${C.white};border:1px solid ${C.line};border-radius:12px;padding:12px 13px;}
.say-card.red{border-left:4px solid ${C.suo};}
.say-card.blue{border-left:4px solid ${C.ai};}
.say-kicker{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;}
.say-card.red .say-kicker{color:${C.suo};}
.say-card.blue .say-kicker{color:${C.ai};}
.say-list{display:grid;gap:7px;padding-left:18px;}
.say-list li{font-size:13.5px;line-height:1.58;color:${C.inkSoft};}
.say-list li::marker{font-weight:800;color:${C.kitsune};}
.scan3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:14px;}
.scan3-card{background:${C.white};border:1px solid ${C.line};border-radius:12px;padding:13px 14px;}
.scan3-card.must{border-top:4px solid ${C.kitsune};}
.scan3-card.judge{border-top:4px solid ${C.ai};}
.scan3-card.evidence{border-top:4px solid ${C.suo};}
.scan3-kicker{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:7px;}
.scan3-card.must .scan3-kicker{color:${C.kitsune};}
.scan3-card.judge .scan3-kicker{color:${C.ai};}
.scan3-card.evidence .scan3-kicker{color:${C.suo};}
.scan3-list{display:grid;gap:7px;padding-left:18px;}
.scan3-list li{font-size:14px;line-height:1.58;color:${C.inkSoft};}
.scan3-list li::marker{font-weight:800;color:${C.kitsune};}
.detail-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:2px 0 12px;}
.detail-head .sm{max-width:none;}
.detail-grid{display:grid;grid-template-columns:1fr;gap:12px;}

/* ── Floating language FAB ── */
.fab-wrap{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom, 0px));z-index:90;display:grid;gap:7px;justify-items:end;}
.fab{width:46px;height:46px;border-radius:999px;border:1px solid rgba(0,0,0,0.08);background:${C.fuji};color:#fff;cursor:pointer;font-size:12px;font-weight:800;box-shadow:0 4px 16px rgba(0,0,0,0.14);display:flex;align-items:center;justify-content:center;transition:transform 0.15s;-webkit-tap-highlight-color:transparent;}
.fab:hover{transform:scale(1.06);}
.fab-panel{display:inline-flex;gap:2px;padding:3px;border-radius:999px;border:1px solid ${C.line};background:rgba(255,255,255,0.97);backdrop-filter:blur(10px);box-shadow:0 6px 20px rgba(0,0,0,0.12);}
.fab-panel button{border:0;background:transparent;color:${C.muted};padding:8px 13px;font-size:13px;font-weight:700;cursor:pointer;border-radius:999px;transition:all 0.12s;-webkit-tap-highlight-color:transparent;}
.fab-panel button.on{background:${C.ai};color:#fff;}

/* ── Collapsible sections ── */
.collapse-trigger{display:flex;align-items:flex-start;justify-content:space-between;width:100%;background:none;border:none;cursor:pointer;padding:0;font:inherit;text-align:left;color:inherit;gap:16px;}
.collapse-trigger .chevron{width:22px;height:22px;transition:transform 0.2s;color:${C.muted};flex-shrink:0;margin-top:6px;}
.collapse-trigger .chevron.open{transform:rotate(180deg);}

/* ── Responsive: tablet ── */
@media(max-width:1100px){
  .layout{grid-template-columns:1fr;}
  .sidebar{position:static;max-height:none;flex-direction:row;flex-wrap:wrap;}
  .sidebar .nav-box{flex:1;min-width:200px;}
  .chain-grid{grid-template-columns:repeat(4,minmax(0,1fr));}
  .chain-arrows{display:none;}
  .scan-grid{grid-template-columns:1fr;}
  .g4{grid-template-columns:repeat(2,minmax(0,1fr));}
  .formula-grid,.final10-grid,.final10-say,.flow-viz-grid{grid-template-columns:1fr;}
  .flow-svg svg{min-width:900px;}
  .final10-table{grid-template-columns:1fr;}
  .final10-th{display:none;}
  .final10-td{border-right:0;}
}

/* ── Responsive: large phone ── */
@media(max-width:768px){
  .shell{padding:12px 10px 80px;}
  .hero,.sec{padding:14px;border-radius:14px;}
  .g2,.g4,.dual.bi-mode{grid-template-columns:1fr;}
  .primer-grid,.primer-terms,.scan3,.formula-grid,.final10-grid,.final10-say,.flow-viz-grid{grid-template-columns:1fr;}
  .flow-viz-card{padding:14px;}
  .flow-viz-note{font-size:14.5px;}
  .flow-caption,.flow-oral-copy{font-size:14px;}
  .flow-svg{padding:8px;}
  .flow-svg svg{min-width:860px;}
  .g3{grid-template-columns:1fr;}
  .chain-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
  .chain-card{min-height:auto;}
  .h1{font-size:24px;}
  .h2{font-size:21px;}
  .sidebar{flex-direction:column;gap:8px;}
  .sidebar .nav-box{min-width:0;}
  .sec-head{flex-direction:column;gap:6px;}
  .card{padding:13px;}
  .mt-hero{margin-top:12px;}
  .fab-wrap{right:12px;bottom:calc(12px + env(safe-area-inset-bottom, 0px));}
  .fab{width:48px;height:48px;font-size:13px;}
  .fab-panel button{padding:9px 14px;font-size:13.5px;}
  .tbl-wrap{position:relative;}
  .tbl-wrap::after{content:"";position:absolute;top:0;right:0;bottom:0;width:20px;pointer-events:none;background:linear-gradient(to left,rgba(252,250,242,0.6),transparent);border-radius:0 10px 10px 0;}
}

/* ── Responsive: 375-390px ── */
@media(max-width:390px){
  .shell{padding:10px 8px 76px;}
  .hero,.sec{padding:12px;border-radius:12px;}
  .h1{font-size:22px;}
  .h2{font-size:19px;}
  .htb p,.htb li{font-size:14.5px;}
  .body,.hero-sub{font-size:14.5px;}
  .bb-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;}
  .bb{padding:10px;}
  .bb-en{font-size:13.5px;line-height:1.42;}
  .bb-zh{font-size:13px;}
  .chain-grid{grid-template-columns:1fr;}
  .g2-keep{gap:8px;}
  .met-val{font-size:20px;}
  .quote-text{font-size:15.5px;}
  .fab{width:44px;height:44px;font-size:12px;}
  .fab-panel button{padding:8px 12px;font-size:13px;}
  .flow-svg svg{min-width:820px;}
}
`;

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const chainSteps = [
  { mod: "M5", en: "Data Assets", zh: "資料資產", descEn: "What can be observed shapes what can be predicted.", descZh: "先看得到，才有後續可預測的空間。" },
  { mod: "M5", en: "Prediction Problem", zh: "預測問題", descEn: "Choose the decision and the target before choosing the model.", descZh: "先決策與目標，再談模型。" },
  { mod: "M5", en: "Algorithm", zh: "演算法", descEn: "Decision rule plus prediction model.", descZh: "決策規則加上預測模型。" },
  { mod: "M5", en: "Prediction Factory", zh: "預測工廠", descEn: "Live run, train, refine, feedback.", descZh: "即時執行、訓練精煉、持續回饋。" },
  { mod: "M6", en: "Scale Economics", zh: "規模經濟", descEn: "LLM economics differ because inference cost stays real.", descZh: "LLM 經濟結構不同，推論成本真實存在。" },
  { mod: "M7", en: "Takeoff", zh: "起飛", descEn: "Net benefits must exceed adoption cost for critical mass.", descZh: "淨效益要壓過採用成本，才碰得到 critical mass。" },
  { mod: "M8", en: "Competition & Tipping", zh: "競爭與 Tipping", descEn: "Multiple equilibria make the outcome path-dependent.", descZh: "多重均衡使結果高度路徑依賴。" },
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
  { en: "Google's strategic paradox is cannibalization risk.", zh: "Google 的策略矛盾在於自我侵蝕風險。" },
  { en: "Platform takeoff begins with the chicken-and-egg problem.", zh: "平臺起飛先碰到 chicken-and-egg 問題。" },
  { en: "There are two launch families: coaxing and coordinating.", zh: "起飛策略主要分成 coaxing 與 coordinating 兩大類。" },
  { en: "Most platforms do not take off. There is no silver bullet.", zh: "大多數平臺根本起飛不了，沒有銀彈。" },
  { en: "Platform competition is different because of multiple equilibria and tipping.", zh: "平臺競爭不同，關鍵在多重均衡與 tipping。" },
  { en: "Winner-take-all requires all three conditions, not just one or two.", zh: "WTA 必須三條件都很強，不是只強一兩個。" },
  { en: "Uber China shows firms can fight as if a market is WTA even when it is not fully WTA.", zh: "Uber China 說明企業可以照 WTA 邏輯開戰，但市場本身未必真是 WTA。" },
];

const anchorMetricsEn = [
  { label: "eHarmony", val: "4,000", note: "Successful couples in follow-up focus groups, but all are y = 1." },
  { label: "eHarmony", val: "6", note: "Dimensions that many survey questions were compressed into." },
  { label: "Google", val: "$27.5B", note: "Baseline annual search profit anchor." },
  { label: "Google", val: "-$150.5B", note: "Illustrative AI-search profit if inference cost expands 10x." },
  { label: "SaferTaxi", val: "$2.2B", note: "Taxi market across the three-city setup." },
  { label: "Uber", val: "17.7%", note: "Uber's retained stake after Didi acquired Uber China." },
];
const anchorMetricsZh = [
  { label: "eHarmony", val: "4,000", note: "成功 couples 的 focus groups，但全部都是 y = 1。" },
  { label: "eHarmony", val: "6", note: "大量問卷最後被壓成六個維度。" },
  { label: "Google", val: "$27.5B", note: "整合 study file 的 baseline 年度搜尋獲利錨點。" },
  { label: "Google", val: "-$150.5B", note: "若 AI 搜尋推論成本大幅擴張時的示意獲利結果。" },
  { label: "SaferTaxi", val: "$2.2B", note: "三城市設定下的計程車市場錨點。" },
  { label: "Uber", val: "17.7%", note: "Didi 併購 Uber China 後，Uber 保留的持股。" },
];

const primerTerms = [
  { sym: "y", headEn: "The real outcome you care about.", headZh: "你真正想知道的結果。", bodyEn: "This is the outcome the platform actually cares about predicting, such as mutual reply, save, churn, or conversion.", bodyZh: "這是平臺真正想預測的結果，例如是否互相回覆、是否收藏、是否流失、是否轉換。", noteEn: "Think: the thing you ultimately wish you could observe perfectly.", noteZh: "可把它理解成：你最希望能完美觀測的那個結果。" },
  { sym: "X", headEn: "The inputs you can observe.", headZh: "你實際看得到的輸入。", bodyEn: "These are the signals available to the system, such as profile fields, clicks, dwell time, history, or context.", bodyZh: "這些是系統手上實際可觀測的訊號，例如個人資料、點擊、停留時間、歷史行為與情境資料。", noteEn: "If X is weak or missing, prediction quality is capped before modeling even starts.", noteZh: "若 X 很弱或缺漏，再好的模型也先天受限。" },
  { sym: "f(.)", headEn: "The mapping from X to a prediction.", headZh: "把 X 轉成預測的映射。", bodyEn: "This is the rule or model the machine uses, ranging from a crude heuristic to regression, trees, or deep nets.", bodyZh: "這就是機器拿來做推估的規則或模型，可以很簡單，也可以是 regression、trees、deep nets。", noteEn: "The course keeps saying this is the least important decision early on.", noteZh: "這門課一直強調，早期最不該先迷信的就是這一段。" },
  { sym: "ŷ", headEn: "The predicted version of y.", headZh: "y 的預測值。", bodyEn: "Because the real y is often unknown in the moment, the model produces y-hat as its best estimate.", bodyZh: "因為真實 y 當下常常不知道，所以模型會先產出 y-hat，作為最佳估計。", noteEn: "This is the score, probability, or rank the platform can act on now.", noteZh: "它通常就是平台當下可以據以行動的分數、機率或排序。" },
];

// ═══════════════════════════════════════════════════════════════
// MODULE SECTION DATA (full content)
// ═══════════════════════════════════════════════════════════════

const formulaCards = [
  {
    formula: "Decision Rule: if condition {ŷ} is met, take action Z",
    labelEn: "Operational rule",
    labelZh: "操作規則",
    readEn: "Read it as: once the predicted score or probability is high enough, the platform does something concrete.",
    readZh: "把它讀成：當預測分數或機率高到某個門檻，平臺就採取具體動作。",
    logicEn: "ŷ is not the action itself. It is an input into a rule. The rule converts prediction into an operational move such as recommend, rank, notify, flag, or approve.",
    logicZh: "ŷ 本身不是行動，而是行動前的依據。真正把預測轉成營運動作的，是後面的 rule，例如推薦、排序、通知、標記、核准。",
    applyEn: "Application: if predicted match quality is high enough, surface the profile. If predicted violation risk is high enough, send content to review or auto-remove it.",
    applyZh: "應用：若預測 match quality 夠高，就把檔案推上去。若預測違規風險夠高，就送審或直接下架。"
  },
  {
    formula: "ŷ = f(X)",
    labelEn: "Prediction model",
    labelZh: "預測模型",
    readEn: "Read it as: the model takes observed inputs X and produces its best estimate of the target y.",
    readZh: "把它讀成：模型把可觀測輸入 X 轉成對目標 y 的最佳估計。",
    logicEn: "X is the information you already have. f(.) is the mapping rule or model. ŷ is the estimated outcome because the true y is often not yet known at the moment of decision.",
    logicZh: "X 是你現在手上已知的資訊。f(.) 是映射規則或模型。ŷ 是估計值，因為做決策的當下，真實 y 常常還不知道。",
    applyEn: "Application: use profile fields, clicks, history, and context to estimate reply probability, conversion probability, churn risk, or match quality.",
    applyZh: "應用：把個人資料、點擊、歷史行為與情境資料放進去，估計回覆機率、轉換機率、流失風險或 match quality。"
  },
  {
    formula: "ŷ = β₀ + β₁·X₁ + β₂·X₂ + β₃·X₃",
    labelEn: "Simple linear example",
    labelZh: "線性模型例子",
    readEn: "Read it as: start from a baseline, then add or subtract weighted contributions from each observed input.",
    readZh: "把它讀成：先從一個 baseline 開始，再把每個輸入變數的加權影響加總上去。",
    logicEn: "β₀ is the intercept or starting point. Each β tells how strongly one X pushes the prediction up or down. If β is positive, that variable raises ŷ. If β is negative, it lowers ŷ. The final prediction is the sum of all weighted parts.",
    logicZh: "β₀ 是起點或基準值。每個 β 代表某個 X 對預測的推升或拉低力道。β 為正，就把 ŷ 往上推。β 為負，就把 ŷ 往下拉。最後的預測值，就是所有加權效果的總和。",
    applyEn: "Application: the professor's note uses a clean first mental model such as reply probability or listing quality being driven by weighted inputs like price fit, bedroom fit, and click rate before moving to richer models.",
    applyZh: "應用：教授的 note 把它當成第一個直觀模型，例如用價格匹配、房型匹配、點擊率等加權後，估計回覆機率或 listing quality，之後才往更複雜模型走。"
  },
  {
    formula: "ŷ = f(X_man, X_woman)",
    labelEn: "Dyad matching example",
    labelZh: "雙邊配對例子",
    readEn: "Read it as: predicted compatibility for a pair comes from both sides' observed attributes, not from just one person alone.",
    readZh: "把它讀成：一組配對的相容性，要同時由雙方的可觀測特徵來推估，不是只看單邊。",
    logicEn: "In a matching setting, the unit of prediction is the dyad. That means X may combine both profiles, both behaviors, and even interaction history between them. The model is trying to predict pair quality, not individual quality in isolation.",
    logicZh: "在 matching 情境裡，預測單位是 dyad，也就是一對人。所以 X 可能要同時放進雙方的 profile、雙方行為，甚至兩人之間的互動歷史。模型要預測的是 pair quality，不是孤立的個人品質。",
    applyEn: "Application: in eHarmony, the system tries to infer whether this man-woman pair is likely to be a good match, then decides whether to surface the profile pair as a recommendation.",
    applyZh: "應用：在 eHarmony 裡，系統要推估這組男女是否可能是好配對，接著再決定要不要把這組 profile 推成推薦對象。"
  },
  {
    formula: "Net Benefits = Stand-Alone Benefits + Network Benefits - Adopter Costs",
    labelEn: "Takeoff formula",
    labelZh: "起飛公式",
    readEn: "Read it as: adoption happens only when total benefits exceed total adoption costs.",
    readZh: "把它讀成：只有當總效益超過總採用成本時，採用才會發生。",
    logicEn: "Stand-alone benefits exist even if few others join. Network benefits rise as more participants join. Adopter costs include price, hassle, switching, learning, privacy concern, and other frictions. Early takeoff is hard because network benefits are weakest at the start.",
    logicZh: "Stand-alone benefits 在沒甚麼人加入時也存在。Network benefits 會隨更多人加入而上升。Adopter costs 包括價格、麻煩、轉換、學習成本、隱私顧慮與其他摩擦。起飛難，是因為一開始 network benefits 最弱。",
    applyEn: "Application: when diagnosing SaferTaxi or any new platform, ask which side has enough stand-alone value to move first, and whether tactics should coax one side or coordinate multiple sides together.",
    applyZh: "應用：在判讀 SaferTaxi 或任何新平臺時，要先問哪一邊有足夠 stand-alone value 能先動，以及應該用 coaxing 還是 coordinating。"
  },
  {
    formula: "wordᵢ = f(wordᵢ₋₁, …)",
    labelEn: "LLM reframing",
    labelZh: "LLM 重構",
    readEn: "Read it as: predict the next token from the tokens that came before it.",
    readZh: "把它讀成：根據前面的 token，去預測下一個 token。",
    logicEn: "This is the big training hack. Instead of manually labeling millions of examples, the next word already exists in the text. That means raw internet text becomes self-labeled training data for a highly flexible model.",
    logicZh: "這就是那個大的 training hack。你不必人工標注數百萬筆資料，因為下一個字本來就已經在文本裡。於是原始網路文字自然變成可訓練資料，拿來訓練高度彈性的模型。",
    applyEn: "Application: train one general-purpose model on massive text, then reuse it for chat, summarization, code, and other tasks rather than building one narrow model per task.",
    applyZh: "應用：先在海量文字上訓練一個通用模型，再把它拿去做 chat、摘要、程式與其他任務，而不是每個任務各做一個窄模型。"
  },
  {
    formula: "AI Performance ≈ f(Parameters, Data, Compute, Architecture)",
    labelEn: "Scaling-law frame",
    labelZh: "Scaling law 框架",
    readEn: "Read it as: frontier model performance depends jointly on model size, data, compute, and architecture.",
    readZh: "把它讀成：frontier model 的表現，是模型規模、資料、算力與架構共同決定的。",
    logicEn: "The course uses this as a rough production function for frontier AI progress. Earlier progress leaned more on scaling parameters, data, and compute. More recent progress increasingly depends on architecture, tools, synthetic data, and efficiency.",
    logicZh: "這門課把它當成 frontier AI 進步的粗略 production function。早期進步更依賴參數、資料與算力的擴張。近年則越來越依賴架構、工具、合成資料與效率。",
    applyEn: "Application: use it to interpret why LLM competition is not only about who is bigger, but also who improves architecture and capability per dollar of compute.",
    applyZh: "應用：它幫你判讀為何 LLM 競爭不只是誰比較大，還包括誰能在每一美元算力上做出更好的架構與能力。"
  },
];

const sectionScanData = {
  "module-5": {
    memorize: [
      { en: "Prediction is constrained first by observability, not by modeling sophistication.", zh: "預測的第一限制是可觀測性，不是模型多高級。" },
      { en: "Design order: decision Z → target y → inputs X → model f(.) → prediction ŷ → action.", zh: "設計順序是：決策 Z → 目標 y → 輸入 X → 模型 f(.) → 預測 ŷ → 行動。" },
      { en: "A good y should be observable, actionable, timely, and hard to game.", zh: "好的 y 要可觀測、可行動、夠即時、不容易被操弄。" },
    ],
    judge: [
      { en: "If you observe y, prefer supervised methods. If you do not observe y, unsupervised can only organize X.", zh: "觀測得到 y，就優先想 supervised。觀測不到 y，unsupervised 只能整理 X。" },
      { en: "Choosing f(.) is usually less important early on than choosing the right decision and the right y.", zh: "早期最不重要的，往往反而是 f(.)；更重要的是先把決策與 y 選對。" },
      { en: "A real prediction factory needs live use, train/test refinement, and feedback. Missing feedback means weak learning.", zh: "真正的 prediction factory 要同時有 live use、train/test refinement、以及 feedback。沒有 feedback，學習就弱。" },
    ],
    evidence: [
      { en: "Data inventory asks about source, ownership/access, unit of observation, variables, structure, sampling, coverage, and time form.", zh: "Data inventory 要問 source、ownership/access、unit of observation、variables、structure、sampling、coverage、以及時間形式。" },
      { en: "eHarmony's 4,000 successful couples are all y = 1, so that sample cannot estimate a supervised match model by itself.", zh: "eHarmony 的 4,000 successful couples 全部都是 y = 1，所以那個樣本本身無法估 supervised 配對模型。" },
      { en: "Professor's slides show eHarmony collapsed a large survey into six dimensions, then mechanically scored similarity, with little feedback for tuning.", zh: "教授投影片顯示 eHarmony 把大量問卷壓成六個維度，再機械式計算相似度，而且幾乎沒有 feedback 可調整。" },
    ],
  },
  "module-6": {
    memorize: [
      { en: "Weak AI means purpose-built models for specific tasks. LLMs move toward one highly flexible general-purpose super f(.).", zh: "弱 AI 是針對單一任務設計的模型。LLM 則走向一個高度彈性的通用 super f(.)。" },
      { en: "LLMs are still prediction machines. Prompt plus context becomes X, and the model predicts the next token or output sequence.", zh: "LLM 仍然是 prediction machine。Prompt 加 context 變成 X，模型去預測下一個 token 或輸出序列。" },
      { en: "Training is fixed cost. Inference is ongoing variable cost. LLM marginal cost falls, but it does not go to zero.", zh: "Training 是固定成本，Inference 是持續的變動成本。LLM 的邊際成本會下降，但不會趨近零。" },
    ],
    judge: [
      { en: "Keep the contrast straight: traditional analysis emphasizes prediction and understanding; modern ML often emphasizes empirical prediction only.", zh: "要分清楚：傳統分析同時重視 prediction 與 understanding；現代 ML 常更偏 empirical prediction。" },
      { en: "Prefer labeled data when available. Unsupervised often sounds richer than it is, because it usually means you do not observe y.", zh: "有 labeled data 時優先使用。Unsupervised 常聽起來比實際更厲害，因為很多時候只是你沒有 y。" },
      { en: "Scaling mattered most in 2012–2023. Since 2023, more gains come from architecture, tools, synthetic data, and efficiency.", zh: "2012 到 2023 最重要的是 scaling；2023 之後，更多進步來自 architecture、tools、synthetic data 與效率。" },
    ],
    evidence: [
      { en: "Module 6 states the next-word reframing explicitly: wordᵢ = f(wordᵢ₋₁, …). That converts unlabeled text into labeled training data.", zh: "Module 6 明講下一詞重構：wordᵢ = f(wordᵢ₋₁, …)。這把未標註文字轉成可訓練的資料。" },
      { en: "Google's slide deck frames the paradox with numbers: baseline search profit about $27.5B versus an illustrative AI-search scenario of about -$150.5B when inference expands sharply.", zh: "Google 投影片用數字呈現其矛盾：baseline search 利潤約 $27.5B，但若 AI 搜尋推論大幅擴張，示意情境可掉到約 -$150.5B。" },
      { en: "The agent extension adds Observe → Think → Act loops, MCP as plumbing, and a thinner app layer in an agent era.", zh: "Agent 延伸補上 Observe → Think → Act 迴路、MCP 這類 plumbing，以及 agent 時代更薄的 app layer。" },
    ],
  },
  "module-7": {
    memorize: [
      { en: "Net Benefits = Stand-Alone Benefits + Network Benefits - Adopter Costs.", zh: "Net Benefits = Stand-Alone Benefits + Network Benefits - Adopter Costs。" },
      { en: "Early adopters face the weakest value and the highest relative cost. That is the chicken-and-egg problem.", zh: "最早採用者面對的是最低價值、相對最高成本，這就是 chicken-and-egg 問題。" },
      { en: "Most platforms do not take off. There is no silver bullet.", zh: "大多數平臺都起飛不了，沒有銀彈。" },
    ],
    judge: [
      { en: "Always write the sides first, then write critical mass as numbers. Otherwise takeoff talk stays vague.", zh: "一定要先寫清楚 sides，再把 critical mass 寫成數字，不然 takeoff 討論會一直很空。" },
      { en: "Use coaxing when one side can move on stand-alone value. Use coordinating when adoption must happen in clusters or at the same time.", zh: "某一邊能靠 stand-alone value 先動，就偏向 coaxing；必須一起動，就偏向 coordinating。" },
      { en: "A clever narrow launch can beat brute-force subsidy. Think like a rocket designer, not just a promoter.", zh: "聰明的窄入口常比硬砸補貼更有效。要像設計火箭，不只是做宣傳。" },
    ],
    evidence: [
      { en: "The 2×2 adoption game uses costs of -1 and benefits of 2 if the other side adopts, creating both no-adoption and adoption equilibria.", zh: "2×2 採用賽局設定成本為 -1、他人採用時效益為 2，所以同時存在不採用與採用均衡。" },
      { en: "SaferTaxi's three-city setup covers roughly 30 million people and about a $2.2B taxi market, but smartphone penetration was only 9% to 19%.", zh: "SaferTaxi 的三城市合計約 3,000 萬人口、約 $2.2B 計程車市場，但智慧型手機滲透率只有 9% 到 19%。" },
      { en: "The slide deck shows current spending around $1M per year, only 46 cabs at one point, and revenue needing to grow about 10× just to break even.", zh: "投影片顯示當時年支出約 $1M、一度只有 46 輛車，而且營收約要再長 10 倍才可能打平。" },
    ],
  },
  "module-8": {
    memorize: [
      { en: "Platform competition can produce multiple equilibria and tipping, not one closed-form outcome.", zh: "平臺競爭可能出現多重均衡與 tipping，不是只有單一路徑結果。" },
      { en: "Winner-take-all requires all three conditions together: strong scale effects, little differentiation room, and high switching or multi-homing costs.", zh: "Winner-take-all 必須三條件一起成立：強規模效應、低差異化空間、高 switching 或 multi-homing costs。" },
      { en: "When WTA is plausible, firms compete for the market, not just in the market.", zh: "當 WTA 有可能成立時，企業是在爭奪整個市場，不只是在市場裡競爭。" },
    ],
    judge: [
      { en: "Do not label a market WTA just because the subsidy war is intense. Check the three conditions one by one.", zh: "不要因為補貼戰打得兇，就直接把市場判成 WTA。三個條件要逐一檢查。" },
      { en: "Leaders reinforce WTA by deepening scale, compressing differentiation, and raising switching costs. Followers attack with niches and lower switching barriers.", zh: "Leader 會透過強化規模、壓縮差異化、提高轉換成本來加深 WTA；Follower 則會找利基並降低轉換門檻。" },
      { en: "False-WTA thinking produces overinvestment and wars of attrition. That is a core Uber China lesson.", zh: "把非 WTA 市場誤判成 WTA，常會導致過度投資與消耗戰。這正是 Uber China 的核心教訓。" },
    ],
    evidence: [
      { en: "The competing-platforms game has three equilibria: no adoption, Platform Alpha wins, or Platform Beta wins.", zh: "競爭平臺賽局有三個均衡：不採用、Platform Alpha 勝、或 Platform Beta 勝。" },
      { en: "Professor's Uber China slides say Uber and Didi competed as if the market were WTA, but only 2 of the 3 WTA conditions really held because switching costs were low.", zh: "教授的 Uber China 投影片直接說，Uber 與 Didi 是照 WTA 打，但真正成立的只有 3 個條件中的 2 個，因為 switching costs 很低。" },
      { en: "End-state anchor: Didi at about $35B valuation, Uber retaining 17.7%, implying a roughly $6.2B payoff on exit.", zh: "結局錨點是 Didi 約 $35B 估值，Uber 保留 17.7%，離場 payoff 約 $6.2B。" },
    ],
  },
};

const sectionLensData = {
  "module-5": {
    titleEn: "Quick Diagnostic", titleZh: "快速診斷",
    items: [
      { hEn: "Ask first", hZh: "先問", pEn: "What decision is being automated?", pZh: "到底要自動化哪個決策？" },
      { hEn: "Then ask", hZh: "再問", pEn: "What is the best observable proxy for y?", pZh: "最好的可觀測 y 代理是甚麼？" },
      { hEn: "Core split", hZh: "核心分流", pEn: "Labeled data push toward supervised methods. Missing y pushes toward unsupervised grouping.", pZh: "有標籤就往 supervised，沒有 y 就只能做 unsupervised 分群。" },
      { hEn: "Case clue", hZh: "案例訊號", pEn: "Rich survey data do not compensate for weak behavioral feedback.", pZh: "問卷再豐富，也補不了行為回饋太弱的問題。" },
    ]
  },
  "module-6": {
    titleEn: "Weak AI vs. LLMs", titleZh: "弱 AI 與 LLM 對照",
    tableEn: `<tr><td>Problem setup</td><td>One task at a time</td><td>One flexible model across many tasks</td></tr>
<tr><td>Training labels</td><td>Usually human-labeled</td><td>Next-token prediction lets text self-label</td></tr>
<tr><td>Output form</td><td>Score, class, ranking</td><td>Text, code, image, audio, structured output</td></tr>
<tr><td>Economic wrinkle</td><td>Often low marginal compute</td><td>Inference cost remains real</td></tr>`,
    tableZh: `<tr><td>問題設定</td><td>一次做一個任務</td><td>同一個彈性模型做很多任務</td></tr>
<tr><td>訓練標籤</td><td>多半靠人標註</td><td>下一個 token 預測讓文字自我標註</td></tr>
<tr><td>輸出形式</td><td>分數、分類、排序</td><td>文字、程式、圖片、音訊、結構化輸出</td></tr>
<tr><td>經濟學差異</td><td>邊際算力成本常較低</td><td>Inference cost 持續存在</td></tr>`,
  },
  "module-7": {
    titleEn: "Takeoff Screen", titleZh: "起飛判斷",
    items: [
      { hEn: "Step 1", hZh: "Step 1", pEn: "Specify the sides. No side definition, no takeoff diagnosis.", pZh: "先定義 sides，沒有 sides 就沒有起飛診斷。" },
      { hEn: "Step 2", hZh: "Step 2", pEn: "Write down critical mass by side in actual numbers.", pZh: "把每一邊的 critical mass 寫成實際數字。" },
      { hEn: "Step 3", hZh: "Step 3", pEn: "Choose between coaxing and coordinating tactics.", pZh: "在 coaxing 與 coordinating 戰術間做選擇。" },
      { hEn: "Red flag", hZh: "紅旗", pEn: "A good value proposition may still fail because the economics of scale never lock in.", pZh: "價值主張再好，也可能因為規模經濟鎖不住而起飛失敗。" },
    ]
  },
  "module-8": {
    titleEn: "WTA Three-Condition Test", titleZh: "WTA 三條件測試",
    conditions: [
      { label: "Condition 1", en: "Strong increasing returns to scale.", zh: "規模增加報酬要夠強。", badge: "yes" },
      { label: "Condition 2", en: "Little room for differentiation.", zh: "差異化空間要夠小。", badge: "yes" },
      { label: "Condition 3", en: "High switching or multi-homing cost.", zh: "轉換成本或 multi-homing cost 要夠高。", badge: "check" },
    ],
    noteEn: "Use all three together. Two strong conditions are not enough for a clean winner-take-all conclusion.",
    noteZh: "三條件要一起看。只有兩條強，還不夠把市場判成乾淨的 winner-take-all。",
  }
};

// Module content blocks (full HTML preserved from v2 + source doc)
const mod5Blocks = [
  {
    tEn: "What this module wants from you", tZh: "這個模組真正要你做甚麼",
    enH: `<ul><li>Inventory the available data before romanticizing the model.</li><li>Define the automated decision and the target <strong>y</strong> before choosing <strong>f(.)</strong>.</li><li>Diagnose whether a platform has a real learning loop rather than mere data theater.</li><li>Use eHarmony and Grow to compare weak feedback systems, stronger feedback systems, and different human-machine allocations.</li></ul>`,
    zhH: `<ul><li>先盤點資料，再談模型，不要先浪漫化演算法。</li><li>先定義自動化決策與目標 <strong>y</strong>，再選 <strong>f(.)</strong>。</li><li>判斷平臺是否真的有學習迴路，而不是只有資料表演。</li><li>用 eHarmony 與 Grow 比較弱回饋系統、強回饋系統，以及不同的人機分工配置。</li></ul>`,
  },
  {
    tEn: "Data inventory and algorithm design order", tZh: "Data Inventory 與演算法設計順序",
    enH: `<p>Data inventory is not paperwork. It defines both the constraint set and the opportunity set. Every source should be characterized by source, ownership and access, unit of observation, variables actually observed, whether the data are structured or unstructured, coverage and missingness, sampling conditions, and whether the asset is cross-sectional or time-series.</p><div class="eq">Decision first &rarr; y &rarr; X &rarr; f(.)</div><div class="g4"><div class="mc"><h5>Step 1</h5><p>What decision should be automated?</p></div><div class="mc"><h5>Step 2</h5><p>What outcome y should be predicted?</p></div><div class="mc"><h5>Step 3</h5><p>Which inputs X are actually available?</p></div><div class="mc"><h5>Step 4</h5><p>Only then, choose the model f(.).</p></div></div><h5>Good targets for y</h5><ul><li><strong>Observable:</strong> you can measure it reliably.</li><li><strong>Actionable:</strong> moving it connects to platform goals.</li><li><strong>Timely:</strong> the signal returns fast enough to support learning.</li><li><strong>Hard to game:</strong> otherwise the platform amplifies the wrong behavior.</li></ul><h5>Model ladder</h5><p>Heuristic &rarr; Linear or logistic &rarr; Trees and ensembles &rarr; Deep nets. Each more complex model must beat the simplest baseline.</p>`,
    zhH: `<p>Data inventory 不是形式作業，而是在決定後面能做甚麼。每個資料來源都要問清楚：來源、所有權與存取、觀察單位、實際可觀測變數、結構化或非結構化、覆蓋與缺漏、樣本與選取條件，以及橫斷面或時間序列。</p><div class="eq">先決策 &rarr; y &rarr; X &rarr; 最後才選 f(.)</div><div class="g4"><div class="mc"><h5>Step 1</h5><p>要自動化甚麼決策？</p></div><div class="mc"><h5>Step 2</h5><p>要預測甚麼結果 y？</p></div><div class="mc"><h5>Step 3</h5><p>實際可用的 X 有哪些？</p></div><div class="mc"><h5>Step 4</h5><p>最後才選模型 f(.)。</p></div></div><h5>好的 y 要符合四條件</h5><ul><li><strong>可觀測：</strong>要能穩定量測。</li><li><strong>可行動：</strong>推動它時，真的會連到平臺目標。</li><li><strong>夠即時：</strong>訊號要回來得夠快，才能支撐學習。</li><li><strong>不易操弄：</strong>否則平臺會放大錯誤行為。</li></ul><h5>模型複雜度階梯</h5><p>Heuristic &rarr; 線性或邏輯斯模型 &rarr; Trees 與 ensembles &rarr; Deep nets。每往上一層，都必須先打贏最簡單的基準線。</p>`,
  },
  {
    tEn: "Supervised, unsupervised, and the broad ML contrast", tZh: "Supervised、Unsupervised 與 ML 方法對比",
    enH: `<div class="g2"><div class="mc"><h5>Supervised</h5><p>You observe <strong>y</strong> and use <strong>X</strong> to predict it. Example: probability of happiness as a function of country, wealth, hobbies, and other variables.</p></div><div class="mc"><h5>Unsupervised</h5><p>You do not observe <strong>y</strong>, so you can only explore relations inside <strong>X</strong>. Example: viewer categories inferred from Netflix-style watching patterns.</p></div></div><p>The lecture's blunt warning is worth memorizing: unsupervised sounds sophisticated, but often it simply means you do not have labels.</p><p>Supplementary note from the Google slides: statistics, econometrics, and data science each carry their own language. "Semi-supervised" means using labeled data to model unlabeled data. "Machine-supervised" represents the real conceptual leap: the machine labels the data itself. This is exactly the bridge from Module 5 weak AI to Module 6 LLMs.</p><h5>Method progression</h5><ul><li><strong>Expert systems:</strong> external expert knowledge is hard-coded into f(.).</li><li><strong>Statistical regression:</strong> humans specify f(.) through theory, emphasizing prediction and understanding together.</li><li><strong>Old data mining:</strong> weak theory, high risk of naive overfitting.</li><li><strong>Machine learning:</strong> the machine iteratively learns f(.), usually strong on prediction and weak on causal explanation, assuming the underlying data-generating process has not changed.</li></ul><p>ML's big leap: you do not need to truly understand y to predict y.</p><p>The broader course contrast is traditional analysis as theory plus statistical inference (prediction AND understanding), versus modern ML as an empirical prediction engine with high-dimensional data, often zero causal power, assuming the world stays stable.</p>`,
    zhH: `<div class="g2"><div class="mc"><h5>Supervised</h5><p>你觀測得到 <strong>y</strong>，用 <strong>X</strong> 去預測它。例子是用國家、財富、興趣等變數預測快樂機率。</p></div><div class="mc"><h5>Unsupervised</h5><p>你觀測不到 <strong>y</strong>，因此只能在 <strong>X</strong> 裡探索關係。例子是像 Netflix 那樣，從觀看行為推估觀眾類型。</p></div></div><p>課上最直接的提醒值得背下來：unsupervised 聽起來很高級，但很多時候只是因為你沒有標籤可學。</p><p>補充（Google 投影片）：statistics、econometrics、data science 都有各自語言。「半監督式」是用有標籤資料建模無標籤資料。「機器監督式（machine-supervised）」才代表真正概念突破：機器自行標注資料。這正是從 Module 5 弱 AI 過渡到 Module 6 LLM 的橋梁。</p><h5>方法演進</h5><ul><li><strong>Expert systems：</strong>把外部專家知識硬編進 f(.)。</li><li><strong>Statistical regression：</strong>人先依理論指定 f(.)，強調預測加理解。</li><li><strong>Old data mining：</strong>理論弱，容易天真地過擬合。</li><li><strong>Machine learning：</strong>讓機器迭代學出 f(.)，預測強，因果解釋弱，前提是底層資料生成過程沒變。</li></ul><p>ML 的大突破：不用真正了解 y，就能預測 y。</p><p>整體對比是：傳統分析強調 theory 加 statistical inference（prediction AND understanding），現代 ML 更像高維資料上的 empirical prediction engine，常零因果力，假設世界沒變。</p>`,
  },
  {
    tEn: "Prediction factory loop", tZh: "Prediction Factory 迴路",
    enH: `<div class="g2"><div class="mc"><h5>Live use (horizontal)</h5><p>New inputs X arrive, the model runs, predicts y-hat, and the decision rule triggers a feature or function.</p></div><div class="mc"><h5>Training and refinement (vertical)</h5><p>Historical {y, X} data are split into training and test sets, then the model is tuned and revalidated.</p></div><div class="mc"><h5>Feedback (the critical link)</h5><p>Observable outcomes return to the database and let the system learn over time. Without feedback, there is no continuous learning.</p></div><div class="mc"><h5>Managerial implication</h5><p>Data is not oil burned once. It is a cycle that generates, corrects, and compounds. The organization needs engineering, monitoring, governance, experimentation, and clear human-machine boundaries.</p></div></div><p>One reason platforms are structurally different is that the marginal cost of generating an additional prediction is often low once the system is built, relative to manual decision-making.</p>`,
    zhH: `<div class="g2"><div class="mc"><h5>Live use（橫向）</h5><p>新的 X 進來，模型跑出 y-hat，接著由決策規則觸發功能或動作。</p></div><div class="mc"><h5>Training and refinement（縱向）</h5><p>用歷史 {y, X} 分成 training 與 test sets 來訓練與測試模型，再進一步精煉與驗證。</p></div><div class="mc"><h5>Feedback（關鍵連結）</h5><p>可觀測結果回到資料庫，系統才有機會持續學習。沒有 feedback，就沒有持續學習。</p></div><div class="mc"><h5>管理意涵</h5><p>資料不是燒一次就完的油，而是能持續生成、持續校正的循環。組織面還要補上工程、監控、治理、實驗設計，以及清楚的人機邊界。</p></div></div><p>平臺之所以結構上不同，其中一點在於：系統建好之後，額外生成一個預測的邊際成本，通常比人工決策低很多。</p>`,
  },
  {
    tEn: "eHarmony", tZh: "eHarmony",
    enH: `<p>This is the canonical survey-rich but feedback-poor case.</p><div class="tbl-wrap"><table><thead><tr><th>Data source</th><th>What it contains</th><th>Coverage and unit</th><th>Time form</th></tr></thead><tbody><tr><td>Questionnaire</td><td>Personality, preferences, demographics, psychographics, location, lifestyle.</td><td>Everyone on the platform, including attempted sign-ups. Individual-level.</td><td>Cross-sectional snapshot.</td></tr><tr><td>Follow-up focus groups</td><td>Rich relationship-dynamics data.</td><td>4,000 successful couples who chose to participate. Dyad-level.</td><td>Cross-sectional snapshot.</td></tr><tr><td>Platform clickstream</td><td>Sign-up, renewal, cancellation, sign-ins, scrolling, time spent, clicks, communications.</td><td>Mostly active users. Individual and dyad.</td><td>Time series.</td></tr><tr><td>Other possible sources</td><td>Census, academic studies, and other enrichment data.</td><td>External, varying unit.</td><td>Variable.</td></tr></tbody></table></div><p>The files show two questionnaire counts, 140 questions and 300 questions compressed to six dimensions. Do not force a false certainty on the count. The stable conclusion is that many survey items were compressed into six factors.</p><h5>Professor-defined six factors</h5><ul><li>Agreeableness.</li><li>Preference for closeness with a partner.</li><li>Degree of sexual and romantic passion.</li><li>Level of extroversion and openness.</li><li>How important spirituality is.</li><li>How optimistic and happy each one is.</li></ul><p>The app-facing labels differ (Altruism, Emotional Intimacy, Athleticism, Relationship Values, Intellect), but for the exam, follow the professor's text version above.</p><h5>Operational weakness</h5><p><strong>No data tracking, no feedback to model tuning, and very little scope for learning.</strong> That is the line to remember.</p><h5>Method traps</h5><ul><li><strong>Method C fails:</strong> 4,000 successful couples means y equals 1 for everyone. A supervised model cannot be estimated when you have no negative outcomes.</li><li><strong>Method D is a hard-coded score:</strong> the developer assembles the formula themselves. f(.) here is not data-driven, but it may serve as a starting point.</li></ul><h5>Two viable paths the professor identifies</h5><ul><li><strong>Unsupervised:</strong> do not model outcomes. Group by similarity and map survey responses into six dimensions of distance.</li><li><strong>Supervised:</strong> use clickstream to observe outcomes and map those outcomes back to traits and behavior.</li></ul><p>eHarmony could have used both types.</p><h5>eHarmony versus Tinder</h5><ul><li>eHarmony: rich survey, proprietary compatibility framing, long-term relationship orientation, limited real-time feedback, slow evolution.</li><li>Tinder: simpler clickstream, ELO-style ranking logic, strong behavioral signals, systematic feedback, faster adaptation.</li></ul><p><strong>Bottom line from the slides:</strong> a simple clickstream with systematic feedback can often outpace richer but static data assets.</p><p><strong>The one line to memorize for eHarmony:</strong> one-time survey, six dimensions, no data tracking, no feedback, little scope for learning.</p>`,
    zhH: `<p>這是最典型的問卷很豐富，但 feedback 很弱的案例。</p><div class="tbl-wrap"><table><thead><tr><th>資料來源</th><th>內容</th><th>覆蓋與觀察單位</th><th>時間形式</th></tr></thead><tbody><tr><td>Questionnaire</td><td>人格、偏好、人口資料、心理特徵、位置、生活型態。</td><td>平臺上所有人，含曾嘗試註冊者。個體層級。</td><td>橫斷面快照。</td></tr><tr><td>Follow-up Focus Groups</td><td>關係動態的豐富資料。</td><td>4,000 對自願參加的 successful couples。配對層級。</td><td>橫斷面快照。</td></tr><tr><td>Platform Clickstream</td><td>註冊、續約、取消、登入、滑動、停留時間、點擊與溝通。</td><td>以活躍用戶為主。個人與配對。</td><td>時間序列。</td></tr><tr><td>其他可能來源</td><td>人口普查、學術研究與其他補充資料。</td><td>外部，觀察單位不固定。</td><td>不固定。</td></tr></tbody></table></div><p>檔案中同時出現 140 題與 300 題壓成 6 維度兩種寫法。不要硬選一個確定值。真正穩的是：大量 survey 問題最後被壓縮成 6 個因素。</p><h5>教授定義的 6 個因素</h5><ul><li>Agreeableness（和善程度）。</li><li>Preference for closeness with a partner（親密偏好）。</li><li>Degree of sexual and romantic passion（性與浪漫熱情）。</li><li>Level of extroversion and openness（外向與開放）。</li><li>How important spirituality is（靈性重要性）。</li><li>How optimistic and happy each one is（樂觀與快樂）。</li></ul><p>App 端消費者看到的標籤不同（Altruism, Emotional Intimacy, Athleticism, Relationship Values, Intellect），但考試以教授文字版為準。</p><h5>營運弱點</h5><p><strong>No data tracking、no feedback to model tuning、very little scope for learning。</strong> 這句要直接背下來。</p><h5>方法陷阱</h5><ul><li><strong>Method C 行不通：</strong>4,000 successful couples 代表每個 y 都等於 1。若沒有負向結果，就無法估計 supervised model。</li><li><strong>Method D 是 hard-code score：</strong>開發者自行拼湊公式。f(.) 在此不是資料驅動，但也許是個起步方式。</li></ul><h5>教授指出理論上可行的兩條路</h5><ul><li><strong>Unsupervised：</strong>不建模結果，而是把 survey 映射成 6 維距離，再依相似性分群。</li><li><strong>Supervised：</strong>用 clickstream 觀察結果，再把結果回映到個人特徵與行為。</li></ul><p>eHarmony could have used both types.</p><h5>eHarmony 對比 Tinder</h5><ul><li>eHarmony：問卷資料豐富、相容性演算法專有、偏長期關係，但即時回饋有限，演進緩慢。</li><li>Tinder：clickstream 較簡單，但行為訊號強，且有系統性 feedback，因此適應更快。</li></ul><p><strong>投影片結論：</strong>有系統性 feedback 的簡單 clickstream，常常能勝過更豐富但靜態的資料來源。</p><p><strong>eHarmony 最該背的一句：</strong>一次性 survey，6 維度，no data tracking，no feedback，little scope for learning。</p>`,
  },
  {
    tEn: "Grow (optional)", tZh: "Grow（Optional）",
    enH: `<p>The point of Grow is not HR detail. The point is that the same prediction logic can support very different allocations of responsibility between humans and machines.</p><h5>Data assets (seven items)</h5><ul><li>Peer 360-degree behavioral ratings.</li><li>Self competency ratings.</li><li>Personality IAT behavioral data.</li><li>Evaluator bias calibration data.</li><li>Social network graph data.</li><li>Company historical hiring and performance data.</li><li>Recruitment process outcome data.</li></ul><p>The logic is roughly y-hat equals weighted X. It can be built as an unsupervised 25-dimension mapping or as a supervised model with feedback.</p><div class="g2"><div class="mc"><h5>Septeni: AI as Substitute</h5><p>Replaces group interviews, expands the pool, and pushes toward the highest automation.</p></div><div class="mc"><h5>ANA: AI as Screen-In Tool</h5><p>Finds needles in the haystack, adds confidence scores, but keeps humans central.</p></div><div class="mc"><h5>Mitsubishi Corp: AI as Network Expander</h5><p>Uses the social graph of ideal candidates to widen the pipeline while human judgment remains dominant.</p></div><div class="mc"><h5>Managerial prompts</h5><p>Which use case scales best? Where does bias risk rise the most? Which one creates the most company value?</p></div></div>`,
    zhH: `<p>Grow 的價值不在 HR 細節，而在於：同一套 prediction logic 可以支援非常不同的人機分工配置。</p><h5>資料資產（七項）</h5><ul><li>Peer 360-degree behavioral ratings。</li><li>Self competency ratings。</li><li>Personality IAT behavioral data。</li><li>Evaluator bias calibration data。</li><li>Social network graph data。</li><li>Company historical hiring 與 performance data。</li><li>Recruitment process outcome data。</li></ul><p>模型邏輯可視為 y-hat 近似於加權後的 X。既可走 25 維 mapping 的非監督式，也可走有 feedback 的監督式版本。</p><div class="g2"><div class="mc"><h5>Septeni：AI as Substitute</h5><p>取代團體面試、擴大候選池，並朝最高自動化前進。</p></div><div class="mc"><h5>ANA：AI as Screen-In Tool</h5><p>找大海裡的針，加入信心分數，但人類仍在核心位置。</p></div><div class="mc"><h5>Mitsubishi Corp：AI as Network Expander</h5><p>用理想候選人的社交圖譜擴大管道，而人類判斷仍占主導。</p></div><div class="mc"><h5>管理追問</h5><p>哪個最 scalable？哪個偏誤風險最大？哪個對公司價值最大？</p></div></div>`,
  },
];

const mod6Blocks = [
  {
    tEn: "Weak AI versus general AI", tZh: "弱 AI 對比通用 AI",
    enH: `<p>Weak, narrow, or specialized AI means purpose-built models for specific tasks. Humans choose the target, the training data, and the decision rule. General or strong AI refers to capabilities that can transfer across many tasks and contexts. LLMs are not automatically AGI, but they are a meaningful step toward more general machine intelligence. The boundary is still debated.</p><p>Keep the hierarchy straight: AI &rarr; Machine Learning &rarr; Neural Networks &rarr; Transformer &rarr; Foundation Models &rarr; LLMs and other generative models.</p>`,
    zhH: `<p>弱、窄、專用 AI 指的是針對單一任務打造的模型。人類先指定 target、training data 與 decision rule。通用或強 AI 則是能力可跨任務與情境遷移。LLM 不等於 AGI，但確實是往更通用機器智慧前進的一步。邊界目前仍有爭論。</p><p>層級要分清楚：AI &rarr; Machine Learning &rarr; Neural Networks &rarr; Transformer &rarr; Foundation Models &rarr; LLMs 與其他生成式模型。</p>`,
  },
  {
    tEn: "Four core intuitions behind LLMs", tZh: "LLM 的四個核心直覺",
    enH: `<div class="g2"><div class="mc"><h5>1. Reframing the labeling problem</h5><p>Instead of manually labeling examples, the model predicts the next token: word_i = f(word_{i-1}, ...). Massive unlabeled text becomes self-labeled training data. This is the big "hack."</p></div><div class="mc"><h5>2. Tokens and embeddings</h5><p>Words are broken into tokens and represented as high-dimensional vectors. Nearby points in vector space reflect similar context and meaning.</p></div><div class="mc"><h5>3. Neural network as f(.)</h5><p>The model learns a rich, general, flexible statistical mapping between inputs and outputs by adjusting huge numbers of parameters.</p></div><div class="mc"><h5>4. Transformer with attention</h5><p>Attention lets the system weigh long-range relationships across the sequence. Trained at sufficient scale, the model becomes a compressed statistical representation of the language it has seen.</p></div></div><p>LLMs still fit the broad prediction-machine logic: y = f(X), but now X is prompt plus context, and f(.) is a general-purpose "super" f(.) rather than one task, one model.</p>`,
    zhH: `<div class="g2"><div class="mc"><h5>1. 重構標註問題</h5><p>不再靠人工一筆一筆標註，改成預測下一個 token：word_i = f(word_{i-1}, ...)。海量未標注文字因此自動變成有標籤資料。這就是那個大 "hack"。</p></div><div class="mc"><h5>2. Tokens 與 Embeddings</h5><p>文字先拆成 tokens，再用高維向量表示。高維空間中彼此接近，代表語境與語意較相近。</p></div><div class="mc"><h5>3. Neural Network 作為 f(.)</h5><p>模型透過大量參數調整，學出輸入與輸出之間高度豐富、通用、靈活的統計映射。</p></div><div class="mc"><h5>4. 具 attention 的 Transformer</h5><p>Attention 能抓住序列中的長距離關係並擴張規模。訓練到夠大，模型變成所見語言的壓縮統計表徵。</p></div></div><p>LLM 仍符合廣義 prediction machine 的架構：y = f(X)，只是此時 X 變成 prompt 加 context，而 f(.) 變成通用 "super" f(.)，不再是一個任務一個模型。</p>`,
  },
  {
    tEn: "Terms and scaling logic", tZh: "術語與 scaling 邏輯",
    enH: `<h5>Terms worth memorizing</h5><ul><li><strong>Training:</strong> learning model parameters from data, often as a large one-off compute event.</li><li><strong>Inference:</strong> running the trained model on new inputs. This is the ongoing cost side.</li><li><strong>Transformer:</strong> attention-based architecture.</li><li><strong>LLM:</strong> a large transformer trained on text.</li><li><strong>Foundation model:</strong> a general-purpose pretrained model that can support many downstream tasks.</li><li><strong>Generative AI:</strong> AI systems that generate new content.</li><li><strong>Embedding:</strong> a numeric vector representation in which distance reflects semantic similarity.</li><li><strong>GPU:</strong> the key hardware for neural network training and inference.</li><li><strong>Frontier model:</strong> the most advanced model tier available at a given point in time.</li></ul><h5>Scaling laws</h5><p>AI performance is presented as a function of parameters, data, compute, and architecture.</p><ul><li><strong>Scaling era, roughly 2012 to 2023:</strong> more parameters, more data, more compute drove improvement.</li><li><strong>Systems era, 2023 onward:</strong> more gains now come from architecture, tools, synthetic data, orchestration, and efficiency.</li><li><strong>Emerging frontier:</strong> possibly shaped by energy infrastructure, closed-loop learning, and physical-system integration.</li></ul><h5>Cost economics</h5><p>Traditional digital products often have high fixed cost and near-zero marginal cost. LLM systems also have huge fixed cost, but they add meaningful inference cost for every prompt. The marginal cost does not approach zero. Anchor ranges: roughly $0.005 to $0.03 per thousand input tokens, $0.015 to $0.12 per thousand output tokens. Costs are declining year over year, but the structure is different from traditional digital products.</p>`,
    zhH: `<h5>必背術語</h5><ul><li><strong>Training：</strong>從資料中學模型參數，通常是一次性的大型算力事件。</li><li><strong>Inference：</strong>用已訓練好的模型跑新輸入，這是持續發生的成本面。</li><li><strong>Transformer：</strong>基於 attention 的架構。</li><li><strong>LLM：</strong>在文字上訓練的大型 transformer。</li><li><strong>Foundation Model：</strong>可支援多種下游任務的通用預訓練模型。</li><li><strong>Generative AI：</strong>生成新內容的 AI 系統。</li><li><strong>Embedding：</strong>一種數值向量表示法，距離反映語意相近程度。</li><li><strong>GPU：</strong>神經網路訓練與推論的關鍵硬體。</li><li><strong>Frontier Model：</strong>某個時間點最先進的模型層級。</li></ul><h5>Scaling Laws</h5><p>課內整理把 AI 表現概括成參數、資料、算力與架構的函數。</p><ul><li><strong>Scaling era，約 2012 到 2023：</strong>更多參數、更多資料、更多算力主導進步。</li><li><strong>Systems era，2023 之後：</strong>越來越多進步來自架構、工具、合成資料、編排與效率。</li><li><strong>Emerging frontier：</strong>可能更受能源基礎設施、閉環學習與物理系統整合影響。</li></ul><h5>成本經濟學</h5><p>傳統數位產品通常是高固定成本、近零邊際成本。LLM 系統同樣有巨大固定成本，但每個 prompt 還要額外支付真實的 inference cost。邊際成本不會趨近零。錨點範圍約為每千輸入記號 0.005 到 0.03 美元，每千輸出記號 0.015 到 0.12 美元。成本逐年下降，但結構不同於傳統數位產品。</p>`,
  },
  {
    tEn: "Google", tZh: "Google",
    enH: `<p>Google's paradox: it helped build the modern GenAI stack (2017 Transformer paper, largest training datasets, custom TPU chips, tens of thousands of AI researchers, 90%+ search share, billions of users), yet GenAI can undermine the economics of the search business it already dominates.</p><div class="tbl-wrap"><table><thead><tr><th>Unit economics anchor</th><th>Value</th></tr></thead><tbody><tr><td>Revenue per search</td><td>$0.01610</td></tr><tr><td>Index search cost</td><td>$0.01060</td></tr><tr><td>AI inference cost</td><td>$0.00356</td></tr><tr><td>Searches per year</td><td>5 trillion</td></tr><tr><td>Users</td><td>6.25 billion</td></tr></tbody></table></div><div class="g2"><div class="scn good"><h5>Scenario 1: Baseline, no AI</h5><div class="big">$27.5B</div><p>Income per search is about $0.00550.</p></div><div class="scn bad"><h5>Scenario 2: GenAI, 10x inference</h5><div class="big">-$150.5B</div><p>Total cost per search rises to about $0.04620, income per search falls to about -$0.03010. Annual swing is roughly -$178B.</p></div></div><p><strong>Line to memorize:</strong> Google is highly profitable in baseline search, but AI search can flip the economics because inference cost is real.</p><h5>AI tech stack market shares (2025-2026 estimates from the study file)</h5><ul><li>Applications: ChatGPT about 30%, Copilot about 20%, Gemini about 18%, Claude about 8%.</li><li>Developer tools: OpenAI API about 35%, Azure AI about 18%, AWS Bedrock about 15%, Google Vertex about 12%.</li><li>Foundation models: OpenAI about 33%, Google about 22%, Meta about 15%, Anthropic about 12%.</li><li>Cloud: AWS about 31%, Azure about 25%, GCP about 12%.</li><li>Chips: NVIDIA around 80% of AI training GPU share, making it a key bottleneck. Cloud is a three-player oligopoly at about 68%.</li></ul>`,
    zhH: `<p>Google 的矛盾：它幾乎發明了 generative AI（2017 Transformer 論文、最大訓練資料集、自研晶片 TPU、數萬 AI 研究人員、搜尋 90%+ 份額、數十億使用者），但 GenAI 卻可能反過來威脅它已經主導的搜尋經濟。</p><div class="tbl-wrap"><table><thead><tr><th>單位經濟學錨點</th><th>數值</th></tr></thead><tbody><tr><td>每次搜尋收入</td><td>$0.01610</td></tr><tr><td>傳統索引搜尋成本</td><td>$0.01060</td></tr><tr><td>AI inference cost</td><td>$0.00356</td></tr><tr><td>每年搜尋次數</td><td>5 trillion</td></tr><tr><td>使用者數</td><td>6.25 billion</td></tr></tbody></table></div><div class="g2"><div class="scn good"><h5>Scenario 1：Baseline，沒有 AI 搜尋</h5><div class="big">$27.5B</div><p>每次搜尋收入約 $0.00550。</p></div><div class="scn bad"><h5>Scenario 2：GenAI，10 倍推論</h5><div class="big">-$150.5B</div><p>每次搜尋總成本升至約 $0.04620，收入變成約 -$0.03010。年度擺盪約 -$178B。</p></div></div><p><strong>最該背的一句：</strong>Google 在 baseline search 很賺錢，但 AI search 可能因為 inference cost 真實存在而把整個經濟翻掉。</p><h5>AI Tech Stack 市場份額（study file 的 2025-2026 估計）</h5><ul><li>Applications：ChatGPT 約 30%、Copilot 約 20%、Gemini 約 18%、Claude 約 8%。</li><li>Developer tools：OpenAI API 約 35%、Azure AI 約 18%、AWS Bedrock 約 15%、Google Vertex 約 12%。</li><li>Foundation models：OpenAI 約 33%、Google 約 22%、Meta 約 15%、Anthropic 約 12%。</li><li>Cloud：AWS 約 31%、Azure 約 25%、GCP 約 12%。</li><li>Chips：NVIDIA 約占 AI 訓練 GPU 80%，為關鍵瓶頸。Cloud 三家寡占約 68%。</li></ul>`,
  },
  {
    tEn: "Anthropic Agents (optional)", tZh: "Anthropic Agents（Optional）",
    enH: `<p>The shift from chat to agents is framed as a qualitative change, not a small feature update. It is presented as comparable in significance to the shift from search to chat.</p><div class="g4"><div class="mc"><h5>Observe</h5><p>Read files, inspect errors, gather data.</p></div><div class="mc"><h5>Think</h5><p>Plan, reason, decide next steps.</p></div><div class="mc"><h5>Act</h5><p>Edit code, run tests, send messages, use tools.</p></div><div class="mc"><h5>Repeat</h5><p>Continue until the task is actually done.</p></div></div><h5>Three agent ingredients</h5><ul><li>A foundation model as the brain.</li><li>Tools as the means to act on the outside world.</li><li>A task-setting loop that keeps the system going until the task is done.</li></ul><p><strong>Compact line:</strong> chat is one turn, while an agent is many turns with tools and planning between them.</p><h5>Chat versus agent</h5><div class="tbl-wrap"><table><thead><tr><th></th><th>LLMs / Chat</th><th>Agents</th></tr></thead><tbody><tr><td>Model</td><td>General foundation model</td><td>General foundation model + tools + planning loop</td></tr><tr><td>Who initiates</td><td>Human (types prompt)</td><td>Human once, then agent takes over</td></tr><tr><td>Who decides next step</td><td>Human reads output, decides</td><td>Agent decides next step</td></tr><tr><td>Scope</td><td>One generation per prompt</td><td>Multi-step workflow across systems</td></tr><tr><td>Duration</td><td>Seconds (one turn)</td><td>Minutes, hours, days, weeks</td></tr></tbody></table></div><h5>Agent stack plumbing</h5><ul><li><strong>MCP (Model Context Protocol):</strong> described as "USB-C for AI," broadly adopted across the industry.</li><li><strong>Agent Skills:</strong> packaged workflows with partners like Canva, Notion, Figma, Atlassian.</li></ul><h5>Agent era scenario experiment</h5><ul><li>Chat/API Era: User &rarr; App Interface &rarr; LLM (app controls the experience).</li><li>Agent Era: User &rarr; Agent &rarr; [App 1, App 2, App 3...] (application layer thins out or disappears).</li><li>Existing platforms (Salesforce, Google Workspace, Slack) may be demoted to tools the agent calls.</li></ul><h5>Four strategic concepts</h5><ul><li>The shift from chat to agents is a qualitative change, comparable to search to chat.</li><li>The tech stack is being rewritten, creating new power dynamics at each layer.</li><li>Open standards function as competitive weapons (Anthropic uses MCP the way Google used Android).</li><li>User-times-user expansion is the growth story.</li></ul><h5>Market anchors from the study file</h5><ul><li>Anthropic annualized revenue: above roughly $19B (March 2026).</li><li>Valuation: around $380B.</li><li>Enterprise LLM API share: Anthropic rising from 12% to 40%, while OpenAI fell from 50% to 27%.</li></ul>`,
    zhH: `<p>從 chat 走向 agent 的變化，被視為質的轉變，而不是小幅功能更新。其重要性被比擬為從 search 到 chat 的轉變。</p><div class="g4"><div class="mc"><h5>Observe</h5><p>讀檔、看錯誤、抓資料。</p></div><div class="mc"><h5>Think</h5><p>規劃、推理、決定下一步。</p></div><div class="mc"><h5>Act</h5><p>改程式、跑測試、發訊息、使用工具。</p></div><div class="mc"><h5>Repeat</h5><p>持續重複，直到任務真的完成。</p></div></div><h5>Agent 三要素</h5><ul><li>Foundation model 作為腦。</li><li>Tools 作為對外行動能力。</li><li>Task-setting loop 讓系統持續推進，直到任務完成。</li></ul><p><strong>最簡潔的句子：</strong>Chat 是 one turn，Agent 是 many turns，而且中間有工具與規劃。</p><h5>Chat 對比 Agent</h5><div class="tbl-wrap"><table><thead><tr><th></th><th>LLMs / Chat</th><th>Agents</th></tr></thead><tbody><tr><td>模型</td><td>通用基礎模型</td><td>通用基礎模型 + tools + planning loop</td></tr><tr><td>誰啟動</td><td>人類（打提示）</td><td>人類一次，之後 agent 接管</td></tr><tr><td>誰決策</td><td>人類讀輸出、決定下一步</td><td>Agent 決定下一步</td></tr><tr><td>範圍</td><td>每個 prompt 一次生成</td><td>跨系統多步驟工作流</td></tr><tr><td>持續時間</td><td>秒（一輪）</td><td>分鐘、小時、天、週</td></tr></tbody></table></div><h5>Agent Stack Plumbing</h5><ul><li><strong>MCP（Model Context Protocol）：</strong>被比喻成 "AI 的 USB-C"，已被業界廣泛採用。</li><li><strong>Agent Skills：</strong>打包好的工作流，合作夥伴包括 Canva、Notion、Figma、Atlassian。</li></ul><h5>Agent Era 情境實驗</h5><ul><li>Chat/API Era：User &rarr; App Interface &rarr; LLM（app 控制體驗）。</li><li>Agent Era：User &rarr; Agent &rarr; [App 1, App 2, App 3...]（application layer 變薄甚至消失）。</li><li>既有平臺（Salesforce、Google Workspace、Slack）可能被降級為 agent 呼叫的工具。</li></ul><h5>四大策略概念</h5><ul><li>從 chat 到 agent 是質的轉變，與 search 到 chat 同等重要。</li><li>技術堆疊正在被重寫，新層級創造新權力動態。</li><li>開放標準是競爭武器（Anthropic 用 MCP 如同 Google 用 Android）。</li><li>User-times-user 擴展是成長故事。</li></ul><h5>study file 的市場錨點</h5><ul><li>Anthropic annualized revenue 約 $19B+（2026 年 3 月）。</li><li>估值約 $380B。</li><li>Enterprise LLM API share：Anthropic 從 12% 升至 40%，OpenAI 從 50% 降至 27%。</li></ul>`,
  },
];

const mod7Blocks = [
  {
    tEn: "Adoption logic, chicken-and-egg, and launch families", tZh: "採用邏輯、Chicken-and-Egg 與起飛策略",
    enH: `<div class="eq">Net Benefits = Stand-Alone Benefits + Network Benefits - Adopter Costs</div><p>Two minimum conditions must hold for adoption: potential adopters must know about the platform and be able to reach it, and they must also have enough incentive to adopt. Stand-alone benefits exist even if nobody else joins. Network benefits rise as more participants join.</p><h5>Chicken-and-egg</h5><p>The first users are asked to adopt when the platform offers the least value and imposes the highest cost. Critical mass is the threshold beyond which growth becomes self-propelling.</p><p>In the 2x2 launch game: two adopters each face cost $1 and receive benefit $2 only if both adopt. That generates two equilibria: both adopt or nobody adopts.</p><h5>Coaxing</h5><ul><li>Give one side enough stand-alone value to move first.</li><li>Use subsidies or penetration pricing.</li><li>Lock in early adopters, feed influencers or colonizers first.</li><li>Examples: LinkedIn's free page, Zillow's Zestimate teaser function, Amazon's one-side entry by integrating book sales, early creator seeding on TikTok.</li></ul><h5>Coordinating</h5><ul><li>Get multiple sides to move together or believe that others will move together.</li><li>Use bounded launch environments such as campuses or events.</li><li>Borrow from existing networks or piggyback on another system.</li><li>Build self-fulfilling expectations, design virality, manufacture scarcity.</li><li>Target people who play roles on both sides of the platform.</li><li>Examples: Facebook campuses, Diner's Club in Manhattan, Airbnb's "publish on Craigslist" bridge, invitation-only Clubhouse, Etsy's dual-role users, YouTube plus MySpace.</li></ul>`,
    zhH: `<div class="eq">Net Benefits = Stand-Alone Benefits + Network Benefits - Adopter Costs</div><p>採用至少要滿足兩個基本條件：潛在採用者必須知道這個平臺，且接觸得到；同時也要有足夠誘因願意採用。Stand-alone benefits 在沒別人加入時也存在，Network benefits 則會隨其他人加入而增加。</p><h5>Chicken-and-Egg</h5><p>最早的使用者被要求在平臺價值最少、成本最高時先採用。Critical mass 是成長開始能自我推動的門檻。</p><p>2x2 起點賽局：兩位採用者各自成本 $1，只有雙方都採用時各得益 $2。兩個均衡：全部採用或無人採用。</p><h5>Coaxing</h5><ul><li>先讓某一邊單獨就有足夠價值願意先動。</li><li>用補貼或滲透定價。</li><li>鎖定早期採用者，先餵 influencer 或 colonizer。</li><li>例子：LinkedIn 免費頁面、Zillow Zestimate teaser、Amazon 先單邊進場整合書籍銷售、TikTok 早期創作者種子。</li></ul><h5>Coordinating</h5><ul><li>讓多邊一起動，或至少讓大家相信別人也會一起動。</li><li>用校園或活動這類有邊界的啟動環境。</li><li>借用既有網路，或 piggyback 在別的系統上。</li><li>建立自我實現期望、設計 virality、製造稀缺感。</li><li>鎖定兼具雙邊角色者。</li><li>例子：Facebook 校園、Diner's Club 曼哈頓、Airbnb 對 Craigslist 的橋接、邀請制 Clubhouse、Etsy 雙邊角色、YouTube 加上 MySpace。</li></ul>`,
  },
  {
    tEn: "No silver bullet and the rocket checklist", tZh: "沒有銀彈與火箭檢查表",
    enH: `<p>Most platforms do not take off. Heavy subsidy alone is often expensive and still insufficient. The launch problem should be handled like a rocket-design problem rather than a generic marketing problem.</p><div class="g2"><div class="mc"><h5>01</h5><p>How many sides are required at the start, and which can be delayed?</p></div><div class="mc"><h5>02</h5><p>What user count is needed for critical mass on each side? Write down numbers.</p></div><div class="mc"><h5>03</h5><p>Can the platform go directly to the mainstream, or must it begin with a niche?</p></div><div class="mc"><h5>04</h5><p>What tactics are used for each side and each stage, and what backup plan exists?</p></div></div>`,
    zhH: `<p>大多數平臺根本起飛不了。單靠砸補貼通常又貴又未必有效。起飛問題比較像火箭設計問題，不只是一般行銷問題。</p><div class="g2"><div class="mc"><h5>01</h5><p>一開始到底需要幾個 sides，哪些可以延後？</p></div><div class="mc"><h5>02</h5><p>每一邊的 critical mass 需要多少採用者？要寫出數字。</p></div><div class="mc"><h5>03</h5><p>能直接進主流，還是必須先從 niche 開始？</p></div><div class="mc"><h5>04</h5><p>每一邊、每一階段用甚麼 tactics，有沒有備案？</p></div></div>`,
  },
  {
    tEn: "SaferTaxi", tZh: "SaferTaxi",
    enH: `<p>This case matters because it shows a platform can have a real value proposition and still fail to match scale, cost, and reachable market.</p><ul><li>A Latin American ride-hailing platform operating in three cities before Uber's major entry, with total population around 30 million and a taxi market around $2.2B.</li><li>Economic pain point: roughly $1M annual cost, at one point only 46 cabs, and revenue needing to grow tenfold just to break even.</li><li>Smartphone penetration is extremely low, only 9% to 19%, which limits reachable demand.</li></ul><div class="tbl-wrap"><table><thead><tr><th>Metric</th><th>Buenos Aires</th><th>Santiago</th><th>S&atilde;o Paulo</th></tr></thead><tbody><tr><td>Population</td><td>12,801,000</td><td>6,027,000</td><td>11,320,000</td></tr><tr><td>Per-capita income</td><td>US$10,959</td><td>US$15,415</td><td>US$12,340</td></tr><tr><td>Smartphone penetration</td><td>10%</td><td>19%</td><td>9%</td></tr><tr><td>Number of taxis</td><td>37,860</td><td>22,107</td><td>32,000</td></tr><tr><td>Average cost per ride</td><td>US$8.00</td><td>US$6.00</td><td>US$12.50</td></tr><tr><td>Avg wait, RadioTaxi</td><td>30 min</td><td>20 min</td><td>30 min</td></tr><tr><td>Avg wait, SaferTaxi</td><td>9 min</td><td>6 min</td><td>12 min</td></tr></tbody></table></div><h5>Growth tactics</h5><ul><li>Driver side: cheap smartphones, training, on-site taxi-stand managers, agreements with RadioTaxi operators, 11.5% electronic commission and 7% cash commission with free trial.</li><li>Passenger side: mobile advertising, PR, friend networks, corporate contracts, and events.</li></ul><h5>Strategic options listed in the slides</h5><ul><li>Minimal investment and narrower positioning.</li><li>Larger investment to build a bigger position (possibly coexist with or be acquired by Uber).</li><li>Stop altogether.</li><li>Another option.</li></ul><p><strong>Takeaway:</strong> SaferTaxi is not a case of zero value. The wait-time advantage is significant. It is a case in which scale, cost, and reachable market fail to fit one another. The real managerial question is whether the platform should move toward a smaller, sharper differentiated position.</p>`,
    zhH: `<p>這個案例重要，因為它說明平臺即使有真正的 value proposition（等待時間優勢顯著），仍然可能在規模、成本與可觸及市場之間出現不匹配。</p><ul><li>拉丁美洲叫車平臺，在 Uber 等大玩家大舉進入前已經進入三個城市，總人口約 3,000 萬，計程車市場約 $2.2B。</li><li>經濟壓力很明顯：每年成本約 $1M，一度只有 46 輛車，營收還要再成長 10 倍才有機會打平。</li><li>智慧型手機滲透率只有 9% 到 19%，可觸及市場因此受到嚴重限制。</li></ul><div class="tbl-wrap"><table><thead><tr><th>指標</th><th>Buenos Aires</th><th>Santiago</th><th>S&atilde;o Paulo</th></tr></thead><tbody><tr><td>Population</td><td>12,801,000</td><td>6,027,000</td><td>11,320,000</td></tr><tr><td>Per-capita income</td><td>US$10,959</td><td>US$15,415</td><td>US$12,340</td></tr><tr><td>Smartphone penetration</td><td>10%</td><td>19%</td><td>9%</td></tr><tr><td>Number of taxis</td><td>37,860</td><td>22,107</td><td>32,000</td></tr><tr><td>Average cost per ride</td><td>US$8.00</td><td>US$6.00</td><td>US$12.50</td></tr><tr><td>RadioTaxi 平均等待</td><td>30 min</td><td>20 min</td><td>30 min</td></tr><tr><td>SaferTaxi 平均等待</td><td>9 min</td><td>6 min</td><td>12 min</td></tr></tbody></table></div><h5>成長 tactics</h5><ul><li>司機端：廉價手機、培訓、計程車站現場經理、與 RadioTaxi 營運者合作、電子 11.5% 與現金 7% 的抽成安排，並提供免費試用。</li><li>乘客端：行動廣告、公關、朋友網路、企業客戶合約與活動。</li></ul><h5>投影片列出的策略選項</h5><ul><li>最小化投資並找更小更準的定位。</li><li>加大投資以建立更大位置，並可能與 Uber 共存或被收購。</li><li>直接停止。</li><li>其他方案。</li></ul><p><strong>結論：</strong>SaferTaxi 不是沒有 value proposition，而是規模、成本與可觸及市場彼此不夠匹配。教授真正要你判斷的是，它是否應該轉向更小、更準、更有差異化的定位。</p>`,
  },
];

const mod8Blocks = [
  {
    tEn: "Why platform competition is different", tZh: "為甚麼平臺競爭不同",
    enH: `<p>Traditional competition asks who has the better position. Platform competition adds a second question: which equilibrium the market will tip toward.</p><p>When returns to scale are strong, the market can settle into multiple equilibria, such as no adoption, Platform A wins, or Platform B wins. That means uncertainty, path dependence, and tipping dynamics become central.</p><p><strong>Competing Platforms Game:</strong> 2 platforms (Alpha, Beta), 2 consumers. Benefit = $2 if the other adopts the same platform, $0 otherwise. Cost = $1. Three equilibria: nobody adopts, Alpha wins, or Beta wins.</p><p><strong>Compact line:</strong> competition becomes competition <em>for</em> the market, not merely competition <em>in</em> the market. A small lead can compound rapidly into dominance. Once lock-in forms, reversal is extremely hard.</p>`,
    zhH: `<p>傳統競爭主要問誰位置比較好。平臺競爭還多了一個問題，就是市場最後會 tip 到哪個 equilibrium。</p><p>當規模報酬很強時，市場可能停在多個均衡之一，例如無採用、平臺 A 勝，或平臺 B 勝。於是未來不確定性、路徑依賴與 tipping 動態都會變成核心問題。</p><p><strong>Competing Platforms Game：</strong>2 個平臺（Alpha, Beta）、2 個消費者。效益 = 若他人採用同一平臺則 $2，否則 $0。成本 = $1。三個均衡：無人採用、Alpha 勝、Beta 勝。</p><p><strong>最短的記法：</strong>競爭會從在市場中競爭，轉成爭奪整個市場。小的領先可能快速複合成主導地位。Lock-in 一旦形成極難逆轉。</p>`,
  },
  {
    tEn: "Switching costs, multi-homing costs, and WTA conditions", tZh: "Switching Costs、Multi-Homing Costs 與 WTA 條件",
    enH: `<p><strong>Switching cost</strong> is the cost of moving from Platform A to Platform B. <strong>Multi-homing cost</strong> is the cost of using an additional platform while already on one.</p><h5>Raise these costs (leader tactics)</h5><ul><li>Loyalty programs such as Amazon Prime.</li><li>Data that are hard to port, such as iCloud lock-in.</li><li>Exclusive features, such as Spotify podcasts.</li><li>Bundled subscriptions, such as Microsoft 365.</li></ul><h5>Lower these costs (challenger tactics)</h5><ul><li>Seamless onboarding and data migration, such as WhatsApp-style moves.</li><li>Subsidizing the switching burden, such as T-Mobile style offers.</li><li>Compatibility with the rival ecosystem, such as Slack-style integration logic.</li><li>Free trials, such as Netflix.</li></ul><p><strong>Winner-take-all requires all three conditions to be strong:</strong></p><ul><li><strong>(1) Strong scale effects.</strong></li><li><strong>(2) Little scope for differentiation.</strong></li><li><strong>(3) Large switching and multi-homing costs.</strong></li></ul><p>All three must be strong together. Missing any one breaks the clean WTA conclusion.</p><p>Online search: three conditions met = WTA. Magazines: scale effects exist but differentiation space remains, and switching cost is low = not WTA.</p><p><strong>Leaders</strong> strengthen WTA by reinforcing scale effects, compressing differentiation space, and raising switching costs. <strong>Followers</strong> challenge WTA by targeting segments with weaker scale effects, discovering unserved niches, and lowering switching barriers.</p>`,
    zhH: `<p><strong>Switching cost</strong> 是從平臺 A 移去平臺 B 的成本。<strong>Multi-homing cost</strong> 是已經在一個平臺上時，再多用一個平臺的成本。</p><h5>提高這些成本（leader 策略）</h5><ul><li>像 Amazon Prime 的忠誠計畫。</li><li>像 iCloud 那樣難以移轉的資料。</li><li>獨家功能，例如 Spotify podcasts。</li><li>訂閱綑綁，例如 Microsoft 365。</li></ul><h5>降低這些成本（challenger 策略）</h5><ul><li>像 WhatsApp 那樣的無縫導入與資料遷移。</li><li>補貼轉換成本，例如 T-Mobile 那種做法。</li><li>與對手生態系相容，例如 Slack 類型的整合策略。</li><li>免費試用，例如 Netflix。</li></ul><p><strong>Winner-take-all 必須三條件都很強：</strong></p><ul><li><strong>(1) Strong scale effects。</strong></li><li><strong>(2) Little scope for differentiation。</strong></li><li><strong>(3) Large switching 與 multi-homing costs。</strong></li></ul><p>三個要一起強。缺任何一個就不是完全 WTA。</p><p>Online search：三條件都滿足 = WTA。Magazines：有規模效應，但有差異化空間且低轉換成本 = 不是 WTA。</p><p><strong>Leaders</strong> 強化 WTA：強化規模效應、壓縮差異化空間、提高轉換成本。<strong>Followers</strong> 挑戰 WTA：瞄準規模效應較弱的細分、發現未服務利基、降低轉換門檻。</p>`,
  },
  {
    tEn: "Uber China", tZh: "Uber China",
    enH: `<p>This case matters because it separates <strong>fighting like winner-take-all</strong> from <strong>actually being in a winner-take-all market</strong>.</p><ul><li>Uber's early form resembled a premium pre-booked black-car service, then it scaled globally and formed Uber China as a separate operating entity to confront Didi.</li><li>A later profitability fact: Uber first reached annual operating profit in 2023 at about $1.1B, driven by scope expansion through Uber Eats and Uber Freight, cost management, and post-pandemic recovery.</li><li>The stable strategic line is <strong>scope rather than scale</strong>.</li></ul><div class="g3"><div class="st"><div class="st-top"><strong>Strong scale effects</strong><span class="badge badge-yes">YES</span></div><p class="sm">The market had meaningful scale effects.</p></div><div class="st"><div class="st-top"><strong>Little scope for differentiation</strong><span class="badge badge-maybe">DEBATABLE</span></div><p class="sm">Differentiation was not absent enough to make it cleanly WTA.</p></div><div class="st"><div class="st-top"><strong>Large switching / multi-homing costs</strong><span class="badge badge-no">NO</span></div><p class="sm">Riders and drivers could multi-home too easily.</p></div></div><p>Because only two of the three WTA conditions were strong, the outcome looks more like a <strong>war of attrition</strong> than a clean network tipping story. Do not mistake intense spending battles as proof that the underlying economics are WTA.</p><h5>Outcome anchors</h5><ul><li>Didi acquired Uber China.</li><li>Didi valuation anchor: about $35B.</li><li>Uber's stake: 17.7%.</li><li>Implied payoff anchor: about $6.2B, roughly six times the invested capital upon exit.</li></ul><h5>Robot-car comparison (slides use this to ask: can a different operating model change Uber's economics?)</h5><div class="tbl-wrap"><table><thead><tr><th>Metric</th><th>Robot cars, Uber-owned</th><th>Human drivers, driver-owned</th></tr></thead><tbody><tr><td>Fixed operating cost</td><td>~$26,800 per year</td><td>$0</td></tr><tr><td>Variable cost</td><td>~$10,000</td><td>~$40,000 in driver earnings</td></tr><tr><td>Annual revenue per car</td><td>$60,000 to $80,000</td><td>$60,000 to $80,000</td></tr><tr><td>Uber's share</td><td>100%</td><td>20% to 30%, about $12,000 to $24,000</td></tr></tbody></table></div><p><strong>Line to memorize:</strong> firms can fight as if the market is winner-take-all even when the market itself is not fully winner-take-all.</p>`,
    zhH: `<p>這個案例重要，因為它把 <strong>照 winner-take-all 邏輯打仗</strong> 與 <strong>市場本身真的屬於 winner-take-all</strong> 兩件事拆開來了。</p><ul><li>Uber 最初比較像預約黑色禮車服務，之後才快速全球擴張，並設立獨立的 Uber China 來面對 Didi。</li><li>Uber 後來在 2023 年首次達到年度營運獲利約 $1.1B，改善原因包括 Uber Eats 與 Uber Freight 帶來的 scope expansion、成本管理與疫情後復甦。</li><li>最穩的策略結論是 <strong>scope rather than scale</strong>。</li></ul><div class="g3"><div class="st"><div class="st-top"><strong>Strong scale effects</strong><span class="badge badge-yes">YES</span></div><p class="sm">這個市場確實有相當明顯的規模效應。</p></div><div class="st"><div class="st-top"><strong>Little scope for differentiation</strong><span class="badge badge-maybe">DEBATABLE</span></div><p class="sm">差異化空間並沒有小到能把市場判成乾淨的 WTA。</p></div><div class="st"><div class="st-top"><strong>Large switching / multi-homing costs</strong><span class="badge badge-no">NO</span></div><p class="sm">乘客與司機都太容易多棲，轉換與多棲成本不高。</p></div></div><p>因為只滿足 2/3 條件，結果更像 <strong>war of attrition</strong>，而不是乾淨的 network tipping。不要把激烈燒錢競爭，誤以為它必然證明市場底層經濟就是 WTA。</p><h5>結局與數字錨點</h5><ul><li>Didi 買下 Uber China。</li><li>Didi 估值錨點：約 $35B。</li><li>Uber 持股：約 17.7%。</li><li>推算出的 payoff 錨點：約 $6.2B，離場時約為投資額的 6 倍。</li></ul><h5>Robot Car 比較（投影片用途：問換一種 operating model 能否改變 Uber 經濟性）</h5><div class="tbl-wrap"><table><thead><tr><th>指標</th><th>Robot cars，Uber 自有</th><th>Human drivers，司機自有</th></tr></thead><tbody><tr><td>固定營運成本</td><td>~$26,800 / 年</td><td>$0</td></tr><tr><td>變動成本</td><td>~$10,000</td><td>~$40,000 司機收入</td></tr><tr><td>每車年收入</td><td>$60,000 到 $80,000</td><td>$60,000 到 $80,000</td></tr><tr><td>Uber 可拿份額</td><td>100%</td><td>20% 到 30%，約 $12,000 到 $24,000</td></tr></tbody></table></div><p><strong>最該背的一句：</strong>企業可以照 WTA 邏輯開戰，但市場本身未必真的符合 WTA。</p>`,
  },
];

// ── Overview tables for hero scan cards ──
const modMapTableEn = `<table><thead><tr><th>Module</th><th>Core question</th><th>What changes the diagnosis</th><th>One line to keep</th></tr></thead><tbody><tr><td>5</td><td>What can the platform actually predict?</td><td>Whether there is a real feedback loop.</td><td>Observability comes before sophistication.</td></tr><tr><td>6</td><td>What is genuinely different about LLMs?</td><td>Inference cost, generality, and cannibalization risk.</td><td>LLMs are broader prediction machines, not magic.</td></tr><tr><td>7</td><td>Can the platform get past zero?</td><td>Whether net benefits clear adoption cost on each side.</td><td>Most platforms never take off.</td></tr><tr><td>8</td><td>Will the market tip?</td><td>All three WTA conditions must be strong together.</td><td>Fighting like WTA is not the same as being WTA.</td></tr></tbody></table>`;
const modMapTableZh = `<table><thead><tr><th>模組</th><th>核心問題</th><th>真正改變判斷的點</th><th>最值得記的一句</th></tr></thead><tbody><tr><td>5</td><td>平臺到底能預測甚麼？</td><td>有沒有真的 feedback loop。</td><td>先看 observability，再談 sophistication。</td></tr><tr><td>6</td><td>LLM 到底特別在哪裡？</td><td>Inference cost、通用性、自我侵蝕風險。</td><td>LLM 是更廣的 prediction machine，不是魔法。</td></tr><tr><td>7</td><td>平臺能不能過零起飛？</td><td>各邊淨效益能不能壓過 adoption cost。</td><td>大多數平臺其實起飛不了。</td></tr><tr><td>8</td><td>市場會不會 tip？</td><td>三個 WTA 條件要一起強。</td><td>照 WTA 打，不等於市場真的 WTA。</td></tr></tbody></table>`;
const caseMapTableEn = `<table><thead><tr><th>Case</th><th>Engine</th><th>Main trap</th><th>Fast diagnosis</th></tr></thead><tbody><tr><td>eHarmony</td><td>Survey-heavy matching</td><td>Rich inputs but weak feedback.</td><td>Good one-shot matching, weak ongoing learning.</td></tr><tr><td>Google</td><td>Search plus GenAI</td><td>GenAI can improve user value while damaging incumbent economics.</td><td>Use value creation and value capture at the same time.</td></tr><tr><td>SaferTaxi</td><td>Takeoff in local ride-hailing</td><td>Value exists, but reachable scale may still be too small.</td><td>The issue is fit between scale, cost, and market reach.</td></tr><tr><td>Uber China</td><td>Platform war</td><td>War behavior can exceed what economics strictly supports.</td><td>Two WTA conditions strong, third was not enough.</td></tr></tbody></table>`;
const caseMapTableZh = `<table><thead><tr><th>案例</th><th>核心引擎</th><th>主要陷阱</th><th>快速診斷</th></tr></thead><tbody><tr><td>eHarmony</td><td>高問卷比重配對</td><td>輸入很豐富，但 feedback 很弱。</td><td>一次性配對邏輯不差，但持續學習邏輯很弱。</td></tr><tr><td>Google</td><td>搜尋加上 GenAI</td><td>GenAI 可能提升使用者價值，卻傷到既有經濟。</td><td>必須同時看 value creation 與 value capture。</td></tr><tr><td>SaferTaxi</td><td>本地叫車平臺起飛</td><td>有價值，不代表可達規模也夠大。</td><td>問題是規模、成本與市場可觸及範圍的匹配。</td></tr><tr><td>Uber China</td><td>平臺戰爭</td><td>企業行為可能比純經濟邏輯更激烈。</td><td>三個 WTA 條件只有兩個夠強，第三個不夠。</td></tr></tbody></table>`;

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function T({ m, en, zh }) {
  if (m === "en") return en;
  if (m === "zh") return zh;
  return <><span>{en}</span><span style={{ display: "block", marginTop: 4, fontSize: "0.85em", color: C.muted }}>{zh}</span></>;
}

function Html({ m, en, zh }) {
  if (m === "en") return <div className="htb" dangerouslySetInnerHTML={{ __html: en }} />;
  if (m === "zh") return <div className="htb" dangerouslySetInnerHTML={{ __html: zh }} />;
  return (
    <div className="dual bi-mode">
      <div className="bi-lane">
        <div className="bi-label">English</div>
        <div className="htb bi-copy en-part" dangerouslySetInnerHTML={{ __html: en }} />
      </div>
      <div className="bi-lane">
        <div className="bi-label">中文</div>
        <div className="htb bi-copy zh-part" dangerouslySetInnerHTML={{ __html: zh }} />
      </div>
    </div>
  );
}

function Chevron({ open }) {
  return (
    <svg className={`chevron${open ? " open" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

function Section({ id, kicker, title, source, quote, lensContent, blocks, mode, scanData, visual }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="sec" id={id}>
      <div className="sec-head">
        <button className="collapse-trigger" onClick={() => setOpen(!open)}>
          <div>
            <div className="kicker kicker-gold"><T m={mode} en={kicker} zh={kicker} /></div>
            <h2 className="h2"><T m={mode} en={title.en} zh={title.zh} /></h2>
          </div>
          <Chevron open={open} />
        </button>
        <span className="sec-source"><T m={mode} en={source.en} zh={source.zh} /></span>
      </div>
      {open && (
        <>
          {quote && (
            <div className="g2" style={{ marginBottom: 14 }}>
              <div className="quote">
                <div className="quote-label"><T m={mode} en="Memorize this" zh="這句要背" /></div>
                <div className="quote-text"><T m={mode} en={quote.en} zh={quote.zh} /></div>
              </div>
              <div className="card">{lensContent}</div>
            </div>
          )}

          {scanData && (
            <div className="scan3">
              <div className="scan3-card must">
                <div className="scan3-kicker"><T m={mode} en="Must memorize" zh="必背句" /></div>
                <ul className="scan3-list">
                  {scanData.memorize.map((item, i) => <li key={i}><T m={mode} en={item.en} zh={item.zh} /></li>)}
                </ul>
              </div>
              <div className="scan3-card judge">
                <div className="scan3-kicker"><T m={mode} en="Judgment rules" zh="判斷句" /></div>
                <ul className="scan3-list">
                  {scanData.judge.map((item, i) => <li key={i}><T m={mode} en={item.en} zh={item.zh} /></li>)}
                </ul>
              </div>
              <div className="scan3-card evidence">
                <div className="scan3-kicker"><T m={mode} en="Case evidence" zh="案例證據" /></div>
                <ul className="scan3-list">
                  {scanData.evidence.map((item, i) => <li key={i}><T m={mode} en={item.en} zh={item.zh} /></li>)}
                </ul>
              </div>
            </div>
          )}

          {visual && <div className="module5-viz">{visual}</div>}

          <div className="detail-head">
            <div className="kicker kicker-plum"><T m={mode} en="Expanded notes" zh="展開筆記" /></div>
            <div className="sm"><T m={mode} en="Use the three scan layers first, then drop into the detailed cards only where you still need proof, examples, or nuance." zh="先讀完上面的三層掃讀，再回來看下面詳細卡片，補足證據、例子與細節。" /></div>
          </div>
          <div className="detail-grid">
            {blocks.map((b, i) => (
              <div className="card" key={i}>
                <h3 className="h3" style={{ marginBottom: 10 }}><T m={mode} en={b.tEn} zh={b.tZh} /></h3>
                <Html m={mode} en={b.enH} zh={b.zhH} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function LensMiniCards({ items, mode, titleEn, titleZh }) {
  return (
    <>
      <h3 className="h3" style={{ marginBottom: 10 }}><T m={mode} en={titleEn} zh={titleZh} /></h3>
      <div className="g2">
        {items.map((it, i) => (
          <div className="mc" key={i}>
            <h5><T m={mode} en={it.hEn} zh={it.hZh} /></h5>
            <p><T m={mode} en={it.pEn} zh={it.pZh} /></p>
          </div>
        ))}
      </div>
    </>
  );
}

function LensTable({ data, mode }) {
  const headEn = `<tr><th></th><th>Weak AI</th><th>LLM / GenAI</th></tr>`;
  const headZh = `<tr><th></th><th>弱 AI</th><th>LLM / GenAI</th></tr>`;
  return (
    <>
      <h3 className="h3" style={{ marginBottom: 10 }}><T m={mode} en={data.titleEn} zh={data.titleZh} /></h3>
      <Html m={mode}
        en={`<div class="tbl-wrap"><table><thead>${headEn}</thead><tbody>${data.tableEn}</tbody></table></div>`}
        zh={`<div class="tbl-wrap"><table><thead>${headZh}</thead><tbody>${data.tableZh}</tbody></table></div>`}
      />
    </>
  );
}

function LensWTA({ data, mode }) {
  return (
    <>
      <h3 className="h3" style={{ marginBottom: 10 }}><T m={mode} en={data.titleEn} zh={data.titleZh} /></h3>
      <div className="g3">
        {data.conditions.map((c, i) => (
          <div className="st" key={i}>
            <div className="st-top">
              <strong>{c.label}</strong>
              <span className={`badge badge-${c.badge === "yes" ? "yes" : c.badge === "no" ? "no" : "maybe"}`}>
                {c.badge === "yes" ? "YES" : c.badge === "no" ? "NO" : "CHECK"}
              </span>
            </div>
            <p className="sm"><T m={mode} en={c.en} zh={c.zh} /></p>
          </div>
        ))}
      </div>
      <p className="body" style={{ marginTop: 10 }}><T m={mode} en={data.noteEn} zh={data.noteZh} /></p>
    </>
  );
}


function SvgMultiText({ x, y, en, zh, mode, anchor = "middle", size = 13, weight = 600, fill = C.inkSoft }) {
  const lines = mode === "bi" ? [en, zh] : [mode === "zh" ? zh : en];
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={FONT_BODY} fontSize={size} fontWeight={weight} fill={fill}>
      {lines.map((line, idx) => (
        <tspan key={idx} x={x} dy={idx === 0 ? 0 : size * 1.2}>{line}</tspan>
      ))}
    </text>
  );
}

function FlowVizCard({ mode, kickerEn, kickerZh, titleEn, titleZh, noteEn, noteZh, badges, children }) {
  return (
    <div className="flow-viz-card">
      <div className="flow-viz-head">
        <div className="kicker kicker-red"><T m={mode} en={kickerEn} zh={kickerZh} /></div>
        <h3 className="h3"><T m={mode} en={titleEn} zh={titleZh} /></h3>
        <div className="flow-viz-note"><T m={mode} en={noteEn} zh={noteZh} /></div>
      </div>
      {children}
      {badges && (
        <div className="flow-badges">
          {badges.map((b, i) => (
            <span className={`flow-badge ${b.kind}`} key={i}><T m={mode} en={b.en} zh={b.zh} /></span>
          ))}
        </div>
      )}
    </div>
  );
}

function FlowOral({ mode, en, zh }) {
  return (
    <div className="flow-oral">
      <div className="flow-oral-kicker"><T m={mode} en="15-second oral version" zh="15 秒口述版" /></div>
      <div className="flow-oral-copy"><T m={mode} en={en} zh={zh} /></div>
    </div>
  );
}

function PredictionFactoryFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 1"
      kickerZh="流程圖 1"
      titleEn="Prediction Factory from Formula to Operating Model"
      titleZh="從公式走到營運模型的 Prediction Factory"
      noteEn="This is the core Module 5 picture. The point is not just writing ŷ = f(X). The point is turning that formula into a live operating loop that observes inputs, triggers decisions, watches outcomes, and learns again."
      noteZh="這是 Module 5 最核心的一張圖。重點不是只寫出 ŷ = f(X)，而是把這個公式嵌進實際運作的 loop 裡，讓系統會觀測輸入、做決策、看結果，再重新學習。"
      badges={[
        { kind: 'info', en: 'Top row = live use', zh: '上排 = live use' },
        { kind: 'good', en: 'Bottom row = build / tune', zh: '下排 = build / tune' },
        { kind: 'warn', en: 'Feedback is the make-or-break link', zh: 'Feedback 是關鍵連結' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 430" role="img" aria-label="Prediction factory flowchart">
          <defs>
            <marker id="pfArrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker>
            <marker id="pfArrowSoft" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.matsu} /></marker>
          </defs>
          <text x="44" y="38" fontFamily={FONT_BODY} fontSize="15" fontWeight="800" fill={C.ai}>LIVE USE</text>
          {rect(46, 78, 186, 88, C.kitsuneLight, C.kitsune)}
          {rect(274, 78, 202, 88, C.aiLight, C.ai)}
          {rect(518, 78, 204, 88, C.fujiLight, C.fuji)}
          {rect(764, 78, 210, 88, C.paper, C.kitsune)}
          {rect(1016, 78, 178, 88, C.matsuLight, C.matsu)}
          <line x1="232" y1="122" x2="274" y2="122" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#pfArrow)" />
          <line x1="476" y1="122" x2="518" y2="122" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#pfArrow)" />
          <line x1="722" y1="122" x2="764" y2="122" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#pfArrow)" />
          <line x1="974" y1="122" x2="1016" y2="122" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#pfArrow)" />

          <SvgMultiText x={139} y={106} en="Input X" zh="Input X" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={139} y={132} en="profiles, clicks," zh="profiles、clicks、" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={139} y={148} en="context, dyad data" zh="context、dyad 資料" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={375} y={106} en="Prediction model" zh="Prediction model" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={375} y={132} en="ŷ = f(X)" zh="ŷ = f(X)" mode={mode} size={16} weight={800} fill={C.fuji} />
          <SvgMultiText x={375} y={148} en="turn observed X into ŷ" zh="把可觀測的 X 轉成 ŷ" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={620} y={106} en="Decision rule" zh="Decision rule" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={620} y={132} en="if condition {ŷ} is met" zh="if condition {ŷ} is met" mode={mode} size={14.2} weight={800} fill={C.fuji} />
          <SvgMultiText x={620} y={148} en="convert prediction into action" zh="把 prediction 轉成 action" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={869} y={106} en="Automate action Z" zh="Automate action Z" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={869} y={132} en="recommend, rank," zh="recommend、rank、" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={869} y={148} en="notify, match, flag" zh="notify、match、flag" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={1105} y={106} en="Observe outcome y" zh="Observe outcome y" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={1105} y={132} en="click, reply, convert," zh="click、reply、convert、" mode={mode} size={12.4} fill={C.inkSoft} />
          <SvgMultiText x={1105} y={148} en="churn, performance" zh="churn、performance" mode={mode} size={12.4} fill={C.inkSoft} />

          <text x="44" y="252" fontFamily={FONT_BODY} fontSize="15" fontWeight="800" fill={C.matsu}>BUILD / TUNE</text>
          {rect(242, 286, 214, 88, C.paper, C.matsu)}
          {rect(510, 286, 214, 88, C.white, C.line)}
          {rect(778, 286, 216, 88, C.aiLight, C.ai)}
          <line x1="724" y1="330" x2="778" y2="330" stroke={C.matsu} strokeWidth="3" markerEnd="url(#pfArrowSoft)" />
          <line x1="456" y1="330" x2="510" y2="330" stroke={C.matsu} strokeWidth="3" markerEnd="url(#pfArrowSoft)" />

          <SvgMultiText x={349} y={314} en="Train / test / refine f(.)" zh="訓練、測試、精煉 f(.)" mode={mode} size={14.2} fill={C.matsu} />
          <SvgMultiText x={349} y={340} en="start simple, then add richness" zh="先簡單，再往上加複雜度" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={617} y={314} en="Platform database {Y, X}" zh="Platform database {Y, X}" mode={mode} size={14.2} fill={C.ai} />
          <SvgMultiText x={617} y={340} en="historical inputs plus outcomes" zh="歷史輸入加上 outcomes" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={886} y={314} en="Feedback loop" zh="Feedback loop" mode={mode} size={14.2} fill={C.ai} />
          <SvgMultiText x={886} y={340} en="fresh y keeps the next model honest" zh="新的 y 讓下一輪模型不會失真" mode={mode} size={12.6} fill={C.inkSoft} />

          <path d="M 1105 166 L 1105 250 L 886 250" fill="none" stroke={C.matsu} strokeWidth="3" markerEnd="url(#pfArrowSoft)" />
          <path d="M 242 330 L 174 330 L 174 166 L 274 166" fill="none" stroke={C.matsu} strokeWidth="3" markerEnd="url(#pfArrowSoft)" />
          <text x="1086" y="240" fontFamily={FONT_BODY} fontSize="12" fontWeight="800" fill={C.matsu}>{mode === 'zh' ? 'feedback' : mode === 'bi' ? 'feedback / 回流' : 'feedback'}</text>
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="The formula is only the middle of the story. The full story is X enters, ŷ is produced, a rule fires, an action happens, and new y either returns to the system or does not. That last step determines whether the platform can really learn." zh="公式只是故事的中段。完整故事是：X 進來，產生 ŷ，rule 被觸發，action 發生，而新的 y 會不會回流到系統裡。最後這一步，才決定平臺到底能不能真的學習。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: first observe X, then run ŷ = f(X), then apply a rule to trigger an action. If the outcome y comes back and retrains the model, you have a prediction factory. If it does not, you only have a one-shot algorithm." zh="15 秒講法：先觀測 X，再跑 ŷ = f(X)，再用 rule 觸發 action。若結果 y 會回流並重新訓練模型，這才叫 prediction factory。若不會回流，你只有一次性的演算法。" />
    </FlowVizCard>
  );
}

function EHarmonyFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 2"
      kickerZh="流程圖 2"
      titleEn="eHarmony: Actual Flow, Missing Loop"
      titleZh="eHarmony：實際流程與缺掉的學習迴路"
      noteEn="The slides show eHarmony's actual path as a survey-heavy unsupervised flow. The service had rich inputs, but the learning loop was weak because reliable outcome tracking and feedback were limited."
      noteZh="投影片顯示 eHarmony 的實際主路徑，是高度依賴問卷的非監督式流程。它不是沒有輸入資料，而是可靠的 outcome tracking 與 feedback 太弱，所以學習迴路很薄。"
      badges={[
        { kind: 'warn', en: 'Actual path = unsupervised similarity', zh: '實際主路徑 = 非監督式相似度' },
        { kind: 'bad', en: '4,000 successful couples = all y = 1', zh: '4,000 successful couples = 全部 y = 1' },
        { kind: 'bad', en: 'No tracking / little tuning', zh: 'Tracking 弱 / tuning 少' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 470" role="img" aria-label="eHarmony flowchart">
          <defs>
            <marker id="ehArrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker>
            <marker id="ehArrowRed" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.beni} /></marker>
            <marker id="ehArrowBlue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.ai} /></marker>
          </defs>
          {rect(42, 72, 204, 92, C.aiLight, C.ai)}
          {rect(292, 72, 204, 92, C.kitsuneLight, C.kitsune)}
          {rect(542, 72, 194, 92, C.fujiLight, C.fuji)}
          {rect(782, 72, 194, 92, C.paper, C.kitsune)}
          {rect(1022, 72, 176, 92, C.matsuLight, C.matsu)}
          <line x1="246" y1="118" x2="292" y2="118" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#ehArrow)" />
          <line x1="496" y1="118" x2="542" y2="118" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#ehArrow)" />
          <line x1="736" y1="118" x2="782" y2="118" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#ehArrow)" />
          <line x1="976" y1="118" x2="1022" y2="118" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#ehArrow)" />

          <SvgMultiText x={144} y={102} en="Questionnaire X" zh="Questionnaire X" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={144} y={128} en="140 / 300+ questions" zh="140 / 300+ 題" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={144} y={144} en="personality, prefs, demo" zh="人格、偏好、人口資料" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={394} y={102} en="Collapse into" zh="壓縮成" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={394} y={128} en="6 dimensions" zh="6 個維度" mode={mode} size={16} weight={800} fill={C.fuji} />
          <SvgMultiText x={394} y={144} en="agreeableness, closeness..." zh="和善、親密偏好…" mode={mode} size={12.2} fill={C.inkSoft} />

          <SvgMultiText x={639} y={102} en="Similarity / distance" zh="Similarity / distance" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={639} y={128} en="rank closest dyads" zh="最接近的 dyad 排前面" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={639} y={144} en="unsupervised path" zh="非監督式路徑" mode={mode} size={12.6} fill={C.fuji} />

          <SvgMultiText x={879} y={102} en="Top N matches" zh="Top N matches" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={879} y={128} en="show profile, photo," zh="顯示 profile、照片、" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={879} y={144} en="see more" zh="see more" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={1110} y={102} en="User action" zh="使用者行動" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={1110} y={128} en="click / initiate contact" zh="click / initiate contact" mode={mode} size={12.2} fill={C.inkSoft} />
          <SvgMultiText x={1110} y={144} en="weak platform outcome use" zh="平台 outcome 使用很弱" mode={mode} size={12.2} fill={C.inkSoft} />

          {rect(82, 284, 234, 104, C.white, C.line)}
          {rect(368, 284, 250, 104, C.beniLight, C.beni)}
          {rect(670, 284, 230, 104, C.aiLight, C.ai)}
          {rect(952, 284, 220, 104, C.paper, C.line)}

          <SvgMultiText x={199} y={314} en="4,000 successful couples" zh="4,000 successful couples" mode={mode} size={14.2} fill={C.ai} />
          <SvgMultiText x={199} y={340} en="rich follow-up data" zh="follow-up 很豐富" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={199} y={356} en="but every case is y = 1" zh="但每一筆都是 y = 1" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={493} y={314} en="Why Method C fails" zh="為何 Method C 失敗" mode={mode} size={14.2} fill={C.beni} />
          <SvgMultiText x={493} y={340} en="all positive examples" zh="全部都是正例" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={493} y={356} en="so supervised estimation breaks" zh="所以無法正常估 supervised" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={785} y={314} en="Better possible path" zh="較好的可能路徑" mode={mode} size={14.2} fill={C.ai} />
          <SvgMultiText x={785} y={340} en="use clickstream outcomes y" zh="用 clickstream 當 outcomes y" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={785} y={356} en="messages, replies, time series" zh="訊息、回覆、time series" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={1062} y={314} en="Actual weakness" zh="實際弱點" mode={mode} size={14.2} fill={C.ai} />
          <SvgMultiText x={1062} y={340} en="little tracking and" zh="tracking 太弱，而且" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={1062} y={356} en="little feedback to tuning" zh="feedback 幾乎回不到 tuning" mode={mode} size={12.6} fill={C.inkSoft} />

          <path d="M 1110 164 L 1110 272 L 1062 272" fill="none" stroke={C.beni} strokeWidth="3" strokeDasharray="7 6" markerEnd="url(#ehArrowRed)" />
          <path d="M 785 284 L 785 218 L 700 218 L 700 168" fill="none" stroke={C.ai} strokeWidth="3" strokeDasharray="7 6" markerEnd="url(#ehArrowBlue)" />
          <path d="M 316 336 L 368 336" fill="none" stroke={C.beni} strokeWidth="3" markerEnd="url(#ehArrowRed)" />
          <text x="718" y="208" fontFamily={FONT_BODY} fontSize="12" fontWeight="800" fill={C.ai}>{mode === 'zh' ? '理論上可用 outcome 回訓' : mode === 'bi' ? 'could retrain with outcome / 可回訓' : 'could retrain with outcome'}</text>
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="The exam move is to separate what eHarmony actually did from what it could have done. Actual path: unsupervised similarity from survey data. Better supervised path would have required reliable outcome logging and feedback." zh="考試最關鍵的動作，是把 eHarmony 實際做的，和理論上本來可以做的拆開。實際主路徑是 survey data 的非監督式相似度；若要走更好的 supervised 路徑，就必須有可靠的 outcome logging 與 feedback。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: eHarmony had rich survey X, compressed it into six dimensions, and matched by similarity. The weakness was not no data, but no reliable outcome y and almost no feedback, so learning stayed weak." zh="15 秒講法：eHarmony 有很豐富的 survey X，先壓成六維，再用相似度配對。真正弱點不是沒資料，而是缺可靠的 outcome y，也幾乎沒有 feedback，所以學習很弱。" />
    </FlowVizCard>
  );
}

function GrowFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 3"
      kickerZh="流程圖 3"
      titleEn="Grow: Same Prediction Logic, Different Human-Machine Allocation"
      titleZh="Grow：同一套預測邏輯，不同人機分工配置"
      noteEn="Grow extends Module 5 in a different direction from eHarmony. The same core prediction logic can be embedded into different operating models depending on how much authority the firm gives the machine."
      noteZh="Grow 把 Module 5 往另一個方向延伸。它要說明的是：同一套 prediction logic，可以因為公司願意給機器多少權限，而被嵌進很不同的 operating model。"
      badges={[
        { kind: 'info', en: 'Inputs = 7 core data assets', zh: '輸入 = 7 類核心資料資產' },
        { kind: 'good', en: 'Can be unsupervised or supervised', zh: '可走 unsupervised 或 supervised' },
        { kind: 'warn', en: 'Use case choice changes automation level', zh: 'use case 會改變自動化程度' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 500" role="img" aria-label="Grow flowchart">
          <defs>
            <marker id="grArrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker>
            <marker id="grArrowSoft" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.matsu} /></marker>
          </defs>
          {rect(46, 70, 276, 162, C.aiLight, C.ai)}
          {rect(388, 70, 240, 162, C.kitsuneLight, C.kitsune)}
          {rect(694, 70, 214, 162, C.white, C.line)}
          {rect(972, 56, 198, 104, C.paper, C.kitsune)}
          {rect(972, 196, 198, 104, C.fujiLight, C.fuji)}
          {rect(972, 336, 198, 104, C.matsuLight, C.matsu)}

          <line x1="322" y1="151" x2="388" y2="151" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#grArrow)" />
          <line x1="628" y1="151" x2="694" y2="151" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#grArrow)" />
          <path d="M 908 114 L 940 114 L 940 108 L 972 108" fill="none" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#grArrow)" />
          <path d="M 908 151 L 940 151 L 940 248 L 972 248" fill="none" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#grArrow)" />
          <path d="M 908 188 L 940 188 L 940 388 L 972 388" fill="none" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#grArrow)" />

          <SvgMultiText x={184} y={98} en="Seven core data assets" zh="七類核心資料資產" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={184} y={126} en="peer 360 ratings, self ratings," zh="peer 360、自評、" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={184} y={142} en="personality IAT, evaluator bias," zh="人格 IAT、評分偏誤、" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={184} y={158} en="social graph, historical hiring," zh="社交圖譜、歷史 hiring、" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={184} y={174} en="recruitment outcomes" zh="recruitment outcomes" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={508} y={98} en="Profile / fit engine" zh="Profile / fit engine" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={508} y={126} en="map inputs into 25 dimensions" zh="把 inputs 映射成 25 維" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={508} y={142} en="or weighted fit score ŷ ≈ weights·X" zh="或轉成加權 fit score ŷ ≈ weights·X" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={508} y={158} en="can start hard-coded, then refine" zh="可先 hard-code，再慢慢 refine" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={801} y={98} en="Optional supervised layer" zh="可選的 supervised layer" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={801} y={126} en="fit true weights using hiring" zh="用 hiring / performance outcomes" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={801} y={142} en="or performance outcomes y" zh="去估比較真的 weights" mode={mode} size={12.6} fill={C.inkSoft} />
          <SvgMultiText x={801} y={158} en="feedback improves the next model" zh="feedback 再回修下一輪模型" mode={mode} size={12.6} fill={C.inkSoft} />

          <SvgMultiText x={1071} y={92} en="Septeni" zh="Septeni" mode={mode} size={14.8} fill={C.ai} />
          <SvgMultiText x={1071} y={120} en="AI as Substitute" zh="AI as Substitute" mode={mode} size={13.2} fill={C.fuji} />
          <SvgMultiText x={1071} y={136} en="highest automation" zh="自動化程度最高" mode={mode} size={12.4} fill={C.inkSoft} />

          <SvgMultiText x={1071} y={232} en="ANA" zh="ANA" mode={mode} size={14.8} fill={C.ai} />
          <SvgMultiText x={1071} y={260} en="AI as Screen-In Tool" zh="AI as Screen-In Tool" mode={mode} size={13.2} fill={C.fuji} />
          <SvgMultiText x={1071} y={276} en="confidence score, humans central" zh="加信心分數，人仍在中央" mode={mode} size={12.1} fill={C.inkSoft} />

          <SvgMultiText x={1071} y={372} en="Mitsubishi Corp" zh="Mitsubishi Corp" mode={mode} size={14.8} fill={C.ai} />
          <SvgMultiText x={1071} y={400} en="AI as Network Expander" zh="AI as Network Expander" mode={mode} size={13.2} fill={C.fuji} />
          <SvgMultiText x={1071} y={416} en="social graph widens pipeline" zh="social graph 擴大 pipeline" mode={mode} size={12.1} fill={C.inkSoft} />

          {rect(694, 316, 214, 92, C.aiLight, C.ai)}
          <SvgMultiText x={801} y={348} en="Observed outcomes y" zh="Observed outcomes y" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={801} y={374} en="hiring success, performance" zh="錄用結果、績效結果" mode={mode} size={12.6} fill={C.inkSoft} />
          <path d="M 801 316 L 801 250" fill="none" stroke={C.matsu} strokeWidth="3" markerEnd="url(#grArrowSoft)" />
          <text x="820" y="285" fontFamily={FONT_BODY} fontSize="12" fontWeight="800" fill={C.matsu}>{mode === 'zh' ? 'feedback' : mode === 'bi' ? 'feedback / 回流' : 'feedback'}</text>
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="The exam point is not HR trivia. The exam point is that one prediction architecture can be embedded into very different operating models depending on how much autonomy the firm gives the machine." zh="考試重點不是 HR 細節本身，而是同一套 prediction architecture，可以因為公司賦予機器不同程度的自主性，而嵌進非常不同的 operating model。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: Grow collects many inputs X, turns them into a fit score, and then uses the same prediction logic in three different ways. The real managerial choice is not just the model, but how much of the hiring process the machine should control." zh="15 秒講法：Grow 先收很多輸入 X，把它們轉成 fit score，再把同一套預測邏輯放進三種不同用法。真正的管理選擇，不只是哪個模型，而是要把多少招聘流程交給機器。" />
    </FlowVizCard>
  );
}

function Module5Visuals({ mode }) {
  return (
    <>
      <PredictionFactoryFlowchart mode={mode} />
      <EHarmonyFlowchart mode={mode} />
      <GrowFlowchart mode={mode} />
    </>
  );
}

function LLMFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 4"
      kickerZh="流程圖 4"
      titleEn="LLMs: From Prediction Logic to a General-Purpose Super f(.)"
      titleZh="LLMs：從預測邏輯走到通用型 super f(.)"
      noteEn="Module 6 only makes sense if you keep the bridge to Module 5. An LLM is still a prediction machine, but instead of one narrow f(.) for one task, it trains a much more flexible model that can map prompt-plus-context into many kinds of outputs."
      noteZh="Module 6 只有在你先接回 Module 5 時才會清楚。LLM 仍然是 prediction machine，只是它不再是一個任務一個狹窄的 f(.)，而是把 prompt 加 context 丟進一個更彈性的模型，產生很多類型輸出。"
      badges={[
        { kind: 'info', en: 'Still prediction logic', zh: '本質仍是 prediction logic' },
        { kind: 'good', en: 'One flexible model, many tasks', zh: '一個彈性模型，做很多任務' },
        { kind: 'warn', en: 'Next-word hack creates labels at scale', zh: '下一個字的 hack 讓資料自帶標籤' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 430" role="img" aria-label="LLM flowchart">
          <defs>
            <marker id="m6ArrowA" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker>
            <marker id="m6ArrowB" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.ai} /></marker>
          </defs>
          <text x="42" y="34" fontFamily={FONT_BODY} fontSize="15" fontWeight="800" fill={C.ai}>INFERENCE / RUN TIME</text>
          {rect(48, 70, 230, 102, C.aiLight, C.ai)}
          {rect(330, 70, 282, 102, C.fujiLight, C.fuji)}
          {rect(664, 70, 226, 102, C.kitsuneLight, C.kitsune)}
          {rect(942, 70, 244, 102, C.matsuLight, C.matsu)}
          <line x1="278" y1="121" x2="330" y2="121" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m6ArrowA)" />
          <line x1="612" y1="121" x2="664" y2="121" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m6ArrowA)" />
          <line x1="890" y1="121" x2="942" y2="121" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m6ArrowA)" />

          <SvgMultiText x={163} y={102} en="Prompt + context = X" zh="Prompt + context = X" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={163} y={132} en="question, docs, code," zh="問題、文件、程式碼、" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={163} y={148} en="history, images..." zh="歷史對話、圖片…" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={471} y={100} en="General-purpose model" zh="通用型模型" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={471} y={127} en="super f(.)" zh="super f(.)" mode={mode} size={16} weight={800} fill={C.fuji} />
          <SvgMultiText x={471} y={150} en="foundation model, not one" zh="foundation model，不是只有" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={471} y={166} en="specialized task" zh="單一 specialized task" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={777} y={102} en="Transformer +" zh="Transformer 加上" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={777} y={127} en="tokens / embeddings" zh="tokens / embeddings" mode={mode} size={14.5} weight={800} fill={C.fuji} />
          <SvgMultiText x={777} y={150} en="attention learns long-range" zh="attention 抓長距離關係" mode={mode} size={12.5} fill={C.inkSoft} />
          <SvgMultiText x={777} y={166} en="relations across sequences" zh="跨序列關聯" mode={mode} size={12.5} fill={C.inkSoft} />

          <SvgMultiText x={1064} y={102} en="Generated output ŷ" zh="輸出 ŷ" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={1064} y={130} en="text, code, summary," zh="文字、程式、摘要、" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={1064} y={146} en="translation, image prompt" zh="翻譯、圖片指令" mode={mode} size={12.7} fill={C.inkSoft} />

          <text x="42" y="252" fontFamily={FONT_BODY} fontSize="15" fontWeight="800" fill={C.matsu}>TRAINING / WHY IT WORKS</text>
          {rect(62, 284, 250, 102, C.paper, C.line)}
          {rect(364, 284, 236, 102, C.kitsuneLight, C.kitsune)}
          {rect(652, 284, 236, 102, C.aiLight, C.ai)}
          {rect(940, 284, 232, 102, C.white, C.line)}
          <line x1="312" y1="335" x2="364" y2="335" stroke={C.ai} strokeWidth="3" markerEnd="url(#m6ArrowB)" />
          <line x1="600" y1="335" x2="652" y2="335" stroke={C.ai} strokeWidth="3" markerEnd="url(#m6ArrowB)" />
          <line x1="888" y1="335" x2="940" y2="335" stroke={C.ai} strokeWidth="3" markerEnd="url(#m6ArrowB)" />

          <SvgMultiText x={187} y={316} en="Massive raw text" zh="海量原始文字" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={187} y={343} en="internet, books, code" zh="網路、書籍、程式碼" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={187} y={359} en="mostly unlabeled" zh="多半原本沒有標籤" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={482} y={312} en="The big hack" zh="那個大 hack" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={482} y={339} en="wordᵢ = f(wordᵢ₋₁, …)" zh="wordᵢ = f(wordᵢ₋₁, …)" mode={mode} size={14.6} weight={800} fill={C.fuji} />
          <SvgMultiText x={482} y={360} en="predict next token" zh="預測下一個 token" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={770} y={316} en="Unlabeled → labeled" zh="Unlabeled → labeled" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={770} y={343} en="the data labels itself" zh="資料自己帶出標籤" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={770} y={359} en="at internet scale" zh="而且是 internet scale" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={1056} y={316} en="Result" zh="結果" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={1056} y={343} en="one model can perform" zh="同一個模型可以執行" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={1056} y={359} en="many downstream tasks" zh="很多 downstream 任務" mode={mode} size={12.7} fill={C.inkSoft} />
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="The mental move is: an LLM still follows prediction logic, but it learns a much richer mapping than weak AI. The course keeps asking you to preserve both truths at the same time." zh="真正的心智轉換是：LLM 仍然符合 prediction logic，但它學到的是遠比 weak AI 更豐富的 mapping。這門課一直要你同時保留這兩件事。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: LLMs are still prediction machines. X is now prompt plus context, f(.) is a flexible foundation model, and the training trick is next-token prediction, which turns massive raw text into labeled data." zh="15 秒講法：LLM 仍然是 prediction machine。X 現在是 prompt 加 context，f(.) 變成彈性的 foundation model，而訓練的關鍵 trick 是下一個 token 預測，它把海量原始文字變成自帶標籤的資料。" />
    </FlowVizCard>
  );
}

function EconomicsAgentsFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 5"
      kickerZh="流程圖 5"
      titleEn="Training vs. Inference, Google's Paradox, and Why Agents Matter"
      titleZh="Training vs. Inference、Google 悖論，以及 Agents 為何重要"
      noteEn="Module 6 becomes strategic when you connect cost structure to competitive position. Traditional digital goods push marginal cost toward zero. LLM systems do not. That is why Google's search economics and the move toward agents matter."
      noteZh="Module 6 只有拉回競爭與商業模式時，才算真的讀懂。傳統數位產品的邊際成本會往零靠近，但 LLM 系統不會。這就是為甚麼 Google 搜尋經濟與 agents 轉向都重要。"
      badges={[
        { kind: 'warn', en: 'Training = fixed cost', zh: 'Training = 固定成本' },
        { kind: 'bad', en: 'Inference = real variable cost', zh: 'Inference = 真實變動成本' },
        { kind: 'info', en: 'Agents move the model up the stack', zh: 'Agents 讓模型往上層移動' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 460" role="img" aria-label="LLM economics and agents flowchart">
          <defs>
            <marker id="m6ArrowC" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker>
          </defs>
          {rect(58, 84, 230, 108, C.aiLight, C.ai)}
          {rect(352, 84, 250, 108, C.kitsuneLight, C.kitsune)}
          {rect(666, 84, 246, 108, C.beniLight, C.beni)}
          {rect(976, 84, 212, 108, C.fujiLight, C.fuji)}
          <line x1="288" y1="138" x2="352" y2="138" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m6ArrowC)" />
          <line x1="602" y1="138" x2="666" y2="138" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m6ArrowC)" />
          <line x1="912" y1="138" x2="976" y2="138" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m6ArrowC)" />

          <SvgMultiText x={173} y={112} en="Training" zh="Training" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={173} y={138} en="build the factory" zh="先把工廠蓋起來" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={173} y={154} en="huge upfront fixed cost" zh="巨大的 upfront 固定成本" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={477} y={112} en="Inference" zh="Inference" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={477} y={138} en="run the factory" zh="持續跑工廠" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={477} y={154} en="every query consumes compute" zh="每個 query 都消耗算力" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={789} y={108} en="Google paradox" zh="Google 的悖論" mode={mode} size={15} fill={C.beni} />
          <SvgMultiText x={789} y={136} en="baseline search is very profitable" zh="原本 search 很賺錢" mode={mode} size={12.5} fill={C.inkSoft} />
          <SvgMultiText x={789} y={152} en="but AI search adds real inference cost" zh="但 AI search 會加進真實 inference cost" mode={mode} size={12.5} fill={C.inkSoft} />
          <SvgMultiText x={789} y={168} en="so value creation can hurt value capture" zh="價值創造反而可能傷到 value capture" mode={mode} size={12.5} fill={C.inkSoft} />

          <SvgMultiText x={1082} y={108} en="Agents" zh="Agents" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={1082} y={136} en="observe → think → act" zh="observe → think → act" mode={mode} size={13.5} weight={800} fill={C.fuji} />
          <SvgMultiText x={1082} y={156} en="the model becomes the interface" zh="模型開始往上層變成介面" mode={mode} size={12.4} fill={C.inkSoft} />

          {rect(70, 276, 170, 118, C.white, C.line)}
          {rect(286, 276, 170, 118, C.white, C.line)}
          {rect(502, 276, 170, 118, C.white, C.line)}
          {rect(718, 276, 170, 118, C.white, C.line)}
          {rect(934, 276, 230, 118, C.matsuLight, C.matsu)}
          <line x1="240" y1="335" x2="286" y2="335" stroke={C.ai} strokeWidth="3" markerEnd="url(#m6ArrowC)" />
          <line x1="456" y1="335" x2="502" y2="335" stroke={C.ai} strokeWidth="3" markerEnd="url(#m6ArrowC)" />
          <line x1="672" y1="335" x2="718" y2="335" stroke={C.ai} strokeWidth="3" markerEnd="url(#m6ArrowC)" />
          <line x1="888" y1="335" x2="934" y2="335" stroke={C.ai} strokeWidth="3" markerEnd="url(#m6ArrowC)" />

          <SvgMultiText x={155} y={310} en="Model" zh="Model" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={155} y={334} en="brain" zh="brain" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={155} y={350} en="Claude / GPT / Gemini" zh="Claude / GPT / Gemini" mode={mode} size={12.3} fill={C.inkSoft} />

          <SvgMultiText x={371} y={310} en="Tools" zh="Tools" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={371} y={334} en="browser, files," zh="瀏覽器、檔案、" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={371} y={350} en="apps, APIs" zh="apps、APIs" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={587} y={310} en="Task loop" zh="Task loop" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={587} y={334} en="keep going until" zh="一路做下去，直到" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={587} y={350} en="the job is done" zh="任務完成" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={803} y={310} en="App layer" zh="App layer" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={803} y={334} en="gets thinner" zh="可能被變薄" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={803} y={350} en="or turns into tools" zh="或被降成工具" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={1049} y={305} en="Strategic implication" zh="策略含意" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={1049} y={332} en="LLMs do not just raise capability;" zh="LLM 不只是能力更強；" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={1049} y={348} en="they can rewrite cost curves and" zh="還會改寫成本曲線，並且" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={1049} y={364} en="shift where value is captured" zh="改變價值被誰拿走" mode={mode} size={12.7} fill={C.inkSoft} />
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="This is the clean business-model reading of Module 6: cost structure changes first, then competitive position, then the interface layer. That is why the course places Google and Anthropic after the technical explanation." zh="這才是 Module 6 的商業模式讀法：先看成本結構怎麼變，再看競爭位置怎麼變，最後看介面層怎麼變。因此課程才會在技術原理之後接 Google 與 Anthropic。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: LLMs have huge fixed training cost and real variable inference cost. That can hurt Google's search economics, and once agents combine model, tools, and a task loop, the model can move up the stack and start acting across apps." zh="15 秒講法：LLM 有巨大的訓練固定成本，也有真實存在的推論變動成本。這會衝擊 Google 的搜尋經濟；而當 agents 把 model、tools、task loop 接起來後，模型就會往上層移動，開始跨 app 行動。" />
    </FlowVizCard>
  );
}

function Module6Visuals({ mode }) {
  return (
    <>
      <LLMFlowchart mode={mode} />
      <EconomicsAgentsFlowchart mode={mode} />
    </>
  );
}

function TakeoffFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 6"
      kickerZh="流程圖 6"
      titleEn="Takeoff Logic: Net Benefits, Chicken-and-Egg, and Critical Mass"
      titleZh="Takeoff 邏輯：Net Benefits、Chicken-and-Egg、Critical Mass"
      noteEn="Module 7 is easiest when you keep one chain in mind: awareness and access must exist first, then net benefits must turn positive, then a platform still has to solve the chicken-and-egg problem to reach critical mass."
      noteZh="Module 7 最好記的方法，是把這條鏈一直抓著：先有 awareness 與 access，再讓 net benefits 變正，接著還要解掉 chicken-and-egg，才碰得到 critical mass。"
      badges={[
        { kind: 'info', en: 'Awareness / access comes first', zh: '先有 awareness / access' },
        { kind: 'good', en: 'Net benefits must be positive', zh: 'Net benefits 必須為正' },
        { kind: 'warn', en: 'Takeoff still fails for most platforms', zh: '大多數平臺仍然起飛不了' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 460" role="img" aria-label="Platform takeoff flowchart">
          <defs><marker id="m7ArrowA" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker></defs>
          {rect(52, 84, 186, 92, C.aiLight, C.ai)}
          {rect(286, 84, 230, 92, C.kitsuneLight, C.kitsune)}
          {rect(564, 84, 224, 92, C.fujiLight, C.fuji)}
          {rect(836, 84, 182, 92, C.paper, C.kitsune)}
          {rect(1066, 84, 122, 92, C.matsuLight, C.matsu)}
          <line x1="238" y1="130" x2="286" y2="130" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m7ArrowA)" />
          <line x1="516" y1="130" x2="564" y2="130" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m7ArrowA)" />
          <line x1="788" y1="130" x2="836" y2="130" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m7ArrowA)" />
          <line x1="1018" y1="130" x2="1066" y2="130" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m7ArrowA)" />

          <SvgMultiText x={145} y={112} en="Awareness / access" zh="Awareness / access" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={145} y={140} en="people must know" zh="使用者先要知道、" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={145} y={156} en="and be able to reach it" zh="也要接觸得到" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={401} y={110} en="Net Benefits =" zh="Net Benefits =" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={401} y={136} en="stand-alone + network" zh="stand-alone + network" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={401} y={152} en="benefits - adopter costs" zh="benefits - adopter costs" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={676} y={112} en="Chicken-and-egg" zh="Chicken-and-egg" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={676} y={138} en="early users face the" zh="早期使用者面對的是" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={676} y={154} en="least value, highest friction" zh="最低價值、最高阻力" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={927} y={112} en="Critical mass" zh="Critical mass" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={927} y={140} en="the point where growth" zh="成長開始能夠" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={927} y={156} en="starts feeding itself" zh="自我推進的門檻" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={1127} y={112} en="Takeoff" zh="Takeoff" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={1127} y={142} en="or fail" zh="或失敗" mode={mode} size={13.2} fill={C.matsu} />

          {rect(110, 272, 228, 114, C.white, C.line)}
          {rect(390, 272, 228, 114, C.white, C.line)}
          {rect(670, 272, 228, 114, C.white, C.line)}
          {rect(950, 272, 188, 114, C.white, C.line)}
          <SvgMultiText x={224} y={302} en="Stand-alone benefits" zh="Stand-alone benefits" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={224} y={330} en="LinkedIn free page," zh="像 LinkedIn free page、" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={224} y={346} en="Zillow teaser" zh="Zillow teaser" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={504} y={302} en="Network benefits" zh="Network benefits" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={504} y={330} en="value rises when" zh="別人加入後，價值才" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={504} y={346} en="others join" zh="明顯上升" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={784} y={302} en="Coaxing or coordinating" zh="Coaxing 或 coordinating" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={784} y={330} en="coax one side, or move" zh="不是先 coax 一邊，" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={784} y={346} en="both sides together" zh="就是協調多邊一起動" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={1044} y={302} en="Rocket rule" zh="火箭規則" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={1044} y={330} en="write actual user numbers" zh="critical mass 要寫成" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={1044} y={346} en="for each side" zh="每一邊的實際數字" mode={mode} size={12.7} fill={C.inkSoft} />
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="The quiz move is not to say 'network effects matter.' The quiz move is to show which levers turn net benefits positive, what the exact chicken-and-egg barrier is, and how the platform reaches a concrete critical mass." zh="考試不是只說『network effects 很重要』。真正要做的是指出哪些 lever 會讓 net benefits 變正、雞生蛋蛋生雞的阻礙到底卡在哪裡，以及平臺如何到達具體的 critical mass。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: people need awareness and access first. Then net benefits must be positive. But because early users face weak network benefits, the platform still has to solve the chicken-and-egg problem with coaxing or coordinating until it reaches critical mass." zh="15 秒講法：先讓人知道、接觸得到，再讓 net benefits 變成正數。但早期使用者的 network benefits 很弱，所以平臺還要靠 coaxing 或 coordinating 解掉 chicken-and-egg，直到達到 critical mass。" />
    </FlowVizCard>
  );
}

function SaferTaxiFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 7"
      kickerZh="流程圖 7"
      titleEn="SaferTaxi: Real Value Proposition, Weak Fit Between Scale and Economics"
      titleZh="SaferTaxi：有真實價值主張，但規模與經濟不夠匹配"
      noteEn="SaferTaxi is a good quiz case because it prevents sloppy thinking. The service was not worthless. The problem was that wait-time gains, reachable market, growth tactics, and cost structure did not fit together well enough."
      noteZh="SaferTaxi 很適合考 quiz，因為它能阻止人亂下結論。這個服務不是沒有價值，而是等待時間優勢、可觸及市場、成長戰術與成本結構，彼此之間不夠匹配。"
      badges={[
        { kind: 'good', en: 'Real wait-time advantage', zh: '確實有等待時間優勢' },
        { kind: 'warn', en: 'Smartphone penetration stayed low', zh: '手機滲透率仍偏低' },
        { kind: 'bad', en: 'Revenue needed to grow 10x to break even', zh: '要成長 10 倍才可能打平' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 450" role="img" aria-label="SaferTaxi flowchart">
          <defs><marker id="m7ArrowB" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker></defs>
          {rect(44, 74, 210, 96, C.aiLight, C.ai)}
          {rect(302, 74, 216, 96, C.matsuLight, C.matsu)}
          {rect(566, 74, 222, 96, C.kitsuneLight, C.kitsune)}
          {rect(836, 74, 224, 96, C.paper, C.kitsune)}
          {rect(1084, 74, 112, 96, C.beniLight, C.beni)}
          <line x1="254" y1="122" x2="302" y2="122" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m7ArrowB)" />
          <line x1="518" y1="122" x2="566" y2="122" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m7ArrowB)" />
          <line x1="788" y1="122" x2="836" y2="122" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m7ArrowB)" />
          <line x1="1060" y1="122" x2="1084" y2="122" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m7ArrowB)" />

          <SvgMultiText x={149} y={100} en="Three-city market" zh="三城市市場" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={149} y={127} en="~30M people," zh="約 3,000 萬人口、" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={149} y={143} en="$2.2B taxi market" zh="$2.2B taxi market" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={410} y={100} en="Value proposition" zh="價值主張" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={410} y={127} en="wait time drops to" zh="等待時間降到" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={410} y={143} en="9 / 6 / 12 min" zh="9 / 6 / 12 分鐘" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={677} y={100} en="Reach problem" zh="可觸及市場問題" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={677} y={127} en="smartphone penetration" zh="smartphone penetration" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={677} y={143} en="only 9% to 19%" zh="只有 9% 到 19%" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={948} y={100} en="Growth tactics" zh="成長 tactics" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={948} y={127} en="driver phones, training," zh="司機手機、培訓、" mode={mode} size={12.5} fill={C.inkSoft} />
          <SvgMultiText x={948} y={143} en="corp contracts, events" zh="企業合約、活動" mode={mode} size={12.5} fill={C.inkSoft} />

          <SvgMultiText x={1140} y={100} en="Still" zh="最後仍然" mode={mode} size={15} fill={C.beni} />
          <SvgMultiText x={1140} y={127} en="too small" zh="太小" mode={mode} size={13.5} fill={C.beni} />
          <SvgMultiText x={1140} y={143} en="to scale" zh="難以規模化" mode={mode} size={13.5} fill={C.beni} />

          {rect(116, 260, 236, 112, C.white, C.line)}
          {rect(404, 260, 236, 112, C.white, C.line)}
          {rect(692, 260, 236, 112, C.white, C.line)}
          {rect(980, 260, 176, 112, C.beniLight, C.beni)}
          <SvgMultiText x={234} y={290} en="Cost side" zh="成本端" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={234} y={317} en="~$1M annual spending" zh="每年成本約 $1M" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={234} y={333} en="18 staff, ads, phone subsidy" zh="18 人、廣告、手機補貼" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={522} y={290} en="Current scale" zh="當下規模" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={522} y={317} en="only 46 cabs at one point" zh="一度只有 46 輛車" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={522} y={333} en="hoping for 1,000s" zh="卻希望做到 1,000s" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={810} y={290} en="Revenue implication" zh="收入含意" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={810} y={317} en="needed to grow 10x" zh="至少要再成長 10 倍" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={810} y={333} en="just to break even" zh="才可能碰到損平" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={1068} y={290} en="Diagnosis" zh="診斷" mode={mode} size={14.5} fill={C.beni} />
          <SvgMultiText x={1068} y={317} en="value exists, but" zh="不是沒價值，而是" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={1068} y={333} en="fit is weak" zh="整體 fit 很弱" mode={mode} size={12.7} fill={C.inkSoft} />
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="The strong answer is not 'SaferTaxi should just market harder.' The strong answer is that the service may need a smaller, sharper, more reachable positioning because the current growth logic does not fit the market and cost realities." zh="真正強的答案不是『SaferTaxi 再多做一點行銷就好』。真正強的是指出：它可能需要更小、更準、更可觸及的定位，因為現在這套成長邏輯和市場條件、成本條件並不匹配。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: SaferTaxi had a real wait-time advantage, but smartphone reach stayed low and costs were too high for current scale. The issue was not zero value, but a weak fit between scale, reach, and economics." zh="15 秒講法：SaferTaxi 確實有等待時間優勢，但手機可觸及市場太小，成本又太高。問題不是沒有價值，而是規模、可觸及市場、經濟性之間的 fit 太弱。" />
    </FlowVizCard>
  );
}

function Module7Visuals({ mode }) {
  return (
    <>
      <TakeoffFlowchart mode={mode} />
      <SaferTaxiFlowchart mode={mode} />
    </>
  );
}

function CompetitionFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 8"
      kickerZh="流程圖 8"
      titleEn="Platform Competition: Multiple Equilibria, Tipping, and the WTA Test"
      titleZh="平臺競爭：多重均衡、Tipping、與 WTA 測試"
      noteEn="Module 8 starts where Module 7 leaves off. Once adoption is possible, platform competition asks which equilibrium the market tips toward. That is why the WTA test matters."
      noteZh="Module 8 是從 Module 7 接下去的。當 adoption 已經可能成立後，平臺競爭真正要問的是：市場最後會 tip 到哪個 equilibrium。這就是為甚麼 WTA 測試重要。"
      badges={[
        { kind: 'info', en: 'More than one stable outcome', zh: '不只一個穩定結果' },
        { kind: 'warn', en: 'Small early lead can compound', zh: '早期小優勢可能快速複合' },
        { kind: 'good', en: 'Use all three WTA conditions together', zh: 'WTA 三條件要一起看' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 450" role="img" aria-label="Platform competition flowchart">
          <defs><marker id="m8ArrowA" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker></defs>
          {rect(68, 96, 180, 100, C.paper, C.line)}
          {rect(310, 72, 206, 96, C.aiLight, C.ai)}
          {rect(310, 214, 206, 96, C.fujiLight, C.fuji)}
          {rect(588, 96, 214, 100, C.kitsuneLight, C.kitsune)}
          {rect(864, 72, 304, 238, C.white, C.line)}
          <path d="M 248 145 C 272 145, 284 126, 310 120" fill="none" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowA)" />
          <path d="M 248 145 C 272 170, 284 248, 310 262" fill="none" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowA)" />
          <line x1="516" y1="120" x2="588" y2="120" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowA)" />
          <line x1="516" y1="262" x2="588" y2="170" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowA)" />
          <line x1="802" y1="145" x2="864" y2="145" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowA)" />

          <SvgMultiText x={158} y={124} en="Non-adoption" zh="Non-adoption" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={158} y={150} en="starting equilibrium" zh="起始均衡" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={158} y={166} en="nobody has tipped yet" zh="市場還沒被推向任何一邊" mode={mode} size={12.3} fill={C.inkSoft} />

          <SvgMultiText x={413} y={105} en="Platform α wins" zh="Platform α 勝" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={413} y={131} en="one adoption equilibrium" zh="其中一個 adoption equilibrium" mode={mode} size={12.4} fill={C.inkSoft} />
          <SvgMultiText x={413} y={247} en="Platform β wins" zh="Platform β 勝" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={413} y={273} en="another possible equilibrium" zh="另一個可能均衡" mode={mode} size={12.4} fill={C.inkSoft} />

          <SvgMultiText x={695} y={124} en="Path dependence" zh="Path dependence" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={695} y={150} en="small early lead can" zh="早期小領先會" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={695} y={166} en="become lasting dominance" zh="放大成持久優勢" mode={mode} size={12.7} fill={C.inkSoft} />

          <SvgMultiText x={1016} y={104} en="Winner-take-all test" zh="WTA 測試" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={1016} y={140} en="1. Strong scale effects" zh="1. Strong scale effects" mode={mode} size={13.5} fill={C.inkSoft} />
          <SvgMultiText x={1016} y={168} en="2. Little room for differentiation" zh="2. 差異化空間要夠小" mode={mode} size={13.5} fill={C.inkSoft} />
          <SvgMultiText x={1016} y={196} en="3. High switching / multi-home costs" zh="3. Switching / multi-home costs 要高" mode={mode} size={13.5} fill={C.inkSoft} />
          <SvgMultiText x={1016} y={234} en="Only if all three are strong" zh="只有三個都強" mode={mode} size={13.5} fill={C.fuji} />
          <SvgMultiText x={1016} y={254} en="does the clean WTA story hold" zh="才比較接近乾淨的 WTA" mode={mode} size={13.5} fill={C.fuji} />
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="The core diagnostic move is to distinguish 'platform competition is dynamic' from 'this market is actually WTA.' Multiple equilibria make outcomes path dependent, but the clean WTA claim still requires all three structural conditions." zh="核心判斷動作，是把『平臺競爭有動態』與『這個市場真的屬於 WTA』分開。多重均衡會讓結果變得路徑依賴，但要下乾淨的 WTA 結論，仍然必須三個結構條件都成立。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: platform competition can tip toward different equilibria, so small early leads matter. But to call the market winner-take-all, you still need all three conditions: strong scale effects, little differentiation room, and high switching or multi-homing costs." zh="15 秒講法：平臺競爭可能 tip 向不同均衡，所以早期小領先很重要。但若要把市場判成 winner-take-all，仍然要三條件一起成立：強規模效應、小差異化空間、高 switching 或 multi-homing 成本。" />
    </FlowVizCard>
  );
}

function UberChinaFlowchart({ mode }) {
  const rect = (x, y, w, h, fill, stroke = C.line) => <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  return (
    <FlowVizCard
      mode={mode}
      kickerEn="Flowchart 9"
      kickerZh="流程圖 9"
      titleEn="Uber China: Fought Like WTA, Landed in War of Attrition"
      titleZh="Uber China：照 WTA 打，結果更像 War of Attrition"
      noteEn="Uber China is the test case for false WTA. The firms invested as if the market would tip to one winner, but the course material argues that only two of the three WTA conditions were strong."
      noteZh="Uber China 是辨認 false WTA 的測試案例。雙方都照著會 tip 向單一贏家的邏輯砸資源，但課內材料認為三個 WTA 條件裡，其實只有兩個夠強。"
      badges={[
        { kind: 'good', en: 'Scale effects = yes', zh: 'Scale effects = yes' },
        { kind: 'warn', en: 'Differentiation = debatable', zh: 'Differentiation = debatable' },
        { kind: 'bad', en: 'Switching costs = low', zh: 'Switching costs = low' },
      ]}
    >
      <div className="dia flow-svg">
        <svg viewBox="0 0 1240 450" role="img" aria-label="Uber China flowchart">
          <defs><marker id="m8ArrowB" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={C.kitsune} /></marker></defs>
          {rect(74, 82, 210, 104, C.matsuLight, C.matsu)}
          {rect(326, 82, 230, 104, C.kitsuneLight, C.kitsune)}
          {rect(598, 82, 210, 104, C.beniLight, C.beni)}
          {rect(850, 82, 170, 104, C.paper, C.kitsune)}
          {rect(1060, 82, 126, 104, C.aiLight, C.ai)}
          <line x1="284" y1="134" x2="326" y2="134" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowB)" />
          <line x1="556" y1="134" x2="598" y2="134" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowB)" />
          <line x1="808" y1="134" x2="850" y2="134" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowB)" />
          <line x1="1020" y1="134" x2="1060" y2="134" stroke={C.kitsune} strokeWidth="3" markerEnd="url(#m8ArrowB)" />

          <SvgMultiText x={179} y={111} en="Strong scale effects" zh="Strong scale effects" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={179} y={139} en="yes" zh="是" mode={mode} size={14.5} weight={800} fill={C.matsu} />
          <SvgMultiText x={179} y={158} en="more drivers, faster pickups," zh="司機更多、接得更快、" mode={mode} size={12.3} fill={C.inkSoft} />
          <SvgMultiText x={179} y={174} en="coverage and demand reinforce" zh="coverage 與 demand 互相增強" mode={mode} size={12.3} fill={C.inkSoft} />

          <SvgMultiText x={441} y={111} en="Little room for differentiation" zh="Little room for differentiation" mode={mode} size={14.2} fill={C.ai} />
          <SvgMultiText x={441} y={139} en="debatable" zh="有爭議" mode={mode} size={14.5} weight={800} fill={C.kitsune} />
          <SvgMultiText x={441} y={158} en="some room still existed" zh="仍有一些定位空間" mode={mode} size={12.3} fill={C.inkSoft} />
          <SvgMultiText x={441} y={174} en="so not a clean WTA case" zh="所以不是乾淨的 WTA" mode={mode} size={12.3} fill={C.inkSoft} />

          <SvgMultiText x={703} y={111} en="Switching / multi-home costs" zh="Switching / multi-home costs" mode={mode} size={14.2} fill={C.ai} />
          <SvgMultiText x={703} y={139} en="low" zh="低" mode={mode} size={14.5} weight={800} fill={C.beni} />
          <SvgMultiText x={703} y={158} en="riders and drivers could" zh="乘客與司機都能" mode={mode} size={12.3} fill={C.inkSoft} />
          <SvgMultiText x={703} y={174} en="multi-home too easily" zh="太容易 multi-home" mode={mode} size={12.3} fill={C.inkSoft} />

          <SvgMultiText x={935} y={111} en="Result" zh="結果" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={935} y={139} en="war of attrition" zh="war of attrition" mode={mode} size={13.8} weight={800} fill={C.fuji} />
          <SvgMultiText x={935} y={158} en="not clean tipping" zh="不是乾淨 tipping" mode={mode} size={12.3} fill={C.inkSoft} />

          <SvgMultiText x={1123} y={111} en="Exit" zh="結局" mode={mode} size={15} fill={C.ai} />
          <SvgMultiText x={1123} y={139} en="Didi buys" zh="Didi 買下" mode={mode} size={12.8} fill={C.inkSoft} />
          <SvgMultiText x={1123} y={155} en="Uber China" zh="Uber China" mode={mode} size={12.8} fill={C.inkSoft} />

          {rect(146, 270, 278, 112, C.white, C.line)}
          {rect(480, 270, 278, 112, C.white, C.line)}
          {rect(814, 270, 278, 112, C.white, C.line)}
          <SvgMultiText x={285} y={300} en="What firms assumed" zh="企業實際假設" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={285} y={328} en="get-big-fast, spend hard, win the market" zh="先搶到規模、重砸資源、把市場拿下" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={619} y={300} en="What the course says" zh="課堂真正要你說的" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={619} y={328} en="fighting like WTA is not the same as" zh="照 WTA 打，不等於市場本身就是" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={619} y={344} en="actually being in a WTA market" zh="真正的 WTA 市場" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={953} y={300} en="Anchor numbers" zh="數字錨點" mode={mode} size={14.5} fill={C.ai} />
          <SvgMultiText x={953} y={328} en="Didi ≈ $35B valuation," zh="Didi 估值約 $35B，" mode={mode} size={12.7} fill={C.inkSoft} />
          <SvgMultiText x={953} y={344} en="Uber stake 17.7%, payoff ≈ $6.2B" zh="Uber 持股 17.7%，payoff 約 $6.2B" mode={mode} size={12.7} fill={C.inkSoft} />
        </svg>
      </div>
      <div className="flow-caption"><T m={mode} en="This is the line to keep straight in the quiz: Uber and Didi competed under a WTA assumption, but the market failed the full three-condition test. That is why the stronger label is war of attrition, not clean network tipping." zh="這是 quiz 最容易混掉的一句：Uber 與 Didi 的確照 WTA 邏輯競爭，但市場本身沒有通過完整三條件測試，所以更強的標籤是 war of attrition，而不是乾淨的 network tipping。" /></div>
      <FlowOral mode={mode} en="In 15 seconds: Uber China had strong scale effects, but switching costs were low and differentiation was still possible. So the firms fought like it was winner-take-all, but the market itself looked more like a costly war of attrition." zh="15 秒講法：Uber China 確實有強規模效應，但 switching costs 很低，差異化空間也沒有完全消失。所以雙方雖然照 winner-take-all 打，市場本身其實更像昂貴的 war of attrition。" />
    </FlowVizCard>
  );
}

function Module8Visuals({ mode }) {
  return (
    <>
      <CompetitionFlowchart mode={mode} />
      <UberChinaFlowchart mode={mode} />
    </>
  );
}

function FormulaStrip({ mode }) {
  return (
    <div className="formula-grid">
      {formulaCards.map((f, i) => (
        <div className="formula-card" key={i}>
          <div className="formula-label"><T m={mode} en={f.labelEn} zh={f.labelZh} /></div>
          <div className="formula-text">{f.formula}</div>
          <div>
            <div className="formula-sub"><T m={mode} en="Read it as" zh="先這樣讀" /></div>
            <div className="formula-copy"><T m={mode} en={f.readEn} zh={f.readZh} /></div>
          </div>
          <div>
            <div className="formula-sub"><T m={mode} en="Formula logic" zh="公式邏輯" /></div>
            <div className="formula-copy"><T m={mode} en={f.logicEn} zh={f.logicZh} /></div>
          </div>
          <div className="formula-example">
            <div className="formula-sub"><T m={mode} en="How to apply it" zh="怎麼用" /></div>
            <div className="formula-copy"><T m={mode} en={f.applyEn} zh={f.applyZh} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PrimerSection({ mode }) {
  return (
    <section className="sec" id="primer">
      <div className="sec-head">
        <div>
          <div className="kicker kicker-teal"><T m={mode} en="Primer" zh="基礎概念" /></div>
          <h2 className="h2"><T m={mode} en="Read This Before y, X, f(.)" zh="在 y、X、f(.) 之前，先看這一段" /></h2>
        </div>
        <span className="sec-source"><T m={mode} en="Professor formulas and logic" zh="教授公式與邏輯" /></span>
      </div>
      <div className="primer-grid">
        <div className="card">
          <h3 className="h3" style={{ marginBottom: 10 }}><T m={mode} en="What each symbol means" zh="每個符號代表甚麼" /></h3>
          <div className="primer-terms">
            {primerTerms.map((t, i) => (
              <div className="term-card" key={i}>
                <div className="term-sym">{t.sym}</div>
                <div className="term-head"><T m={mode} en={t.headEn} zh={t.headZh} /></div>
                <div className="term-body"><T m={mode} en={t.bodyEn} zh={t.bodyZh} /></div>
                <div className="term-note"><T m={mode} en={t.noteEn} zh={t.noteZh} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flow-card">
          <div className="kicker kicker-red"><T m={mode} en="How they connect" zh="它們如何串起來" /></div>
          <h3 className="h3" style={{ marginBottom: 8 }}><T m={mode} en="The course's logic in one flow" zh="這門課真正要你記住的流程" /></h3>
          <div className="eq">Decision Z → target y → inputs X → model f(.) → prediction ŷ → decision rule → action</div>
          <div className="flow-list">
            <div className="flow-step"><div className="flow-num">1</div><div className="flow-text"><T m={mode} en="Start with the decision. What do you want the system to do automatically?" zh="先從決策開始。你到底要系統自動做甚麼？" /></div></div>
            <div className="flow-step"><div className="flow-num">2</div><div className="flow-text"><T m={mode} en="Choose y. What real outcome would make that decision intelligent?" zh="再選 y。甚麼真實結果，會讓那個決策變得聰明？" /></div></div>
            <div className="flow-step"><div className="flow-num">3</div><div className="flow-text"><T m={mode} en="List X. What can the platform actually observe in time to help?" zh="再列 X。平臺手上實際有甚麼可及時觀測的訊號？" /></div></div>
            <div className="flow-step"><div className="flow-num">4</div><div className="flow-text"><T m={mode} en="Only then choose f(.). Use a rule or model to convert X into ŷ." zh="最後才選 f(.)。用規則或模型把 X 轉成 ŷ。" /></div></div>
            <div className="flow-step"><div className="flow-num">5</div><div className="flow-text"><T m={mode} en="Apply the decision rule. If ŷ crosses the threshold, trigger the action." zh="接著套入決策規則。若 ŷ 過門檻，就觸發行動。" /></div></div>
          </div>
          <div className="primer-mini">
            <strong><T m={mode} en="Mini example" zh="極短例子" /></strong>
            <div className="term-note" style={{ marginTop: 6 }}>
              <T m={mode}
                en="Recommend a match → y = probability of mutual reply or continued conversation → X = profile traits, clickstream, and dyad inputs such as {X_man, X_woman} → f(.) = heuristic or trained model → ŷ = predicted match quality → if ŷ is high enough, surface the match."
                zh="推薦一個配對 → y = 互相回覆或持續對話的機率 → X = 個人特徵、clickstream，以及像 {X_男, X_女} 這種 dyad 輸入 → f(.) = heuristic 或訓練過的模型 → ŷ = 預測 match quality → 若 ŷ 夠高，就把這個配對推上去。"
              />
            </div>
          </div>
        </div>
      </div>
      <FormulaStrip mode={mode} />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function INNO6230QuizV14() {
  const [mode, setMode] = useState("en");
  const [fabOpen, setFabOpen] = useState(false);
  const [activeId, setActiveId] = useState("backbone");
  const fabRef = useRef(null);

  const navItems = useMemo(() => [
    { id: "primer", en: "Primer: y / X / f(.)", zh: "先讀：y / X / f(.)" },
    { id: "backbone", en: "16-Sentence Backbone", zh: "16 句主幹" },
    { id: "module-5", en: "M5: Prediction Factories", zh: "M5：Prediction Factories" },
    { id: "module-6", en: "M6: Road to General AI", zh: "M6：邁向通用 AI" },
    { id: "module-7", en: "M7: Platform Takeoff", zh: "M7：平臺起飛" },
    { id: "module-8", en: "M8: Platform Competition", zh: "M8：平臺競爭" },
    { id: "final", en: "Final Review", zh: "最後複習" },
  ], []);

  const caseTraps = useMemo(() => [
    { id: "module-5", en: "eHarmony: rich survey, weak learning loop", zh: "eHarmony：問卷豐富，學習迴路弱" },
    { id: "module-6", en: "Google: inference cost can flip search economics", zh: "Google：推論成本可能翻轉搜尋經濟" },
    { id: "module-7", en: "SaferTaxi: value exists, but scale and reach do not fit", zh: "SaferTaxi：有價值，但規模與可觸及市場不配" },
    { id: "module-8", en: "Uber China: fought like WTA, but market was not fully WTA", zh: "Uber China：照 WTA 打，市場卻非完全 WTA" },
  ], []);

  const scrollTo = useCallback((id) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: [0.12, 0.3, 0.55] }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (fabRef.current && !fabRef.current.contains(event.target)) setFabOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  return (
    <div className="app">
      <style>{css}</style>
      <div className="shell">

        {/* ════ HERO ════ */}
        <header className="hero">
          <div className="hero-meta">
            <span className="pill"><T m={mode} en="Modules 5 to 8" zh="模組 5 到 8" /></span>
            <span className="pill"><T m={mode} en="Prediction factories" zh="Prediction Factories" /></span>
            <span className="pill"><T m={mode} en="LLMs and economics" zh="LLMs 與經濟學" /></span>
            <span className="pill"><T m={mode} en="Takeoff and platform wars" zh="起飛與平臺戰" /></span>
          </div>
          <h1 className="h1"><T m={mode} en="INNO6230 Quiz Guide" zh="INNO6230 Quiz 重點總覽" /></h1>
          <p className="hero-sub">
            <T m={mode}
              en="Start from the causal chain, then move into the four anchor cases, the numbers that shift the diagnosis, and the lines most worth memorizing before the quiz."
              zh="先從因果鏈讀起，再進入四個最關鍵案例、會改變診斷的數字，以及考前最值得背的句子。"
            />
          </p>

          {/* ── Causal Chain ── */}
          <div className="card mt-hero">
            <div className="kicker kicker-plum"><T m={mode} en="Backbone" zh="主幹" /></div>
            <h3 className="h3" style={{ marginBottom: 12 }}><T m={mode} en="Causal Chain" zh="因果鏈骨架" /></h3>
            <p className="body" style={{ marginBottom: 12 }}>
              <T m={mode}
                en="The cleanest organizing spine is this causal chain. The quiz tests framework application, not just definitions."
                zh="最穩的主軸不是按檔名，而是這條邏輯鏈。Quiz 考的是 framework 應用，不只考定義。"
              />
            </p>
            <div className="chain-grid">
              {chainSteps.map((s, i) => (
                <div className="chain-card" key={i}>
                  <div className="chain-kicker">{s.mod}</div>
                  <div className="chain-head"><T m={mode} en={s.en} zh={s.zh} /></div>
                  <div className="chain-body"><T m={mode} en={s.descEn} zh={s.descZh} /></div>
                </div>
              ))}
            </div>
            <div className="chain-arrows">
              {Array.from({ length: 6 }).map((_, i) => <div className="chain-arrow" key={i}>{"\u2192"}</div>)}
            </div>
          </div>

          {/* ── Scan Board ── */}
          <div className="scan-grid">
            <div className="scan">
              <div className="kicker kicker-teal"><T m={mode} en="Full-map view" zh="全局地圖" /></div>
              <h3 className="h3"><T m={mode} en="Module-to-Question Map" zh="模組與問題對照" /></h3>
              <Html m={mode} en={`<div class="tbl-wrap">${modMapTableEn}</div>`} zh={`<div class="tbl-wrap">${modMapTableZh}</div>`} />
            </div>
            <div className="scan">
              <div className="kicker kicker-red"><T m={mode} en="Case comparison" zh="案例比較" /></div>
              <h3 className="h3"><T m={mode} en="Four Anchor Cases" zh="四個核心案例" /></h3>
              <Html m={mode} en={`<div class="tbl-wrap">${caseMapTableEn}</div>`} zh={`<div class="tbl-wrap">${caseMapTableZh}</div>`} />
            </div>
            <div className="scan">
              <div className="kicker kicker-gold"><T m={mode} en="Number anchors" zh="數字錨點" /></div>
              <h3 className="h3"><T m={mode} en="Six Figures Worth Keeping" zh="六個最值得記的數字" /></h3>
              <div className="g2-keep">
                {(mode === "zh" ? anchorMetricsZh : anchorMetricsEn).map((m2, i) => (
                  <div className="met" key={i}>
                    <div className="met-label">{m2.label}</div>
                    <div className="met-val">{m2.val}</div>
                    <div className="met-note">{m2.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ════ LAYOUT ════ */}
        <div className="layout">
          <aside className="sidebar">
            <nav className="nav-box">
              <div className="kicker kicker-plum"><T m={mode} en="Jump to Section" zh="快速跳轉" /></div>
              <div className="nav-list">
                {navItems.map(n => (
                  <button
                    key={n.id}
                    type="button"
                    className={`nav-item${activeId === n.id ? " active" : ""}`}
                    onClick={() => scrollTo(n.id)}
                  >
                    <T m={mode} en={n.en} zh={n.zh} />
                  </button>
                ))}
              </div>
            </nav>
            <div className="nav-box">
              <div className="kicker kicker-red"><T m={mode} en="Case Traps" zh="案例陷阱" /></div>
              <div className="nav-list">
                {caseTraps.map((ct, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`nav-item${activeId === ct.id ? " active" : ""}`}
                    onClick={() => scrollTo(ct.id)}
                  >
                    <T m={mode} en={ct.en} zh={ct.zh} />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="main">
            <PrimerSection mode={mode} />

            {/* ── Backbone ── */}
            <section className="sec" id="backbone">
              <div className="sec-head">
                <div>
                  <div className="kicker kicker-gold"><T m={mode} en="Backbone" zh="主幹" /></div>
                  <h2 className="h2"><T m={mode} en="Sixteen Sentences to Memorize" zh="考前最後 16 句主幹" /></h2>
                </div>
                <span className="sec-source"><T m={mode} en="Quiz core" zh="Quiz 核心" /></span>
              </div>
              <div className="bb-grid">
                {backbone.map((b, i) => (
                  <div className="bb" key={i}>
                    <div className="bb-num"><T m={mode} en={`Core ${i + 1}`} zh={`核心 ${i + 1}`} /></div>
                    {(mode === "en" || mode === "bi") && <div className="bb-en">{b.en}</div>}
                    {(mode === "zh" || mode === "bi") && <div className="bb-zh">{b.zh}</div>}
                  </div>
                ))}
              </div>
            </section>

            {/* ── Module 5 ── */}
            <Section id="module-5" kicker="Module 5" mode={mode}
              title={{ en: "Building Prediction Factories", zh: "建構 Prediction Factories" }}
              source={{ en: "Lecture notes and slides", zh: "課堂 notes 與 slides" }}
              quote={{ en: "Prediction is constrained first by observability, not by model sophistication.", zh: "預測的第一限制不是模型多高級，而是可觀測性。" }}
              lensContent={<LensMiniCards items={sectionLensData["module-5"].items} mode={mode} titleEn={sectionLensData["module-5"].titleEn} titleZh={sectionLensData["module-5"].titleZh} />}
              blocks={mod5Blocks}
              scanData={sectionScanData["module-5"]}
              visual={<Module5Visuals mode={mode} />}
            />

            {/* ── Module 6 ── */}
            <Section id="module-6" kicker="Module 6" mode={mode}
              title={{ en: "Road to General AI, LLMs", zh: "邁向通用 AI 與 LLMs" }}
              source={{ en: "Lecture notes and slides", zh: "課堂 notes 與 slides" }}
              quote={{ en: "Weak AI means one model for one task. LLMs shift toward a highly flexible general-purpose super f(.).", zh: "弱 AI 是一個任務一個模型。LLM 則把事情推向高度彈性的通用 super f(.)。" }}
              lensContent={<LensTable data={sectionLensData["module-6"]} mode={mode} />}
              blocks={mod6Blocks}
              scanData={sectionScanData["module-6"]}
              visual={<Module6Visuals mode={mode} />}
            />

            {/* ── Module 7 ── */}
            <Section id="module-7" kicker="Module 7" mode={mode}
              title={{ en: "Platform Early Growth and Takeoff", zh: "平臺早期成長與起飛" }}
              source={{ en: "Primary quiz source", zh: "主要 quiz 來源" }}
              quote={{ en: "Critical mass requires net benefits above adoption cost.", zh: "要先讓淨效益壓過採用成本，才摸得到 critical mass。" }}
              lensContent={<LensMiniCards items={sectionLensData["module-7"].items} mode={mode} titleEn={sectionLensData["module-7"].titleEn} titleZh={sectionLensData["module-7"].titleZh} />}
              blocks={mod7Blocks}
              scanData={sectionScanData["module-7"]}
              visual={<Module7Visuals mode={mode} />}
            />

            {/* ── Module 8 ── */}
            <Section id="module-8" kicker="Module 8" mode={mode}
              title={{ en: "Platform Competition", zh: "平臺競爭" }}
              source={{ en: "Primary quiz source", zh: "主要 quiz 來源" }}
              quote={{ en: "Platform competition is not only about who has the better position. It is also about which equilibrium the market tips toward.", zh: "平臺競爭不是只問誰位置比較好，還要問市場最後會 tip 到哪個 equilibrium。" }}
              lensContent={<LensWTA data={sectionLensData["module-8"]} mode={mode} />}
              blocks={mod8Blocks}
              scanData={sectionScanData["module-8"]}
              visual={<Module8Visuals mode={mode} />}
            />

            {/* ── Final Review ── */}
            <section className="sec" id="final">
              <div className="sec-head">
                <div>
                  <div className="kicker kicker-green"><T m={mode} en="Final review" zh="最後複習" /></div>
                  <h2 className="h2"><T m={mode} en="Ten-Minute Quiz Cram" zh="考前 10 分鐘版" /></h2>
                </div>
                <span className="sec-source"><T m={mode} en="Last pass only" zh="最後一輪" /></span>
              </div>

              <div className="final10-grid">
                <div className="final10-card">
                  <div className="final10-time"><T m={mode} en="10 to 8 minutes" zh="第 10 到 8 分鐘" /></div>
                  <div className="final10-head"><T m={mode} en="Lock the backbone" zh="先鎖主幹" /></div>
                  <div className="final10-copy"><T m={mode} en="Say the causal chain out loud: data assets to y/X/f(.) to prediction factory to LLM economics to takeoff to WTA test. Then recite the 16 backbone lines once without looking." zh="先把因果鏈念出來：資料資產到 y/X/f(.)，再到 prediction factory、LLM 經濟學、takeoff、WTA 測試。接著不看稿念一次 16 句 backbone。" /></div>
                </div>
                <div className="final10-card">
                  <div className="final10-time"><T m={mode} en="8 to 5 minutes" zh="第 8 到 5 分鐘" /></div>
                  <div className="final10-head"><T m={mode} en="Run the four anchor cases" zh="跑四個核心案例" /></div>
                  <div className="final10-copy"><T m={mode} en="Do not reread everything. Force each case into one line: eHarmony equals rich X and weak feedback. Google equals AI can improve value but hurt capture. SaferTaxi equals value exists but scale fit fails. Uber China equals fought like WTA but was not fully WTA." zh="不要重讀全部內容，強迫每個案例壓成一句：eHarmony 等於 X 很豐富但 feedback 弱。Google 等於 AI 可提升價值卻可能傷到 capture。SaferTaxi 等於有價值但規模不配。Uber China 等於照 WTA 打，但未必真是 WTA。" /></div>
                </div>
                <div className="final10-card">
                  <div className="final10-time"><T m={mode} en="5 to 2 minutes" zh="第 5 到 2 分鐘" /></div>
                  <div className="final10-head"><T m={mode} en="Hit the formulas" zh="再掃公式" /></div>
                  <div className="final10-copy"><T m={mode} en="Say what each one means and does: ŷ = f(X), Decision Rule, Net Benefits, and wordᵢ = f(wordᵢ₋₁, …). If you cannot explain the logic in plain language, you do not own it yet." zh="把每個公式的意思與用途說出來：ŷ = f(X)、Decision Rule、Net Benefits、wordᵢ = f(wordᵢ₋₁, …)。若還不能用白話講出來，就代表還沒真正掌握。" /></div>
                </div>
                <div className="final10-card">
                  <div className="final10-time"><T m={mode} en="2 to 0 minutes" zh="最後 2 分鐘" /></div>
                  <div className="final10-head"><T m={mode} en="Avoid the fatal mistakes" zh="避開致命誤答" /></div>
                  <div className="final10-copy"><T m={mode} en="Do not confuse data richness with learning quality. Do not call every platform war WTA. Do not discuss GenAI only in terms of capability. Do not diagnose takeoff without sides and critical-mass numbers." zh="不要把資料豐富當成學習能力強。不要把所有平臺戰都判成 WTA。不要只談 GenAI 能力不談 economics。不要在沒寫 sides 與 critical-mass 數字前就談 takeoff。" /></div>
                </div>
              </div>

              <div className="card" style={{ marginTop: 14 }}>
                <h3 className="h3" style={{ marginBottom: 10 }}><T m={mode} en="Four cases in one glance" zh="四個案例一眼看完" /></h3>
                <div className="final10-table">
                  <div className="final10-th"><T m={mode} en="Case" zh="案例" /></div>
                  <div className="final10-th"><T m={mode} en="One-line diagnosis" zh="一句診斷" /></div>
                  <div className="final10-th"><T m={mode} en="Anchor detail" zh="錨點細節" /></div>

                  <div className="final10-td"><strong>eHarmony</strong></div>
                  <div className="final10-td"><T m={mode} en="Rich survey X, but weak feedback and little scope for learning." zh="問卷 X 很豐富，但 feedback 弱，學習空間很小。" /></div>
                  <div className="final10-td"><T m={mode} en="4,000 successful couples are all y = 1. Six dimensions compress the survey." zh="4,000 successful couples 全是 y = 1。大量問卷被壓成六維。" /></div>

                  <div className="final10-td"><strong>Google</strong></div>
                  <div className="final10-td"><T m={mode} en="LLMs create value, but real inference cost can damage search economics." zh="LLM 會創造價值，但真實推論成本會傷搜尋經濟。" /></div>
                  <div className="final10-td"><T m={mode} en="Baseline profit about $27.5B versus an illustrative -$150.5B AI-search scenario." zh="baseline 利潤約 $27.5B，AI 搜尋示意情境可掉到 -$150.5B。" /></div>

                  <div className="final10-td"><strong>SaferTaxi</strong></div>
                  <div className="final10-td"><T m={mode} en="The offer had value, but scale, smartphone reach, and cost structure did not fit." zh="價值主張有力，但規模、手機滲透與成本結構不配。" /></div>
                  <div className="final10-td"><T m={mode} en="About a $2.2B market, smartphone penetration only 9% to 19%, and revenue needed to grow about 10 times to break even." zh="市場約 $2.2B，手機滲透率只有 9% 到 19%，而且營收約要再長 10 倍才可能打平。" /></div>

                  <div className="final10-td"><strong>Uber China</strong></div>
                  <div className="final10-td"><T m={mode} en="The battle looked WTA, but low switching and multi-homing costs made it closer to attrition." zh="戰爭看起來像 WTA，但低 switching 與 multi-homing costs 使它更像 attrition。" /></div>
                  <div className="final10-td"><T m={mode} en="Only 2 of 3 WTA conditions were strong. Didi later bought Uber China, and Uber kept 17.7%." zh="WTA 三條件只強了 2 個。之後 Didi 買下 Uber China，Uber 保留 17.7%。" /></div>
                </div>
              </div>

              <div className="final10-say">
                <div className="say-card blue">
                  <div className="say-kicker"><T m={mode} en="Say these out loud" zh="要能直接講出口" /></div>
                  <ul className="say-list">
                    <li><T m={mode} en="Prediction is constrained by observability." zh="Prediction 先受限於 observability。" /></li>
                    <li><T m={mode} en="Choose decision and y before f(.)." zh="先決策與 y，再談 f(.)。" /></li>
                    <li><T m={mode} en="A prediction factory needs live use, train/test refinement, and feedback." zh="Prediction factory 要有 live use、train/test refinement、feedback。" /></li>
                    <li><T m={mode} en="LLMs are still prediction machines, but with a general-purpose super f(.)." zh="LLM 仍是 prediction machine，只是換成通用 super f(.)。" /></li>
                  </ul>
                </div>
                <div className="say-card red">
                  <div className="say-kicker"><T m={mode} en="Do not say this wrong" zh="這些不能講錯" /></div>
                  <ul className="say-list">
                    <li><T m={mode} en="Unsupervised is not automatically better. It often means you do not observe y." zh="Unsupervised 不代表比較高級，很多時候只是你沒有 y。" /></li>
                    <li><T m={mode} en="Most platforms do not take off. There is no silver bullet." zh="大多數平臺起飛不了，沒有銀彈。" /></li>
                    <li><T m={mode} en="Winner-take-all needs all three conditions, not just strong rivalry or subsidy wars." zh="Winner-take-all 要三條件都成立，不是補貼戰很兇就算。" /></li>
                    <li><T m={mode} en="A firm can fight as if a market is WTA even when the market is not fully WTA." zh="企業可以照 WTA 邏輯開戰，但市場本身未必真是 WTA。" /></li>
                  </ul>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* ════ Floating Language FAB ════ */}
        <div className="fab-wrap" ref={fabRef}>
          {fabOpen && (
            <div className="fab-panel">
              <button className={mode === "en" ? "on" : ""} onClick={() => { setMode("en"); setFabOpen(false); }}>EN</button>
              <button className={mode === "zh" ? "on" : ""} onClick={() => { setMode("zh"); setFabOpen(false); }}>中文</button>
              <button className={mode === "bi" ? "on" : ""} onClick={() => { setMode("bi"); setFabOpen(false); }}>雙語</button>
            </div>
          )}
          <button className="fab" onClick={() => setFabOpen(v => !v)} aria-label="Language switcher">
            {mode === "zh" ? "語" : mode === "bi" ? "雙" : "EN"}
          </button>
        </div>
      </div>
    </div>
  );
}
