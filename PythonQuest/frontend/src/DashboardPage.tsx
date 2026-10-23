import { useState } from "react";

interface Location {
  id: string;
  name: string;
  topic: string;
  desc: string;
  icon: string;
  x: number; // percent of map width
  y: number; // percent of map height
  unlocked: boolean;
  completed: boolean;
  color: string;
  darkColor: string;
}

const LOCATIONS: Location[] = [
  {
    id: "beach",
    name: "Sunhaven Beach",
    topic: "Introduction to Python",
    desc: "Your first steps on Codehaven. Learn what Python magic is, how to cast your first print() spell, and what variables can do.",
    icon: "🏖️",
    x: 18,
    y: 72,
    unlocked: true,
    completed: true,
    color: "#f59e0b",
    darkColor: "#92400e",
  },
  {
    id: "village",
    name: "Codehaven Village",
    topic: "Variables & Data Types",
    desc: "Help the villagers store their magical items using variables. Discover strings, numbers, and booleans — the building blocks of all spells.",
    icon: "🏘️",
    x: 36,
    y: 58,
    unlocked: true,
    completed: true,
    color: "#22c55e",
    darkColor: "#14532d",
  },
  {
    id: "forest",
    name: "Whisperwood Forest",
    topic: "Conditions & If-Else",
    desc: "The enchanted forest only lets the worthy pass. Write if-else spells to make decisions and unlock hidden paths through the trees.",
    icon: "🌲",
    x: 55,
    y: 45,
    unlocked: true,
    completed: false,
    color: "#16a34a",
    darkColor: "#14532d",
  },
  {
    id: "river",
    name: "Mana River",
    topic: "Loops & Iteration",
    desc: "The river flows in repeating patterns. Master for and while loops to harness its power and automate your most tedious spells.",
    icon: "🌊",
    x: 30,
    y: 35,
    unlocked: false,
    completed: false,
    color: "#0ea5e9",
    darkColor: "#0c4a6e",
  },
  {
    id: "mountain",
    name: "Spelltop Mountain",
    topic: "Functions & Spells",
    desc: "High above the clouds, the elder wizards teach the art of writing reusable spell functions. Climb to master def, return, and parameters.",
    icon: "⛰️",
    x: 68,
    y: 25,
    unlocked: false,
    completed: false,
    color: "#8b5cf6",
    darkColor: "#4c1d95",
  },
  {
    id: "cave",
    name: "Pirate's Lair",
    topic: "Final Challenge",
    desc: "The Pirate Lord awaits. Battle him using all your Python knowledge to recover the final Python Crystal fragment and restore Codehaven.",
    icon: "💀",
    x: 80,
    y: 60,
    unlocked: false,
    completed: false,
    color: "#6b21a8",
    darkColor: "#1e0533",
  },
];

// Paths connecting locations (pairs of location IDs)
const PATHS: [string, string][] = [
  ["beach", "village"],
  ["village", "forest"],
  ["village", "river"],
  ["forest", "mountain"],
  ["river", "mountain"],
  ["mountain", "cave"],
];

const CRYSTALS_COLLECTED = 3;
const CRYSTALS_TOTAL = 7;
const XP = 340;
const XP_NEXT = 500;
const LEVEL = 4;

interface Props {
  username?: string;
  onLogout: () => void;
  onStartLesson: (loc: Location) => void;
}

