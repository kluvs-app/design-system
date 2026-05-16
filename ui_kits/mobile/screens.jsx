// Kluvs mobile screens — recreated from /Mobile-Auth/{Login,Sign-Up}, /Mobile-Clubs/*,
// /Mobile-Profile/Me, plus screenshot review (kluvs.com app, Nov 2026).
// Frame: 390×844. Each screen is self-contained — own status bar, own bottom nav.

const FRAME_W = 390;
const FRAME_H = 844;

// ─── Status bars ─────────────────────────────────────────────
function StatusBarLight({ time = "9:41", right = "● ● ●" }) {
  return (
    <div style={{ height: 44, position: "relative", flexShrink: 0 }}>
      <span style={{ position: "absolute", left: 32, top: 14, fontFamily: "Inter", fontWeight: 700, fontSize: 15, color: "#1A1A1A" }}>{time}</span>
      <span style={{ position: "absolute", right: 32, top: 15, fontFamily: "Inter", fontSize: 11, color: "#1A1A1A", letterSpacing: 2 }}>{right}</span>
    </div>
  );
}
function StatusBarDark({ time = "18:46", right = "● ▲ 80%" }) {
  return (
    <div style={{ height: 44, position: "relative", flexShrink: 0 }}>
      <span style={{ position: "absolute", left: 20, top: 14, fontFamily: "Inter", fontWeight: 700, fontSize: 15, color: KLUVS_FG }}>{time}</span>
      <span style={{ position: "absolute", right: 20, top: 16, fontFamily: "Inter", fontSize: 11, color: KLUVS_FG }}>{right}</span>
    </div>
  );
}

// 2-tab bottom nav: Clubs (hexagon) + Me (person).
const BOTTOM_NAV_ITEMS = [
  { label: "Clubs", icon: "honeycomb" },
  { label: "Me",    icon: "user" },
];

// ─── Auth chrome (shared by Login + Sign Up) ─────────────────
// Per screenshots: NO wordmark above the title. Title is "Welcome to your Kluvs",
// subtitle differs per flow. Plain-text "or continue with email" divider.
function AuthScreen({ subtitle, ctaLabel, footer, withConfirm }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: "#FAFAFC", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <StatusBarLight/>
      <div style={{ paddingTop: 60, textAlign: "center" }}>
        <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 28, color: "#1A1A1A", letterSpacing: "-0.01em", lineHeight: 1.1 }}>Welcome to your Kluvs</div>
        <div style={{ fontFamily: "Inter", fontSize: 15, color: "#8C8073", lineHeight: 1.43, marginTop: 10 }}>{subtitle}</div>
      </div>
      <div style={{ padding: "32px 32px 0", display: "flex", flexDirection: "column", gap: 14 }}>
        <KluvsSocialButton provider="discord"/>
        <KluvsSocialButton provider="google"/>
        <KluvsSocialButton provider="apple"/>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0", fontFamily: "Inter", fontSize: 13, color: "#8C8073" }}>or continue with email</div>
        <KluvsInput label="Email" value={email} onChange={setEmail} placeholder="you@example.com" leftIcon="mail"/>
        <KluvsInput label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" leftIcon="lock"/>
        {withConfirm && <KluvsInput label="Confirm Password" value={confirm} onChange={setConfirm} placeholder="••••••••" type="password" leftIcon="lock"/>}
        <KluvsButton style={{ marginTop: 8 }}>{ctaLabel}</KluvsButton>
      </div>
      <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center", fontFamily: "Inter", fontSize: 13 }}>
        {footer}
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <AuthScreen
      subtitle="Sign in to your account"
      ctaLabel="Log in"
      footer={<><span style={{ color: "#8C8073" }}>Don't have an account? </span><span style={{ color: KLUVS_COPPER, fontWeight: 600, cursor: "pointer" }}>Sign up</span></>}
    />
  );
}

function SignUpScreen() {
  return (
    <AuthScreen
      subtitle="Create a new account"
      ctaLabel="Create account"
      withConfirm
      footer={<><span style={{ color: "#8C8073" }}>Already have an account? </span><span style={{ color: KLUVS_COPPER, fontWeight: 600, cursor: "pointer" }}>Log in</span></>}
    />
  );
}

