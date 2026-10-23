import { useState, useEffect } from "react";

export interface LessonLocation {
  id: string;
  name: string;
  topic: string;
  icon: string;
  color: string;
  darkColor: string;
}

// ── Lesson content data keyed by location id ──
const LESSONS: Record<string, LessonData> = {
  beach: {
    lumiLines: [
      "Welcome to Codehaven, brave traveler! 🌊 Python is the magic language of this island. Every spell you write is a line of Python code!",
      "Let's try your first spell — the mighty print() incantation. It speaks your words into the world!",
      "You've got this! Remember: every wizard started with their very first spell. ✨",
    ],
    sections: [
      {
        type: "learn",
        title: "The print() Spell",
        explanation: "In Python, print() is your first spell. It makes text appear — like speaking a magic word aloud. Wrap your message in quotes inside the parentheses.",
        codeBlocks: [
          { label: "Cast your first spell", code: 'print("Hello, Codehaven!")', output: "Hello, Codehaven!" },
          { label: "Speak any message", code: 'print("The island needs you!")', output: "The island needs you!" },
        ],
      },
      {
        type: "tryit",
        title: "Try the Spell",
        question: "What will this spell produce?",
        code: 'print("Magic begins now!")',
        choices: ["Magic begins now!", "print(Magic begins now!)", "Error!", '"Magic begins now!"'],
        correct: 0,
        feedback: { correct: "✨ Perfect! The print() spell speaks exactly what's inside the quotes.", wrong: "Not quite — print() outputs the text inside the quotes, without the quotes themselves." },
      },
      {
        type: "challenge",
        title: "Mini Challenge",
        prompt: "Write a spell to make Codehaven say your hero's name! Use print() to display: \"I am the chosen one!\"",
        hint: "Use print() with your message wrapped in double quotes, just like the example above.",
        starterCode: 'print("___")',
        solutionKeyword: "chosen one",
      },
      {
        type: "battle",
        monsterName: "Syntax Slime",
        monsterIcon: "🟢",
        monsterHpMax: 3,
        questions: [
          {
            question: "What will this spell print?",
            code: 'print("Abracadabra")',
            choices: ["abracadabra", "Abracadabra", 'print("Abracadabra")', "Nothing"],
            correct: 1,
            hint: "print() outputs exactly what's inside the quotes — capital letters included!",
          },
          {
            question: "Which spell will display the number 7?",
            code: "# Pick the correct spell:",
            choices: ['print("7")', "print(7)", "print = 7", "7.print()"],
            correct: 1,
            hint: "Numbers don't need quotes. print(7) works without them!",
          },
          {
            question: "What is the output of this code?",
            code: 'print("Hello")\nprint("World")',
            choices: ["Hello World", "HelloWorld", "Hello\nWorld", "Error"],
            correct: 2,
            hint: "Each print() call outputs on its OWN line automatically.",
          },
        ],
      },
    ],
  },
  village: {
    lumiLines: [
      "Welcome to Codehaven Village! 🏘️ The villagers store their magical items using variables — think of them as labeled jars for your spells.",
      "A variable holds a value you can use later. Name it wisely — it's like naming a magical artifact!",
      "Different types of items go in different jars: words go in strings, numbers go in integers. Let's fill some jars! 🫙",
    ],
    sections: [
      {
        type: "learn",
        title: "Variable Jars — Storing Magic",
        explanation: "A variable is a named container for a value. Use = to put something inside. You can store words (strings), numbers, or True/False (booleans).",
        codeBlocks: [
          { label: "Store a potion name", code: 'potion = "Mana Elixir"\nprint(potion)', output: "Mana Elixir" },
          { label: "Store spell power", code: "spell_power = 42\nprint(spell_power)", output: "42" },
          { label: "Store a truth", code: "is_hero = True\nprint(is_hero)", output: "True" },
        ],
      },
      {
        type: "tryit",
        title: "Fill the Jar",
        question: "Which line correctly stores the village name in a variable?",
        code: "# Choose the correct variable spell:",
        choices: [
          'village_name = "Codehaven"',
          '"Codehaven" = village_name',
          'village_name == "Codehaven"',
          "village_name : Codehaven",
        ],
        correct: 0,
        feedback: { correct: "🏆 Excellent! The variable name goes on the left, = in the middle, value on the right.", wrong: "Almost! In Python, the variable name always goes on the LEFT of the = sign." },
      },
      {
        type: "challenge",
        title: "Mini Challenge",
        prompt: "The village elder needs you to store his name and age! Create two variables: elder_name set to \"Aldric\" and elder_age set to 73, then print both.",
        hint: "Create two variables using =, then print each one on its own line.",
        starterCode: 'elder_name = "___"\nelder_age = ___\nprint(elder_name)\nprint(elder_age)',
        solutionKeyword: "Aldric",
      },
      {
        type: "battle",
        monsterName: "Bug Beast",
        monsterIcon: "🐛",
        monsterHpMax: 3,
        questions: [
          {
            question: "Which line correctly assigns a variable?",
            code: "# Pick the correct spell:",
            choices: ['name = "Aria"', '"Aria" = name', "name == Aria", "var name = Aria"],
            correct: 0,
            hint: "In Python: variable_name = value. The name ALWAYS goes on the left.",
          },
          {
            question: "What does this code print?",
            code: 'hero = "Zara"\nprint(hero)',
            choices: ['"Zara"', "hero", "Zara", "Error"],
            correct: 2,
            hint: "print(hero) outputs the VALUE stored in hero, not the variable name itself.",
          },
          {
            question: "Which data type stores True or False?",
            code: "# What type is this?\nis_magic = True",
            choices: ["String", "Integer", "Boolean", "Float"],
            correct: 2,
            hint: "True and False (capital T and F) are Booleans — the on/off switches of Python!",
          },
        ],
      },
    ],
  },
  forest: {
    lumiLines: [
      "Brave traveler, the Whisperwood Forest only lets worthy ones pass! 🌲 The trees here make decisions — and so will your code!",
      "An if-else spell checks a condition. If it's True, do one thing. Else, do another. Like a fork in the enchanted path!",
      "Indentation is MAGIC here — Python uses spaces to know which spells belong to which branch. Get it wrong and the forest won't let you through!",
    ],
    sections: [
      {
        type: "learn",
        title: "The if-else Branching Spell",
        explanation: "if checks whether something is True. If yes, it runs the indented code below. else catches everything that doesn't match — the other fork in the path.",
        codeBlocks: [
          { label: "Choose your path", code: "courage = 80\n\nif courage > 50:\n    print(\"You may enter!\")\nelse:\n    print(\"Turn back!\")", output: "You may enter!" },
          { label: "Multiple branches", code: 'level = 3\n\nif level >= 5:\n    print("High Wizard")\nelif level >= 3:\n    print("Apprentice")\nelse:\n    print("Novice")', output: "Apprentice" },
        ],
      },
      {
        type: "tryit",
        title: "Pick the Right Path",
        question: "What will the forest guardian say?",
        code: "keys = 2\n\nif keys >= 3:\n    print(\"Gates open!\")\nelse:\n    print(\"Not enough keys.\")",
        choices: ["Gates open!", "Not enough keys.", "keys >= 3", "Nothing — it crashes"],
        correct: 1,
        feedback: { correct: "🌲 Well navigated! keys is 2, which is less than 3, so the else branch runs.", wrong: "Check the condition again — keys = 2, and 2 >= 3 is False, so else runs." },
      },
      {
        type: "challenge",
        title: "Mini Challenge",
        prompt: "The forest has a health potion gatekeeper! Write an if-else that checks if health is below 30. If True, print \"Drink the potion!\". Otherwise print \"You are strong enough!\"",
        hint: "Use if health < 30: on the first line, indented print underneath, then else: and another indented print.",
        starterCode: "health = 25\n\nif ___:\n    print(\"___\")\nelse:\n    print(\"___\")",
        solutionKeyword: "potion",
      },
      {
        type: "battle",
        monsterName: "Logic Ghoul",
        monsterIcon: "👻",
        monsterHpMax: 3,
        questions: [
          {
            question: "What does the forest guardian print?",
            code: "power = 60\n\nif power > 50:\n    print(\"Strong!\")\nelse:\n    print(\"Weak!\")",
            choices: ["Weak!", "Strong!", "power > 50", "Nothing"],
            correct: 1,
            hint: "power is 60, and 60 > 50 is True, so the if branch runs.",
          },
          {
            question: "Which keyword handles a second condition?",
            code: "# Fill in the blank:\nif score > 90:\n    print(\"S rank\")\n___ score > 70:\n    print(\"A rank\")",
            choices: ["else", "elif", "elseif", "or"],
            correct: 1,
            hint: "elif means 'else if' — it checks another condition when the first one is False.",
          },
          {
            question: "What will this print?",
            code: "x = 5\n\nif x > 10:\n    print(\"Big\")\nelif x > 3:\n    print(\"Medium\")\nelse:\n    print(\"Small\")",
            choices: ["Big", "Small", "Medium", "Big\nMedium"],
            correct: 2,
            hint: "x is 5. 5 > 10 is False, so skip. 5 > 3 is True, so print Medium!",
          },
        ],
      },
    ],
  },
};

