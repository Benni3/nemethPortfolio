import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}
function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
}
export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const initial = stored === 'dark' || stored === 'light' ? stored : getSystemTheme();
        setTheme(initial);
        applyTheme(initial);
    }, []);
    useEffect(() => {
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    return (_jsx("button", { type: "button", onClick: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')), className: "px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-xs", children: theme === 'dark' ? 'Dark' : 'Light' }));
}
