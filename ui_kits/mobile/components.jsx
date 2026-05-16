// Kluvs Mobile UI Kit — primitives shared across all screens.
// Tokens come from /colors_and_type.css; this file just builds React components.
//
// Exports (to window): KluvsTopBar, KluvsSubBar, KluvsTabs, KluvsBottomNav,
//   KluvsCard, KluvsAccentCard, KluvsSectionTitle, KluvsAvatar, KluvsButton,
//   KluvsInput, KluvsTextDivider, KluvsSocialButton, KluvsListRow, KluvsIcon,
//   KluvsTimelineNode, KluvsLogoWord, COPPER, BG, FG, MUTED.

const COPPER = "#D16E30";
const BG = "#140F0D";
const BAR = "#1A140F";
const NAV = "#0F0D0A";
const CARD = "#241C17";
const CARD_2 = "#332B24";
const FG = "#F2EDE5";
const MUTED = "#8C8073";
const DEEP = "#4D4033";

// Tiny inline SVG icon set — Lucide-style monoline @ 18×18, 1.5 stroke.
// Substitute: Kluvs Figma ships no icons; these are stand-ins. Flagged in README.
function KluvsIcon({ name, size = 18, color = "currentColor", style = {} }) {
  const s = { width: size, height: size, ...style };
  const stroke = { stroke: color, strokeWidth: 1.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "book":
      return <svg viewBox="0 0 24 24" style={s}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z" {...stroke}/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" {...stroke}/></svg>;
    case "users":
      return <svg viewBox="0 0 24 24" style={s}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" {...stroke}/><circle cx="9" cy="7" r="4" {...stroke}/><path d="M22 21v-2a4 4 0 0 0-3-3.87" {...stroke}/><path d="M16 3.13a4 4 0 0 1 0 7.75" {...stroke}/></svg>;
    case "user":
      return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="8" r="4" {...stroke}/><path d="M4 21a8 8 0 0 1 16 0" {...stroke}/></svg>;
    case "calendar":
      return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="5" width="18" height="16" rx="2" {...stroke}/><path d="M3 10h18M8 3v4M16 3v4" {...stroke}/></svg>;
    case "map-pin":
      return <svg viewBox="0 0 24 24" style={s}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" {...stroke}/><circle cx="12" cy="10" r="3" {...stroke}/></svg>;
    case "video":
      return <svg viewBox="0 0 24 24" style={s}><rect x="2" y="6" width="14" height="12" rx="2" {...stroke}/><path d="m16 12 6-3v6l-6-3Z" {...stroke}/></svg>;
    case "search":
      return <svg viewBox="0 0 24 24" style={s}><circle cx="11" cy="11" r="7" {...stroke}/><path d="m21 21-4.3-4.3" {...stroke}/></svg>;
    case "chevron-right":
      return <svg viewBox="0 0 24 24" style={s}><path d="m9 6 6 6-6 6" {...stroke}/></svg>;
    case "settings":
      return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3" {...stroke}/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" {...stroke}/></svg>;
    case "help":
      return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10" {...stroke}/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" {...stroke}/></svg>;
    case "logout":
      return <svg viewBox="0 0 24 24" style={s}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" {...stroke}/></svg>;
    case "bell":
      return <svg viewBox="0 0 24 24" style={s}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0" {...stroke}/></svg>;
    case "menu":
      return <svg viewBox="0 0 24 24" style={s}><path d="M3 6h18M3 12h18M3 18h18" {...stroke}/></svg>;
    case "plus":
      return <svg viewBox="0 0 24 24" style={s}><path d="M12 5v14M5 12h14" {...stroke}/></svg>;
    case "mail":
      return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="5" width="18" height="14" rx="2" {...stroke}/><path d="m3 7 9 6 9-6" {...stroke}/></svg>;
    case "lock":
      return <svg viewBox="0 0 24 24" style={s}><rect x="4" y="11" width="16" height="10" rx="2" {...stroke}/><path d="M8 11V7a4 4 0 0 1 8 0v4" {...stroke}/></svg>;
    case "check":
      return <svg viewBox="0 0 24 24" style={s}><path d="m5 12 5 5L20 7" {...stroke}/></svg>;
    case "check-bold":
      return <svg viewBox="0 0 24 24" style={s}><path d="m5 12 5 5L20 7" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "honeycomb":
      return <svg viewBox="0 0 24 24" style={s}><path d="M7 4.5 4 6.5v3l3 2 3-2v-3l-3-2ZM17 4.5l-3 2v3l3 2 3-2v-3l-3-2ZM12 13l-3 2v3l3 2 3-2v-3l-3-2Z" {...stroke}/></svg>;
    case "gem":
      return <svg viewBox="0 0 24 24" style={s}><path d="M3 9 8 4h8l5 5-9 11L3 9Z M3 9h18 M8 4l4 5 4-5 M12 9l-4 11 M12 9l4 11" {...stroke}/></svg>;
    default:
      return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9" {...stroke}/></svg>;
  }
}

