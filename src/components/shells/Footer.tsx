
'use client'

import { HeartIcon } from 'lucide-react'

const Footer = () => {
    return (
        <div className="mx-auto container ml-8 mr-8 flex justify-between pb-20 w-full">
            <div className="mb-10 flex items-center gap-2 text-lg text-white/70">
                <span className="flex items-center gap-2">
                    Built{' '}
                    <span className="animate-pulse">
                        <HeartIcon className="w-6 animate-pulse h-6 text-red-400" />
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
        </div>
    )
}

export default Footer
