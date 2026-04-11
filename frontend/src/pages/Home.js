import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SocialTags from '../components/SocialTags';
import cvPdf from '../lib/Benjamin_Nemeth_CV.pdf';
function ProjectCarousel() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        let cancelled = false;
        async function loadProjects() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('/api/projects');
                if (!res.ok)
                    throw new Error('Failed to load projects');
                const data = (await res.json());
                if (!cancelled)
                    setProjects(data);
            }
            catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load projects');
                }
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        }
        loadProjects();
        return () => {
            cancelled = true;
        };
    }, []);
    const featured = projects.slice(0, 5);
    const maxIndex = Math.max(0, featured.length - 1);
    function prev() {
        setIndex((i) => Math.max(0, i - 1));
    }
    function next() {
        setIndex((i) => Math.min(maxIndex, i + 1));
    }
    return (_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Featured Projects" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { to: "/projects", className: "text-sm text-accent hover:underline", children: "View all" }), _jsxs("div", { className: "hidden md:flex gap-2", children: [_jsx("button", { type: "button", onClick: prev, disabled: index === 0, className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm disabled:opacity-40 dark:bg-white/10", children: "\u2190" }), _jsx("button", { type: "button", onClick: next, disabled: index === maxIndex, className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm disabled:opacity-40 dark:bg-white/10", children: "\u2192" })] })] })] }), loading ? (_jsx("p", { className: "text-sm text-zinc-500", children: "Loading projects..." })) : error ? (_jsx("p", { className: "text-sm text-red-500", children: error })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex gap-4 overflow-x-auto pb-2 md:hidden", children: featured.map((project) => (_jsx(Link, { to: `/projects/${project.slug}`, className: "min-w-[220px] shrink-0", children: _jsxs(Card, { className: "h-full p-4", children: [_jsx("div", { className: "aspect-[16/9] overflow-hidden rounded-2xl bg-white/20 dark:bg-white/10", children: project.images?.[0]?.src ? (_jsx("img", { src: project.images[0].src, alt: project.images[0].alt || project.title, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center text-sm text-zinc-500", children: "Project image" })) }), _jsx("h3", { className: "mt-3 text-base font-semibold", children: project.title }), _jsx("p", { className: "mt-2 text-sm text-zinc-700 dark:text-zinc-300", children: project.summary })] }) }, project.slug))) }), _jsx("div", { className: "hidden overflow-hidden md:block", children: _jsx("div", { className: "flex gap-4 transition-transform duration-300 ease-out", style: { transform: `translateX(-${index * 244}px)` }, children: featured.map((project) => (_jsx(Link, { to: `/projects/${project.slug}`, className: "w-[228px] shrink-0", children: _jsxs(Card, { className: "h-full p-4", children: [_jsx("div", { className: "aspect-[16/9] overflow-hidden rounded-2xl bg-white/20 dark:bg-white/10", children: project.images?.[0]?.src ? (_jsx("img", { src: project.images[0].src, alt: project.images[0].alt || project.title, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center text-sm text-zinc-500", children: "Project image" })) }), _jsx("h3", { className: "mt-3 text-base font-semibold", children: project.title }), _jsx("p", { className: "mt-2 text-sm text-zinc-700 dark:text-zinc-300", children: project.summary })] }) }, project.slug))) }) })] }))] }));
}
export default function Home() {
    return (_jsxs("section", { className: "mx-auto max-w-6xl px-4 py-14", children: [_jsxs("div", { className: "grid grid-cols-1 gap-6 xl:grid-cols-3", children: [_jsxs(Card, { className: "p-8 xl:col-span-2", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-zinc-500", children: "Portfolio" }), _jsx("h1", { className: "mt-3 text-4xl font-bold tracking-tight md:text-5xl", children: "Benjamin Jarlsson Nemeth" }), _jsx("p", { className: "mt-4 max-w-2xl text-zinc-700 dark:text-zinc-300", children: "I build systems that connect engineering, software, and intelligent behavior. My focus is on creating thoughtful, scalable solutions that combine theory with practical implementation." }), _jsx("div", { className: "mt-6", children: _jsx(SocialTags, {}) })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Who am I?" }), _jsx("p", { className: "mt-3 text-zinc-700 dark:text-zinc-300", children: "I\u2019m an Electrical Engineering student at DTU with strong interests in software, AI, robotics, and systems design. I enjoy building projects where multiple fields come together into one coherent system." }), _jsxs("div", { className: "mt-5 flex flex-wrap gap-4", children: [_jsx(Link, { to: "/about", className: "text-sm text-accent hover:underline", children: "Read more about me" }), _jsx("a", { href: cvPdf, download: "Benjamin_Nemeth_CV.pdf", className: "text-sm text-accent hover:underline", children: "Download CV" })] })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "About" }), _jsx("p", { className: "mt-3 text-zinc-700 dark:text-zinc-300", children: "Learn more about my background, interests, technical focus areas, and long-term vision." }), _jsx(Link, { to: "/about", className: "mt-5 inline-block text-sm text-accent hover:underline", children: "Go to About" })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Projects" }), _jsx("p", { className: "mt-3 text-zinc-700 dark:text-zinc-300", children: "Explore the projects I\u2019ve built, the systems I\u2019m working on, and the ideas I\u2019m testing across hardware, software, and design." }), _jsx(Link, { to: "/projects", className: "mt-5 inline-block text-sm text-accent hover:underline", children: "Browse projects" })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Why contact?" }), _jsx("p", { className: "mt-3 text-zinc-700 dark:text-zinc-300", children: "Reach out if you want to collaborate, discuss ideas, explore technical work, or connect around engineering, AI, systems, or product-building." }), _jsx(Link, { to: "/contact", className: "mt-5 inline-block text-sm text-accent hover:underline", children: "Go to Contact" })] })] }), _jsx("div", { className: "mt-6", children: _jsx(ProjectCarousel, {}) })] }));
}
