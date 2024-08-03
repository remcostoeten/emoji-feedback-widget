'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next' // Import the useTranslation hook
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Button,
	Badge,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui'
import { getFeedbackData } from '@/core/server/feedback'
import HoverCard from '@/components/effects/hover-card'
import { ChevronDownIcon } from 'lucide-react'
import NumberTicker from '@/components/effects/NumberTicker'
import SparklesText from '@/components/effects/SparkleText'

export default function Component() {
	const { t } = useTranslation()
	const [feedbackData, setFeedbackData] = useState([])
	const [emojiCounts, setEmojiCounts] = useState({})
	const [searchTerm, setSearchTerm] = useState('')
	const [filterOption, setFilterOption] = useState('all')
	const [sortOption, setSortOption] = useState('newest')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			try {
				const data = await getFeedbackData()
				setFeedbackData(data.feedbacks)
				setEmojiCounts(data.emojiCounts)
			} catch (error) {
				console.error('Error fetching feedback data:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	const totalFeedback = feedbackData.length
	const positiveFeedback = feedbackData.filter(
		(feedback) => feedback.opinion === '🔥' || feedback.opinion === '😍'
	).length
	const negativeFeedback = feedbackData.filter(
		(feedback) => feedback.opinion === '💩' || feedback.opinion === '🤮'
	).length

	const filteredFeedback = useMemo(() => {
		let filtered = feedbackData
		if (searchTerm) {
			filtered = filtered.filter((feedback) =>
				feedback.feedback
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			)
		}
		if (filterOption !== 'all') {
			filtered = filtered.filter((feedback) => {
				if (filterOption === 'positive')
					return (
						feedback.opinion === '🔥' || feedback.opinion === '😍'
					)
				if (filterOption === 'negative')
					return (
						feedback.opinion === '💩' || feedback.opinion === '🤮'
					)
				return (
					feedback.opinion !== '🔥' &&
					feedback.opinion !== '😍' &&
					feedback.opinion !== '💩' &&
					feedback.opinion !== '🤮'
				)
			})
		}
		switch (sortOption) {
			case 'newest':
				filtered = filtered.sort(
					(a, b) =>
						new Date(b.timestamp).getTime() -
						new Date(a.timestamp).getTime()
				)
				break
			case 'oldest':
				filtered = filtered.sort(
					(a, b) =>
						new Date(a.timestamp).getTime() -
						new Date(b.timestamp).getTime()
				)
				break
			case 'highest':
				filtered = filtered.sort((a, b) => {
					const positiveEmojis = ['🔥', '😍']
					if (
						positiveEmojis.includes(a.opinion) &&
						positiveEmojis.includes(b.opinion)
					)
						return 0
					if (positiveEmojis.includes(a.opinion)) return -1
					return
				})
				break
			case 'lowest':
				filtered = filtered.sort((a, b) => {
					const negativeEmojis = ['💩', '🤮']
					if (
						negativeEmojis.includes(a.opinion) &&
						negativeEmojis.includes(b.opinion)
					)
						return 0
					if (negativeEmojis.includes(a.opinion)) return -1
					return 1
				})
				break
			default:
				break
		}
		return filtered
	}, [feedbackData, searchTerm, filterOption, sortOption])

	return (
		<div className="container mx-auto py-8 bg-card-light">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<HoverCard gradientOpacity={0.3}>
					<Card>
						<CardHeader>
							<CardTitle>{t('totalFeedback')}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								<NumberTicker value={totalFeedback} />
							</div>
						</CardContent>
					</Card>
				</HoverCard>

				<HoverCard gradientOpacity={0.3}>
					<Card>
						<CardHeader>
							<CardTitle>{t('positiveFeedback')}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								<NumberTicker value={positiveFeedback} />
							</div>
						</CardContent>
					</Card>
				</HoverCard>

				<HoverCard gradientOpacity={0.3}>
					<Card>
						<CardHeader>
							<CardTitle>{t('negativeFeedback')}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								<NumberTicker value={negativeFeedback} />
							</div>
						</CardContent>
					</Card>
				</HoverCard>
			</div>

			<div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="col-span-1 md:col-span-2">
					<Input className='vercel-card'
						type="search"
						placeholder={t('feedbackPlaceholder')}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="actions" className="w-full">
								<span className="mr-2">
									{filterOption === 'all'
										? t('feedbackSectionLabel')
										: filterOption === 'positive'
											? t('positiveFeedback')
											: filterOption === 'negative'
												? t('negativeFeedback')
												: t('neutralFeedback')}
								</span>
								<ChevronDownIcon className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onSelect={() => setFilterOption('all')}
								className={
									filterOption === 'all' ? 'bg-accent' : ''
								}
							>
								{t('feedbackSectionLabel')}
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setFilterOption('positive')}
								className={
									filterOption === 'positive'
										? 'bg-accent'
										: ''
								}
							>
								{t('positiveFeedback')}
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setFilterOption('negative')}
								className={
									filterOption === 'negative'
										? 'bg-accent'
										: ''
								}
							>
								{t('negativeFeedback')}
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setFilterOption('neutral')}
								className={
									filterOption === 'neutral'
										? 'bg-accent'
										: ''
								}
							>
								{t('neutralFeedback')}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="actions" className="w-full">
								<span className="mr-2">
									{sortOption === 'newest'
										? t('newest')
										: sortOption === 'oldest'
											? t('oldest')
											: sortOption === 'highest'
												? t('highestRating')
												: t('lowestRating')}
								</span>
								<ChevronDownIcon className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onSelect={() => setSortOption('newest')}
								className={
									sortOption === 'newest' ? 'bg-accent' : ''
								}
							>
								{t('newest')}
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setSortOption('oldest')}
								className={
									sortOption === 'oldest' ? 'bg-accent' : ''
								}
							>
								{t('oldest')}
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setSortOption('highest')}
								className={
									sortOption === 'highest' ? 'bg-accent' : ''
								}
							>
								{t('highestRating')}
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setSortOption('lowest')}
								className={
									sortOption === 'lowest' ? 'bg-accent' : ''
								}
							>
								{t('lowestRating')}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t('emoji')}</TableHead>
							<TableHead>{t('opinion')}</TableHead>
							<TableHead>{t('feedback')}</TableHead>
							<TableHead>{t('timestamp')}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center py-8"
								>
									{t('loading')}
								</TableCell>
							</TableRow>
						) : filteredFeedback.length > 0 ? (
							filteredFeedback.map((feedback) => (
								<TableRow key={feedback.id}>
									<TableCell>{feedback.opinion}</TableCell>
									<TableCell>
										<Badge
											variant={
												feedback.opinion === '🔥' ||
												feedback.opinion === '😍'
													? 'secondary'
													: feedback.opinion ===
																'💩' ||
														  feedback.opinion ===
																'🤮'
														? 'outline'
														: 'secondary'
											}
										>
											{feedback.opinion === '🔥' ||
											feedback.opinion === '😍'
												? t('positive')
												: feedback.opinion === '💩' ||
													  feedback.opinion === '🤮'
													? t('negative')
													: t('neutral')}
										</Badge>
									</TableCell>
									<TableCell>{feedback.feedback}</TableCell>
									<TableCell>
										{new Date(
											feedback.timestamp
										).toLocaleString()}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center py-8"
								>
									{t('noFeedback')}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
