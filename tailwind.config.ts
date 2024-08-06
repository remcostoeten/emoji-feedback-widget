import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				'dash-body': 'pink',
				section: '#0A0A0A',
				body: 'var(--body)',
				input: 'var(--body)',
				'section-light': 'var(--section)',
				text: 'var(--text)',
				vercelborder: 'rgb(237,237,237)',
				border: 'var(--border)',
				'card-light': 'var(--card-light)',
				'dark-text': 'var(--text-sub)',
				'button-bg': 'var(--button-bg)',
				'button-hover': 'var(--button-hover)',
				'text-disabled': 'var(--text-disabled)',
				table: '#19191B',
				'card-alt': '#202021',
				'card-alt-two': '242428',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'border-beam': {
					'100%': {
						'offset-distance': '100%',
					},
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'border-beam':
				'border-beam calc(var(--duration)*1s) infinite linear',
		},
	},
	plugins: [require('tailwindcss-animate')],
}

export default config
