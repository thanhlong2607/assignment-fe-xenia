/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        "neutral-01": "#F8F8F8",
        "neutral-02": "#EBEBEB",
        "neutral-03": "#F7F7F7",
        "neutral-04": "#B3B3B3",
        "neutral-05": "#8D8D8D",
        "neutral-06": "#676767",
        "neutral-07": "#414141",
        "neutral-08": "#1B1B1B",
        "blue-main": "#1590A3",
        "blue-hover": "#127888",
        "blue-press": "#0B4852",
        "orange-main": "#F68A1E",
        "blue-background": "#F0F9F9",
        "approved": "#40AB6B",
        "approve-background": "rgba(64, 171, 107, 0.1)",
        "reject": "#DD2929",
        "reject-background": "rgba(239, 77, 38, 0.1)",
        "pending": "#F68A1E",
        "pending-background": "rgba(246, 138, 30, 0.1)",
        "revoked": "#9747FF",
        "revoked-background": "rgba(151, 71, 255, 0.1)",
        "transferred": "#0088D4",
        "transferred-background": "rgba(0, 136, 212, 0.1)",
        "draft": "#717D84",
        "draft-background": "rgba(113, 125, 132, 0.15)",
      },
      fontSize: {
        'title': ['1.25rem', {
          fontWeight: "700",
          lineHeight: "150%"
        }],
        'label': ['0.875rem', {
          fontWeight: "500",
          lineHeight: "150%"
        }],
        'body': ['0.875rem', {
          fontWeight: "700",
          lineHeight: "150%"
        }],
      }
    },
  },
  plugins: [],
};
