/**
 * Standalone editorial blog page: When Saturn Speaks, A Vedic Case Study.
 *
 * Faithful reproduction of blog-images-folder/case-studies/kundali-case-study.html.
 * CSS from the source HTML is embedded verbatim, scoped under .kcs-root so the
 * site Header and Footer outside the wrapper are not affected.
 *
 * Names of the two natives are anonymized as A**u and Ri** per editorial policy.
 */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/saturn-karma-two-souls';

const IMG = {
  hero: `${R2}/hero-banner-case.webp`,
  anjuKundali: `${R2}/anju-kundali.webp`,
  riyaKundali: `${R2}/riya-kundali.webp`,
  anjuDasha: `${R2}/anju-maha-dasha.webp`,
  anjuAd: `${R2}/anju-ad-details.webp`,
  anjuPlanets: `${R2}/anju-planet-sequence.webp`,
  riyaDasha: `${R2}/riya-mahadasha.webp`,
  riyaAd: `${R2}/riya-ad-dasha.webp`,
  riyaPlanets: `${R2}/riya-planatery-sequence.webp`,
};

const CANONICAL = 'https://www.soulinfinity.space/blog/saturn-karma-two-souls';
const PAGE_TITLE = 'When Saturn Speaks: A Vedic Case Study Across Two Generations | Soul Infinity';
const PAGE_DESC =
  'A real Vedic astrology case study analyzing how Saturn Mahadasha activates 12th house karma across a mother and daughter. BNN methodology, dasha timing, yogas, and remedies.';

