import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import TagSelect from '../components/TagSelect';
function normalizeProject(project) {
    return {
        ...project,
        tags: project.tags ?? [],
        images: project.images ?? [],
        links: project.links ?? [],
        downloads: project.downloads ?? [],
        contact: project.contact ?? [],
    };
}
function countTags(projects) {
    const counts = {};
    for (const project of projects) {
        for (const tag of project.tags ?? []) {
            counts[tag] = (counts[tag] ?? 0) + 1;
        }
    }
    return counts;
}
export default function Projects() {
    const [projects, setProjects] = useState(null);
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        let cancelled = false;
        async function loadProjects() {
            try {
                const API_BASE = import.meta.env.VITE_API_BASE_URL;
                const res = await fetch(`${API_BASE}/api/projects`);
                if (!res.ok)
                    throw new Error('Failed to load projects');
                const data = (await res.json());
                if (!cancelled) {
                    setProjects(data.map(normalizeProject));
                }
            }
            catch {
                if (!cancelled) {
                    setProjects([]);
                }
            }
        }
        loadProjects();
        return () => {
            cancelled = true;
        };
    }, []);
    const tagCounts = useMemo(() => countTags(projects ?? []), [projects]);
    const allTags = useMemo(() => {
        return Object.keys(tagCounts).sort((a, b) => (tagCounts[b] ?? 0) - (tagCounts[a] ?? 0) || a.localeCompare(b));
    }, [tagCounts]);
    const filtered = useMemo(() => {
        const list = projects ?? [];
        if (!selected.length)
            return list;
        return list.filter((project) => selected.every((tag) => (project.tags ?? []).includes(tag)));
    }, [projects, selected]);
    function toggleTag(tag) {
        setSelected((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
    }
    return (_jsxs("section", { className: "mx-auto max-w-5xl px-4 py-14", children: [_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Projects" }), _jsxs("p", { className: "mt-2 text-sm text-zinc-600 dark:text-zinc-400", children: [filtered.length, " project", filtered.length === 1 ? '' : 's'] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [allTags.slice(0, 6).map((tag) => {
                                const active = selected.includes(tag);
                                return (_jsxs("button", { type: "button", onClick: () => toggleTag(tag), className: 'rounded-full px-3 py-1.5 text-sm backdrop-blur-2xl shadow-sm transition ' +
                                        (active
                                            ? 'bg-zinc-950/10 dark:bg-white/10'
                                            : 'bg-white/[0.10] hover:bg-white/[0.14] dark:bg-white/[0.05] dark:hover:bg-white/[0.07]'), children: [tag, _jsx("span", { className: "ml-1 text-xs text-zinc-500 dark:text-zinc-400", children: tagCounts[tag] ?? 0 })] }, tag));
                            }), allTags.length > 6 ? (_jsx(TagSelect, { allTags: allTags, selected: selected, counts: tagCounts, onToggle: toggleTag })) : null, selected.length ? (_jsx("button", { type: "button", onClick: () => setSelected([]), className: "rounded-full px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white", children: "Clear" })) : null] })] }), _jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2", children: filtered.map((project) => (_jsx(ProjectCard, { project: project }, project.slug))) })] }));
}
