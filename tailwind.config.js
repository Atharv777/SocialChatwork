module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    lighter: '#40444a',
                    DEFAULT: '#36393f',
                    darker: '#25272b'
                },
                light: {
                    lighter: '#fcfcfc',
                    DEFAULT: '#f9f9f9',
                    darker: '#f5f5f5'
                },
                blue: {
                    lighter: "#edf5fe",
                    DEFAULT: '#ccdef9',
                    darker: "#3b82f6"
                }
            },
            fontFamily: {
                'monserrat': ['monserrat', 'sans-serif']
            },
            minHeight: {
                40: '10rem',
                44: '11rem',
                48: '12rem',
            },
        }
    },
    variants: {
        extend: {}
    },
    plugins: [],
}
