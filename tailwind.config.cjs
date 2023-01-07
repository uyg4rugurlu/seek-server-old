/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundColor: theme => ({
                'dark-primary': '#3B3B3B',
                'dark-secondary': '#444444',
                'dark-tertiary': '#4F4F4F',
                'dark-quaternary': '#595959',
                'dark-quinary': '#646464',
                'dark-senary': '#6E6E6E',
                'dark-purple': '#8B5CF6',
            }),
            textColor: theme => ({
                'dark-primary': '#FFFFFF',
                'dark-secondary': '#BDBDBD',
                'dark-tertiary': '#9E9E9E',
                'dark-quaternary': '#757575',
                'dark-quinary': '#616161',
                'dark-senary': '#424242',
                'dark-purple': '#B39DDB',
            }),
            borderColor: theme => ({
                'dark-primary': '#3B3B3B',
                'dark-secondary': '#444444',
                'dark-tertiary': '#4F4F4F',
                'dark-quaternary': '#595959',
                'dark-quinary': '#646464',
                'dark-senary': '#6E6E6E',
                'dark-purple': '#8B5CF6',
            }),
        },
    },
    plugins: [],
}
