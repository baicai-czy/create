/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF2FF',
          100: '#D6E5FF',
          200: '#ADC9FF',
          300: '#85AFFF',
          400: '#5C94FF',
          500: '#337AFF',
          600: '#1A5CE5',
          700: '#0040BF',
          800: '#003099',
          900: '#002073',
          DEFAULT: '#0066FF',
        },
        accent: {
          50: '#FFF3EB',
          100: '#FFE1CC',
          200: '#FFC299',
          300: '#FFA466',
          400: '#FF8533',
          500: '#FF6A00',
          600: '#E55A00',
          700: '#BF4700',
          800: '#993800',
          900: '#732A00',
          DEFAULT: '#FF6A00',
        },
        gray: {
          50: '#F7F8FA',
          100: '#F2F3F5',
          200: '#E5E6EB',
          300: '#C9CDD4',
          400: '#A8ADB7',
          500: '#86909C',
          600: '#6B7585',
          700: '#4E5969',
          800: '#2C3542',
          900: '#1D2129',
        },
      },
      fontFamily: {
        sans: ['"Alibaba PuHuiTi"', '"PingFang SC"', '"Microsoft YaHei"', '"Noto Sans SC"', 'sans-serif'],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'breathe': 'breathe 8s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        breathe: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
