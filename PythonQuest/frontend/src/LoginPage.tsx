import { useState } from "react";

interface Props {
  onBack: () => void;
  onEnter: (username?: string) => void;
}

type Tab = "login" | "signup";

interface FieldState {
  value: string;
  error: string;
  success: boolean;
}

function field(value = ""): FieldState {
  return { value, error: "", success: false };
}

export default function LoginPage({ onBack, onEnter }: Props) {
  const [tab, setTab] = useState<Tab>("login");

  // Login fields
  const [loginEmail, setLoginEmail] = useState(field());
  const [loginPass, setLoginPass] = useState(field());
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Sign-up fields
  const [signUsername, setSignUsername] = useState(field());
  const [signEmail, setSignEmail] = useState(field());
  const [signPass, setSignPass] = useState(field());
  const [signConfirm, setSignConfirm] = useState(field());
  const [signupSubmitted, setSignupSubmitted] = useState(false);
  const [showSignPass, setShowSignPass] = useState(false);
  const [showSignConfirm, setShowSignConfirm] = useState(false);

  // ── Validation helpers ──
  function validateEmail(v: string): string {
    if (!v) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
    return "";
  }
  function validatePassword(v: string): string {
    if (!v) return "Password is required";
    if (v.length < 6) return "Password must be at least 6 characters";
    return "";
  }

  // ── Login submit ──
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const eErr = validateEmail(loginEmail.value);
    const pErr = validatePassword(loginPass.value);
    setLoginEmail((f) => ({ ...f, error: eErr, success: !eErr }));
    setLoginPass((f) => ({ ...f, error: pErr, success: !pErr }));
    if (!eErr && !pErr) { setLoginSubmitted(true); setTimeout(() => onEnter(), 900); }
  }

  // ── Sign-up submit ──
  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const uErr = signUsername.value.trim().length < 2 ? "Username must be at least 2 characters" : "";
    const eErr = validateEmail(signEmail.value);
    const pErr = validatePassword(signPass.value);
    const cErr = signConfirm.value !== signPass.value ? "Passwords do not match" : validatePassword(signConfirm.value);
    setSignUsername((f) => ({ ...f, error: uErr, success: !uErr }));
    setSignEmail((f) => ({ ...f, error: eErr, success: !eErr }));
    setSignPass((f) => ({ ...f, error: pErr, success: !pErr }));
    setSignConfirm((f) => ({ ...f, error: cErr, success: !cErr }));
    if (!uErr && !eErr && !pErr && !cErr) { setSignupSubmitted(true); setTimeout(() => onEnter(signUsername.value.trim()), 900); }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* ── Left panel — illustration ── */}
      <div
        className="hidden md:flex flex-col justify-between relative overflow-hidden"
        style={{
          width: "42%",
          background: "linear-gradient(160deg, #0d2d52 0%, #1a4a7a 30%, #1e7ab8 65%, #2a9fd6 85%, #c8a86b 100%)",
          flexShrink: 0,
        }}
      >
        {/* Sky sparkles */}
        {[[10,8],[25,18],[60,12],[75,6],[88,20],[50,30],[15,38],[80,35]].map(([l,t],i)=>(
          <div key={i} className="absolute glow-pulse" style={{ left:`${l}%`, top:`${t}%`, color: i%2===0?"#fbbf24":"#a78bfa", fontSize:`${10+i%3*4}px`, opacity:0.5+0.3*(i%2), animationDelay:`${i*0.4}s` }}>✦</div>
        ))}

        {/* Mountain */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 500 400" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="lgmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d5a2d"/>
              <stop offset="100%" stopColor="#1a3a1a"/>
            </linearGradient>
            <linearGradient id="lgocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e6b8c"/>
              <stop offset="100%" stopColor="#0e4470"/>
            </linearGradient>
            <linearGradient id="lgsand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c8a86b"/>
              <stop offset="100%" stopColor="#d4b67a"/>
            </linearGradient>
          </defs>
          {/* Mountain */}
          <polygon points="180,180 310,60 440,180" fill="#2a4a2a" opacity="0.8"/>
          <polygon points="310,60 330,95 290,95" fill="white" opacity="0.35"/>
          <polygon points="100,220 220,110 340,220" fill="url(#lgmt)" opacity="0.7"/>
          {/* Ocean */}
          <rect x="0" y="270" width="500" height="130" fill="url(#lgocean)"/>
          <path d="M0,274 Q62,262 125,274 Q187,286 250,274 Q312,262 375,274 Q437,286 500,274" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
          {/* Sand */}
          <ellipse cx="250" cy="380" rx="300" ry="60" fill="url(#lgsand)"/>
          {/* Palm trees */}
          <path d="M60,400 Q56,350 64,290 Q67,265 62,235" stroke="#5c3d1e" strokeWidth="9" fill="none" strokeLinecap="round"/>
          <ellipse cx="50" cy="238" rx="38" ry="12" fill="#2d6a2d" transform="rotate(-22 50 238)"/>
          <ellipse cx="74" cy="226" rx="36" ry="11" fill="#3d8a3d" transform="rotate(18 74 226)"/>
          <ellipse cx="42" cy="218" rx="32" ry="10" fill="#2d6a2d" transform="rotate(-48 42 218)"/>
          <path d="M420,400 Q416,355 424,298 Q427,272 422,242" stroke="#5c3d1e" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <ellipse cx="410" cy="246" rx="34" ry="11" fill="#2d6a2d" transform="rotate(-18 410 246)"/>
          <ellipse cx="432" cy="236" rx="32" ry="10" fill="#3d8a3d" transform="rotate(22 432 236)"/>
        </svg>

        {/* Fairy Code-E */}
        <div className="absolute" style={{ bottom: "30%", left: "50%", transform: "translateX(-50%)" }}>
          <svg viewBox="0 0 130 160" width="130" height="160">
            {/* Glow aura */}
            <ellipse cx="65" cy="90" rx="52" ry="52" fill="rgba(74,222,128,0.12)"/>
            {/* Wings */}
            <ellipse cx="38" cy="88" rx="28" ry="16" fill="rgba(224,242,254,0.55)" stroke="#7dd3fc" strokeWidth="1.5" transform="rotate(-20 38 88)"/>
            <ellipse cx="92" cy="88" rx="28" ry="16" fill="rgba(224,242,254,0.55)" stroke="#7dd3fc" strokeWidth="1.5" transform="rotate(20 92 88)"/>
            {/* Body */}
            <circle cx="65" cy="85" r="28" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5"/>
            <circle cx="65" cy="78" r="18" fill="#bae6fd"/>
            {/* Face */}
            <circle cx="58" cy="75" r="4.5" fill="#0284c7"/>
            <circle cx="72" cy="75" r="4.5" fill="#0284c7"/>
            <circle cx="59.5" cy="73.5" r="1.8" fill="white"/>
            <circle cx="73.5" cy="73.5" r="1.8" fill="white"/>
            <path d="M57 83 Q65 89 73 83" stroke="#0284c7" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Cheeks */}
            <circle cx="52" cy="82" r="5" fill="#fca5a5" opacity="0.4"/>
            <circle cx="78" cy="82" r="5" fill="#fca5a5" opacity="0.4"/>
            {/* Antenna */}
            <line x1="65" y1="57" x2="65" y2="40" stroke="#fbbf24" strokeWidth="2.5"/>
            <circle cx="65" cy="37" r="6" fill="#fbbf24"/>
            <circle cx="65" cy="37" r="10" fill="#fbbf24" opacity="0.25"/>
            {/* Wand */}
            <line x1="80" y1="100" x2="102" y2="120" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="104" cy="122" r="6" fill="#fbbf24"/>
            <circle cx="104" cy="122" r="10" fill="#fbbf24" opacity="0.3"/>
            {/* Wand sparkles */}
            <circle cx="96" cy="114" r="2.5" fill="#4ade80" opacity="0.9"/>
            <circle cx="110" cy="118" r="2" fill="#a78bfa" opacity="0.8"/>
            <circle cx="108" cy="130" r="2" fill="#38bdf8" opacity="0.8"/>
          </svg>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-0 left-0 right-0 text-center pb-10 px-8">
          <div
            className="inline-block px-6 py-4 rounded-2xl"
            style={{
              background: "rgba(13,31,53,0.75)",
              border: "1.5px solid rgba(212,160,23,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#fdf3dc",
              lineHeight: 1.5,
              textShadow: "0 0 12px rgba(212,160,23,0.4)",
            }}>
              Your journey to restore the<br/>
              <span style={{ color: "#d4a017" }}>Python Crystal</span> begins here.
            </p>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-5 left-5 flex items-center gap-2"
          style={{
            background: "rgba(13,31,53,0.7)",
            border: "1.5px solid rgba(212,160,23,0.3)",
            borderRadius: "999px",
            padding: "8px 16px",
            color: "#fdf3dc",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.82rem",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            transition: "background 0.15s",
          }}
        >
          ← Back to Island
        </button>

        {/* Crystal shard decoration */}
        <div className="absolute top-8 right-8 glow-pulse">
          <svg viewBox="0 0 40 60" width="32" height="48">
            <polygon points="20,4 30,22 26,50 14,50 10,22" fill="#7dd3fc" opacity="0.8"/>
            <polygon points="20,4 30,22 20,28" fill="#bae6fd"/>
            <line x1="20" y1="4" x2="14" y2="35" stroke="#0284c7" strokeWidth="0.8" opacity="0.6"/>
          </svg>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div
        className="flex-1 flex flex-col overflow-y-auto"
        style={{ background: "linear-gradient(160deg, #fdf7e8 0%, #f5e6c8 100%)" }}
      >
        {/* Mobile back button */}
        <div className="md:hidden px-6 pt-5">
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              border: "none",
              color: "#7c5c2a",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8 md:py-12">
          <div className="w-full" style={{ maxWidth: "460px" }}>

            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: "linear-gradient(135deg, #7c3aed, #4ade80)", boxShadow: "0 0 14px rgba(124,58,237,0.5)" }}>
                <span style={{ fontSize: "20px" }}>🐍</span>
              </div>
              <span style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "1rem", color: "#3d2a0a", letterSpacing: "0.03em" }}>
                Python Quest
              </span>
              <span style={{ fontSize: "18px" }} className="glow-pulse">✨</span>
            </div>

            {/* Tabs */}
            <div
              className="flex mb-8 rounded-2xl overflow-hidden"
              style={{ border: "2px solid #c8a86b", background: "rgba(200,168,107,0.15)" }}
            >
              {(["login", "signup"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5"
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: tab === t
                      ? "linear-gradient(135deg, #1a5c2a 0%, #2d8a3e 100%)"
                      : "transparent",
                    color: tab === t ? "#fff" : "#7c5c2a",
                    boxShadow: tab === t ? "0 0 16px rgba(74,222,128,0.4)" : "none",
                  }}
                >
                  {t === "login" ? (
                    <><span>🗝️</span> Login</>
                  ) : (
                    <><span>⚔️</span> Sign Up</>
                  )}
                  {tab === t && (
                    <svg viewBox="0 0 40 8" width="24" height="6" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)" }}>
                      <ellipse cx="20" cy="4" rx="18" ry="3" fill="#4ade80" opacity="0.5"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* ── Login Form ── */}
            {tab === "login" && (
              <form onSubmit={handleLogin} noValidate>
                {loginSubmitted ? (
                  <SuccessBanner
                    message="✅ Welcome back, brave traveler! Preparing your quest…"
                    onDismiss={() => setLoginSubmitted(false)}
                  />
                ) : (
                  <>
                    <FormField
                      label="Email"
                      icon="✉️"
                      type="email"
                      placeholder="yourname@codehaven.io"
                      state={loginEmail}
                      onChange={(v) => setLoginEmail({ value: v, error: "", success: false })}
                      onBlur={() => setLoginEmail((f) => ({ ...f, error: validateEmail(f.value), success: !validateEmail(f.value) && f.value.length > 0 }))}
                    />
                    <FormField
                      label="Password"
                      icon="🔒"
                      type={showLoginPass ? "text" : "password"}
                      placeholder="••••••••"
                      state={loginPass}
                      onChange={(v) => setLoginPass({ value: v, error: "", success: false })}
                      onBlur={() => setLoginPass((f) => ({ ...f, error: validatePassword(f.value), success: !validatePassword(f.value) && f.value.length > 0 }))}
                      rightEl={
                        <button type="button" onClick={() => setShowLoginPass((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9c7c4a", fontSize: "1rem" }}>
                          {showLoginPass ? "🙈" : "👁️"}
                        </button>
                      }
                    />
                    <div className="text-right mb-6" style={{ marginTop: "-12px" }}>
                      <button type="button" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#7c3aed", textDecoration: "underline" }}>
                        Forgot password?
                      </button>
                    </div>
                    <GlowButton type="submit">🗝️ Login</GlowButton>
                  </>
                )}
              </form>
            )}

            {/* ── Sign-up Form ── */}
            {tab === "signup" && (
              <form onSubmit={handleSignup} noValidate>
                {signupSubmitted ? (
                  <SuccessBanner
                    message="🌟 Account created! Your adventure on Codehaven awaits!"
                    onDismiss={() => setSignupSubmitted(false)}
                  />
                ) : (
                  <>
                    <FormField
                      label="Username"
                      icon="👤"
                      type="text"
                      placeholder="BraveTraveler42"
                      state={signUsername}
                      onChange={(v) => setSignUsername({ value: v, error: "", success: false })}
                      onBlur={() => {
                        const err = signUsername.value.trim().length < 2 ? "Username must be at least 2 characters" : "";
                        setSignUsername((f) => ({ ...f, error: err, success: !err && f.value.length > 0 }));
                      }}
                    />
                    <FormField
                      label="Email"
                      icon="✉️"
                      type="email"
                      placeholder="yourname@codehaven.io"
                      state={signEmail}
                      onChange={(v) => setSignEmail({ value: v, error: "", success: false })}
                      onBlur={() => setSignEmail((f) => ({ ...f, error: validateEmail(f.value), success: !validateEmail(f.value) && f.value.length > 0 }))}
                    />
                    <FormField
                      label="Password"
                      icon="🔒"
                      type={showSignPass ? "text" : "password"}
                      placeholder="••••••••"
                      state={signPass}
                      onChange={(v) => setSignPass({ value: v, error: "", success: false })}
                      onBlur={() => setSignPass((f) => ({ ...f, error: validatePassword(f.value), success: !validatePassword(f.value) && f.value.length > 0 }))}
                      rightEl={
                        <button type="button" onClick={() => setShowSignPass((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9c7c4a", fontSize: "1rem" }}>
                          {showSignPass ? "🙈" : "👁️"}
                        </button>
                      }
                    />
                    <FormField
                      label="Confirm Password"
                      icon="🔒"
                      type={showSignConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      state={signConfirm}
                      onChange={(v) => setSignConfirm({ value: v, error: "", success: false })}
                      onBlur={() => {
                        const err = signConfirm.value !== signPass.value ? "Passwords do not match" : validatePassword(signConfirm.value);
                        setSignConfirm((f) => ({ ...f, error: err, success: !err && f.value.length > 0 }));
                      }}
                      rightEl={
                        <button type="button" onClick={() => setShowSignConfirm((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9c7c4a", fontSize: "1rem" }}>
                          {showSignConfirm ? "🙈" : "👁️"}
                        </button>
                      }
                    />
                    <GlowButton type="submit">⚔️ Create Account</GlowButton>
                  </>
                )}
              </form>
            )}

            {/* Legal */}
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#9c7c4a", textAlign: "center", marginTop: "12px", lineHeight: 1.6 }}>
              By continuing, you agree to our{" "}
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#7c3aed", fontWeight: 700, textDecoration: "underline", fontSize: "inherit", fontFamily: "inherit" }}>terms</button>
              {" "}and{" "}
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#7c3aed", fontWeight: 700, textDecoration: "underline", fontSize: "inherit", fontFamily: "inherit" }}>privacy policy</button>.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #c8a86b)" }}/>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#9c7c4a" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #c8a86b, transparent)" }}/>
            </div>

            {/* Guest button */}
            <button
              onClick={() => onEnter("GuestTraveler")}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "999px",
                border: "2px solid rgba(92,61,30,0.3)",
                background: "rgba(92,61,30,0.06)",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: "0.92rem",
                color: "#5c3d1e",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(92,61,30,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(92,61,30,0.06)")}
            >
              🧭 Continue as Guest <span style={{ fontWeight: 600, fontSize: "0.78rem", opacity: 0.7 }}>(Explore freely)</span>
            </button>

            {/* Switch tab hint */}
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#9c7c4a", textAlign: "center", marginTop: "20px" }}>
              {tab === "login" ? (
                <>New to Codehaven?{" "}
                  <button onClick={() => setTab("signup")} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c3aed", fontWeight: 800, fontSize: "inherit", fontFamily: "inherit" }}>Create an account →</button>
                </>
              ) : (
                <>Already a traveler?{" "}
                  <button onClick={() => setTab("login")} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c3aed", fontWeight: 800, fontSize: "inherit", fontFamily: "inherit" }}>Login →</button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared sub-components ──

interface FormFieldProps {
  label: string;
  icon: string;
  type: string;
  placeholder: string;
  state: FieldState;
  onChange: (v: string) => void;
  onBlur: () => void;
  rightEl?: React.ReactNode;
}

function FormField({ label, icon, type, placeholder, state, onChange, onBlur, rightEl }: FormFieldProps) {
  const hasError = !!state.error;
  const isSuccess = state.success;

  return (
    <div className="mb-4">
      <label style={{ display: "block", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#5c3d1e", marginBottom: "6px" }}>
        {label}
      </label>
      <div
        className="flex items-center gap-2 px-3"
        style={{
          borderRadius: "12px",
          border: `2px solid ${hasError ? "#ef4444" : isSuccess ? "#22c55e" : "#c8a86b"}`,
          background: hasError ? "rgba(239,68,68,0.05)" : isSuccess ? "rgba(34,197,94,0.05)" : "rgba(255,255,255,0.7)",
          boxShadow: hasError
            ? "0 0 0 3px rgba(239,68,68,0.15)"
            : isSuccess
            ? "0 0 0 3px rgba(34,197,94,0.15)"
            : "none",
          transition: "all 0.18s ease",
        }}
      >
        <span style={{ fontSize: "1rem", flexShrink: 0 }}>{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={state.value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          style={{
            flex: 1,
            padding: "12px 4px",
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 600,
            fontSize: "0.92rem",
            color: "#3d2a0a",
          }}
        />
        {rightEl}
        {isSuccess && <span style={{ color: "#22c55e", fontSize: "1rem", flexShrink: 0 }}>✓</span>}
        {hasError && <span style={{ color: "#ef4444", fontSize: "1rem", flexShrink: 0 }}>✗</span>}
      </div>
      {hasError && (
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "0.75rem", color: "#ef4444", marginTop: "4px", paddingLeft: "4px" }}>
          ⚠ {state.error}
        </p>
      )}
    </div>
  );
}

function GlowButton({ children, type }: { children: React.ReactNode; type?: "submit" | "button" }) {
  return (
    <button
      type={type}
      className="btn-adventure"
      style={{
        width: "100%",
        marginTop: "8px",
        marginBottom: "4px",
        padding: "15px",
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      {children}
    </button>
  );
}

function SuccessBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div
      className="rounded-2xl p-6 text-center mb-4"
      style={{
        background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(74,222,128,0.1))",
        border: "2px solid rgba(34,197,94,0.4)",
        boxShadow: "0 0 20px rgba(74,222,128,0.2)",
      }}
    >
      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#14532d", lineHeight: 1.6 }}>
        {message}
      </p>
      <button
        onClick={onDismiss}
        style={{
          marginTop: "12px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          fontSize: "0.8rem",
          color: "#166534",
          textDecoration: "underline",
        }}
      >
        Try again
      </button>
    </div>
  );
}
