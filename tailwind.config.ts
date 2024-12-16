import type { Config } from 'tailwindcss';
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        "vibrate-1": "vibrate-1 4s linear  infinite both",
        "slide-in-blurred-left": "slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000)   both"
    },
    keyframes: {
        "vibrate-1": {
          "0%,to": {
              transform: "translate(0) rotate(0deg)",
              
          },
          "20%": {
              transform: "translate(-4px, 2px) rotate(-5deg)"
          },
          "40%": {
              transform: "translate(-4px, -2px) rotate(0deg)"
          },
          "60%": {
              transform: "translate(2px, 2px) rotate(5deg)"
          },
          "80%": {
              transform: "translate(2px, -2px) rotate(0deg)"
          }
        },
        "slide-in-blurred-left": {
            "0%": {
                transform: "translateX(-1000px) scaleX(2.5) scaleY(.2)",
                "transform-origin": "100% 50%",
                filter: "blur(40px)",
                opacity: "0"
            },
            to: {
                transform: "translateX(50%) scaleY(1) scaleX(1)",
                "transform-origin": "50% 50%",
                filter: "blur(0)",
                opacity: "1"
            }
        }
    }
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;