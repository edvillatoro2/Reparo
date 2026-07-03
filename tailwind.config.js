/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{vue,js,ts}",
    ],
    theme: {
        extend: {
            colors: {
        sand: '#E4D1B9',
        caramel: '#BE8C63',
        terra: '#A97155',
        sky: '#8FBDD3',
        dark: '#2C1A0E',
            },
            fontFamily: {
                sans: ['Inter','system-ui', 'sans-serif'],
            },
        },
    }
    plugins: [],
}