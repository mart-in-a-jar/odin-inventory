/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            /* colors: {
                base: {
                    100: "#2a323c",
                    500: "#1d232a",
                    700: "#191e24",
                },
            }, */
        },
    },
    plugins: [daisyui],
};
