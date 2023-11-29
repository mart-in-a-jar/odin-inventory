/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import daisyThemes from "daisyui/src/theming/themes";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                customSelect: {
                    border: "var(--border-color)",
                    selected: "var(--selected-color)",
                    active: "var(--active-color)",
                },
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                light: {
                    ...daisyThemes.light,
                    "--border-color": "#d2d4d7",
                    "--active-color": "#e0e0e6",
                    "--selected-color": "#e0e0e680",
                },
            },
            {
                dark: {
                    ...daisyThemes.dark,
                    "--border-color": "#383f47",
                    "--active-color": "#52525e",
                    "--selected-color": "#52525e80",
                },
            },
        ],
    },
};
