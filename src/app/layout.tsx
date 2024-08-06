import { Feedback } from '@/components/FeedbackLogic'
import { Header } from '@/components/menus/Header'
import { MobileMenu } from '@/components/menus/MobileMenu'
import Providers from '@/components/providers'
import FontWrapper from '@/components/shells/FontWrapper'
import Footer from '@/components/shells/Footer'
import LanguageWrapper from '@/components/shells/LanguageWrapper'
import StarOnGithub from '@/components/shells/StarOnGithub'
import { Metadata } from 'next'
import '../styles/app.css'

export const metadata: Metadata = {
	title: 'Emoji Feedback',
	description: '- By Remco Stoetenm',
	viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className="bg-dash-body dark text-xl overflow-x-hidden "
		>
			<body className="">
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
								<StarOnGithub />
							</footer>
							<Feedback />
						</FontWrapper>
					</LanguageWrapper>
				</Providers>
			</body>
		</html>
	)
}
