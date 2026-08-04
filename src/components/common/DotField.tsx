/**
 * DotField — 交互点阵背景
 * 基于 react-bits DotField (JS+CSS 变体)
 * 零依赖，Canvas 2D 实现。鼠标靠近时圆点向外推开。
 */
import { useEffect, useRef, memo } from 'react';

const TWO_PI = Math.PI * 2;

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
}

export const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 16,
  cursorRadius = 200,
  bulgeStrength = 100,
  glowRadius = 120,
  gradientFrom = 'rgba(26,91,179,0.25)',
  gradientTo = 'rgba(108,94,212,0.18)',
  glowColor = '#1A5BB3',
  className = '',
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<{ ax: number; ay: number; sx: number; sy: number }[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, ox: 0, oy: 0 });
  const glowOpacity = useRef(0);
  const glowIdRef = useRef(`df-${Math.random().toString(36).slice(2, 7)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: ReturnType<typeof setTimeout>;

    const doResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width: w, height: h } = parent.getBoundingClientRect();
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h, ox: parent.getBoundingClientRect().left + window.scrollX, oy: parent.getBoundingClientRect().top + window.scrollY };

      const step = dotRadius + dotSpacing;
      const cols = Math.floor(w / step), rows = Math.floor(h / step);
      const px = (w % step) / 2, py = (h % step) / 2;
      const dots: typeof dotsRef.current = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({ ax: px + c * step + step / 2, ay: py + r * step + step / 2, sx: px + c * step + step / 2, sy: py + r * step + step / 2 });
      dotsRef.current = dots;
    };

    const resize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(doResize, 100); };
    doResize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const s = sizeRef.current;
      mouseRef.current.x = e.pageX - s.ox;
      mouseRef.current.y = e.pageY - s.oy;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let eng = 0;
    const tick = () => {
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const cr = cursorRadius, crSq = cr * cr, rad = dotRadius / 2;

      eng += (0.6 - eng) * 0.05; // steady ambient engagement
      glowOpacity.current += (eng * 0.4 - glowOpacity.current) * 0.08;
      if (glowEl) {
        glowEl.setAttribute('cx', String(m.x));
        glowEl.setAttribute('cy', String(m.y));
        glowEl.style.opacity = String(glowOpacity.current);
      }
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, gradientFrom); grad.addColorStop(1, gradientTo);
      ctx.fillStyle = grad;

      ctx.beginPath();
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = m.x - d.ax, dy = m.y - d.ay;
        if (dx * dx + dy * dy < crSq) {
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = 1 - dist / cr;
          const push = t * t * bulgeStrength;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.12;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.12;
        } else {
          d.sx += (d.ax - d.sx) * 0.08;
          d.sy += (d.ay - d.sy) * 0.08;
        }
        ctx.moveTo(d.sx + rad, d.sy);
        ctx.arc(d.sx, d.sy, rad, 0, TWO_PI);
      }
      ctx.fill();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [dotRadius, dotSpacing, cursorRadius, bulgeStrength, glowRadius, gradientFrom, gradientTo, glowColor]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle ref={glowRef} cx="-9999" cy="-9999" r={glowRadius} fill={`url(#${glowIdRef.current})`} style={{ opacity: 0 }} />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';
