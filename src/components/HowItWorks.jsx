function HowItWorks() {
  const items = [
    {
      title: 'Listen everywhere',
      desc: 'Consolidate chatter from major social channels and communities.',
    },
    {
      title: 'Understand sentiment',
      desc: 'Lightweight NLP tags posts as positive, neutral or negative.',
    },
    {
      title: 'Act with clarity',
      desc: 'Get prioritized pros, cons, and concrete playbooks to respond.',
    },
  ]

  return (
    <section id="how" className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-slate-800 p-6">
              <div className="text-2xl font-bold text-blue-300">0{i + 1}</div>
              <h3 className="mt-3 text-xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-blue-200/80">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks