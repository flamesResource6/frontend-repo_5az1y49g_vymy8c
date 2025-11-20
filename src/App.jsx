import Hero from './components/Hero'
import Analyzer from './components/Analyzer'
import HowItWorks from './components/HowItWorks'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <Analyzer />
      <HowItWorks />
      <footer className="border-t border-white/10 bg-slate-950 text-blue-200/70">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Brand Guardian AI</p>
          <a href="/test" className="text-blue-300 hover:text-blue-200">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App