function KluvsLogoWord({ size = 22, color = FG, dot = true }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.18, fontFamily: "Inter", fontWeight: 700, fontSize: size, lineHeight: 1, color, letterSpacing: "-0.01em" }}>
      Kluvs{dot ? <span style={{ width: size * 0.18, height: size * 0.18, borderRadius: "50%", background: COPPER, marginLeft: 2 }}/> : null}
    </span>
  );
}

function KluvsTopBar({ title = "Kluvs", right }) {
  return (
    <div style={{ height: 52, background: BAR, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
      <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 22, color: FG, lineHeight: 1 }}>{title}</span>
      {right}
    </div>
  );
}

function KluvsSubBar({ icon = "menu", label = "Showcase Kluv" }) {
  return (
    <div style={{ height: 40, background: BAR, display: "flex", alignItems: "center", padding: "0 20px", gap: 8 }}>
      <KluvsIcon name={icon} size={16} color="#999"/>
      <span style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 14, color: FG }}>{label}</span>
    </div>
  );
}

function KluvsTabs({ tabs, active, onChange }) {
  // Per Figma: ALL tab labels are copper. Active tab is full copper + bold + underline;
  // inactive tabs are copper at ~55% opacity, regular weight.
  return (
    <div style={{ height: 42, background: BAR, display: "flex", borderBottom: `1px solid ${CARD_2}`, position: "relative" }}>
      {tabs.map((t, i) => (
        <button key={t} onClick={() => onChange?.(i)}
          style={{ flex: 1, border: 0, background: "transparent", color: COPPER, opacity: active === i ? 1 : 0.55, fontFamily: "Inter", fontWeight: active === i ? 700 : 500, fontSize: 13, cursor: "pointer", position: "relative" }}>
          {t}
          {active === i && <div style={{ position: "absolute", left: "10%", right: "10%", bottom: -1, height: 2, background: COPPER, borderRadius: 1 }}/>}
        </button>
      ))}
    </div>
  );
}

