/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        orange: {
          base: 'var(--orange-base)',
          dark: 'var(--orange-dark)',
        },
        blue: {
          light: 'var(--blue-light)',
          base: 'var(--blue-base)',
          dark: 'var(--blue-dark)',
        },
        shape: {
          white: 'var(--shape-white)',
          background: 'var(--shape-background)',
          base: 'var(--shape-base)',
        },
        grayscale: {
          100: 'var(--grayscale-100)',
          200: 'var(--grayscale-200)',
          300: 'var(--grayscale-300)',
          400: 'var(--grayscale-400)',
          500: 'var(--grayscale-500)',
        },
        danger: 'var(--danger)',
        success: 'var(--success)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      spacing: {
        18: '4.5rem',
      },
      fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      lineHeight: {
        base: '1.2',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
