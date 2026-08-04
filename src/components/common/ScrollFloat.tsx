/**
 * ScrollFloat — 文字逐个浮入动画
 * 支持两种模式:
 * - scroll: 滚动触发 (GSAP ScrollTrigger scrub)
 * - auto: 加载即播 (GSAP to, 自动入场)
 */
import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  mode?: 'auto' | 'scroll';
}

export function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.out(1.7)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  mode = 'scroll',
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, i) => (
      <span className="scroll-float-char inline-block" key={i}>
        {char === ' ' ? ' ' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>('.scroll-float-char');

    if (mode === 'auto') {
      // 自动播放 — 页面加载时入场
      gsap.fromTo(
        chars,
        { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          delay: 0.3,
        }
      );
    } else {
      // 滚动触发
      const scroller = scrollContainerRef?.current || window;
      gsap.fromTo(
        chars,
        { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, mode]);

  if (typeof children !== 'string') return <>{children}</>;

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
      <span className={`inline-block ${textClassName}`}>
        {splitText}
      </span>
    </div>
  );
}
