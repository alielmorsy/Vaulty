/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
    theme: {
        extend: {
            "animation": {
                'spin-once': 'wiggle 0.5s linear 1',
                'bounce-once': 'upBounce 1s linear 1',
                'modal-open': 'open 0.2s cubic-bezier(.04,-0.11,.2,.85) 1',
                'tilt-shaking': 'tiltShaking 0.5s linear infinite',
                'removing': 'fadeOut 0.3s linear 1',
            },
            keyframes: {
                wiggle: {
                    '0%': {transform: 'rotate(0deg)'},
                    '50%': {transform: 'rotate(90deg)'},
                    '100%': {transform: 'rotate(180deg)'},
                },
                upBounce: {
                    '0%, 100%': {
                        transform: 'translateY(0%)',
                        'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
                    },
                    '50%': {
                        transform: 'translateY(-25%)',
                        'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
                    }
                },
                open: {
                    '0%': {
                        scale: 0,
                    },
                    '50%': {
                        scale: 0.5,
                    },
                    '100%': {
                        scale: 1,
                    }
                },
                'tiltShaking': {
                    '0%, 50%, 100%': {
                        transform: "rotate(0deg)"
                    },
                    '25%': {transform: "rotate(5deg)"},
                    '75%': {transform: "rotate(-5deg)"},
                },
                'fadeOut': {

                }
            },
            colors: {
                "darkGray": "#1F2937"
            },
            dropShadow: {
                'test': 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))'
            },
            transformOrigin: {
                "left-center": "left center"
            },
            transform: {
                'rotate-y-120': 'rotateY(-120deg)'
            }
        },
    },
    plugins: [],
}

