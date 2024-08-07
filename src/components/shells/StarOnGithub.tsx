'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { StarIcon } from '../Icons'

export default function StarOnGithub() {
	return (
		<div>
			<Link
				href="https://github.com/remcostoeten/Emoji-feedback-form"
				className="footer-btn mb-10 z-50 hover:bg-section text-sm flex cursor-pointer hover:bg-inherit/40 hover:scale-105 items-center gap-2 rounded-md vercel-card !px-4 text-center justify-center !py-4 font-medium text-secondary-foreground transition-colors hover:bg-secondary/50 "
				target="_blank"
				rel="noopener noreferrer"
			>
				<StarIcon className="w4 h-4 text-white/60 animate-pulse" />

				<motion.span className="ml-2">Star on GitHub</motion.span>
			</Link>
		</div>
	)
}
