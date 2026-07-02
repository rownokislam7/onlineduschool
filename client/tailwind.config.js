/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FFB347",
          300: "#FF9500",
          400: "#FF9500",
          500: "#FF7A00",
          600: "#FF7A00",
          700: "#E56D00",
          800: "#CC6200",
          900: "#994900",
        },
        surface: {
          DEFAULT: "#141414",
          primary: "#050505",
          secondary: "#0E0E0E",
          elevated: "#1A1A1A",
        },
        content: {
          primary: "#FFFFFF",
          secondary: "#D0D0D0",
          muted: "#9A9A9A",
        },
      },
      fontFamily: { sans: ["Inter", "Hind Siliguri", "sans-serif"] },
      fontSize: {
        sm: ["1rem", { lineHeight: "1.25rem" }],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        glow: "0 10px 35px rgba(255,122,0,0.35)",
        "glow-sm": "0 4px 20px rgba(255,122,0,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,122,0,0.1)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
