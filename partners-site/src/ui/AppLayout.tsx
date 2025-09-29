import { Outlet, NavLink } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NavLink to="/" className="font-semibold text-brand-700 dark:text-brand-300">A11yPartners</NavLink>
          <nav className="flex items-center gap-6 text-sm">
            <NavLink to="/" className={({ isActive }) => `hover:text-brand-600 ${isActive ? 'text-brand-600' : ''}`}>Home</NavLink>
            <NavLink to="/partners" className={({ isActive }) => `hover:text-brand-600 ${isActive ? 'text-brand-600' : ''}`}>Partners</NavLink>
          </nav>
        </div>
      </header>
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-slate-500">© {new Date().getFullYear()} A11yPartners</div>
      </footer>
    </div>
  )
}