// fallback for unlocked locations without specific data
const DEFAULT_LESSON: LessonData = LESSONS.village;

interface CodeBlock { label: string; code: string; output: string; }
interface LearnSection { type: "learn"; title: string; explanation: string; codeBlocks: CodeBlock[]; }
interface TryItSection { type: "tryit"; title: string; question: string; code: string; choices: string[]; correct: number; feedback: { correct: string; wrong: string }; }
interface ChallengeSection { type: "challenge"; title: string; prompt: string; hint: string; starterCode: string; solutionKeyword: string; }
export interface BattleQuestion { question: string; code: string; choices: string[]; correct: number; hint: string; }
export interface BattleSection { type: "battle"; monsterName: string; monsterIcon: string; monsterHpMax: number; questions: BattleQuestion[]; }
type Section = LearnSection | TryItSection | ChallengeSection | BattleSection;
interface LessonData { lumiLines: string[]; sections: Section[]; }

interface Props {
  location: LessonLocation;
  username: string;
  xp: number;
  onBack: () => void;
}

export default function LessonPage({ location, username, xp, onBack }: Props) {
  const lesson = LESSONS[location.id] ?? DEFAULT_LESSON;
  const sections = lesson.sections;
  const [sectionIdx, setSectionIdx] = useState(0);
  const [lumiLine, setLumiLine] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [battleDone, setBattleDone] = useState(false);

  // TryIt state
  const [chosen, setChosen] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Challenge state
  const [challengeCode, setChallengeCode] = useState("");
  const [challengeResult, setChallengeResult] = useState<"idle" | "correct" | "wrong">("idle");

  const section = sections[sectionIdx];
  const isLast = sectionIdx === sections.length - 1;
  const XP_NEXT = 500;

  useEffect(() => {
    setChosen(null);
    setAnswered(false);
    setChallengeResult("idle");
    setShowHint(false);
    setBattleDone(false);
    if (section.type === "challenge") {
      setChallengeCode((section as ChallengeSection).starterCode);
    }
  }, [sectionIdx]);

  function advanceLumi() {
    if (lumiLine < lesson.lumiLines.length - 1) setLumiLine((l) => l + 1);
  }

  function handleNext() {
    if (isLast) { setCompleted(true); return; }
    setSectionIdx((i) => i + 1);
    setLumiLine(Math.min(lumiLine + 1, lesson.lumiLines.length - 1));
  }

  function handleChoiceSelect(idx: number) {
    if (answered) return;
    setChosen(idx);
    setAnswered(true);
  }

  function handleChallengeCheck() {
    if (section.type !== "challenge") return;
    const kw = (section as ChallengeSection).solutionKeyword.toLowerCase();
    if (challengeCode.toLowerCase().includes(kw)) {
      setChallengeResult("correct");
    } else {
      setChallengeResult("wrong");
    }
  }

  const canProceed =
    section.type === "learn" ||
    (section.type === "tryit" && answered) ||
    (section.type === "challenge" && challengeResult === "correct") ||
    (section.type === "battle" && battleDone);

  if (completed) {
    return <QuestComplete location={location} username={username} onBack={onBack} />;
  }

  return (
    <div className="fixed inset-0 flex flex-col" style={{ fontFamily: "'Nunito', sans-serif", background: "linear-gradient(160deg, #0d2d52 0%, #1a4a7a 30%, #1e7ab8 65%, #87ceeb 100%)" }}>

      {/* ── Top bar ── */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 flex-shrink-0"
        style={{
          background: "linear-gradient(180deg, rgba(13,25,45,0.97) 0%, rgba(13,25,45,0.8) 100%)",
          borderBottom: "1px solid rgba(212,160,23,0.3)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(212,160,23,0.3)",
            borderRadius: "999px",
            padding: "7px 16px",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800, fontSize: "0.78rem",
            color: "#fdf3dc", cursor: "pointer",
            transition: "background 0.15s",
            flexShrink: 0,
          }}
        >
          🗺️ Back to Map
        </button>

        {/* Location title */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span style={{ fontSize: "20px", flexShrink: 0 }}>{location.icon}</span>
          <div className="min-w-0">
            <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)", color: "#d4a017", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {location.name}
            </p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)", color: "#7dd3fc", lineHeight: 1.2 }}>
              {location.topic}
            </p>
          </div>
        </div>

        {/* XP bar */}
        <div className="hidden sm:flex flex-col gap-1 flex-shrink-0" style={{ minWidth: "140px" }}>
          <div className="flex justify-between">
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.62rem", color: "#a78bfa" }}>⚡ XP</span>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.62rem", color: "#c4b5fd" }}>{xp} / {XP_NEXT}</span>
          </div>
          <div style={{ height: "7px", borderRadius: "999px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(167,139,250,0.3)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(xp / XP_NEXT) * 100}%`, background: "linear-gradient(90deg,#7c3aed,#a78bfa,#c084fc)", borderRadius: "999px", boxShadow: "0 0 8px rgba(167,139,250,0.6)" }}/>
          </div>
        </div>

        {/* Username */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4ade80)", border: "2px solid #d4a017", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🧙</div>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.78rem", color: "#fdf3dc" }}>{username}</span>
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="flex flex-1 min-h-0 gap-4 p-4">

        {/* ── Left: Lumi fairy panel ── */}
        <div
          className="hidden lg:flex flex-col items-center gap-4 flex-shrink-0"
          style={{ width: "220px" }}
        >
          {/* Fairy illustration */}
          <div
            className="w-full rounded-3xl p-4 flex flex-col items-center"
            style={{
              background: "linear-gradient(180deg, rgba(13,25,45,0.9) 0%, rgba(20,12,40,0.9) 100%)",
              border: "2px solid rgba(124,58,237,0.4)",
              boxShadow: "0 0 30px rgba(124,58,237,0.15), 0 8px 32px rgba(0,0,0,0.4)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.7rem", color: "#d4a017", marginBottom: "12px", textAlign: "center", letterSpacing: "0.06em" }}>✦ LUMI ✦</p>

            {/* Lumi SVG */}
            <LumiFairy />

            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.78rem", color: "#c4b5fd", textAlign: "center", marginTop: "10px" }}>Your Magic Guide</p>
          </div>

          {/* Speech bubble */}
          <div
            className="w-full rounded-2xl p-4 relative"
            style={{
              background: "linear-gradient(160deg, #fdf7e8 0%, #f0e0b8 100%)",
              border: "2px solid #c8a86b",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.7)",
              cursor: lumiLine < lesson.lumiLines.length - 1 ? "pointer" : "default",
            }}
            onClick={advanceLumi}
          >
            {/* Pointer */}
            <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: "10px solid #c8a86b" }}/>
            <div style={{ position: "absolute", top: "-7px", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderBottom: "9px solid #fdf7e8" }}/>

            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#5c3d1e", lineHeight: 1.65 }}>
              {lesson.lumiLines[lumiLine]}
            </p>

            {lumiLine < lesson.lumiLines.length - 1 && (
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "#9c7c4a", marginTop: "8px", textAlign: "right" }}>
                tap for more ▶
              </p>
            )}
          </div>

          {/* Hint button */}
          <button
            onClick={() => setShowHint((v) => !v)}
            style={{
              width: "100%", padding: "10px",
              borderRadius: "999px",
              background: showHint ? "linear-gradient(135deg,#6d28d9,#7c3aed)" : "rgba(124,58,237,0.15)",
              border: "2px solid rgba(124,58,237,0.5)",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800, fontSize: "0.78rem",
              color: showHint ? "#fff" : "#c4b5fd",
              cursor: "pointer",
              boxShadow: showHint ? "0 0 16px rgba(124,58,237,0.5)" : "none",
              transition: "all 0.2s",
            }}
          >
            {showHint ? "💡 Hide Hint" : "✨ Ask Lumi for Hint"}
          </button>

          {showHint && section.type !== "learn" && (
            <div
              className="w-full rounded-2xl p-3"
              style={{ background: "rgba(124,58,237,0.15)", border: "1.5px solid rgba(124,58,237,0.4)" }}
            >
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#e9d5ff", lineHeight: 1.6 }}>
                💜 {section.type === "tryit"
                  ? "Read the code carefully — trace what value the variable has, then follow the condition."
                  : (section as ChallengeSection).hint}
              </p>
            </div>
          )}
        </div>

        {/* ── Right: Scroll content panel ── */}
        <div
          className="flex-1 flex flex-col min-h-0 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(175deg, #fdf7e8 0%, #f5e6c8 60%, #ede0b8 100%)",
            border: "2.5px solid #c8a86b",
            boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          {/* Scroll top curl */}
          <div style={{ height: "8px", background: "linear-gradient(90deg,#c8a86b,#e8c880,#d4a017,#e8c880,#c8a86b)", flexShrink: 0 }}/>

          {/* Section tabs */}
          <div className="flex border-b flex-shrink-0" style={{ borderColor: "rgba(200,168,107,0.4)" }}>
            {sections.map((s, i) => {
              const icons: Record<string, string> = { learn: "📖", tryit: "⚡", challenge: "⚔️", battle: "💀" };
              const labels: Record<string, string> = { learn: "Learn", tryit: "Try It", challenge: "Challenge", battle: "Battle!" };
              const icon = icons[s.type] ?? "📖";
              const label = labels[s.type] ?? s.type;
              const isActive = i === sectionIdx;
              const isDone = i < sectionIdx;
              return (
                <button
                  key={i}
                  onClick={() => setSectionIdx(i)}
                  style={{
                    flex: 1, padding: "12px 8px",
                    border: "none",
                    borderBottom: isActive ? `3px solid ${s.type === "battle" ? "#ef4444" : location.color}` : "3px solid transparent",
                    background: isActive ? (s.type === "battle" ? "rgba(239,68,68,0.08)" : "rgba(212,160,23,0.12)") : "transparent",
                    fontFamily: "'Cinzel Decorative', serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.6rem,1.2vw,0.75rem)",
                    color: isActive ? (s.type === "battle" ? "#ef4444" : location.color) : isDone ? "#22c55e" : "#9c7c4a",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                    transition: "all 0.15s",
                  }}
                >
                  {isDone ? "✓" : icon} {label}
                </button>
              );
            })}
          </div>

          {/* Scrollable section body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
            {section.type === "learn" && <LearnSection section={section} color={location.color} />}
            {section.type === "tryit" && (
              <TryItSection
                section={section}
                chosen={chosen}
                answered={answered}
                onChoose={handleChoiceSelect}
                color={location.color}
              />
            )}
            {section.type === "challenge" && (
              <ChallengeSection
                section={section}
                code={challengeCode}
                onChange={setChallengeCode}
                result={challengeResult}
                onCheck={handleChallengeCheck}
                onReset={() => { setChallengeCode((section as ChallengeSection).starterCode); setChallengeResult("idle"); }}
                color={location.color}
              />
            )}
            {section.type === "battle" && (
              <BattleSection
                section={section as BattleSection}
                username={username}
                color={location.color}
                onComplete={() => setBattleDone(true)}
              />
            )}
          </div>

          {/* Bottom progress bar + navigation — hidden during active battle */}
          <div
            className="flex-shrink-0 px-6 py-4 flex items-center gap-4"
            style={{ borderTop: "1.5px solid rgba(200,168,107,0.4)", background: "rgba(245,230,200,0.6)", display: section.type === "battle" && !battleDone ? "none" : "flex" }}
          >
            {/* Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1.5">
                <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: "#7c5c2a" }}>
                  Quest Progress
                </span>
                <span style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.7rem", color: location.color }}>
                  {sectionIdx + 1} / {sections.length}
                </span>
              </div>
              <div style={{ height: "10px", borderRadius: "999px", background: "rgba(92,61,30,0.15)", border: "1px solid rgba(200,168,107,0.5)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${((sectionIdx + (canProceed ? 1 : 0)) / sections.length) * 100}%`,
                    background: `linear-gradient(90deg, ${location.darkColor}, ${location.color})`,
                    borderRadius: "999px",
                    boxShadow: `0 0 8px ${location.color}88`,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              {/* Step dots */}
              <div className="flex gap-2 mt-1.5">
                {sections.map((_, i) => (
                  <div key={i} style={{ width: i === sectionIdx ? "20px" : "8px", height: "8px", borderRadius: "999px", background: i < sectionIdx ? "#22c55e" : i === sectionIdx ? location.color : "rgba(92,61,30,0.2)", transition: "all 0.25s", boxShadow: i === sectionIdx ? `0 0 6px ${location.color}` : "none" }}/>
                ))}
              </div>
            </div>

            {/* Mobile hint button */}
            <button
              onClick={() => setShowHint((v) => !v)}
              className="lg:hidden flex-shrink-0"
              style={{
                padding: "10px 14px", borderRadius: "999px",
                background: "rgba(124,58,237,0.15)",
                border: "1.5px solid rgba(124,58,237,0.4)",
                fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.75rem",
                color: "#c4b5fd", cursor: "pointer",
              }}
            >
              💡 Hint
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={!canProceed}
              style={{
                flexShrink: 0,
                padding: "12px 32px",
                borderRadius: "999px",
                background: canProceed
                  ? `linear-gradient(135deg, ${location.darkColor}, ${location.color})`
                  : "rgba(92,61,30,0.15)",
                border: `2.5px solid ${canProceed ? location.color : "rgba(92,61,30,0.25)"}`,
                fontFamily: "'Cinzel Decorative', serif",
                fontWeight: 700, fontSize: "0.85rem",
                color: canProceed ? "#fff" : "#9c7c4a",
                cursor: canProceed ? "pointer" : "not-allowed",
                boxShadow: canProceed ? `0 0 20px ${location.color}66` : "none",
                transition: "all 0.2s",
              }}
            >
              {isLast ? "🏆 Complete Quest!" : "Next ▶"}
            </button>
          </div>

          {/* Scroll bottom curl */}
          <div style={{ height: "8px", background: "linear-gradient(90deg,#c8a86b,#e8c880,#d4a017,#e8c880,#c8a86b)", flexShrink: 0 }}/>
        </div>
      </div>
    </div>
  );
}

