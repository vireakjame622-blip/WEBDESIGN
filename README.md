# InternLens KH – Phnom Penh Tech Internships & Skill Readiness

A static, stateless web platform for CADT Year 2 Computer Science students to explore curated Phnom Penh tech internship opportunities ($n = 28$) and evaluate their technical skill readiness against industry job requirements with deterministic scoring.

Course: CADT Year 2 Fundamental Web Design (Term 1)

---

## 1. Project Boundaries & Constraints
- **Stack**: Semantic HTML5, CSS3 (Custom properties, Flexbox, Grid, Media Queries), Vanilla JavaScript (ES6+ DOM manipulation).
- **Stateless & In-Memory**: Zero persistence. No `localStorage`, `sessionStorage`, or cookies.
- **No External Frameworks**: Built entirely without React, Vue, jQuery, or Bootstrap.
- **No Backend**: No servers, live APIs, or database connections. All comparisons run purely client-side in the browser.

---

## 2. Core Views & Routing
- `#overview` – Home & Market Overview: Summary KPIs, distribution by the 4 role tracks, compensation breakdown, and top 10 demanded tech skills frequency bar chart.
- `#explorer` – Curated Internship Explorer: Real-time search (matches title, company, sector, and skills), track filter, compensation filter, and Grid/Table view toggles with mobile table fallback.
- `#checker` – Deterministic Skill-Gap Checker: Live 2-column readiness analyzer supporting deep-linking (`#checker?jobId=<id>`), accessible keyboard navigation (`<fieldset>`, `<legend>`, `<input type="checkbox">`), and prioritized gap analysis.

---

## 3. Weighted Scoring Formula
$$\text{Score} = \frac{(\text{Matched Mandatory} \times 2) + (\text{Matched Preferred} \times 1)}{(\text{Total Mandatory} \times 2) + (\text{Total Preferred} \times 1)} \times 100\%$$

- **Mandatory Skills**: Weighted at $2\times$ (core prerequisite). Missing mandatory skills are highlighted with priority alerts.
- **Preferred Skills**: Weighted at $1\times$ (recommended bonus).
- Guarded against division by zero ($0 / 0 = 0\%$, avoiding `NaN`).

---

## 4. Project Structure
```text
├── index.html           # Semantic HTML5 shell with header, #app-root, and footer
├── styles.css           # CSS3 design system, responsive Grid/Flexbox, circular SVG gauge
├── js/
│   ├── data.js          # Curated dataset of 28 Phnom Penh tech internships
│   ├── components.js    # UI rendering helpers, SVG icons, and HTML escaping
│   └── app.js           # Router, state management, filter handlers, and scoring engine
└── README.md
```

---

## 5. How to Run
Simply open `index.html` in any modern web browser or start a local static server (e.g., Live Server in VS Code).
