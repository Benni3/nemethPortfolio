import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
export default function InteractiveBackground() {
    const canvasRef = useRef(null);
    useEffect(() => {
        let animationId = 0;
        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let time = 0;
        const mouse = {
            x: -9999,
            y: -9999,
            active: false,
        };
        const dots = [];
        const SPACING = 20;
        const DOT_SIZE = 1.8;
        const BASE_ALPHA = 0.42;
        const MOUSE_RADIUS = 170;
        const MOUSE_FORCE = 0.16;
        const WAVE_FORCE = 0.085;
        const WAVE_RADIUS = 1850;
        const RETURN_FORCE = 0.055;
        const DAMPING = 0.88;
        const MAX_OFFSET = 18;
        const colors = [
            '99,102,241',
            '79,70,229',
            '59,130,246',
            '96,165,250',
            '139,92,246',
        ];
        function getRendering() {
            const canvas = canvasRef.current;
            if (!canvas)
                return null;
            const context = canvas.getContext('2d');
            if (!context)
                return null;
            return { canvas, context };
        }
        function rebuildDots() {
            dots.length = 0;
            const cols = Math.ceil(width / SPACING) + 2;
            const rows = Math.ceil(height / SPACING) + 2;
            const startX = (width - (cols - 1) * SPACING) / 2;
            const startY = (height - (rows - 1) * SPACING) / 2;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = startX + col * SPACING;
                    const y = startY + row * SPACING;
                    dots.push({
                        baseX: x,
                        baseY: y,
                        x,
                        y,
                        vx: 0,
                        vy: 0,
                        size: DOT_SIZE,
                        alpha: BASE_ALPHA,
                        color: colors[(row + col) % colors.length],
                    });
                }
            }
        }
        function resize() {
            const rendering = getRendering();
            if (!rendering)
                return;
            const { canvas, context } = rendering;
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            rebuildDots();
        }
        function onMouseMove(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        }
        function onMouseLeave() {
            mouse.active = false;
            mouse.x = -9999;
            mouse.y = -9999;
        }
        function drawDot(context, x, y, size, color, alpha) {
            context.beginPath();
            context.arc(x, y, size, 0, Math.PI * 2);
            context.fillStyle = `rgba(${color}, ${alpha})`;
            context.fill();
        }
        function tick() {
            const rendering = getRendering();
            if (!rendering)
                return;
            const { context } = rendering;
            time += 0.016;
            context.clearRect(0, 0, width, height);
            for (const dot of dots) {
                const toBaseX = dot.baseX - dot.x;
                const toBaseY = dot.baseY - dot.y;
                dot.vx += toBaseX * RETURN_FORCE;
                dot.vy += toBaseY * RETURN_FORCE;
                if (mouse.active) {
                    const dx = mouse.x - dot.x;
                    const dy = mouse.y - dot.y;
                    const dist = Math.hypot(dx, dy) || 0.001;
                    if (dist < MOUSE_RADIUS) {
                        const strength = 1 - dist / MOUSE_RADIUS;
                        // gentle attraction toward mouse
                        dot.vx += (dx / dist) * strength * MOUSE_FORCE;
                        dot.vy += (dy / dist) * strength * MOUSE_FORCE;
                        // upward lift near mouse
                        dot.vy -= strength * 0.18;
                    }
                    if (dist < WAVE_RADIUS) {
                        const wave = Math.sin(dist * 0.06 - time * 4.5);
                        const fade = 1 - dist / WAVE_RADIUS;
                        const push = wave * fade * WAVE_FORCE;
                        dot.vx += (dx / dist) * push;
                        dot.vy += (dy / dist) * push;
                    }
                }
                const offsetX = dot.x - dot.baseX;
                const offsetY = dot.y - dot.baseY;
                const offsetDist = Math.hypot(offsetX, offsetY) || 0.001;
                if (offsetDist > MAX_OFFSET) {
                    dot.vx -= (offsetX / offsetDist) * 0.2;
                    dot.vy -= (offsetY / offsetDist) * 0.2;
                }
                dot.vx *= DAMPING;
                dot.vy *= DAMPING;
                dot.x += dot.vx;
                dot.y += dot.vy;
                const movement = Math.min(Math.hypot(dot.vx, dot.vy) * 4, 0.18);
                drawDot(context, dot.x, dot.y, dot.size, dot.color, dot.alpha + movement);
            }
            animationId = window.requestAnimationFrame(tick);
        }
        if (!getRendering())
            return;
        resize();
        tick();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
            window.cancelAnimationFrame(animationId);
        };
    }, []);
    return (_jsxs("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 z-0 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-white dark:bg-black" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_34%),radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.09),transparent_34%),radial-gradient(circle_at_center,rgba(139,92,246,0.07),transparent_40%)]" }), _jsx("canvas", { ref: canvasRef, className: "absolute inset-0 block h-full w-full" })] }));
}
