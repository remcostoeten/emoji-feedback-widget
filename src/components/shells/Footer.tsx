'use client'

import { HeartIcon } from 'lucide-react'
import StarOnGithub from './StarOnGithub'

const Footer = () => {
	return (
		<div className="mx-auto container mt-10 flex justify-between pb-20 w-full">
			<div className="mb-10 flex items-center gap-2 text-lg text-text">
				<span className="flex items-center gap-2">
					Built{' '}
					<span className="animate-pulse">
						<HeartIcon className="w-4 animate-pulse h-4 mx-1 text-red-400" />
					</span>{' '}
					<a
						href="https://github.com/remcostoeten"
						className="underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Remco Stoeten
					</a>
				</span>
			</div>
			<StarOnGithub />
		</div>
	)
}

export default Footer