// ── Learn section ──
function LearnSection({ section, color }: { section: LearnSection; color: string }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900, fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#3d2a0a", marginBottom: "8px" }}>
        📖 {section.title}
      </h2>
      <div style={{ width: "48px", height: "2.5px", background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: "999px", marginBottom: "16px" }}/>

      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "0.92rem", color: "#5c3d1e", lineHeight: 1.75, marginBottom: "20px" }}>
        {section.explanation}
      </p>

      <div className="flex flex-col gap-4">
        {section.codeBlocks.map((block, i) => (
          <SpellBlock key={i} block={block} color={color} />
        ))}
      </div>
    </div>
  );
}

function SpellBlock({ block, color }: { block: CodeBlock; color: string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: `2px solid ${color}66`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.15), 0 0 16px ${color}22`,
      }}
    >
      {/* Label bar */}
      <div style={{ padding: "8px 16px", background: `linear-gradient(90deg, ${color}33, ${color}11)`, borderBottom: `1px solid ${color}44` }}>
        <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.7rem", color: color, letterSpacing: "0.06em" }}>
          ✦ Spell: {block.label}
        </p>
      </div>
      {/* Code area */}
      <div style={{ padding: "14px 16px", background: "rgba(13,15,30,0.88)" }}>
        <pre style={{ fontFamily: "monospace", fontSize: "clamp(0.78rem,1.5vw,0.9rem)", color: "#e2e8f0", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          <SyntaxHighlight code={block.code} />
        </pre>
      </div>
      {/* Output */}
      <div style={{ padding: "8px 16px", background: "rgba(20,10,5,0.6)", borderTop: `1px solid ${color}33`, display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "#4ade80", letterSpacing: "0.06em" }}>OUTPUT →</span>
        <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#4ade80" }}>{block.output}</span>
      </div>
    </div>
  );
}

// Minimal syntax highlight (strings, keywords, numbers)
function SyntaxHighlight({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <>
      {lines.map((line, li) => {
        const parts: { text: string; color: string }[] = [];
        let rest = line;
        // Comments
        const commentIdx = rest.indexOf("#");
        if (commentIdx !== -1) {
          const before = rest.slice(0, commentIdx);
          const comment = rest.slice(commentIdx);
          if (before) parts.push(...tokenize(before));
          parts.push({ text: comment, color: "#6b7280" });
          rest = "";
        }
        if (rest) parts.push(...tokenize(rest));
        return (
          <span key={li}>
            {parts.map((p, pi) => (
              <span key={pi} style={{ color: p.color }}>{p.text}</span>
            ))}
            {li < lines.length - 1 ? "\n" : ""}
          </span>
        );
      })}
    </>
  );
}

function tokenize(line: string): { text: string; color: string }[] {
  const KEYWORDS = /\b(if|else|elif|for|while|def|return|print|True|False|in|and|or|not)\b/g;
  const STRINGS = /(["'])(?:(?!\1).)*\1/g;
  const NUMBERS = /\b\d+\b/g;

  const parts: { text: string; color: string }[] = [];
  let pos = 0;
  const tokens: { start: number; end: number; color: string }[] = [];

  let m: RegExpExecArray | null;
  const re = new RegExp(`${STRINGS.source}|${KEYWORDS.source}|${NUMBERS.source}`, "g");
  while ((m = re.exec(line)) !== null) {
    const s = m[0];
    let c = "#e2e8f0";
    if (/^["']/.test(s)) c = "#fbbf24";
    else if (/^(if|else|elif|for|while|def|return|True|False|in|and|or|not)$/.test(s)) c = "#c084fc";
    else if (/^\d+$/.test(s)) c = "#38bdf8";
    else c = "#4ade80";
    tokens.push({ start: m.index, end: m.index + s.length, color: c });
  }

  for (const t of tokens) {
    if (pos < t.start) parts.push({ text: line.slice(pos, t.start), color: "#e2e8f0" });
    parts.push({ text: line.slice(t.start, t.end), color: t.color });
    pos = t.end;
  }
  if (pos < line.length) parts.push({ text: line.slice(pos), color: "#e2e8f0" });
  return parts;
}

// ── Try It section ──
function TryItSection({ section, chosen, answered, onChoose, color }: {
  section: TryItSection; chosen: number | null; answered: boolean; onChoose: (i: number) => void; color: string;
}) {
  const isCorrect = chosen === section.correct;
  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900, fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#3d2a0a", marginBottom: "8px" }}>
        ⚡ {section.title}
      </h2>
      <div style={{ width: "48px", height: "2.5px", background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: "999px", marginBottom: "16px" }}/>

      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#5c3d1e", marginBottom: "12px" }}>
        {section.question}
      </p>

      {/* Code display */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{ border: `2px solid ${color}55`, boxShadow: `0 0 20px ${color}22` }}
      >
        <div style={{ padding: "8px 16px", background: `${color}22`, borderBottom: `1px solid ${color}33` }}>
          <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.68rem", color: color }}>✦ The Spell</p>
        </div>
        <div style={{ padding: "14px 16px", background: "rgba(13,15,30,0.88)" }}>
          <pre style={{ fontFamily: "monospace", fontSize: "0.88rem", color: "#e2e8f0", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
            <SyntaxHighlight code={section.code} />
          </pre>
        </div>
      </div>

      {/* Choices */}
      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.78rem", color: "#9c7c4a", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Choose the correct answer:
      </p>
      <div className="flex flex-col gap-3">
        {section.choices.map((choice, i) => {
          const isSelected = chosen === i;
          const isRight = i === section.correct;
          let bg = "rgba(255,255,255,0.6)";
          let border = "rgba(200,168,107,0.5)";
          let textColor = "#3d2a0a";
          let icon = "";
          if (answered) {
            if (isRight) { bg = "rgba(34,197,94,0.15)"; border = "#22c55e"; textColor = "#14532d"; icon = "✓"; }
            else if (isSelected && !isRight) { bg = "rgba(239,68,68,0.12)"; border = "#ef4444"; textColor = "#7f1d1d"; icon = "✗"; }
          } else if (isSelected) {
            bg = `${color}22`; border = color;
          }
          return (
            <button
              key={i}
              onClick={() => onChoose(i)}
              disabled={answered}
              style={{
                width: "100%", textAlign: "left", padding: "12px 16px",
                borderRadius: "14px", border: `2px solid ${border}`,
                background: bg, cursor: answered ? "default" : "pointer",
                fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.88rem",
                color: textColor, display: "flex", alignItems: "center", justifyContent: "space-between",
                transition: "all 0.15s",
                boxShadow: isSelected && !answered ? `0 0 12px ${color}44` : "none",
              }}
            >
              <span><span style={{ opacity: 0.5, marginRight: "8px" }}>{["A","B","C","D"][i]}.</span>{choice}</span>
              {icon && <span style={{ fontWeight: 900, fontSize: "1rem" }}>{icon}</span>}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className="mt-4 p-4 rounded-2xl"
          style={{
            background: isCorrect ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.1)",
            border: `2px solid ${isCorrect ? "#22c55e" : "#ef4444"}55`,
            boxShadow: `0 0 16px ${isCorrect ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.15)"}`,
          }}
        >
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: isCorrect ? "#14532d" : "#7f1d1d", lineHeight: 1.6 }}>
            {isCorrect ? section.feedback.correct : section.feedback.wrong}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Challenge section ──
