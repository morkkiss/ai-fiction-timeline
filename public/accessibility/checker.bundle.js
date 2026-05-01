(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // checker.jsx
  var { useState, useCallback, Component } = React;
  var { createRoot } = ReactDOM;
  var APP_NAME = "Faculty WCAG Checker";
  var APP_BRAND = "Morgan Talty, Department of English, University of Maine";
  var TLS_VERSION = "1.1.0";
  var APP_VERSION = `v${TLS_VERSION}`;
  var REPORT_BRAND = "Faculty WCAG Audit Report \u2014 Prepared by Morgan Talty";
  var AI_ALT_ENDPOINT = typeof window !== "undefined" && window.__TLS_VISION_ALT_API || "";
  var PRIMARY_BLUE = "#1F4E79";
  var CONTACT_EMAIL = "morgan.talty@maine.edu";
  var SHARE_TOOL_PATH = "./Faculty_WCAG_Checker_2026-04-30.html";
  var IS_ELECTRON = Boolean(window?.electron?.ipcRenderer?.invoke);
  var VAGUE_LINK_TEXT = /* @__PURE__ */ new Set(["click here", "here", "read more", "more", "link", "this", "download", "learn more"]);
  var SOCIAL_PLATFORM_LABELS = {
    facebook: "Facebook",
    twitter: "Twitter / X",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    tiktok: "TikTok",
    x: "X (Twitter)"
  };
  var isTruthyText = (value) => (value || "").toString().trim().length > 0;
  var normalizeFilenameToLabel = (value) => (value || "").toString().replace(/\.[^.]+$/u, "").replace(/[-_]/gu, " ").replace(/\s+/gu, " ").trim();
  var looksDecorativeImage = (src = "") => /logo|icon|bg|background|decoration|divider|spacer|pattern|pennant|placeholder/i.test(src);
  var hasSafeLang = (value = "") => /^[a-z]{2,3}(-[a-z]{2,4})?$/i.test(value.trim());
  var normalizeLinkText = (text = "") => (text || "").toLowerCase().replace(/[\u2010\u2011\u2012\u2013\u2212]/gu, "-").replace(/[^\w\s-]/gu, "").replace(/\s+/gu, " ").trim();
  var isPlaceholderHref = (href = "") => {
    const value = (href || "").trim().toLowerCase();
    return !value || value === "#" || value === "javascript:void(0)" || value === "javascript:;" || value === "javascript:void(0);";
  };
  var hasLabeledField = (doc, field) => {
    if (isTruthyText(field.getAttribute("aria-label")) || isTruthyText(field.getAttribute("aria-labelledby"))) return true;
    if (field.closest("label")) return true;
    const id = (field.getAttribute("id") || "").trim();
    if (!id) return false;
    return !!doc.querySelector(`label[for="${id}"]`);
  };
  var controlAutoLabel = (field) => {
    const placeholder = (field.getAttribute("placeholder") || "").trim();
    const id = (field.getAttribute("id") || "").trim();
    const type = (field.getAttribute("type") || "text").trim();
    const tag = field.tagName.toLowerCase();
    if (tag === "select") return "Select field";
    if (tag === "textarea") return "Text area field";
    if (isTruthyText(placeholder)) return placeholder;
    if (isTruthyText(id)) return `${id.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim()} field`;
    return `${type.charAt(0).toUpperCase()}${type.slice(1)} field`;
  };
  var externalBlankNeedsRel = (a) => {
    const target = (a.getAttribute("target") || "").toLowerCase().trim();
    const rel = (a.getAttribute("rel") || "").toLowerCase();
    if (target !== "_blank") return false;
    return !(/\bnoopener\b/.test(rel) && /\bnoreferrer\b/.test(rel));
  };
  var ensureSafeRel = (existingRel = "") => {
    const rel = new Set(
      (existingRel || "").toLowerCase().split(/\s+/).map((v) => v.trim()).filter(Boolean)
    );
    rel.add("noopener");
    rel.add("noreferrer");
    return [...rel].join(" ");
  };
  var collectDuplicateIds = (doc) => {
    const seen = /* @__PURE__ */ new Set();
    const duplicate = /* @__PURE__ */ new Set();
    doc.querySelectorAll("[id]").forEach((el) => {
      const id = (el.getAttribute("id") || "").trim();
      if (!id) return;
      if (seen.has(id)) duplicate.add(id);
      seen.add(id);
    });
    return [...duplicate];
  };
  var tlsAutoIdSeq = 0;
  var nextTlsId = (prefix = "tls") => `tls-${prefix}-${++tlsAutoIdSeq}`;
  var getElementPath = (el) => {
    if (!el || !el.tagName) return null;
    const parts = [];
    let node = el;
    while (node && node.nodeType === 1 && node.tagName.toLowerCase() !== "html") {
      const tag = node.tagName.toLowerCase();
      const id = (node.getAttribute("id") || "").trim();
      const className = (node.getAttribute("class") || "").trim().split(/\s+/)[0];
      const parent = node.parentElement;
      let selector = tag;
      if (isTruthyText(id)) selector += `#${id}`;
      else if (className) selector += `.${className}`;
      if (parent) {
        const sameTagSiblings = Array.from(parent.children).filter((x) => x.tagName === node.tagName);
        if (sameTagSiblings.length > 1) {
          const index = sameTagSiblings.indexOf(node) + 1;
          selector += `:nth-of-type(${index})`;
        }
      }
      parts.unshift(selector);
      node = parent;
    }
    return parts.slice(-4).join(" > ");
  };
  var hasCaptionsTrack = (mediaEl) => {
    if (!mediaEl || !mediaEl.querySelectorAll) return false;
    return Array.from(mediaEl.querySelectorAll("track")).some((track) => {
      const kind = (track.getAttribute("kind") || "").toLowerCase();
      return kind === "captions" || kind === "subtitles";
    });
  };
  var NAMED_COLORS = {
    black: "#000000",
    silver: "#c0c0c0",
    gray: "#808080",
    white: "#ffffff",
    maroon: "#800000",
    red: "#ff0000",
    purple: "#800080",
    green: "#008000",
    olive: "#808000",
    yellow: "#ffff00",
    lime: "#00ff00",
    aqua: "#00ffff",
    teal: "#008080",
    blue: "#0000ff",
    navy: "#000080",
    fuchsia: "#ff00ff",
    magenta: "#ff00ff",
    cyan: "#00ffff",
    darkred: "#8b0000",
    brown: "#a52a2a",
    firebrick: "#b22222",
    crimson: "#dc143c",
    indianred: "#cd5c5c",
    lightcoral: "#f08080",
    salmon: "#fa8072",
    darkorange: "#ff8c00",
    orange: "#ffa500",
    gold: "#ffd700",
    khaki: "#f0e68c",
    oliveDrab: "#6b8e23",
    yellowgreen: "#9acd32",
    darkgreen: "#006400",
    forestgreen: "#228b22",
    greenyellow: "#adff2f",
    seagreen: "#2e8b57",
    teal: "#008080",
    darkcyan: "#008b8b",
    lightskyblue: "#87cefa",
    skyblue: "#87ceeb",
    royalblue: "#4169e1",
    dodgerblue: "#1e90ff",
    cornflowerblue: "#6495ed",
    steelblue: "#4682b4",
    lightblue: "#add8e6",
    mediumblue: "#0000cd",
    midnightblue: "#191970",
    slategray: "#708090",
    dimgray: "#696969",
    gray: "#808080",
    darkgray: "#a9a9a9",
    silver: "#c0c0c0",
    lightgray: "#d3d3d3",
    gainsboro: "#dcdcdc",
    lavender: "#e6e6fa",
    plum: "#dda0dd",
    violet: "#ee82ee",
    orchid: "#da70d6",
    purple: "#800080",
    indigo: "#4b0082",
    teal: "#008080",
    wheat: "#f5deb3",
    peru: "#cd853f",
    chocolate: "#d2691e",
    sienna: "#a0522d",
    saddlebrown: "#8b4513",
    rosybrown: "#bc8f8f",
    maroon: "#800000",
    hotpink: "#ff69b4",
    pink: "#ffc0cb",
    lightpink: "#ffb6c1",
    darkslategray: "#2f4f4f",
    slategrey: "#708090",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    mintcream: "#f5fffa",
    aliceblue: "#f0f8ff",
    honeydew: "#f0fff0",
    azure: "#f0ffff",
    ivory: "#fffff0",
    seashell: "#fff5ee",
    lavenderblush: "#fff0f5",
    oldlace: "#fdf5e6",
    linen: "#faf0e6",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    antiquewhite: "#faebd7",
    navajowhite: "#ffdead",
    moccasin: "#ffe4b5",
    cornsilk: "#fff8dc",
    blanchedalmond: "#ffebcd",
    tan: "#d2b48c",
    burlywood: "#deb887",
    papayawhip: "#ffefd5",
    seashell: "#fff5ee",
    antiquewhite: "#faebd7",
    transparent: ""
  };
  var parseColor = (value = "") => {
    const normalized = (value || "").trim().toLowerCase();
    if (!normalized || normalized === "transparent" || normalized === "currentcolor" || normalized === "inherit" || normalized === "initial" || normalized === "unset") return null;
    if (normalized.startsWith("#")) return hexToRgba(normalized);
    if (normalized.startsWith("rgb")) return parseRgbLike(normalized);
    if (normalized.startsWith("hsl")) return parseHslLike(normalized);
    const named = NAMED_COLORS[normalized];
    if (!named) return null;
    return hexToRgba(named);
  };
  var hexToRgba = (hex = "") => {
    const raw = (hex || "").replace("#", "").trim();
    if (!raw || !/^[\da-f]+$/i.test(raw)) return null;
    const normalized = raw.length === 3 || raw.length === 4 ? raw.split("").map((char) => char + char).join("") : raw;
    if (![6, 8].includes(normalized.length)) return null;
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    const a = normalized.length === 8 ? parseInt(normalized.slice(6, 8), 16) / 255 : 1;
    if ([r, g, b, a].some((v) => Number.isNaN(v))) return null;
    return { r, g, b, a };
  };
  var parseAlpha = (token = "") => {
    const value = (token || "").trim();
    if (!value) return 1;
    if (value.includes("%")) return clamp01(parseFloat(value) / 100);
    const n = parseFloat(value);
    if (Number.isNaN(n)) return 1;
    return clamp01(n);
  };
  var clamp01 = (value) => Math.max(0, Math.min(1, value));
  var parseRgbLike = (value = "") => {
    const match = value.match(/rgba?\((.*)\)/i);
    if (!match) return null;
    const args = match[1].replace(/\//g, " / ").split(/\s*,?\s+/).filter(Boolean);
    if (args.length < 3) return null;
    const slash = args.indexOf("/");
    const rgbTokens = slash >= 0 ? args.slice(0, slash) : args.slice(0, 3);
    if (rgbTokens.length < 3) return null;
    const parsed = rgbTokens.map((token, idx) => {
      const trimmed = token.trim();
      const n = parseFloat(trimmed);
      if (Number.isNaN(n)) return null;
      if (trimmed.endsWith("%")) return clamp01(n / 100) * 255;
      return idx < 3 ? clamp01(n / 255) * 255 : null;
    });
    if (parsed.includes(null)) return null;
    const alpha = slash >= 0 ? parseAlpha(args[slash + 1]) : rgbTokens[3] ? parseAlpha(rgbTokens[3]) : 1;
    return {
      r: Math.round(parsed[0]),
      g: Math.round(parsed[1]),
      b: Math.round(parsed[2]),
      a: alpha
    };
  };
  var parseHslLike = (value = "") => {
    const match = value.match(/hsla?\((.*)\)/i);
    if (!match) return null;
    const args = match[1].replace(/\//g, " / ").split(/\s*,?\s+/).filter(Boolean);
    if (args.length < 3) return null;
    const slash = args.indexOf("/");
    const h = parseFloat(args[0]);
    const s = parseFloat(args[1]);
    const l = parseFloat(args[2]);
    if (Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(l)) return null;
    const S = clamp01(s / 100);
    const L = clamp01(l / 100);
    const C = (1 - Math.abs(2 * L - 1)) * S;
    const X = C * (1 - Math.abs(h / 60 % 2 - 1));
    const m = L - C / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    const section = Math.floor(h % 360 / 60);
    if (section === 0) {
      r = C;
      g = X;
      b = 0;
    } else if (section === 1) {
      r = X;
      g = C;
      b = 0;
    } else if (section === 2) {
      r = 0;
      g = C;
      b = X;
    } else if (section === 3) {
      r = 0;
      g = X;
      b = C;
    } else if (section === 4) {
      r = X;
      g = 0;
      b = C;
    } else {
      r = C;
      g = 0;
      b = X;
    }
    const alpha = slash >= 0 ? parseAlpha(args[slash + 1]) : args[3] ? parseAlpha(args[3]) : 1;
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
      a: alpha
    };
  };
  var extractColorFromShorthandBackground = (value = "") => {
    const normalized = (value || "").toLowerCase();
    if (!normalized) return null;
    if (normalized.includes("linear-gradient") || normalized.includes("radial-gradient") || normalized.includes("url(") || normalized.includes("none")) return null;
    const tokens = normalized.match(/(#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|[a-z]+)/g);
    if (!tokens) return null;
    for (const token of tokens) {
      const parsed = parseColor(token);
      if (parsed) return parsed;
    }
    return null;
  };
  var getInlineColor = (el, prop) => {
    if (!el || !el.style) return null;
    const raw = (el.style.getPropertyValue(prop) || "").trim();
    if (!raw) return null;
    if (prop === "background") return extractColorFromShorthandBackground(raw);
    return parseColor(raw);
  };
  var resolveInlineColor = (el, resolver) => {
    let node = el;
    while (node && node.nodeType === 1) {
      const color = resolver(node);
      if (color) return color;
      node = node.parentElement;
    }
    return null;
  };
  var getInlineTextColor = (el) => resolveInlineColor(el, (node) => getInlineColor(node, "color"));
  var getInlineBgColor = (el) => resolveInlineColor(el, (node) => getInlineColor(node, "background-color") || getInlineColor(node, "background"));
  var luminanceChannel = (value) => {
    const fraction = clamp01(value / 255);
    return fraction <= 0.03928 ? fraction / 12.92 : Math.pow((fraction + 0.055) / 1.055, 2.4);
  };
  var contrastRatio = (fg, bg) => {
    if (!fg || !bg || fg.a === 0 || bg.a === 0) return null;
    const l1 = 0.2126 * luminanceChannel(fg.r) + 0.7152 * luminanceChannel(fg.g) + 0.0722 * luminanceChannel(fg.b);
    const l2 = 0.2126 * luminanceChannel(bg.r) + 0.7152 * luminanceChannel(bg.g) + 0.0722 * luminanceChannel(bg.b);
    const bright = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    return (bright + 0.05) / (dark + 0.05);
  };
  var evaluateContrastPair = (foreground, background) => {
    const fg = parseColor(foreground);
    const bg = parseColor(background);
    if (!fg || !bg) return null;
    const ratio = contrastRatio(fg, bg);
    if (!ratio) return null;
    const ratioValue = Number(ratio.toFixed(2));
    return {
      foreground,
      background,
      ratio: ratioValue,
      normal: ratioValue >= 4.5,
      large: ratioValue >= 3,
      ui: ratioValue >= 3
    };
  };
  var normalizeSeverity = (level = "", provided = "", category = null) => {
    if (category === "quality") return "advisory";
    const normalizedLevel = `${level || ""}`.toUpperCase().trim();
    if (normalizedLevel === "AA") return "warning";
    if (normalizedLevel === "A") return "critical";
    const next = `${provided || ""}`.toLowerCase();
    if (next === "advisory") return "advisory";
    if (next === "critical" || next === "warning") return next;
    return "advisory";
  };
  var hasOwnVisibleText = (el) => Array.from(el.childNodes).some((child) => child.nodeType === 3 && child.textContent.trim().length > 0);
  var hasStyleDisplayNone = (el) => el.style && (el.style.getPropertyValue("display") || "").trim().toLowerCase() === "none";
  var isUsefulImageLabel = (value = "") => {
    const label = normalizeFilenameToLabel(value);
    if (!label) return false;
    const cleaned = label.toLowerCase().replace(/[^a-z0-9]+/gu, " ").trim();
    if (!cleaned) return false;
    return cleaned.length >= 3 && !/^(image|img|photo|picture|screenshot|icon|logo|graphic|banner|background|spacer)$/.test(cleaned);
  };
  var fetchVisionAltText = async (imageUrl) => {
    if (!AI_ALT_ENDPOINT) return null;
    try {
      const response = await fetch(AI_ALT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ imageUrl })
      });
      if (!response.ok) return null;
      const payload = await response.json();
      const altText = (payload.altText || payload?.data?.altText || payload?.description || "").toString().trim();
      return altText || null;
    } catch {
      return null;
    }
  };
  var makeComplianceStatementDate = () => {
    const now = /* @__PURE__ */ new Date();
    return now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };
  var downloadTextFile = (content = "", filename = "wcag-report.html") => {
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  var getInlineFontSizePx = (el) => {
    let node = el;
    while (node && node.nodeType === 1) {
      const raw = (node.style && (node.style.getPropertyValue("font-size") || "")).trim();
      if (raw.endsWith("px")) return parseFloat(raw);
      if (raw.endsWith("pt")) return parseFloat(raw) * 1.333;
      node = node.parentElement;
    }
    return null;
  };
  var isLargeText = (el) => {
    let node = el;
    let fontSize = null;
    let isBold = false;
    while (node && node.nodeType === 1) {
      const style = node.style || {};
      const rawWeight = (style.getPropertyValue("font-weight") || "").trim().toLowerCase();
      if (rawWeight === "bold" || rawWeight === "bolder") isBold = true;
      else if (!Number.isNaN(parseInt(rawWeight, 10))) isBold = parseInt(rawWeight, 10) >= 700;
      const rawSize = (style.getPropertyValue("font-size") || "").trim();
      if (!fontSize && rawSize) {
        if (rawSize.endsWith("px")) fontSize = parseFloat(rawSize);
        if (rawSize.endsWith("pt")) fontSize = parseFloat(rawSize) * 1.333;
      }
      node = node.parentElement;
    }
    const sizePx = fontSize || getInlineFontSizePx(el) || 16;
    return isBold ? sizePx >= 18.667 : sizePx >= 24;
  };
  var hasInlineEvent = (el, names) => names.some((name) => el && el.hasAttribute && el.hasAttribute(name));
  var hasClickHandler = (el) => hasInlineEvent(el, ["onclick", "onmousedown", "onmouseup", "onpointerdown", "onpointerup", "ontouchstart", "ontouchend"]);
  var hasKeyboardEvent = (el) => hasInlineEvent(el, ["onkeydown", "onkeyup", "onkeypress"]);
  var naturallyKeyboardFocusable = (el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === "a") {
      return isTruthyText(el.getAttribute("href")) && !isPlaceholderHref(el.getAttribute("href"));
    }
    return ["button", "input", "select", "textarea", "summary", "option", "label"].includes(tag);
  };
  var keyboardAccessibilityIssue = (el) => {
    if (!el || !el.tagName) return null;
    const role = (el.getAttribute("role") || "").toLowerCase();
    if (!hasClickHandler(el) && !["button", "link"].includes(role)) return null;
    if (naturallyKeyboardFocusable(el)) return null;
    if (!role && hasClickHandler(el)) {
      return `Clickable ${el.tagName.toLowerCase()} is missing a semantic role (button/link) for keyboard users`;
    }
    const tabindexValue = (el.getAttribute("tabindex") || "").trim();
    const tabindex = parseInt(tabindexValue, 10);
    if (!Number.isNaN(tabindex) && tabindex < 0) return `Negative tabindex (${tabindex}) removes this clickable control from keyboard order`;
    if (Number.isNaN(tabindex) && role) return `Missing tabindex on clickable ${role} element`;
    if ((role === "link" || role === "button") && tabindexValue === "") return `Missing tabindex on clickable ${role} element`;
    if (!hasKeyboardEvent(el)) return `No keyboard activation handler (Enter/Space) on clickable ${role || "interactive"} element`;
    return null;
  };
  var buildFacultyGuidance = (criterion, issue = "", fix = "", element = null) => {
    const where = getElementPath(element) || "this content";
    const normalized = issue.toLowerCase();
    const fallback = {
      why: "This may block students who use a screen reader or who can only navigate by keyboard.",
      how: "Open the original document (Word, Google Doc, PowerPoint, etc.) and fix it there, then re-export. If you're seeing this on an HTML export, the issue is in the source file.",
      example: null,
      where
    };
    if (criterion === "1.1.1") {
      if (normalized.includes("missing alt")) {
        return {
          ...fallback,
          why: "An image here has no text description. A blind student using a screen reader will hear nothing where this image is \u2014 they won't know it exists or what it shows.",
          how: "In the source document:\n\u2022 Word or PowerPoint: right-click the image \u2192 Edit Alt Text \u2192 write a one-sentence description.\n\u2022 Google Docs or Slides: right-click the image \u2192 Alt text (or Cmd+Option+Y on Mac).\n\u2022 PDF: open in Adobe Acrobat Pro or UPDF \u2192 Tags panel \u2192 add an /Alt entry.\nIf the image is purely decorative (a divider, a border, a logo that adds no information), mark it as decorative so the screen reader skips it.",
          example: 'Good description: "Bar chart showing course enrollment dropping fifteen percent from 2020 to 2025." \u2014 Bad description: "chart" or "image" or "IMG_4521.jpg".'
        };
      }
      if (normalized.includes("filename")) {
        return {
          ...fallback,
          why: `The text description here is just the file's name (something like "IMG_4521.jpg" or "hero-banner.png"). A student hearing that read aloud learns nothing about what the image shows.`,
          how: "Replace the filename with a real one-sentence description of what the image shows or means in your course context. Use the same right-click \u2192 Edit Alt Text path as above.",
          example: 'Replace "hero-banner.png" with "Students sharing feedback at a wooden workshop table."'
        };
      }
    }
    if (criterion === "1.2.2") {
      if (normalized.includes("iframe missing title")) {
        return {
          ...fallback,
          why: `An embedded video or other media has no description of what it is. Students using screen readers hear only "frame" \u2014 no clue what's inside before they decide whether to play it.`,
          how: "If you embedded this through Brightspace or a course site editor, find the embed and add a title or description in the embed's settings. If you copied an embed code from YouTube or Kaltura, add a short title to the embed before pasting it back.",
          example: 'Title the embed something like "Peer review rubric walkthrough \u2014 eight minutes."'
        };
      }
      return {
        ...fallback,
        why: "A video on this page may not have captions. Students who are deaf or hard of hearing \u2014 and any student watching in a quiet space without headphones \u2014 cannot access the spoken content.",
        how: "For YouTube videos you uploaded: open the video in YouTube Studio \u2192 Subtitles \u2192 review and edit auto-generated captions; auto-captions alone do NOT meet the legal standard.\nFor Kaltura videos in Brightspace: open the video \u2192 Actions \u2192 Captions \u2192 Edit Captions.\nFor Zoom recordings: enable cloud recording with audio transcript, then edit the transcript before sharing.\nFor your own videos: MacWhisper (Mac) generates accurate caption files locally that you upload to wherever the video lives.",
        example: "Auto-captions miss accents, technical vocabulary, and background noise. Always review and correct before declaring a video accessible."
      };
    }
    if (criterion === "1.3.1") {
      if (normalized.includes("skip")) {
        return {
          ...fallback,
          why: 'Students who navigate by keyboard (no mouse) currently have to tab through every menu item before reaching your actual content. A "skip to main content" link lets them jump straight to the page body.',
          how: "This is usually controlled by your course site theme or LMS template. If you have a custom course site, ask your web help desk to add a skip link. If you're using Brightspace's standard course pages, this is the platform's responsibility \u2014 not yours.",
          example: null
        };
      }
      if (normalized.includes("no h1") || normalized.includes("heading skip")) {
        return {
          ...fallback,
          why: "Heading levels are out of order, or there's no main heading at the top of the page. Screen readers use headings to skim a document the way you do visually \u2014 without proper structure, your student hears one undifferentiated wall of text.",
          how: "In Word: select your title \u2192 click Heading 1 in the Styles panel. Section titles \u2192 Heading 2. Subsections \u2192 Heading 3. Don't skip levels (no jumping from Heading 1 to Heading 3).\nIn Google Docs: select text \u2192 Format \u2192 Paragraph styles \u2192 Heading 1, 2, 3.\nIn Brightspace HTML editor: select text \u2192 use the Format dropdown \u2192 Heading 1/2/3.\nDo NOT just make text big and bold \u2014 that looks like a heading but is invisible to a screen reader.",
          example: "Use Heading 1 for the page or document title. Heading 2 for major sections (Week 1, Week 2). Heading 3 for items inside those sections (Reading, Assignment)."
        };
      }
      if (normalized.includes("data table")) {
        return {
          ...fallback,
          why: "A table here has no header row marked. Screen reader users hear cell after cell with no way to know which column or row label applies \u2014 like reading a spreadsheet column by column with no idea what each number means.",
          how: `In Word: click anywhere in the table \u2192 Table Design tab \u2192 check "Header Row." Then Table Properties \u2192 Row \u2192 check "Repeat as header row at the top of each page."
In Google Docs: tables don't have a true header row feature \u2014 consider whether the data really needs a table; if it does, replicate the header text in the first row and rely on the structure being clear from context.
In Brightspace HTML editor: use the table tool's properties \u2192 set the first row as a header.`,
          example: 'A header row labels the columns. Without it, a screen reader reads "42, 38, 45" with no idea those are enrollment numbers.'
        };
      }
    }
    if (criterion === "2.4.1") {
      return {
        ...fallback,
        why: "Keyboard-only users (and many screen reader users) need a reliable way to jump straight to your content without tabbing through every navigation menu first.",
        how: 'This is normally handled by your course site theme or LMS template, not by you as a content author. If you maintain a custom course website, ask the developer to add a "Skip to main content" link as the first focusable element.',
        example: null
      };
    }
    if (criterion === "2.4.2") {
      return {
        ...fallback,
        why: "Each page or document needs a title that tells the student where they are. The title shows up in browser tabs and in screen reader announcements when the page loads.",
        how: `In Word: File \u2192 Info \u2192 Properties \u2192 Title. Or File \u2192 Save As \u2192 expand Tools \u2192 Document Properties.
In Google Docs: File \u2192 Document details \u2192 Title (or just rename the document \u2014 Google uses the document name as the title).
In PowerPoint: File \u2192 Info \u2192 Properties \u2192 Title.
In a PDF: File \u2192 Properties \u2192 Description \u2192 Title.
In Brightspace pages: the page name IS the title; just make sure it's descriptive, not "Untitled."`,
        example: 'Use "ENG 307 \u2014 Week 3 \u2014 Assignment Instructions" rather than "Untitled" or just "Document."'
      };
    }
    if (criterion === "2.4.3") {
      return {
        ...fallback,
        why: "Keyboard users tab through the page in a specific order. A custom focus order here may jump them around unpredictably \u2014 confusing for everyone, disorienting for screen reader users.",
        how: "This is almost always a developer-side issue, not a content-author issue. If you see this on a Word or Google Docs export, you can ignore it \u2014 the export tool added it. If it's on a custom course website, ask your web help desk to remove the custom tabindex values.",
        example: null
      };
    }
    if (criterion === "1.4.3") {
      return {
        ...fallback,
        why: "Text here doesn't have enough contrast against its background \u2014 students with low vision, or anyone reading on a low-quality monitor or in bright sunlight, may not be able to read it.",
        how: "Avoid light gray text on white backgrounds, or yellow text on pale backgrounds. Use dark text (near-black) on light backgrounds, or light text on dark backgrounds. If you're unsure, the WebAIM Contrast Checker (free, online) accepts two colors and tells you whether they pass.\nIn PowerPoint and Word: stick with the default text color on the default background unless you have a strong reason to change it.\nIn course site themes: use the Brightspace default theme, which is contrast-checked.",
        example: "Black or dark gray (#1a1a1a) on white passes easily. Light gray (#999) on white fails."
      };
    }
    if (criterion === "2.1.1") {
      return {
        ...fallback,
        why: "An interactive element here can be clicked with a mouse but cannot be activated with the keyboard. Students who can't use a mouse \u2014 including many screen reader users and students with motor impairments \u2014 are locked out.",
        how: "This is a developer-side issue with custom course site code. If you see this on an exported Word or Google Docs page, ignore it \u2014 the export tool inserted custom controls. If it's on a custom course site you maintain, ask your developer to use a real button or link instead of a clickable div.",
        example: null
      };
    }
    if (criterion === "2.4.4") {
      if (normalized.includes("vague link text")) {
        return {
          ...fallback,
          why: 'A link here uses vague text like "click here," "read more," or "this link." Screen reader users often pull up a list of all links on a page and read them out of context \u2014 a bunch of links that all say "click here" tells them nothing about where they go.',
          how: "Rewrite the link text to describe the destination. Select the existing link text in your editor (Word, Google Docs, Brightspace) and retype it.",
          example: 'Replace "Click here for the syllabus" with "Read the Course Syllabus (PDF)." Replace "this link" with the actual destination name.'
        };
      }
      if (normalized.includes("anchor without usable href") || normalized.includes("javascript:")) {
        return {
          ...fallback,
          why: "A link here doesn't actually go anywhere \u2014 its destination is empty or is a piece of JavaScript code that may not work for keyboard users.",
          how: "If this is on a custom course site, ask your developer to either point the link to a real URL or convert it to a button.",
          example: null
        };
      }
    }
    if (criterion === "3.1.1") {
      return {
        ...fallback,
        why: "The document doesn't tell screen readers what language it's in. A reader may pronounce English words with Spanish phonetics or vice versa \u2014 confusing and inaccessible.",
        how: "In Word: File \u2192 Options \u2192 Language \u2192 set the proofing language for the document.\nIn Google Docs: File \u2192 Language \u2192 English (or whichever applies).\nIn PDF: File \u2192 Properties \u2192 Advanced \u2192 Language.\nMost LMS platforms set this automatically based on the system language; you don't usually need to touch it for Brightspace pages.",
        example: null
      };
    }
    if (criterion === "4.1.2") {
      if (normalized.includes("button") && normalized.includes("no accessible name")) {
        return {
          ...fallback,
          why: 'A button here has no readable label. Screen reader users hear "button" with no clue what it does.',
          how: "If this is on a custom course site or form, find the button and add visible text inside it. If you can't see the button in your editor, this may be a form control inserted by the platform \u2014 contact your help desk.",
          example: 'A button labeled "Submit Quiz" is clear; an unlabeled button is invisible.'
        };
      }
      if (normalized.includes('target="_blank"')) {
        return {
          ...fallback,
          why: "A link here opens in a new tab without warning. Screen reader users may not realize they've left the original page; some browsers also expose the original page to security risks.",
          how: 'If you control the link in a course site editor, look for a "Security" or "Advanced" attribute and check "noopener." Or remove the "open in new tab" setting and let the link open normally \u2014 most modern browsers handle that fine.',
          example: null
        };
      }
      if (normalized.includes("label")) {
        return {
          ...fallback,
          why: 'A form field here has no label. Students using screen readers hear "edit text" with no indication of what to type.',
          how: "In Google Forms: every question is automatically labeled \u2014 make sure the question text is clear.\nIn Qualtrics: each question's text serves as the label \u2014 write descriptive question text.\nIn a custom HTML form: ask your web help desk to add label tags around or before each input field.",
          example: 'Label every form field clearly: "Your full name," "Quiz code," etc. \u2014 not just empty boxes.'
        };
      }
      return {
        ...fallback,
        why: "An interactive control here doesn't expose its name, role, or current value to screen readers. The student knows something is there but can't tell what it is or how to use it.",
        how: "Most often this comes from a custom course site or third-party plugin. If you see it on an exported Word or Google Docs page, you can ignore it. If it's on a course site you control, ask the developer.",
        example: null
      };
    }
    return fallback;
  };
  async function fixHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html || "", "text/html");
    const fixes = [];
    const htmlEl = doc.querySelector("html");
    if (htmlEl && !htmlEl.getAttribute("lang")) {
      htmlEl.setAttribute("lang", "en");
      fixes.push({ criterion: "3.1.1", description: "Added lang='en' to <html> element" });
    } else if (htmlEl && !hasSafeLang(htmlEl.getAttribute("lang") || "")) {
      htmlEl.setAttribute("lang", "en");
      fixes.push({ criterion: "3.1.1", description: "Replaced invalid lang value with 'en'" });
    }
    const titleEl = doc.querySelector("title");
    if (!titleEl || !titleEl.textContent.trim()) {
      if (!titleEl) {
        const t = doc.createElement("title");
        t.textContent = "Course Page";
        (doc.querySelector("head") || doc.documentElement).prepend(t);
      } else {
        titleEl.textContent = "Course Page";
      }
      fixes.push({ criterion: "2.4.2", description: "Added placeholder <title> \u2014 replace with actual course name" });
    }
    const body = doc.querySelector("body");
    const links = Array.from(doc.querySelectorAll("a[href]"));
    const hasSkip = links.some((a) => {
      const href = a.getAttribute("href") || "";
      const text = a.textContent.toLowerCase();
      return href.includes("#") && /skip|jump|main.?content/.test(text);
    });
    if (body && !hasSkip) {
      const skipLink = doc.createElement("a");
      skipLink.setAttribute("href", "#main-content");
      skipLink.setAttribute("class", "skip-to-main");
      skipLink.setAttribute("style", "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden");
      skipLink.textContent = "Skip to main content";
      body.insertBefore(skipLink, body.firstChild);
      const main = doc.querySelector("main") || doc.querySelector("[role='main']");
      if (main && !main.getAttribute("id")) {
        main.setAttribute("id", "main-content");
      } else if (!main) {
        const mainEl = doc.createElement("main");
        mainEl.setAttribute("id", "main-content");
        mainEl.setAttribute("tabindex", "-1");
        const children = Array.from(body.children).filter((c) => c !== skipLink);
        children.forEach((c) => mainEl.appendChild(c));
        body.appendChild(mainEl);
      }
      fixes.push({ criterion: "2.4.1", description: "Added visually-hidden skip-to-main-content link before body content" });
    }
    const images = Array.from(doc.querySelectorAll("img"));
    for (const img of images) {
      const alt = img.getAttribute("alt");
      const src = img.getAttribute("src") || "";
      if (alt === null) {
        const filename = normalizeFilenameToLabel(src.split("/").pop());
        const isDecorative = looksDecorativeImage(src);
        if (isDecorative) {
          img.setAttribute("alt", "");
          img.setAttribute("role", "presentation");
          fixes.push({ criterion: "1.1.1", description: `Set alt='' role='presentation' on decorative image: ${src.split("/").pop().slice(0, 40)}` });
        } else {
          let generatedAlt = "";
          if (isUsefulImageLabel(filename)) {
            generatedAlt = `${filename.charAt(0).toUpperCase() + filename.slice(1)}` || "Course image";
            img.setAttribute("alt", generatedAlt);
            img.setAttribute("data-tls-needs-review", "alt-text");
            fixes.push({ criterion: "1.1.1", description: `Added filename-based alt='${generatedAlt}' \u2014 REVIEW THIS (marked with data-tls-needs-review)` });
          } else {
            const aiAlt = await fetchVisionAltText(src);
            generatedAlt = aiAlt || "Descriptive image of course content";
            img.setAttribute("alt", generatedAlt);
            if (aiAlt) {
              img.setAttribute("data-tls-ai-alt", "true");
              img.setAttribute("data-tls-needs-review", "alt-text");
              fixes.push({ criterion: "1.1.1", description: `Generated alt text using AI vision service: "${generatedAlt}".` });
            } else {
              img.setAttribute("data-tls-needs-review", "alt-text");
              fixes.push({ criterion: "1.1.1", description: `Added placeholder alt='${generatedAlt}' because filename was not descriptive. Replace with precise text.` });
            }
          }
        }
      } else if (alt && /\.(jpg|png|svg|gif|webp)/i.test(alt)) {
        const cleaned = normalizeFilenameToLabel(alt);
        img.setAttribute("alt", cleaned);
        fixes.push({ criterion: "1.1.1", description: `Cleaned filename-style alt text: "${alt}" \u2192 "${cleaned}"` });
      }
    }
    doc.querySelectorAll("iframe").forEach((iframe) => {
      const src = iframe.getAttribute("src") || "";
      const title = iframe.getAttribute("title") || "";
      const isVideo = /youtube|youtu\.be|vimeo|loom/.test(src);
      if (!title) {
        if (isVideo) {
          iframe.setAttribute("title", "Video \u2014 add descriptive title here");
          iframe.setAttribute("data-tls-needs-review", "video-title");
          fixes.push({ criterion: "1.2.2", description: "Added placeholder title to video iframe \u2014 replace with actual description" });
        } else {
          iframe.setAttribute("title", "Embedded content \u2014 add descriptive title here");
          iframe.setAttribute("data-tls-needs-review", "iframe-title");
          fixes.push({ criterion: "4.1.2", description: "Added placeholder title to iframe \u2014 replace with actual description" });
        }
      }
      if (isVideo) {
        if (/youtube/.test(src) && !src.includes("cc_load_policy=1")) {
          const newSrc = src.includes("?") ? src + "&cc_load_policy=1" : src + "?cc_load_policy=1";
          iframe.setAttribute("src", newSrc);
          fixes.push({ criterion: "1.2.2", description: "Added cc_load_policy=1 to YouTube URL to enforce caption display" });
        }
      }
    });
    doc.querySelectorAll("a[href]").forEach((a) => {
      const txt = normalizeLinkText(a.textContent);
      const aria = (a.getAttribute("aria-label") || "").toLowerCase();
      if (VAGUE_LINK_TEXT.has(txt) && !aria) {
        const href = a.getAttribute("href") || "";
        const guessed = href.replace(/^.*\//, "").replace(/[#?].*$/, "").replace(/[-_.]/g, " ").replace(/\.[^.]+$/, "").trim() || "this page";
        const label = guessed.charAt(0).toUpperCase() + guessed.slice(1);
        a.setAttribute("aria-label", label);
        a.setAttribute("data-tls-needs-review", "link-text");
        fixes.push({ criterion: "2.4.4", description: `Added aria-label='${label}' to vague link "${a.textContent.trim()}" \u2014 REVIEW` });
      }
    });
    doc.querySelectorAll("a[href]").forEach((a) => {
      if (externalBlankNeedsRel(a)) {
        const next = ensureSafeRel(a.getAttribute("rel") || "");
        a.setAttribute("rel", next);
        fixes.push({ criterion: "4.1.2", description: `Added rel='noopener noreferrer' to target="_blank" link: ${a.getAttribute("href") || "unknown"}` });
      }
    });
    doc.querySelectorAll("button").forEach((btn, i) => {
      const txt = btn.textContent.trim();
      if (!txt && !btn.getAttribute("aria-label") && !btn.getAttribute("aria-labelledby")) {
        btn.setAttribute("aria-label", "Button \u2014 add label here");
        btn.setAttribute("data-tls-needs-review", "button-label");
        fixes.push({ criterion: "4.1.2", description: `Added placeholder aria-label to unlabeled button \u2014 REVIEW` });
      }
      if (!btn.getAttribute("type")) {
        btn.setAttribute("type", "button");
        fixes.push({ criterion: "4.1.2", description: "Set missing button type='button' to prevent accidental form submissions." });
      }
    });
    const socialMap = SOCIAL_PLATFORM_LABELS;
    doc.querySelectorAll("a[href]").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      const txt = a.textContent.trim();
      const aria = a.getAttribute("aria-label") || "";
      if (!txt && !aria) {
        const platform = Object.keys(socialMap).find((k) => href.includes(k));
        if (platform) {
          a.setAttribute("aria-label", `${socialMap[platform]} page`);
          fixes.push({ criterion: "4.1.2", description: `Added aria-label='${socialMap[platform]} page' to social icon link` });
        }
      }
    });
    doc.querySelectorAll("a").forEach((a) => {
      const href = (a.getAttribute("href") || "").trim();
      if (isPlaceholderHref(href)) {
        a.setAttribute("href", "#top");
        if (!a.getAttribute("id")) a.setAttribute("id", nextTlsId("link"));
        fixes.push({ criterion: "2.4.4", description: `Replaced empty href with #top on link: ${a.textContent.trim() || a.getAttribute("id") || "unlabeled link"}` });
      } else if (href.startsWith("javascript:")) {
        a.setAttribute("href", "#top");
        a.setAttribute("data-tls-needs-review", "javascript-link");
        fixes.push({ criterion: "4.1.2", description: `Replaced javascript: href with #top on link: ${a.textContent.trim() || a.getAttribute("href") || "unlabeled link"}` });
      }
    });
    doc.querySelectorAll("input, select, textarea").forEach((field, i) => {
      const tagName = field.tagName.toLowerCase();
      if (tagName === "input" && field.getAttribute("type") === "hidden") return;
      if (!hasLabeledField(doc, field)) {
        const labelText = controlAutoLabel(field);
        field.setAttribute("aria-label", labelText);
        fixes.push({ criterion: "4.1.2", description: `Added aria-label='${labelText}' to unlabeled ${tagName}` });
      }
    });
    collectDuplicateIds(doc).forEach((id) => {
      fixes.push({ criterion: "4.1.2", description: `Duplicate id found: '${id}'` });
    });
    doc.querySelectorAll("form").forEach((form, i) => {
      if (!form.getAttribute("method")) {
        form.setAttribute("method", "post");
        fixes.push({ criterion: "4.1.2", description: `Set default form method='post' for form #${i + 1}` });
      }
      if (!form.getAttribute("action")) {
        form.setAttribute("action", "#");
        fixes.push({ criterion: "4.1.2", description: `Set fallback form action='#' for form #${i + 1}` });
      }
    });
    if (!doc.querySelector("main, [role='main']")) {
      const bodyEl = doc.querySelector("body");
      if (bodyEl) {
        const mainEl = doc.createElement("main");
        mainEl.setAttribute("id", "main-content");
        mainEl.setAttribute("tabindex", "-1");
        while (bodyEl.firstChild) {
          if (bodyEl.firstChild.classList && bodyEl.firstChild.classList.contains("skip-to-main")) {
            bodyEl.removeChild(bodyEl.firstChild);
            continue;
          }
          mainEl.appendChild(bodyEl.firstChild);
        }
        bodyEl.appendChild(mainEl);
        fixes.push({ criterion: "2.4.1", description: "Added fallback <main id='main-content'> for pages without a main landmark." });
      }
    }
    const headings = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6"));
    for (let i = 1; i < headings.length; i++) {
      const prev = parseInt(headings[i - 1].tagName[1]);
      const curr = parseInt(headings[i].tagName[1]);
      if (curr - prev > 1) {
        const correct = prev + 1;
        const newH = doc.createElement(`h${correct}`);
        newH.innerHTML = headings[i].innerHTML;
        Array.from(headings[i].attributes).forEach((attr) => newH.setAttribute(attr.name, attr.value));
        headings[i].parentNode.replaceChild(newH, headings[i]);
        headings[i] = newH;
        fixes.push({ criterion: "1.3.1", description: `Fixed heading skip: h${curr} \u2192 h${correct} ("${newH.textContent.trim().slice(0, 40)}")` });
      }
    }
    doc.querySelectorAll("video, audio").forEach((media) => {
      const tagName = media.tagName.toLowerCase();
      const hasSource = media.querySelector("source") || media.getAttribute("src");
      if (!media.hasAttribute("controls") && hasSource) {
        media.setAttribute("controls", "");
        fixes.push({ criterion: "1.2.2", description: `Added controls to <${tagName}> for user control.` });
      }
      if (tagName === "video" && hasSource && !hasCaptionsTrack(media)) {
        media.setAttribute("data-tls-needs-review", "video-captions");
        fixes.push({ criterion: "1.2.2", description: "Flagged video for caption track review. Ensure captions or transcript are available." });
      }
    });
    doc.querySelectorAll("[tabindex]").forEach((el) => {
      const raw = (el.getAttribute("tabindex") || "").trim();
      const tabindex = parseInt(raw, 10);
      if (!Number.isNaN(tabindex) && tabindex > 0) {
        el.setAttribute("tabindex", "0");
        fixes.push({ criterion: "2.4.3", description: `Replaced tabindex='${raw}' with '0' on ${el.tagName.toLowerCase()}.` });
      }
    });
    Array.from(doc.querySelectorAll("*")).forEach((el) => {
      if (hasStyleDisplayNone(el)) return;
      const tag = el.tagName.toLowerCase();
      const issue = keyboardAccessibilityIssue(el);
      if (!issue) return;
      const role = (el.getAttribute("role") || "").toLowerCase();
      if (!role) {
        el.setAttribute("role", "button");
        fixes.push({ criterion: "2.1.1", description: `Set role='button' on clickable ${tag} with onclick handler.` });
      }
      const rawTabindex = (el.getAttribute("tabindex") || "").trim();
      const tabindex = parseInt(rawTabindex, 10);
      if (Number.isNaN(tabindex) || tabindex < 0) {
        el.setAttribute("tabindex", "0");
        fixes.push({ criterion: "2.1.1", description: `Set tabindex='0' on ${tag} with clickable behavior to restore keyboard focusability.` });
      }
      if (!hasKeyboardEvent(el)) {
        el.setAttribute("data-tls-needs-review", "keyboard-handler");
        fixes.push({ criterion: "2.1.1", description: `Marked ${tag} for keyboard activation review (Enter/Space).` });
      }
    });
    Array.from(doc.querySelectorAll("body *")).forEach((el) => {
      if (["script", "style", "noscript", "template", "svg", "canvas", "path"].includes(el.tagName.toLowerCase())) return;
      if (el.getAttribute("aria-hidden") === "true") return;
      if (hasStyleDisplayNone(el)) return;
      if (!hasOwnVisibleText(el)) return;
      const fg = getInlineTextColor(el);
      const bg = getInlineBgColor(el);
      if (!fg || !bg) return;
      const ratio = contrastRatio(fg, bg);
      if (!ratio) return;
      const required = isLargeText(el) ? 3 : 4.5;
      if (ratio < required) {
        el.setAttribute("data-tls-needs-review", "low-contrast");
        fixes.push({
          criterion: "1.4.3",
          description: `Flagged potential low-contrast text on <${el.tagName.toLowerCase()}> (contrast ${ratio.toFixed(2)}:1, required ${required}:1).`
        });
      }
    });
    const fixedHTML = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
    return { fixedHTML, fixes };
  }
  function auditHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html || "", "text/html");
    const findings = [];
    let passCount = 0;
    const add = (criterion, level, severity, issue, element, fix, category = null) => {
      const where = getElementPath(element);
      const guidance = buildFacultyGuidance(criterion, issue, fix, element);
      const resolvedCategory = category || getFindingCategory(criterion, level, issue, fix, severity);
      const resolvedSeverity = normalizeSeverity(level, severity, resolvedCategory);
      findings.push({
        criterion,
        level,
        severity: resolvedSeverity,
        issue,
        element: element ? (element.outerHTML || "").slice(0, 120) : null,
        where,
        guidance: guidance || {},
        fix,
        category: resolvedCategory,
        source: "static",
        confidence: "medium",
        requiresManualReview: false,
        ruleSetLabel: "Static analysis only.",
        id: findings.length
      });
    };
    doc.querySelectorAll("img").forEach((img) => {
      const alt = img.getAttribute("alt");
      const src = img.getAttribute("src") || "";
      if (alt === null) add("1.1.1", "A", "critical", `Image missing alt: ${src.split("/").pop().slice(0, 50)}`, img, "Add alt='' or descriptive alt text");
      else if (alt && /\.(jpg|png|svg|gif)/i.test(alt)) add("1.1.1", "A", "warning", `Alt looks like filename: "${alt.slice(0, 40)}"`, img, "Replace with meaningful description");
      else passCount++;
    });
    doc.querySelectorAll("iframe").forEach((iframe) => {
      const src = iframe.getAttribute("src") || "";
      const title2 = iframe.getAttribute("title") || "";
      if (/youtube|youtu\.be|vimeo|loom/.test(src)) {
        if (!title2) add("1.2.2", "A", "critical", `Video iframe missing title: ${src.slice(0, 60)}`, iframe, "Add title='description'");
        else passCount++;
        if (/youtube/.test(src) && !src.includes("cc_load_policy=1")) add("1.2.2", "A", "warning", "YouTube embed may not enforce captions", iframe, "Add cc_load_policy=1 to URL");
      } else if (!title2) {
        add("4.1.2", "A", "warning", `Iframe missing title: ${src.slice(0, 60)}`, iframe, "Add a descriptive title.");
      }
    });
    doc.querySelectorAll("video, audio").forEach((media) => {
      const tagName = media.tagName.toLowerCase();
      const hasSource = media.querySelector("source") || media.getAttribute("src");
      if (!media.hasAttribute("controls") && hasSource) {
        add("1.2.2", "A", "warning", `${tagName.toUpperCase()} is missing controls`, media, "Add controls attribute.");
      }
      if (tagName === "video" && hasSource && !hasCaptionsTrack(media)) {
        add("1.2.2", "A", "warning", "Video may be missing captions/subtitles track", media, "Add captions track or link transcript.");
      }
    });
    doc.querySelectorAll("[tabindex]").forEach((el) => {
      const raw = (el.getAttribute("tabindex") || "").trim();
      const tabindex = parseInt(raw, 10);
      if (!Number.isNaN(tabindex) && tabindex > 0) {
        add("2.4.3", "A", "advisory", `Positive tabindex="${raw}" on <${el.tagName.toLowerCase()}>`, el, "Remove positive tabindex and rely on document order.", "quality");
      }
    });
    Array.from(doc.querySelectorAll("*")).forEach((el) => {
      if (hasStyleDisplayNone(el)) return;
      const issue = keyboardAccessibilityIssue(el);
      if (issue) add("2.1.1", "A", "warning", issue, el, "Use semantic controls or add tabindex plus keyboard handlers.");
    });
    Array.from(doc.querySelectorAll("body *")).forEach((el) => {
      if (["script", "style", "noscript", "template", "svg", "canvas", "path"].includes(el.tagName.toLowerCase())) return;
      if (el.getAttribute("aria-hidden") === "true") return;
      if (hasStyleDisplayNone(el)) return;
      if (!hasOwnVisibleText(el)) return;
      const fg = getInlineTextColor(el);
      const bg = getInlineBgColor(el);
      if (!fg || !bg) return;
      const ratio = contrastRatio(fg, bg);
      if (!ratio) return;
      const required = isLargeText(el) ? 3 : 4.5;
      if (ratio < required) {
        add("1.4.3", "AA", "warning", `Low contrast on <${el.tagName.toLowerCase()}>: ${ratio.toFixed(2)}:1 (required ${required}:1)`, el, "Increase text/background contrast per WCAG 1.4.3.");
      } else {
        passCount++;
      }
    });
    const links = Array.from(doc.querySelectorAll("a"));
    const hasSkip = links.some((a) => {
      const href = a.getAttribute("href") || "";
      const text = a.textContent.toLowerCase();
      return href.includes("#") && /skip|jump|main.?content/.test(text);
    });
    if (!hasSkip) add("2.4.1", "A", "warning", "No skip-navigation link found", null, "Add skip-to-main link as first link");
    else passCount++;
    const title = doc.querySelector("title");
    if (!title || !title.textContent.trim()) add("2.4.2", "A", "critical", "Page missing <title>", null, "Add descriptive <title>");
    else passCount++;
    const htmlEl = doc.querySelector("html");
    if (!htmlEl || !htmlEl.getAttribute("lang")) add("3.1.1", "A", "critical", "<html> missing lang attribute", htmlEl, "Add lang='en'");
    else if (!hasSafeLang(htmlEl.getAttribute("lang") || "")) add("3.1.1", "A", "warning", `Unrecognized lang value: ${htmlEl.getAttribute("lang")}`, htmlEl, "Use a valid language code (for example en, en-US)");
    else passCount++;
    const h1s = doc.querySelectorAll("h1");
    if (h1s.length === 0) add("1.3.1", "A", "warning", "No h1 element found", null, "Add one h1 as main heading");
    else if (h1s.length > 1) add("1.3.1", "A", "warning", `${h1s.length} h1 elements \u2014 should be one`, null, "Use single h1");
    else passCount++;
    const hasMain = !!doc.querySelector("main, [role='main']");
    if (!hasMain) add("1.3.1", "A", "warning", "No main landmark found", null, "Add <main> or role='main' landmark");
    else passCount++;
    const headings = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6"));
    const levels = headings.map((h) => parseInt(h.tagName[1]));
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        add("1.3.1", "A", "warning", `Heading skip: h${levels[i - 1]}\u2192h${levels[i]}: "${headings[i].textContent.trim().slice(0, 35)}"`, headings[i], `Change to h${levels[i - 1] + 1}`);
      }
    }
    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").trim();
      const txt = normalizeLinkText(a.textContent);
      const aria = (a.getAttribute("aria-label") || "").toLowerCase();
      if (VAGUE_LINK_TEXT.has(txt) && !aria) add("2.4.4", "A", "warning", `Vague link text: "${a.textContent.trim()}"`, a, "Use descriptive text or aria-label");
    });
    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").trim();
      if (isPlaceholderHref(href)) add("2.4.4", "A", "critical", "Anchor without usable href", a, "Add href or replace with button.");
      if (href.toLowerCase() === "javascript:void(0)" || href.toLowerCase() === "javascript:;" || href.toLowerCase() === "javascript:void(0);")
        add("4.1.2", "A", "warning", "Anchor uses javascript: link", a, "Use a real href or a button element.");
      if (externalBlankNeedsRel(a)) add("4.1.2", "A", "advisory", 'target="_blank" without rel="noopener noreferrer"', a, "Add rel='noopener noreferrer'.", "quality");
    });
    doc.querySelectorAll("table").forEach((table) => {
      const hasDataCells = table.querySelectorAll("td").length > 0;
      const hasHeaders = table.querySelectorAll("th").length > 0;
      if (hasDataCells && !hasHeaders) {
        add("1.3.1", "A", "warning", "Data table has no <th> header cells", table, "Add <th> elements for row/column headers.");
      }
    });
    doc.querySelectorAll("button").forEach((btn) => {
      const txt = btn.textContent.trim();
      const label = (btn.getAttribute("aria-label") || "").trim();
      const labelledBy = (btn.getAttribute("aria-labelledby") || "").trim();
      const title2 = (btn.getAttribute("title") || "").trim();
      if (!isTruthyText(txt) && !isTruthyText(label) && !isTruthyText(labelledBy) && !isTruthyText(title2))
        add("4.1.2", "A", "critical", "Button has no accessible name", btn, "Add text or aria-label");
      else passCount++;
      const type = (btn.getAttribute("type") || "submit").toLowerCase();
      if (type === "submit" && !btn.form) add("4.1.2", "A", "advisory", "Submit button is not inside a form", btn, "Set type='button' unless it submits a form.", "quality");
    });
    const socialKw = ["facebook", "twitter", "instagram", "linkedin", "youtube", "tiktok"];
    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      const txt = a.textContent.trim();
      const aria = a.getAttribute("aria-label") || "";
      if (socialKw.some((s) => href.includes(s))) {
        if (!txt && !aria) add("4.1.2", "A", "warning", `Social icon link missing accessible name: ${href.slice(0, 60)}`, a, "Add aria-label='Platform name'");
        else passCount++;
      }
    });
    doc.querySelectorAll("input, select, textarea").forEach((field) => {
      const tagName = field.tagName.toLowerCase();
      if (tagName === "input" && field.getAttribute("type") === "hidden") return;
      if (!hasLabeledField(doc, field)) {
        const sev = tagName === "input" && !field.getAttribute("placeholder") ? "critical" : "warning";
        add("4.1.2", "A", sev, `${tagName.toUpperCase()} has no label`, field, "Add <label> or aria-label");
      } else passCount++;
    });
    collectDuplicateIds(doc).forEach((id) => {
      add("4.1.2", "A", "advisory", `Duplicate id found: '${id}'`, null, "Make IDs unique.", "quality");
    });
    const total = findings.length + passCount;
    const score = total > 0 ? Math.round(passCount / total * 100) : 100;
    return { findings, passCount, score };
  }
  var SAMPLE = `<!DOCTYPE html>
<html>
<head><title>ENG 307: Writing Fiction</title></head>
<body>
<img src="course-hero.jpg">
<img src="umaine-logo.svg">
<nav>
  <a href="assignments.html">Assignments</a>
  <a href="https://instagram.com/umaine"></a>
</nav>
<h1>Writing Fiction</h1>
<h3>Week 3: George Saunders on Revision</h3>
<iframe src="https://www.youtube.com/embed/abc123xyz"></iframe>
<p><a href="syllabus.pdf">Click here</a> to download the syllabus.</p>
<button></button>
<input type="text" placeholder="Search readings...">
</body>
</html>`;
  var WCAG_CRITERIA_SET = /* @__PURE__ */ new Set(["1.1.1", "1.2.2", "1.3.1", "2.1.1", "2.4.1", "2.4.2", "2.4.3", "2.4.4", "1.4.3", "3.1.1", "4.1.2"]);
  var escapeHtml = (value = "") => String(value).replace(/&/gu, "&amp;").replace(/</gu, "&lt;").replace(/>/gu, "&gt;").replace(/"/gu, "&quot;").replace(/'/gu, "&#39;");
  var SEV = {
    critical: { dot: "\u25CF", colorClass: "text-red-900", borderClass: "border-l-red-900", chipClass: "bg-red-900 text-white", tagClass: "bg-red-50 text-red-900 border-red-200", label: "CRITICAL" },
    warning: { dot: "\u25CF", colorClass: "text-yellow-800", borderClass: "border-l-yellow-800", chipClass: "bg-yellow-800 text-white", tagClass: "bg-yellow-50 text-yellow-800 border-yellow-200", label: "WARNING" },
    advisory: { dot: "\u25CF", colorClass: "text-green-800", borderClass: "border-l-green-800", chipClass: "bg-green-900 text-white", tagClass: "bg-green-50 text-green-800 border-green-200", label: "ADVISORY" },
    pass: { dot: "\u2713", colorClass: "text-green-800", borderClass: "border-l-green-800", chipClass: "bg-green-900 text-white", tagClass: "bg-green-50 text-green-800 border-green-200", label: "PASS" },
    info: { dot: "\u25CF", colorClass: "text-slate-700", borderClass: "border-l-blue-900", chipClass: "bg-blue-900 text-white", tagClass: "bg-blue-50 text-slate-700 border-slate-200", label: "INFO" }
  };
  var RESULT_TABS = ["audit", "fixed", "html", "contrast"];
  var AUDIT_MODE_STATIC = "static";
  var AUDIT_MODE_FULL = "full";
  var MANUAL_REVIEW_CHECKLIST = [
    { criterion: "1.1.1", description: "Verify alternative text quality and context for meaningful images." },
    { criterion: "1.3.3", description: "Ensure information is not conveyed by color, shape, or position alone." },
    { criterion: "1.4.1", description: "Confirm color is not the only means of conveying information." },
    { criterion: "2.4.6", description: "Review heading clarity and purpose for navigability." },
    { criterion: "3.1.2", description: "Check language of parts where the dominant language changes." },
    { criterion: "3.3.1", description: "Review form validation messages and error instructions for clarity." },
    { criterion: "4.1.3", description: "Verify status and live region behavior with assistive technologies." }
  ];
  var getManualReviewChecklist = () => MANUAL_REVIEW_CHECKLIST;
  var STATIC_ONLY_NOT_TESTED = [
    "color-contrast (requires browser rendering)",
    "focus-visible (requires browser rendering)",
    "keyboard navigation traps (requires browser rendering)",
    "computed style interactions"
  ];
  var LIMITATION_DISCLAIMER = "Automated analysis identifies only a subset of WCAG 2.1 AA barriers. This is not a full conformance certification.";
  var isValidAuditUrl = (value = "") => {
    try {
      const parsed = new URL(value);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };
  var mapRenderedSeverity = (value = "warning") => {
    const lower = String(value || "").toLowerCase();
    if (lower === "critical" || lower === "error" || lower === "serious") return "critical";
    if (lower === "warning" || lower === "moderate") return "warning";
    return "advisory";
  };
  var buildLimitationDisclosure = (mode = AUDIT_MODE_STATIC, ruleSetsNotTested = []) => {
    const list = (ruleSetsNotTested.length ? ruleSetsNotTested : mode === AUDIT_MODE_STATIC ? STATIC_ONLY_NOT_TESTED : []).map((item) => `  - ${item}`).join("\n");
    const modeLabel = mode === AUDIT_MODE_FULL ? "FULL (static + rendered, phase 1 limited rule set)." : "STATIC ONLY.";
    return `${LIMITATION_DISCLAIMER}

Audit mode: ${modeLabel}${list ? `

Not tested:
${list}` : ""}`;
  };
  var deduplicateFindings = (findings = []) => {
    const seen = /* @__PURE__ */ new Set();
    return findings.filter((finding) => {
      const selector = (finding.where || finding.element || "").slice(0, 120);
      const snippet = (finding.issue || finding.fix || "").slice(0, 120);
      const key = `${finding.source || "static"}|${finding.criterion || "N/A"}|${selector}|${snippet}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  var normalizeRenderedFindings = (findings = []) => {
    return findings.map((finding, index) => {
      const firstNode = Array.isArray(finding.nodes) ? finding.nodes[0] : null;
      const where = typeof firstNode?.selector === "string" ? firstNode.selector : "";
      const snippet = typeof firstNode?.snippet === "string" ? firstNode.snippet.slice(0, 120) : "";
      const severity = mapRenderedSeverity(finding.severity);
      return {
        criterion: finding.criterion || finding.id || "N/A",
        level: "AA",
        severity,
        issue: finding.description || finding.help || "Automated rendered check detected a potential issue.",
        element: snippet,
        where,
        guidance: {
          why: finding.description || "",
          how: finding.fixInstruction || finding.help || "Review the finding and apply the recommended fix."
        },
        fix: finding.fixInstruction || finding.help || "Review and apply a fix.",
        category: getFindingCategory(finding.criterion || "", "AA", finding.description || "", finding.fixInstruction || finding.help || "", severity),
        source: "rendered",
        confidence: finding.confidence || (severity === "critical" ? "high" : "medium"),
        requiresManualReview: Boolean(finding.requiresManualReview),
        ruleSetLabel: finding.ruleSetLabel || "Phase 1 \u2014 limited rule set",
        id: index,
        helpUrl: finding.helpUrl || "",
        help: finding.help || "",
        wcag: finding.wcag || ""
      };
    });
  };
  var getFindingCategory = (criterion, _level, issue = "", fix = "", severity = "") => {
    const severityLower = `${severity || ""}`.toLowerCase();
    if (severityLower === "advisory") return "quality";
    const combined = `${criterion || ""} ${issue || ""} ${fix || ""}`.toLowerCase();
    if (combined.includes("placeholder") || combined.includes("review") || combined.includes('rel="noopener noreferrer"') || combined.includes("security")) return "quality";
    if (!criterion) return "quality";
    return WCAG_CRITERIA_SET.has(String(criterion)) ? "wcag" : "quality";
  };
  var summarizeFindings = (findings = []) => {
    const items = findings || [];
    return {
      total: items.length,
      wcag: items.filter((f) => f.category === "wcag").length,
      quality: items.filter((f) => f.category === "quality").length,
      critical: items.filter((f) => f.severity === "critical").length,
      warning: items.filter((f) => f.severity === "warning").length,
      advisory: items.filter((f) => f.severity === "advisory").length
    };
  };
  var formatContrastStatus = (value) => value ? "PASS" : "FAIL";
  var getScoreState = (score) => !Number.isFinite(score) ? "info" : score >= 80 ? "pass" : score >= 50 ? "warning" : "critical";
  var getScoreColorClass = (score) => {
    const state = getScoreState(score);
    return state === "pass" ? "text-green-800" : state === "warning" ? "text-yellow-800" : state === "critical" ? "text-red-900" : "text-slate-500";
  };
  var getScoreBarColorClass = (score) => {
    const state = getScoreState(score);
    return state === "pass" ? "bg-green-800" : state === "warning" ? "bg-yellow-800" : "bg-red-900";
  };
  var getScoreBarWidthClass = (score = 0) => {
    const clamped = Math.max(0, Math.min(100, Math.round(score / 10) * 10));
    if (clamped >= 100) return "w-full";
    if (clamped >= 95) return "w-11/12";
    if (clamped >= 85) return "w-5/6";
    if (clamped >= 75) return "w-2/3";
    if (clamped >= 65) return "w-3/5";
    if (clamped >= 55) return "w-1/2";
    if (clamped >= 45) return "w-2/5";
    if (clamped >= 35) return "w-1/3";
    if (clamped >= 25) return "w-1/4";
    return clamped >= 15 ? "w-1/6" : "w-0";
  };
  var getContrastClass = (value) => value ? "text-green-800" : "text-red-900";
  var getSevClasses = (severity) => SEV[severity] || SEV.info;
  var getShareToolUrl = () => {
    if (typeof window !== "undefined" && window.location?.href) {
      const url = new URL(SHARE_TOOL_PATH, window.location.href);
      url.searchParams.set("ref", "faculty");
      return url.toString();
    }
    return `${SHARE_TOOL_PATH}?ref=faculty`;
  };
  function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => {
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2e3);
        },
        "aria-label": copied ? "Copied to clipboard" : "Copy text to clipboard",
        className: `rounded border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition ${copied ? "bg-green-800 border-green-700 text-green-200" : "bg-blue-900 border-blue-700 text-white"} ${copied ? "" : ""}`
      },
      copied ? "\u2713 COPIED" : "COPY HTML"
    );
  }
  var ScanErrorBoundary = class extends Component {
    constructor(props) {
      super(props);
      __publicField(this, "handleReset", () => {
        this.setState({ errorMessage: "" });
        if (typeof this.props.onReset === "function") this.props.onReset();
      });
      this.state = { errorMessage: "" };
    }
    static getDerivedStateFromError(error) {
      return { errorMessage: error?.message || "A checker render error occurred." };
    }
    componentDidCatch(error, info) {
      if (typeof this.props.onError === "function") {
        this.props.onError(error, info);
      }
    }
    render() {
      if (this.state.errorMessage) {
        return /* @__PURE__ */ React.createElement("div", { className: "rounded-lg border border-red-200 bg-red-50 text-red-900 p-3.5 text-xs mb-3" }, this.state.errorMessage, /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: this.handleReset,
            className: "ml-2.5 bg-blue-900 text-white rounded border-none px-2.5 py-1.5 text-xs font-bold"
          },
          "Restart checker"
        ));
      }
      return this.props.children;
    }
  };
  function OnboardingModal({ onAgree, onDecline }) {
    return /* @__PURE__ */ React.createElement("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "tls-onboarding-title", className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-4.5 shadow-2xl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-between gap-2 mb-2.5" }, /* @__PURE__ */ React.createElement("h2", { id: "tls-onboarding-title", className: "m-0 text-lg font-semibold text-slate-700" }, "Welcome to the Faculty WCAG Checker")), /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-sm leading-6 text-slate-700" }, "This tool checks the HTML version of a course page or document for common accessibility problems. It is meant for technical users who already have an HTML file. If you don't, start with the Field Guide instead \u2014 it walks through Word, Google Docs, PowerPoint, and PDFs in plain language."), /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-sm leading-6 text-slate-700" }, "Nothing you paste leaves your browser. The check runs locally. The tool does not certify compliance and does not replace manual review."), /* @__PURE__ */ React.createElement("p", { className: "mb-2 text-sm leading-6 text-slate-700" }, /* @__PURE__ */ React.createElement("strong", null, "Where do I get HTML?"), ' In Brightspace, open the page editor and click "View Source." In Word, File \u2192 Save As \u2192 Web Page. In Google Docs, File \u2192 Download \u2192 Web Page. Open the resulting file in a text editor and copy everything.'), /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex items-center justify-end gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: onDecline,
        className: "rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
      },
      "CANCEL"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: onAgree,
        className: "rounded border border-blue-900 bg-slate-700 px-3 py-1.5 text-xs font-bold text-white"
      },
      "CONTINUE"
    ))));
  }
  function App() {
    const [input, setInput] = useState("");
    const [tab, setTab] = useState("audit");
    const [result, setResult] = useState(null);
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [consentGiven, setConsentGiven] = useState(false);
    const [boundaryVersion, setBoundaryVersion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [scanStatusMessage, setScanStatusMessage] = useState("");
    const [scanError, setScanError] = useState("");
    const [expanded, setExpanded] = useState(/* @__PURE__ */ new Set());
    const [filterSev, setFilterSev] = useState("all");
    const [findingCategory, setFindingCategory] = useState("wcag");
    const [auditMode, setAuditMode] = useState(AUDIT_MODE_STATIC);
    const [auditUrl, setAuditUrl] = useState("");
    const [siteUrl, setSiteUrl] = useState("");
    const [operatorName, setOperatorName] = useState("");
    const [contrastForeground, setContrastForeground] = useState("#1f2933");
    const [contrastBackground, setContrastBackground] = useState("#ffffff");
    const [contrastBatch, setContrastBatch] = useState("");
    const [contrastResults, setContrastResults] = useState([]);
    const [statementHTML, setStatementHTML] = useState("");
    const [shareCopied, setShareCopied] = useState(false);
    const run = useCallback(async () => {
      if (!input.trim()) return;
      if (!consentGiven) {
        setShowOnboarding(true);
        setScanError("Please accept the terms to continue.");
        return;
      }
      if (auditMode === AUDIT_MODE_FULL && !isValidAuditUrl(auditUrl)) {
        setScanError("Full Audit requires a valid https:// URL.");
        return;
      }
      setShowOnboarding(false);
      setLoading(true);
      setScanStatusMessage(auditMode === AUDIT_MODE_FULL ? "Running browser audit \u2014 this takes 15\u201330 seconds..." : "Checking WCAG 2.1 AA criteria...");
      setScanError("");
      setResult(null);
      try {
        await new Promise((r) => setTimeout(r, 500));
        const beforeBase = auditHTML(input);
        const { fixedHTML, fixes } = await fixHTML(input);
        const after = auditHTML(fixedHTML);
        let renderedFindings2 = [];
        let renderedMeta = null;
        let ruleSetsNotTested = STATIC_ONLY_NOT_TESTED;
        if (auditMode === AUDIT_MODE_FULL) {
          if (!window?.electron?.ipcRenderer?.invoke) {
            throw new Error("Full audit is only available in Electron builds with IPC support.");
          }
          const renderedResult = await window.electron.ipcRenderer.invoke("run-rendered-audit", auditUrl);
          if (!renderedResult?.success) {
            throw new Error(renderedResult?.error || "Browser-rendered audit failed.");
          }
          renderedMeta = renderedResult.results?.meta || null;
          ruleSetsNotTested = renderedResult.results?.ruleSetsNotTested || renderedResult.ruleSetsNotTested || STATIC_ONLY_NOT_TESTED;
          renderedFindings2 = normalizeRenderedFindings(renderedResult.results?.findings || renderedResult.findings || []);
        }
        const before = {
          ...beforeBase,
          findings: deduplicateFindings([...beforeBase.findings, ...renderedFindings2]),
          staticFindings: beforeBase.findings,
          renderedFindings: renderedFindings2,
          auditMode,
          renderedMeta,
          ruleSetsNotTested
        };
        const normalizedAfter = {
          ...after,
          findings: after.findings.map((finding) => ({
            ...finding,
            source: "static",
            confidence: "medium",
            requiresManualReview: false,
            ruleSetLabel: "Static analysis only."
          }))
        };
        setResult({ before, after: normalizedAfter, fixedHTML, fixes, input, auditMode, renderedMeta, ruleSetsNotTested });
        setTab("audit");
        setFindingCategory("wcag");
        setFilterSev("all");
      } catch (error) {
        setScanError(error && error.message || "The scan encountered an unexpected error. Review the HTML markup and try again.");
      } finally {
        setLoading(false);
        setScanStatusMessage("");
      }
    }, [auditMode, auditUrl, consentGiven, input]);
    const onAcceptTerms = useCallback(() => {
      setConsentGiven(true);
      setShowOnboarding(false);
      setScanError("");
    }, []);
    const onDeclineTerms = useCallback(() => {
      setConsentGiven(false);
      setShowOnboarding(false);
      setScanError("You declined the terms. You can still review the preview but cannot run audits.");
    }, []);
    const resetAfterBoundaryError = useCallback(() => {
      setBoundaryVersion((v) => v + 1);
      setScanError("");
      setResult(null);
    }, []);
    const toggle = (id) => setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
    const setActiveTab = (nextTab) => {
      setTab(nextTab);
      requestAnimationFrame(() => {
        const btn = document.getElementById(`${nextTab}-tab`);
        if (btn) btn.focus();
      });
    };
    const res = result?.before;
    const fixedRes = result?.after;
    const beforeSummary = summarizeFindings(res?.findings);
    const fixedByEngine = (res?.findings.length || 0) - (fixedRes?.findings.length || 0);
    const wcagFindings = res?.findings.filter((f) => f.category === "wcag") || [];
    const qualityFindings = res?.findings.filter((f) => f.category === "quality") || [];
    const wcagBeforeSummary = summarizeFindings(wcagFindings);
    const qualityBeforeSummary = summarizeFindings(qualityFindings);
    const activeFindings = findingCategory === "wcag" ? wcagFindings : qualityFindings;
    const activeSummary = summarizeFindings(activeFindings);
    const filtered = activeFindings.filter((f) => filterSev === "all" || f.severity === filterSev) || [];
    const renderedFindings = res?.renderedFindings || [];
    const staticFindings = res?.staticFindings || [];
    const renderedSummary = summarizeFindings(renderedFindings);
    const scoreColorClass = getScoreColorClass(res?.score);
    const fixedColorClass = getScoreColorClass(fixedRes?.score);
    const shareToolUrl = getShareToolUrl();
    const resultSummary = {
      before: res?.findings?.length || 0,
      after: fixedRes?.findings?.length || 0
    };
    const statusResultLabel = result ? `Before audit: ${resultSummary.before} findings (${wcagBeforeSummary.total} WCAG + ${qualityBeforeSummary.total} quality). After fixes: ${resultSummary.after} findings.${renderedSummary.total > 0 ? ` Rendered checks: ${renderedSummary.total}.` : ""}` : "Ready to scan. Paste HTML and click Audit + Fix.";
    const buildContrast = useCallback(() => {
      const entries = [];
      const batchText = contrastBatch.trim();
      if (batchText) {
        batchText.split(/\n+/u).forEach((lineRaw, index) => {
          const line = lineRaw.trim();
          if (!line) return;
          const parts = line.split(/[,;|]+/u).flatMap((part) => part.trim().split(/\s+/u)).filter(Boolean);
          if (parts.length < 2) {
            entries.push({ id: `batch-${index + 1}`, input: line, error: "Missing color pair." });
            return;
          }
          const result2 = evaluateContrastPair(parts[0], parts[1]);
          if (!result2) {
            entries.push({ id: `batch-${index + 1}`, input: line, error: "Unable to parse one or both colors." });
            return;
          }
          entries.push({ id: `batch-${index + 1}`, input: line, ...result2 });
        });
        setContrastResults(entries);
        return;
      }
      const single = evaluateContrastPair(contrastForeground, contrastBackground);
      if (!single) {
        entries.push({ id: "single", input: `${contrastForeground} | ${contrastBackground}`, error: "Unable to parse one or both colors." });
        setContrastResults(entries);
        return;
      }
      setContrastResults([{ id: "single", input: `${contrastForeground} | ${contrastBackground}`, ...single }]);
    }, [contrastBatch, contrastForeground, contrastBackground]);
    const generateReport = useCallback(() => {
      if (!result) return;
      const payload = result.before || {};
      const staticFindings2 = payload.staticFindings || [];
      const renderedFindings2 = payload.renderedFindings || [];
      const allFindings = payload.findings || [];
      const manualChecklist = getManualReviewChecklist();
      const ts = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      const reportDate = /* @__PURE__ */ new Date();
      const staticChecks = staticFindings2.length;
      const staticPassCount = payload.passCount || 0;
      const staticTotalChecks = staticPassCount + staticChecks;
      const complianceScore = staticTotalChecks > 0 ? Math.round(staticPassCount / staticTotalChecks * 100) : 0;
      const staticStats = summarizeFindings(staticFindings2);
      const renderedStats = summarizeFindings(renderedFindings2);
      const totalStats = summarizeFindings(allFindings);
      const renderMode = payload.auditMode || AUDIT_MODE_STATIC;
      const renderedMeta = payload.renderedMeta || {};
      const ruleSetsNotTested = payload.ruleSetsNotTested || [];
      const limitationDisclosure = buildLimitationDisclosure(renderMode, ruleSetsNotTested);
      const toTableRows = (findings) => findings.map((finding) => {
        const sev = (finding.severity || "warning").toLowerCase();
        const sevText = sev === "critical" ? "Critical" : sev === "warning" ? "Warning" : "Advisory";
        const guidance = finding.guidance && finding.guidance.how || finding.fix;
        const action = guidance || "Manual review required";
        const selector = finding.where ? `<code>${escapeHtml(finding.where)}</code>` : "N/A";
        const snippet = finding.element ? `<code>${escapeHtml(finding.element)}</code>` : "N/A";
        const source = escapeHtml(finding.source || "static");
        const conf = escapeHtml(finding.confidence || "medium");
        return `<tr><td>${escapeHtml(finding.criterion || "N/A")}</td><td>${sevText}</td><td>${source}</td><td>${snippet}</td><td>${selector}</td><td>${escapeHtml(action)}</td><td>${conf}</td><td>${escapeHtml(finding.issue || "")}</td></tr>`;
      }).join("");
      const staticRows = toTableRows(staticFindings2);
      const renderedRows = toTableRows(renderedFindings2);
      const manualRows = manualChecklist.map((item) => `<tr><td>${escapeHtml(item.criterion)}</td><td>${escapeHtml(item.description)}</td></tr>`).join("");
      const operator = operatorName.trim() || "Accessibility Operator";
      const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${REPORT_BRAND}</title>
      <style>
      body { font-family: Arial, Helvetica, sans-serif; color:#0f172a; padding:20px; line-height:1.4; background:#fff; }
      h1, h2 { color:#1F4E79; }
      table { border-collapse: collapse; width:100%; max-width: 100%; }
      th, td { border:1px solid #cbd5e0; padding:10px; vertical-align: top; }
      thead { background:#f1f5f9; }
      .note { margin:8px 0; color:#334155; }
      .meta { color:#1e293b; }
      .badge { display:inline-block; padding:2px 8px; border-radius:6px; font-size:11px; color:#fff; margin-left:8px; }
      .critical { background:#7b1e1e; }
      .warning { background:#7a6000; }
      .advisory { background:#1e6b3c; }
      footer { margin-top: 24px; font-size:12px; color:#64748b; }
    </style>
  </head>
  <body>
    <header>
      <h1>${REPORT_BRAND}</h1>
      <p class="meta"><strong>Tool:</strong> ${APP_NAME}</p>
      <p class="meta"><strong>Version:</strong> ${APP_VERSION}</p>
      <p class="meta"><strong>Owner:</strong> ${APP_BRAND}</p>
      <p class="meta"><strong>Website:</strong> ${escapeHtml(siteUrl || "Pasted HTML document")}</p>
      <p class="meta"><strong>Audit date/time:</strong> ${ts}</p>
      <p class="meta"><strong>Report generated:</strong> ${reportDate.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>
      <p class="meta"><strong>Audit mode:</strong> ${escapeHtml(renderMode === AUDIT_MODE_FULL ? "FULL (static + rendered)" : "STATIC ONLY")}</p>
      ${renderedMeta ? `<p class="meta"><strong>Rendered audit metadata:</strong> URL hash: ${escapeHtml(renderedMeta.urlHash || "N/A")} \xB7 Viewport: ${escapeHtml(renderedMeta.viewport || "N/A")} \xB7 User-Agent: ${escapeHtml(renderedMeta.userAgent || "N/A")} \xB7 Timestamp: ${escapeHtml(renderedMeta.timestamp || "N/A")}</p>` : ""}
      <p class="meta"><strong>Operator:</strong> ${escapeHtml(operator)}</p>
    </header>
    <section>
      <h2>Executive Summary</h2>
      <p class="note">Static-only findings: ${staticStats.total}. Rendered findings: ${renderedStats.total}. Total findings: ${totalStats.total}. Estimated pass rate: ${complianceScore}% of checked criteria passing (estimated from static findings).</p>
      <p class="note">Critical: <span class="badge critical">${totalStats.critical}</span> Warning: <span class="badge warning">${totalStats.warning}</span> Advisory: <span class="badge advisory">${totalStats.advisory}</span>.</p>
      <p class="note">WCAG 2.1 AA Violations: ${totalStats.wcag}. Content Quality Flags: ${totalStats.quality}.</p>
    </section>
    <section>
      <h2>Audit Limitation Disclosure</h2>
      <pre class="note">${escapeHtml(limitationDisclosure)}</pre>
    </section>
    <section>
      <h2>Findings \u2014 Static Analysis</h2>
      <table>
        <thead>
          <tr><th>Criterion</th><th>Severity</th><th>Source</th><th>Element snippet</th><th>Selector</th><th>Fix / Next action</th><th>Confidence</th><th>Issue</th></tr>
        </thead>
        <tbody>
          ${staticRows || '<tr><td colspan="8">No findings.</td></tr>'}
        </tbody>
      </table>
    </section>
    <section>
      <h2>Findings \u2014 Rendered Audit (Phase 1)</h2>
      <table>
        <thead>
          <tr><th>Criterion</th><th>Severity</th><th>Source</th><th>Element snippet</th><th>Selector</th><th>Fix / Next action</th><th>Confidence</th><th>Issue</th></tr>
        </thead>
        <tbody>
          ${renderedRows || '<tr><td colspan="8">No findings.</td></tr>'}
        </tbody>
      </table>
    </section>
    <section>
      <h2>Manual Review Required</h2>
      <table>
        <thead>
          <tr><th>Criterion</th><th>Review item</th></tr>
        </thead>
        <tbody>
          ${manualRows || '<tr><td colspan="2">No manual review items.</td></tr>'}
        </tbody>
      </table>
    </section>
    <section>
      <h2>Operator Attestation</h2>
      <p>${APP_NAME} (v${APP_VERSION}) generated this report at ${reportDate.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}. Automated audit only \u2014 supplement with manual review.</p>
    </section>
    <section>
      <h2>Appendix</h2>
      <details>
        <summary>Full findings JSON</summary>
        <pre>${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
      </details>
    </section>
    <footer>Prepared by ${APP_BRAND}</footer>
  </body>
  </html>`;
      const tsSlug = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/gu, "-");
      downloadTextFile(html, `wcag-audit-report-${tsSlug}.html`);
    }, [result, operatorName, siteUrl]);
    const generateStatement = useCallback(() => {
      if (!result) return;
      const date = makeComplianceStatementDate();
      const statement = `<!doctype html><html><head><meta charset="utf-8"><title>Accessibility Statement</title></head><body>
<h1>Accessibility Statement</h1>
<p><strong>Last updated:</strong> ${date}</p>
<p>This website is being reviewed and improved with WCAG 2.1 AA as the target standard. We review and improve course accessibility for all learners, including those using assistive technology.</p>
<p>WCAG standard: 2.1 AA</p>
<p>Questions or accommodation requests: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
<p>Website owner: ${APP_NAME}</p>
    <p>Contact owner: ${escapeHtml(operatorName.trim() || APP_BRAND)}</p>
</body></html>`;
      setStatementHTML(statement);
    }, [operatorName, result]);
    const onTabKeyDown = (e) => {
      const current = RESULT_TABS.indexOf(tab);
      if (current < 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveTab(RESULT_TABS[(current + 1) % RESULT_TABS.length]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveTab(RESULT_TABS[(current - 1 + RESULT_TABS.length) % RESULT_TABS.length]);
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveTab(RESULT_TABS[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveTab(RESULT_TABS[RESULT_TABS.length - 1]);
      }
    };
    const statusText = loading ? scanStatusMessage || "Scanning your HTML for accessibility issues." : result ? statusResultLabel : "Ready to scan. Paste HTML and click Audit + Fix.";
    const displayError = scanError || "";
    const copyShareUrl = () => {
      navigator.clipboard.writeText(shareToolUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2e3);
    };
    return /* @__PURE__ */ React.createElement(ScanErrorBoundary, { key: boundaryVersion, onReset: resetAfterBoundaryError, onError: (error) => setScanError(error && error.message || "The checker encountered a rendering error.") }, /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_42%,#f8fafc_100%)] text-slate-900" }, /* @__PURE__ */ React.createElement("style", null, `
        button:focus-visible,
        a:focus-visible,
        textarea:focus-visible,
        input:focus-visible,
        button.issue-toggle:focus-visible {
          outline: 2px solid ${PRIMARY_BLUE} !important;
          outline-offset: 2px;
        }
        .tls-skip-link {
          position: absolute;
          left: -10000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
        .tls-skip-link:focus {
          left: 12px;
          top: 12px;
          width: auto;
          height: auto;
          overflow: visible;
          background: ${PRIMARY_BLUE};
          color: #ffffff;
          padding: 6px 10px;
          z-index: 1000;
        }
      `), /* @__PURE__ */ React.createElement("a", { href: "#main-content", className: "tls-skip-link" }, "Skip to main content"), /* @__PURE__ */ React.createElement("header", { className: "flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-7 py-5 shadow-[0_12px_32px_-26px_rgba(15,23,42,0.35)] backdrop-blur flex-wrap" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "mb-0.5 flex items-center gap-2 text-slate-700" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-bold" }, "Faculty WCAG Checker")), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-600 tracking-wide" }, "Prepared by Morgan Talty \xB7 faculty accessibility audit tool"))), /* @__PURE__ */ React.createElement("main", { id: "main-content", className: "mx-auto max-w-5xl p-6 outline-none", tabIndex: "-1" }, /* @__PURE__ */ React.createElement("nav", { "aria-label": "Toolkit navigation", className: "mb-4 flex flex-wrap gap-2 text-sm" }, /* @__PURE__ */ React.createElement("a", { href: "./", className: "rounded border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 no-underline" }, "\u2190 Toolkit Start"), /* @__PURE__ */ React.createElement("a", { href: "./", className: "rounded border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 no-underline" }, "Field Guide (plain language)"), /* @__PURE__ */ React.createElement("a", { href: "Faculty_WCAG_Routing_Guide_2026-04-30.html", className: "rounded border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 no-underline" }, "Routing Guide"), /* @__PURE__ */ React.createElement("a", { href: "Faculty_Examples_2026-04-30.html", className: "rounded border border-amber-300 bg-amber-50 px-3 py-1.5 text-amber-900 hover:bg-amber-100 no-underline" }, "Examples")), /* @__PURE__ */ React.createElement("div", { className: `mb-2.5 text-xs font-medium ${scanError ? "text-red-900" : "text-slate-700"}`, role: "status", "aria-live": "polite", "aria-atomic": "true" }, statusText, displayError ? /* @__PURE__ */ React.createElement("div", { className: "mt-1.5 text-red-900" }, displayError) : null), /* @__PURE__ */ React.createElement("section", { className: "mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_44px_-32px_rgba(15,23,42,0.38)]" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-4 p-4 md:grid-cols-[1.6fr_1fr]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-slate-950" }, "Paste an HTML version of a course page, run an audit, review what still needs human attention."), /* @__PURE__ */ React.createElement("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-slate-700" }, 'If the word "HTML" feels unfamiliar, start with the ', /* @__PURE__ */ React.createElement("a", { href: "./", className: "font-semibold text-slate-700 underline-offset-2 hover:underline" }, "Field Guide"), " \u2014 it walks through Word, Google Docs, PowerPoint, and PDFs in plain language without ever needing you to touch HTML. This checker is the advanced tool for course pages you can export as HTML."), /* @__PURE__ */ React.createElement("details", { className: "mt-2 rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700" }, /* @__PURE__ */ React.createElement("summary", { className: "cursor-pointer font-semibold text-slate-700" }, "Where do I get HTML to paste here?"), /* @__PURE__ */ React.createElement("ul", { className: "mt-2 ml-5 list-disc space-y-1" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Brightspace page:"), ' open the page editor \u2192 click the source-view button (often labeled "</>" or "View Source") \u2192 copy everything.'), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Word document:"), ' File \u2192 Save As \u2192 choose "Web Page" \u2192 open the resulting .html file in a text editor \u2192 copy.'), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Google Doc:"), " File \u2192 Download \u2192 Web Page (.html, zipped) \u2192 unzip, open the .html file in a text editor \u2192 copy."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Course website:"), " in your browser, right-click the page \u2192 View Page Source \u2192 copy.")), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-xs text-slate-600" }, "Nothing you paste leaves your browser. The check runs locally on your machine.")), /* @__PURE__ */ React.createElement("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-slate-600" }, "Start with UMaine's official page, then use this tool when you need a page-level answer to the question faculty actually ask next: what is wrong here, and what can I do about it first?", " ", /* @__PURE__ */ React.createElement("a", { href: "https://www.maine.edu/equal-opportunity/title-ii-regulations/", target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-slate-700 underline-offset-2 hover:underline" }, "UMaine Title II page"))), /* @__PURE__ */ React.createElement("div", { className: "grid gap-2 text-sm text-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" }, /* @__PURE__ */ React.createElement("strong", { className: "text-slate-900" }, "Does:"), " page-level triage, optional rendered checks, safe limited fixes, clearer next steps"), /* @__PURE__ */ React.createElement("div", { className: "rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950" }, /* @__PURE__ */ React.createElement("strong", { className: "text-amber-950" }, "Does not:"), " certify legal compliance or replace manual review")))), /* @__PURE__ */ React.createElement("div", { className: "mb-5 rounded border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-500" }, "Free educational accessibility resource. Not an official University of Maine product. No vendor relationship is created. For formal institutional procurement or paid services, follow applicable conflict-of-interest and procurement procedures."), /* @__PURE__ */ React.createElement("section", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white mb-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center border-b border-slate-200" }, /* @__PURE__ */ React.createElement("div", { className: "px-4 py-2.5 text-xs font-bold tracking-wide text-slate-700" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "course-html-input", className: "text-slate-700" }, "Course HTML")), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => {
          setInput(SAMPLE);
          setResult(null);
          setShowOnboarding(false);
        },
        className: "bg-transparent px-4 py-2.5 text-xs font-medium tracking-wide text-slate-700 cursor-pointer"
      },
      "load sample \u2192"
    )), /* @__PURE__ */ React.createElement("div", { className: "p-3.5" }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        id: "course-html-input",
        "aria-describedby": "course-html-help",
        value: input,
        onChange: (e) => {
          setInput(e.target.value);
          setResult(null);
          setShowOnboarding(false);
        },
        placeholder: "Paste your course page HTML here \u2014 syllabus, assignment page, Brightspace export, custom site...",
        className: "h-40 w-full resize-y rounded border border-slate-300 bg-white p-3 text-xs leading-6"
      }
    ), /* @__PURE__ */ React.createElement("div", { id: "course-html-help", className: "sr-only" }, "Paste raw course page HTML and run Audit + Fix for accessibility checks and corrections.")), /* @__PURE__ */ React.createElement("div", { className: "px-3.5 pb-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "mb-2 flex flex-wrap gap-3 text-xs text-slate-700" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "radio",
        name: "audit-mode",
        value: AUDIT_MODE_STATIC,
        checked: auditMode === AUDIT_MODE_STATIC,
        onChange: () => {
          setAuditMode(AUDIT_MODE_STATIC);
          setAuditUrl("");
        }
      }
    ), "Static Only"), IS_ELECTRON ? /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "radio",
        name: "audit-mode",
        value: AUDIT_MODE_FULL,
        checked: auditMode === AUDIT_MODE_FULL,
        onChange: () => setAuditMode(AUDIT_MODE_FULL)
      }
    ), "Full Audit (requires live URL)") : /* @__PURE__ */ React.createElement("span", { className: "text-xs italic text-slate-500" }, "Full Audit requires the desktop app. Browser version runs Static Analysis.")), IS_ELECTRON && auditMode === AUDIT_MODE_FULL && /* @__PURE__ */ React.createElement("label", { className: "block text-xs text-slate-700" }, "Enter live URL for rendered checks", /* @__PURE__ */ React.createElement(
      "input",
      {
        value: auditUrl,
        onChange: (e) => setAuditUrl(e.target.value),
        placeholder: "https://course.example.edu/page",
        className: "mt-1.5 block w-full rounded border border-slate-300 p-2 text-sm"
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2.5 px-3.5 pb-3.5" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: run,
        disabled: !input.trim() || loading,
        className: `rounded border px-7 py-2.5 text-xs font-bold tracking-wide transition ${input.trim() && !loading ? "bg-blue-900 text-white border-blue-900 cursor-pointer" : "bg-slate-300 text-slate-500 border-slate-300 cursor-not-allowed"}`,
        "aria-label": loading ? "Scanning HTML now" : "Run accessibility audit and apply safe fixes"
      },
      loading ? "SCANNING..." : "AUDIT + FIX"
    ), loading && /* @__PURE__ */ React.createElement("span", { className: "text-sm text-slate-500" }, scanStatusMessage || "Checking WCAG 2.1 AA criteria..."))), result && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "grid gap-3 mb-4 grid-cols-1 md:grid-cols-2" }, [
      { label: "BEFORE AUTO-FIX", r: res, classes: getScoreColorClass(res?.score), bar: getScoreBarColorClass(res?.score), width: getScoreBarWidthClass(res?.score || 0) },
      { label: "AFTER AUTO-FIX", r: fixedRes, classes: getScoreColorClass(fixedRes?.score), bar: getScoreBarColorClass(fixedRes?.score), width: getScoreBarWidthClass(fixedRes?.score || 0) }
    ].map(({ label, r, color }) => /* @__PURE__ */ React.createElement("div", { key: label, className: "rounded-2xl border border-slate-200 bg-white p-4.5 shadow-[0_14px_34px_-30px_rgba(15,23,42,0.35)]" }, /* @__PURE__ */ React.createElement("div", { className: "mb-2.5 text-xs font-semibold tracking-wide text-slate-600" }, label), /* @__PURE__ */ React.createElement("div", { className: "mb-2.5 flex items-baseline gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: `leading-none text-4xl font-bold ${getScoreColorClass(r?.score)}` }, r?.score ?? 0), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-slate-500" }, "/100")), /* @__PURE__ */ React.createElement("div", { className: "mb-3 h-1 rounded bg-slate-200" }, /* @__PURE__ */ React.createElement("div", { className: `h-full rounded ${getScoreBarColorClass(r?.score)} ${getScoreBarWidthClass(r?.score || 0)} transition duration-500` })), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-4" }, [["critical", r.findings.filter((f) => f.severity === "critical").length], [
      "warning",
      r.findings.filter((f) => f.severity === "warning").length
    ], ["advisory", r.findings.filter((f) => f.severity === "advisory").length]].map(([severityKey, n]) => /* @__PURE__ */ React.createElement("div", { key: severityKey, className: "text-sm text-slate-700" }, /* @__PURE__ */ React.createElement("span", { className: `font-bold ${getSevClasses(severityKey).colorClass}` }, getSevClasses(severityKey).label, ": ", n))))))), /* @__PURE__ */ React.createElement("div", { className: "mb-4 grid gap-3 sm:grid-cols-2" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl border border-red-200 bg-red-50 p-3.5 shadow-[0_14px_34px_-30px_rgba(127,29,29,0.35)]" }, /* @__PURE__ */ React.createElement("div", { className: "mb-1.5 text-xs font-semibold tracking-wide text-red-900" }, "WCAG 2.1 AA Violations"), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-bold text-red-900" }, wcagBeforeSummary.total), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-red-900" }, "Critical ", wcagBeforeSummary.critical, " \xB7 Warning ", wcagBeforeSummary.warning, " \xB7 Advisory ", wcagBeforeSummary.advisory)), /* @__PURE__ */ React.createElement("div", { className: "rounded-2xl border border-yellow-300 bg-yellow-50 p-3.5 shadow-[0_14px_34px_-30px_rgba(146,64,14,0.28)]" }, /* @__PURE__ */ React.createElement("div", { className: "mb-1.5 text-xs font-semibold tracking-wide text-yellow-800" }, "Content Quality Flags"), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-bold text-yellow-800" }, qualityBeforeSummary.total), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-yellow-800" }, "Critical ", qualityBeforeSummary.critical, " \xB7 Warning ", qualityBeforeSummary.warning, " \xB7 Advisory ", qualityBeforeSummary.advisory))), result.fixes.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-4 rounded border border-green-300 bg-green-50 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "mb-2 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold tracking-wide text-green-800" }, "\u2713 ", result.fixes.length, " FIXES APPLIED AUTOMATICALLY \xB7 Auto-fixes applied: ", fixedByEngine), /* @__PURE__ */ React.createElement(CopyButton, { text: result.fixedHTML })), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-green-800 leading-7" }, result.fixes.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i }, "\xB7 [", f.criterion, "] ", f.description)))), /* @__PURE__ */ React.createElement("section", { className: "mb-4 rounded border border-slate-200 bg-white p-3" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3 grid gap-3 grid-cols-1 md:grid-cols-2" }, /* @__PURE__ */ React.createElement("label", { className: "block text-xs text-slate-700" }, "Site URL (optional)", /* @__PURE__ */ React.createElement(
      "input",
      {
        value: siteUrl,
        onChange: (e) => setSiteUrl(e.target.value),
        className: "mt-1.5 block w-full rounded border border-slate-300 p-2 text-sm",
        placeholder: "https://course.example.edu/page"
      }
    )), /* @__PURE__ */ React.createElement("label", { className: "block text-xs text-slate-700" }, "Operator name (optional)", /* @__PURE__ */ React.createElement(
      "input",
      {
        value: operatorName,
        onChange: (e) => setOperatorName(e.target.value),
        className: "mt-1.5 block w-full rounded border border-slate-300 p-2 text-sm",
        placeholder: "Instructor or Accessibility owner"
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2.5" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: generateReport, className: "rounded border border-slate-700 bg-slate-700 px-3.5 py-2 text-xs font-semibold tracking-wide text-white" }, "Generate Compliance Report"), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: generateStatement, className: "rounded border border-blue-900 bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-700" }, "Generate Accessibility Statement"), statementHTML && /* @__PURE__ */ React.createElement(CopyButton, { text: statementHTML })), statementHTML && /* @__PURE__ */ React.createElement("pre", { className: "mt-3 max-h-44 overflow-auto rounded border border-slate-300 bg-slate-50 p-2.5 text-xs whitespace-pre-wrap break-all" }, statementHTML)), /* @__PURE__ */ React.createElement("div", { role: "tablist", "aria-label": "Result views", onKeyDown: onTabKeyDown, className: "mb-4 flex gap-0 border-b border-slate-200" }, [
      ["audit", "Original Issues", res?.findings.length],
      ["fixed", "Remaining Issues", fixedRes?.findings.length],
      ["html", "Fixed HTML", null],
      ["contrast", "Contrast Check", null]
    ].map(([t, label, count]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        role: "tab",
        id: `${t}-tab`,
        tabIndex: tab === t ? 0 : -1,
        "aria-selected": tab === t,
        "aria-controls": `${t}-panel`,
        key: t,
        onClick: () => setActiveTab(t),
        className: `px-5 py-2.5 text-xs font-semibold tracking-wide transition ${tab === t ? "bg-white text-slate-700 border-b-2 border-blue-900" : "bg-transparent text-slate-500 border-b-2 border-transparent"}`
      },
      label,
      typeof count === "number" && count > 0 && /* @__PURE__ */ React.createElement("span", { className: "ml-1.5 rounded-full bg-blue-900 px-1.5 py-0.5 text-xs text-white" }, count)
    ))), tab === "audit" && /* @__PURE__ */ React.createElement("section", { role: "tabpanel", id: "audit-panel", "aria-labelledby": "audit-tab" }, /* @__PURE__ */ React.createElement("div", { className: "mb-2.5 flex flex-wrap gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setFindingCategory("wcag"),
        "aria-pressed": findingCategory === "wcag",
        className: `rounded border px-3 py-1.5 text-xs font-semibold tracking-wide ${findingCategory === "wcag" ? "bg-blue-50 border-blue-900 text-slate-700" : "bg-transparent border-slate-300 text-slate-600"}`
      },
      "WCAG 2.1 AA Violations (",
      wcagFindings.length,
      ")"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setFindingCategory("quality"),
        "aria-pressed": findingCategory === "quality",
        className: `rounded border px-3 py-1.5 text-xs font-semibold tracking-wide ${findingCategory === "quality" ? "bg-yellow-50 border-yellow-800 text-yellow-800" : "bg-transparent border-slate-300 text-slate-600"}`
      },
      "Content Quality Flags (",
      qualityFindings.length,
      ")"
    )), /* @__PURE__ */ React.createElement("div", { className: "mb-3 flex flex-wrap gap-2" }, [
      ["all", "All", activeFindings.length],
      ["critical", "Critical", activeSummary.critical],
      ["warning", "Warning", activeSummary.warning],
      ["advisory", "Advisory", activeSummary.advisory]
    ].map(([f, label, count]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        key: f,
        "aria-pressed": filterSev === f,
        onClick: () => setFilterSev(f),
        className: `rounded border px-3 py-1.5 text-xs font-semibold tracking-wide ${filterSev === f ? "bg-indigo-50 border-blue-900 text-slate-700" : "bg-transparent border-slate-300 text-slate-500"}`
      },
      label,
      " (",
      count,
      ")"
    ))), filtered.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "rounded border border-slate-200 bg-white p-8 text-center text-sm text-slate-500" }, "\u2713 No issues match this view.") : filtered.map((f) => {
      const s = SEV[f.severity] || SEV.info;
      const isExp = expanded.has(f.id);
      return /* @__PURE__ */ React.createElement("div", { key: f.id, className: `mb-2 overflow-hidden rounded border border-slate-200 bg-white ${s.borderClass}` }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          "aria-expanded": isExp,
          "aria-controls": `issue-${f.id}-details`,
          onClick: () => toggle(f.id),
          className: `flex w-full items-start gap-2.5 border-none bg-white p-3 text-left text-inherit`
        },
        /* @__PURE__ */ React.createElement("span", { className: `mt-0.5 flex-shrink-0 text-sm ${s.colorClass}` }, s.dot),
        /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "mb-0.5 flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: `inline-flex rounded border bg-blue-50 px-1.5 py-0.5 text-xs font-bold tracking-wide ${getSevClasses("info").colorClass}` }, f.criterion), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, "Level ", f.level), /* @__PURE__ */ React.createElement("span", { className: `text-xs font-bold tracking-wide ${s.colorClass}` }, s.label)), /* @__PURE__ */ React.createElement("div", { className: "text-xs leading-5 text-slate-700" }, f.issue)),
        /* @__PURE__ */ React.createElement("span", { className: "flex-shrink-0 text-xs text-slate-500" }, isExp ? "\u25B2" : "\u25BC")
      ), isExp && /* @__PURE__ */ React.createElement("div", { id: `issue-${f.id}-details`, className: "border-t border-slate-200 bg-slate-50 p-3" }, f.fix && /* @__PURE__ */ React.createElement("div", { className: "mb-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "mb-1 text-xs font-bold tracking-wide text-green-800" }, "AUTOMATED CHECK RESULT"), /* @__PURE__ */ React.createElement("div", { className: "text-sm leading-6 text-slate-700" }, f.fix)), /* @__PURE__ */ React.createElement("div", { className: "mb-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "mb-1 text-xs font-bold tracking-wide text-slate-700" }, "WHY IT MATTERS"), /* @__PURE__ */ React.createElement("div", { className: "text-sm leading-6 text-slate-700" }, f.guidance && f.guidance.why || "This can affect student accessibility.")), /* @__PURE__ */ React.createElement("div", { className: "mb-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "mb-1 text-xs font-bold tracking-wide text-slate-700" }, "HOW TO FIX"), /* @__PURE__ */ React.createElement("div", { className: "text-sm leading-6 text-slate-700" }, f.guidance && f.guidance.how || "Update the flagged element to follow the rule."), f.guidance && f.guidance.example && /* @__PURE__ */ React.createElement("pre", { className: "mt-2 overflow-auto whitespace-pre-wrap break-all rounded border border-green-200 bg-white p-2 text-xs text-green-800" }, f.guidance.example)), /* @__PURE__ */ React.createElement("div", { className: "mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "mb-1 text-xs font-bold tracking-wide text-slate-500" }, "WHERE TO CHANGE"), /* @__PURE__ */ React.createElement("div", { className: "text-sm leading-6 font-mono text-slate-700" }, f.where || "Not tied to a single element (layout-wide check).")), f.element && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mb-1 text-xs font-bold tracking-wide text-slate-500" }, "ELEMENT"), /* @__PURE__ */ React.createElement("pre", { className: "mt-0 overflow-auto whitespace-pre-wrap break-all rounded border border-green-200 bg-white p-2 text-xs text-green-800" }, f.element))));
    })), tab === "fixed" && /* @__PURE__ */ React.createElement("section", { role: "tabpanel", id: "fixed-panel", "aria-labelledby": "fixed-tab" }, fixedRes.findings.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "rounded border border-green-300 bg-green-50 p-9 text-center text-sm text-green-800" }, "\u2713 No remaining findings in post-fix scan.") : fixedRes.findings.map((f) => {
      const s = SEV[f.severity] || SEV.info;
      return /* @__PURE__ */ React.createElement("div", { key: f.id, className: `mb-2 rounded border border-slate-200 bg-white p-3 ${s.borderClass}` }, /* @__PURE__ */ React.createElement("div", { className: "mb-1 flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: s.colorClass }, s.dot), /* @__PURE__ */ React.createElement("span", { className: `rounded bg-blue-50 px-1.5 py-0.5 text-xs font-bold text-slate-700` }, f.criterion), /* @__PURE__ */ React.createElement("span", { className: `text-xs font-bold ${s.colorClass}` }, s.label)), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-700" }, f.issue), /* @__PURE__ */ React.createElement("div", { className: "mt-2 text-xs text-slate-600" }, f.guidance && f.guidance.how || f.fix), f.guidance && f.guidance.example && /* @__PURE__ */ React.createElement("pre", { className: "mt-2 overflow-auto whitespace-pre-wrap break-all rounded border border-green-200 bg-slate-50 p-2 text-xs text-green-800" }, f.guidance.example), f.fix && /* @__PURE__ */ React.createElement("div", { className: "mt-1.5 text-xs text-slate-500" }, "Fix: ", f.fix));
    })), tab === "html" && /* @__PURE__ */ React.createElement("section", { role: "tabpanel", id: "html-panel", "aria-labelledby": "html-tab" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500" }, "Copy this, paste it back into your editor or LMS.", result.fixes.some((f) => f.description.includes("REVIEW")) && " Search for data-tls-needs-review to find items needing manual review."), /* @__PURE__ */ React.createElement(CopyButton, { text: result.fixedHTML })), /* @__PURE__ */ React.createElement("pre", { className: "max-h-96 overflow-auto whitespace-pre-wrap break-all rounded border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-700" }, result.fixedHTML)), tab === "contrast" && /* @__PURE__ */ React.createElement("section", { role: "tabpanel", id: "contrast-panel", "aria-labelledby": "contrast-tab" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3 grid gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-3 sm:grid-cols-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-slate-700" }, "Foreground hex color", /* @__PURE__ */ React.createElement(
      "input",
      {
        value: contrastForeground,
        onChange: (e) => setContrastForeground(e.target.value),
        placeholder: "#111827",
        className: "mt-1.5 block w-full rounded border border-slate-300 p-2 text-sm"
      }
    )), /* @__PURE__ */ React.createElement("label", { className: "text-xs text-slate-700" }, "Background hex color", /* @__PURE__ */ React.createElement(
      "input",
      {
        value: contrastBackground,
        onChange: (e) => setContrastBackground(e.target.value),
        placeholder: "#FFFFFF",
        className: "mt-1.5 block w-full rounded border border-slate-300 p-2 text-sm"
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: buildContrast, className: "rounded border border-slate-700 bg-slate-700 px-3.5 py-2 text-xs font-semibold tracking-wide text-white" }, "Check Contrast")), /* @__PURE__ */ React.createElement("label", { className: "text-xs text-slate-700" }, "Batch mode (one pair per line as `foreground background`)", /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: contrastBatch,
        onChange: (e) => setContrastBatch(e.target.value),
        placeholder: `#111827 #FFFFFF
#888 #eee
rgb(20 20 20) #fff`,
        rows: "4",
        className: "mt-1.5 block w-full resize-y rounded border border-slate-300 p-2 text-sm"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: buildContrast, className: "rounded border border-blue-900 bg-slate-100 px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-700" }, "Run Batch Check"))), contrastResults.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "rounded border border-slate-200 bg-white p-5 text-center text-sm text-slate-500" }, "No contrast results yet. Enter colors and click check.") : /* @__PURE__ */ React.createElement("div", { className: "grid gap-2.5" }, contrastResults.map((row) => {
      if (row.error) {
        return /* @__PURE__ */ React.createElement("div", { key: row.id, className: "rounded border border-red-200 bg-red-50 p-2.5 text-red-900" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-bold" }, row.input), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, row.error));
      }
      return /* @__PURE__ */ React.createElement("div", { key: row.id, className: "rounded border border-slate-300 bg-white p-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "mb-1.5 text-xs text-slate-700" }, /* @__PURE__ */ React.createElement("strong", null, "Pair:"), " ", row.input), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-700" }, "Contrast ratio: ", /* @__PURE__ */ React.createElement("strong", null, row.ratio), " | Normal text: ", /* @__PURE__ */ React.createElement("strong", { className: getContrastClass(row.normal) }, formatContrastStatus(row.normal)), " (need 4.5:1) | Large text: ", /* @__PURE__ */ React.createElement("strong", { className: getContrastClass(row.large) }, formatContrastStatus(row.large)), " (need 3:1) | UI components: ", /* @__PURE__ */ React.createElement("strong", { className: getContrastClass(row.ui) }, formatContrastStatus(row.ui)), " (need 3:1)"));
    }))), /* @__PURE__ */ React.createElement("div", { className: "mt-5 rounded border border-slate-200 bg-white p-3.5 text-xs leading-7 text-slate-500" }, /* @__PURE__ */ React.createElement("strong", { className: "text-slate-700" }, "What this covers:"), " 1.1.1 alt text, 1.2.2 captions/media controls, 1.3.1 heading hierarchy, 2.4.1 skip navigation, 2.4.2 title element, 2.4.3 keyboard-focus flow, 2.1.1 keyboard support, 1.4.3 text contrast checks, 2.4.4 link purpose, 3.1.1 language, 4.1.2 accessible names, plus structure checks for duplicate IDs and form labels. \xB7 ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-700" }, "Need help:"), " ", CONTACT_EMAIL), /* @__PURE__ */ React.createElement("div", { className: "mt-3 text-xs text-slate-500" }, "Faculty WCAG Checker v", TLS_VERSION)), !result && !loading && /* @__PURE__ */ React.createElement("div", { className: "py-15 px-6 text-center text-slate-600" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3 text-4xl" }, "\u26A1"), /* @__PURE__ */ React.createElement("div", { className: "mb-1.5 text-sm tracking-wide" }, "Paste HTML and click Audit + Fix"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Works with Brightspace exports, learning platforms, and any course HTML."))), showOnboarding && /* @__PURE__ */ React.createElement(OnboardingModal, { onAgree: onAcceptTerms, onDecline: onDeclineTerms })));
  }
  var TLS_WCAG_CHECKER_ROOT_ID = "tls-wcag-checker-root";
  var rootNode = document.getElementById(TLS_WCAG_CHECKER_ROOT_ID);
  if (rootNode) {
    const root = createRoot(rootNode);
    root.render(/* @__PURE__ */ React.createElement(App, null));
  }
})();