// ─── Clubs list (home) ───────────────────────────────────────
const CLUBS = [
  { name: "Showcase Kluv",   role: "owner",  members: 6, book: "How AI Thinks",          author: "Nigel Toon",        next: "Mar 2 · In person",  hue: "#D16E30" },
  { name: "Philosophy Café", role: "admin",  members: 4, book: "The Myth of Sisyphus",   author: "Albert Camus",      next: "Mar 14 · Virtual",   hue: "#9B59B6" },
  { name: "Latin Lit",       role: "member", members: 9, book: "Cien Años de Soledad",   author: "Gabriel García M.", next: "Apr 1 · Virtual",    hue: "#16A085" },
];

function ClubsListScreen({ onNav }) {
  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: KLUVS_BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBarDark/>
      <div style={{ height: 52, background: KLUVS_BAR, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 22, color: KLUVS_FG }}>Your Clubs</span>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(209,110,48,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <KluvsIcon name="plus" size={18} color={KLUVS_COPPER}/>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {CLUBS.map((c) => (
          <KluvsCard key={c.name} style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: c.hue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <KluvsIcon name="honeycomb" size={22} color="#fff"/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 15, color: KLUVS_FG }}>{c.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: KLUVS_MUTED, marginTop: 2 }}>
                  <KluvsIcon name="users" size={11} color={KLUVS_MUTED}/><span>{c.members} members</span>
                  <span style={{ color: KLUVS_DEEP }}>·</span>
                  <span style={{ color: c.role === "owner" ? "#F0BF05" : c.role === "admin" ? "#3FB6D6" : KLUVS_MUTED, fontWeight: 600, textTransform: "capitalize" }}>{c.role}</span>
                </div>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${KLUVS_CARD_2}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: KLUVS_MUTED }}>
                <KluvsIcon name="book" size={11} color={KLUVS_COPPER}/>
                <span style={{ color: KLUVS_FG }}>{c.book}</span>
                <span>· {c.author}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: KLUVS_MUTED }}>
                <KluvsIcon name="calendar" size={11} color={KLUVS_MUTED}/>
                <span>Next: {c.next}</span>
              </div>
            </div>
          </KluvsCard>
        ))}
      </div>
      <KluvsBottomNav items={BOTTOM_NAV_ITEMS} active={0} onChange={onNav}/>
    </div>
  );
}

// ─── Club Detail shared chrome ───────────────────────────────
function ClubChrome({ tab, onTab, children, onTabNav }) {
  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: KLUVS_BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBarDark/>
      <KluvsTopBar title="Kluvs" right={<div style={{ display: "flex", gap: 12 }}><KluvsIcon name="search" size={20} color={KLUVS_FG}/><KluvsIcon name="bell" size={20} color={KLUVS_FG}/></div>}/>
      <KluvsSubBar icon="menu" label="Showcase Kluv"/>
      <KluvsTabs tabs={["General", "Active Session", "Members"]} active={tab} onChange={onTab}/>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 0" }}>{children}</div>
      <KluvsBottomNav items={BOTTOM_NAV_ITEMS} active={0} onChange={onTabNav}/>
    </div>
  );
}

