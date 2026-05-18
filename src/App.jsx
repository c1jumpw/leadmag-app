import { useState } from 'react'

const ACCENT = '#534AB7'
const TEAL = '#0F6E56'
const AMBER = '#BA7517'

const FORMATS = [
  'Quiz / Assessment',
  'Calculator / ROI Tool',
  'Audit / Scorecard',
  'Checklist / Cheat Sheet',
  'Template',
  'Free Trial / Demo',
  'Short Challenge',
  'Micro-Course',
  'AI-Personalized Report',
  "Not sure — suggest one",
]

const GOALS = [
  'More email signups',
  'Higher-quality leads',
  'Build trust fast',
  'Warm up cold traffic',
  'Qualify buyers for offer',
]

const AUDIENCES = [
  'B2B — small business',
  'B2B — enterprise',
  'B2C — consumer',
  'B2C — creator / personal brand',
  'Nonprofit / org',
]

function buildPrompt(form) {
  return `You are an expert lead magnet strategist trained in the Hormozi Value Equation and the Brunson Value Ladder.

A team is developing a lead magnet for a client. Here are the details:

- Business / org type: ${form.businessType || 'Not specified'}
- Target audience: ${form.audience || 'Not specified'}
- Primary goal: ${form.goal || 'Not specified'}
- Preferred format: ${form.format || 'Not specified'}
- Core problem to solve: ${form.problem}
- Additional notes: ${form.notes || 'None'}

Your job:

1. LEAD MAGNET IDEAS (give 3 distinct concepts)
For each idea provide:
- Title (specific and outcome-focused, not generic)
- Format
- Core promise (one sentence — what does the user get and how fast?)
- Why this works (tie it to the Value Equation: high dream outcome, fast result, low effort)
- Where it sits on the Value Ladder

2. FULL OUTLINE for the strongest idea
Choose the best of the three and build a complete outline:
- Headline / opt-in hook
- What the magnet delivers (section by section or screen by screen)
- The one result the user must feel within 5 minutes
- The natural next step on the Value Ladder
- Suggested distribution context

3. QUALITY CHECKLIST
Run the chosen idea through these gates (yes/no + brief note each):
- Solves one specific problem completely
- Result felt in under 5 minutes
- Some level of personalization
- Clear next step exists on the ladder
- Promise is specific enough to be believed

Be direct and specific. No generic advice.`
}

// ── Styles ──────────────────────────────────────────────────────────────────

const card = {
  background: '#fff',
  border: '0.5px solid #ddd',
  borderRadius: 12,
  padding: '1.5rem',
  marginBottom: '1rem',
}

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  fontSize: 14,
  border: '1px solid #ccc',
  borderRadius: 7,
  background: '#fff',
  color: '#222',
  fontFamily: 'inherit',
  outline: 'none',
}

const btn = (bg, color = '#fff') => ({
  background: bg,
  color,
  border: 'none',
  borderRadius: 8,
  padding: '10px 22px',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
})

const ghostBtn = {
  background: 'transparent',
  border: '1px solid #ccc',
  borderRadius: 7,
  padding: '8px 16px',
  fontSize: 13,
  cursor: 'pointer',
  color: '#444',
  fontFamily: 'inherit',
}

// ── Components ───────────────────────────────────────────────────────────────

function Field({ label, hint, children, half }) {
  return (
    <div style={{ marginBottom: 14, ...(half ? {} : {}) }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#222', marginBottom: 4 }}>
        {label}
      </label>
      {hint && <div style={{ fontSize: 11, color: '#888', marginBottom: 5 }}>{hint}</div>}
      {children}
    </div>
  )
}

// ── API Key Setup Screen ──────────────────────────────────────────────────────

function SetupScreen({ onSave }) {
  const [key, setKey] = useState('')
  const [err, setErr] = useState('')

  const save = () => {
    if (!key.trim().startsWith('AIza')) {
      setErr('That doesn\'t look like a valid Gemini key — it should start with "AIza".')
      return
    }
    localStorage.setItem('gemini_api_key', key.trim())
    onSave(key.trim())
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: ACCENT, marginBottom: 6 }}>
          One-time setup
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 8 }}>
          Connect your Gemini API key
        </div>
        <div style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>
          This tool uses Google's free Gemini API to generate lead magnet ideas. Your key is stored only in your browser — it never leaves your device.
        </div>
      </div>

      <div style={{ ...card, borderLeft: `3px solid ${ACCENT}` }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>How to get your free key (2 minutes)</div>
        {[
          ['1', 'Go to', 'aistudio.google.com', 'https://aistudio.google.com'],
          ['2', 'Sign in with your Google account', null, null],
          ['3', 'Click "Get API Key" → "Create API key"', null, null],
          ['4', 'Copy the key and paste it below', null, null],
        ].map(([n, text, link, href]) => (
          <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
            <span style={{ background: ACCENT, color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{n}</span>
            <span style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>
              {text}{' '}
              {link && <a href={href} target="_blank" rel="noreferrer" style={{ color: ACCENT, fontWeight: 600 }}>{link}</a>}
            </span>
          </div>
        ))}
      </div>

      <Field label="Paste your Gemini API key" hint="Starts with AIza...">
        <input
          type="password"
          placeholder="AIzaSy..."
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && save()}
          style={inputStyle}
        />
      </Field>

      {err && <div style={{ fontSize: 13, color: '#c0392b', marginBottom: 10 }}>{err}</div>}

      <button onClick={save} style={btn(ACCENT)}>
        Save key and continue →
      </button>

      <div style={{ marginTop: 12, fontSize: 12, color: '#999', lineHeight: 1.6 }}>
        Free tier: 1,500 requests/day — more than enough for team use. No credit card needed.
      </div>
    </div>
  )
}

