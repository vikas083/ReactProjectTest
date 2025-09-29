import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-indigo-600 text-white px-3 py-2 rounded">
        Skip to main content
      </a>
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NavLink to="/" className="text-lg font-semibold">
            A11yMinds Partners
          </NavLink>
          <div className="flex gap-6 text-sm">
            <NavLink to="/" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? 'text-indigo-600 font-medium' : ''}`}>Home</NavLink>
            <NavLink to="/partners" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? 'text-indigo-600 font-medium' : ''}`}>Partners</NavLink>
            <NavLink to="/about" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? 'text-indigo-600 font-medium' : ''}`}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? 'text-indigo-600 font-medium' : ''}`}>Contact</NavLink>
          </div>
        </nav>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} A11yMinds. All rights reserved.
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Build accessible, delightful partner experiences
          </h1>
          <p className="mt-4 text-gray-600">
            Explore our ecosystem of partners. Filter, search, and discover organizations collaborating to improve accessibility.
          </p>
        </div>
        <div className="aspect-video rounded-2xl bg-gradient-to-tr from-indigo-200 via-white to-cyan-100" />
      </div>
    </section>
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'

type Partner = {
  id: string
  name: string
  category: 'Education' | 'Nonprofit' | 'Enterprise' | 'Government'
  description: string
  website: string
}

const ALL_PARTNERS: Partner[] = [
  { id: '1', name: 'AccessEdu', category: 'Education', description: 'Courses and training on inclusive design.', website: '#' },
  { id: '2', name: 'OpenAccess Foundation', category: 'Nonprofit', description: 'Advocacy for digital accessibility.', website: '#' },
  { id: '3', name: 'Inclusive Corp', category: 'Enterprise', description: 'Enterprise accessibility audits and tooling.', website: '#' },
  { id: '4', name: 'Civic A11y', category: 'Government', description: 'Government accessibility initiatives.', website: '#' },
  { id: '5', name: 'LearnA11y', category: 'Education', description: 'Accessible learning platforms.', website: '#' },
  { id: '6', name: 'Care Foundation', category: 'Nonprofit', description: 'Supporting accessible healthcare tech.', website: '#' },
]

const CATEGORIES: Array<Partner['category'] | 'All'> = ['All', 'Education', 'Nonprofit', 'Enterprise', 'Government']

function PartnersPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('All')

  const filtered = useMemo(() => {
    const byCategory = category === 'All' ? ALL_PARTNERS : ALL_PARTNERS.filter(p => p.category === category)
    if (!query.trim()) return byCategory
    const q = query.toLowerCase()
    return byCategory.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }, [query, category])

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Partners</h2>
        <div className="flex gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full border text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${category === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="sr-only" htmlFor="partner-search">Search partners</label>
        <input
          id="partner-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search partners..."
          className="w-full sm:w-96 rounded-lg border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        />
      </div>

      <motion.div layout className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.a
              layout
              key={p.id}
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">{p.name}</h3>
                <span className="text-xs rounded-full bg-gray-100 px-2 py-1 text-gray-600">{p.category}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{p.description}</p>
              <div className="mt-4 text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Visit website →</div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="mt-3 text-gray-600">We collaborate with organizations to advance accessibility across the web.</p>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <p className="mt-3 text-gray-600">Reach out at contact@example.com</p>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