export default function DashboardPage({ username = "BraveTraveler", onLogout, onStartLesson }: Props) {
  const [selected, setSelected] = useState<Location | null>(null);
  const [sidePanel, setSidePanel] = useState<"profile" | "spellbook" | "settings" | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const currentLoc = LOCATIONS.find((l) => l.unlocked && !l.completed) || LOCATIONS[0];

  function locById(id: string) {
    return LOCATIONS.find((l) => l.id === id)!;
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* ══ Island Map Background ══ */}
      <IslandMapBg />

      {/* ══ SVG paths + nodes overlay ══ */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ zIndex: 3, pointerEvents: "none" }}
      >
        <defs>
          <filter id="pathglow">
            <feGaussianBlur stdDeviation="0.3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {PATHS.map(([aId, bId]) => {
          const a = locById(aId);
          const b = locById(bId);
          const bothUnlocked = a.unlocked && b.unlocked;
          // Curved path via midpoint offset
          const mx = (a.x + b.x) / 2 + (Math.random() > 0.5 ? 3 : -3);
          const my = (a.y + b.y) / 2 + (Math.random() > 0.5 ? 4 : -4);
          return (
            <g key={`${aId}-${bId}`}>
              {/* Path shadow */}
              <path
                d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                fill="none"
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="0.8"
                strokeDasharray="1.2 0.8"
              />
              {/* Main path */}
              <path
                d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                fill="none"
                stroke={bothUnlocked ? "#d4a017" : "rgba(100,80,40,0.4)"}
                strokeWidth="0.55"
                strokeDasharray={bothUnlocked ? "none" : "1 0.8"}
                filter={bothUnlocked ? "url(#pathglow)" : undefined}
                opacity={bothUnlocked ? 0.9 : 0.5}
              />
            </g>
          );
        })}
      </svg>

      {/* ══ Location nodes ══ */}
      <div className="absolute inset-0" style={{ zIndex: 4, pointerEvents: "none" }}>
        {LOCATIONS.map((loc) => {
          const isCurrent = loc.id === currentLoc.id;
          const isHovered = hoveredId === loc.id;
          return (
            <div
              key={loc.id}
              style={{
                position: "absolute",
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "all",
                cursor: "pointer",
                zIndex: isCurrent ? 6 : 5,
              }}
              onClick={() => setSelected(selected?.id === loc.id ? null : loc)}
              onMouseEnter={() => setHoveredId(loc.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Pulse ring for current location */}
              {isCurrent && (
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "-12px",
                    border: "2.5px solid rgba(74,222,128,0.7)",
                    borderRadius: "50%",
                    animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Node circle */}
              <div
                style={{
                  width: "clamp(52px,6vw,72px)",
                  height: "clamp(52px,6vw,72px)",
                  borderRadius: "50%",
                  background: loc.unlocked
                    ? `radial-gradient(circle at 35% 35%, ${loc.color}ee, ${loc.darkColor})`
                    : "radial-gradient(circle at 35% 35%, #4a4a5a, #1e1e2e)",
                  border: `3px solid ${loc.unlocked ? loc.color : "#3a3a4a"}`,
                  boxShadow: loc.unlocked
                    ? `0 0 ${isHovered ? 24 : 14}px ${loc.color}88, 0 4px 12px rgba(0,0,0,0.4)`
                    : "0 4px 12px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(22px,3vw,30px)",
                  transition: "all 0.18s ease",
                  transform: isHovered ? "scale(1.15)" : "scale(1)",
                  position: "relative",
                  filter: loc.unlocked ? "none" : "saturate(0.2) brightness(0.6)",
                }}
              >
                {loc.unlocked ? loc.icon : "🔒"}
                {loc.completed && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      border: "2px solid #fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      color: "white",
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>

              {/* Label */}
              <div
                style={{
                  marginTop: "6px",
                  textAlign: "center",
                  background: "rgba(13,25,45,0.82)",
                  border: `1.5px solid ${loc.unlocked ? loc.color + "88" : "rgba(80,80,100,0.4)"}`,
                  borderRadius: "8px",
                  padding: "3px 8px",
                  backdropFilter: "blur(4px)",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "clamp(9px,1.1vw,12px)", color: loc.unlocked ? "#fdf3dc" : "#888", letterSpacing: "0.01em" }}>
                  {loc.name}
                </p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "clamp(7px,0.9vw,10px)", color: loc.unlocked ? loc.color : "#555", opacity: 0.9 }}>
                  {loc.topic}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ Player avatar on current location ══ */}
      <div
        style={{
          position: "absolute",
          left: `${currentLoc.x}%`,
          top: `${currentLoc.y}%`,
          transform: "translate(-50%, -320%)",
          zIndex: 7,
          pointerEvents: "none",
        }}
      >
        <PlayerAvatar />
      </div>

      {/* ══ Top HUD bar ══ */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center gap-3 px-4 py-2.5"
        style={{
          zIndex: 10,
          background: "linear-gradient(180deg, rgba(13,25,45,0.96) 0%, rgba(13,25,45,0.75) 100%)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212,160,23,0.3)",
        }}
      >
        {/* Avatar + name */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #4ade80)",
              border: "2px solid #d4a017",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
              boxShadow: "0 0 10px rgba(124,58,237,0.5)",
            }}
          >🧙</div>
          <div>
            <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.7rem", color: "#d4a017", lineHeight: 1 }}>Lv.{LEVEL}</p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: "#fdf3dc", lineHeight: 1.2 }}>{username}</p>
          </div>
        </div>

        {/* XP bar */}
        <div className="flex-1 min-w-0" style={{ maxWidth: "220px" }}>
          <div className="flex justify-between mb-1">
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "#a78bfa" }}>⚡ XP</span>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "#c4b5fd" }}>{XP} / {XP_NEXT}</span>
          </div>
          <div style={{ height: "8px", borderRadius: "999px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(167,139,250,0.3)", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(XP / XP_NEXT) * 100}%`,
              background: "linear-gradient(90deg, #7c3aed, #a78bfa, #c084fc)",
              borderRadius: "999px",
              boxShadow: "0 0 8px rgba(167,139,250,0.6)",
              transition: "width 0.6s ease",
            }}/>
          </div>
        </div>

        {/* Crystal progress */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl flex-shrink-0"
          style={{
            background: "rgba(56,189,248,0.12)",
            border: "1.5px solid rgba(56,189,248,0.35)",
          }}
        >
          <span style={{ fontSize: "16px" }}>💎</span>
          <div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: "#7dd3fc", lineHeight: 1 }}>CRYSTALS</p>
            <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.82rem", color: "#38bdf8", lineHeight: 1.2 }}>
              {CRYSTALS_COLLECTED}<span style={{ color: "#7dd3fc", fontWeight: 400 }}>/{CRYSTALS_TOTAL}</span>
            </p>
          </div>
          {/* Crystal pip row */}
          <div className="flex gap-0.5 items-center">
            {Array.from({ length: CRYSTALS_TOTAL }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "8px", height: "12px",
                  clipPath: "polygon(50% 0%,100% 30%,80% 100%,20% 100%,0% 30%)",
                  background: i < CRYSTALS_COLLECTED ? "linear-gradient(180deg,#7dd3fc,#0284c7)" : "rgba(255,255,255,0.15)",
                  boxShadow: i < CRYSTALS_COLLECTED ? "0 0 4px #38bdf8" : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"/>

        {/* Quick action buttons */}
        {(["profile","spellbook","settings"] as const).map((p) => {
          const icons: Record<string, string> = { profile: "👤", spellbook: "📖", settings: "⚙️" };
          const labels: Record<string, string> = { profile: "Profile", spellbook: "Spellbook", settings: "Settings" };
          const isActive = sidePanel === p;
          return (
            <button
              key={p}
              onClick={() => setSidePanel(sidePanel === p ? null : p)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "1px",
                background: isActive ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)",
                border: `1.5px solid ${isActive ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.12)"}`,
                borderRadius: "10px",
                padding: "5px 10px",
                cursor: "pointer",
                transition: "all 0.15s",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "16px" }}>{icons[p]}</span>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: isActive ? "#c4b5fd" : "#a0aec0" }}>{labels[p]}</span>
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={onLogout}
          style={{
            background: "rgba(239,68,68,0.15)",
            border: "1.5px solid rgba(239,68,68,0.35)",
            borderRadius: "10px",
            padding: "5px 10px",
            cursor: "pointer",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.7rem",
            color: "#fca5a5",
            flexShrink: 0,
            transition: "all 0.15s",
          }}
        >
          ← Exit
        </button>
      </div>

      {/* ══ Location info card (click on node) ══ */}
      {selected && (
        <div
          className="absolute"
          style={{
            left: `clamp(16px, ${selected.x}%, calc(100vw - 320px))`,
            top: `clamp(80px, ${selected.y + 10}%, calc(100vh - 280px))`,
            zIndex: 20,
            width: "300px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              background: "linear-gradient(160deg, #fdf7e8 0%, #f0e0b8 100%)",
              border: `2.5px solid ${selected.unlocked ? selected.color : "#5a5a7a"}`,
              borderRadius: "18px",
              boxShadow: `0 12px 48px rgba(0,0,0,0.55), 0 0 24px ${selected.unlocked ? selected.color + "44" : "transparent"}`,
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "14px 16px 12px",
                background: selected.unlocked
                  ? `linear-gradient(135deg, ${selected.darkColor}, ${selected.color}88)`
                  : "linear-gradient(135deg, #1e1e3a, #2d2d4a)",
                borderBottom: `1.5px solid ${selected.unlocked ? selected.color + "88" : "#3a3a5a"}`,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "28px", filter: selected.unlocked ? "none" : "grayscale(1)" }}>{selected.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.8rem", color: selected.unlocked ? "#fdf3dc" : "#888", lineHeight: 1.2 }}>
                  {selected.name}
                </p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: selected.unlocked ? selected.color : "#666" }}>
                  {selected.topic}
                </p>
              </div>
              {selected.completed && (
                <div style={{ background: "#22c55e", borderRadius: "999px", padding: "2px 8px", fontSize: "0.65rem", fontWeight: 800, color: "white", fontFamily: "'Nunito', sans-serif" }}>
                  ✓ Done
                </div>
              )}
              <button
                onClick={() => setSelected(null)}
                style={{ background: "rgba(0,0,0,0.25)", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", color: "white", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >✕</button>
            </div>

            {/* Card body */}
            <div style={{ padding: "14px 16px 16px" }}>
              {!selected.unlocked && (
                <div
                  className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  <span>🔒</span>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#b91c1c" }}>
                    Complete earlier quests to unlock!
                  </p>
                </div>
              )}

              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#5c3d1e", lineHeight: 1.65, marginBottom: "14px" }}>
                {selected.desc}
              </p>

              {selected.unlocked && !selected.completed && (
                <div className="flex gap-2 mb-3">
                  {["⭐","⭐","⭐"].map((s, i) => (
                    <span key={i} style={{ fontSize: "16px", opacity: i === 0 ? 1 : 0.25 }}>{s}</span>
                  ))}
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: "#9c7c4a", marginLeft: "4px", alignSelf: "center" }}>0 / 3 stars</span>
                </div>
              )}

              {selected.completed && (
                <div className="flex gap-2 mb-3">
                  {["⭐","⭐","⭐"].map((s, i) => (
                    <span key={i} style={{ fontSize: "16px" }}>{s}</span>
                  ))}
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: "#22c55e", marginLeft: "4px", alignSelf: "center" }}>Quest Complete!</span>
                </div>
              )}

              <button
                disabled={!selected.unlocked}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "999px",
                  border: selected.unlocked ? `2.5px solid ${selected.color}` : "2px solid #4a4a5a",
                  background: selected.unlocked
                    ? `linear-gradient(135deg, ${selected.darkColor}, ${selected.color})`
                    : "rgba(74,74,90,0.4)",
                  color: selected.unlocked ? "#fff" : "#666",
                  fontFamily: "'Cinzel Decorative', serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: selected.unlocked ? "pointer" : "not-allowed",
                  boxShadow: selected.unlocked ? `0 0 16px ${selected.color}66` : "none",
                  transition: "all 0.15s",
                }}
                onClick={() => selected.unlocked && onStartLesson(selected)}
              >
                {selected.completed ? "⚔️ Replay Quest" : selected.unlocked ? "⚔️ Start Quest" : "🔒 Locked"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ Side panel (profile / spellbook / settings) ══ */}
      {sidePanel && (
        <div
          className="absolute top-0 right-0 bottom-0"
          style={{
            width: "clamp(280px, 28vw, 360px)",
            zIndex: 15,
            background: "linear-gradient(180deg, rgba(13,25,45,0.97) 0%, rgba(20,15,40,0.97) 100%)",
            borderLeft: "2px solid rgba(212,160,23,0.3)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            paddingTop: "64px",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "20px 20px 0" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.95rem", color: "#d4a017" }}>
                {{ profile: "👤 Profile", spellbook: "📖 Spellbook", settings: "⚙️ Settings" }[sidePanel]}
              </h3>
              <button onClick={() => setSidePanel(null)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "#aaa", fontSize: "14px" }}>✕</button>
            </div>

            {sidePanel === "profile" && <ProfilePanel username={username} />}
            {sidePanel === "spellbook" && <SpellbookPanel />}
            {sidePanel === "settings" && <SettingsPanel />}
          </div>
        </div>
      )}

      {/* ══ Dismiss click-away ══ */}
      {(selected || sidePanel) && (
        <div
          className="absolute inset-0"
          style={{ zIndex: 2 }}
          onClick={() => { setSelected(null); }}
        />
      )}

      {/* ══ Bottom hint ══ */}
      <div
        className="absolute bottom-4 left-1/2"
        style={{
          transform: "translateX(-50%)",
          zIndex: 8,
          background: "rgba(13,25,45,0.8)",
          border: "1px solid rgba(212,160,23,0.25)",
          borderRadius: "999px",
          padding: "6px 18px",
          backdropFilter: "blur(8px)",
          pointerEvents: "none",
        }}
      >
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: "rgba(253,243,220,0.7)", letterSpacing: "0.04em" }}>
          ✦ Tap a location to begin your quest ✦
        </p>
      </div>
    </div>
  );
}

