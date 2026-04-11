import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId, useState } from 'react';
export default function ImageCarousel({ images, className = '', aspect = 'aspect-video', }) {
    const [idx, setIdx] = useState(0);
    const id = useId();
    if (!images.length)
        return null;
    const current = images[Math.min(idx, images.length - 1)];
    const canPrev = images.length > 1;
    return (_jsxs("div", { className: ['relative overflow-hidden rounded-2xl', className].join(' '), children: [_jsxs("div", { className: ['relative w-full', aspect].join(' '), children: [_jsx("img", { src: current.src, alt: current.alt ?? '', className: "absolute inset-0 h-full w-full object-cover", loading: "lazy" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" })] }), canPrev && (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", "aria-controls": id, "aria-label": "Previous image", onClick: () => setIdx((i) => (i - 1 + images.length) % images.length), className: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-2 py-1 text-white backdrop-blur hover:bg-black/45", children: "\u2039" }), _jsx("button", { type: "button", "aria-controls": id, "aria-label": "Next image", onClick: () => setIdx((i) => (i + 1) % images.length), className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-2 py-1 text-white backdrop-blur hover:bg-black/45", children: "\u203A" }), _jsxs("div", { id: id, className: "absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-2 py-1 text-[11px] text-white backdrop-blur", children: [idx + 1, "/", images.length] })] }))] }));
}
