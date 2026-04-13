import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getSystemTheme(): Theme {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

function MoonIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={[
        'absolute h-5 w-5 text-zinc-700 dark:text-zinc-300',
        'transition-all duration-500 ease-out',
        active
          ? 'rotate-0 scale-100 opacity-100'
          : 'rotate-90 scale-50 opacity-0',
      ].join(' ')}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 0 1 11.21 3c0-.34.02-.67.05-1A9 9 0 1 0 22 13c-.33.03-.66.05-1 .05Z" />
    </svg>
  )
}

function SunIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={[
        "absolute h-5 w-5 text-[rgb(var(--accent))]",
        'transition-all duration-500 ease-out',
        active
          ? 'rotate-0 scale-100 opacity-100'
          : '-rotate-90 scale-50 opacity-0',
      ].join(' ')}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const initial: Theme =
      stored === 'dark' || stored === 'light' ? stored : getSystemTheme()

    setTheme(initial)
    applyTheme(initial)
  }, [])

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-transparent outline-none transition-transform duration-300 hover:scale-110 hover:bg-white/10 active:scale-95"
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        <MoonIcon active={theme === 'light'} />
        <SunIcon active={theme === 'dark'} />
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_22px_rgba(255,255,255,0.08)] dark:group-hover:shadow-[0_0_22px_rgba(99,102,241,0.22)]" />
    </button>
  )
}