// ── Player avatar ──
function PlayerAvatar() {
  return (
    <svg viewBox="0 0 44 56" width="38" height="48" style={{ filter: "drop-shadow(0 0 8px rgba(74,222,128,0.8))" }}>
      {/* Shadow */}
      <ellipse cx="22" cy="54" rx="10" ry="3" fill="rgba(0,0,0,0.35)"/>
      {/* Body */}
      <rect x="13" y="30" width="18" height="20" rx="5" fill="#1e40af"/>
      {/* Belt */}
      <rect x="13" y="38" width="18" height="3" rx="1" fill="#92400e"/>
      <rect x="19" y="37" width="6" height="5" rx="1" fill="#d4a017"/>
      {/* Arms */}
      <rect x="6" y="31" width="8" height="14" rx="4" fill="#1e40af"/>
      <rect x="30" y="31" width="8" height="14" rx="4" fill="#1e40af"/>
      {/* Hands */}
      <circle cx="10" cy="46" r="4" fill="#f5cba7"/>
      <circle cx="34" cy="46" r="4" fill="#f5cba7"/>
      {/* Head */}
      <circle cx="22" cy="20" r="13" fill="#f5cba7"/>
      {/* Hair */}
      <ellipse cx="22" cy="9" rx="11" ry="6" fill="#92400e"/>
      {/* Eyes */}
      <circle cx="18" cy="19" r="2.5" fill="#1f2937"/>
      <circle cx="26" cy="19" r="2.5" fill="#1f2937"/>
      <circle cx="18.8" cy="18.2" r="1" fill="white"/>
      <circle cx="26.8" cy="18.2" r="1" fill="white"/>
      {/* Smile */}
      <path d="M17 24 Q22 28 27 24" stroke="#c0693a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Cape */}
      <path d="M13 32 Q6 40 8 50 L14 48 L13 32 Z" fill="#7c3aed" opacity="0.9"/>
      <path d="M31 32 Q38 40 36 50 L30 48 L31 32 Z" fill="#7c3aed" opacity="0.9"/>
      {/* Wand */}
      <line x1="34" y1="44" x2="42" y2="36" stroke="#d4a017" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="42" cy="35" r="3" fill="#fbbf24"/>
      <circle cx="42" cy="35" r="5" fill="#fbbf24" opacity="0.3"/>
    </svg>
  );
}

