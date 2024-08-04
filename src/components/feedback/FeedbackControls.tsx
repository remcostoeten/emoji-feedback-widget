'use client'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui'
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { ChevronDownIcon, SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function FeedbackControls() {
	const { t } = useTranslation()
	const {
		searchTerm,
		filterOption,
		sortOption,
		itemsPerPage,
		setSearchTerm,
		setFilterOption,
		setSortOption,
		setItemsPerPage,
	} = useFeedbackStore()

	return (
		<div className="mb-8 flex justify-between items-center gap-4">
			<div className="col-span-1 md:col-span-2 relative w-[400px]">
				<Input
					className="vercel-card w-full placeholder:pl-10 pl-[100px]" // Add padding to the left
					type="search"
					placeholder={t('search')}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
			</div>
			<div className="flex items-center gap-2">
				<FilterDropdown />
				<SortDropdown />
				<ItemsPerPageSelect />
			</div>
		</div>
	)
}

function FilterDropdown() {
	const { t } = useTranslation()
	const { filterOption, setFilterOption } = useFeedbackStore()

	const FILTER_OPTIONS = {
		ALL: 'all',
		POSITIVE: 'positive',
		NEGATIVE: 'negative',
		NEUTRAL: 'neutral',
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="actions" className="w-full">
					<span className="mr-2">
						{filterOption === FILTER_OPTIONS.ALL
							? t('feedbackSectionLabel')
							: filterOption === FILTER_OPTIONS.POSITIVE
								? t('positiveFeedback')
								: filterOption === FILTER_OPTIONS.NEGATIVE
									? t('negativeFeedback')
									: t('neutralFeedback')}
					</span>
					<ChevronDownIcon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{Object.values(FILTER_OPTIONS).map((option) => (
					<DropdownMenuItem
						key={option}
						onSelect={() => setFilterOption(option)}
						className={filterOption === option ? 'bg-accent' : ''}
					>
						{t(
							option === FILTER_OPTIONS.ALL
								? 'feedbackSectionLabel'
								: `${option}Feedback`
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function SortDropdown() {
	const { t } = useTranslation()
	const { sortOption, setSortOption } = useFeedbackStore()

	const SORT_OPTIONS = {
		NEWEST: 'newest',
		OLDEST: 'oldest',
		HIGHEST: 'highest',
		LOWEST: 'lowest',
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="actions" className="w-full">
					<span className="mr-2">{t(sortOption)}</span>
					<ChevronDownIcon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{Object.values(SORT_OPTIONS).map((option) => (
					<DropdownMenuItem
						key={option}
						onSelect={() => setSortOption(option)}
						className={sortOption === option ? 'bg-accent' : ''}
					>
						{t(option)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function ItemsPerPageSelect() {
	const { itemsPerPage, setItemsPerPage } = useFeedbackStore()

	return (
		<Select
			value={itemsPerPage.toString()}
			onValueChange={(value) => setItemsPerPage(Number(value))}
		>
			<SelectTrigger>
				<SelectValue placeholder="Items per page" />
			</SelectTrigger>
			<SelectContent>
				{[10, 20, 50, 100].map((value) => (
					<SelectItem key={value} value={value.toString()}>
						{value}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
