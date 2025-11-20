import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-200 backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Real-time brand protection
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Brand Guardian AI
          </h1>
          <p className="mt-4 text-blue-200/80 text-base sm:text-lg max-w-xl">
            Monitor, analyze, and protect your brand across social platforms. Get instant pros & cons, sentiment, and clear steps to prevent reputation losses.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#analyze" className="rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 font-medium transition-colors">Analyze a brand</a>
            <a href="#how" className="rounded-lg border border-white/10 hover:bg-white/5 px-5 py-3 font-medium transition-colors">How it works</a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
    </section>
  )
}

export default Hero