// ── Full island map background ──
function IslandMapBg() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 1 }}>
      {/* Ocean base */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #0d3a6e 0%, #1565a0 30%, #1e88c8 60%, #29aad6 100%)" }}/>

      {/* Ocean texture waves */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.18 }}>
        {[80,160,240,320,400,480,560,640,720].map((y,i)=>(
          <path key={i} d={`M0,${y} Q180,${y-20} 360,${y} Q540,${y+20} 720,${y} Q900,${y-20} 1080,${y} Q1260,${y+20} 1440,${y}`} fill="none" stroke="white" strokeWidth="1.5"/>
        ))}
      </svg>

      {/* Main island shape */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="islandGrad" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#2d6a2d"/>
            <stop offset="45%" stopColor="#4a8a3a"/>
            <stop offset="75%" stopColor="#5c9a4a"/>
            <stop offset="100%" stopColor="#d4b67a"/>
          </radialGradient>
          <radialGradient id="mountainGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#8aab8a"/>
            <stop offset="100%" stopColor="#4a6a4a"/>
          </radialGradient>
          <filter id="islandBlur"><feGaussianBlur stdDeviation="2"/></filter>
        </defs>

        {/* Island shadow/glow in ocean */}
        <ellipse cx="720" cy="500" rx="580" ry="360" fill="rgba(0,80,0,0.15)" filter="url(#islandBlur)"/>

        {/* Main island body */}
        <path d="
          M 260,680 Q 150,640 120,560 Q 90,480 130,400
          Q 160,330 220,290 Q 280,240 350,220
          Q 440,190 540,195 Q 620,195 680,175
          Q 760,150 850,160 Q 940,170 1010,200
          Q 1090,235 1130,295 Q 1170,360 1160,430
          Q 1150,510 1110,570 Q 1060,640 980,675
          Q 880,710 760,720 Q 640,730 520,718
          Q 400,705 320,700 Z
        " fill="url(#islandGrad)"/>

        {/* Beach edge (lighter sand) */}
        <path d="
          M 260,680 Q 200,670 160,640 Q 130,615 120,580
          Q 130,610 170,638 Q 220,665 290,678
          Q 400,700 540,712 Q 680,722 800,714
          Q 920,706 1010,685 Q 1090,665 1130,630
          Q 1100,660 1050,678 Q 960,705 840,716
          Q 720,726 600,720 Q 480,714 370,703 Z
        " fill="#d4b67a" opacity="0.7"/>

        {/* Sandy beach southern shore */}
        <ellipse cx="340" cy="695" rx="130" ry="28" fill="#e8c980" opacity="0.8"/>
        <ellipse cx="760" cy="718" rx="180" ry="22" fill="#e8c980" opacity="0.6"/>

        {/* Forest areas (darker greens) */}
        <ellipse cx="790" cy="410" rx="160" ry="100" fill="#1f5c1f" opacity="0.5"/>
        <ellipse cx="580" cy="360" rx="120" ry="80" fill="#2d6a2d" opacity="0.4"/>

        {/* Mountain peak */}
        <polygon points="980,250 1050,120 1120,250" fill="url(#mountainGrad)" opacity="0.85"/>
        <polygon points="1050,120 1068,155 1032,155" fill="white" opacity="0.45"/>
        <polygon points="880,310 940,200 1000,310" fill="#7a9a7a" opacity="0.7"/>

        {/* Pirate cave area - dark corrupted */}
        <ellipse cx="1140" cy="550" rx="90" ry="70" fill="#1a0a2e" opacity="0.7"/>
        <ellipse cx="1160" cy="580" rx="60" ry="45" fill="#0d0520" opacity="0.8"/>

        {/* River */}
        <path d="M 440,350 Q 490,320 520,280 Q 560,240 600,210 Q 640,185 680,175" fill="none" stroke="#38bdf8" strokeWidth="14" opacity="0.65" strokeLinecap="round"/>
        <path d="M 440,350 Q 490,320 520,280 Q 560,240 600,210 Q 640,185 680,175" fill="none" stroke="#7dd3fc" strokeWidth="6" opacity="0.4" strokeLinecap="round"/>

        {/* Palm trees - scattered */}
        {([[190,650],[280,620],[870,680],[940,655],[310,590]]).map(([px,py],i)=>(
          <g key={i}>
            <path d={`M${px},${py} Q${px-2},${py-40} ${px+3},${py-80}`} stroke="#5c3d1e" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <ellipse cx={px-12} cy={py-78} rx="22" ry="7" fill="#2d6a2d" transform={`rotate(-25 ${px-12} ${py-78})`} opacity="0.9"/>
            <ellipse cx={px+14} cy={py-85} rx="20" ry="6" fill="#3d8a3d" transform={`rotate(20 ${px+14} ${py-85})`} opacity="0.9"/>
            <ellipse cx={px-5} cy={py-90} rx="18" ry="6" fill="#2d6a2d" transform={`rotate(-50 ${px-5} ${py-90})`} opacity="0.9"/>
          </g>
        ))}

        {/* Decorative rocks */}
        <ellipse cx="1090" cy="540" rx="20" ry="12" fill="#3d3d5a" opacity="0.8"/>
        <ellipse cx="1130" cy="520" rx="15" ry="9" fill="#2d2d4a" opacity="0.9"/>

        {/* Crystal sparkles on map */}
        <circle cx="720" cy="300" r="3" fill="#7dd3fc" opacity="0.8"/>
        <circle cx="720" cy="300" r="6" fill="#38bdf8" opacity="0.2"/>
        <text x="714" y="290" fontSize="14" fill="#fbbf24" opacity="0.7">✦</text>
        <text x="300" y="460" fontSize="10" fill="#4ade80" opacity="0.5">✦</text>
        <text x="1050" y="380" fontSize="12" fill="#a78bfa" opacity="0.6">✦</text>
        <text x="550" y="650" fontSize="10" fill="#fbbf24" opacity="0.5">✦</text>

        {/* Compass rose - bottom right */}
        <g transform="translate(1340, 820)">
          <circle cx="0" cy="0" r="36" fill="rgba(13,25,45,0.7)" stroke="rgba(212,160,23,0.5)" strokeWidth="1.5"/>
          <text x="0" y="-20" textAnchor="middle" fontSize="10" fill="#d4a017" fontFamily="serif" fontWeight="bold">N</text>
          <text x="0" y="26" textAnchor="middle" fontSize="10" fill="#d4a017" fontFamily="serif">S</text>
          <text x="-24" y="4" textAnchor="middle" fontSize="10" fill="#d4a017" fontFamily="serif">W</text>
          <text x="24" y="4" textAnchor="middle" fontSize="10" fill="#d4a017" fontFamily="serif">E</text>
          <polygon points="0,-16 3,-4 0,0 -3,-4" fill="#d4a017"/>
          <polygon points="0,16 3,4 0,0 -3,4" fill="#9c7c4a"/>
          <circle cx="0" cy="0" r="3" fill="#d4a017"/>
        </g>

        {/* Treasure map X mark */}
        <g transform="translate(1155,545)" opacity="0.6">
          <line x1="-8" y1="-8" x2="8" y2="8" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="8" y1="-8" x2="-8" y2="8" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      </svg>

      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)", pointerEvents: "none" }}/>
    </div>
  );
}

