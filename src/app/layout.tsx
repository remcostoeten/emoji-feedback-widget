import { Feedback } from '@/components/FeedbackLogic'
import { Header } from '@/components/menus/Header'
import { MobileMenu } from '@/components/menus/MobileMenu'
import Providers from '@/components/providers'
import FontWrapper from '@/components/shells/FontWrapper'
import LanguageWrapper from '@/components/shells/LanguageWrapper'
import { Metadata } from 'next'
import '../styles/app.css'

export const metadata: Metadata = {
	title: 'Your Site Title',
	description: 'Your site description goes here',
	viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="text-xl bg-body">
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
							<Feedback />
						</FontWrapper>
					</LanguageWrapper>
				</Providers>
			</body>
		</html>
	)
}