// CSS, copied verbatim from kundali-case-study.html and scoped under .kcs-root
// so it cannot leak into the site Header or Footer rendered by Layout.tsx.
const KCS_CSS = `
.kcs-root {
  --ink: #1a1208;
  --ink-light: #3d3020;
  --ink-muted: #7a6a54;
  --paper: #f9f5ee;
  --paper-warm: #f2ead8;
  --paper-dark: #e8dfc8;
  --gold: #b8922a;
  --gold-light: #d4a84b;
  --crimson: #8b1a1a;
  --crimson-light: #c0392b;
  --indigo: #2c3e6b;
  --sage: #4a6741;
  --border: #d4c4a0;
  --border-light: #e8dfc8;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 20px;
  line-height: 1.75;
  overflow-x: hidden;
}
.kcs-root, .kcs-root * { margin: 0; padding: 0; box-sizing: border-box; }

.kcs-root .hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}
.kcs-root .hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.kcs-root .hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(15,10,5,0.92) 0%,
    rgba(15,10,5,0.5) 50%,
    rgba(15,10,5,0.15) 100%
  );
}
.kcs-root .hero-content {
  position: relative;
  z-index: 2;
  padding: 0 6vw 6vh;
  max-width: 900px;
}
.kcs-root .hero-tag {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-light);
  border: 1px solid var(--gold);
  display: inline-block;
  padding: 5px 14px;
  margin-bottom: 20px;
}
.kcs-root .hero h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 900;
  color: #f9f5ee;
  line-height: 1.1;
  margin-bottom: 12px;
}
.kcs-root .hero h1 em {
  font-style: italic;
  color: var(--gold-light);
}
.kcs-root .hero-sub {
  font-family: 'Crimson Pro', serif;
  font-size: clamp(16px, 2vw, 22px);
  color: rgba(249,245,238,0.75);
  font-style: italic;
  max-width: 600px;
  margin-bottom: 24px;
}
.kcs-root .hero-meta {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: rgba(249,245,238,0.5);
  letter-spacing: 0.1em;
}

.kcs-root .article-body {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 4vw;
}

.kcs-root .lead-section {
  padding: 80px 0 60px;
  border-bottom: 1px solid var(--border);
}
.kcs-root .lead-dropcap::first-letter {
  font-family: 'Playfair Display', serif;
  font-size: 88px;
  font-weight: 900;
  float: left;
  line-height: 0.75;
  padding-right: 12px;
  padding-top: 8px;
  color: var(--crimson);
}
.kcs-root .lead-text {
  font-size: 22px;
  line-height: 1.8;
  color: var(--ink-light);
  max-width: 760px;
}

.kcs-root .pull-quote {
  font-family: 'Playfair Display', serif;
  font-size: clamp(24px, 3.5vw, 38px);
  font-style: italic;
  font-weight: 400;
  color: var(--crimson);
  border-left: 4px solid var(--gold);
  padding: 20px 32px;
  margin: 56px 0;
  line-height: 1.4;
  background: linear-gradient(to right, rgba(184,146,42,0.06), transparent);
}

.kcs-root .section-header {
  margin: 72px 0 40px;
  position: relative;
}
.kcs-root .section-num {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--gold);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 10px;
}
.kcs-root .section-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 900;
  color: var(--ink);
  line-height: 1.2;
}
.kcs-root .section-header h2 em {
  color: var(--crimson);
  font-style: italic;
}
.kcs-root .section-rule {
  width: 60px;
  height: 3px;
  background: var(--gold);
  margin-top: 16px;
}

.kcs-root .editorial-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
  margin: 48px 0;
}
.kcs-root .editorial-grid.wide-text { grid-template-columns: 3fr 2fr; }
.kcs-root .editorial-grid.wide-image { grid-template-columns: 2fr 3fr; }

.kcs-root .chart-embed {
  background: #fffdf5;
  border: 2px solid var(--border);
  border-radius: 4px;
  padding: 24px;
  position: relative;
}
.kcs-root .chart-embed-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 12px;
  display: block;
}
.kcs-root .chart-embed-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
}
.kcs-root .chart-embed-sub {
  font-size: 13px;
  color: var(--ink-muted);
  font-style: italic;
  margin-bottom: 16px;
}

.kcs-root .annotation-box {
  background: var(--paper-warm);
  border: 1px solid var(--border);
  border-left: 4px solid var(--crimson);
  padding: 20px 24px;
  margin: 32px 0;
  font-size: 17px;
  line-height: 1.65;
  position: relative;
}
.kcs-root .annotation-box::before {
  content: attr(data-label);
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--crimson);
  display: block;
  margin-bottom: 8px;
}
.kcs-root .annotation-box.gold { border-left-color: var(--gold); }
.kcs-root .annotation-box.gold::before { color: var(--gold); }
.kcs-root .annotation-box.indigo { border-left-color: var(--indigo); }
.kcs-root .annotation-box.indigo::before { color: var(--indigo); }

.kcs-root .planet-table-wrap {
  overflow-x: auto;
  margin: 40px 0;
  border: 1px solid var(--border);
}
.kcs-root .planet-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  background: #fffdf5;
}
.kcs-root .planet-table th {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  background: var(--paper-dark);
  padding: 10px 14px;
  text-align: left;
  border-bottom: 2px solid var(--border);
}
.kcs-root .planet-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-light);
  color: var(--ink-light);
  vertical-align: middle;
}
.kcs-root .planet-table tr:hover td { background: rgba(184,146,42,0.05); }
.kcs-root .planet-table .highlight td {
  background: rgba(139,26,26,0.05);
  font-weight: 600;
  color: var(--crimson);
}
.kcs-root .planet-table .retro { color: var(--crimson); font-style: italic; }
.kcs-root .planet-table .combust { color: var(--gold); }

.kcs-root .dasha-timeline { margin: 48px 0; position: relative; }
.kcs-root .dasha-timeline-track { position: relative; padding-left: 24px; }
.kcs-root .dasha-timeline-track::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--gold), var(--crimson), var(--indigo));
}
.kcs-root .dasha-item { position: relative; padding: 0 0 32px 28px; }
.kcs-root .dasha-item::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid var(--gold);
}
.kcs-root .dasha-item.active::before {
  background: var(--crimson);
  border-color: var(--crimson);
  box-shadow: 0 0 0 4px rgba(139,26,26,0.15);
}
.kcs-root .dasha-item.active .dasha-period { color: var(--crimson); }
.kcs-root .dasha-period {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: var(--gold);
  letter-spacing: 0.08em;
}
.kcs-root .dasha-dates {
  font-size: 13px;
  color: var(--ink-muted);
  margin: 2px 0 6px;
  font-style: italic;
}
.kcs-root .dasha-note { font-size: 16px; color: var(--ink-light); line-height: 1.6; }

.kcs-root .yoga-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin: 40px 0;
}
.kcs-root .yoga-card {
  background: #fffdf5;
  border: 1px solid var(--border);
  padding: 24px;
  position: relative;
}
.kcs-root .yoga-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 3px;
}
.kcs-root .yoga-card.red::after { background: var(--crimson); }
.kcs-root .yoga-card.gold::after { background: var(--gold); }
.kcs-root .yoga-card.indigo::after { background: var(--indigo); }
.kcs-root .yoga-card.sage::after { background: var(--sage); }
.kcs-root .yoga-name {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 4px;
}
.kcs-root .yoga-sanskrit {
  font-size: 13px;
  color: var(--ink-muted);
  font-style: italic;
  margin-bottom: 12px;
}
.kcs-root .yoga-planets {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--gold);
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}
.kcs-root .yoga-desc { font-size: 15px; color: var(--ink-light); line-height: 1.6; }

.kcs-root .compare-table {
  width: 100%;
  border-collapse: collapse;
  margin: 40px 0;
  font-size: 16px;
}
.kcs-root .compare-table th {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  padding: 16px 20px;
  text-align: left;
  border-bottom: 2px solid var(--border);
}
.kcs-root .compare-table th:first-child {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--ink-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  vertical-align: bottom;
}
.kcs-root .compare-table th.anju { color: var(--crimson); }
.kcs-root .compare-table th.riya { color: var(--indigo); }
.kcs-root .compare-table td {
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-light);
  color: var(--ink-light);
  vertical-align: top;
  line-height: 1.6;
}
.kcs-root .compare-table td:first-child {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  width: 140px;
}
.kcs-root .compare-table tr:hover td { background: rgba(184,146,42,0.04); }

.kcs-root .cinematic-break {
  margin: 80px 0;
  position: relative;
  text-align: center;
}
.kcs-root .cinematic-break::before,
.kcs-root .cinematic-break::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(50% - 60px);
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border));
}
.kcs-root .cinematic-break::before { left: 0; }
.kcs-root .cinematic-break::after {
  right: 0;
  background: linear-gradient(to left, transparent, var(--border));
}
.kcs-root .cinematic-break-inner {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
}

.kcs-root .faq-section {
  margin: 72px 0;
  border-top: 3px solid var(--ink);
  padding-top: 48px;
}
.kcs-root .faq-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 900;
  margin-bottom: 40px;
  color: var(--ink);
}
.kcs-root .faq-item {
  border-bottom: 1px solid var(--border);
  padding: 24px 0;
}
.kcs-root .faq-q {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  user-select: none;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 0;
}
.kcs-root .faq-q-mark {
  font-size: 24px;
  color: var(--gold);
  flex-shrink: 0;
  font-family: 'Space Mono', monospace;
  transition: transform 0.3s;
  line-height: 1;
}
.kcs-root .faq-item.open .faq-q-mark { transform: rotate(45deg); }
.kcs-root .faq-a {
  font-size: 18px;
  color: var(--ink-light);
  line-height: 1.75;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s;
}
.kcs-root .faq-item.open .faq-a {
  max-height: 800px;
  padding-top: 16px;
}

.kcs-root .keyword-tags {
  margin: 48px 0 32px;
  padding: 32px 0;
  border-top: 1px solid var(--border);
}
.kcs-root .keyword-tags-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 14px;
  display: block;
}
.kcs-root .tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.kcs-root .tag {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  padding: 5px 12px;
  border: 1px solid var(--border);
  color: var(--ink-muted);
  letter-spacing: 0.06em;
  transition: all 0.2s;
  cursor: default;
}
.kcs-root .tag:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.kcs-root .kcs-footer {
  background: var(--ink);
  color: rgba(249,245,238,0.6);
  text-align: center;
  padding: 48px 24px;
  font-size: 14px;
}
.kcs-root .kcs-footer strong {
  color: var(--gold-light);
  font-family: 'Playfair Display', serif;
}

.kcs-root .body-text {
  font-size: 20px;
  line-height: 1.8;
  color: var(--ink-light);
  max-width: 680px;
}
.kcs-root .body-text p { margin-bottom: 1.4em; }
.kcs-root .body-text p:last-child { margin-bottom: 0; }

.kcs-root .sub-heading {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--ink);
  margin: 40px 0 16px;
}

.kcs-root .img-editorial {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid var(--border);
}
.kcs-root .img-caption {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--ink-muted);
  letter-spacing: 0.08em;
  margin-top: 8px;
  padding-left: 2px;
}

.kcs-root .sticky-note {
  background: #fef9e0;
  border: 1px solid #d4c458;
  padding: 16px 20px;
  font-size: 16px;
  color: #4a400a;
  line-height: 1.6;
  transform: rotate(-0.8deg);
  box-shadow: 2px 3px 8px rgba(0,0,0,0.08);
  margin: 24px 0;
  font-style: italic;
}

@media (max-width: 768px) {
  /* Root */
  .kcs-root { font-size: 17px; }
  .kcs-root .article-body { padding: 0 16px; }
  .kcs-root img { max-width: 100%; height: auto; }
  .kcs-root table { min-width: 100%; }

  /* Hero */
  .kcs-root .hero { height: auto; min-height: 500px; }
  .kcs-root .hero-content { padding: 0 20px 40px; max-width: 100%; }
  .kcs-root .hero h1 { font-size: clamp(28px, 8vw, 48px); line-height: 1.15; word-break: break-word; }
  .kcs-root .hero-sub { font-size: 16px; line-height: 1.5; }
  .kcs-root .hero-tag { font-size: 10px; padding: 4px 10px; }
  .kcs-root .hero-meta { font-size: 10px; }
  .kcs-root .hero-overlay {
    background: linear-gradient(
      to top,
      rgba(15,10,5,0.96) 0%,
      rgba(15,10,5,0.7) 55%,
      rgba(15,10,5,0.3) 100%
    );
  }

  /* Lead */
  .kcs-root .lead-section { padding: 60px 0 40px; }
  .kcs-root .lead-text { font-size: 18px; line-height: 1.7; }
  .kcs-root .lead-dropcap::first-letter { font-size: 64px; padding-right: 10px; padding-top: 6px; }

  /* Pull quote */
  .kcs-root .pull-quote {
    font-size: clamp(20px, 4vw, 34px);
    padding: 16px 20px;
    margin: 32px 0;
    line-height: 1.4;
  }

  /* Section header */
  .kcs-root .section-header { margin: 56px 0 32px; }
  .kcs-root .section-header h2 { font-size: clamp(24px, 7vw, 36px); line-height: 1.2; }
  .kcs-root .section-num { font-size: 10px; }

  /* Sub heading */
  .kcs-root .sub-heading { font-size: 22px; margin: 32px 0 12px; }

  /* Editorial grids stack on mobile */
  .kcs-root .editorial-grid,
  .kcs-root .editorial-grid.wide-text,
  .kcs-root .editorial-grid.wide-image {
    grid-template-columns: 1fr;
    gap: 24px;
    margin: 32px 0;
  }
  /* Section 04 only: image-first column flips so text comes first on mobile */
  .kcs-root .editorial-grid.wide-image > :nth-child(1) { order: 2; }
  .kcs-root .editorial-grid.wide-image > :nth-child(2) { order: 1; }

  /* Body text */
  .kcs-root .body-text { font-size: 17px; line-height: 1.75; }

  /* Tables: all wrappers scroll horizontally */
  .kcs-root .planet-table-wrap,
  .kcs-root .compare-table-wrap,
  .kcs-root .kcs-bnn-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }

  /* Planet table */
  .kcs-root .planet-table th,
  .kcs-root .planet-table td {
    font-size: 13px;
    padding: 8px 10px;
  }

  /* Compare table */
  .kcs-root .compare-table th {
    font-size: 16px;
    padding: 12px 14px;
  }
  .kcs-root .compare-table td {
    font-size: 13px;
    padding: 10px 14px;
    line-height: 1.55;
  }
  .kcs-root .compare-table td:first-child,
  .kcs-root .compare-table th:first-child {
    max-width: 90px;
    width: 90px;
    font-size: 11px;
    white-space: normal;
  }

  /* BNN principles table (Section 08) */
  .kcs-root .kcs-bnn-wrap table { font-size: 14px; }
  .kcs-root .kcs-bnn-wrap th,
  .kcs-root .kcs-bnn-wrap td { padding: 10px 12px !important; }
  .kcs-root .kcs-bnn-wrap td:first-child,
  .kcs-root .kcs-bnn-wrap th:first-child { width: 32px !important; }
  .kcs-root .kcs-bnn-wrap td:nth-child(2) { font-size: 13px !important; }
  .kcs-root .kcs-bnn-wrap td:nth-child(3) { font-size: 13px !important; }

  /* Reason grid (Section 07) , force single column override of inline auto-fit */
  .kcs-root .kcs-reason-grid { grid-template-columns: 1fr !important; }

  /* Yoga cards */
  .kcs-root .yoga-card { padding: 16px; }
  .kcs-root .yoga-grid { gap: 14px; margin: 32px 0; }

  /* Dasha timeline */
  .kcs-root .dasha-note { font-size: 15px; line-height: 1.5; }
  .kcs-root .dasha-period { word-break: break-word; font-size: 11px; }
  .kcs-root .dasha-dates { font-size: 12px; }
  .kcs-root .dasha-timeline { margin: 32px 0; }

  /* Annotation boxes */
  .kcs-root .annotation-box {
    padding: 16px 18px;
    font-size: 16px;
    margin: 24px 0;
  }

  /* Cinematic break */
  .kcs-root .cinematic-break { margin: 48px 0; }
  .kcs-root .cinematic-break::before,
  .kcs-root .cinematic-break::after { width: calc(50% - 90px); }

  /* Sticky note: no rotation on mobile to prevent overflow */
  .kcs-root .sticky-note {
    transform: none;
    font-size: 15px;
    padding: 14px 18px;
  }

  /* Chart embeds */
  .kcs-root .chart-embed { padding: 18px; }

  /* FAQ */
  .kcs-root .faq-section { margin: 56px 0; padding-top: 36px; }
  .kcs-root .faq-q { font-size: 17px; gap: 12px; }
  .kcs-root .faq-a { font-size: 16px; }

  /* Keyword tags */
  .kcs-root .keyword-tags { margin: 36px 0 24px; padding: 24px 0; }
  .kcs-root .tag { font-size: 10px; padding: 4px 10px; }

  /* Footer */
  .kcs-root .kcs-footer { padding: 36px 18px; font-size: 13px; }

  /* Reading-line is already hidden below 1200px in the desktop rule;
     keep that , no override needed here. */
}

.kcs-root .reading-line {
  width: 1px;
  background: var(--border);
  position: fixed;
  right: 32px;
  top: 0;
  bottom: 0;
  opacity: 0.4;
  z-index: 10;
  pointer-events: none;
}
@media (max-width: 1200px) { .kcs-root .reading-line { display: none; } }
`;

