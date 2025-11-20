import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Analyzer() {
  const [brand, setBrand] = useState('')
  const [samples, setSamples] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const body = {
        brand: brand.trim(),
      }
      const cleaned = samples
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
      if (cleaned.length) {
        body.samples = cleaned
      }

      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="analyze" className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Run an analysis</h2>
          <p className="mt-2 text-blue-200/80">Paste a few recent social posts or leave empty for a generic overview.</p>
          <form onSubmit={handleAnalyze} className="mt-6 space-y-4">
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand name (e.g., Acme)"
              className="w-full rounded-lg bg-slate-800 border border-white/10 p-3 outline-none focus:ring-2 ring-blue-500"
              required
            />
            <textarea
              value={samples}
              onChange={(e) => setSamples(e.target.value)}
              placeholder={`Optional: one post per line\nI love Acme support, super fast!\nAcme pricing is confusing and expensive.`}
              rows={6}
              className="w-full rounded-lg bg-slate-800 border border-white/10 p-3 outline-none focus:ring-2 ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-5 py-3 font-medium"
            >
              {loading ? 'Analyzing…' : 'Analyze'}
            </button>
          </form>
        </div>

        <div className="min-h-[200px]">
          {!result && !error && (
            <div className="h-full grid place-items-center text-blue-200/70">
              Your results will appear here.
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200">
              {error}
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-800 border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{result.brand}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    result.overall_sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-300' :
                    result.overall_sentiment === 'negative' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {result.overall_sentiment} ({result.sentiment_score})
                  </span>
                </div>
                <div className="mt-3 grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-emerald-300">Pros</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-blue-200/80">
                      {result.pros.map((p, i) => (<li key={i}>{p}</li>))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-300">Cons</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-blue-200/80">
                      {result.cons.map((c, i) => (<li key={i}>{c}</li>))}
                    </ul>
                  </div>
                </div>
              </div>

              {result.recommendations?.length > 0 && (
                <div className="rounded-lg bg-slate-800 border border-white/10 p-4">
                  <h4 className="font-medium">Recommended next steps</h4>
                  <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-blue-200/80">
                    {result.recommendations.map((r, i) => (<li key={i}>{r}</li>))}
                  </ol>
                </div>
              )}

              {result.sample_posts?.length > 0 && (
                <div className="rounded-lg bg-slate-800 border border-white/10 p-4">
                  <h4 className="font-medium">Sample highlights</h4>
                  <ul className="mt-2 space-y-2 text-sm text-blue-200/80">
                    {result.sample_posts.map((s, i) => (
                      <li key={i} className="rounded bg-slate-900/60 p-2 border border-white/5">
                        <span className="text-xs uppercase tracking-wide mr-2 opacity-60">{s.sentiment}</span>
                        {s.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Analyzer