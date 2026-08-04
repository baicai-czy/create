/**
 * FadeContent — 滚动触发模糊渐入效果
 * 基于 react-bits FadeContent 的 motion 实现
 */
import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  threshold?: number;
  y?: number;
}

export function FadeContent({ children, blur = true, duration = 0.8, delay = 0, className = '', y = 40 }: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'none' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration, delay, ease: [0.25, 0, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