interface FaqEntryProps {
  question: string;
  answer: string;
}

function FaqEntry({ question, answer }: FaqEntryProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{question}</span>
        <span className="faq-q-mark" aria-hidden="true">+</span>
      </button>
      <div className="faq-a">{answer}</div>
    </div>
  );
}

export default function SaturnKarmaCaseStudy() {
  const faqs: FaqEntryProps[] = [
    {
      question: 'What is Saturn Mahadasha and how does it affect daily life?',
      answer:
        "Saturn Mahadasha is a 19 year period in the Vimshottari Dasha system during which Saturn becomes the primary planetary ruler of your life themes. During this period, Saturn's natural karakas, karma, discipline, service, restriction, longevity, and delayed reward, become dominant. For natives with Saturn placed in difficult houses (6th, 8th, 12th), this period can feel like sustained pressure, reduced resources, and confrontation with long suppressed patterns. For those with well placed Saturn it can bring structured, lasting achievement. The key is the house Saturn occupies natally and its relationship with the ascendant lord.",
    },
    {
      question: 'What does the 12th house mean in Vedic astrology?',
      answer:
        'The 12th house governs endings, liberation (moksha), hidden enemies, foreign lands, bed pleasures, secret karma, isolated retreat, and self undoing. It is one of the most misunderstood houses because it contains both the highest spiritual potential (liberation) and the deepest karmic traps (addiction, hidden destructive patterns). Planets in the 12th house do not operate in the visible world, they work underground. Saturn retrograde in the 12th house specifically indicates past life karma that must be consciously faced during this lifetime, particularly during Saturn Mahadasha.',
    },
    {
      question: 'What is Rahu Grasthata in Vedic astrology?',
      answer:
        "Rahu Grasthata translates roughly as Rahu possession, a condition where Rahu's shadowy, obsessive, desire amplifying quality begins to override the native's conscious will and rational judgement. It manifests as intense attraction to something (a person, substance, experience) that the native knows intellectually is harmful but cannot resist emotionally. In the chart it is identified when Rahu conjoins or closely aspects the Sun (identity), Moon (mind), or Mercury (rational thinking), particularly in the 6th, 8th, or 12th houses. The condition is strongest during Rahu's own dasha or when its nakshatra lord's dasha is active.",
    },
    {
      question: 'What is Bahu Manzil Yoga and what does it indicate?',
      answer:
        "Bahu Manzil Yoga is identified in BNN (Bhrigu Nandi Nadi) methodology when Mars, Venus, and Rahu form a trine or conjunction in the birth chart. Bahu Manzil translates as multiple floors, indicating multiple significant romantic or desire based episodes in the native's life. This yoga amplifies desire, attraction to multiple partners, and a tendency toward relationships that carry karmic weight. The manifestation depends heavily on the houses involved and the dasha operating: in productive periods it can indicate great passion and creative energy, in difficult dashas it can manifest as obsessive relationships or moral compromise.",
    },
    {
      question: 'How does BNN (Bhrigu Nandi Nadi) differ from classical Vedic astrology?',
      answer:
        "BNN is a branch of Nadi astrology attributed to the sage Bhrigu's tradition, systematised by R.G. Rao in the modern period. The key methodological difference from classical Parashari Vedic astrology is the treatment of trines: in BNN, planets in 5th and 9th relationship from each other are treated as functionally conjunct, their energies combine as powerfully as if they occupied the same house. This creates different yoga calculations than classical Vedic. BNN also has specific marriage karakas that differ from classical: Mars equals 1st husband (for women), not Jupiter. Venus equals 1st wife (for men). These differences significantly change marriage timing and relationship analysis.",
    },
    {
      question: 'Can planetary remedies actually change karma?',
      answer:
        "In Vedic philosophy, karma (action and its consequence) is not a fixed prison, it is a dialogue. Prarabdha karma (karma already set in motion, indicated by the birth chart) cannot be erased, but its expression can be shaped. Remedies work not by changing planetary positions but by changing the native's internal alignment with those planetary energies. Hanuman worship for instance does not remove Saturn, it helps the native embody Saturn's highest qualities (discipline, service, patience) rather than its lower ones (restriction, addiction, isolation). Think of remedies as changing your relationship with the karma, not the karma itself.",
    },
    {
      question: "What is the significance of a very late degree ascendant like Aries 29°54'?",
      answer:
        "A very late degree ascendant (28° to 30°) carries the energy of both that sign and the next, the native is simultaneously completing one archetype and beginning another. For Ri**'s Aries 29°54', this means Aries (warrior, initiation, courage) is at its final breath and Taurus (stability, earthiness, material world) is about to begin. Practically, this creates a personality that feels perpetually at a threshold, never quite settled into the identity the rising sign promises. In BNN and classical Vedic both, this degree is considered significant because the ascendant lord's period (here, Mars) carries particular weight and the native's life direction can shift substantially at key dasha junctions.",
    },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'When Saturn Speaks: A Vedic Case Study Across Two Generations',
    description: PAGE_DESC,
    image: { '@type': 'ImageObject', url: IMG.hero, width: 1600, height: 1000 },
    author: {
      '@type': 'Person',
      name: 'Saurabh Jain',
      url: 'https://www.soulinfinity.space/cosmic-guide',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soul Infinity',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png',
        width: 512,
        height: 512,
      },
    },
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    datePublished: '2026-05-22',
    dateModified: '2026-05-22',
    inLanguage: 'en-IN',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saurabh Jain',
    url: 'https://www.soulinfinity.space/',
    image: IMG.hero,
    jobTitle: 'Vedic Astrologer',
    worksFor: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'K.N. Rao Institute of Vedic Astrology',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
  };

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:image" content={IMG.hero} />
        <meta property="og:url" content={CANONICAL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <meta name="twitter:image" content={IMG.hero} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400;1,600&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <style dangerouslySetInnerHTML={{ __html: KCS_CSS }} />

      <div className="kcs-root">
        <div className="reading-line" aria-hidden="true" />

        {/* HERO */}
        <section className="hero">
          <img
            src={IMG.hero}
            alt="Kundali Analysis, A Journey of Karma Through Saturn, Soul Infinity"
            loading="eager"
            fetchpriority="high"
            width={1600}
            height={1000}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-tag">Case Study, Soul Infinity</span>
            <h1>
              When Saturn <em>Speaks</em>,<br />Two Souls Listen
            </h1>
            <p className="hero-sub">
              A real Vedic investigation into how one planet's dasha reshapes the lives of a mother
              and daughter, separated by birth, united by karma.
            </p>
            <p className="hero-meta">
              By Saurabh Jain, Vedic Astrologer · KN Rao Institute · BNN Methodology · May 2026
            </p>
          </div>
        </section>

        {/* ARTICLE BODY */}
        <main className="article-body">

          {/* LEAD */}
          <div className="lead-section">
            <p className="lead-text lead-dropcap">
              There are charts that read like poetry, every planet placed with an almost cruel elegance, as though the cosmos composed them with full awareness of what was coming. A**u's chart is one of those. A Cancer ascendant woman, deeply spiritual, the kind of person who keeps a prayer routine stricter than most keep office hours. Then Saturn's Mahadasha arrives. And everything, quietly, begins to unravel.
            </p>

            <div className="pull-quote">
              "What feels like love during a Rahu period is rarely love. It is the gravitational pull of unresolved karma, wearing the costume of desire."
            </div>

            <p className="lead-text">
              This is not a cautionary tale. It is a cartography of karma, drawn from two real horoscopes, analysed through the BNN (Bhrigu Nandi Nadi) framework, and presented here as a practitioner's study in how planetary periods activate latent patterns buried deep within the birth chart. The two charts belong to a mother and her daughter. Their stories are different. Their karmic threads are not.
            </p>
          </div>

          {/* SECTION 01, A**U */}
          <div className="section-header">
            <span className="section-num">01, The Mother's Chart</span>
            <h2>
              A**u's Kundali:<br /><em>Saturn in the 12th House</em>
            </h2>
            <div className="section-rule" />
          </div>

          <div className="editorial-grid wide-text">
            <div className="body-text">
              <p>
                Born 5th January 1974, 7:20 PM in Gandhidham, Gujarat. Cancer ascendant, Pushya nakshatra, ruled by Saturn. The irony writes itself: the very nakshatra lord who governs her rising sign is also the planet whose Mahadasha now governs her life.
              </p>
              <p>
                A**u's chart carries what BNN practitioners call a <em>silent bomb</em>, a cluster of planets that appear harmless in isolation but become explosive when the right dasha arrives. In her case: <strong>Saturn retrograde and Ketu retrograde, both in the 12th house</strong> in Gemini. Two planets of severance and dissolution, both retrograde, sitting in the house of hidden karma, bed pleasures, secret enemies, and spiritual liberation, or its opposite.
              </p>

              <div className="annotation-box" data-label="BNN Key Observation">
                The 12th house is not inherently dark. It is the house of completion, liberation (moksha), foreign lands, isolated retreat, hidden blessings. But when Saturn retrograde and Ketu retrograde both occupy it, the karma it holds is old, unresolved, and activated only through their combined dasha timing. Saturn's Mahadasha is now that trigger.
              </div>

              <p>
                The 6th house carries its own storm: <strong>Sun, Mercury (combust), and Rahu, all in Sagittarius.</strong> Rahu in the 6th house of a Cancer ascendant chart amplifies addiction patterns, hidden enemies, and a particular vulnerability to what Vedic tradition calls <em>Rahu Grasthata</em>, a state in which Rahu's obsessive quality begins to override the native's conscious will.
              </p>
            </div>

            <div>
              <div className="chart-embed">
                <span className="chart-embed-label">D1 Chart, Rasi</span>
                <div className="chart-embed-title">A**u, Cancer Lagna</div>
                <div className="chart-embed-sub">05 Jan 1974 · 07:20 PM · Gandhidham</div>
                <img
                  src={IMG.anjuKundali}
                  alt="A**u birth chart, Cancer Lagna, BNN analysis"
                  loading="lazy"
                  width={640}
                  height={640}
                  className="img-editorial"
                  style={{ border: 'none', borderRadius: '4px' }}
                />
                <div className="img-caption">North Indian D1 · Verified against AstroTalk · BNN Analysis</div>
              </div>

              <div className="sticky-note">
                "Moon in Taurus (H11), Rohini nakshatra. This is the Moon's own nakshatra of deepest sensual longing. The desires it seeds rarely announce themselves. They wait."
              </div>
            </div>
          </div>

          {/* Planet Table, A**u */}
          <h3 className="sub-heading">Planetary Positions, A**u</h3>

          <img
            src={IMG.anjuPlanets}
            alt="A**u planetary positions, signs, houses, nakshatras, avastha"
            loading="lazy"
            width={1100}
            height={520}
            className="img-editorial"
            style={{ margin: '0 0 24px', borderRadius: '4px' }}
          />

          <div className="planet-table-wrap">
            <table className="planet-table">
              <thead>
                <tr>
                  <th>Planet</th><th>Sign</th><th>House</th><th>Nakshatra</th><th>Degree</th><th>Status</th><th>Avastha</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Ascendant</td><td>Cancer</td><td>1</td><td>Pushya (Saturn)</td><td>5°49'</td><td>Direct</td><td>,</td></tr>
                <tr><td>Moon</td><td>Taurus</td><td>11</td><td>Rohini</td><td>10°02'</td><td>Direct</td><td>Vriddha · Exalted</td></tr>
                <tr><td>Mars</td><td>Aries</td><td>10</td><td>Ashwini (Ketu)</td><td>10°45'</td><td>Direct</td><td>Kumara · Mooltrikona</td></tr>
                <tr><td>Jupiter</td><td>Capricorn</td><td>7</td><td>Shravana</td><td>21°55'</td><td>Direct</td><td>Kumara · <strong>Debilitated</strong></td></tr>
                <tr><td>Venus</td><td>Capricorn</td><td>7</td><td>Shravana</td><td>17°45'</td><td className="retro">Retro</td><td>Yuva · Friendly</td></tr>
                <tr><td>Sun</td><td>Sagittarius</td><td>6</td><td>Purva Ashadha</td><td>21°21'</td><td>Direct</td><td>Vriddha</td></tr>
                <tr className="highlight"><td>Mercury</td><td>Sagittarius</td><td>6</td><td>Purva Ashadha</td><td>19°05'</td><td className="combust">Combust</td><td>Vriddha · Enemy</td></tr>
                <tr className="highlight"><td>Rahu</td><td>Sagittarius</td><td>6</td><td>Mula (Ketu)</td><td>4°11'</td><td className="retro">Retro</td><td>Bala</td></tr>
                <tr className="highlight"><td>Saturn</td><td>Gemini</td><td>12</td><td>Aadra (Rahu)</td><td>6°40'</td><td className="retro">Retro</td><td>Kumara</td></tr>
                <tr className="highlight"><td>Ketu</td><td>Gemini</td><td>12</td><td>Mrigashirsha</td><td>4°11'</td><td className="retro">Retro</td><td>Bala</td></tr>
              </tbody>
            </table>
          </div>

          {/* CINEMATIC + SECTION 02, YOGAS */}
          <div className="cinematic-break">
            <div className="cinematic-break-inner">
              <span>◆</span><span>The Yogas at Work</span><span>◆</span>
            </div>
          </div>

          <div className="section-header">
            <span className="section-num">02, Yoga Analysis</span>
            <h2>The Planetary<br /><em>Combinations That Activated</em></h2>
            <div className="section-rule" />
          </div>

          <div className="yoga-grid">
            <div className="yoga-card red">
              <div className="yoga-name">Rahu Grasthata</div>
              <div className="yoga-sanskrit">राहु ग्रस्तता, Rahu Possession</div>
              <div className="yoga-planets">Ra + Su + Me · House 6 · Sagittarius</div>
              <div className="yoga-desc">Rahu conjunct Sun and combust Mercury in the 6th house. The native's identity (Sun) and rational mind (Mercury) are consumed by Rahu's fog. Manifests as obsession, addiction, inability to perceive situations clearly, the native believes they are choosing freely when karma is choosing for them.</div>
            </div>

            <div className="yoga-card gold">
              <div className="yoga-name">Bahu Manzil Yoga</div>
              <div className="yoga-sanskrit">बहु मंज़िल योग, Multiple Floors of Desires</div>
              <div className="yoga-planets">Ma (H10) + Ve(R) + Ju (H7) · Trine activation</div>
              <div className="yoga-desc">In BNN, trines function as conjunctions. Mars in 10th, Venus and Jupiter in 7th form a trine cluster. Venus retrograde amplifies unfulfilled desire. This yoga gives multiple romantic episodes and strong sensual drive, particularly dangerous when Rahu activates it through dasha.</div>
            </div>

            <div className="yoga-card indigo">
              <div className="yoga-name">12th House Double Severance</div>
              <div className="yoga-sanskrit">Saturn(R) + Ketu(R) · Gemini</div>
              <div className="yoga-planets">Sa(R) + Ke(R) · House 12 · Gemini</div>
              <div className="yoga-desc">Two retrograde planets of karmic debt and spiritual severance sitting in the house of hidden karma. Saturn retrograde, past life karma resurfacing. Ketu retrograde, spiritual lessons demanded urgently. Both in 12th, hidden self destruction unless consciously redirected toward liberation.</div>
            </div>

            <div className="yoga-card sage">
              <div className="yoga-name">Moon in Rohini · H11</div>
              <div className="yoga-sanskrit">रोहिणी, The Red One · Moon's Own Nakshatra</div>
              <div className="yoga-planets">Mo · House 11 · Taurus · Exalted</div>
              <div className="yoga-desc">Moon in its own nakshatra in the 11th house of desires and fulfilment. Exalted in Taurus. This gives deep emotional hunger for beauty, luxury, and romantic fulfilment. The 11th house does not discriminate between healthy and destructive desires, it simply amplifies.</div>
            </div>
          </div>

          {/* CINEMATIC + SECTION 03, DASHA */}
          <div className="cinematic-break">
            <div className="cinematic-break-inner">
              <span>◆</span><span>The Timing</span><span>◆</span>
            </div>
          </div>

          <div className="section-header">
            <span className="section-num">03, Dasha Timeline</span>
            <h2>Saturn's Long<br /><em>Nineteen Year Hold</em></h2>
            <div className="section-rule" />
          </div>

          <div className="editorial-grid">
            <div>
              <div className="body-text">
                <p>
                  A**u entered Saturn Mahadasha on <strong>25th December 2024</strong>. This is the planet that rules her Pushya nakshatra rising, the Mahadasha lord is also the nakshatra lord of her ascendant. In classical Vedic astrology, this would be considered a <em>significant karmic activation point</em>. In BNN terms, it is the beginning of a 19 year dialogue between the native's conscious intentions and the unconscious karma stored in the 12th house.
                </p>
                <p>
                  The current Antardasha is <strong>SA-SA</strong>, Saturn within Saturn, running until December 2027. This is the densest, most concentrated period of the entire Mahadasha. The planet of karma sits with its own energy, undiluted, facing the 12th house it natally occupies.
                </p>
              </div>

              <div className="annotation-box" data-label="Practitioner Note, BNN">
                Saturn Mahadasha for a native with Saturn in the 12th house does not simply restrict. It <em>reveals</em> everything the native has been avoiding, spiritually, emotionally, sexually. The 12th house contains what we have suppressed. Saturn's Mahadasha forces a confrontation with that suppressed material. The question is whether the confrontation leads to liberation or to collapse.
              </div>
            </div>

            <div>
              <div className="dasha-timeline">
                <div className="dasha-timeline-track">

                  <div className="dasha-item">
                    <div className="dasha-period">Moon MD (Birth to Dec 1983)</div>
                    <div className="dasha-note">Early formation, emotional world building</div>
                  </div>

                  <div className="dasha-item">
                    <div className="dasha-period">Mars MD, Rahu MD, Jupiter MD</div>
                    <div className="dasha-dates">1983 to 2024</div>
                    <div className="dasha-note">Life chapters: career, marriage, children. Jupiter MD giving spiritual inclination through 2024.</div>
                  </div>

                  <div className="dasha-item active">
                    <div className="dasha-period">SA-SA (Active Now)</div>
                    <div className="dasha-dates">25 Dec 2024 to 29 Dec 2027</div>
                    <div className="dasha-note">Peak karma activation. Saturn in Saturn. 12th house themes fully unlocked. Self undoing risk highest.</div>
                  </div>

                  <div className="dasha-item">
                    <div className="dasha-period">SA-ME</div>
                    <div className="dasha-dates">29 Dec 2027 to 07 Sep 2030</div>
                    <div className="dasha-note">Mercury period, potential clarity, communication, possible course correction.</div>
                  </div>

                  <div className="dasha-item">
                    <div className="dasha-period">SA-KE</div>
                    <div className="dasha-dates">07 Sep 2030 to 17 Oct 2031</div>
                    <div className="dasha-note">Ketu AD, spiritual severing, detachment enforced.</div>
                  </div>

                  <div className="dasha-item">
                    <div className="dasha-period">SA-VE</div>
                    <div className="dasha-dates">17 Oct 2031 to 16 Dec 2034</div>
                    <div className="dasha-note">Venus AD, relationships restructure, possible stabilisation.</div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <img
            src={IMG.anjuDasha}
            alt="A**u Vimshottari Mahadasha sequence and timing"
            loading="lazy"
            width={1100}
            height={420}
            className="img-editorial"
            style={{ margin: '24px 0', borderRadius: '4px' }}
          />

          <img
            src={IMG.anjuAd}
            alt="A**u Antardasha detail within Saturn Mahadasha"
            loading="lazy"
            width={1100}
            height={420}
            className="img-editorial"
            style={{ margin: '24px 0', borderRadius: '4px' }}
          />


          {/* CINEMATIC + SECTION 04, RI** */}
          <div className="cinematic-break">
            <div className="cinematic-break-inner">
              <span>◆</span><span>The Daughter's Chart</span><span>◆</span>
            </div>
          </div>

          <div className="section-header">
            <span className="section-num">04, Ri**'s Kundali</span>
            <h2>The Same River,<br /><em>A Different Shore</em></h2>
            <div className="section-rule" />
          </div>

          <div className="editorial-grid wide-image">
            <div>
              <div className="chart-embed">
                <span className="chart-embed-label">D1 Chart, Rasi</span>
                <div className="chart-embed-title">Ri**, Aries Lagna (29°54')</div>
                <div className="chart-embed-sub">20 Sep 2001 · 09:45 PM · Bhuj, Gujarat</div>
                <img
                  src={IMG.riyaKundali}
                  alt="Ri** birth chart, Aries Lagna, BNN analysis"
                  loading="lazy"
                  width={640}
                  height={640}
                  className="img-editorial"
                  style={{ border: 'none', borderRadius: '4px' }}
                />
                <div className="img-caption">North Indian D1 · Verified against AstroTalk · BNN Analysis</div>
              </div>
            </div>

            <div className="body-text">
              <p>
                Ri** was born 20th September 2001 at 9:45 PM in Bhuj. Aries ascendant, 29°54', a <em>very late degree</em>, barely holding its sign, carrying the energy of completion and transition at the threshold of the first house itself.
              </p>
              <p>
                The chart shares a karmic thread with her mother's, but the expression is transformed. Where A**u has <strong>Mars-Venus-Rahu</strong> forming a trine of amplified desire, Ri** has <strong>Mars-Ketu in the 9th house</strong> (Sagittarius), the same Mars energy, but paired with Ketu rather than Rahu. In BNN, this is a profound difference. Rahu amplifies and obsesses. Ketu completes and detaches.
              </p>

              <div className="annotation-box indigo" data-label="BNN Comparison, Mother vs Daughter">
                Same Mars, same fire signs, same 9th house emphasis. But A**u's Mars trines to Rahu (amplification, obsession, multiplication of desire). Ri**'s Mars sits with Ketu (completion, spiritual severance, detachment from the material). The mother experiences the yoga's shadow. The daughter holds its light, provided she does not suppress the spiritual dimension.
              </div>

              <p>
                Ri**'s Saturn Mahadasha began <strong>2nd October 2019</strong>, she entered it at 18 years old, before most people have understood what Saturn even means. She is currently in <strong>SA-KE</strong> Antardasha (Jun 2025 to Jul 2026), Saturn within Ketu. A period that cuts, detaches, and forces spiritual honesty.
              </p>
            </div>
          </div>

          {/* Ri** Dasha + Planet table */}
          <h3 className="sub-heading">Ri**, Dasha Sequence</h3>

          <div className="editorial-grid">
            <div className="dasha-timeline">
              <div className="dasha-timeline-track">
                <div className="dasha-item">
                  <div className="dasha-period">Rahu MD (Birth to Oct 2003)</div>
                  <div className="dasha-note">Very early life, Rahu colours the beginning.</div>
                </div>
                <div className="dasha-item">
                  <div className="dasha-period">Jupiter MD</div>
                  <div className="dasha-dates">Oct 2003 to Oct 2019</div>
                  <div className="dasha-note">Education, growth. Jupiter in Gemini 3rd house (enemy sign, local not foreign).</div>
                </div>
                <div className="dasha-item">
                  <div className="dasha-period">SA-SA</div>
                  <div className="dasha-dates">Oct 2019 to Oct 2022</div>
                  <div className="dasha-note">Saturn within Saturn, foundation of adult life laid.</div>
                </div>
                <div className="dasha-item">
                  <div className="dasha-period">SA-ME</div>
                  <div className="dasha-dates">Oct 2022 to Jun 2025</div>
                  <div className="dasha-note">Mercury, communication, education, early career.</div>
                </div>
                <div className="dasha-item active">
                  <div className="dasha-period">SA-KE (Active Now)</div>
                  <div className="dasha-dates">14 Jun 2025 to 24 Jul 2026</div>
                  <div className="dasha-note">Ketu cutting energy. Foreign window opening. Spiritual pressure. Detachment from comfort zone.</div>
                </div>
                <div className="dasha-item">
                  <div className="dasha-period">SA-VE</div>
                  <div className="dasha-dates">24 Jul 2026 to Sep 2029</div>
                  <div className="dasha-note">Venus AD, stabilisation, relationships, possible foreign settlement begins.</div>
                </div>
              </div>
            </div>

            <div>
              <div className="planet-table-wrap">
                <table className="planet-table">
                  <thead>
                    <tr><th>Planet</th><th>House</th><th>Sign</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Ascendant</td><td>1</td><td>Aries 29°54'</td><td>Very Late Degree</td></tr>
                    <tr><td>Saturn</td><td>1</td><td>Taurus 21°03'</td><td>Direct</td></tr>
                    <tr><td>Jupiter</td><td>3</td><td>Gemini 18°57'</td><td>Enemy Sign</td></tr>
                    <tr className="highlight"><td>Rahu</td><td>3</td><td>Gemini 7°53'</td><td className="retro">Retro</td></tr>
                    <tr><td>Venus</td><td>5</td><td>Leo 5°37'</td><td>Enemy Sign</td></tr>
                    <tr><td>Sun</td><td>6</td><td>Virgo 3°53'</td><td>Direct</td></tr>
                    <tr><td>Moon</td><td>7</td><td>Libra 18°29'</td><td>Direct</td></tr>
                    <tr><td>Mercury</td><td>7</td><td>Libra 0°12'</td><td>Direct</td></tr>
                    <tr className="highlight"><td>Mars</td><td>9</td><td>Sagittarius 12°35'</td><td>Friendly</td></tr>
                    <tr className="highlight"><td>Ketu</td><td>9</td><td>Sagittarius 7°53'</td><td className="retro">Retro</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="annotation-box gold" data-label="Foreign Window, BNN Timing">
                Jupiter MD did not give foreign travel despite Jupiter-Rahu in 3rd. Why? Jupiter in enemy sign Gemini plus 3rd house (local, short distance) plus young age plus SA-KE now cutting loose the root. Foreign window: SA-KE (Jun 2025 to Jul 2026) and SA-RA (May 2033 to Mar 2036).
              </div>
            </div>
          </div>

          <img
            src={IMG.riyaPlanets}
            alt="Ri** planetary positions and house placements"
            loading="lazy"
            width={1100}
            height={520}
            className="img-editorial"
            style={{ margin: '24px 0', borderRadius: '4px' }}
          />

          <img
            src={IMG.riyaDasha}
            alt="Ri** Vimshottari Mahadasha sequence and current dasha"
            loading="lazy"
            width={1100}
            height={420}
            className="img-editorial"
            style={{ margin: '24px 0', borderRadius: '4px' }}
          />

          <img
            src={IMG.riyaAd}
            alt="Ri** Antardasha detail within Saturn Mahadasha"
            loading="lazy"
            width={1100}
            height={420}
            className="img-editorial"
            style={{ margin: '24px 0', borderRadius: '4px' }}
          />


          {/* CINEMATIC + SECTION 05, COMPARISON */}
          <div className="cinematic-break">
            <div className="cinematic-break-inner">
              <span>◆</span><span>The Karmic Mirror</span><span>◆</span>
            </div>
          </div>

          <div className="section-header">
            <span className="section-num">05, Comparison</span>
            <h2>Mother &amp; Daughter:<br /><em>Same Karma, Different Expression</em></h2>
            <div className="section-rule" />
          </div>

          <div className="pull-quote">
            "The soul does not repeat mistakes verbatim. It reframes them, places the same karma in a different chart, a different body, a different century, and asks: this time, will you choose differently?"
          </div>

          <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                <th className="anju">A**u, Mother</th>
                <th className="riya">Ri**, Daughter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lagna</td>
                <td>Cancer 5°49' · Pushya (Saturn)</td>
                <td>Aries 29°54' · Krittika (Sun), very late</td>
              </tr>
              <tr>
                <td>Saturn Placement</td>
                <td>H12 · Gemini · Retro · Aadra nakshatra</td>
                <td>H1 · Taurus · Direct · Rohini nakshatra</td>
              </tr>
              <tr>
                <td>Mars Yoga</td>
                <td>Ma(H10) trine Ve+Ra(H6), Bahu Manzil, desire amplification</td>
                <td>Ma+Ke(H9), Vairagya tendency, spiritual completion</td>
              </tr>
              <tr>
                <td>Rahu Position</td>
                <td>H6 Sagittarius · Mula · Rahu Grasthata active</td>
                <td>H3 Gemini · Aadra · Local pull, not foreign</td>
              </tr>
              <tr>
                <td>Current Dasha</td>
                <td>SA-SA (Dec 2024 to Dec 2027) · 12th house karma peak</td>
                <td>SA-KE (Jun 2025 to Jul 2026) · cutting, foreign opening</td>
              </tr>
              <tr>
                <td>Crisis Pattern</td>
                <td>Alcohol, sexual obsession, spiritual abandonment</td>
                <td>Restlessness, search for direction, transition</td>
              </tr>
              <tr>
                <td>Trajectory</td>
                <td>Without intervention: health, financial, isolation risk by 2030</td>
                <td>Foreign settlement possible SA-KE to SA-VE window</td>
              </tr>
              <tr>
                <td>Remedy Core</td>
                <td>Return to spiritual practice, legal clarity on relationship</td>
                <td>Accept the cutting of SA-KE, do not force roots</td>
              </tr>
            </tbody>
          </table>
          </div>


          {/* SECTION 06, REMEDIES */}
          <div className="section-header">
            <span className="section-num">06, Remedies</span>
            <h2>What the Planets<br /><em>Ask in Return</em></h2>
            <div className="section-rule" />
          </div>

          <div className="editorial-grid">
            <div className="body-text">
              <h3 className="sub-heading" style={{ marginTop: 0 }}>For A**u, Saturn 12th House</h3>
              <p>
                The 12th house in Vedic astrology is the house of <em>liberation (moksha) or self undoing</em>, the difference is determined entirely by intention. Saturn retrograde here demands that karma be faced consciously, not suppressed. The remedies are not cosmetic. They are structural.
              </p>

              <div className="annotation-box" data-label="Primary Remedy">
                <strong>Return to the spiritual practice.</strong> Not as performance, as medicine. The moment A**u abandoned her prayer routine, she removed the only anchor that balanced Rahu's pull in the 6th house. Hanuman Chalisa daily. Shani Stotra every Saturday without exception.
              </div>

              <div className="annotation-box gold" data-label="Relationship Clarity Required">
                <strong>Legal status must be verified.</strong> A relationship with a still legally married person activates the 12th house's shadow dimension, secret, hidden, karmic. Until formal divorce papers exist, the relationship has no protective dharmic foundation. Demand clarity. Accept the answer.
              </div>

              <div className="annotation-box indigo" data-label="Saturn Seva, Non Negotiable">
                Saturn Mahadasha for a 12th house Saturn native requires <strong>regular seva (selfless service)</strong>, specifically to those older, poorer, or more isolated. Food donation. Service to one elderly person weekly. This is Saturn's direct currency in this position.
              </div>

              <div className="annotation-box" data-label="Rahu Grasthata, Specific Remedy">
                <strong>Mehandipur Balaji visit.</strong> For cases of Rahu Grasthata, where Rahu's obsessive energy has overridden the native's rational will, classical Vedic tradition recommends a pilgrimage to Mehandipur Balaji (Rajasthan). This is not superstition. It is a structured psychological and spiritual reset, removing the native from their immediate environment and placing them in a space dedicated to clearing Rahu's grip. One visit with sincere intention, accompanied by fasting and prayer.
              </div>

              <div className="annotation-box gold" data-label="Mahamrityunjaya Mantra, Daily">
                <strong style={{ fontFamily: '"Noto Serif Devanagari", serif' }}>ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्</strong><br />
                <em>Om Tryambakam Yajamahe Sugandhim Pushtivardhanam</em><br />
                Recite 108 times daily at sunrise. This mantra works directly on the 12th house karma, liberation, longevity, and dissolution of hidden enemies. For Saturn retrograde in the 12th, it is among the most powerful available remedies.
              </div>

              <div className="annotation-box" data-label="Pitru Tarpan, Overdue Karma">
                <strong>Pitru tarpan for the late husband.</strong> The husband passed two years ago. In Vedic tradition, the soul's transition is supported by water offerings (tarpan) performed by family members. If this has not been done systematically, it becomes a source of restless Pitru energy in the household. Performing tarpan and Shraddha during Pitru Paksha, or having it performed at Gaya or Haridwar, directly pacifies this category of karma. It is not grief. It is completion.
              </div>

              <div className="annotation-box indigo" data-label="Kaal Bhairav Worship">
                <strong>Kaal Bhairav puja, every Sunday.</strong> Kaal Bhairav is the form of Shiva who governs time, Saturn's shadow, and the 12th house's hidden dimensions. For a native with Saturn retrograde and Ketu retrograde both in the 12th house, Bhairav worship cuts through the accumulated karmic density more directly than most remedies. Black sesame, mustard oil lamp, and sincere prayer every Sunday morning.
              </div>
            </div>

            <div className="body-text">
              <h3 className="sub-heading" style={{ marginTop: 0 }}>For Ri**, SA-KE Window</h3>
              <p>
                Ri**'s current period is not a crisis, it is an <em>invitation</em>. Ketu Antardasha within Saturn Mahadasha is a period that forces detachment from what is familiar, comfortable, and locally rooted. The discomfort she likely feels is not a sign of failure. It is the chart doing exactly what it was designed to do.
              </p>

              <div className="annotation-box indigo" data-label="Key Guidance, SA-KE Period">
                Do not resist the feeling of rootlessness during SA-KE. This period is <strong>designed to detach</strong>, from friendships, places, identities that no longer serve. The foreign window that Jupiter MD refused to open, Ketu is now quietly unlocking. Stay alert to opportunities that require relocation or crossing linguistic or cultural boundaries.
              </div>

              <div className="annotation-box" data-label="Ketu Remedies">
                Ketu in 9th house (Sagittarius) with Mars equals strong dharmic warrior energy. <strong>Regular visits to a Devi temple or Hanuman mandir.</strong> Physical practices that demand discipline and build internal fire, yoga, martial arts, running. Ketu's restlessness is best metabolised through structured physical and spiritual effort.
              </div>

              <div className="annotation-box gold" data-label="From Jul 2026, SA-VE Opens">
                The Venus Antardasha from July 2026 onward brings stabilisation, relationship possibility, and a more settled chapter. The roots Ketu cuts now are roots that needed removing. The new ones Venus plants are more aligned with who Ri** is becoming.
              </div>
            </div>
          </div>


          {/* CINEMATIC + SECTION 07, RI** FOREIGN WINDOWS */}
          <div className="cinematic-break">
            <div className="cinematic-break-inner">
              <span>◆</span><span>Ri**'s Foreign Windows</span><span>◆</span>
            </div>
          </div>

          <div className="section-header">
            <span className="section-num">07, Timing Analysis</span>
            <h2>When Will Ri**<br /><em>Cross the Threshold?</em></h2>
            <div className="section-rule" />
          </div>

          <div className="editorial-grid wide-text">
            <div className="body-text">
              <p>
                One of the most common questions in Vedic astrology consultations is: <em>why did the foreign period not deliver what was promised?</em> Ri**'s Jupiter Mahadasha is a textbook case. Jupiter sits with Rahu in the 3rd house, and the classical rule states that Rahu with a planet gives foreign results during that planet's dasha. Yet no foreign settlement came during Jupiter MD (2003 to 2019).
              </p>

              <h3 className="sub-heading">Why Jupiter MD Did Not Deliver Foreign Travel</h3>

              <div className="kcs-reason-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', margin: '24px 0' }}>
                <div style={{ background: '#fff8f8', border: '1px solid var(--border)', borderLeft: '3px solid var(--crimson)', padding: '14px 16px' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'var(--crimson)', letterSpacing: '0.15em', marginBottom: '6px' }}>REASON 1</div>
                  <div style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6 }}><strong>Jupiter in enemy sign.</strong> Gemini is Mercury's sign. Jupiter is in enemy territory, weakened and unable to deliver its full promise.</div>
                </div>
                <div style={{ background: '#fff8f8', border: '1px solid var(--border)', borderLeft: '3px solid var(--crimson)', padding: '14px 16px' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'var(--crimson)', letterSpacing: '0.15em', marginBottom: '6px' }}>REASON 2</div>
                  <div style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6 }}><strong>3rd house equals local travel.</strong> The 3rd house governs short journeys, not foreign settlement. Jupiter here amplifies local movement, communication, and siblings, not overseas relocation.</div>
                </div>
                <div style={{ background: '#fff8f8', border: '1px solid var(--border)', borderLeft: '3px solid var(--crimson)', padding: '14px 16px' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'var(--crimson)', letterSpacing: '0.15em', marginBottom: '6px' }}>REASON 3</div>
                  <div style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6 }}><strong>Rahu retrograde.</strong> Retrograde Rahu internalises foreign energy. The native develops deep interest in foreign cultures, languages, or ideas, but actual physical relocation is blocked.</div>
                </div>
                <div style={{ background: '#fff8f8', border: '1px solid var(--border)', borderLeft: '3px solid var(--crimson)', padding: '14px 16px' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'var(--crimson)', letterSpacing: '0.15em', marginBottom: '6px' }}>REASON 4</div>
                  <div style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6 }}><strong>Saturn in 2nd house.</strong> Saturn's strong placement in Taurus (friendly sign) in the 2nd house creates a powerful rooting force. Family obligations, financial responsibility, and domestic ties kept the native grounded during Jupiter MD.</div>
                </div>
              </div>

              <div className="annotation-box gold" data-label="BNN Rule, Conditional Application">
                The rule "Rahu with planet equals foreign during that planet's MD" is a <strong>conditional rule</strong>, not an absolute one. It requires: the planet in a foreign indicating house (12th, 9th, or 7th), the planet in a friendly sign, Rahu direct, and the native's life stage permitting relocation. When any major condition is absent, the rule does not fire. This is one of the most important lessons in BNN practice, rules are tendencies, not guarantees.
              </div>
            </div>

            <div>
              <div style={{ background: '#fffdf5', border: '1px solid var(--border)', padding: '24px', marginBottom: '20px' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: 'var(--ink-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Foreign Windows, Ri**</div>

                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.08em', marginBottom: '4px' }}>SA-KE · Jun 2025 to Jul 2026</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: '8px' }}>Saturn, Ketu Antardasha</div>
                  <div style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6 }}>Ketu activates the 9th house (Mars-Ketu placement). Cutting of local roots. Opportunities requiring cultural or linguistic boundary crossing. <strong>Most likely window for first major foreign exposure.</strong></div>
                </div>

                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.08em', marginBottom: '4px' }}>SA-VE · Jul 2026 to Sep 2029</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: '8px' }}>Saturn, Venus Antardasha</div>
                  <div style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6 }}>Venus in 5th (Leo). Stabilisation, possible foreign relationship or creative opportunity abroad. Roots begin forming in new soil.</div>
                </div>

                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'var(--indigo)', letterSpacing: '0.08em', marginBottom: '4px' }}>SA-RA · May 2033 to Mar 2036</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: '8px' }}>Saturn, Rahu Antardasha</div>
                  <div style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6 }}>Direct Rahu activation. This is the strongest foreign window in the entire Saturn MD. Rahu's amplifying energy combines with Saturn's discipline. <strong>Potential for significant international career or settlement.</strong></div>
                </div>

                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'var(--sage)', letterSpacing: '0.08em', marginBottom: '4px' }}>Mercury MD · From Oct 2038</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: '8px' }}>Mercury Mahadasha</div>
                  <div style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6 }}>Mercury as career activator. Foreign through professional excellence, teaching, writing, technology, communication.</div>
                </div>
              </div>

              <div className="sticky-note">
                "The foreign door was never locked. It was simply waiting for the right key. SA-KE is that key, cutting the rope that tied Ri** to familiar ground."
              </div>
            </div>
          </div>


          {/* CINEMATIC + SECTION 08, BNN PRINCIPLES */}
          <div className="cinematic-break">
            <div className="cinematic-break-inner">
              <span>◆</span><span>BNN Principles Demonstrated</span><span>◆</span>
            </div>
          </div>

          <div className="section-header">
            <span className="section-num">08, Learning</span>
            <h2>Six BNN Principles<br /><em>This Case Study Confirms</em></h2>
            <div className="section-rule" />
          </div>

          <div className="body-text" style={{ maxWidth: '100%', marginBottom: '32px' }}>
            <p>Every case study in Vedic astrology is simultaneously a reading and a lesson. A**u and Ri**'s charts together demonstrate six foundational BNN principles that separate this methodology from generic sun sign or pop astrology.</p>
          </div>

          <div className="kcs-bnn-wrap" style={{ border: '1px solid var(--border)', margin: '0 0 48px' }}>
            <div style={{ background: 'var(--ink)', padding: '14px 20px' }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'var(--gold-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>BNN Methodology · Principles Demonstrated</span>
            </div>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px', background: '#fffdf5' }}>
                <thead>
                  <tr style={{ background: 'var(--paper-dark)' }}>
                    <th style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid var(--border)', fontWeight: 400, width: '40px' }}>#</th>
                    <th style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid var(--border)', fontWeight: 400 }}>Principle</th>
                    <th style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid var(--border)', fontWeight: 400 }}>Demonstrated By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>01</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.5 }}>Trines (5th and 9th) function as conjunctions in BNN, not mildly as in classical Vedic</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-light)', lineHeight: 1.6 }}>A**u's Mars (H10) trine Venus-Rahu (H6) equals Bahu Manzil Yoga activating as powerfully as a direct conjunction.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'rgba(184,146,42,0.04)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>02</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.5 }}>The same yoga manifests differently based on house, sign, and partner planet</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-light)', lineHeight: 1.6 }}>Mars-Venus-Rahu (A**u) equals destructive amplification. Mars-Venus-Ketu (Ri**) equals spiritual completion. Same Mars-Venus core. Completely different outcomes.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>03</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.5 }}>Mars equals 1st husband karaka for women (not Jupiter as classical Vedic holds)</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-light)', lineHeight: 1.6 }}>A**u's Mars in 10th (Aries, Mooltrikona) shows her late husband's strength and career oriented nature. Jupiter in 7th debilitated equals he was not her Jupiter figure.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'rgba(184,146,42,0.04)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>04</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.5 }}>BNN rules are conditional, they require supporting conditions to fire</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-light)', lineHeight: 1.6 }}>"Rahu with planet equals foreign in that planet's MD" did not fire for Ri** during Jupiter MD. Four conditions were absent: enemy sign, wrong house, retrograde Rahu, young age.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>05</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.5 }}>Rahu Grasthata is a real and diagnosable condition, not metaphor</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-light)', lineHeight: 1.6 }}>A**u's Rahu in 6th (Mula) conjunct Sun and combust Mercury equals Rahu consuming both identity and rational mind simultaneously. Classic Grasthata pattern.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 16px', fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>06</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.5 }}>Family karma flows generationally but can be completed by the next generation</td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-light)', lineHeight: 1.6 }}>Ri**'s chart carries a lighter version of the same Mars-Venus pattern. The 9th house placement and Ketu (vs Rahu) give her the structural possibility to complete what her mother's generation began, if she chooses the dharmic path.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


          {/* FAQ */}
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            {faqs.map((f) => (
              <FaqEntry key={f.question} question={f.question} answer={f.answer} />
            ))}
          </div>


          {/* KEYWORD TAGS */}
          <div className="keyword-tags">
            <span className="keyword-tags-label">Topics covered in this analysis</span>
            <div className="tags-wrap">
              {[
                'vedic astrology case study','saturn mahadasha effects','12th house in astrology','rahu grasthata','bahu manzil yoga','BNN methodology','kundali analysis','saturn transit','ketu antardasha','cancer lagna','aries lagna','vimshottari dasha','saturn in 12th house','rahu in 6th house','spiritual fall astrology','karmic astrology','north indian kundali','bhrigu nandi nadi','mars ketu yoga','venus retrograde effects','saturn mahadasha remedies','vedic astrology remedies','12 houses vedic astrology','nakshatra analysis','rohini nakshatra','pushya nakshatra saturn',
              ].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

        </main>

        <div className="kcs-footer">
          <p style={{ marginBottom: 8 }}><strong>Soul Infinity</strong> · Awaken. Align. Transform.</p>
          <p>Vedic astrology consultations · soulinfinity.space</p>
          <p style={{ marginTop: 12, fontSize: 12, opacity: 0.5 }}>
            This case study is presented for educational and analytical purposes. All personal details have been anonymised. Predictions represent karmic tendencies, not fixed destiny. Free will remains the ultimate arbiter.
          </p>
        </div>
      </div>
    </>
  );
}
