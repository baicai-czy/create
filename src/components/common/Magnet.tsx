/**
 * Magnet — 鼠标磁吸效果
 * 基于 react-bits Magnet，用 motion + useMotionValue 实现
 */
import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagnetProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function Magnet({ children, strength = 20, className = '' }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const magnetX = useSpring(useTransform(x, [0, 1], [-strength, strength]), { stiffness: 150, damping: 15 });
  const magnetY = useSpring(useTransform(y, [0, 1], [-strength, strength]), { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      style={{ x: magnetX, y: magnetY }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
