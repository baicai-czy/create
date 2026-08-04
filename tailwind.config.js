/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色 — SOW: #1A5BB3 云智蓝
        primary: {
          50: '#F0F5FC',
          100: '#D6E5F7',
          200: '#ADC9F0',
          300: '#7AA7E6',
          400: '#4A86DA',
          500: '#1A5BB3',
          600: '#164D99',
          700: '#123E7D',
          800: '#0E2F5F',
          900: '#0A1F40',
          DEFAULT: '#1A5BB3',
        },
        // 强调色 — SOW: #FF6B35 活力橙
        accent: {
          50: '#FFF0EB',
          100: '#FFE1D5',
          200: '#FFC2A8',
          300: '#FFA37A',
          400: '#FF8550',
          500: '#FF6B35',
          600: '#E5541A',
          700: '#BF400D',
          800: '#993008',
          900: '#732205',
          DEFAULT: '#FF6B35',
        },
        // 辅助色 — SOW: #00B4D8 科技青
        cyan: {
          50: '#EBFAFD',
          100: '#D1F3FA',
          200: '#A3E8F5',
          300: '#70DBEF',
          400: '#38CFE9',
          500: '#00B4D8',
          600: '#0099B8',
          700: '#007D96',
          800: '#006175',
          900: '#004554',
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
        // Aurora 极光
        aurora1: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '33%': { transform: 'rotate(3deg) scale(1.05) translate(2%, -1%)' },
          '66%': { transform: 'rotate(-2deg) scale(0.98) translate(-1%, 2%)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1.05)' },
          '50%': { transform: 'rotate(-4deg) scale(0.95) translate(-2%, 2%)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'rotate(0deg) scale(0.95)' },
          '50%': { transform: 'rotate(3deg) scale(1.08) translate(3%, -1%)' },
        },
      },
    },
  },
  plugins: [],
}
