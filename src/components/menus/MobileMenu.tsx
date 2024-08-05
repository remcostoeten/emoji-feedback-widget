'use client'

import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import ActionsMenu from './ActionsMenu'
import FontSelector from './FontSelector'
import LanguageDropdown from './LanguageDropdown'

export const MobileMenu = () => {
	return <SlideTabs />
}

const SlideTabs = () => {
	const [position, setPosition] = useState<Position>({
		left: 0,
		width: 0,
		opacity: 1,
	})

	const pathname = usePathname()

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="ghost" size="icon" className="lg:hidden">
					<MenuIcon className="h-6 w-6" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="bg-background p-6 sm:w-80">
				<div className="flex items-center justify-between">
					<DrawerClose>
						<XIcon className="h-6 w-6" />
					</DrawerClose>
				</div>
				<nav>
					<ul className="relative flex flex-col gap-8 mx-auto mt-6 md:flex-row rounded-full border-2 border-black p-1 content-center">
						<div className="hidden sm:block">
							<Tab
								href="/"
								setPosition={setPosition}
								isActive={pathname === '/'}
							>
								Home
							</Tab>
						</div>
						<Cursor position={position} />
						<div className="flex gap-4 flex-col md:flex-row  space-x-4">
							<li className="ml-4 absolute top-4 right-4 sm:relative">
								<ActionsMenu />
							</li>
							<li className="ml-0">
								<LanguageDropdown />
							</li>
							<li className="ml-0">
								<FontSelector />
							</li>
						</div>
					</ul>
				</nav>
			</DrawerContent>
		</Drawer>
	)
}

const Tab = ({
	children,
	setPosition,
	href,
	languageDropdown,
	isActive,
}: {
	children?: string
	href?: string
	languageDropdown?: boolean
	setPosition: Dispatch<SetStateAction<Position>>
	isActive: boolean
}) => {
	const ref = useRef<null | HTMLLIElement>(null)

	useEffect(() => {
		if (isActive && ref.current) {
			const { width } = ref.current.getBoundingClientRect()
			setPosition({
				left: ref.current.offsetLeft,
				width,
				opacity: 1,
			})
		}
	}, [isActive, setPosition])

	return (
		<li
			ref={ref}
			className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base ${isActive ? 'font-bold' : ''}`}
		>
			<Link href={href}>{children}</Link>
			{languageDropdown && <LanguageDropdown />}
		</li>
	)
}

const Cursor = ({ position }: { position: Position }) => {
	return (
		<motion.li
			animate={{
				...position,
			}}
			className="absolute z-0 h-7 rounded-full bg-section border border-border md:h-12"
		/>
	)
}

type Position = {
	left: number
	width: number
	opacity: number
}

function ChevronDownIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	)
}

function MenuIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	)
}

function MountainIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		</svg>
	)
}

function XIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	)
}
