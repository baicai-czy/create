import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* ===== Button ===== */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const btnBase = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
const btnVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-[#0058E0] active:bg-[#0047B3] shadow-sm',
  secondary: 'bg-white text-primary border border-primary/20 hover:border-primary hover:bg-primary-50',
  ghost: 'text-gray-600 hover:text-primary hover:bg-gray-50',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm',
};
const btnSizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm rounded-md gap-1.5',
  md: 'px-6 py-2.5 text-sm rounded-lg gap-2',
  lg: 'px-8 py-3 text-base rounded-lg gap-2',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/* ===== LinkButton ===== */
interface LinkButtonProps {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export function LinkButton({ to, variant = 'primary', size = 'md', className = '', children }: LinkButtonProps) {
  return (
    <Link to={to} className={`${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${className}`}>
      {children}
    </Link>
  );
}

/* ===== Card ===== */
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, padding = 'p-6 md:p-8', onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-card border border-gray-100 ${padding} ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

/* ===== GlassCard ===== */
export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-xl ${className}`}>
      {children}
    </div>
  );
}

/* ===== SectionTitle ===== */
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, className = '', align = 'center' }: SectionTitleProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      {subtitle && <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

/* ===== GradientText ===== */
export function GradientText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`gradient-text ${className}`}>{children}</span>
  );
}

/* ===== Badge ===== */
export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${className}`}>
      {children}
    </span>
  );
}

/* ===== Input ===== */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        className={`w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ===== Breadcrumb ===== */
interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 py-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {item.path ? (
            <Link to={item.path} className="hover:text-primary transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