// ── Profile panel ──
function ProfilePanel({ username }: { username: string }) {
  return (
    <div>
      <div className="flex flex-col items-center mb-6">
        <div style={{ width:"72px",height:"72px",borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#4ade80)",border:"3px solid #d4a017",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",boxShadow:"0 0 20px rgba(124,58,237,0.5)",marginBottom:"10px" }}>🧙</div>
        <p style={{ fontFamily:"'Cinzel Decorative',serif",fontWeight:700,fontSize:"1rem",color:"#d4a017" }}>{username}</p>
        <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:"0.78rem",color:"#7dd3fc",marginTop:"2px" }}>Level {LEVEL} Python Wizard</p>
      </div>
      {[["Quests Completed","2"],["Total XP","340"],["Crystals Found","3 / 7"],["Monsters Defeated","8"]].map(([label,val])=>(
        <div key={label} className="flex justify-between items-center py-2.5" style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:"0.78rem",color:"#9ca3af" }}>{label}</span>
          <span style={{ fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.82rem",color:"#fdf3dc" }}>{val}</span>
        </div>
      ))}
      <div className="mt-5">
        <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:"0.72rem",color:"#d4a017",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.08em" }}>Badges</p>
        <div className="flex flex-wrap gap-2">
          {["🏖️ First Steps","🐍 Spell Caster","🏘️ Village Hero"].map(b=>(
            <div key={b} style={{ background:"rgba(212,160,23,0.12)",border:"1px solid rgba(212,160,23,0.3)",borderRadius:"999px",padding:"3px 10px",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:"0.68rem",color:"#fbbf24" }}>{b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Spellbook panel ──
function SpellbookPanel() {
  const mistakes = [
    { spell:"print()", mistake:"Missing parentheses", times:3, color:"#ef4444" },
    { spell:"Variables", mistake:"Wrong data type", times:2, color:"#f59e0b" },
    { spell:"if statement", mistake:"Wrong indentation", times:5, color:"#ef4444" },
  ];
  return (
    <div>
      <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:"0.8rem",color:"#9ca3af",marginBottom:"16px",lineHeight:1.5 }}>
        Your Spellbook tracks mistakes so you can master them. Every error is a lesson!
      </p>
      {mistakes.map((m,i)=>(
        <div key={i} className="mb-3 rounded-xl p-3" style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex justify-between items-start mb-1">
            <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.82rem",color:"#fdf3dc" }}>{m.spell}</p>
            <span style={{ background:`${m.color}22`,border:`1px solid ${m.color}66`,borderRadius:"999px",padding:"1px 7px",fontSize:"0.65rem",fontWeight:700,color:m.color,fontFamily:"'Nunito',sans-serif" }}>×{m.times}</span>
          </div>
          <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:"0.75rem",color:"#9ca3af" }}>⚠ {m.mistake}</p>
          <div style={{ marginTop:"6px",height:"4px",borderRadius:"999px",background:"rgba(255,255,255,0.08)",overflow:"hidden" }}>
            <div style={{ height:"100%",width:`${Math.min(m.times*20,100)}%`,background:`linear-gradient(90deg,${m.color}88,${m.color})`,borderRadius:"999px" }}/>
          </div>
        </div>
      ))}
      <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:"0.72rem",color:"#4ade80",marginTop:"8px" }}>💡 Practice these spells to level up faster!</p>
    </div>
  );
}

