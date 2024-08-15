import { Feedback } from '@/components/FeedbackLogic'
import { Header } from '@/components/menus/Header'
import { MobileMenu } from '@/components/menus/MobileMenu'
import Providers from '@/components/providers'
import FontWrapper from '@/components/shells/FontWrapper'
import Footer from '@/components/shells/Footer'
import LanguageWrapper from '@/components/shells/LanguageWrapper'
import { Metadata } from 'next'
import '../styles/app.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Emoji Feedback 🚀',
	description:
		'Get feedback from your visitors without annoying them with a simple, yet configurable bar that contains emojis to receive feedback. Optionally, they can submit some extra text. By Remco Stoeten',
	viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en" color-scheme="dark">
			<head>
				<meta name="color-scheme" content="dark" />
			</head>
			<body>
				<Providers>
					<LanguageWrapper>
						<FontWrapper>
							<div className="hidden sm:block">
								<Header />
							</div>
							<div className="sm:hidden p-4">
								<MobileMenu />
							</div>
							<main className="container mx-auto pt-[5%]">
								{children}
							</main>
							<footer className="flex items-center  container justify-between">
								<Footer />
							</footer>
							<Feedback />
						</FontWrapper>
					</LanguageWrapper>
				</Providers>
			</body>
		</html>
	)
}
