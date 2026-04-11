import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SOCIAL_LINKS } from '../lib/socials';
function Icon({ kind }) {
    if (kind === 'mail') {
        return (_jsxs("svg", { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "none", stroke: "currentColor", strokeWidth: 2, children: [_jsx("path", { d: "M4 6h16v12H4z" }), _jsx("path", { d: "m4 7 8 6 8-6" })] }));
    }
    if (kind === 'github') {
        return (_jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "currentColor", children: _jsx("path", { d: "M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.19 1.19a11.1 11.1 0 0 1 5.81 0c2.21-1.5 3.18-1.19 3.18-1.19.64 1.59.24 2.76.12 3.05.74.81 1.19 1.85 1.19 3.11 0 4.45-2.69 5.42-5.26 5.71.41.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35 0.5 12 0.5Z" }) }));
    }
    return (_jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "currentColor", children: _jsx("path", { d: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 8.5H4.5V23.5H.5V8.5ZM8.5 8.5H12.3V10.6H12.35C12.88 9.6 14.2 8.55 16.15 8.55 20.2 8.55 21 11.05 21 15.3V23.5H17V16.15C17 14.4 16.95 12.15 14.55 12.15 12.1 12.15 11.75 14.05 11.75 16.05V23.5H7.75V8.5H8.5Z" }) }));
}
export default function SocialTags({ className = '' }) {
    return (_jsx("div", { className: ['-mx-4 mt-5', className].join(' '), children: _jsx("div", { className: "flex gap-3 overflow-x-auto px-4 pb-2 [-webkit-overflow-scrolling:touch]", children: SOCIAL_LINKS.map((s) => (_jsx("a", { href: s.href, "aria-label": s.title, className: "group shrink-0", children: _jsxs("div", { className: "\n                relative flex h-12 w-12 items-center justify-center rounded-2xl\n                bg-white/[0.10] dark:bg-white/[0.05]\n                backdrop-blur-2xl\n                shadow-sm\n                text-zinc-800 transition-all duration-200\n                hover:bg-white/[0.14] hover:text-zinc-950\n                dark:text-zinc-200 dark:hover:bg-white/[0.07] dark:hover:text-white\n              ", children: [_jsx("div", { className: "transition-opacity duration-150 group-hover:opacity-0", children: _jsx(Icon, { kind: s.kind }) }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100", children: _jsx("span", { className: "px-2 text-[11px] font-medium tracking-tight", children: s.title }) })] }) }, s.kind))) }) }));
}