// ── Settings panel ──
function SettingsPanel() {
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  const [notifications, setNotifications] = useState(false);
  return (
    <div>
      {([
        ["🔊 Sound Effects", sound, setSound],
        ["🎵 Background Music", music, setMusic],
        ["🔔 Notifications", notifications, setNotifications],
      ] as const).map(([label, val, setter])=>(
        <div key={label} className="flex justify-between items-center py-3.5" style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:"0.82rem",color:"#e5e7eb" }}>{label}</span>
          <button
            onClick={() => setter(!val)}
            style={{
              width:"44px",height:"24px",borderRadius:"999px",
              background: val ? "linear-gradient(90deg,#16803c,#22c55e)" : "rgba(255,255,255,0.12)",
              border: val ? "none" : "1px solid rgba(255,255,255,0.2)",
              cursor:"pointer",position:"relative",transition:"background 0.2s",
            }}
          >
            <div style={{
              position:"absolute",top:"3px",
              left: val ? "calc(100% - 21px)" : "3px",
              width:"18px",height:"18px",borderRadius:"50%",
              background:"white",boxShadow:"0 1px 4px rgba(0,0,0,0.3)",
              transition:"left 0.2s",
            }}/>
          </button>
        </div>
      ))}
      <div className="mt-4 pt-4" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        {["Change Avatar","Change Username","Privacy Policy"].map(item=>(
          <button key={item} style={{ display:"block",width:"100%",textAlign:"left",background:"transparent",border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:"0.8rem",color:"#9ca3af",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            {item} →
          </button>
        ))}
      </div>
    </div>
  );
}
