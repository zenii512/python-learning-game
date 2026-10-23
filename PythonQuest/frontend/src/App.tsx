import { useState } from "react";
import StoryModal from "./StoryModal";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import LessonPage, { LessonLocation } from "./LessonPage";

const FEATURES = [
  {
    emoji: "📜",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
        <ellipse cx="40" cy="40" rx="36" ry="36" fill="#e8d5a3" stroke="#c8a86b" strokeWidth="2"/>
        <rect x="22" y="26" width="36" height="28" rx="4" fill="#fdf3dc" stroke="#c8a86b" strokeWidth="1.5"/>
        <path d="M22 32 Q14 40 22 48" stroke="#c8a86b" strokeWidth="2" fill="none"/>
        <circle cx="40" cy="40" r="8" fill="#3b82f6" opacity="0.8"/>
        <path d="M37 40 L39 42 L43 37" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <text x="40" y="58" textAnchor="middle" fontSize="10" fill="#7c5c2a" fontFamily="serif" fontWeight="bold">SPELL</text>
      </svg>
    ),
    title: "Story-driven lessons",
    desc: "Each Python concept is a new spell. Learn variables, loops, and functions through quests that unfold like a real adventure.",
  },
  {
    emoji: "⚔️",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
        <ellipse cx="40" cy="40" rx="36" ry="36" fill="#d4edda" stroke="#4ade80" strokeWidth="2"/>
        <rect x="28" y="50" width="24" height="18" rx="6" fill="#4ade80" opacity="0.8"/>
        <circle cx="40" cy="34" r="14" fill="#6ee7b7"/>
        <ellipse cx="40" cy="38" rx="6" ry="8" fill="#34d399"/>
        <circle cx="36" cy="32" r="3" fill="white"/>
        <circle cx="44" cy="32" r="3" fill="white"/>
        <circle cx="36" cy="32" r="1.5" fill="#1f2937"/>
        <circle cx="44" cy="32" r="1.5" fill="#1f2937"/>
        <path d="M35 42 Q40 46 45 42" stroke="#065f46" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M54 18 L62 10 M56 22 L66 16" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="62" cy="10" r="3" fill="#a78bfa"/>
        <circle cx="66" cy="16" r="3" fill="#a78bfa"/>
      </svg>
    ),
    title: "Battle monsters with code",
    desc: "Write real Python to cast spells in battle. Defeat corrupted creatures and earn their stolen code fragments.",
  },
  {
    emoji: "💎",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
        <ellipse cx="40" cy="40" rx="36" ry="36" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2"/>
        <polygon points="40,18 54,30 50,52 30,52 26,30" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.5"/>
        <polygon points="40,18 54,30 40,32" fill="#bae6fd"/>
        <polygon points="40,18 26,30 40,32" fill="#e0f2fe"/>
        <line x1="40" y1="18" x2="40" y2="52" stroke="#0284c7" strokeWidth="0.8" opacity="0.5"/>
        <circle cx="28" cy="22" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5"/>
        <text x="28" y="26" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">XP</text>
        <path d="M34 22 L36 22" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Earn XP & restore the Python Crystal",
    desc: "Level up your hero, unlock new island areas, and piece together the shattered Python Crystal to save Codehaven.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [page, setPage] = useState<"home" | "login" | "dashboard" | "lesson">("home");
  const [username, setUsername] = useState("BraveTraveler");
  const [activeLesson, setActiveLesson] = useState<LessonLocation | null>(null);

  if (page === "login") return <LoginPage onBack={() => setPage("home")} onEnter={(u) => { if (u) setUsername(u); setPage("dashboard"); }} />;
  if (page === "dashboard") return <DashboardPage username={username} onLogout={() => setPage("home")} onStartLesson={(loc) => { setActiveLesson(loc); setPage("lesson"); }} />;
  if (page === "lesson" && activeLesson) return <LessonPage location={activeLesson} username={username} xp={340} onBack={() => setPage("dashboard")} />;

  return (
    <div className="min-h-full relative overflow-x-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {storyOpen && <StoryModal onClose={() => setStoryOpen(false)} />}

      {/* ── Island background ── */}
      <div className="fixed inset-0 z-0">
        {/* Sky gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #0d2d52 0%, #1a4a7a 25%, #1e7ab8 55%, #2a9fd6 75%, #4db8e8 90%, #6dcff6 100%)",
          }}
        />

        {/* Far mountains */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" style={{ opacity: 0.6 }}>
          <path d="M0,500 L120,280 L240,380 L360,200 L480,350 L600,180 L720,320 L840,150 L960,300 L1080,200 L1200,340 L1320,220 L1440,380 L1440,700 L0,700 Z" fill="#1a3a5c" opacity="0.8"/>
          <path d="M0,560 L160,380 L300,460 L440,300 L560,420 L700,280 L820,390 L960,260 L1100,380 L1240,300 L1440,440 L1440,700 L0,700 Z" fill="#163350" opacity="0.9"/>
        </svg>

        {/* Ocean */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: 0,
            height: "38%",
            background: "linear-gradient(180deg, #1e7ab8 0%, #155f96 30%, #0e4470 100%)",
            borderRadius: "60% 60% 0 0 / 20% 20% 0 0",
          }}
        />

        {/* Ocean shimmer */}
        <svg className="absolute" style={{ bottom: "28%", left: 0, right: 0, width: "100%", opacity: 0.3 }} viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 Q180,10 360,30 Q540,50 720,30 Q900,10 1080,30 Q1260,50 1440,30 L1440,60 L0,60 Z" fill="white"/>
        </svg>

        {/* Beach sand */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: 0,
            height: "22%",
            background: "linear-gradient(180deg, #c8a86b 0%, #d4b67a 40%, #e8c980 100%)",
            borderRadius: "80% 80% 0 0 / 30% 30% 0 0",
          }}
        />

        {/* Left palm tree */}
        <svg className="absolute" style={{ left: "-2%", bottom: "18%", width: "18%", opacity: 0.95 }} viewBox="0 0 200 400" preserveAspectRatio="xMinYMax meet">
          <path d="M95,400 Q90,300 100,200 Q105,150 98,80" stroke="#5c3d1e" strokeWidth="14" fill="none" strokeLinecap="round"/>
          <ellipse cx="85" cy="85" rx="55" ry="18" fill="#2d6a2d" transform="rotate(-30 85 85)"/>
          <ellipse cx="115" cy="70" rx="55" ry="16" fill="#3d8a3d" transform="rotate(20 115 70)"/>
          <ellipse cx="75" cy="60" rx="50" ry="14" fill="#2d6a2d" transform="rotate(-50 75 60)"/>
          <ellipse cx="110" cy="50" rx="48" ry="13" fill="#4a9a4a" transform="rotate(50 110 50)"/>
          <circle cx="100" cy="88" r="8" fill="#8B4513"/>
          <circle cx="88" cy="96" r="7" fill="#6B3410"/>
        </svg>

        {/* Right cliff / pirate cave */}
        <svg className="absolute" style={{ right: "0", bottom: "14%", width: "26%", opacity: 0.97 }} viewBox="0 0 400 600" preserveAspectRatio="xMaxYMax meet">
          {/* Rock mass */}
          <path d="M80,600 L60,450 Q40,350 80,280 Q120,200 160,180 Q220,150 280,170 Q360,190 400,250 L400,600 Z" fill="#3d3d5c"/>
          <path d="M80,600 L70,460 Q50,360 90,290 Q130,210 170,195 Q230,168 290,188 Q370,208 400,268 L400,600 Z" fill="#2d2d4a"/>
          {/* Cave mouth */}
          <ellipse cx="260" cy="440" rx="70" ry="90" fill="#0a0a1a"/>
          <path d="M190,440 Q260,380 330,440" fill="#1a1a2e"/>
          {/* Skull sign */}
          <rect x="220" y="320" width="80" height="60" rx="8" fill="#5c5c7a" stroke="#8888aa" strokeWidth="2"/>
          <circle cx="260" cy="345" r="18" fill="#e8e8e0" stroke="#aaa" strokeWidth="1"/>
          <circle cx="252" cy="341" r="4" fill="#2a2a2a"/>
          <circle cx="268" cy="341" r="4" fill="#2a2a2a"/>
          <path d="M248 355 Q260 362 272 355" stroke="#2a2a2a" strokeWidth="2.5" fill="none"/>
          <rect x="252" y="358" width="4" height="8" rx="1" fill="#2a2a2a"/>
          <rect x="260" y="358" width="4" height="8" rx="1" fill="#2a2a2a"/>
          <rect x="268" y="358" width="4" height="8" rx="1" fill="#2a2a2a"/>
          {/* Runes on cliff */}
          <text x="360" y="310" fontSize="22" fill="#d4a017" opacity="0.7" fontFamily="serif">ᚷ</text>
          <text x="355" y="350" fontSize="22" fill="#d4a017" opacity="0.6" fontFamily="serif">ᚱ</text>
          <text x="360" y="390" fontSize="22" fill="#d4a017" opacity="0.5" fontFamily="serif">ᛏ</text>
          <text x="350" y="430" fontSize="22" fill="#d4a017" opacity="0.4" fontFamily="serif">ᚢ</text>
          {/* Cave glow */}
          <ellipse cx="260" cy="460" rx="45" ry="30" fill="#7c3aed" opacity="0.15"/>
        </svg>

        {/* Right palm tree */}
        <svg className="absolute" style={{ right: "20%", bottom: "20%", width: "14%", opacity: 0.88 }} viewBox="0 0 180 350" preserveAspectRatio="xMidYMax meet">
          <path d="M85,350 Q80,270 90,180 Q95,130 88,60" stroke="#5c3d1e" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <ellipse cx="75" cy="65" rx="48" ry="14" fill="#2d6a2d" transform="rotate(-25 75 65)"/>
          <ellipse cx="100" cy="52" rx="46" ry="13" fill="#3d8a3d" transform="rotate(25 100 52)"/>
          <ellipse cx="68" cy="44" rx="42" ry="12" fill="#2d6a2d" transform="rotate(-55 68 44)"/>
        </svg>

        {/* Floating sparkles */}
        <div className="absolute" style={{ left: "15%", top: "20%", color: "#d4a017", fontSize: "20px", opacity: 0.7 }}>
          <span className="sparkle" style={{ animationDelay: "0s" }}>✦</span>
        </div>
        <div className="absolute" style={{ left: "70%", top: "15%", color: "#a78bfa", fontSize: "16px", opacity: 0.6 }}>
          <span className="sparkle" style={{ animationDelay: "0.8s" }}>✦</span>
        </div>
        <div className="absolute" style={{ left: "85%", top: "30%", color: "#38bdf8", fontSize: "12px", opacity: 0.8 }}>
          <span className="sparkle" style={{ animationDelay: "1.5s" }}>✦</span>
        </div>
        <div className="absolute" style={{ left: "30%", top: "12%", color: "#4ade80", fontSize: "14px", opacity: 0.6 }}>
          <span className="sparkle" style={{ animationDelay: "2s" }}>✦</span>
        </div>
        <div className="absolute" style={{ left: "55%", top: "25%", color: "#fbbf24", fontSize: "18px", opacity: 0.5 }}>
          <span className="sparkle" style={{ animationDelay: "0.4s" }}>✦</span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav
        className="relative z-20 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: "linear-gradient(180deg, rgba(13,31,53,0.95) 0%, rgba(13,31,53,0.7) 100%)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,160,23,0.3)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4ade80)", boxShadow: "0 0 12px rgba(124,58,237,0.6)" }}
          >
            <span style={{ fontSize: "20px" }}>🐍</span>
          </div>
          <span
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontWeight: 700,
              fontSize: "clamp(0.75rem, 2vw, 1rem)",
              color: "#d4a017",
              textShadow: "0 0 8px rgba(212,160,23,0.6)",
              letterSpacing: "0.02em",
            }}
          >
            Python Quest
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="btn-trailer"
            style={{ padding: "10px 28px", fontSize: "0.9rem" }}
          >
            Login
          </button>
          <button
            className="btn-adventure"
            style={{
              padding: "10px 28px",
              fontSize: "0.9rem",
              background: "linear-gradient(135deg, #16803c 0%, #22c55e 50%, #16803c 100%)",
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ fontSize: "1.5rem" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {menuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 flex flex-col gap-3 p-6"
            style={{ background: "rgba(13,31,53,0.97)", borderTop: "1px solid rgba(212,160,23,0.3)" }}
          >
            <button className="btn-trailer w-full" style={{ padding: "12px", fontSize: "0.95rem" }}>Login</button>
            <button className="btn-adventure w-full" style={{ padding: "12px", fontSize: "0.95rem" }}>Sign Up</button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-8 md:pt-24 md:pb-12">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full"
          style={{
            background: "rgba(124,58,237,0.25)",
            border: "1px solid rgba(167,139,250,0.5)",
            backdropFilter: "blur(8px)",
            color: "#c4b5fd",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span className="glow-pulse">✨</span>
          New Adventure Awaits
          <span className="glow-pulse" style={{ animationDelay: "0.5s" }}>✨</span>
        </div>

        {/* Main title */}
        <h1
          className="mb-4"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 7vw, 5.5rem)",
            lineHeight: 1.1,
            color: "#fff",
            textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 40px rgba(212,160,23,0.4), 0 0 80px rgba(212,160,23,0.2)",
            maxWidth: "900px",
            letterSpacing: "-0.01em",
          }}
        >
          Python Quest:{" "}
          <span
            style={{
              color: "#d4a017",
              textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 30px rgba(212,160,23,0.8), 0 0 60px rgba(212,160,23,0.4)",
            }}
          >
            Island of Code
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mb-6"
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            color: "#e0f2fe",
            textShadow: "0 1px 8px rgba(0,0,0,0.8)",
            maxWidth: "680px",
            lineHeight: 1.4,
          }}
        >
          Learn Python as magical spells to save a lost island
        </p>

        {/* Story blurb — scroll panel */}
        <div
          className="scroll-panel mb-10 px-6 py-5 md:px-10 md:py-6"
          style={{ maxWidth: "640px", width: "100%" }}
        >
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
              color: "#5c3d1e",
              lineHeight: 1.7,
              textAlign: "center",
            }}
          >
            Long ago, the people of{" "}
            <strong style={{ color: "#7c3aed" }}>Codehaven Island</strong> used
            Python as magic. An evil monster stole their coding power and hid it
            across the island. A{" "}
            <strong style={{ color: "#16803c" }}>brave traveler</strong> is called
            to restore the magic.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <button className="btn-adventure" style={{ fontSize: "1.1rem", padding: "18px 52px" }} onClick={() => setPage("login")}>
            Start Adventure
          </button>
          <button className="btn-trailer" style={{ fontSize: "1rem", padding: "16px 40px" }} onClick={() => setStoryOpen(true)}>
            ▶ Watch Trailer
          </button>
        </div>

        {/* Scroll nudge */}
        <div
          className="mt-12 flex flex-col items-center gap-1 opacity-60"
          style={{ color: "#e0f2fe", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          <span>Scroll to explore</span>
          <span style={{ fontSize: "1.2rem", animation: "float-up 2s ease-in-out infinite" }}>↓</span>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="relative z-10 px-6 pb-16 md:pb-24">
        {/* Section header */}
        <div className="text-center mb-10">
          <p
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontWeight: 700,
              fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
              color: "#d4a017",
              textShadow: "0 0 8px rgba(212,160,23,0.6)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            ✦ What awaits you ✦
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div
                  className="rounded-2xl p-3"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(74,222,128,0.15))",
                    border: "1.5px solid rgba(124,58,237,0.25)",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.15)",
                  }}
                >
                  {f.icon}
                </div>
              </div>

              {/* Title */}
              <h3
                className="mb-3"
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
                  color: "#3d2a0a",
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </h3>

              {/* Divider */}
              <div
                className="mx-auto mb-3"
                style={{
                  width: "48px",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #d4a017, transparent)",
                  borderRadius: "999px",
                }}
              />

              {/* Desc */}
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(0.82rem, 1.5vw, 0.93rem)",
                  color: "#5c3d1e",
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-14 text-center scroll-panel mx-auto py-8 px-8"
          style={{ maxWidth: "700px" }}
        >
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "#3d2a0a",
              marginBottom: "20px",
            }}
          >
            🗺️ Your quest begins with a single line of code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-adventure" style={{ fontSize: "1rem", padding: "15px 40px" }} onClick={() => setPage("login")}>
              Create Free Account
            </button>
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "#7c5c2a",
              }}
            >
              No experience needed • Free to start
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 text-center py-6 px-6"
        style={{
          background: "rgba(13,31,53,0.9)",
          borderTop: "1px solid rgba(212,160,23,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 600,
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          © 2026 Python Quest: Island of Code · Built for brave learners everywhere 🐍✨
        </p>
      </footer>
    </div>
  );
}
