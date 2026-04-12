import { Outlet, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle from './components/ThemeToggle'
import InteractiveBackground from './components/InteractiveBackground'

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <InteractiveBackground />

      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
       <header className="sticky top-0 z-20 border-b border-zinc-200/60 bg-white/90 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-black/80">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <NavLink to="/" className="font-semibold tracking-tight">
              Nemeth
            </NavLink>

            <nav className="flex gap-4 text-sm">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? 'text-accent' : 'hover:text-accent'
                }
              >
                Projects
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'text-accent' : 'hover:text-accent'
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'text-accent' : 'hover:text-accent'
                }
              >
                Contact
              </NavLink>
            </nav>

            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>

        <footer className="border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-zinc-500">
            © {new Date().getFullYear()} Benjamin
          </div>
        </footer>
      </div>
    </div>
  )
}