import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

const ALPHA_CHANNEL = {
	FULL: 1,
	HALF: 0.5,
	MED: 0.3,
	SMALL: 0.2,

	XSMALL: 0.1,
	XXSMALL: 0.05,
	NONE: 0,
}

export const RGBA_COLORS = [
	`rgba(55,255,50,${ALPHA_CHANNEL.HALF})`,
	`rgba(255,55,50,${ALPHA_CHANNEL.HALF})`,
	`rgba(50,55,255,${ALPHA_CHANNEL.HALF})`,
	`rgba(255,255,50,${ALPHA_CHANNEL.HALF})`,
]

export const getBaseUrl = () => {
	if (process.env.NEXT_PUBLIC_APP_URL) {
		return process.env.NEXT_PUBLIC_APP_URL
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}

	return 'http://localhost:3000'
}
