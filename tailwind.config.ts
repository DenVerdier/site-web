import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Denis Verdier refined palette
        'hero-bg': 'var(--hero-bg)',
        'cream': 'var(--cream)',
        'cream-light': 'var(--cream-light)',
        'warm-gray': 'var(--warm-gray)',
        'warm-gray-light': 'var(--warm-gray-light)',
        'glass': 'var(--glass)',
        'glass-border': 'var(--glass-border)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent': {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        'border': 'var(--border)',
        
        // shadcn/ui compatibility
        background: 'var(--cream)',
        foreground: 'var(--text-primary)',
        card: {
          DEFAULT: 'var(--glass)',
          foreground: 'var(--text-primary)'
        },
        popover: {
          DEFAULT: 'var(--cream-light)',
          foreground: 'var(--text-primary)'
        },
        primary: {
          DEFAULT: 'var(--accent)',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: 'var(--warm-gray-light)',
          foreground: 'var(--text-primary)'
        },
        muted: {
          DEFAULT: 'var(--warm-gray)',
          foreground: 'var(--text-secondary)'
        },
        destructive: {
          DEFAULT: '#B91C1C',
          foreground: '#FFFFFF'
        },
        input: 'var(--glass-border)',
        ring: 'var(--accent)',
        chart: {
          '1': 'oklch(0.646 0.222 41.116)',
          '2': 'oklch(0.6 0.118 184.704)',
          '3': 'oklch(0.398 0.07 227.392)',
          '4': 'oklch(0.828 0.189 84.429)',
          '5': 'oklch(0.769 0.188 70.08)'
        },
        sidebar: {
          DEFAULT: 'var(--cream-light)',
          foreground: 'var(--text-primary)',
          primary: 'var(--accent)',
          'primary-foreground': '#FFFFFF',
          accent: 'var(--warm-gray-light)',
          'accent-foreground': 'var(--text-primary)',
          border: 'var(--border)',
          ring: 'var(--accent)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.25rem, 5.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline': ['clamp(1.625rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '400' }],
        'title': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.25', fontWeight: '400' }],
        'body-large': ['clamp(1rem, 1.25vw, 1.125rem)', { lineHeight: '1.8' }],
        'body': ['clamp(0.9375rem, 1.1vw, 1rem)', { lineHeight: '1.8' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(42, 37, 32, 0.02), 0 4px 12px rgba(42, 37, 32, 0.03)',
        'soft-md': '0 2px 4px rgba(42, 37, 32, 0.02), 0 6px 20px rgba(42, 37, 32, 0.04)',
        'soft-lg': '0 4px 8px rgba(42, 37, 32, 0.02), 0 12px 32px rgba(42, 37, 32, 0.05)',
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slow-blink': 'slow-blink 4s ease-in-out infinite',
        'subtle-drift': 'subtle-drift 25s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slow-blink': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'subtle-drift': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(6px) translateY(-3px)' },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
