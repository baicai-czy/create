/**
 * TiltedCard — 3D倾斜卡片
 * 基于 react-bits 模式：motion + useMove
 */
import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
}

export function TiltedCard({ children, className = '', tiltAmount = 10 }: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [tiltAmount, -tiltAmount]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltAmount, tiltAmount]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at ${useTransform(x, [0, 1], [0, 100]).get() + '%'} ${useTransform(y, [0, 1], [0, 100]).get() + '%'}, rgba(255,255,255,0.12), transparent 60%)`,
        }}
      />
    </motion.div>
  );
}
