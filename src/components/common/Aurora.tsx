/**
 * Aurora — 极光背景
 * 基于 react-bits Aurora，CSS 纯实现（无 WebGL 依赖）
 */
interface AuroraProps {
  className?: string;
}

export function Aurora({ className = '' }: AuroraProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* 三层极光光晕 */}
      <div
        className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] opacity-40 animate-[aurora1_15s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #1A5BB3 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, #6C5ED4 0%, transparent 50%), radial-gradient(ellipse at 50% 70%, #00B4D8 0%, transparent 40%)',
        }}
      />
      <div
        className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] opacity-30 animate-[aurora2_20s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #00B4D8 0%, transparent 50%), radial-gradient(ellipse at 30% 60%, #1A5BB3 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, #6C5ED4 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] opacity-25 animate-[aurora3_18s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(ellipse at 40% 50%, #6C5ED4 0%, transparent 60%), radial-gradient(ellipse at 60% 30%, #1A5BB3 0%, transparent 40%)',
        }}
      />
    </div>
  );
}
