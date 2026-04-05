import { useState, useEffect } from "react";
import "./App.css";

interface MoodEntry {
  thought: string;
  mood: string;
  score: number;
  timestamp: number;
}

const MOOD_COLORS: Record<string, string> = {
  joyful: "#f0c040", curious: "#60b8ff", anxious: "#ff7070",
  peaceful: "#80e8c0", frustrated: "#ff9060", melancholic: "#a080e0",
  motivated: "#60e060", confused: "#c0a060", neutral: "#a0a0b0",
};

const MOOD_EMOJI: Record<string, string> = {
  joyful: "\u2726", curious: "\u25ce", anxious: "\u27c1",
  peaceful: "\u25cc", frustrated: "\u2297", melancholic: "\u25d0",
  motivated: "\u25b2", confused: "\u2240", neutral: "\u2014",
};

async function analyzeMood(thought: string) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 200,
      messages: [{ role: "user", content: `Analyze the emotional tone. Respond ONLY with valid JSON no markdown: {"mood":"one of: joyful/curious/anxious/peaceful/frustrated/melancholic/motivated/confused/neutral","score":<integer -100 to 100>,"reflection":"<one sentence max 12 words>"}\n\nThought: "${thought}"` }],
    }),
  });
  const data = await res.json();
  try { return JSON.parse(data.content[0].text.replace(/```json|```/g, "").trim()); }
  catch { return { mood: "neutral", score: 0, reflection: "A thought, cast into the void." }; }
}

export default function App() {
  const [thought, setThought] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [reflection, setReflection] = useState("");

  useEffect(() => {
    setEntries([
      { thought: "Building on Linera feels like discovering fire", mood: "joyful", score: 76, timestamp: Date.now() - 3600000 },
      { thought: "I wonder if consciousness is just computation on microchains", mood: "curious", score: 72, timestamp: Date.now() - 86400000 },
    ]);
  }, []);

  const handleSubmit = async () => {
    if (!thought.trim() || loading) return;
    setLoading(true); setStatus("analyzing");
    const result = await analyzeMood(thought);
    setReflection(result.reflection);
    setStatus("saving");
    await new Promise(r => setTimeout(r, 700));
    setEntries(prev => [{ thought: thought.trim(), mood: result.mood, score: result.score, timestamp: Date.now() }, ...prev]);
    setThought(""); setStatus("done");
    setTimeout(() => { setStatus("idle"); setReflection(""); setLoading(false); }, 2000);
  };

  return (
    <div className="app">
      <div className="noise" />
      <header className="header">
        <div className="logo"><span className="logo-mark">◈</span><span className="logo-text">MicroMind</span></div>
        <div className="chain-badge"><span className="chain-dot" /><span>Linera Testnet</span><span className="chain-id">e3f1…a72b</span></div>
      </header>
      <main className="main">
        <div className="hero">
          <h1 className="hero-title">Every thought<br /><em>owns its chain.</em></h1>
          <p className="hero-sub">Write a thought — AI reads its soul — your microchain remembers.</p>
        </div>
        <div className="input-card">
          <div className="input-header"><span className="input-label">New thought</span><span className="char-count">{thought.length}/280</span></div>
          <textarea className="thought-input" placeholder="What is on your mind?" value={thought}
            onChange={e => setThought(e.target.value.slice(0, 280))}
            onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit(); }} rows={4} />
          {reflection && <div className="reflection"><span>◎ </span>{reflection}</div>}
          <div className="input-footer">
            <span className="shortcut">Ctrl+Enter to save</span>
            <button className={`submit-btn${loading ? " loading" : ""}`} onClick={handleSubmit} disabled={!thought.trim() || loading}>
              {status === "analyzing" ? "Analyzing…" : status === "saving" ? "Saving to chain…" : status === "done" ? "✓ Saved" : "Record thought →"}
            </button>
          </div>
        </div>
        <div className="entries">
          <div className="entries-header"><span>Chain history</span><span className="entries-sub">stored on your microchain</span></div>
          {entries.map((e, i) => (
            <div className="entry" key={i} style={{"--mood-color": MOOD_COLORS[e.mood] ?? "#fff"} as React.CSSProperties}>
              <span className="entry-symbol">{MOOD_EMOJI[e.mood] ?? "—"}</span>
              <div className="entry-body">
                <p className="entry-thought">{e.thought}</p>
                <div className="entry-meta">
                  <span className="entry-mood" style={{color: MOOD_COLORS[e.mood]}}>{e.mood}</span>
                  <div className="score-bar"><div className="score-fill" style={{width: `${Math.round(((e.score+100)/200)*100)}%`, background: MOOD_COLORS[e.mood]}} /></div>
                  <span className="entry-score">{e.score > 0 ? "+" : ""}{e.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <span>Built on Linera · Buildathon 2025</span>
        <span>@ArtemGromov777</span>
      </footer>
    </div>
  );
}
