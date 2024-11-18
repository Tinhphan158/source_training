/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        desktopXL: "1920px",
      },
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        "4xl": "180px",
      },
      boxShadow: {
        btnGroup: "0px 2px 4px 0px rgba(0, 0, 0, 0.12);",
      },
      fontSize: {},
      backgroundColor: {
        "overlay-modal": "rgba(0, 0, 0, 0.1)",
      },
      colors: {
        neutral: {
          110: "#F2F2F2",
        },
        dark: {
          500: "#101316",
        },
        primary: {
          pressed: "#AD1D2F",
        },
        secondary: {
          pressed: "#00645C",
        },
        warning: {
          pressed: "#B77D09",
        },
        danger: {
          pressed: "#920101",
        },
        info: {
          pressed: "#023480",
        },
        orange: {
          pressed: "#A14603",
        },
        purple: {
          pressed: "#5D1C7B",
        },
        green: {
          pressed: "#155E25",
        },
      },
      animation: {
        transRight: "transRightOut 0.4s",
      },
      keyframes: {
        transRightOut: {
          "0%": {
            transform: "translateX(-20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0px)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
