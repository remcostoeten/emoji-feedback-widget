'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import ActionsMenu from './ActionsMenu'
import FontSelector from './FontSelector'
import LanguageDropdown from './LanguageDropdown'

export const Header = () => {
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
        <nav className="z--6">
            <ul className="relative mx-auto mt-6 flex w-fit rounded-full border-2 border-black p-1 justify-center items-center content-center">
                <Tab
                    href="/"
                    setPosition={setPosition}
                    isActive={pathname === '/'}
                >
                    Home
                </Tab>
                <Cursor position={position} />
                <div className="flex items-center space-x-4">
                    <li className="ml-4">
                        <ActionsMenu />
                    </li>
                    <li className="ml-4">
                        <LanguageDropdown />
                    </li>
                    <li>
                        <FontSelector />
                    </li>
                </div>
            </ul>
        </nav>
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
            <a href={href}>{children}</a>
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
