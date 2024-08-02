'use client'

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import LanguageDropdown from './LanguageDropdown'
import { t } from 'i18next'
import ActionsMenu from './ActionsMenu'

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
    <nav className="fixed top-4">
      <ul className="relative mx-auto flex w-fit rounded-full border-2 border-black p-1 justify-center items-center content-center">
        <Tab href="/" setPosition={setPosition} isActive={pathname === '/'}>
          Home
        </Tab>
        <Tab
          href="results"
          setPosition={setPosition}
          isActive={pathname === '/results'}
        >
          {t('surveyResults')}
        </Tab>

        <Cursor position={position} />
        <li className='ml-4'>
          <ActionsMenu />
        </li>
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
