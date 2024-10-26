import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // '"Fredoka", serif'
  theme: {
    screens: {
      tablet: "750px",
      mobile: { max: "749px" },
    },
    extend: {
      fontFamily: {
        "zen-maru-gothic": '"Zen Maru Gothic", serif',
        "fredoka-one": '"Fredoka", serif',
        "zen-kaku-gothic-new": '"Zen Kaku Gothic New", serif',
      },
      height: {
        header: "60px",
        footer: "340px",
      },
      colors: {
        primary: "#1B9BC3",
        secondary: "#F46D6D",
        black: "#464A50",
      },
      keyframes: {
        "slide-in-left-1": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--1x)))`,
          },
        },
        "slide-in-left-2": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--2x)))`,
          },
        },
        "slide-in-left-3": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--3x)))`,
          },
        },
        "slide-in-left-4": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--4x)))`,
          },
        },
        "slide-in-left-5": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--5x)))`,
          },
        },
        "slide-in-left-6": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--6x)))`,
          },
        },
        "slide-in-left-7": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--7x)))`,
          },
        },
        "slide-in-left-8": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--8x)))`,
          },
        },
        "slide-in-left-9": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: `translateX(calc(-934 * var(--9x)))`,
          },
        },
      },
    },
  },
  safelist: [
    "animate-[slide-in-left-1_9s_linear_infinite]",
    "animate-[slide-in-left-2_9s_linear_infinite]",
    "animate-[slide-in-left-3_9s_linear_infinite]",
    "animate-[slide-in-left-4_9s_linear_infinite]",
    "animate-[slide-in-left-5_9s_linear_infinite]",
    "animate-[slide-in-left-6_9s_linear_infinite]",
    "animate-[slide-in-left-7_9s_linear_infinite]",
    "animate-[slide-in-left-8_9s_linear_infinite]",
    "animate-[slide-in-left-9_9s_linear_infinite]",
    {
      pattern: /animate-\[slide-in-left-[0-9]_9s_linear_infinite\]/,
    },
  ],
};
export default config;
