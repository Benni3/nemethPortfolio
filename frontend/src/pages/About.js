import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from '../components/Card';
import aboutData from '../lib/about.json';
import cvPdf from '../lib/Benjamin_Nemeth_CV.pdf';
const data = aboutData;
function SectionTitle({ children }) {
    return _jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: children });
}
function ParagraphBlock({ section }) {
    return (_jsxs(Card, { className: "p-6", children: [_jsx(SectionTitle, { children: section.title }), _jsx("p", { className: "mt-3 leading-7 text-zinc-700 dark:text-zinc-300", children: section.content })] }));
}
function ListBlock({ section }) {
    return (_jsxs(Card, { className: "p-6", children: [_jsx(SectionTitle, { children: section.title }), _jsx("ul", { className: "mt-4 space-y-3", children: section.items.map((item) => (_jsxs("li", { className: "flex gap-3 text-zinc-700 dark:text-zinc-300", children: [_jsx("span", { className: "mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" }), _jsx("span", { children: item })] }, item))) })] }));
}
function TimelineBlock({ section }) {
    return (_jsxs(Card, { className: "p-6", children: [_jsx(SectionTitle, { children: section.title }), _jsx("div", { className: "mt-5 space-y-5", children: section.items.map((item, index) => (_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "h-3 w-3 rounded-full bg-accent" }), index < section.items.length - 1 && (_jsx("div", { className: "mt-2 w-px flex-1 bg-zinc-300 dark:bg-zinc-700" }))] }), _jsxs("div", { className: "pb-2", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-zinc-500", children: item.label }), _jsx("h3", { className: "text-lg font-medium", children: item.title }), _jsx("p", { className: "mt-1 text-zinc-700 dark:text-zinc-300", children: item.description })] })] }, `${item.label}-${item.title}-${index}`))) })] }));
}
function SkillsBlock({ section }) {
    return (_jsxs(Card, { className: "p-6", children: [_jsx(SectionTitle, { children: section.title }), _jsx("div", { className: "mt-5 space-y-4", children: section.items.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-zinc-700 dark:text-zinc-300", children: item.label }), _jsxs("span", { className: "text-zinc-500", children: [item.value, "%"] })] }), _jsx("div", { className: "h-2 rounded-full bg-white/20 dark:bg-white/10", children: _jsx("div", { className: "h-2 rounded-full bg-accent transition-all duration-500", style: { width: `${item.value}%` } }) })] }, item.label))) })] }));
}
function RenderSection({ section }) {
    switch (section.type) {
        case 'paragraph':
            return _jsx(ParagraphBlock, { section: section });
        case 'list':
            return _jsx(ListBlock, { section: section });
        case 'timeline':
            return _jsx(TimelineBlock, { section: section });
        case 'skills':
            return _jsx(SkillsBlock, { section: section });
        default:
            return null;
    }
}
export default function About() {
    return (_jsxs("section", { className: "mx-auto max-w-6xl px-4 py-14", children: [_jsxs("div", { className: "mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold tracking-tight", children: data.title }), data.intro && (_jsx("p", { className: "mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300", children: data.intro }))] }), _jsx("a", { href: cvPdf, download: "Benjamin_Nemeth_CV.pdf", className: "inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-90", children: "Download CV" })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", children: data.sections.map((section, index) => (_jsx(RenderSection, { section: section }, `${section.type}-${index}`))) })] }));
}
