'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useFontStore } from '@/core/stores/font-store'
import {
	Inter,
	Lato,
	Merriweather,
	Montserrat,
	Open_Sans,
	Playfair_Display,
	Poppins,
	Raleway,
	Roboto,
} from 'next/font/google'
import { toast } from 'sonner'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })
const openSans = Open_Sans({ subsets: ['latin'] })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })
const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })
const playfairDisplay = Playfair_Display({ subsets: ['latin'] })
const merriweather = Merriweather({
	weight: ['400', '700'],
	subsets: ['latin'],
})
const raleway = Raleway({ subsets: ['latin'] })

const fonts = [
	{ name: 'Inter', value: 'inter', font: inter },
	{ name: 'Roboto', value: 'roboto', font: roboto },
	{ name: 'Open Sans', value: 'openSans', font: openSans },
	{ name: 'Lato', value: 'lato', font: lato },
	{ name: 'Poppins', value: 'poppins', font: poppins },
	{ name: 'Montserrat', value: 'montserrat', font: montserrat },
	{
		name: 'Playfair Display',
		value: 'playfairDisplay',
		font: playfairDisplay,
	},
	{ name: 'Merriweather', value: 'merriweather', font: merriweather },
	{ name: 'Raleway', value: 'raleway', font: raleway },
]

export default function FontSelector() {
	const { font, setFont } = useFontStore()

	const handleFontChange = (newFont: string) => {
		setFont(newFont)
		const selectedFont = fonts.find((f) => f.value === newFont)?.name
		toast(`Font changed to ${selectedFont}`)
	}

	return (
		<>
			<Select value={font} onValueChange={handleFontChange}>
				<SelectTrigger>
					<SelectValue placeholder="Select Font" />
				</SelectTrigger>
				<SelectContent>
					{fonts.map((font) => (
						<SelectItem key={font.value} value={font.value}>
							{font.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	)
}

export { fonts }
