/**
 * AuroraBG — WebGL 极光背景
 * 基于 react-bits Aurora (JS+CSS 变体)
 */
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime; uniform float uAmplitude; uniform vec3 uColorStops[3];
uniform vec2 uResolution; uniform float uBlend; out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v){
  vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop { vec3 color; float position; };

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  vec3 rampColor;
  { int index = 0;
    for(int i = 0; i < 2; i++) { bool ok = colors[i].position <= uv.x; index = int(mix(float(index), float(i), float(ok))); }
    ColorStop cur = colors[index], nxt = colors[index + 1];
    float r = nxt.position - cur.position;
    rampColor = mix(cur.color, nxt.color, (uv.x - cur.position) / r);
  }
  float h = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  h = exp(h); h = (uv.y * 2.0 - h + 0.2);
  float intensity = 0.6 * h;
  float mid = 0.20;
  float a = smoothstep(mid - uBlend * 0.5, mid + uBlend * 0.5, intensity);
  fragColor = vec4(intensity * rampColor * a, a);
}`;

interface AuroraBGProps {
  colorStops?: [string, string, string];
  speed?: number;
  blend?: number;
  amplitude?: number;
  className?: string;
}

export function AuroraBG({
  colorStops = ['#1A5BB3', '#6C5ED4', '#00B4D8'],
  speed = 0.5,
  blend = 0.5,
  amplitude = 1.0,
  className = '',
}: AuroraBGProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let program: Program;
    const resize = () => {
      const w = ctn.offsetWidth, h = ctn.offsetHeight;
      renderer.setSize(w, h);
      if (program) program.uniforms.uResolution.value = [w, h];
    };
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: VERT, fragment: FRAG,
      uniforms: {
        uTime: { value: 0 }, uAmplitude: { value: amplitude },
        uColorStops: { value: colorStops.map(h => { const c = new Color(h); return [c.r, c.g, c.b]; }) },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let raf = 0, start = performance.now();
    const update = (t: number) => {
      raf = requestAnimationFrame(update);
      program.uniforms.uTime.value = (t - start) * 0.001 * speed;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [colorStops.join(), speed, blend, amplitude]);

  return <div ref={containerRef} className={`absolute inset-0 rounded-2xl overflow-hidden opacity-60 ${className}`} />;
}