// ─── Club — General ──────────────────────────────────────────
function ClubGeneralScreen({ onTab, onNav }) {
  return (
    <ClubChrome tab={0} onTab={onTab} onTabNav={onNav}>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <KluvsCard>
          <div style={{ fontFamily: "Inter", fontSize: 14 }}>Founded in 2026</div>
          <div style={{ height: 1, background: KLUVS_CARD_2, margin: "10px 0" }}/>
          <div style={{ fontFamily: "Inter", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <KluvsIcon name="users" size={14} color={KLUVS_MUTED}/>
            <span>6 members</span>
          </div>
        </KluvsCard>
        <KluvsCard style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <KluvsIcon name="book" size={14} color={KLUVS_COPPER}/>
            <span style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 12, color: KLUVS_MUTED, textTransform: "uppercase", letterSpacing: 0.6 }}>Currently Reading</span>
          </div>
          <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 16, color: KLUVS_FG }}>How AI Thinks</div>
          <div style={{ fontFamily: "Inter", fontSize: 13, color: KLUVS_MUTED, marginTop: 4 }}>Nigel Toon</div>
          <div style={{ fontFamily: "Inter", fontSize: 12, color: KLUVS_MUTED, marginTop: 2 }}>2024 · 320 pages</div>
          {/* Reading-progress bar (per screenshot) */}
          <div style={{ marginTop: 12 }}>
            <div style={{ height: 4, borderRadius: 2, background: "#403329", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: 4, width: "62%", borderRadius: 2, background: KLUVS_COPPER }}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter", fontSize: 11, color: KLUVS_MUTED, marginTop: 6 }}>
              <span>198 / 320 pages</span><span>62%</span>
            </div>
          </div>
        </KluvsCard>
        <KluvsAccentCard
          eyebrow="Next Discussion"
          title="Ethics, Risk and Our Future"
          meta="In person · March 2, 2026 at 5:00 PM"
        />
      </div>
    </ClubChrome>
  );
}

// ─── Club — Active Session ───────────────────────────────────
function ClubActiveSessionScreen({ onTab, onNav }) {
  return (
    <ClubChrome tab={1} onTab={onTab} onTabNav={onNav}>
      <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
        <KluvsCard>
          <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 16, color: KLUVS_FG }}>How AI Thinks</div>
          <div style={{ fontFamily: "Inter", fontSize: 13, color: KLUVS_MUTED, marginTop: 4 }}>by Nigel Toon</div>
          <div style={{ fontFamily: "Inter", fontSize: 12, color: KLUVS_MUTED, marginTop: 2 }}>Due Date: December 31, 2026</div>
        </KluvsCard>
        <div>
          <KluvsSectionTitle style={{ padding: 0, marginBottom: 12 }}>Discussion Timeline</KluvsSectionTitle>
          <KluvsTimelineNode title="The Engine" meta="Virtual · January 19, 2026 at 5:00 PM" locationIcon="video" state="done"/>
          <KluvsTimelineNode title="The Nature of Intelligence" meta="Virtual · February 2, 2026 at 5:00 PM" locationIcon="video" state="done"/>
          <KluvsTimelineNode title="Real-World Transformations" meta="Virtual · February 16, 2026 at 5:00 PM" locationIcon="video" state="current"/>
          <KluvsTimelineNode title="Ethics, Risk and Our Future" meta="In person · March 2, 2026 at 5:00 PM" locationIcon="map-pin" last/>
        </div>
      </div>
    </ClubChrome>
  );
}

// ─── Club — Members ──────────────────────────────────────────
const MEMBERS = [
  { name: "Iván Garza Bermea",   handle: "@ivangarzab", role: "owner",  initials: "IG", points: 1420 },
  { name: "Socrates",            handle: "@socrates",   role: "admin",  initials: "SO", points: 980 },
  { name: "Lanze Wolf",          handle: "@lanze",      role: "member", initials: "LW", points: 540 },
  { name: "Sherlock Holmes",     handle: "@sherlock",   role: "member", initials: "SH", points: 320 },
  { name: "Friedrich Nietzsche", handle: "@nietzsche",  role: "member", initials: "FN", points: 210 },
  { name: "Simone de Beauvoir",  handle: "@simone",     role: "member", initials: "SB", points: 0 },
];

function ClubMembersScreen({ onTab, onNav }) {
  return (
    <ClubChrome tab={2} onTab={onTab} onTabNav={onNav}>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <KluvsSectionTitle style={{ padding: 0 }}>Members ({MEMBERS.length})</KluvsSectionTitle>
        <KluvsCard style={{ padding: 0 }}>
          {MEMBERS.map((m, i) => (
            <div key={m.handle} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderBottom: i < MEMBERS.length - 1 ? `1px solid ${KLUVS_CARD_2}` : "none" }}>
              <KluvsAvatar initials={m.initials} role={m.role} size="sm"/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 14, color: KLUVS_FG }}>{m.name}</div>
                <div style={{ fontFamily: "Inter", fontSize: 12, color: KLUVS_MUTED, marginTop: 4 }}>{m.handle}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter", fontSize: 12, color: KLUVS_MUTED }}>
                <KluvsIcon name="gem" size={11} color={KLUVS_COPPER}/>
                <span>{m.points} pts.</span>
              </div>
            </div>
          ))}
        </KluvsCard>
      </div>
    </ClubChrome>
  );
}

