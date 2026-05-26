/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0b1020",
        panel: "#11172a",
        border: "rgba(148, 163, 184, 0.16)",
        accent: "#60a5fa",
        accentSoft: "#93c5fd",
        glow: "#22d3ee",
        ink: "#ecf2ff",
        muted: "#94a3b8"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(2, 6, 23, 0.45)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
