import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import ImageCarousel from '../components/ImageCarousel';
export default function Project() {
    const { slug } = useParams();
    const [state, setState] = useState({ kind: 'loading' });
    useEffect(() => {
        if (!slug)
            return;
        setState({ kind: 'loading' });
        fetch(`/api/projects/${slug}`)
            .then(async (r) => {
            if (r.status === 404) {
                setState({ kind: 'notfound' });
                return;
            }
            const data = await r.json();
            setState({ kind: 'loaded', project: data });
        })
            .catch(() => setState({ kind: 'notfound' }));
    }, [slug]);
    if (state.kind === 'loading') {
        return _jsx("section", { className: "mx-auto max-w-5xl px-4 py-14", children: _jsx("p", { children: "Loading\u2026" }) });
    }
    if (state.kind === 'notfound') {
        return _jsx("section", { className: "mx-auto max-w-5xl px-4 py-14", children: _jsx("p", { children: "Project not found." }) });
    }
    const project = state.project;
    return (_jsxs("section", { className: "mx-auto max-w-5xl px-4 py-14", children: [_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: project.title }), _jsx("p", { className: "mt-2 text-sm text-zinc-600 dark:text-zinc-400", children: project.summary })] }), _jsxs("div", { className: "flex items-center gap-2", children: [project.status ? (_jsx("span", { className: "rounded-full bg-white/[0.10] px-3 py-1 text-xs text-zinc-700 backdrop-blur-2xl dark:bg-white/[0.06] dark:text-zinc-300", children: project.status })) : null, project.date ? (_jsx("span", { className: "rounded-full bg-white/[0.10] px-3 py-1 text-xs text-zinc-700 backdrop-blur-2xl dark:bg-white/[0.06] dark:text-zinc-300", children: project.date })) : null] })] }), project.images?.length ? (_jsx("div", { className: "mt-8", children: _jsx(ImageCarousel, { images: project.images }) })) : null, _jsx(Card, { className: "mt-8", children: _jsxs("div", { className: "prose dark:prose-invert", children: [_jsx("h2", { children: "Description" }), _jsx("p", { children: project.description }), project.links?.length ? (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Links" }), _jsx("ul", { children: project.links.map((l) => (_jsx("li", { children: _jsx("a", { className: "text-accent", href: l.url, target: "_blank", rel: "noreferrer", children: l.label }) }, l.url))) })] })) : null, project.downloads?.length ? (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Downloads" }), _jsx("ul", { children: project.downloads.map((d) => (_jsx("li", { children: _jsx("a", { className: "text-accent", href: d.url, target: "_blank", rel: "noreferrer", children: d.label }) }, d.url))) })] })) : null, project.contact?.length ? (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Contact" }), _jsx("ul", { children: project.contact.map((c) => (_jsx("li", { children: _jsx("a", { className: "text-accent", href: c.href, children: c.label }) }, c.href))) })] })) : null, _jsx("h3", { children: "Tags" }), _jsx("p", { children: project.tags.map((t) => (_jsx("span", { className: "mr-2 inline-block rounded bg-white/[0.10] px-2 py-0.5 text-xs dark:bg-white/[0.06]", children: t }, t))) })] }) })] }));
}
