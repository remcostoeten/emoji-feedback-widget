/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OlTm6nH4lRs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'

import { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function Component() {
	const [feedbackData, setFeedbackData] = useState([
		{
			id: 1,
			opinion: 'positive',
			feedback: 'Great product, love the new features!',
			timestamp: '2023-06-01 10:30:00',
		},
		{
			id: 2,
			opinion: 'negative',
			feedback: 'Disappointed with the performance, needs improvement.',
			timestamp: '2023-06-02 14:45:00',
		},
		{
			id: 3,
			opinion: 'positive',
			feedback: 'Excellent customer service, very responsive team.',
			timestamp: '2023-06-03 09:15:00',
		},
		{
			id: 4,
			opinion: 'neutral',
			feedback: 'The product is okay, but could be better.',
			timestamp: '2023-06-04 16:20:00',
		},
		{
			id: 5,
			opinion: 'negative',
			feedback: 'Buggy software, very frustrating to use.',
			timestamp: '2023-06-05 11:50:00',
		},
	])
	const [searchTerm, setSearchTerm] = useState('')
	const [filterOption, setFilterOption] = useState('all')
	const [sortOption, setSortOption] = useState('newest')
	const [loading, setLoading] = useState(false)
	const totalFeedback = feedbackData.length
	const positiveFeedback = feedbackData.filter(
		(feedback) => feedback.opinion === 'positive'
	).length
	const negativeFeedback = feedbackData.filter(
		(feedback) => feedback.opinion === 'negative'
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
			filtered = filtered.filter(
				(feedback) => feedback.opinion === filterOption
			)
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
					if (a.opinion === 'positive' && b.opinion === 'positive') {
						return 0
					} else if (a.opinion === 'positive') {
						return -1
					} else {
						return 1
					}
				})
				break
			case 'lowest':
				filtered = filtered.sort((a, b) => {
					if (a.opinion === 'negative' && b.opinion === 'negative') {
						return 0
					} else if (a.opinion === 'negative') {
						return -1
					} else {
						return 1
					}
				})
				break
			default:
				break
		}
		return filtered
	}, [feedbackData, searchTerm, filterOption, sortOption])
	const opinionEmojis = [
		{ text: 'positive', emoji: '🔥' },
		{ text: 'positive', emoji: '😍' },
		{ text: 'negative', emoji: '💩' },
		{ text: 'negative', emoji: '🤮' },
	]
	return (
		<div className="container mx-auto px-4 md:px-6 py-8">
			<header className="mb-8">
				<h1 className="text-2xl font-bold">Feedback Data</h1>
				<p className="text-muted-foreground">
					Overview of Emoji Feedback
				</p>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
				<Card>
					<CardHeader>
						<CardTitle>Negative Feedback</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold">
							{negativeFeedback}
						</div>
					</CardContent>
				</Card>
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
						{filteredFeedback.length > 0 ? (
							filteredFeedback.map((feedback) => (
								<TableRow key={feedback.id}>
									<TableCell>
										{
											opinionEmojis.find(
												(emoji) =>
													emoji.text ===
													feedback.opinion
											)?.emoji
										}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												feedback.opinion === 'positive'
													? 'secondary'
													: feedback.opinion ===
														  'negative'
														? 'outline'
														: 'default'
											}
										>
											{feedback.opinion}
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
				{loading && (
					<div className="flex justify-center py-8">
						<div />
					</div>
				)}
			</div>
		</div>
	)
}

function ChevronDownIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	)
}