// ── Generator Form ────────────────────────────────────────────────────────────

function GeneratorForm({ apiKey, onClearKey }) {
  const [form, setForm] = useState({ businessType: '', audience: '', goal: '', format: '', problem: '', notes: '' })
  const [step, setStep] = useState('form') // form | loading | result
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const generate = async () => {
    if (!form.problem.trim()) {
      setError('Please describe the core problem to solve.')
      return
    }
    setError('')
    setStep('loading')

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: buildPrompt(form) }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
          }),
        }
      )

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        const msg = errData?.error?.message || `API error (${res.status})`
        throw new Error(msg)
      }

      const data = await res.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      if (!text) throw new Error('Empty response from Gemini.')
      setResult(text)
      setStep('result')
    } catch (e) {
      setError(e.message || 'Something went wrong. Check your API key and try again.')
      setStep('form')
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setStep('form')
    setResult('')
    setForm({ businessType: '', audience: '', goal: '', format: '', problem: '', notes: '' })
  }

  if (step === 'loading') return (
    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>⚙️</div>
      <div style={{ fontSize: 17, fontWeight: 600, color: '#111', marginBottom: 6 }}>Building your lead magnet plan...</div>
      <div style={{ fontSize: 13, color: '#888' }}>Running your inputs through the Hormozi + Brunson framework</div>
    </div>
  )

  if (step === 'result') return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: TEAL, marginBottom: 4 }}>✓ Generated</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>Your lead magnet plan</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={copy} style={ghostBtn}>{copied ? 'Copied!' : 'Copy'}</button>
          <button onClick={reset} style={ghostBtn}>← New</button>
        </div>
      </div>

      <div style={{ background: '#f8f8f6', border: '1px solid #e5e5e5', borderRadius: 10, padding: '1.25rem', fontSize: 14, lineHeight: 1.8, color: '#333', whiteSpace: 'pre-wrap', maxHeight: 560, overflowY: 'auto' }}>
        {result}
      </div>

      <div style={{ marginTop: 12, padding: '0.9rem 1rem', background: '#EEEDFE', borderRadius: 8, fontSize: 13, color: '#3C3489', lineHeight: 1.6 }}>
        <strong>Next:</strong> Brief your designer or copywriter with this outline, then run it through the pre-launch checklist before anything goes live.
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: ACCENT, marginBottom: 6 }}>Lead Magnet Builder</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6 }}>Turn your idea into a full lead magnet plan</div>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>Fill in what you know. Only the core problem is required.</div>
          </div>
          <button onClick={onClearKey} style={{ ...ghostBtn, fontSize: 11, padding: '5px 10px', color: '#999' }}>Change API key</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Business / org type" hint="e.g. SaaS, agency, nonprofit">
          <input placeholder="e.g. Marketing agency" value={form.businessType} onChange={e => set('businessType', e.target.value)} style={inputStyle} />
        </Field>
        <Field label="Target audience">
          <select value={form.audience} onChange={e => set('audience', e.target.value)} style={inputStyle}>
            <option value="">Select...</option>
            {AUDIENCES.map(a => <option key={a}>{a}</option>)}
          </select>
        </Field>
        <Field label="Primary goal">
          <select value={form.goal} onChange={e => set('goal', e.target.value)} style={inputStyle}>
            <option value="">Select...</option>
            {GOALS.map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Preferred format">
          <select value={form.format} onChange={e => set('format', e.target.value)} style={inputStyle}>
            <option value="">Select...</option>
            {FORMATS.map(f => <option key={f}>{f}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Core problem to solve *" hint="Be specific. What does your audience struggle with that this magnet will fix?">
        <textarea
          placeholder="e.g. Our clients don't know if their pricing is leaving money on the table compared to competitors in their market."
          value={form.problem}
          onChange={e => set('problem', e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
        />
      </Field>

      <Field label="Additional notes" hint="Client brief, constraints, audience context, anything useful">
        <textarea
          placeholder="e.g. Client is conservative, audience is non-technical, wants something that shows ROI fast."
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
        />
      </Field>

      {error && <div style={{ fontSize: 13, color: '#c0392b', marginBottom: 12, padding: '8px 12px', background: '#fff0f0', borderRadius: 6 }}>{error}</div>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={generate} style={btn(ACCENT)}>Generate Ideas + Outline →</button>
        <span style={{ fontSize: 12, color: '#aaa' }}>Powered by Gemini (free)</span>
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '')

  const handleSave = (key) => setApiKey(key)
  const handleClear = () => { localStorage.removeItem('gemini_api_key'); setApiKey('') }

  return (
    <div>
      <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e0e0e0', padding: '2rem', marginBottom: '1rem' }}>
        {!apiKey ? <SetupScreen onSave={handleSave} /> : <GeneratorForm apiKey={apiKey} onClearKey={handleClear} />}
      </div>
      <div style={{ textAlign: 'center', fontSize: 12, color: '#bbb' }}>
        Hormozi + Brunson Framework · Free via Google Gemini API
      </div>
    </div>
  )
}
