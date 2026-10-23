import { useState, useEffect } from "react";

const PANELS = [
  {
    step: 1,
    tag: "Once upon a time…",
    title: "A Paradise of Python Magic",
    text: "Long ago, the people of Codehaven Island lived in harmony. They wielded Python as magic — planting crops with loops, building homes with functions, and lighting lanterns with a single line of code. Life was peaceful, and the great Python Crystal shone at the heart of the island.",
    scene: (
      <svg viewBox="0 0 340 220" width="100%" height="100%" style={{ display: "block" }}>
        {/* Sky */}
        <defs>
          <linearGradient id="s1sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87ceeb"/>
            <stop offset="100%" stopColor="#c8e8f0"/>
          </linearGradient>
          <linearGradient id="s1ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6db56d"/>
            <stop offset="100%" stopColor="#4a8a4a"/>
          </linearGradient>
          <radialGradient id="s1glow" cx="50%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#ffe066" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <rect width="340" height="220" fill="url(#s1sky)"/>
        <ellipse cx="170" cy="50" rx="130" ry="40" fill="url(#s1glow)"/>
        {/* Sun */}
        <circle cx="280" cy="40" r="22" fill="#ffd700" opacity="0.9"/>
        <circle cx="280" cy="40" r="16" fill="#ffe066"/>
        {/* Mountain */}
        <polygon points="120,160 200,60 280,160" fill="#8aab8a" opacity="0.7"/>
        <polygon points="200,60 220,90 180,90" fill="white" opacity="0.5"/>
        {/* Ground */}
        <rect x="0" y="155" width="340" height="65" fill="url(#s1ground)"/>
        {/* House */}
        <rect x="60" y="115" width="60" height="45" fill="#e8c98a" stroke="#c8a86b" strokeWidth="1.5"/>
        <polygon points="55,115 90,88 125,115" fill="#c0392b" opacity="0.85"/>
        <rect x="78" y="132" width="14" height="28" fill="#8B6340"/>
        <rect x="66" y="122" width="12" height="12" rx="1" fill="#aee4f0"/>
        <rect x="104" y="122" width="12" height="12" rx="1" fill="#aee4f0"/>
        {/* Villager 1 */}
        <circle cx="185" cy="120" r="11" fill="#f5cba7"/>
        <rect x="179" y="131" width="12" height="22" rx="3" fill="#3498db"/>
        <rect x="176" y="133" width="7" height="16" rx="2" fill="#3498db"/>
        <rect x="191" y="133" width="7" height="16" rx="2" fill="#3498db"/>
        {/* Code spell floating */}
        <rect x="197" y="108" width="72" height="28" rx="5" fill="rgba(30,30,60,0.85)" stroke="#7c3aed" strokeWidth="1"/>
        <text x="204" y="119" fontSize="7" fill="#c084fc" fontFamily="monospace">for crop in field:</text>
        <text x="204" y="130" fontSize="7" fill="#4ade80" fontFamily="monospace">  plant(crop)</text>
        <line x1="197" y1="118" x2="193" y2="120" stroke="#7c3aed" strokeWidth="1"/>
        {/* Villager 2 */}
        <circle cx="240" cy="125" r="10" fill="#d4a574"/>
        <rect x="235" y="135" width="10" height="20" rx="3" fill="#e67e22"/>
        {/* Crops */}
        {[145,155,165,175].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="155" x2={x} y2="145" stroke="#2d8a2d" strokeWidth="1.5"/>
            <ellipse cx={x} cy="143" rx="4" ry="5" fill="#4ade80" opacity="0.9"/>
          </g>
        ))}
        {/* Crystal at center top */}
        <polygon points="170,18 178,35 162,35" fill="#38bdf8" opacity="0.9"/>
        <polygon points="170,18 178,35 170,30" fill="#7dd3fc"/>
        <circle cx="170" cy="28" r="3" fill="white" opacity="0.8"/>
        <circle cx="170" cy="28" r="6" fill="#38bdf8" opacity="0.2"/>
        {/* Sparkles */}
        <text x="142" y="32" fontSize="10" fill="#fbbf24" opacity="0.8">✦</text>
        <text x="190" y="25" fontSize="8" fill="#4ade80" opacity="0.7">✦</text>
        <text x="310" y="80" fontSize="10" fill="#fbbf24" opacity="0.6">✦</text>
      </svg>
    ),
  },
  {
    step: 2,
    tag: "Darkness descends…",
    title: "The Pirate Lord Strikes",
    text: "But shadows grew. The fearsome Pirate Lord, hungry for power, shattered the sacred Python Crystal and scattered its fragments across the island. Without the Crystal, the Python magic faded — crops wilted, lights went out, and the people of Codehaven fell into despair.",
    scene: (
      <svg viewBox="0 0 340 220" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <radialGradient id="s2dark" cx="55%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#3d1a0a"/>
            <stop offset="100%" stopColor="#0d0a1e"/>
          </radialGradient>
          <radialGradient id="s2crack" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.8"/>
            <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <rect width="340" height="220" fill="url(#s2dark)"/>
        {/* Storm clouds */}
        <ellipse cx="80" cy="35" rx="60" ry="25" fill="#2d2d4a" opacity="0.9"/>
        <ellipse cx="140" cy="28" rx="50" ry="22" fill="#3d3d5c" opacity="0.9"/>
        <ellipse cx="230" cy="32" rx="70" ry="28" fill="#2d2d4a" opacity="0.9"/>
        {/* Lightning */}
        <polyline points="170,28 162,55 172,55 160,82" stroke="#fbbf24" strokeWidth="2.5" fill="none" opacity="0.9"/>
        {/* Cracked crystal */}
        <ellipse cx="170" cy="110" rx="70" ry="65" fill="url(#s2crack)"/>
        <polygon points="170,60 185,90 155,90" fill="#7dd3fc" opacity="0.5"/>
        <line x1="170" y1="60" x2="155" y2="95" stroke="#0284c7" strokeWidth="1.5" opacity="0.7"/>
        <line x1="170" y1="60" x2="185" y2="100" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7"/>
        {/* Crystal fragments flying */}
        {[[60,70],[90,50],[240,65],[270,80],[220,45],[120,100]].map(([x,y],i)=>(
          <polygon key={i} points={`${x},${y-8} ${x+6},${y+4} ${x-6},${y+4}`} fill="#7dd3fc" opacity="0.7" transform={`rotate(${i*40} ${x} ${y})`}/>
        ))}
        {/* Pirate lord silhouette */}
        <ellipse cx="230" cy="148" rx="22" ry="28" fill="#1a0a0a"/>
        <circle cx="230" cy="118" r="16" fill="#2d1010"/>
        {/* Skull hat */}
        <rect x="218" y="104" width="24" height="10" rx="2" fill="#3d2020"/>
        <ellipse cx="230" cy="104" rx="18" ry="6" fill="#4d2020"/>
        <circle cx="230" cy="104" r="5" fill="#e8e8e0"/>
        <circle cx="227" cy="102" r="2" fill="#1a1a1a"/>
        <circle cx="233" cy="102" r="2" fill="#1a1a1a"/>
        <path d="M226 108 Q230 111 234 108" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        {/* Cloak */}
        <path d="M210,148 Q215,135 222,130 L230,132 L238,130 Q245,135 250,148 Q245,175 230,178 Q215,175 210,148 Z" fill="#2d0a0a"/>
        {/* Crystal held */}
        <polygon points="230,138 237,152 223,152" fill="#38bdf8" opacity="0.6"/>
        <line x1="225" y1="144" x2="230" y2="138" stroke="#e11d48" strokeWidth="1" opacity="0.8"/>
        <line x1="235" y1="144" x2="230" y2="148" stroke="#e11d48" strokeWidth="1" opacity="0.8"/>
        {/* Red glow eyes */}
        <circle cx="226" cy="116" r="2.5" fill="#ef4444"/>
        <circle cx="234" cy="116" r="2.5" fill="#ef4444"/>
        {/* Debris / broken buildings */}
        <rect x="30" y="155" width="35" height="30" rx="2" fill="#4a3020" opacity="0.6"/>
        <polygon points="26,155 47,138 69,155" fill="#6b3020" opacity="0.6"/>
        <line x1="50" y1="150" x2="65" y2="165" stroke="#8b4020" strokeWidth="3" opacity="0.7"/>
        {/* Crying villager silhouette */}
        <circle cx="80" cy="162" r="9" fill="#3d2010" opacity="0.7"/>
        <rect x="75" y="171" width="10" height="20" rx="2" fill="#3d2010" opacity="0.6"/>
        <path d="M75,175 Q68,182 70,190" stroke="#3d2010" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7"/>
        <path d="M85,175 Q88,182 86,190" stroke="#3d2010" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7"/>
      </svg>
    ),
  },
  {
    step: 3,
    tag: "A last hope…",
    title: "The Magical Distress Signal",
    text: "With their magic nearly gone, the village elder and his AI companion sent one final spell — a distress signal encoded in Python, cast into the digital winds. Somewhere out there, a brave traveler would receive the message and answer the call.",
    scene: (
      <svg viewBox="0 0 340 220" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <radialGradient id="s3glow" cx="45%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <radialGradient id="s3screen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0d2d52"/>
            <stop offset="100%" stopColor="#050f1e"/>
          </radialGradient>
        </defs>
        <rect width="340" height="220" fill="#0d1a30"/>
        {/* Stars */}
        {[[30,20],[80,15],[140,10],[200,18],[260,8],[300,25],[320,15],[50,45],[110,38],[180,42],[310,50]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i%3===0?1.5:1} fill="white" opacity={0.4+0.4*(i%3)/2}/>
        ))}
        {/* Magic glow */}
        <ellipse cx="155" cy="120" rx="120" ry="90" fill="url(#s3glow)"/>
        {/* Old computer / terminal */}
        <rect x="88" y="108" width="130" height="90" rx="8" fill="#1a2a3a" stroke="#7c3aed" strokeWidth="2"/>
        <rect x="96" y="116" width="114" height="68" rx="4" fill="url(#s3screen)"/>
        <rect x="135" y="198" width="36" height="10" rx="3" fill="#1a2a3a"/>
        <rect x="120" y="205" width="66" height="6" rx="3" fill="#2a3a4a"/>
        {/* Screen content */}
        <text x="105" y="132" fontSize="7" fill="#a78bfa" fontFamily="monospace">def send_signal():</text>
        <text x="105" y="143" fontSize="7" fill="#4ade80" fontFamily="monospace">  msg = "Help us!"</text>
        <text x="105" y="154" fontSize="7" fill="#4ade80" fontFamily="monospace">  cast(msg, world)</text>
        <text x="105" y="165" fontSize="7" fill="#fbbf24" fontFamily="monospace">send_signal()  ✓</text>
        {/* Cursor blink */}
        <rect x="105" y="170" width="6" height="9" fill="#a78bfa" opacity="0.9"/>
        {/* Elder wizard */}
        <circle cx="58" cy="130" r="14" fill="#d4b896"/>
        <ellipse cx="58" cy="145" rx="16" ry="22" fill="#4a2d8a"/>
        {/* Beard */}
        <ellipse cx="58" cy="142" rx="10" ry="14" fill="#e8e0d0" opacity="0.9"/>
        {/* Hat */}
        <polygon points="58,104 44,130 72,130" fill="#2d1a5c"/>
        <rect x="40" y="128" width="36" height="5" rx="2" fill="#3d2a6c"/>
        {/* Star on hat */}
        <text x="52" y="122" fontSize="10" fill="#fbbf24">★</text>
        {/* Arms reaching */}
        <path d="M44,150 Q32,145 28,160" stroke="#4a2d8a" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <path d="M72,150 Q82,142 90,148" stroke="#4a2d8a" strokeWidth="5" strokeLinecap="round" fill="none"/>
        {/* Magic orb */}
        <circle cx="28" cy="162" r="8" fill="#7c3aed" opacity="0.9"/>
        <circle cx="28" cy="162" r="5" fill="#a78bfa"/>
        <circle cx="26" cy="160" r="2" fill="white" opacity="0.7"/>
        {/* Signal waves radiating */}
        {[1,2,3].map(r=>(
          <circle key={r} cx="170" cy="30" r={r*22} fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity={0.6-r*0.15}/>
        ))}
        <circle cx="170" cy="30" r="8" fill="#a78bfa" opacity="0.9"/>
        <circle cx="170" cy="30" r="4" fill="white"/>
        {/* Signal line */}
        <line x1="155" y1="116" x2="170" y2="38" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7"/>
        {/* AI fairy companion */}
        <circle cx="260" cy="145" r="14" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5"/>
        <circle cx="260" cy="142" r="9" fill="#bae6fd"/>
        <circle cx="257" cy="140" r="2.5" fill="#0284c7"/>
        <circle cx="263" cy="140" r="2.5" fill="#0284c7"/>
        <path d="M256 147 Q260 151 264 147" stroke="#0284c7" strokeWidth="1.5" fill="none"/>
        {/* Wings */}
        <ellipse cx="248" cy="146" rx="12" ry="7" fill="#e0f2fe" opacity="0.6" transform="rotate(-20 248 146)"/>
        <ellipse cx="272" cy="146" rx="12" ry="7" fill="#e0f2fe" opacity="0.6" transform="rotate(20 272 146)"/>
        {/* Speech bubble */}
        <rect x="218" y="118" width="80" height="22" rx="6" fill="rgba(253,243,220,0.95)" stroke="#c8a86b" strokeWidth="1"/>
        <polygon points="252,140 260,148 268,140" fill="rgba(253,243,220,0.95)"/>
        <text x="225" y="127" fontSize="6.5" fill="#5c3d1e" fontFamily="sans-serif" fontWeight="bold">Brave traveler,</text>
        <text x="225" y="136" fontSize="6.5" fill="#5c3d1e" fontFamily="sans-serif">our island needs you!</text>
      </svg>
    ),
  },
  {
    step: 4,
    tag: "…and you answered.",
    title: "You Arrive on Codehaven Beach",
    text: 'The signal found you. You wake on the warm sands of Codehaven Island, and a small glowing fairy hovers before you. "I am Code-E, your AI guide," she says with a spark. "Together, we will learn Python spells and restore the Crystal. Your adventure begins now."',
    scene: (
      <svg viewBox="0 0 340 220" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <linearGradient id="s4sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff9a5c"/>
            <stop offset="40%" stopColor="#ffb870"/>
            <stop offset="100%" stopColor="#ffd4a0"/>
          </linearGradient>
          <linearGradient id="s4ocean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e7ab8"/>
            <stop offset="100%" stopColor="#155f96"/>
          </linearGradient>
          <radialGradient id="s4fairy" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        {/* Sunset sky */}
        <rect width="340" height="220" fill="url(#s4sky)"/>
        {/* Sun on horizon */}
        <ellipse cx="180" cy="135" rx="28" ry="18" fill="#ffd700" opacity="0.5"/>
        <circle cx="180" cy="130" r="20" fill="#ff8c00" opacity="0.7"/>
        {/* Mountain */}
        <polygon points="60,145 130,70 200,145" fill="#6b8a6b" opacity="0.7"/>
        <polygon points="130,70 145,92 115,92" fill="white" opacity="0.4"/>
        {/* Ocean */}
        <rect x="0" y="145" width="340" height="45" fill="url(#s4ocean)"/>
        <path d="M0,148 Q42,140 85,148 Q127,156 170,148 Q212,140 255,148 Q298,156 340,148" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
        {/* Sand */}
        <ellipse cx="170" cy="210" rx="200" ry="50" fill="#d4b67a"/>
        <ellipse cx="170" cy="215" rx="200" ry="45" fill="#e8c980"/>
        {/* Palm tree */}
        <path d="M40,220 Q38,190 45,155 Q48,140 44,118" stroke="#5c3d1e" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <ellipse cx="35" cy="122" rx="36" ry="11" fill="#2d6a2d" transform="rotate(-20 35 122)"/>
        <ellipse cx="56" cy="112" rx="34" ry="10" fill="#3d8a3d" transform="rotate(15 56 112)"/>
        <ellipse cx="28" cy="108" rx="30" ry="9" fill="#2d6a2d" transform="rotate(-45 28 108)"/>
        {/* Player character */}
        <circle cx="195" cy="165" r="13" fill="#f5cba7"/>
        <rect x="187" y="178" width="16" height="25" rx="4" fill="#1e40af"/>
        <path d="M187,183 Q178,188 176,200" stroke="#1e40af" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <path d="M203,183 Q210,190 208,202" stroke="#1e40af" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <rect x="187" y="200" width="7" height="15" rx="3" fill="#92400e"/>
        <rect x="199" y="200" width="7" height="15" rx="3" fill="#92400e"/>
        {/* Hair */}
        <ellipse cx="195" cy="158" rx="11" ry="7" fill="#92400e"/>
        {/* Looking at fairy */}
        <circle cx="192" cy="163" r="2" fill="#1f2937"/>
        <circle cx="199" cy="163" r="2" fill="#1f2937"/>
        {/* AI Fairy Code-E */}
        <ellipse cx="248" cy="148" rx="30" ry="30" fill="url(#s4fairy)"/>
        <circle cx="248" cy="148" r="17" fill="#e0f2fe" stroke="#4ade80" strokeWidth="2"/>
        <circle cx="248" cy="144" r="11" fill="#bae6fd"/>
        {/* Face */}
        <circle cx="244" cy="142" r="3" fill="#0284c7"/>
        <circle cx="252" cy="142" r="3" fill="#0284c7"/>
        <circle cx="245" cy="141" r="1.2" fill="white"/>
        <circle cx="253" cy="141" r="1.2" fill="white"/>
        <path d="M243 150 Q248 155 253 150" stroke="#0284c7" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Antenna */}
        <line x1="248" y1="131" x2="248" y2="120" stroke="#fbbf24" strokeWidth="2"/>
        <circle cx="248" cy="118" r="4" fill="#fbbf24"/>
        <circle cx="248" cy="118" r="7" fill="#fbbf24" opacity="0.3"/>
        {/* Wings */}
        <ellipse cx="233" cy="150" rx="16" ry="9" fill="rgba(224,242,254,0.6)" stroke="#7dd3fc" strokeWidth="1" transform="rotate(-15 233 150)"/>
        <ellipse cx="263" cy="150" rx="16" ry="9" fill="rgba(224,242,254,0.6)" stroke="#7dd3fc" strokeWidth="1" transform="rotate(15 263 150)"/>
        {/* Magic wand sparkles */}
        <line x1="255" y1="158" x2="270" y2="170" stroke="#fbbf24" strokeWidth="2"/>
        <circle cx="272" cy="172" r="4" fill="#fbbf24"/>
        {[0,1,2].map(i=>(
          <circle key={i} cx={272+Math.cos(i*2.1)*9} cy={172+Math.sin(i*2.1)*9} r="2" fill="#4ade80" opacity="0.8"/>
        ))}
        {/* Speech bubble */}
        <rect x="264" y="118" width="70" height="26" rx="7" fill="rgba(253,243,220,0.97)" stroke="#c8a86b" strokeWidth="1.5"/>
        <polygon points="272,144 280,148 288,144" fill="rgba(253,243,220,0.97)"/>
        <text x="271" y="129" fontSize="6.5" fill="#5c3d1e" fontFamily="sans-serif" fontWeight="bold">I am Code-E.</text>
        <text x="271" y="139" fontSize="6.5" fill="#7c3aed" fontFamily="sans-serif">Your quest starts now!</text>
        {/* Footprints in sand */}
        {[0,1,2].map(i=>(
          <ellipse key={i} cx={170-i*14} cy={212+i*2} rx="4" ry="2.5" fill="#c8a86b" opacity="0.5" transform={`rotate(${-15+i*5} ${170-i*14} ${212+i*2})`}/>
        ))}
        {/* Crystal shard on beach */}
        <polygon points="155,196 160,208 150,208" fill="#7dd3fc" opacity="0.8"/>
        <line x1="153" y1="202" x2="158" y2="196" stroke="#38bdf8" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),
  },
];