function KluvsBottomNav({ items, active, onChange }) {
  return (
    <div style={{ height: 80, background: NAV, borderTop: `1px solid ${CARD_2}`, display: "flex", paddingTop: 8 }}>
      {items.map((it, i) => {
        const on = active === i;
        return (
          <button key={it.label} onClick={() => onChange?.(i)} style={{ flex: 1, border: 0, background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", position: "relative", paddingTop: 4 }}>
            <div style={{ width: 72, height: 36, borderRadius: 18, background: on ? "rgba(209,110,48,0.18)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <KluvsIcon name={it.icon} size={20} color={on ? COPPER : MUTED}/>
            </div>
            <span style={{ fontFamily: "Inter", fontSize: 11, fontWeight: on ? 700 : 400, color: on ? COPPER : MUTED }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function KluvsCard({ children, style = {}, onClick }) {
  return <div onClick={onClick} style={{ background: CARD, borderRadius: 10, padding: 16, color: FG, cursor: onClick ? "pointer" : "default", ...style }}>{children}</div>;
}

function KluvsAccentCard({ eyebrow, title, meta, locationIcon = "map-pin", style = {} }) {
  return (
    <div style={{ background: "#382112", border: `1.5px solid ${COPPER}`, borderRadius: 10, padding: "12px 16px", color: FG, ...style }}>
      {eyebrow && <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 12, color: MUTED, marginBottom: 6 }}>{eyebrow}</div>}
      <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 15, color: FG, marginBottom: 8 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: MUTED }}>
        <KluvsIcon name={locationIcon} size={12} color={MUTED}/>
        <span>{meta}</span>
      </div>
    </div>
  );
}

function KluvsSectionTitle({ children, style = {} }) {
  return <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 15, color: FG, padding: "0 20px", ...style }}>{children}</div>;
}

// Discord-style avatar: tinted circle + white initials (colored fill, not gray).
// Pass `hue` for a deterministic per-member color, else hash from initials.
function _avatarHue(seed) {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const palette = ["#5865F2", "#5BAA5C", "#9B59B6", "#E67E22", "#3498DB", "#E74C3C", "#16A085", "#F39C12", "#8E44AD", "#2ECC71"];
  return palette[h % palette.length];
}
function KluvsAvatar({ initials = "AB", size = "md", role = "member", hue }) {
  const dim = size === "lg" ? 88 : size === "sm" ? 48 : 68;
  const inset = 4;
  const inner = dim - inset * 2;
  const fontSize = size === "lg" ? 26 : size === "sm" ? 15 : 20;
  const ringWidth = size === "lg" ? 2.5 : size === "sm" ? 1.5 : 2;
  const badgeSize = size === "lg" ? 18 : size === "sm" ? 10 : 14;
  const ringColor = role === "owner" ? "#F0BF05" : role === "admin" ? "#006682" : null;
  const badgeOffset = size === "lg" ? -5 : size === "sm" ? -1 : -3;
  const fill = hue || _avatarHue(initials);
  return (
    <div style={{ position: "relative", width: dim, height: dim }}>
      <div style={{ position: "absolute", left: inset, top: inset, width: inner, height: inner, borderRadius: "50%", background: fill, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Inter", fontWeight: 700, fontSize, lineHeight: 1, letterSpacing: "-0.02em" }}>{initials}</div>
      {ringColor && <div style={{ position: "absolute", left: inset, top: inset, width: inner, height: inner, borderRadius: "50%", border: `${ringWidth}px solid ${ringColor}`, boxSizing: "border-box" }}/>}
      {role === "owner" && <div style={{ position: "absolute", left: dim/2 - badgeSize/2, top: badgeOffset, width: badgeSize, height: badgeSize, borderRadius: "50%", background: "#F0BF05", border: "1.5px solid #fff", boxSizing: "border-box" }}/>}
      {role === "admin" && <div style={{ position: "absolute", left: dim/2 - badgeSize/2, top: dim - badgeSize/2 - 4, width: badgeSize, height: badgeSize, borderRadius: "50%", background: "#006682", border: "1.5px solid #fff", boxSizing: "border-box" }}/>}
    </div>
  );
}

function KluvsButton({ children, variant = "primary", onClick, disabled, style = {} }) {
  const base = { height: 52, borderRadius: 10, fontFamily: "Inter", fontWeight: 700, fontSize: 16, border: 0, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px", transition: "background 120ms ease-out", width: "100%" };
  let v;
  if (variant === "primary") v = { background: disabled ? "#F5F5F5" : COPPER, color: disabled ? "#B3B3B3" : "#fff" };
  else if (variant === "secondary") v = { background: "transparent", color: COPPER, boxShadow: `inset 0 0 0 1.5px ${COPPER}` };
  else if (variant === "ghost") v = { background: "transparent", color: COPPER, fontWeight: 500, fontSize: 13, height: "auto" };
  return <button onClick={disabled ? null : onClick} style={{ ...base, ...v, ...style }}>{children}</button>;
}

function KluvsInput({ label, value, onChange, placeholder, type = "text", state = "default", help, leftIcon, autoFocus }) {
  const [focused, setFocused] = React.useState(false);
  const isFocused = focused || state === "focused";
  const isError = state === "error";
  const isDisabled = state === "disabled";
  const lblColor = isError ? "#E53333" : isFocused ? COPPER : isDisabled ? "#B3B3B3" : "#666";
  const border = isError ? "1px solid #E53333" : isFocused ? `2px solid ${COPPER}` : isDisabled ? "1px solid #E0E0E0" : "1px solid #B0B0B0";
  const bg = isError ? "#FFF7F7" : isDisabled ? "#F5F5F5" : "#fff";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 12, color: lblColor }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, height: 48, padding: "0 14px", borderRadius: 8, background: bg, border, boxSizing: "border-box" }}>
        {leftIcon && <KluvsIcon name={leftIcon} size={16} color="#999"/>}
        <input type={type} value={value || ""} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} disabled={isDisabled} autoFocus={autoFocus}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ border: 0, outline: 0, flex: 1, fontFamily: "Inter", fontSize: 16, lineHeight: 1, color: isDisabled ? "#BFBFBF" : "#1A1A1A", background: "transparent", minWidth: 0 }}/>
      </div>
      {help && <div style={{ fontFamily: "Inter", fontSize: 11, color: isError ? "#E53333" : "#999" }}>{help}</div>}
    </div>
  );
}

function KluvsTextDivider({ label = "OR" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 20 }}>
      <div style={{ flex: 1, height: 1, background: "#E6E6E6" }}/>
      <span style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 12, color: "#999" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "#E6E6E6" }}/>
    </div>
  );
}

