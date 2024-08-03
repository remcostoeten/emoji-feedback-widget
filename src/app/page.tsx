'use client'

import { useState, useMemo, useEffect } from 'react'
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

export default function Component() {
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
					return 1
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
			<header className="mb-8">
				<h1 className="text-2xl font-bold">Feedback Data</h1>
				<p className="text-muted-foreground">
					Overview of Emoji Feedback
				</p>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<HoverCard gradientOpacity={0.3}>
					{' '}
					<Card>
						<CardHeader>
							<CardTitle>Total Feedback</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								{totalFeedback}
							</div>
						</CardContent>
					</Card>
				</HoverCard>

				<HoverCard gradientOpacity={0.3}>
					<Card>
						<CardHeader>
							<CardTitle>Positive Feedback</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								{positiveFeedback}
							</div>
						</CardContent>
					</Card>
				</HoverCard>

				<HoverCard gradientOpacity={0.3}>
					<Card>
						<CardHeader>
							<CardTitle>Custom Feedback</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								Custom Content
							</div>
						</CardContent>
					</Card>
				</HoverCard>
			</div>
			<div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="col-span-1 md:col-span-2">
					<Input
						type="search"
						placeholder="Search feedback..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full"
					/>
				</div>
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="actions" className="w-full">
								<span className="mr-2">
									{filterOption === 'all'
										? 'All'
										: filterOption === 'positive'
											? 'Positive'
											: filterOption === 'negative'
												? 'Negative'
												: 'Neutral'}
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
								All
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setFilterOption('positive')}
								className={
									filterOption === 'positive'
										? 'bg-accent'
										: ''
								}
							>
								Positive
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setFilterOption('negative')}
								className={
									filterOption === 'negative'
										? 'bg-accent'
										: ''
								}
							>
								Negative
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setFilterOption('neutral')}
								className={
									filterOption === 'neutral'
										? 'bg-accent'
										: ''
								}
							>
								Neutral
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="actions" className="w-full">
								<span className="mr-2">
									{sortOption === 'newest'
										? 'Newest'
										: sortOption === 'oldest'
											? 'Oldest'
											: sortOption === 'highest'
												? 'Highest Rating'
												: 'Lowest Rating'}
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
								Newest
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setSortOption('oldest')}
								className={
									sortOption === 'oldest' ? 'bg-accent' : ''
								}
							>
								Oldest
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setSortOption('highest')}
								className={
									sortOption === 'highest' ? 'bg-accent' : ''
								}
							>
								Highest Rating
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => setSortOption('lowest')}
								className={
									sortOption === 'lowest' ? 'bg-accent' : ''
								}
							>
								Lowest Rating
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Emoji</TableHead>
							<TableHead>Opinion</TableHead>
							<TableHead>Feedback</TableHead>
							<TableHead>Timestamp</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center py-8"
								>
									Loading...
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
														: 'default'
											}
										>
											{feedback.opinion === '🔥' ||
											feedback.opinion === '😍'
												? 'positive'
												: feedback.opinion === '💩' ||
													  feedback.opinion === '🤮'
													? 'negative'
													: 'neutral'}
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
									No feedback available.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
