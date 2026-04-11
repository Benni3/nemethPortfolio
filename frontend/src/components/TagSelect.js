import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
export default function TagSelect({ allTags, selected, counts, onToggle, className = '', }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return allTags;
        return allTags.filter((t) => t.toLowerCase().includes(q));
    }, [allTags, query]);
    return (_jsxs("div", { className: ['relative', className].join(' '), children: [_jsx("button", { type: "button", onClick: () => setOpen((v) => !v), className: "rounded-full bg-white/[0.10] px-3 py-1.5 text-sm backdrop-blur-2xl shadow-sm hover:bg-white/[0.14] dark:bg-white/[0.05] dark:hover:bg-white/[0.07]", children: "Tags" }), open && (_jsxs("div", { className: "absolute z-20 mt-2 w-64 rounded-2xl bg-white/70 p-2 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:bg-black/50 dark:ring-white/10", children: [_jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search tags\u2026", className: "w-full rounded-xl bg-white/60 px-3 py-2 text-sm outline-none ring-1 ring-zinc-200/60 focus:ring-zinc-300/70 dark:bg-black/40 dark:ring-zinc-800/60 dark:focus:ring-zinc-700/70" }), _jsx("div", { className: "mt-2 max-h-56 overflow-auto", children: filtered.map((tag) => {
                            const isOn = selected.includes(tag);
                            return (_jsxs("button", { type: "button", onClick: () => onToggle(tag), className: 'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ' +
                                    (isOn
                                        ? 'bg-zinc-950/10 dark:bg-white/10'
                                        : 'hover:bg-zinc-950/5 dark:hover:bg-white/5'), children: [_jsx("span", { className: "truncate", children: tag }), _jsx("span", { className: "ml-3 text-xs text-zinc-500 dark:text-zinc-400", children: counts[tag] ?? 0 })] }, tag));
                        }) })] }))] }));
}