function KluvsSocialButton({ provider = "google", onClick }) {
  const cfg = {
    discord: { bg: "#5865F2", color: "#fff", icon: "../../assets/provider-discord.svg", label: "Continue with Discord" },
    google:  { bg: "#F2F2F2", color: "#1F1F1F", icon: "../../assets/provider-google.svg",  label: "Continue with Google", border: "1px solid #D1D1D1" },
    apple:   { bg: "#0F0F0F", color: "#fff", icon: "../../assets/provider-apple.svg",   label: "Continue with Apple" },
  }[provider];
  return (
    <button onClick={onClick} style={{ width: "100%", height: 52, borderRadius: 10, background: cfg.bg, color: cfg.color, border: cfg.border || 0, display: "flex", alignItems: "center", padding: "0 20px", gap: 14, cursor: "pointer", fontFamily: "Inter", fontWeight: 500, fontSize: 15 }}>
      <img src={cfg.icon} width={22} height={22} alt=""/>
      <span>{cfg.label}</span>
    </button>
  );
}

function KluvsListRow({ icon, label, right, onClick, last }) {
  return (
    <button onClick={onClick} style={{ width: "100%", border: 0, background: "transparent", display: "flex", alignItems: "center", gap: 12, padding: "16px 0", borderBottom: last ? "none" : `1px solid ${CARD_2}`, cursor: "pointer", textAlign: "left" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: CARD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <KluvsIcon name={icon} size={14} color={FG}/>
      </div>
      <span style={{ flex: 1, fontFamily: "Inter", fontSize: 15, color: FG }}>{label}</span>
      {right ?? <KluvsIcon name="chevron-right" size={16} color={MUTED}/>}
    </button>
  );
}

function KluvsTimelineNode({ title, meta, locationIcon = "video", state = "upcoming", last }) {
  // states: "done" (recessed dark-copper dot + check) | "current" (bright copper + ring) | "upcoming" (deep neutral dot)
  const isDone = state === "done";
  const isCurrent = state === "current";
  const dotBg = isCurrent ? COPPER : isDone ? "#7A4422" : DEEP;
  const cardBg = isCurrent ? "#33200F" : CARD;
  const cardBorder = isCurrent ? `1px solid ${COPPER}` : "none";
  const titleColor = isDone ? MUTED : FG;
  return (
    <div style={{ position: "relative", paddingLeft: 36, paddingBottom: last ? 0 : 16 }}>
      {!last && <div style={{ position: "absolute", left: 8, top: 18, bottom: 0, width: 2, borderRadius: 1, background: DEEP }}/>}
      <div style={{ position: "absolute", left: 0, top: 0, width: 18, height: 18, borderRadius: "50%", background: dotBg, boxShadow: isCurrent ? `0 0 0 3px rgba(209,110,48,0.25)` : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isDone && <KluvsIcon name="check-bold" size={11} color="#fff"/>}
      </div>
      <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: "10px 14px", opacity: isDone ? 0.7 : 1 }}>
        <div style={{ fontFamily: "Inter", fontWeight: isCurrent ? 700 : 500, fontSize: 14, color: titleColor, marginBottom: 4, textDecoration: isDone ? "line-through" : "none", textDecorationColor: isDone ? DEEP : "transparent" }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: MUTED }}>
          <KluvsIcon name={locationIcon} size={10} color={MUTED}/>
          <span>{meta}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  KluvsTopBar, KluvsSubBar, KluvsTabs, KluvsBottomNav,
  KluvsCard, KluvsAccentCard, KluvsSectionTitle, KluvsAvatar, KluvsButton,
  KluvsInput, KluvsTextDivider, KluvsSocialButton, KluvsListRow, KluvsIcon,
  KluvsTimelineNode, KluvsLogoWord,
  KLUVS_COPPER: COPPER, KLUVS_BG: BG, KLUVS_BAR: BAR, KLUVS_NAV: NAV,
  KLUVS_CARD: CARD, KLUVS_CARD_2: CARD_2, KLUVS_FG: FG, KLUVS_MUTED: MUTED, KLUVS_DEEP: DEEP,
});
