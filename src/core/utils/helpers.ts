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
  `rgba(55,255,50,${ALPHA_CHANNEL.XXSMALL})`,
  `rgba(255,55,50,${ALPHA_CHANNEL.XXSMALL})`,
  `rgba(50,55,255,${ALPHA_CHANNEL.XXSMALL})`,
  `rgba(255,255,50,${ALPHA_CHANNEL.XXSMALL})`,
]
