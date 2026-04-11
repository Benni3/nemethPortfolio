import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Card({ className = '', children }) {
    return (_jsxs("div", { className: [
            'relative overflow-hidden rounded-3xl',
            'bg-white/[0.35] dark:bg-white/[0.08]',
            'backdrop-blur-xl backdrop-saturate-150',
            'border border-white/40 dark:border-white/10',
            'shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)]',
            'transition-all duration-300',
            'hover:-translate-y-1',
            className,
        ].join(' '), children: [_jsx("div", { className: "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/35 to-white/10 dark:from-white/10 dark:to-transparent" }), _jsx("div", { className: "relative p-6", children: children })] }));
}
