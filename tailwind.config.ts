import { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enables dark mode via the 'class' strategy
  content: [
    './public/index.html',                  // Scans the root index.html
    './pages/**/*.{ts,tsx}',          // Scans .ts and .tsx files in the 'pages' folder
    './components/**/*.{ts,tsx}',     // Scans .ts and .tsx files in the 'components' folder
    './app/**/*.{ts,tsx}',            // Scans .ts and .tsx files in the 'app' folder
    './src/**/*.{ts,tsx,jsx}',        // Scans .ts, .tsx, .jsx files in the 'src' folder
  ],
  prefix: "", // Optional: you can add a prefix to all Tailwind utility classes
  theme: {
    container: {
      center: true,                  // Centers the container by default
      padding: "2rem",               // Adds padding to the container
      screens: {
        "2xl": "1400px",             // Defines a custom screen size for '2xl'
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))", // Custom color using CSS variables
        input: "hsl(var(--input))",   // Custom color using CSS variables
        ring: "hsl(var(--ring))",     // Custom color using CSS variables
        background: "hsl(var(--background))", // Custom background color
        foreground: "hsl(var(--foreground))", // Custom foreground color
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",            // Custom border radius value using CSS variable
        md: "calc(var(--radius) - 2px)", // Custom border radius with a small adjustment
        sm: "calc(var(--radius) - 4px)", // Custom border radius with a further adjustment
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },          // Animates from height 0
          to: { height: "var(--radix-accordion-content-height)" }, // To the content height
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" }, // From content height
          to: { height: "0" },           // To height 0
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", // Accordion open animation
        "accordion-up": "accordion-up 0.2s ease-out",     // Accordion close animation
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Adds additional animations for Tailwind
  ],
};

export default config;