interface Props {
  onClose: () => void;
}

export default function StoryModal({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  const panel = PANELS[step];
  const isLast = step === PANELS.length - 1;

  function goNext() {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => Math.min(s + 1, PANELS.length - 1));
      setAnimating(false);
    }, 240);
  }

  function goPrev() {
    if (animating || step === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => Math.max(s - 1, 0));
      setAnimating(false);
    }, 240);
  }

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && !isLast) goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, isLast, animating]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,25,0.88)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Scroll panel */}
      <div
        className="relative flex flex-col w-full"
        style={{
          maxWidth: "820px",
          maxHeight: "calc(100vh - 40px)",
          background: "linear-gradient(175deg, #fdf7e8 0%, #f5e6c8 55%, #ede0b8 100%)",
          border: "3px solid #c8a86b",
          borderRadius: "20px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
          overflow: "hidden",
        }}
      >
        {/* Top scroll curl */}
        <div style={{
          height: "10px",
          background: "linear-gradient(90deg, #c8a86b, #e8c880, #d4a017, #e8c880, #c8a86b)",
          borderRadius: "18px 18px 0 0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}/>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: "linear-gradient(135deg, #7c3aed, #4ade80)", boxShadow: "0 0 10px rgba(124,58,237,0.5)" }}>
              <span style={{ fontSize: "16px" }}>🐍</span>
            </div>
            <span style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.75rem", color: "#7c5c2a", letterSpacing: "0.04em" }}>
              Python Quest
            </span>
          </div>

          {/* Step tag */}
          <div style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontWeight: 700,
            fontSize: "0.65rem",
            color: "#7c3aed",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "4px 12px",
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: "999px",
          }}>
            {panel.tag}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              width: "32px", height: "32px",
              borderRadius: "50%",
              background: "rgba(92,61,30,0.12)",
              border: "1.5px solid rgba(92,61,30,0.25)",
              color: "#7c5c2a",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            ✕
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", margin: "0 24px", background: "linear-gradient(90deg, transparent, #c8a86b60, transparent)" }}/>

        {/* Main content */}
        <div
          className="flex flex-col md:flex-row gap-0 md:gap-6 px-6 py-6 flex-1"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateX(12px)" : "translateX(0)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          {/* Illustration */}
          <div
            className="flex-shrink-0 w-full md:w-64 rounded-2xl overflow-hidden"
            style={{
              border: "2.5px solid #c8a86b",
              background: "#1a1a2e",
              boxShadow: "0 4px 20px rgba(0,0,0,0.35), inset 0 0 30px rgba(124,58,237,0.08)",
              minHeight: "180px",
              maxHeight: "220px",
            }}
          >
            {panel.scene}
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center flex-1 pt-4 md:pt-0">
            <h2
              className="mb-3"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontWeight: 900,
                fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
                color: "#3d2a0a",
                lineHeight: 1.25,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {panel.title}
            </h2>

            {/* Gold divider */}
            <div style={{ width: "52px", height: "2.5px", background: "linear-gradient(90deg, #d4a017, #fbbf24)", borderRadius: "999px", marginBottom: "14px" }}/>

            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(0.88rem, 1.8vw, 1rem)",
                color: "#5c3d1e",
                lineHeight: 1.75,
              }}
            >
              {panel.text}
            </p>

            {/* Last panel extra sparkle */}
            {isLast && (
              <div
                className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(74,222,128,0.12), rgba(124,58,237,0.12))",
                  border: "1.5px solid rgba(74,222,128,0.3)",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>✨</span>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#3d2a0a" }}>
                  Your Python journey starts with a single spell. Are you ready?
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ height: "1px", margin: "0 24px", background: "linear-gradient(90deg, transparent, #c8a86b60, transparent)" }}/>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {PANELS.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setStep(i); setAnimating(false); }, 240); } }}
                style={{
                  width: i === step ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "999px",
                  background: i === step ? "linear-gradient(90deg, #7c3aed, #4ade80)" : "rgba(92,61,30,0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.25s ease, background 0.25s ease",
                  boxShadow: i === step ? "0 0 8px rgba(124,58,237,0.5)" : "none",
                  padding: 0,
                }}
              />
            ))}
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#9c7c4a", marginLeft: "6px" }}>
              {step + 1} / {PANELS.length}
            </span>
          </div>

          {/* Action buttons */}
          {!isLast ? (
            <div className="flex items-center gap-3">
              {step > 0 && (
                <button
                  onClick={goPrev}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "999px",
                    border: "1.5px solid rgba(92,61,30,0.3)",
                    background: "transparent",
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#7c5c2a",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                >
                  ← Back
                </button>
              )}
              <button
                onClick={goNext}
                className="btn-adventure"
                style={{ padding: "12px 36px", fontSize: "0.95rem" }}
              >
                Next ▶
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={goPrev}
                style={{
                  padding: "10px 20px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(92,61,30,0.3)",
                  background: "transparent",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  color: "#7c5c2a",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                ← Back
              </button>
              <button
                className="btn-adventure"
                style={{ padding: "13px 28px", fontSize: "0.95rem", whiteSpace: "nowrap" }}
              >
                🌟 Create Account to Begin
              </button>
              <button
                className="btn-trailer"
                style={{
                  padding: "13px 24px",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                  color: "#5c3d1e",
                  border: "1.5px solid rgba(92,61,30,0.35)",
                  background: "rgba(92,61,30,0.08)",
                }}
              >
                Login if you already have an account
              </button>
            </div>
          )}
        </div>

        {/* Bottom scroll curl */}
        <div style={{
          height: "10px",
          background: "linear-gradient(90deg, #c8a86b, #e8c880, #d4a017, #e8c880, #c8a86b)",
          borderRadius: "0 0 18px 18px",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.15)",
        }}/>
      </div>
    </div>
  );
}
