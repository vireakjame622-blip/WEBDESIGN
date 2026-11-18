/* ==========================================================================
   CareerConnect – Native Figma UI/UX Design Generator Plugin
   Draws all 5 Figma sections with editable Auto-Layout frames, Color Styles,
   Text Styles, Reusable Components, and Desktop + Mobile screens.
   ========================================================================== */

(async function main() {
  // 1. Color Tokens
  const C = {
    primary: "#2563EB",
    primaryLight: "#EFF6FF",
    primaryBorder: "#BFDBFE",
    secondary: "#14213D",
    bg: "#F8FAFC",
    white: "#FFFFFF",
    surfaceAlt: "#F1F5F9",
    border: "#E2E8F0",
    borderStrong: "#CBD5E1",
    text: "#1E293B",
    muted: "#64748B",
    subtle: "#94A3B8",
    success: "#16A34A",
    successBg: "#DCFCE7",
    successText: "#166534",
    warning: "#D97706",
    warningBg: "#FEF3C7",
    warningText: "#92400E",
    danger: "#DC2626",
    dangerBg: "#FEE2E2",
    dangerText: "#991B1B",
    info: "#0284C7",
    infoBg: "#E0F2FE",
    infoText: "#075985",
    purple: "#7C3AED",
    purpleBg: "#EDE9FE",
    purpleText: "#5B21B6"
  };

  function hex(h) {
    const clean = h.replace("#", "");
    return {
      r: parseInt(clean.slice(0, 2), 16) / 255,
      g: parseInt(clean.slice(2, 4), 16) / 255,
      b: parseInt(clean.slice(4, 6), 16) / 255
    };
  }

  function solid(h, opacity) {
    const p = { type: "SOLID", color: hex(h) };
    if (typeof opacity === "number") p.opacity = opacity;
    return [p];
  }

  const CARD_SHADOW = [{
    type: "DROP_SHADOW",
    color: { r: 15 / 255, g: 23 / 255, b: 42 / 255, a: 0.06 },
    offset: { x: 0, y: 2 },
    radius: 8,
    spread: 0,
    visible: true,
    blendMode: "NORMAL"
  }];

  // 2. Discover & Load Available Fonts Safely
  const available = await figma.listAvailableFontsAsync();
  function pickFont(familyPref, stylePrefs) {
    for (const fam of familyPref) {
      for (const st of stylePrefs) {
        const match = available.find(f => f.fontName.family === fam && f.fontName.style === st);
        if (match) return match.fontName;
      }
    }
    return available[0].fontName;
  }

  const FONTS = {
    hBold: pickFont(["Poppins", "Inter"], ["Bold", "SemiBold", "Semi Bold", "Regular"]),
    hSemi: pickFont(["Poppins", "Inter"], ["SemiBold", "Semi Bold", "Bold", "Medium", "Regular"]),
    regular: pickFont(["Inter", "Poppins"], ["Regular"]),
    medium: pickFont(["Inter", "Poppins"], ["Medium", "Regular"]),
    semi: pickFont(["Inter", "Poppins"], ["Semi Bold", "SemiBold", "Bold", "Medium"]),
    bold: pickFont(["Inter", "Poppins"], ["Bold", "Semi Bold", "SemiBold"])
  };

  const uniqueFonts = [];
  for (const fn of Object.values(FONTS)) {
    if (!uniqueFonts.some(u => u.family === fn.family && u.style === fn.style)) {
      uniqueFonts.push(fn);
    }
  }
  await Promise.all(uniqueFonts.map(f => figma.loadFontAsync(f)));

  // 3. Register Figma Paint Styles & Text Styles
  const existingPaintStyles = await figma.getLocalPaintStylesAsync();
  function ensurePaintStyle(name, hexColor) {
    let st = existingPaintStyles.find(s => s.name === name);
    if (!st) {
      st = figma.createPaintStyle();
      st.name = name;
    }
    st.paints = solid(hexColor);
    return st;
  }

  ensurePaintStyle("Brand/Primary Blue", C.primary);
  ensurePaintStyle("Brand/Secondary Navy", C.secondary);
  ensurePaintStyle("Neutral/Background", C.bg);
  ensurePaintStyle("Neutral/Card White", C.white);
  ensurePaintStyle("Neutral/Text Dark", C.text);
  ensurePaintStyle("Neutral/Muted Slate", C.muted);
  ensurePaintStyle("Semantic/Success", C.success);
  ensurePaintStyle("Semantic/Warning", C.warning);
  ensurePaintStyle("Semantic/Danger", C.danger);

  const existingTextStyles = await figma.getLocalTextStylesAsync();
  function ensureTextStyle(name, fontName, fontSize) {
    let st = existingTextStyles.find(s => s.name === name);
    if (!st) {
      st = figma.createTextStyle();
      st.name = name;
    }
    st.fontName = fontName;
    st.fontSize = fontSize;
    return st;
  }
  ensureTextStyle("Display/H1", FONTS.hBold, 36);
  ensureTextStyle("Heading/H2", FONTS.hBold, 24);
  ensureTextStyle("Heading/H3", FONTS.hSemi, 18);
  ensureTextStyle("Body/Regular", FONTS.regular, 14);
  ensureTextStyle("Body/Small", FONTS.regular, 12);

  // 4. Core UI Builder Helpers
  function autoFrame(name, dir, opts = {}) {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = dir; // "VERTICAL" | "HORIZONTAL"
    f.primaryAxisSizingMode = opts.primarySizing || "AUTO";
    f.counterAxisSizingMode = opts.counterSizing || "AUTO";
    f.itemSpacing = opts.gap !== undefined ? opts.gap : 12;
    const p = opts.pad !== undefined ? opts.pad : 0;
    f.paddingTop = opts.pt !== undefined ? opts.pt : p;
    f.paddingRight = opts.pr !== undefined ? opts.pr : p;
    f.paddingBottom = opts.pb !== undefined ? opts.pb : p;
    f.paddingLeft = opts.pl !== undefined ? opts.pl : p;
    if (opts.px !== undefined) { f.paddingLeft = opts.px; f.paddingRight = opts.px; }
    if (opts.py !== undefined) { f.paddingTop = opts.py; f.paddingBottom = opts.py; }
    f.fills = opts.bg ? solid(opts.bg) : [];
    if (opts.stroke) {
      f.strokes = solid(opts.stroke);
      f.strokeWeight = opts.strokeWeight || 1;
    }
    if (opts.radius !== undefined) f.cornerRadius = opts.radius;
    if (opts.shadow) f.effects = CARD_SHADOW;
    if (opts.align) f.primaryAxisAlignItems = opts.align;
    if (opts.counterAlign) f.counterAxisAlignItems = opts.counterAlign;
    if (opts.w && opts.h) {
      f.resize(opts.w, opts.h);
      f.primaryAxisSizingMode = "FIXED";
      f.counterAxisSizingMode = "FIXED";
    } else if (opts.w) {
      f.resize(opts.w, 100);
      if (dir === "HORIZONTAL") f.primaryAxisSizingMode = "FIXED";
      else f.counterAxisSizingMode = "FIXED";
    }
    return f;
  }

  function addText(str, size, weight, color, opts = {}) {
    const t = figma.createText();
    t.fontName = FONTS[weight] || FONTS.regular;
    t.fontSize = size;
    t.characters = String(str);
    t.fills = solid(color || C.text);
    if (opts.w) {
      t.resize(opts.w, 20);
      t.textAutoResize = "HEIGHT";
    }
    return t;
  }

  function appendFill(parent, child) {
    parent.appendChild(child);
    if (parent.layoutMode !== "NONE") {
      child.layoutSizingHorizontal = "FILL";
    }
    return child;
  }

  function makeBadge(label, bgHex, textHex) {
    const b = autoFrame("Badge/" + label, "HORIZONTAL", {
      bg: bgHex, px: 10, py: 4, radius: 999, gap: 4, counterAlign: "CENTER"
    });
    b.appendChild(addText(label, 11, "semi", textHex));
    return b;
  }

  function makeButton(label, variant = "primary", size = "md") {
    const isSm = size === "sm";
    const bgMap = {
      primary: C.primary,
      secondary: C.secondary,
      outline: C.white,
      success: C.success,
      dangerOutline: C.white,
      ghost: null
    };
    const txtMap = {
      primary: C.white,
      secondary: C.white,
      outline: C.text,
      success: C.white,
      dangerOutline: C.danger,
      ghost: C.muted
    };
    const strokeMap = {
      outline: C.borderStrong,
      dangerOutline: "#FCA5A5"
    };
    const btn = autoFrame("Button/" + label, "HORIZONTAL", {
      bg: bgMap[variant],
      stroke: strokeMap[variant],
      px: isSm ? 12 : 18,
      py: isSm ? 7 : 10,
      radius: 8,
      gap: 6,
      align: "CENTER",
      counterAlign: "CENTER"
    });
    btn.appendChild(addText(label, isSm ? 12 : 13, "semi", txtMap[variant] || C.white));
    return btn;
  }

  function makeInput(label, placeholder, value = "") {
    const wrap = autoFrame("Input/" + label, "VERTICAL", { gap: 6 });
    if (label) wrap.appendChild(addText(label, 12, "semi", C.secondary));
    const box = autoFrame("FieldBox", "HORIZONTAL", {
      bg: C.white, stroke: C.borderStrong, px: 12, py: 10, radius: 8, counterAlign: "CENTER"
    });
    box.appendChild(addText(value || placeholder, 13, "regular", value ? C.text : C.subtle));
    appendFill(wrap, box);
    return wrap;
  }

  function makeLogoBadge(initials, colorHex, size = 44) {
    const box = autoFrame("Logo/" + initials, "HORIZONTAL", {
      bg: colorHex, radius: 10, w: size, h: size, align: "CENTER", counterAlign: "CENTER"
    });
    box.appendChild(addText(initials, size > 50 ? 18 : 14, "bold", C.white));
    return box;
  }

  function makeKpiCard(title, value, sub, badgeBg, badgeText) {
    const card = autoFrame("KPI/" + title, "HORIZONTAL", {
      bg: C.white, stroke: C.border, pad: 18, radius: 14, shadow: true, align: "SPACE_BETWEEN", counterAlign: "MIN"
    });
    const left = autoFrame("Text", "VERTICAL", { gap: 4 });
    left.appendChild(addText(title, 12, "medium", C.muted));
    left.appendChild(addText(String(value), 26, "hBold", C.secondary));
    left.appendChild(addText(sub, 11, "regular", C.muted));
    const iconBox = autoFrame("Icon", "HORIZONTAL", {
      bg: badgeBg, radius: 10, w: 40, h: 40, align: "CENTER", counterAlign: "CENTER"
    });
    iconBox.appendChild(addText("●", 14, "bold", badgeText));
    card.appendChild(left);
    card.appendChild(iconBox);
    return card;
  }

  function makeJobCard(opts) {
    const card = autoFrame("JobCard/" + opts.title, "VERTICAL", {
      bg: C.white, stroke: C.border, pad: 20, radius: 16, gap: 12, shadow: true
    });
    const top = autoFrame("Header", "HORIZONTAL", { align: "SPACE_BETWEEN", counterAlign: "MIN" });
    const left = autoFrame("Company", "HORIZONTAL", { gap: 12, counterAlign: "CENTER" });
    left.appendChild(makeLogoBadge(opts.initials, opts.color, 44));
    const titles = autoFrame("Titles", "VERTICAL", { gap: 3 });
    titles.appendChild(addText(opts.title, 15, "hSemi", C.secondary));
    titles.appendChild(addText(opts.company + "  •  Verified", 12, "medium", C.muted));
    left.appendChild(titles);
    top.appendChild(left);
    top.appendChild(makeBadge(opts.type, opts.type === "Internship" ? C.primaryLight : C.successBg, opts.type === "Internship" ? C.primary : C.successText));
    appendFill(card, top);

    card.appendChild(addText(`${opts.location}   •   ${opts.salary || "Competitive"}   •   Posted ${opts.posted}`, 12, "regular", C.muted));

    const skillsRow = autoFrame("Skills", "HORIZONTAL", { gap: 6 });
    for (const sk of opts.skills) {
      const chip = autoFrame("Tag", "HORIZONTAL", { bg: C.surfaceAlt, stroke: C.border, px: 9, py: 4, radius: 6 });
      chip.appendChild(addText(sk, 11, "medium", C.text));
      skillsRow.appendChild(chip);
    }
    card.appendChild(skillsRow);

    const footer = autoFrame("Footer", "HORIZONTAL", { pt: 12, align: "SPACE_BETWEEN", counterAlign: "CENTER" });
    footer.appendChild(addText("View Details →", 12, "semi", C.primary));
    const btns = autoFrame("Actions", "HORIZONTAL", { gap: 8 });
    btns.appendChild(makeButton(opts.saved ? "Saved" : "Save", "outline", "sm"));
    btns.appendChild(makeButton("Apply Now", "primary", "sm"));
    footer.appendChild(btns);
    appendFill(card, footer);
    return card;
  }

  function makePublicNavbar(active) {
    const nav = autoFrame("PublicNavbar", "HORIZONTAL", {
      bg: C.white, stroke: C.border, px: 64, py: 16, align: "SPACE_BETWEEN", counterAlign: "CENTER"
    });
    const brand = autoFrame("Brand", "HORIZONTAL", { gap: 10, counterAlign: "CENTER" });
    brand.appendChild(makeLogoBadge("CC", C.primary, 34));
    brand.appendChild(addText("CareerConnect", 18, "hBold", C.secondary));
    nav.appendChild(brand);

    const links = autoFrame("Links", "HORIZONTAL", { gap: 24, counterAlign: "CENTER" });
    for (const l of ["Home", "Find Jobs", "Companies", "About"]) {
      links.appendChild(addText(l, 14, l === active ? "semi" : "medium", l === active ? C.primary : C.text));
    }
    nav.appendChild(links);

    const actions = autoFrame("AuthActions", "HORIZONTAL", { gap: 10 });
    actions.appendChild(makeButton("Login", "outline", "sm"));
    actions.appendChild(makeButton("Sign Up", "primary", "sm"));
    nav.appendChild(actions);
    return nav;
  }

  function makePortalFrame(screenName, roleLabel, navItems, activeNav, buildMainFn) {
    const screen = autoFrame(screenName, "HORIZONTAL", { bg: C.bg, gap: 0, w: 1440, h: 920 });
    screen.counterAxisSizingMode = "AUTO";

    // Sidebar
    const sidebar = autoFrame("Sidebar", "VERTICAL", {
      bg: C.white, stroke: C.border, pad: 18, gap: 8, w: 250
    });
    sidebar.layoutSizingVertical = "HUG";
    const brand = autoFrame("SidebarBrand", "VERTICAL", { gap: 8, pb: 14 });
    const logoRow = autoFrame("LogoRow", "HORIZONTAL", { gap: 8, counterAlign: "CENTER" });
    logoRow.appendChild(makeLogoBadge("CC", C.primary, 32));
    logoRow.appendChild(addText("CareerConnect", 16, "hBold", C.secondary));
    brand.appendChild(logoRow);
    brand.appendChild(makeBadge(roleLabel, C.primaryLight, C.primary));
    appendFill(sidebar, brand);

    for (const item of navItems) {
      const isAct = item === activeNav;
      const row = autoFrame("Nav/" + item, "HORIZONTAL", {
        bg: isAct ? C.primaryLight : null, px: 12, py: 10, radius: 8, counterAlign: "CENTER"
      });
      row.appendChild(addText(item, 13, isAct ? "semi" : "medium", isAct ? C.primary : C.muted));
      appendFill(sidebar, row);
    }
    screen.appendChild(sidebar);

    // Main Column
    const rightCol = autoFrame("MainColumn", "VERTICAL", { gap: 0 });
    rightCol.layoutSizingHorizontal = "FILL";
    screen.appendChild(rightCol);
    rightCol.layoutSizingHorizontal = "FILL";

    const topbar = autoFrame("Topbar", "HORIZONTAL", {
      bg: C.white, stroke: C.border, px: 28, py: 16, align: "SPACE_BETWEEN", counterAlign: "CENTER"
    });
    topbar.appendChild(addText(roleLabel, 13, "medium", C.muted));
    const userPill = autoFrame("User", "HORIZONTAL", { gap: 10, counterAlign: "CENTER" });
    userPill.appendChild(makeLogoBadge("SC", C.secondary, 32));
    userPill.appendChild(addText("Sokha Chan (CADT)", 13, "semi", C.secondary));
    topbar.appendChild(userPill);
    appendFill(rightCol, topbar);

    const content = autoFrame("Content", "VERTICAL", { pad: 28, gap: 20 });
    appendFill(rightCol, content);
    buildMainFn(content);
    return screen;
  }

  function makeDesktopPageFrame(name) {
    const f = autoFrame(name, "VERTICAL", { bg: C.bg, gap: 0, w: 1440 });
    f.counterAxisSizingMode = "FIXED";
    f.primaryAxisSizingMode = "AUTO";
    return f;
  }

  // 5. Setup the 5 Figma Pages
  const pageNames = [
    "01 — Design System",
    "02 — Student Interface",
    "03 — Company Interface",
    "04 — Admin Interface",
    "05 — Mobile Design"
  ];
  const pages = [];
  const firstPage = figma.root.children[0];
  firstPage.name = pageNames[0];
  pages.push(firstPage);
  for (let i = 1; i < pageNames.length; i++) {
    const p = figma.createPage();
    p.name = pageNames[i];
    pages.push(p);
  }

  // =========================================================================
  // PAGE 1: 01 — Design System
  // =========================================================================
  await figma.setCurrentPageAsync(pages[0]);
  const dsCanvas = autoFrame("Design System Board", "VERTICAL", { bg: C.bg, pad: 48, gap: 32, w: 1320 });
  dsCanvas.appendChild(addText("CareerConnect — UI/UX Design System", 32, "hBold", C.secondary));
  dsCanvas.appendChild(addText("Brand Colors, Typography (Poppins & Inter), Reusable Buttons, Badges, Inputs & Card Components", 15, "regular", C.muted));

  // Color Swatches
  const colorSection = autoFrame("1. Color Palette", "VERTICAL", { bg: C.white, stroke: C.border, pad: 28, radius: 16, gap: 16, shadow: true });
  colorSection.appendChild(addText("1. Color System", 20, "hSemi", C.secondary));
  const swatchRow = autoFrame("Swatches", "HORIZONTAL", { gap: 14 });
  const palette = [
    ["Primary Blue", C.primary], ["Secondary Navy", C.secondary], ["Background", C.bg],
    ["Card White", C.white], ["Text Dark", C.text], ["Success", C.success],
    ["Warning", C.warning], ["Danger", C.danger]
  ];
  for (const [label, code] of palette) {
    const sw = autoFrame(label, "VERTICAL", { bg: C.white, stroke: C.border, radius: 12, gap: 0, w: 135 });
    const box = autoFrame("Color", "HORIZONTAL", { bg: code, w: 135, h: 64 });
    sw.appendChild(box);
    const meta = autoFrame("Meta", "VERTICAL", { pad: 10, gap: 2 });
    meta.appendChild(addText(label, 12, "semi", C.secondary));
    meta.appendChild(addText(code, 11, "regular", C.primary));
    sw.appendChild(meta);
    swatchRow.appendChild(sw);
  }
  colorSection.appendChild(swatchRow);
  appendFill(dsCanvas, colorSection);

  // Components Row (Buttons, Badges, Reusable Component Masters)
  const compSection = autoFrame("2. Reusable Components", "VERTICAL", { bg: C.white, stroke: C.border, pad: 28, radius: 16, gap: 18, shadow: true });
  compSection.appendChild(addText("2. Buttons, Status Badges & Form Inputs", 20, "hSemi", C.secondary));

  const btnComp = figma.createComponent();
  btnComp.name = "Button / Primary";
  btnComp.layoutMode = "HORIZONTAL";
  btnComp.primaryAxisSizingMode = "AUTO";
  btnComp.counterAxisSizingMode = "AUTO";
  btnComp.paddingLeft = 18; btnComp.paddingRight = 18; btnComp.paddingTop = 10; btnComp.paddingBottom = 10;
  btnComp.cornerRadius = 8;
  btnComp.fills = solid(C.primary);
  btnComp.appendChild(addText("Apply Now", 13, "semi", C.white));

  const btnRow = autoFrame("ButtonVariants", "HORIZONTAL", { gap: 12, counterAlign: "CENTER" });
  btnRow.appendChild(btnComp);
  btnRow.appendChild(makeButton("Secondary Navy", "secondary"));
  btnRow.appendChild(makeButton("Outline Button", "outline"));
  btnRow.appendChild(makeButton("Accept Candidate", "success"));
  btnRow.appendChild(makeButton("Reject", "dangerOutline"));
  compSection.appendChild(btnRow);

  const badgeRow = autoFrame("StatusBadges", "HORIZONTAL", { gap: 10 });
  badgeRow.appendChild(makeBadge("Internship", C.primaryLight, C.primary));
  badgeRow.appendChild(makeBadge("Pending", C.warningBg, C.warningText));
  badgeRow.appendChild(makeBadge("Under Review", C.infoBg, C.infoText));
  badgeRow.appendChild(makeBadge("Accepted", C.successBg, C.successText));
  badgeRow.appendChild(makeBadge("Rejected", C.dangerBg, C.dangerText));
  compSection.appendChild(badgeRow);

  const sampleJobComp = figma.createComponent();
  sampleJobComp.name = "Component / JobCard";
  sampleJobComp.layoutMode = "VERTICAL";
  sampleJobComp.primaryAxisSizingMode = "AUTO";
  sampleJobComp.counterAxisSizingMode = "FIXED";
  sampleJobComp.resize(560, 100);
  sampleJobComp.itemSpacing = 10;
  sampleJobComp.paddingLeft = 20; sampleJobComp.paddingRight = 20; sampleJobComp.paddingTop = 20; sampleJobComp.paddingBottom = 20;
  sampleJobComp.cornerRadius = 16;
  sampleJobComp.fills = solid(C.white);
  sampleJobComp.strokes = solid(C.border);
  sampleJobComp.effects = CARD_SHADOW;
  sampleJobComp.appendChild(addText("Frontend Developer Intern (React / JS)", 15, "hSemi", C.secondary));
  sampleJobComp.appendChild(addText("Wing Bank (Cambodia) Plc  •  Phnom Penh  •  $300–$450/mo", 12, "regular", C.muted));
  compSection.appendChild(sampleJobComp);

  appendFill(dsCanvas, compSection);

  // =========================================================================
  // PAGE 2: 02 — Student Interface (7 Desktop Screens A–G)
  // =========================================================================
  await figma.setCurrentPageAsync(pages[1]);
  let stuX = 0;
  function placeStudentScreen(node) {
    node.x = stuX;
    node.y = 0;
    stuX += 1520;
  }

  // A. Landing Page
  const landing = makeDesktopPageFrame("A. Landing Page");
  appendFill(landing, makePublicNavbar("Home"));
  const hero = autoFrame("HeroSection", "HORIZONTAL", { bg: C.primaryLight, px: 64, py: 56, gap: 40, counterAlign: "CENTER" });
  const heroLeft = autoFrame("HeroLeft", "VERTICAL", { gap: 16, w: 680 });
  heroLeft.appendChild(makeBadge("Built for CADT & Cambodian University Students", C.white, C.primary));
  heroLeft.appendChild(addText("Find Your Future Career Today.", 44, "hBold", C.secondary, { w: 620 }));
  heroLeft.appendChild(addText("Discover verified internships, part-time roles, and graduate jobs matched to your major, skills, and interests across Cambodia.", 16, "regular", C.muted, { w: 580 }));
  const searchBar = autoFrame("HeroSearchBar", "HORIZONTAL", { bg: C.white, stroke: C.border, pad: 10, radius: 12, gap: 12, shadow: true, counterAlign: "CENTER", align: "SPACE_BETWEEN" });
  searchBar.appendChild(addText("Search job title, skills (React, Python), or company...", 13, "regular", C.subtle));
  searchBar.appendChild(makeButton("Search Jobs", "primary", "md"));
  appendFill(heroLeft, searchBar);
  hero.appendChild(heroLeft);

  const heroCard = autoFrame("HeroLiveMatches", "VERTICAL", { bg: C.white, stroke: C.border, pad: 24, radius: 20, gap: 14, shadow: true, w: 520 });
  heroCard.appendChild(addText("Matched for CADT Majors", 16, "hSemi", C.secondary));
  appendFill(heroCard, makeJobCard({ title: "Frontend Developer Intern", company: "Wing Bank", initials: "WB", color: C.success, type: "Internship", location: "Phnom Penh", salary: "$300–$450/mo", posted: "Nov 10", skills: ["React", "JavaScript", "Git"] }));
  hero.appendChild(heroCard);
  appendFill(landing, hero);

  const catWrap = autoFrame("PopularCategories", "VERTICAL", { px: 64, py: 44, gap: 20 });
  catWrap.appendChild(addText("Popular Job Categories", 24, "hBold", C.secondary));
  const catGrid = autoFrame("CategoryRow", "HORIZONTAL", { gap: 16 });
  for (const cat of ["Software Engineering", "Data Science & AI", "UI/UX Design", "Cybersecurity"]) {
    const cCard = autoFrame("Cat/" + cat, "VERTICAL", { bg: C.white, stroke: C.border, pad: 18, radius: 14, gap: 6, shadow: true, w: 300 });
    cCard.appendChild(addText(cat, 15, "hSemi", C.secondary));
    cCard.appendChild(addText("Explore open internships & jobs", 12, "regular", C.muted));
    catGrid.appendChild(cCard);
  }
  appendFill(catWrap, catGrid);
  appendFill(landing, catWrap);

  const footer = autoFrame("Footer", "HORIZONTAL", { bg: C.secondary, px: 64, py: 32, align: "SPACE_BETWEEN", counterAlign: "CENTER" });
  footer.appendChild(addText("CareerConnect Cambodia  •  CADT Bridge 2, Phnom Penh", 13, "medium", C.white));
  footer.appendChild(addText("careers@cadt.edu.kh  •  LinkedIn  •  Telegram  •  GitHub", 12, "regular", C.subtle));
  appendFill(landing, footer);
  placeStudentScreen(landing);

  // B. Student Dashboard
  const stuDash = makePortalFrame("B. Student Dashboard", "Student Account",
    ["Dashboard", "Find Jobs", "My Applications", "Saved Jobs", "My Profile"], "Dashboard",
    (c) => {
      c.appendChild(addText("Welcome back, Sokha!", 24, "hBold", C.secondary));
      const kpis = autoFrame("KPIs", "HORIZONTAL", { gap: 16 });
      for (const k of [
        ["Total Applications", 4, "Across 4 employers", C.primaryLight, C.primary],
        ["Under Review", 1, "Active screening", C.infoBg, C.info],
        ["Accepted Offers", 1, "Interview scheduled", C.successBg, C.success],
        ["Saved Jobs", 2, "Bookmarked roles", C.purpleBg, C.purple]
      ]) {
        const card = makeKpiCard(k[0], k[1], k[2], k[3], k[4]);
        kpis.appendChild(card);
        card.layoutSizingHorizontal = "FILL";
      }
      appendFill(c, kpis);

      const midRow = autoFrame("SummaryRow", "HORIZONTAL", { gap: 20 });
      const profSum = autoFrame("ProfileSummary", "VERTICAL", { bg: C.white, stroke: C.border, pad: 20, radius: 16, gap: 10, shadow: true });
      profSum.appendChild(addText("Sokha Chan — CADT Year 3", 16, "hSemi", C.secondary));
      profSum.appendChild(addText("B.Sc. in Computer Science  •  Profile 100% Complete  •  GPA 3.78", 12, "regular", C.muted));
      profSum.appendChild(addText("CV: Sokha_Chan_CADT_CV_2026.pdf", 12, "medium", C.primary));
      midRow.appendChild(profSum);
      profSum.layoutSizingHorizontal = "FILL";

      const statusSum = autoFrame("ApplicationOverview", "VERTICAL", { bg: C.white, stroke: C.border, pad: 20, radius: 16, gap: 10, shadow: true });
      statusSum.appendChild(addText("Application Status Overview", 16, "hSemi", C.secondary));
      statusSum.appendChild(addText("1 Pending  •  1 Under Review  •  1 Accepted  •  1 Rejected", 13, "medium", C.text));
      midRow.appendChild(statusSum);
      statusSum.layoutSizingHorizontal = "FILL";
      appendFill(c, midRow);

      c.appendChild(addText("Recommended For Your Skills", 18, "hSemi", C.secondary));
      const recRow = autoFrame("Recommended", "HORIZONTAL", { gap: 16 });
      const j1 = makeJobCard({ title: "Frontend Developer Intern (React)", company: "Wing Bank", initials: "WB", color: C.success, type: "Internship", location: "Phnom Penh", salary: "$300–$450/mo", posted: "Nov 10", skills: ["React", "JavaScript", "REST API"] });
      const j2 = makeJobCard({ title: "UI/UX Design Intern", company: "Pathmazing Inc.", initials: "PM", color: C.primary, type: "Internship", location: "Phnom Penh", salary: "$250–$400/mo", posted: "Nov 9", skills: ["Figma", "Prototyping"], saved: true });
      recRow.appendChild(j1); j1.layoutSizingHorizontal = "FILL";
      recRow.appendChild(j2); j2.layoutSizingHorizontal = "FILL";
      appendFill(c, recRow);
    }
  );
  placeStudentScreen(stuDash);

  // C. Find Jobs
  const findJobs = makePortalFrame("C. Find Jobs Page", "Student Account",
    ["Dashboard", "Find Jobs", "My Applications", "Saved Jobs", "My Profile"], "Find Jobs",
    (c) => {
      c.appendChild(addText("Find Jobs & Internships", 24, "hBold", C.secondary));
      appendFill(c, makeInput("", "Search by job title, company, or skill..."));
      const body = autoFrame("FindJobsLayout", "HORIZONTAL", { gap: 20, counterAlign: "MIN" });
      const filters = autoFrame("FiltersPanel", "VERTICAL", { bg: C.white, stroke: C.border, pad: 18, radius: 14, gap: 12, w: 260, shadow: true });
      filters.appendChild(addText("Filters", 15, "hSemi", C.secondary));
      appendFill(filters, makeInput("Category", "All Categories"));
      appendFill(filters, makeInput("Location", "Phnom Penh / Remote"));
      appendFill(filters, makeInput("Job Type", "Internship / Full-time"));
      appendFill(filters, makeInput("Experience Level", "Student / Entry Level"));
      appendFill(filters, makeInput("Skills", "React, Python, SQL..."));
      body.appendChild(filters);

      const list = autoFrame("JobList", "VERTICAL", { gap: 14 });
      appendFill(list, makeJobCard({ title: "Frontend Developer Intern (React / JS)", company: "Wing Bank (Cambodia) Plc", initials: "WB", color: C.success, type: "Internship", location: "Phnom Penh", salary: "$300–$450/mo", posted: "Nov 10", skills: ["HTML/CSS", "JavaScript", "React"] }));
      appendFill(list, makeJobCard({ title: "Junior Data Science & Analytics Associate", company: "Smart Axiata", initials: "SA", color: "#10B981", type: "Full-time", location: "Phnom Penh", salary: "$650–$900/mo", posted: "Nov 8", skills: ["Python", "SQL", "MySQL"] }));
      body.appendChild(list);
      list.layoutSizingHorizontal = "FILL";
      appendFill(c, body);
    }
  );
  placeStudentScreen(findJobs);

  // D. Job Details
  const jobDetails = makePortalFrame("D. Job Details Page", "Student Account",
    ["Dashboard", "Find Jobs", "My Applications", "Saved Jobs", "My Profile"], "Find Jobs",
    (c) => {
      c.appendChild(addText("← Back to Jobs", 13, "medium", C.primary));
      const cols = autoFrame("DetailCols", "HORIZONTAL", { gap: 20, counterAlign: "MIN" });
      const main = autoFrame("MainDetail", "VERTICAL", { bg: C.white, stroke: C.border, pad: 24, radius: 16, gap: 16, shadow: true });
      main.appendChild(makeBadge("Internship", C.primaryLight, C.primary));
      main.appendChild(addText("Frontend Developer Intern (React / JavaScript)", 22, "hBold", C.secondary));
      main.appendChild(addText("Wing Bank (Cambodia) Plc  •  Phnom Penh  •  Posted Nov 10, 2026", 13, "regular", C.muted));
      main.appendChild(addText("Job Description", 16, "hSemi", C.secondary));
      main.appendChild(addText("Join Wing Bank's Digital Channels squad to build responsive web dashboards and customer flows used across Cambodia.", 13, "regular", C.text, { w: 680 }));
      main.appendChild(addText("Responsibilities & Required Qualifications", 16, "hSemi", C.secondary));
      main.appendChild(addText("• Build reusable UI components in React and modern CSS\n• Currently pursuing B.Sc. in Computer Science at CADT\n• Solid understanding of JavaScript, REST APIs, and Git", 13, "regular", C.text, { w: 680 }));
      cols.appendChild(main);
      main.layoutSizingHorizontal = "FILL";

      const side = autoFrame("OverviewSide", "VERTICAL", { bg: C.white, stroke: C.border, pad: 20, radius: 16, gap: 12, w: 320, shadow: true });
      side.appendChild(addText("Job Overview", 16, "hSemi", C.secondary));
      side.appendChild(addText("Type: Internship\nLocation: Phnom Penh\nSalary: $300 – $450 / month\nDeadline: Dec 5, 2026", 13, "regular", C.text));
      appendFill(side, makeButton("Apply Now", "primary"));
      appendFill(side, makeButton("Save Job", "outline"));
      cols.appendChild(side);
      appendFill(c, cols);
    }
  );
  placeStudentScreen(jobDetails);

  // E. Student Profile
  const stuProf = makePortalFrame("E. Student Profile Page", "Student Account",
    ["Dashboard", "Find Jobs", "My Applications", "Saved Jobs", "My Profile"], "My Profile",
    (c) => {
      const top = autoFrame("Header", "HORIZONTAL", { align: "SPACE_BETWEEN", counterAlign: "CENTER" });
      top.appendChild(addText("Student Profile", 24, "hBold", C.secondary));
      top.appendChild(makeButton("Edit Profile", "primary"));
      appendFill(c, top);

      const heroCard = autoFrame("ProfileCard", "HORIZONTAL", { bg: C.white, stroke: C.border, pad: 24, radius: 16, gap: 20, shadow: true, counterAlign: "CENTER" });
      heroCard.appendChild(makeLogoBadge("SC", C.primary, 72));
      const info = autoFrame("Info", "VERTICAL", { gap: 4 });
      info.appendChild(addText("Sokha Chan", 20, "hBold", C.secondary));
      info.appendChild(addText("Cambodia Academy of Digital Technology (CADT) — B.Sc. in Computer Science", 13, "semi", C.primary));
      info.appendChild(addText("Year 3 (Class of 2027)  •  GPA 3.78 / 4.00  •  Phnom Penh", 12, "regular", C.muted));
      heroCard.appendChild(info);
      appendFill(c, heroCard);

      const grid = autoFrame("ProfileGrid", "HORIZONTAL", { gap: 20 });
      const skillsBox = autoFrame("SkillsBox", "VERTICAL", { bg: C.white, stroke: C.border, pad: 20, radius: 16, gap: 10, shadow: true });
      skillsBox.appendChild(addText("Skills & Projects", 16, "hSemi", C.secondary));
      skillsBox.appendChild(addText("HTML/CSS • JavaScript • React • Node.js • MySQL • Figma • Git", 13, "medium", C.primary));
      skillsBox.appendChild(addText("Project: CADT Campus Study Hub (React, Node.js, MySQL)", 12, "regular", C.muted));
      grid.appendChild(skillsBox); skillsBox.layoutSizingHorizontal = "FILL";

      const cvBox = autoFrame("CVBox", "VERTICAL", { bg: C.white, stroke: C.border, pad: 20, radius: 16, gap: 10, shadow: true });
      cvBox.appendChild(addText("Resume / CV Upload", 16, "hSemi", C.secondary));
      cvBox.appendChild(addText("Uploaded: Sokha_Chan_CADT_CV_2026.pdf (420 KB)", 13, "medium", C.text));
      cvBox.appendChild(makeButton("Upload New CV (PDF)", "outline", "sm"));
      grid.appendChild(cvBox); cvBox.layoutSizingHorizontal = "FILL";
      appendFill(c, grid);
    }
  );
  placeStudentScreen(stuProf);

  // F. My Applications
  const myApps = makePortalFrame("F. My Applications Page", "Student Account",
    ["Dashboard", "Find Jobs", "My Applications", "Saved Jobs", "My Profile"], "My Applications",
    (c) => {
      c.appendChild(addText("My Applications", 24, "hBold", C.secondary));
      const table = autoFrame("AppsTable", "VERTICAL", { bg: C.white, stroke: C.border, pad: 16, radius: 14, gap: 12, shadow: true });
      const rows = [
        ["Frontend Developer Intern", "Wing Bank", "Nov 10, 2026", "Under Review", C.infoBg, C.infoText],
        ["Cybersecurity SOC Intern", "ABA Bank Digital Lab", "Nov 8, 2026", "Pending", C.warningBg, C.warningText],
        ["UI/UX Design Intern", "Pathmazing Inc.", "Nov 3, 2026", "Accepted", C.successBg, C.successText],
        ["Junior QA Engineer", "Wing Bank", "Oct 30, 2026", "Rejected", C.dangerBg, C.dangerText]
      ];
      for (const r of rows) {
        const row = autoFrame("Row", "HORIZONTAL", { py: 10, align: "SPACE_BETWEEN", counterAlign: "CENTER" });
        row.appendChild(addText(`${r[0]}  •  ${r[1]}  •  ${r[2]}`, 13, "medium", C.text));
        const right = autoFrame("Right", "HORIZONTAL", { gap: 10, counterAlign: "CENTER" });
        right.appendChild(makeBadge(r[3], r[4], r[5]));
        right.appendChild(makeButton("View Details", "outline", "sm"));
        row.appendChild(right);
        appendFill(table, row);
      }
      appendFill(c, table);
    }
  );
  placeStudentScreen(myApps);

  // G. Saved Jobs
  const savedJobs = makePortalFrame("G. Saved Jobs Page", "Student Account",
    ["Dashboard", "Find Jobs", "My Applications", "Saved Jobs", "My Profile"], "Saved Jobs",
    (c) => {
      c.appendChild(addText("Saved Jobs (2)", 24, "hBold", C.secondary));
      const grid = autoFrame("SavedGrid", "HORIZONTAL", { gap: 16 });
      const s1 = makeJobCard({ title: "UI/UX Design Intern", company: "Pathmazing Inc.", initials: "PM", color: C.primary, type: "Internship", location: "Phnom Penh", salary: "$250–$400/mo", posted: "Nov 9", skills: ["Figma", "Design Systems"], saved: true });
      const s2 = makeJobCard({ title: "Backend Node.js & MySQL Dev", company: "BookMeBus", initials: "BM", color: "#EA580C", type: "Part-time", location: "Hybrid", salary: "$450–$650/mo", posted: "Nov 6", skills: ["Node.js", "MySQL"], saved: true });
      grid.appendChild(s1); s1.layoutSizingHorizontal = "FILL";
      grid.appendChild(s2); s2.layoutSizingHorizontal = "FILL";
      appendFill(c, grid);
    }
  );
  placeStudentScreen(savedJobs);

  // =========================================================================
  // PAGE 3: 03 — Company Interface (3 Desktop Screens A–C)
  // =========================================================================
  await figma.setCurrentPageAsync(pages[2]);
  let compX = 0;
  function placeCompanyScreen(node) {
    node.x = compX;
    node.y = 0;
    compX += 1520;
  }

  const compDash = makePortalFrame("A. Company Dashboard", "Employer Portal",
    ["Company Dashboard", "Post a Job", "Manage Applicants"], "Company Dashboard",
    (c) => {
      const top = autoFrame("Header", "HORIZONTAL", { align: "SPACE_BETWEEN", counterAlign: "CENTER" });
      top.appendChild(addText("Company Dashboard — Wing Bank", 24, "hBold", C.secondary));
      top.appendChild(makeButton("+ Post a Job", "primary"));
      appendFill(c, top);

      const kpis = autoFrame("KPIs", "HORIZONTAL", { gap: 16 });
      for (const k of [
        ["Total Job Postings", 2, "Published roles", C.primaryLight, C.primary],
        ["Active Postings", 2, "Visible to students", C.successBg, C.success],
        ["Total Applicants", 3, "CADT & university talent", C.infoBg, C.info],
        ["Accepted", 0, "Ready for onboarding", C.purpleBg, C.purple]
      ]) {
        const card = makeKpiCard(k[0], k[1], k[2], k[3], k[4]);
        kpis.appendChild(card); card.layoutSizingHorizontal = "FILL";
      }
      appendFill(c, kpis);

      const recent = autoFrame("RecentApps", "VERTICAL", { bg: C.white, stroke: C.border, pad: 20, radius: 16, gap: 10, shadow: true });
      recent.appendChild(addText("Recent Student Applications", 16, "hSemi", C.secondary));
      recent.appendChild(addText("Sokha Chan (CADT Computer Science) — Frontend Developer Intern — Under Review", 13, "regular", C.text));
      recent.appendChild(addText("Malis Keo (CADT E-Commerce) — Frontend Developer Intern — Pending", 13, "regular", C.text));
      appendFill(c, recent);
    }
  );
  placeCompanyScreen(compDash);

  const postJob = makePortalFrame("B. Post a Job Page", "Employer Portal",
    ["Company Dashboard", "Post a Job", "Manage Applicants"], "Post a Job",
    (c) => {
      c.appendChild(addText("Post a New Job or Internship", 24, "hBold", C.secondary));
      const form = autoFrame("PostJobForm", "VERTICAL", { bg: C.white, stroke: C.border, pad: 24, radius: 16, gap: 14, shadow: true, w: 860 });
      appendFill(form, makeInput("Job Title *", "e.g. Junior Full-Stack Developer Intern"));
      appendFill(form, makeInput("Job Category *", "Software Engineering"));
      appendFill(form, makeInput("Location & Job Type *", "Phnom Penh  •  Internship"));
      appendFill(form, makeInput("Salary Range & Deadline *", "$350 – $500 / month  •  Dec 20, 2026"));
      appendFill(form, makeInput("Required Skills *", "JavaScript, React, Node.js, MySQL, Git"));
      appendFill(form, makeInput("Job Description & Qualifications *", "Describe team, responsibilities, and CADT student qualifications..."));
      form.appendChild(makeButton("Publish Job", "primary"));
      c.appendChild(form);
    }
  );
  placeCompanyScreen(postJob);

  const manageApps = makePortalFrame("C. Manage Applicants Page", "Employer Portal",
    ["Company Dashboard", "Post a Job", "Manage Applicants"], "Manage Applicants",
    (c) => {
      c.appendChild(addText("Manage Applicants", 24, "hBold", C.secondary));
      const table = autoFrame("ApplicantsTable", "VERTICAL", { bg: C.white, stroke: C.border, pad: 18, radius: 16, gap: 14, shadow: true });
      for (const a of [
        ["Sokha Chan", "B.Sc. Computer Science (CADT)", "React, Node.js, MySQL", "Nov 10", "Under Review"],
        ["Malis Keo", "B.Sc. E-Commerce (CADT)", "Figma, HTML/CSS", "Nov 11", "Pending"],
        ["Dara Pich", "B.Sc. Data Science (CADT)", "Python, SQL", "Nov 6", "Under Review"]
      ]) {
        const row = autoFrame("ApplicantRow", "HORIZONTAL", { py: 10, align: "SPACE_BETWEEN", counterAlign: "CENTER" });
        row.appendChild(addText(`${a[0]}  •  ${a[1]}  •  Skills: ${a[2]}`, 13, "medium", C.text));
        const acts = autoFrame("Acts", "HORIZONTAL", { gap: 8 });
        acts.appendChild(makeButton("Preview CV", "outline", "sm"));
        acts.appendChild(makeButton("Accept", "success", "sm"));
        acts.appendChild(makeButton("Reject", "dangerOutline", "sm"));
        row.appendChild(acts);
        appendFill(table, row);
      }
      appendFill(c, table);
    }
  );
  placeCompanyScreen(manageApps);

  // =========================================================================
  // PAGE 4: 04 — Admin Interface
  // =========================================================================
  await figma.setCurrentPageAsync(pages[3]);
  const adminScreen = makePortalFrame("Admin Dashboard & Management", "Administrator",
    ["Overview & Stats", "Manage Students", "Manage Companies", "Manage Job Postings", "Manage Categories"], "Overview & Stats",
    (c) => {
      c.appendChild(addText("Admin Dashboard", 24, "hBold", C.secondary));
      const kpis = autoFrame("KPIs", "HORIZONTAL", { gap: 16 });
      for (const k of [
        ["Total Students", 4, "3 active CADT accounts", C.primaryLight, C.primary],
        ["Total Companies", 6, "1 pending verification", C.infoBg, C.info],
        ["Total Job Postings", 8, "8 active listings", C.purpleBg, C.purple],
        ["Total Applications", 6, "1 accepted hire", C.successBg, C.success]
      ]) {
        const card = makeKpiCard(k[0], k[1], k[2], k[3], k[4]);
        kpis.appendChild(card); card.layoutSizingHorizontal = "FILL";
      }
      appendFill(c, kpis);

      const reports = autoFrame("ReportsCard", "VERTICAL", { bg: C.white, stroke: C.border, pad: 22, radius: 16, gap: 12, shadow: true });
      reports.appendChild(addText("Reports & Statistics — Platform Growth & Category Distribution", 16, "hSemi", C.secondary));
      reports.appendChild(addText("Software Engineering (3)  •  Data Science (1)  •  UI/UX Design (1)  •  Cybersecurity (1)  •  Networking (1)", 13, "medium", C.muted));
      appendFill(c, reports);

      const mgmt = autoFrame("ManagementTabs", "VERTICAL", { bg: C.white, stroke: C.border, pad: 22, radius: 16, gap: 12, shadow: true });
      mgmt.appendChild(addText("Platform Management: Students, Companies, Jobs & Categories", 16, "hSemi", C.secondary));
      mgmt.appendChild(addText("Codingate Technology — Pending Verification  →  [Verify Company]", 13, "medium", C.primary));
      mgmt.appendChild(addText("Manage Categories: Software Engineering, Data Science & AI, UI/UX Design, Cybersecurity, Networking", 13, "regular", C.muted));
      appendFill(c, mgmt);
    }
  );
  adminScreen.x = 0; adminScreen.y = 0;

  // =========================================================================
  // PAGE 5: 05 — Mobile Design (390×844 Responsive Artboards)
  // =========================================================================
  await figma.setCurrentPageAsync(pages[4]);
  const mobileScreens = [
    {
      name: "Mobile — Landing Page",
      title: "Find Your Future Career Today.",
      sub: "Search CADT internships, companies & skills",
      body: "Popular: Frontend Intern • UI/UX • Python • Cybersecurity\n\nFeatured:\n1. Frontend Developer Intern — Wing Bank ($300–$450/mo)\n2. UI/UX Design Intern — Pathmazing ($250–$400/mo)"
    },
    {
      name: "Mobile — Student Dashboard",
      title: "Hi, Sokha!",
      sub: "CADT Computer Science • Year 3",
      body: "4 Applied  •  1 Under Review  •  1 Accepted  •  2 Saved\n\nRecommended:\n• Frontend Developer Intern (Wing Bank)\n• UI/UX Design Intern (Pathmazing)"
    },
    {
      name: "Mobile — Find Jobs",
      title: "Find Jobs (8 Open)",
      sub: "Filter: Internship | Phnom Penh | React",
      body: "Wing Bank — Frontend Developer Intern\nSmart Axiata — Junior Data Science Associate\nABA Bank — Cybersecurity SOC Intern"
    },
    {
      name: "Mobile — Job Details",
      title: "Frontend Developer Intern",
      sub: "Wing Bank (Cambodia) Plc • Phnom Penh",
      body: "Salary: $300–$450/mo • Deadline: Dec 5, 2026\n\nSkills Match: React ✓  JavaScript ✓  Git ✓\n\n[ Apply Now ]   [ Save Job ]"
    },
    {
      name: "Mobile — Applications & Profile",
      title: "My Applications & CV",
      sub: "Sokha_Chan_CADT_CV_2026.pdf",
      body: "• Wing Bank — Under Review\n• ABA Bank — Pending\n• Pathmazing — Accepted\n• Wing Bank QA — Rejected"
    }
  ];

  let mobX = 0;
  for (const ms of mobileScreens) {
    const phone = autoFrame(ms.name, "VERTICAL", {
      bg: C.bg, stroke: C.secondary, strokeWeight: 6, radius: 32, w: 390, h: 844, gap: 0
    });
    phone.x = mobX;
    phone.y = 0;
    mobX += 460;

    const top = autoFrame("MobileHeader", "HORIZONTAL", { bg: C.white, stroke: C.border, px: 18, py: 14, align: "SPACE_BETWEEN", counterAlign: "CENTER" });
    top.appendChild(addText("CareerConnect", 15, "hBold", C.secondary));
    top.appendChild(makeLogoBadge("SC", C.primary, 28));
    appendFill(phone, top);

    const body = autoFrame("MobileBody", "VERTICAL", { pad: 18, gap: 14 });
    body.appendChild(addText(ms.title, 20, "hBold", C.secondary, { w: 350 }));
    body.appendChild(addText(ms.sub, 12, "medium", C.primary, { w: 350 }));
    const card = autoFrame("ContentCard", "VERTICAL", { bg: C.white, stroke: C.border, pad: 16, radius: 14, gap: 10, shadow: true });
    card.appendChild(addText(ms.body, 13, "regular", C.text, { w: 318 }));
    appendFill(body, card);
    body.layoutSizingVertical = "FILL";
    appendFill(phone, body);

    const tabBar = autoFrame("MobileBottomNav", "HORIZONTAL", { bg: C.white, stroke: C.border, px: 16, py: 12, align: "SPACE_BETWEEN" });
    for (const t of ["Home", "Jobs", "Applied", "Profile"]) {
      tabBar.appendChild(addText(t, 11, "semi", t === "Home" ? C.primary : C.muted));
    }
    appendFill(phone, tabBar);
  }

  // Return to Page 2 (Student Interface) and zoom into view
  await figma.setCurrentPageAsync(pages[1]);
  figma.viewport.scrollAndZoomIntoView(pages[1].children);
  figma.notify("CareerConnect UI/UX generated across all 5 Figma pages!");
  figma.closePlugin();
})();
