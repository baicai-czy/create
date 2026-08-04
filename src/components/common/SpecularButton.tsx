/**
 * SpecularButton — WebGL 高光边缘按钮
 * 基于 react-bits SpecularButton (JavaScript + CSS 变体)
 */
import { useRef, useEffect, type ReactNode, type MouseEventHandler } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

const PAD = 20;
const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uCenter; uniform vec2 uHalfSize; uniform float uRadius;
uniform float uAngle; uniform float uPx; uniform vec3 uLineColor;
uniform vec3 uBaseColor; uniform float uIntensity; uniform float uShineSize;
uniform float uShineFade; uniform float uThickness; uniform float uBaseWidth;
out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }
float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}
void main() {
  vec2 p = gl_FragCoord.xy - uCenter; float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;
  vec3 col = uBaseColor * base + uLineColor * hi;
  fragColor = vec4(col, clamp(base + hi, 0.0, 1.0));
}`;

interface SpecularButtonProps {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  lineColor?: string;
  baseColor?: string;
  textColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  proximity?: number;
  onClick?: MouseEventHandler;
  className?: string;
}

export function SpecularButton({
  children = 'Get Started',
  size = 'lg',
  radius = 18,
  lineColor = '#3B82F6',
  baseColor = '#525252',
  textColor = '#ffffff',
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  proximity = 250,
  onClick,
  className = '',
}: SpecularButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const fx = fxRef.current;
    if (!btn || !fx) return;

    const dpr = window.devicePixelRatio || 1;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERT, fragment: FRAG,
      uniforms: {
        uCenter: { value: [0, 0] }, uHalfSize: { value: [1, 1] }, uRadius: { value: 0 },
        uAngle: { value: 2.4 }, uPx: { value: dpr },
        uLineColor: { value: [1, 1, 1] }, uBaseColor: { value: [0.32, 0.32, 0.32] },
        uIntensity: { value: 1 }, uShineSize: { value: 0.17 }, uShineFade: { value: 0.7 },
        uThickness: { value: 1 }, uBaseWidth: { value: dpr },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    fx.appendChild(gl.canvas);

    let pointerAngle: number | null = null;
    let proximityT = 0;
    let sizeW = 1, sizeH = 1;

    const resize = () => {
      const rect = btn.getBoundingClientRect();
      sizeW = rect.width; sizeH = rect.height;
      renderer.setSize(sizeW + PAD * 2, sizeH + PAD * 2);
      program.uniforms.uCenter.value = [(PAD + sizeW / 2) * dpr, (PAD + sizeH / 2) * dpr];
      program.uniforms.uHalfSize.value = [(sizeW / 2) * dpr, (sizeH / 2) * dpr];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(btn);
    resize();

    const onPointerMove = (e: PointerEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);
      if (dist === 0) {
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (cy - e.clientY) / (rect.height / 2);
        pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
      }
      const t = Math.max(0, 1 - dist / Math.max(proximity, 1));
      proximityT = t * t * (3 - 2 * t);
    };
    window.addEventListener('pointermove', onPointerMove);

    let angle = 2.4, idleAngle = 2.4, bright = 0, last = performance.now(), raf = 0;
    const lineC = new Color(), baseC = new Color();

    const update = (now: number) => {
      raf = requestAnimationFrame(update);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      idleAngle += speed * dt;
      const steer = pointerAngle != null;
      const target = steer ? pointerAngle! : idleAngle;
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 7));
      bright += ((0 - bright) * 0.1);
      lineC.set(lineColor); baseC.set(baseColor);
      program.uniforms.uAngle.value = angle;
      program.uniforms.uRadius.value = Math.min(radius, Math.min(sizeW, sizeH) / 2) * dpr;
      program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
      program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
      program.uniforms.uIntensity.value = intensity * (1 + proximityT * 0.3);
      program.uniforms.uShineSize.value = (shineSize * Math.PI) / 180;
      program.uniforms.uShineFade.value = (shineFade * Math.PI) / 180;
      program.uniforms.uThickness.value = thickness * dpr;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [radius, lineColor, baseColor, intensity, shineSize, shineFade, thickness, speed, proximity]);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center border-0 font-medium tracking-wide leading-none text-[var(--sb-text)] bg-white rounded-[var(--sb-radius)] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[var(--sb-line)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-default shadow-lg shadow-black/10 ${size === 'sm' ? 'text-[0.85rem] px-[22px] py-[10px]' : size === 'md' ? 'text-base px-[30px] py-[14px]' : 'text-lg px-[40px] py-[18px]'} ${className}`}
      style={{ '--sb-radius': `${radius}px`, '--sb-line': lineColor, '--sb-text': textColor } as React.CSSProperties}
    >
      <span ref={fxRef} className="absolute inset-[-20px] pointer-events-none z-[1]" aria-hidden="true" />
      <span className="relative z-[2]">{children}</span>
    </button>
  );
}
