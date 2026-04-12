import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import Card from '../components/Card';
import aboutData from '../lib/about.json';
import cvPdf from '../lib/Benjamin_Nemeth_CV.pdf';
const data = aboutData;
function SectionTitle({ children }) {
    return _jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: children });
}
function needsShowMore(section) {
    switch (section.type) {
        case 'paragraph':
            return section.content.length > 180;
        case 'list':
            return section.items.length > 4;
        case 'timeline':
            return section.items.length > 2;
        case 'skills':
            return section.items.length > 4;
        default:
            return false;
    }
}
function clampParagraph(text) {
    if (text.length <= 180)
        return text;
    return `${text.slice(0, 180).trim()}…`;
}
function ParagraphPreview({ section }) {
    return (_jsx("p", { className: "mt-3 leading-7 text-zinc-700 dark:text-zinc-300", children: clampParagraph(section.content) }));
}
function ParagraphFull({ section }) {
    return (_jsx("p", { className: "mt-3 leading-7 text-zinc-700 dark:text-zinc-300", children: section.content }));
}
function ListPreview({ section }) {
    const items = section.items.slice(0, 4);
    return (_jsx("ul", { className: "mt-4 space-y-3", children: items.map((item) => (_jsxs("li", { className: "flex gap-3 text-zinc-700 dark:text-zinc-300", children: [_jsx("span", { className: "mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" }), _jsx("span", { children: item })] }, item))) }));
}
function ListFull({ section }) {
    return (_jsx("ul", { className: "mt-4 space-y-3", children: section.items.map((item) => (_jsxs("li", { className: "flex gap-3 text-zinc-700 dark:text-zinc-300", children: [_jsx("span", { className: "mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" }), _jsx("span", { children: item })] }, item))) }));
}
function TimelinePreview({ section }) {
    const items = section.items.slice(0, 2);
    return (_jsx("div", { className: "mt-5 space-y-5", children: items.map((item, index) => (_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "h-3 w-3 rounded-full bg-accent" }), index < items.length - 1 && (_jsx("div", { className: "mt-2 w-px flex-1 bg-zinc-300 dark:bg-zinc-700" }))] }), _jsxs("div", { className: "pb-2", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-zinc-500", children: item.label }), _jsx("h3", { className: "text-lg font-medium", children: item.title }), _jsx("p", { className: "mt-1 text-zinc-700 dark:text-zinc-300", children: item.description })] })] }, `${item.label}-${item.title}-${index}`))) }));
}
function TimelineFull({ section }) {
    return (_jsx("div", { className: "mt-5 space-y-6", children: section.items.map((item, index) => (_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "h-3 w-3 rounded-full bg-accent" }), index < section.items.length - 1 && (_jsx("div", { className: "mt-2 w-px flex-1 bg-zinc-300 dark:bg-zinc-700" }))] }), _jsxs("div", { className: "pb-2", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-zinc-500", children: item.label }), _jsx("h3", { className: "text-lg font-medium", children: item.title }), _jsx("p", { className: "mt-1 text-zinc-700 dark:text-zinc-300", children: item.description }), item.links?.length ? (_jsx("div", { className: "mt-3 flex flex-wrap gap-3", children: item.links.map((link) => (_jsx("a", { href: link.url, target: link.url.startsWith('http') ? '_blank' : undefined, rel: link.url.startsWith('http') ? 'noreferrer' : undefined, className: "text-sm text-accent hover:underline", children: link.label }, `${item.title}-${link.url}`))) })) : null] })] }, `${item.label}-${item.title}-${index}`))) }));
}
function SkillsPreview({ section }) {
    const items = section.items.slice(0, 4);
    return (_jsx("div", { className: "mt-5 space-y-4", children: items.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-zinc-700 dark:text-zinc-300", children: item.label }), _jsxs("span", { className: "text-zinc-500", children: [item.value, "%"] })] }), _jsx("div", { className: "h-2 rounded-full bg-white/20 dark:bg-white/10", children: _jsx("div", { className: "h-2 rounded-full bg-accent transition-all duration-500", style: { width: `${item.value}%` } }) })] }, item.label))) }));
}
function SkillsFull({ section }) {
    return (_jsx("div", { className: "mt-5 space-y-4", children: section.items.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-zinc-700 dark:text-zinc-300", children: item.label }), _jsxs("span", { className: "text-zinc-500", children: [item.value, "%"] })] }), _jsx("div", { className: "h-2 rounded-full bg-white/20 dark:bg-white/10", children: _jsx("div", { className: "h-2 rounded-full bg-accent transition-all duration-500", style: { width: `${item.value}%` } }) })] }, item.label))) }));
}
function SectionPreview({ section, onOpen, }) {
    const showMore = needsShowMore(section);
    return (_jsxs(Card, { className: "group relative h-full p-6", children: [_jsx(SectionTitle, { children: section.title }), section.type === 'paragraph' && _jsx(ParagraphPreview, { section: section }), section.type === 'list' && _jsx(ListPreview, { section: section }), section.type === 'timeline' && _jsx(TimelinePreview, { section: section }), section.type === 'skills' && _jsx(SkillsPreview, { section: section }), showMore ? (_jsx("div", { className: "mt-5", children: _jsx("button", { type: "button", onClick: onOpen, className: "rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-700 transition hover:bg-white/10 dark:text-zinc-200", children: "Show more" }) })) : null, showMore ? (_jsx("div", { className: "pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" })) : null] }));
}
function SectionModal({ section, onClose, }) {
    return (_jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [_jsx("button", { type: "button", "aria-label": "Close modal", onClick: onClose, className: "absolute inset-0 bg-black/30 backdrop-blur-md" }), _jsxs(Card, { className: "relative z-[101] max-h-[85vh] w-full max-w-3xl overflow-y-auto p-8", children: [_jsxs("div", { className: "mb-6 flex items-start justify-between gap-4", children: [_jsx(SectionTitle, { children: section.title }), _jsx("button", { type: "button", onClick: onClose, className: "rounded-full border border-white/20 px-3 py-1 text-sm text-zinc-700 transition hover:bg-white/10 dark:text-zinc-200", children: "Close" })] }), section.type === 'paragraph' && _jsx(ParagraphFull, { section: section }), section.type === 'list' && _jsx(ListFull, { section: section }), section.type === 'timeline' && _jsx(TimelineFull, { section: section }), section.type === 'skills' && _jsx(SkillsFull, { section: section })] })] }));
}
export default function About() {
    const [modal, setModal] = useState({ open: false, section: null });
    const openSection = (section) => {
        setModal({ open: true, section });
    };
    const closeSection = () => {
        setModal({ open: false, section: null });
    };
    const hasModal = useMemo(() => modal.open && modal.section, [modal]);
    return (_jsxs("section", { className: "mx-auto max-w-6xl px-4 py-14", children: [_jsxs("div", { className: "mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold tracking-tight", children: data.title }), data.intro && (_jsx("p", { className: "mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300", children: data.intro }))] }), _jsx("a", { href: cvPdf, download: "Benjamin_Nemeth_CV.pdf", className: "inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-90", children: "Download CV" })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", children: data.sections.map((section, index) => (_jsx(SectionPreview, { section: section, onOpen: () => openSection(section) }, `${section.type}-${index}`))) }), hasModal ? (_jsx(SectionModal, { section: modal.section, onClose: closeSection })) : null] }));
}
