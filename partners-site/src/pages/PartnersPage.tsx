import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Partner = {
  id: string
  name: string
  category: 'Accessibility' | 'Consulting' | 'Design' | 'Engineering'
  website: string
  description: string
}

const PARTNERS: Partner[] = [
  { id: 'p1', name: 'Inclusive Co.', category: 'Accessibility', website: 'https://example.com', description: 'Audits and training for accessible products.' },
  { id: 'p2', name: 'Pixel & Path', category: 'Design', website: 'https://example.com', description: 'Human-centered design and research.' },
  { id: 'p3', name: 'Code North', category: 'Engineering', website: 'https://example.com', description: 'Frontend and platform engineering.' },
  { id: 'p4', name: 'Advisory Works', category: 'Consulting', website: 'https://example.com', description: 'Strategy and digital transformation.' },
  { id: 'p5', name: 'Access Guild', category: 'Accessibility', website: 'https://example.com', description: 'Accessibility remediation and coaching.' },
  { id: 'p6', name: 'Bright Labs', category: 'Engineering', website: 'https://example.com', description: 'Full-stack development and cloud.' },
]

const categories = ['All', 'Accessibility', 'Consulting', 'Design', 'Engineering'] as const
type Category = typeof categories[number]

export default function PartnersPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('All')

  const filtered = useMemo(() => {
    return PARTNERS.filter(p => {
      const matchesQuery = (p.name + ' ' + p.description).toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' ? true : p.category === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partners</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Discover organizations by category and expertise.</p>
        </div>
        <div className="flex gap-3">
          <label className="sr-only" htmlFor="search">Search</label>
          <input id="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search partners" className="w-60 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus-ring" />
          <div className="relative">
            <label className="sr-only" htmlFor="category">Category</label>
            <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus-ring">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence initial={false}>
          {filtered.map((p, i) => (
            <motion.article
              layout
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 p-5 shadow-soft"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-xs mt-1 inline-flex items-center rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-200 px-2 py-0.5">{p.category}</p>
                </div>
                <a className="text-sm text-brand-700 dark:text-brand-300 hover:underline focus-ring rounded" href={p.website} target="_blank" rel="noreferrer">Visit</a>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-slate-500">No partners found.</div>
      )}
    </section>
  )
}

