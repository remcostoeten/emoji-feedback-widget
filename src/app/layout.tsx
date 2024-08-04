import { Feedback } from '@/components/FeedbackLogic'
import FontSelector from '@/components/menus/FontSelector'
import { Header } from '@/components/menus/Header'
import Providers from '@/components/providers'
import FontWrapper from '@/components/shells/FontWrapper'
import LanguageWrapper from '@/components/shells/LanguageWrapper'
import '../styles/app.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html>
			<body className="text-xl bg-body">
				<Providers>
					<LanguageWrapper>
						<FontWrapper>
							<Header />
							<div className="absolute top-4 right-4">
								<FontSelector />
							</div>
							<main className="pt-[5%]">{children}</main>
							<Feedback />
						</FontWrapper>
					</LanguageWrapper>
				</Providers>
			</body>
		</html>
	)
}
