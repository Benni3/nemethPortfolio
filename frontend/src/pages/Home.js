import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SocialTags from '../components/SocialTags';
import cvPdf from '../lib/Benjamin_Nemeth_CV.pdf';
import homeContent from '../lib/home.json';
const content = homeContent;
function SectionTitle({ children }) {
    return _jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: children });
}
function clampText(text, max = 180) {
    if (text.length <= max)
        return text;
    return `${text.slice(0, max).trim()}…`;
}
const PREVIEW_LIMITS = {
    paragraph: 100,
    list: 4,
    timeline: 2,
    skills: 4,
};
function needsShowMore(section) {
    switch (section.type) {
        case 'paragraph':
            return section.text.length > PREVIEW_LIMITS.paragraph;
        case 'list':
            return section.items.length > PREVIEW_LIMITS.list;
        case 'timeline':
            return section.items.length > PREVIEW_LIMITS.timeline;
        case 'skills':
            return section.items.length > PREVIEW_LIMITS.skills;
        default:
            return false;
    }
}
function isExternalUrl(url) {
    return url.startsWith('http');
}
function ActionLink({ label, url, className = '', }) {
    if (isExternalUrl(url)) {
        return (_jsx("a", { href: url, target: "_blank", rel: "noreferrer", className: className, children: label }));
    }
    return (_jsx(Link, { to: url, className: className, children: label }));
}
function ParagraphPreview({ section }) {
    return (_jsx("p", { className: "mt-3 text-zinc-700 dark:text-zinc-300", children: clampText(section.text) }));
}
function ParagraphFull({ section }) {
    return (_jsx("p", { className: "mt-3 leading-7 text-zinc-700 dark:text-zinc-300", children: section.text }));
}
function ListPreview({ section }) {
    return (_jsx("ul", { className: "mt-4 space-y-3", children: section.items.slice(0, 4).map((item) => (_jsxs("li", { className: "flex gap-3 text-zinc-700 dark:text-zinc-300", children: [_jsx("span", { className: "mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" }), _jsx("span", { children: item })] }, item))) }));
}
function ListFull({ section }) {
    return (_jsx("ul", { className: "mt-4 space-y-3", children: section.items.map((item) => (_jsxs("li", { className: "flex gap-3 text-zinc-700 dark:text-zinc-300", children: [_jsx("span", { className: "mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" }), _jsx("span", { children: item })] }, item))) }));
}
function TimelinePreview({ section }) {
    return (_jsx("div", { className: "mt-5 space-y-5 max-h-[220px] overflow-hidden", children: section.items
            .slice(0, PREVIEW_LIMITS.timeline)
            .map((item, index) => (_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "h-3 w-3 rounded-full bg-accent" }), index < PREVIEW_LIMITS.timeline - 1 && (_jsx("div", { className: "mt-2 w-px flex-1 bg-zinc-300 dark:bg-zinc-700" }))] }), _jsxs("div", { className: "pb-2", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-zinc-500", children: item.label }), _jsx("h3", { className: "text-lg font-medium", children: item.title }), _jsx("p", { className: "mt-1 text-zinc-700 dark:text-zinc-300", children: clampText(item.description, 120) })] })] }, `${item.label}-${item.title}-${index}`))) }));
}
function TimelineFull({ section }) {
    return (_jsx("div", { className: "mt-5 space-y-6", children: section.items.map((item, index) => (_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "h-3 w-3 rounded-full bg-accent" }), index < section.items.length - 1 && (_jsx("div", { className: "mt-2 w-px flex-1 bg-zinc-300 dark:bg-zinc-700" }))] }), _jsxs("div", { className: "pb-2", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-zinc-500", children: item.label }), _jsx("h3", { className: "text-lg font-medium", children: item.title }), _jsx("p", { className: "mt-1 text-zinc-700 dark:text-zinc-300", children: item.description }), item.links?.length ? (_jsx("div", { className: "mt-3 flex flex-wrap gap-3", children: item.links.map((link) => (_jsx(ActionLink, { label: link.label, url: link.url, className: "text-sm text-accent hover:underline" }, `${item.title}-${link.label}-${link.url}`))) })) : null] })] }, `${item.label}-${item.title}-${index}`))) }));
}
function SkillsPreview({ section }) {
    return (_jsx("div", { className: "mt-5 space-y-4", children: section.items.slice(0, 4).map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-zinc-700 dark:text-zinc-300", children: item.label }), _jsxs("span", { className: "text-zinc-500", children: [item.value, "%"] })] }), _jsx("div", { className: "h-2 rounded-full bg-white/20 dark:bg-white/10", children: _jsx("div", { className: "h-2 rounded-full bg-accent transition-all duration-500", style: { width: `${item.value}%` } }) })] }, item.label))) }));
}
function SkillsFull({ section }) {
    return (_jsx("div", { className: "mt-5 space-y-4", children: section.items.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-zinc-700 dark:text-zinc-300", children: item.label }), _jsxs("span", { className: "text-zinc-500", children: [item.value, "%"] })] }), _jsx("div", { className: "h-2 rounded-full bg-white/20 dark:bg-white/10", children: _jsx("div", { className: "h-2 rounded-full bg-accent transition-all duration-500", style: { width: `${item.value}%` } }) })] }, item.label))) }));
}
function HomeSectionPreview({ section, onOpen, }) {
    const showMore = needsShowMore(section);
    return (_jsxs(Card, { className: "group relative h-full p-6", children: [_jsx(SectionTitle, { children: section.title }), section.type === 'paragraph' && _jsx(ParagraphPreview, { section: section }), section.type === 'list' && _jsx(ListPreview, { section: section }), section.type === 'timeline' && _jsx(TimelinePreview, { section: section }), section.type === 'skills' && _jsx(SkillsPreview, { section: section }), _jsxs("div", { className: "mt-5 flex flex-wrap gap-4", children: ['ctaLabel' in section && section.ctaLabel && section.ctaUrl ? (_jsx(ActionLink, { label: section.ctaLabel, url: section.ctaUrl, className: "text-sm text-accent hover:underline" })) : null, showMore ? (_jsx("button", { type: "button", onClick: onOpen, className: "rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-700 transition hover:bg-white/10 dark:text-zinc-200", children: "Show more" })) : null] }), showMore ? (_jsx("div", { className: "pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" })) : null] }));
}
function HomeSectionModal({ section, onClose, }) {
    return (_jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [_jsx("button", { type: "button", "aria-label": "Close modal", onClick: onClose, className: "absolute inset-0 bg-black/30 backdrop-blur-md" }), _jsxs(Card, { className: "relative z-[101] max-h-[85vh] w-full max-w-3xl overflow-y-auto p-8", children: [_jsxs("div", { className: "mb-6 flex items-start justify-between gap-4", children: [_jsx(SectionTitle, { children: section.title }), _jsx("button", { type: "button", onClick: onClose, className: "rounded-full border border-white/20 px-3 py-1 text-sm text-zinc-700 transition hover:bg-white/10 dark:text-zinc-200", children: "Close" })] }), section.type === 'paragraph' && _jsx(ParagraphFull, { section: section }), section.type === 'list' && _jsx(ListFull, { section: section }), section.type === 'timeline' && _jsx(TimelineFull, { section: section }), section.type === 'skills' && _jsx(SkillsFull, { section: section }), 'ctaLabel' in section && section.ctaLabel && section.ctaUrl ? (_jsx("div", { className: "mt-6", children: _jsx(ActionLink, { label: section.ctaLabel, url: section.ctaUrl, className: "text-sm text-accent hover:underline" }) })) : null] })] }));
}
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
                const API_BASE = import.meta.env.VITE_API_BASE_URL;
                const res = await fetch(`${API_BASE}/api/projects`);
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
    return (_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Featured Projects" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { to: "/projects", className: "text-sm text-accent hover:underline", children: "View all" }), _jsxs("div", { className: "hidden gap-2 md:flex", children: [_jsx("button", { type: "button", onClick: prev, disabled: index === 0, className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm disabled:opacity-40 dark:bg-white/10", children: "\u2190" }), _jsx("button", { type: "button", onClick: next, disabled: index === maxIndex, className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm disabled:opacity-40 dark:bg-white/10", children: "\u2192" })] })] })] }), loading ? (_jsx("p", { className: "text-sm text-zinc-500", children: "Loading projects..." })) : error ? (_jsx("p", { className: "text-sm text-red-500", children: error })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex gap-4 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory", children: featured.map((project) => (_jsx(Link, { to: `/projects/${project.slug}`, className: "w-[75vw] max-w-[260px] min-w-[220px] shrink-0 snap-start", children: _jsxs(Card, { className: "h-full p-4", children: [_jsx("div", { className: "overflow-hidden rounded-2xl bg-white/20 dark:bg-white/10", children: _jsx("div", { className: "h-36 w-full", children: project.images?.[0]?.src ? (_jsx("img", { src: project.images[0].src, alt: project.images[0].alt || project.title, className: "h-full w-full object-cover object-center" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center text-sm text-zinc-500", children: "Project image" })) }) }), _jsx("h3", { className: "mt-3 text-base font-semibold", children: project.title }), _jsx("p", { className: "mt-2 line-clamp-3 text-sm text-zinc-700 dark:text-zinc-300", children: project.summary })] }) }, project.slug))) }), _jsx("div", { className: "hidden overflow-hidden md:block", children: _jsx("div", { className: "flex gap-4 transition-transform duration-300 ease-out", style: { transform: `translateX(-${index * 244}px)` }, children: featured.map((project) => (_jsx(Link, { to: `/projects/${project.slug}`, className: "w-[228px] shrink-0", children: _jsxs(Card, { className: "h-full p-4", children: [_jsx("div", { className: "overflow-hidden rounded-2xl bg-white/20 dark:bg-white/10", children: _jsx("div", { className: "aspect-[16/9] w-full", children: project.images?.[0]?.src ? (_jsx("img", { src: project.images[0].src, alt: project.images[0].alt || project.title, className: "h-full w-full object-cover object-center", loading: "lazy" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center text-sm text-zinc-500", children: "Project image" })) }) }), _jsx("h3", { className: "mt-3 text-base font-semibold", children: project.title }), _jsx("p", { className: "mt-2 text-sm text-zinc-700 dark:text-zinc-300", children: project.summary })] }) }, project.slug))) }) })] }))] }));
}
export default function Home() {
    const [modal, setModal] = useState({ open: false, section: null });
    const openSection = (section) => {
        setModal({ open: true, section });
    };
    const closeSection = () => {
        setModal({ open: false, section: null });
    };
    const hasModal = useMemo(() => modal.open && modal.section, [modal]);
    return (_jsxs("section", { className: "mx-auto max-w-6xl px-4 py-14", children: [_jsxs("div", { className: "grid grid-cols-1 gap-6 xl:grid-cols-3", children: [_jsxs(Card, { className: "p-8 xl:col-span-2", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-zinc-500", children: content.hero.tag }), _jsx("h1", { className: "mt-3 text-4xl font-bold tracking-tight md:text-5xl", children: content.hero.name }), _jsx("p", { className: "mt-4 max-w-2xl text-zinc-700 dark:text-zinc-300", children: content.hero.description }), _jsx("div", { className: "mt-6", children: _jsx(SocialTags, {}) })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Who am I?" }), _jsx("p", { className: "mt-3 text-zinc-700 dark:text-zinc-300", children: "Explore the short version of who I am, what I build, and what I\u2019m aiming toward." }), _jsxs("div", { className: "mt-5 flex flex-wrap gap-4", children: [_jsx(Link, { to: "/about", className: "text-sm text-accent hover:underline", children: "Read more about me" }), _jsx("a", { href: cvPdf, download: "Benjamin_Nemeth_CV.pdf", className: "text-sm text-accent hover:underline", children: "Download CV" })] })] }), content.sections.slice(0, 6).map((section, index) => (_jsx(HomeSectionPreview, { section: section, onOpen: () => openSection(section) }, `${section.type}-${section.title}-${index}`))), _jsx("div", { className: "xl:col-span-3", children: _jsx(ProjectCarousel, {}) }), content.sections.slice(6).map((section, index) => (_jsx(HomeSectionPreview, { section: section, onOpen: () => openSection(section) }, `${section.type}-${section.title}-${index + 6}`)))] }), hasModal ? (_jsx(HomeSectionModal, { section: modal.section, onClose: closeSection })) : null] }));
}
