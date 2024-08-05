'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { StarIcon } from '../Icons';

export default function StarOnGithub() {
    return (
        <div>
            <Link
                href="https://github.com/remcostoeten/Emoji-feedback-form"
                className='mb-10 z-50 vercel-card hover:bg-section text-sm flex cursor-pointer hover:bg-inherit/40 hover:scale-105 items-center gap-2 rounded-md vercel-card !px-4 text-center justify-center !py-4 font-medium text-secondary-foreground transition-colors hover:bg-secondary/50 w-60'
                target="_blank"
                rel="noopener noreferrer"
            >
                <motion.div
                    className="w-6 h-6"
                >
                    <StarIcon className="w-6 h-6 animate-pulse" />
                </motion.div>

                <motion.span
                    className="ml-2"
                >
                    Star on GitHub
                </motion.span>
            </Link>
        </div>
    );
}