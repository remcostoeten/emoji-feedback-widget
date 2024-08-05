import { HeartIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
	return (
		<div className="mx-auto container ml-8 mr-8 flex justify-between pb-20  mb-20 w-full">
			<div className="mb-10 flex items-center gap-2 text-lg text-white/70">
				<span className="flex items-center gap-2">
					Built{' '}
					<span className="animate-pulse">
						<HeartIcon className="w-6 animate-pulse h-6 text-red-400" />
					</span>{' '}
					<Link
						href="https://github.com/remcostoeten"
						className="underline"
						target="_blank"
					>
						Remco Stoeten
					</Link>
				</span>
			</div>
			<Link
				href="https://github.com/remcostoeten/your-repo-name"
				className="mb-10 inline-flex cursor-pointer hover:bg-inherit/40 hover:scale-105 items-center mr-20 gap-2 rounded-md vercel-card !px-8 !py-4  text-xl font-medium text-secondary-foreground transition-colors hover:bg-secondary/50"
				target="_blank"
				prefetch={false}
			>
				<StarIcon className="w-6 h-6 animate-pulse hover:text-red-400" />
				Star it
			</Link>
		</div>
	)
}
