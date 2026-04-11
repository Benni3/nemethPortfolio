import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import Card from './Card';
import ImageCarousel from './ImageCarousel';
export default function ProjectCard({ project }) {
    return (_jsx(Link, { to: `/projects/${project.slug}`, className: "block", children: _jsxs(Card, { className: "p-0 overflow-hidden", children: [project.images?.length ? (_jsx(ImageCarousel, { images: project.images, className: "rounded-none", aspect: "aspect-[16/10]" })) : null, _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("h2", { className: "font-semibold leading-snug", children: project.title }), project.status ? (_jsx("span", { className: "shrink-0 rounded-full bg-white/[0.10] px-2 py-0.5 text-[11px] text-zinc-700 backdrop-blur dark:bg-white/[0.06] dark:text-zinc-300", children: project.status })) : null] }), _jsx("p", { className: "mt-2 text-sm text-zinc-600 dark:text-zinc-400", children: project.summary }), _jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: project.tags.slice(0, 6).map((t) => (_jsx("span", { className: "text-xs px-2 py-0.5 rounded bg-white/[0.10] dark:bg-white/[0.06] backdrop-blur", children: t }, t))) })] })] }) }));
}
