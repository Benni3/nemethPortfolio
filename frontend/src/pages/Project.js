import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import ImageCarousel from '../components/ImageCarousel';
/* 🔥 Normalize AND return safe type */
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
export default function Project() {
    const { slug } = useParams();
    const [state, setState] = useState({ kind: 'loading' });
    useEffect(() => {
        let cancelled = false;
        async function loadProject() {
            if (!slug) {
                setState({ kind: 'notfound' });
                return;
            }
            try {
                setState({ kind: 'loading' });
                const API_BASE = import.meta.env.VITE_API_BASE_URL;
                const res = await fetch(`${API_BASE}/api/projects`);
                if (!res.ok) {
                    setState({ kind: 'notfound' });
                    return;
                }
                const data = (await res.json());
                const found = data.find((p) => p.slug === slug);
                if (cancelled)
                    return;
                if (!found) {
                    setState({ kind: 'notfound' });
                    return;
                }
                setState({
                    kind: 'loaded',
                    project: normalizeProject(found),
                });
            }
            catch {
                if (!cancelled) {
                    setState({ kind: 'notfound' });
                }
            }
        }
        loadProject();
        return () => {
            cancelled = true;
        };
    }, [slug]);
    if (state.kind === 'loading') {
        return (_jsx("section", { className: "mx-auto max-w-5xl px-4 py-14", children: _jsx("p", { children: "Loading\u2026" }) }));
    }
    if (state.kind === 'notfound') {
        return (_jsx("section", { className: "mx-auto max-w-5xl px-4 py-14", children: _jsx("p", { children: "Project not found." }) }));
    }
    const project = state.project;
    return (_jsxs("section", { className: "mx-auto max-w-5xl px-4 py-14", children: [_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: project.title }), _jsx("p", { className: "mt-2 text-sm text-zinc-600 dark:text-zinc-400", children: project.summary })] }), _jsxs("div", { className: "flex items-center gap-2", children: [project.status && (_jsx("span", { className: "rounded-full bg-white/[0.10] px-3 py-1 text-xs", children: project.status })), project.date && (_jsx("span", { className: "rounded-full bg-white/[0.10] px-3 py-1 text-xs", children: project.date }))] })] }), project.images.length > 0 && (_jsx("div", { className: "mt-8", children: _jsx(ImageCarousel, { images: project.images }) })), _jsx(Card, { className: "mt-8", children: _jsxs("div", { className: "prose dark:prose-invert", children: [_jsx("h2", { children: "Description" }), _jsx("p", { children: project.description }), project.links.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Links" }), _jsx("ul", { children: project.links.map((l) => (_jsx("li", { children: _jsx("a", { href: l.url, target: "_blank", rel: "noreferrer", className: "text-accent", children: l.label }) }, l.url))) })] })), project.downloads.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Downloads" }), _jsx("ul", { children: project.downloads.map((d) => (_jsx("li", { children: _jsx("a", { href: d.url, target: "_blank", rel: "noreferrer", className: "text-accent", children: d.label }) }, d.url))) })] })), project.contact.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Contact" }), _jsx("ul", { children: project.contact.map((c) => (_jsx("li", { children: _jsx("a", { href: c.href, className: "text-accent", children: c.label }) }, c.href))) })] })), project.tags.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Tags" }), _jsx("p", { children: project.tags.map((t) => (_jsx("span", { className: "mr-2 inline-block rounded bg-white/[0.10] px-2 py-0.5 text-xs", children: t }, t))) })] }))] }) })] }));
}