// ─── Profile / Me ────────────────────────────────────────────
function MeScreen({ onNav, onLogout }) {
  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: KLUVS_BG, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBarDark right="● ▲ 81%"/>
      <KluvsTopBar title="Me"/>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <KluvsAvatar initials="LW" role="owner" size="lg"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 20, color: KLUVS_FG }}>Lanze Wolf</div>
            <div style={{ fontFamily: "Inter", fontSize: 13, color: KLUVS_MUTED, marginTop: 4 }}>@lanze</div>
            <div style={{ fontFamily: "Inter", fontSize: 12, color: KLUVS_MUTED, marginTop: 4 }}>Member since 2026</div>
          </div>
        </div>
        <KluvsSectionTitle style={{ padding: 0, marginTop: 8 }}>Your Statistics</KluvsSectionTitle>
        <KluvsCard style={{ padding: 0 }}>
          {[
            { icon: "honeycomb", label: "Number of Clubs", value: "3" },
            { icon: "book",      label: "Books Read",      value: "23" },
            { icon: "gem",       label: "Points",          value: "540" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${KLUVS_CARD_2}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: KLUVS_COPPER, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <KluvsIcon name={s.icon} size={14} color="#fff"/>
              </div>
              <span style={{ flex: 1, fontFamily: "Inter", fontSize: 13, color: KLUVS_FG }}>{s.label}</span>
              <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 14, color: KLUVS_FG }}>{s.value}</span>
            </div>
          ))}
        </KluvsCard>
        <KluvsSectionTitle style={{ padding: 0, marginTop: 8 }}>Currently Reading</KluvsSectionTitle>
        <KluvsCard>
          {[
            { title: "The Myth of Sisyphus", pct: 85 },
            { title: "Cien Años de Soledad", pct: 60 },
            { title: "How AI Thinks", pct: 40 },
          ].map(b => (
            <div key={b.title} style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: "Inter", fontSize: 14, color: KLUVS_FG, marginBottom: 8 }}>{b.title}</div>
              <div style={{ height: 4, borderRadius: 2, background: "#403329", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: 4, width: `${b.pct}%`, borderRadius: 2, background: KLUVS_COPPER }}/>
              </div>
            </div>
          ))}
          <div style={{ fontFamily: "Inter", fontSize: 13, color: KLUVS_COPPER, marginTop: -4 }}>And more...</div>
        </KluvsCard>
        <div style={{ marginTop: 8 }}>
          <KluvsListRow icon="settings" label="Settings"/>
          <KluvsListRow icon="help" label="Help & Support"/>
          {/* Sign Out is destructive (red) — per screenshots. */}
          <button onClick={onLogout} style={{ width: "100%", border: 0, background: "transparent", display: "flex", alignItems: "center", gap: 12, padding: "16px 0", borderTop: "none", cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <KluvsIcon name="logout" size={14} color="#EF4444"/>
            </div>
            <span style={{ flex: 1, fontFamily: "Inter", fontSize: 15, color: "#EF4444", fontWeight: 600 }}>Sign Out</span>
          </button>
        </div>
      </div>
      <KluvsBottomNav items={BOTTOM_NAV_ITEMS} active={1} onChange={onNav}/>
    </div>
  );
}

Object.assign(window, {
  LoginScreen, SignUpScreen, ClubsListScreen,
  ClubGeneralScreen, ClubActiveSessionScreen, ClubMembersScreen, MeScreen,
  KLUVS_FRAME_W: FRAME_W, KLUVS_FRAME_H: FRAME_H,
});