function ChallengeSection({ section, code, onChange, result, onCheck, onReset, color }: {
  section: ChallengeSection; code: string; onChange: (v: string) => void;
  result: "idle" | "correct" | "wrong"; onCheck: () => void; onReset: () => void; color: string;
}) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900, fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#3d2a0a", marginBottom: "8px" }}>
        ⚔️ {section.title}
      </h2>
      <div style={{ width: "48px", height: "2.5px", background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: "999px", marginBottom: "16px" }}/>

      {/* Quest prompt */}
      <div
        className="rounded-2xl p-4 mb-5"
        style={{
          background: "linear-gradient(135deg, rgba(212,160,23,0.12), rgba(212,160,23,0.06))",
          border: "2px solid rgba(212,160,23,0.4)",
          boxShadow: "0 0 16px rgba(212,160,23,0.1)",
        }}
      >
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#d4a017", marginBottom: "6px", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.68rem" }}>⚡ Quest Objective</p>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#5c3d1e", lineHeight: 1.7 }}>
          {section.prompt}
        </p>
      </div>

      {/* Code editor */}
      <div
        className="rounded-2xl overflow-hidden mb-4"
        style={{
          border: `2px solid ${color}66`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 20px ${color}22`,
        }}
      >
        <div style={{ padding: "8px 16px", background: "rgba(13,15,30,0.9)", borderBottom: `1px solid ${color}33`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.68rem", color: color }}>✦ Your Spell Scroll</p>
          <div className="flex gap-1.5">
            {["#ef4444","#fbbf24","#22c55e"].map((c,i)=>(
              <div key={i} style={{ width:"10px",height:"10px",borderRadius:"50%",background:c,opacity:0.7 }}/>
            ))}
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          style={{
            width: "100%", display: "block",
            padding: "16px", minHeight: "130px",
            background: "rgba(13,15,30,0.92)",
            border: "none", outline: "none", resize: "vertical",
            fontFamily: "monospace", fontSize: "0.9rem",
            color: "#e2e8f0", lineHeight: 1.7,
            boxSizing: "border-box",
          }}
        />
        {result !== "idle" && (
          <div style={{
            padding: "10px 16px",
            background: result === "correct" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.12)",
            borderTop: `1px solid ${result === "correct" ? "#22c55e" : "#ef4444"}44`,
            fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem",
            color: result === "correct" ? "#22c55e" : "#ef4444",
          }}>
            {result === "correct" ? "✓ Spell cast successfully! Output matches!" : "✗ Hmm, the spell didn't work. Check your code and try again!"}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={onCheck}
          style={{
            flex: 1, padding: "12px",
            borderRadius: "999px",
            background: `linear-gradient(135deg, ${color === "#22c55e" ? "#15803d" : color === "#16a34a" ? "#14532d" : color}, ${color})`,
            border: `2px solid ${color}`,
            fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.85rem",
            color: "#fff", cursor: "pointer",
            boxShadow: `0 0 20px ${color}55`,
            transition: "all 0.15s",
          }}
        >
          ⚡ Cast Spell
        </button>
        <button
          onClick={onReset}
          style={{
            padding: "12px 20px",
            borderRadius: "999px",
            background: "rgba(92,61,30,0.1)",
            border: "2px solid rgba(92,61,30,0.3)",
            fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem",
            color: "#7c5c2a", cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

// ── Lumi fairy SVG ──
function LumiFairy() {
  return (
    <svg viewBox="0 0 110 140" width="110" height="140">
      <defs>
        <radialGradient id="lumiAura" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <ellipse cx="55" cy="80" rx="50" ry="55" fill="url(#lumiAura)"/>
      {/* Wings */}
      <ellipse cx="25" cy="72" rx="22" ry="13" fill="rgba(224,242,254,0.5)" stroke="#7dd3fc" strokeWidth="1.2" transform="rotate(-25 25 72)"/>
      <ellipse cx="85" cy="72" rx="22" ry="13" fill="rgba(224,242,254,0.5)" stroke="#7dd3fc" strokeWidth="1.2" transform="rotate(25 85 72)"/>
      {/* Lower wings */}
      <ellipse cx="30" cy="90" rx="14" ry="8" fill="rgba(196,232,255,0.35)" stroke="#7dd3fc" strokeWidth="1" transform="rotate(-35 30 90)"/>
      <ellipse cx="80" cy="90" rx="14" ry="8" fill="rgba(196,232,255,0.35)" stroke="#7dd3fc" strokeWidth="1" transform="rotate(35 80 90)"/>
      {/* Body */}
      <circle cx="55" cy="78" r="26" fill="#dbeafe" stroke="#38bdf8" strokeWidth="2"/>
      <ellipse cx="55" cy="72" rx="18" ry="16" fill="#bae6fd"/>
      {/* Face */}
      <circle cx="48" cy="70" r="4" fill="#0284c7"/>
      <circle cx="62" cy="70" r="4" fill="#0284c7"/>
      <circle cx="49.2" cy="68.8" r="1.6" fill="white"/>
      <circle cx="63.2" cy="68.8" r="1.6" fill="white"/>
      {/* Eyelashes */}
      <line x1="44" y1="66" x2="46" y2="64" stroke="#0284c7" strokeWidth="1.2"/>
      <line x1="47" y1="65" x2="48" y2="63" stroke="#0284c7" strokeWidth="1.2"/>
      <line x1="58" y1="65" x2="59" y2="63" stroke="#0284c7" strokeWidth="1.2"/>
      <line x1="61" y1="66" x2="63" y2="64" stroke="#0284c7" strokeWidth="1.2"/>
      {/* Smile */}
      <path d="M48 78 Q55 84 62 78" stroke="#0284c7" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Rosy cheeks */}
      <circle cx="41" cy="76" r="5" fill="#fca5a5" opacity="0.4"/>
      <circle cx="69" cy="76" r="5" fill="#fca5a5" opacity="0.4"/>
      {/* Antenna */}
      <line x1="55" y1="52" x2="55" y2="36" stroke="#fbbf24" strokeWidth="2.2"/>
      <circle cx="55" cy="33" r="5.5" fill="#fbbf24"/>
      <circle cx="55" cy="33" r="9" fill="#fbbf24" opacity="0.2"/>
      {/* Star on antenna */}
      <text x="51" y="37" fontSize="8" fill="white" fontWeight="bold">★</text>
      {/* Wand */}
      <line x1="72" y1="90" x2="92" y2="108" stroke="#d4a017" strokeWidth="2.2" strokeLinecap="round"/>
      <polygon points="92,102 98,108 92,114 86,108" fill="#fbbf24" transform="rotate(45 92 108)"/>
      <circle cx="92" cy="108" r="8" fill="#fbbf24" opacity="0.25"/>
      {/* Magic sparks */}
      {[[84,100],[95,115],[100,102]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={2-i*0.3} fill={["#4ade80","#a78bfa","#38bdf8"][i]} opacity="0.9"/>
      ))}
      {/* Outfit accent */}
      <ellipse cx="55" cy="94" rx="12" ry="6" fill="#7c3aed" opacity="0.5"/>
      <rect x="48" y="91" width="14" height="8" rx="3" fill="#6d28d9" opacity="0.6"/>
    </svg>
  );
}

// ── Battle Section ──
function BattleSection({ section, username, color, onComplete }: {
  section: BattleSection;
  username: string;
  color: string;
  onComplete: () => void;
}) {
  const MAX_PLAYER_HP = 3;
  const [roundIdx, setRoundIdx] = useState(0);
  const [playerHp, setPlayerHp] = useState(MAX_PLAYER_HP);
  const [monsterHp, setMonsterHp] = useState(section.monsterHpMax);
  const [chosen, setChosen] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [battleState, setBattleState] = useState<"fighting" | "victory" | "defeat">("fighting");
  const [shake, setShake] = useState<"player" | "monster" | null>(null);
  const [showHint, setShowHint] = useState(false);

  const q = section.questions[Math.min(roundIdx, section.questions.length - 1)];
  const isCorrect = submitted && chosen === q.correct;
  const isWrong = submitted && chosen !== q.correct;

  function triggerShake(who: "player" | "monster") {
    setShake(who);
    setTimeout(() => setShake(null), 500);
  }

  function handleSubmit() {
    if (chosen === null || submitted) return;
    setSubmitted(true);
    setShowHint(false);

    if (chosen === q.correct) {
      triggerShake("monster");
      const newMonHp = monsterHp - 1;
      setMonsterHp(newMonHp);
      if (newMonHp <= 0) { setTimeout(() => setBattleState("victory"), 900); return; }
    } else {
      triggerShake("player");
      const newPlHp = playerHp - 1;
      setPlayerHp(newPlHp);
      if (newPlHp <= 0) { setTimeout(() => setBattleState("defeat"), 900); return; }
    }
  }

  function handleNext() {
    const nextRound = roundIdx + 1;
    if (nextRound >= section.questions.length) {
      setBattleState("victory");
      return;
    }
    setRoundIdx(nextRound);
    setChosen(null);
    setSubmitted(false);
    setShowHint(false);
  }

  function handleRetry() {
    setRoundIdx(0);
    setPlayerHp(MAX_PLAYER_HP);
    setMonsterHp(section.monsterHpMax);
    setChosen(null);
    setSubmitted(false);
    setBattleState("fighting");
    setShowHint(false);
  }

  useEffect(() => {
    if (battleState === "victory") onComplete();
  }, [battleState]);

  // ── Victory / Defeat screens ──
  if (battleState === "victory") {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div style={{ fontSize: "64px", marginBottom: "12px", animation: "pulse-glow 1s ease-in-out 3" }}>🏆</div>
        <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900, fontSize: "1.4rem", color: "#22c55e", marginBottom: "6px" }}>
          Monster Defeated!
        </h3>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#5c3d1e", marginBottom: "16px" }}>
          The {section.monsterName} has been vanquished by your Python spells! ✨
        </p>
        <div className="flex gap-3 justify-center">
          {Array.from({ length: MAX_PLAYER_HP }).map((_, i) => (
            <span key={i} style={{ fontSize: "24px", opacity: i < playerHp ? 1 : 0.2 }}>❤️</span>
          ))}
        </div>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#9c7c4a", marginTop: "8px" }}>
          Click "Next" to complete the quest!
        </p>
      </div>
    );
  }

  if (battleState === "defeat") {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div style={{ fontSize: "56px", marginBottom: "12px" }}>💀</div>
        <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900, fontSize: "1.3rem", color: "#ef4444", marginBottom: "6px" }}>
          Defeated…
        </h3>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#5c3d1e", marginBottom: "20px" }}>
          The {section.monsterName} overwhelmed you! Study your spells and try again!
        </p>
        <button
          onClick={handleRetry}
          style={{
            padding: "12px 32px", borderRadius: "999px",
            background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
            border: "2px solid #a78bfa",
            fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.9rem",
            color: "#fff", cursor: "pointer",
            boxShadow: "0 0 20px rgba(124,58,237,0.5)",
          }}
        >
          ↺ Try Again
        </button>
      </div>
    );
  }

  // ── Fighting state ──
  return (
    <div className="flex flex-col gap-4">

      {/* ── Character row ── */}
      <div className="flex items-start justify-between gap-2 px-2">

        {/* Player side */}
        <div
          className="flex flex-col items-center gap-2"
          style={{
            transform: shake === "player" ? "translateX(-6px)" : "translateX(0)",
            transition: "transform 0.1s ease",
            minWidth: "120px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "linear-gradient(135deg,#1e40af,#3b82f6)",
              border: "3px solid #22c55e",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "32px",
              boxShadow: "0 0 16px rgba(34,197,94,0.4)",
              position: "relative",
            }}
          >
            🧙
            <div style={{ position: "absolute", bottom: "-2px", right: "-2px", background: "#7c3aed", borderRadius: "999px", padding: "1px 6px", fontSize: "0.58rem", fontWeight: 800, color: "white", fontFamily: "'Nunito',sans-serif", border: "1.5px solid white" }}>
              LV.4
            </div>
          </div>

          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.78rem", color: "#3d2a0a", textAlign: "center" }}>{username}</p>

          {/* HP bar */}
          <div style={{ width: "100%" }}>
            <div className="flex justify-between mb-1">
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: "#22c55e" }}>HP</span>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: "#22c55e" }}>{playerHp}/{MAX_PLAYER_HP}</span>
            </div>
            <div style={{ height: "10px", borderRadius: "999px", background: "rgba(0,0,0,0.12)", border: "1.5px solid rgba(34,197,94,0.3)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(playerHp / MAX_PLAYER_HP) * 100}%`,
                background: playerHp > 1 ? "linear-gradient(90deg,#16a34a,#4ade80)" : "linear-gradient(90deg,#dc2626,#ef4444)",
                borderRadius: "999px",
                boxShadow: `0 0 6px ${playerHp > 1 ? "rgba(74,222,128,0.7)" : "rgba(239,68,68,0.7)"}`,
                transition: "width 0.4s ease, background 0.4s ease",
              }}/>
            </div>
            {/* HP hearts */}
            <div className="flex gap-1 mt-1 justify-center">
              {Array.from({ length: MAX_PLAYER_HP }).map((_, i) => (
                <span key={i} style={{ fontSize: "12px", opacity: i < playerHp ? 1 : 0.2, transition: "opacity 0.3s" }}>❤️</span>
              ))}
            </div>
          </div>
        </div>

        {/* VS badge */}
        <div
          className="flex flex-col items-center justify-center self-center"
          style={{
            width: "44px", height: "44px", borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#ef4444)",
            border: "3px solid #d4a017",
            boxShadow: "0 0 16px rgba(212,160,23,0.4)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900, fontSize: "0.65rem", color: "white" }}>VS</span>
        </div>

        {/* Monster side */}
        <div
          className="flex flex-col items-center gap-2"
          style={{
            transform: shake === "monster" ? "translateX(6px)" : "translateX(0)",
            transition: "transform 0.1s ease",
            minWidth: "120px",
          }}
        >
          <div
            style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "linear-gradient(135deg,#7f1d1d,#dc2626)",
              border: "3px solid #ef4444",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "34px",
              boxShadow: "0 0 16px rgba(239,68,68,0.5)",
            }}
          >
            {section.monsterIcon}
          </div>

          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.78rem", color: "#7f1d1d", textAlign: "center" }}>{section.monsterName}</p>

          {/* Monster HP bar */}
          <div style={{ width: "100%" }}>
            <div className="flex justify-between mb-1">
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: "#ef4444" }}>HP</span>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: "#ef4444" }}>{monsterHp}/{section.monsterHpMax}</span>
            </div>
            <div style={{ height: "10px", borderRadius: "999px", background: "rgba(0,0,0,0.12)", border: "1.5px solid rgba(239,68,68,0.3)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(monsterHp / section.monsterHpMax) * 100}%`,
                background: "linear-gradient(90deg,#dc2626,#f87171)",
                borderRadius: "999px",
                boxShadow: "0 0 6px rgba(239,68,68,0.7)",
                transition: "width 0.4s ease",
              }}/>
            </div>
            {/* Skull pips */}
            <div className="flex gap-1 mt-1 justify-center">
              {Array.from({ length: section.monsterHpMax }).map((_, i) => (
                <span key={i} style={{ fontSize: "12px", opacity: i < monsterHp ? 1 : 0.15, transition: "opacity 0.3s" }}>💀</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Duel scroll card ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: "2.5px solid #c8a86b",
          background: "linear-gradient(175deg, rgba(253,247,232,0.97), rgba(245,230,200,0.97))",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "10px 16px",
            background: "linear-gradient(90deg,rgba(127,29,29,0.85),rgba(109,40,217,0.85))",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          <span style={{ fontSize: "18px" }}>⚔️</span>
          <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900, fontSize: "0.85rem", color: "#fdf3dc", letterSpacing: "0.04em" }}>
            Python Duel — Round {roundIdx + 1}/{section.questions.length}
          </p>
          <span style={{ fontSize: "18px" }}>⚔️</span>
        </div>

        <div className="px-5 py-4">
          {/* Question */}
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#3d2a0a", marginBottom: "10px" }}>
            {q.question}
          </p>

          {/* Code block */}
          {q.code && q.code !== "# Pick the correct spell:" && (
            <div
              className="rounded-xl overflow-hidden mb-4"
              style={{ border: "1.5px solid rgba(127,29,29,0.3)", boxShadow: "0 0 12px rgba(127,29,29,0.1)" }}
            >
              <div style={{ padding: "6px 14px", background: "rgba(127,29,29,0.15)", borderBottom: "1px solid rgba(127,29,29,0.2)" }}>
                <p style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.62rem", color: "#7f1d1d", letterSpacing: "0.06em" }}>⚔️ Spell Scroll</p>
              </div>
              <div style={{ padding: "12px 14px", background: "rgba(13,15,30,0.88)" }}>
                <pre style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#e2e8f0", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                  <SyntaxHighlight code={q.code} />
                </pre>
              </div>
            </div>
          )}

          {/* Answer choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {q.choices.map((choice, i) => {
              const isSelected = chosen === i;
              const isRight = i === q.correct;
              let bg = "rgba(255,255,255,0.7)";
              let border = "rgba(200,168,107,0.5)";
              let textColor = "#3d2a0a";
              let glyph = ["A","B","C","D"][i];

              if (submitted) {
                if (isRight)       { bg = "rgba(34,197,94,0.18)";  border = "#22c55e"; textColor = "#14532d"; glyph = "✓"; }
                else if (isSelected) { bg = "rgba(239,68,68,0.14)"; border = "#ef4444"; textColor = "#7f1d1d"; glyph = "✗"; }
              } else if (isSelected) {
                bg = "rgba(127,29,29,0.1)"; border = "#b91c1c";
              }

              return (
                <button
                  key={i}
                  onClick={() => { if (!submitted) setChosen(i); }}
                  disabled={submitted}
                  style={{
                    textAlign: "left", padding: "11px 14px",
                    borderRadius: "12px", border: `2px solid ${border}`,
                    background: bg, cursor: submitted ? "default" : "pointer",
                    fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.85rem",
                    color: textColor,
                    display: "flex", alignItems: "center", gap: "8px",
                    transition: "all 0.15s",
                    boxShadow: isSelected && !submitted ? "0 0 10px rgba(185,28,28,0.3)" : "none",
                  }}
                >
                  <span
                    style={{
                      width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                      background: submitted && isRight ? "#22c55e" : submitted && isSelected ? "#ef4444" : isSelected ? "#b91c1c" : "rgba(92,61,30,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.72rem", fontWeight: 900, color: isSelected || (submitted && isRight) ? "white" : "#7c5c2a",
                      transition: "all 0.15s",
                    }}
                  >{glyph}</span>
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Result banner */}
          {submitted && (
            <div
              className="rounded-xl px-4 py-3 mb-2"
              style={{
                background: isCorrect ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.1)",
                border: `1.5px solid ${isCorrect ? "#22c55e" : "#ef4444"}66`,
                boxShadow: `0 0 16px ${isCorrect ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.15)"}`,
              }}
            >
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: isCorrect ? "#14532d" : "#7f1d1d", marginBottom: isWrong ? "4px" : 0 }}>
                {isCorrect ? "✨ Python spell hits the monster! Monster HP ↓" : "⚠️ The monster finds a weakness! Your HP ↓"}
              </p>
              {isWrong && (
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "0.78rem", color: "#92400e" }}>
                  💡 Hint: {q.hint}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Submit / Next row ── */}
      <div className="flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={chosen === null}
            style={{
              flex: 1, padding: "14px",
              borderRadius: "999px",
              background: chosen !== null
                ? "linear-gradient(135deg,#7f1d1d,#dc2626)"
                : "rgba(127,29,29,0.15)",
              border: `2.5px solid ${chosen !== null ? "#ef4444" : "rgba(127,29,29,0.25)"}`,
              fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.9rem",
              color: chosen !== null ? "#fff" : "#9c7c4a",
              cursor: chosen !== null ? "pointer" : "not-allowed",
              boxShadow: chosen !== null ? "0 0 20px rgba(239,68,68,0.4)" : "none",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            <span>⚔️</span> Submit Answer
          </button>
        ) : (
          roundIdx < section.questions.length - 1 ? (
            <button
              onClick={handleNext}
              style={{
                flex: 1, padding: "14px", borderRadius: "999px",
                background: "linear-gradient(135deg,#1a5c2a,#22c55e)",
                border: "2.5px solid #22c55e",
                fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.9rem",
                color: "#fff", cursor: "pointer",
                boxShadow: "0 0 20px rgba(34,197,94,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              Next Round ▶
            </button>
          ) : (
            <button
              onClick={() => setBattleState("victory")}
              style={{
                flex: 1, padding: "14px", borderRadius: "999px",
                background: "linear-gradient(135deg,#d4a017,#fbbf24)",
                border: "2.5px solid #d4a017",
                fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: "0.9rem",
                color: "#3d2a0a", cursor: "pointer",
                boxShadow: "0 0 20px rgba(212,160,23,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              🏆 Finish Battle!
            </button>
          )
        )}
        <button
          onClick={() => setShowHint((v) => !v)}
          style={{
            padding: "14px 16px", borderRadius: "999px",
            background: showHint ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.12)",
            border: "1.5px solid rgba(124,58,237,0.4)",
            fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.8rem",
            color: "#c4b5fd", cursor: "pointer", whiteSpace: "nowrap",
          }}
        >
          💡 Ask Lumi
        </button>
      </div>

      {/* Lumi hint */}
      {showHint && !submitted && (
        <div className="rounded-2xl p-3" style={{ background: "rgba(124,58,237,0.1)", border: "1.5px solid rgba(124,58,237,0.35)" }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#e9d5ff", lineHeight: 1.65 }}>
            💜 {q.hint}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Quest Complete screen ──
function QuestComplete({ location, username, onBack }: { location: LessonLocation; username: string; onBack: () => void }) {
  const [showStars, setShowStars] = useState(false);
  useEffect(() => { setTimeout(() => setShowStars(true), 300); }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center" style={{ background: "linear-gradient(160deg,#0d2d52,#1a4a7a,#1e7ab8)", fontFamily: "'Nunito',sans-serif" }}>
      {/* Sparkle bg */}
      {Array.from({length:16}).map((_,i)=>(
        <div key={i} className="absolute glow-pulse" style={{ left:`${5+i*6}%`,top:`${10+((i*37)%80)}%`,color:["#fbbf24","#a78bfa","#4ade80","#38bdf8"][i%4],fontSize:`${12+i%3*6}px`,opacity:0.5,animationDelay:`${i*0.3}s` }}>✦</div>
      ))}

      <div
        className="relative flex flex-col items-center text-center p-10 rounded-3xl"
        style={{
          maxWidth:"480px",width:"90%",
          background:"linear-gradient(175deg,#fdf7e8,#f0e0b8)",
          border:"3px solid #d4a017",
          boxShadow:"0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,160,23,0.3)",
        }}
      >
        {/* Top curl */}
        <div style={{ position:"absolute",top:0,left:0,right:0,height:"8px",background:"linear-gradient(90deg,#c8a86b,#e8c880,#d4a017,#e8c880,#c8a86b)",borderRadius:"18px 18px 0 0" }}/>

        <div style={{ fontSize:"64px",marginBottom:"12px" }}>🏆</div>
        <h2 style={{ fontFamily:"'Cinzel Decorative',serif",fontWeight:900,fontSize:"1.4rem",color:"#3d2a0a",marginBottom:"6px",lineHeight:1.2 }}>
          Quest Complete!
        </h2>
        <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:"0.95rem",color:location.color,marginBottom:"4px" }}>
          {location.name} — {location.topic}
        </p>
        <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:"0.85rem",color:"#7c5c2a",marginBottom:"20px" }}>
          Outstanding work, <strong>{username}</strong>! You've mastered this spell!
        </p>

        {/* Stars */}
        <div className="flex gap-3 mb-6">
          {[0,1,2].map(i=>(
            <span key={i} style={{ fontSize:"36px",opacity:showStars?1:0,transform:showStars?"scale(1)":"scale(0.3)",transition:`all 0.4s ease ${i*0.15}s` }}>⭐</span>
          ))}
        </div>

        {/* XP gained */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl mb-6" style={{ background:"rgba(124,58,237,0.12)",border:"1.5px solid rgba(124,58,237,0.3)" }}>
          <span style={{ fontSize:"24px" }}>⚡</span>
          <div style={{ textAlign:"left" }}>
            <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:"0.7rem",color:"#9c7c4a",textTransform:"uppercase",letterSpacing:"0.08em" }}>XP Earned</p>
            <p style={{ fontFamily:"'Cinzel Decorative',serif",fontWeight:700,fontSize:"1.1rem",color:"#7c3aed" }}>+50 XP</p>
          </div>
          <div style={{ textAlign:"left" }}>
            <p style={{ fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:"0.7rem",color:"#9c7c4a",textTransform:"uppercase",letterSpacing:"0.08em" }}>Crystal</p>
            <p style={{ fontFamily:"'Cinzel Decorative',serif",fontWeight:700,fontSize:"1.1rem",color:"#38bdf8" }}>+1 💎</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="btn-adventure"
          style={{ width:"100%",padding:"14px",fontSize:"0.95rem" }}
        >
          🗺️ Return to Island Map
        </button>

        {/* Bottom curl */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"8px",background:"linear-gradient(90deg,#c8a86b,#e8c880,#d4a017,#e8c880,#c8a86b)",borderRadius:"0 0 18px 18px" }}/>
      </div>
    </div>
  );
}
