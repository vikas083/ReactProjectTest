import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Discover Our Partners</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Explore a curated list of organizations collaborating to build accessible, inclusive experiences.</p>
          <div className="mt-8 flex gap-3">
            <Link to="/partners" className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-white shadow-soft focus-ring hover:bg-brand-500">Browse Partners</Link>
            <a href="#about" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 focus-ring hover:bg-slate-50 dark:hover:bg-slate-900">Learn more</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
          <div aria-hidden className="absolute -inset-6 bg-gradient-to-br from-brand-200/60 via-brand-300/40 to-brand-400/30 blur-2xl rounded-3xl" />
          <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-6 shadow-soft">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.03 }} className="aspect-[3/2] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div id="about" className="mt-24 grid lg:grid-cols-3 gap-6">
        {[
          { title: 'Accessible by default', desc: 'Keyboard navigable, logical structure, and high-contrast design.' },
          { title: 'Smooth animations', desc: 'Tasteful motion with reduced-motion respect and focus management.' },
          { title: 'Responsive layout', desc: 'Looks great on mobile, tablet, and desktop.' },
        ].map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

