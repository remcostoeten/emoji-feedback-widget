'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ChevronDownIcon } from '../Icons'

const languages = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
]

const LanguageDropdown: React.FC = () => {
	const { i18n, t } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const savedLanguage = localStorage.getItem('language')
		if (savedLanguage && savedLanguage !== i18n.language) {
			i18n.changeLanguage(savedLanguage)
		}
	}, [i18n])
	const currentLanguage =
		languages.find((lang) => lang.code === i18n.language) || languages[0]

	const handleLanguageChange = (langCode: string) => {
		const selectedLanguage = languages.find(
			(lang) => lang.code === langCode
		)
		i18n.changeLanguage(langCode)
		setIsOpen(false)
		if (selectedLanguage) {
			toast(t('languageChanged', { language: selectedLanguage.name }))
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div
			className={`relative inline-block text-left ${isOpen ? 'z-[51]' : 'z-40'}`}
			ref={dropdownRef}
		>
			<div>
				<button
					type="button"
					className="inline-flex justify-center w-full rounded-md border border-border !text-text shadow-sm px-4 py-2 bg-section text-sm font-medium text-gray-700 hover:bg-card-light transition-all duration-500 "
					onClick={() => setIsOpen(!isOpen)}
				>
					<span className="mr-2">{currentLanguage.flag}</span>
					{currentLanguage.name}
					<ChevronDownIcon isOpen={isOpen} />
				</button>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="origin-top-right z-[51] absolute right-0 mt-2 w-56  shadow-lg bg-section hover:bg-card-light duration-300 transition-all border border-border !text-text ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none overflow-hidden rounded-md"
					>
						<div className="py-">
							{languages.map((lang) => (
								<button
									key={lang.code}
									onClick={() =>
										handleLanguageChange(lang.code)
									}
									className={`group flex items-center px-4 py-2 text-sm   duration-300 transition-all  !text-text w-full  bg-section text-left ${
										lang.code === i18n.language
											? 'bg-[#1e1e1e] rounded-md scale-105 text-white'
											: 'bg-section hover:bg-input'
									}`}
								>
									<span className="mr-3 relative">
										{lang.flag}
									</span>
									{lang.name}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default LanguageDropdown
