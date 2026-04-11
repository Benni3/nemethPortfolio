import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import TagSelect from '../components/TagSelect';
function countTags(projects) {
    const counts = {};
    for (const p of projects) {
        for (const t of p.tags)
            counts[t] = (counts[t] ?? 0) + 1;
    }
    return counts;
}
export default function Projects() {
    const [projects, setProjects] = useState(null);
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        fetch('/api/projects')
            .then(r => r.json())
            .then(setProjects)
            .catch(() => setProjects([]));
    }, []);
    const tagCounts = useMemo(() => countTags(projects ?? []), [projects]);
    const allTags = useMemo(() => {
        return Object.keys(tagCounts).sort((a, b) => (tagCounts[b] ?? 0) - (tagCounts[a] ?? 0) || a.localeCompare(b));
    }, [tagCounts]);
    const filtered = useMemo(() => {
        const list = projects ?? [];
        if (!selected.length)
            return list;
        return list.filter((p) => selected.every((t) => p.tags.includes(t)));
    }, [projects, selected]);
    function toggleTag(tag) {
        setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    }
    return (_jsxs("section", { className: "mx-auto max-w-5xl px-4 py-14", children: [_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Projects" }), _jsxs("p", { className: "mt-2 text-sm text-zinc-600 dark:text-zinc-400", children: [filtered.length, " project", filtered.length === 1 ? '' : 's'] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [allTags.slice(0, 6).map((t) => {
                                const on = selected.includes(t);
                                return (_jsxs("button", { type: "button", onClick: () => toggleTag(t), className: 'rounded-full px-3 py-1.5 text-sm backdrop-blur-2xl shadow-sm transition ' +
                                        (on
                                            ? 'bg-zinc-950/10 dark:bg-white/10'
                                            : 'bg-white/[0.10] hover:bg-white/[0.14] dark:bg-white/[0.05] dark:hover:bg-white/[0.07]'), children: [t, " ", _jsx("span", { className: "ml-1 text-xs text-zinc-500 dark:text-zinc-400", children: tagCounts[t] ?? 0 })] }, t));
                            }), allTags.length > 6 ? (_jsx(TagSelect, { allTags: allTags, selected: selected, counts: tagCounts, onToggle: toggleTag })) : null, selected.length ? (_jsx("button", { type: "button", onClick: () => setSelected([]), className: "rounded-full px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white", children: "Clear" })) : null] })] }), _jsx("div", { className: "grid sm:grid-cols-2 gap-6 mt-8", children: filtered.map((p) => (_jsx(ProjectCard, { project: p }, p.slug))) })] }));
}
