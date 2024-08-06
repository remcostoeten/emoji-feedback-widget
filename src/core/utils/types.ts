export type OpinionEmoji = {
	text: string
	emoji: string
}

import { ReactNode } from 'react'

export interface Activity {
	imageUrl: string
	content: string
	timestamp: string
}

export interface ActivityItemProps {
	imageUrl: string
	content: React.ReactNode | string
	time: string
}

export interface GitHubEvent {
	type: string
	actor: {
		avatar_url: string
		login: string
	}
	repo: {
		name: string
	}
	created_at: string
	payload?: any
}

export interface UrlInfoProps {
	url: string
	label: string
	time: string
}

export interface RepoData {
	id: string
	imageUrl: string
	content: string
	commitMessage?: string
	timestamp: number
}

export interface NavigationProps {
	className?: string
	rounded?: string
}

export interface ProjectData {
	full_name: string
	name: string
	url: string
	productionUrl: string
	latestCommit: {
		message: string
		date: string
		author: string
		branch: string
	}
	pushed_at: string
}

export interface ProjectCardProps {
	repoName: string
}

export interface CardBodyProps {
	productionUrl: string
	latestCommit: ProjectData['latestCommit']
	productionTime: string
	latestTime: string
}

export interface UrlInfoProps {
	url: string
	label: string
	time: string
}

export interface ProjectData {
	full_name: string
	name: string
	url: string
	productionUrl: string
	latestCommit: {
		message: string
		date: string
		author: string
		branch: string
	}
	pushed_at: string
}

export interface ProjectCardProps {
	repoName: string
}

export type Tab = {
	id: number
	label: string
	path: string
	isActive: boolean
	content: ReactNode
}

export type LayoutProps = {
	children: ReactNode
}

export interface ProjectData {
	full_name: string
	name: string
	url: string
	productionUrl: string
	latestCommit: {
		message: string
		date: string
		author: string
		branch: string
	}
	pushed_at: string
}

export type HoverCardProps = {
	children: React.ReactNode
	width?: string
	height?: string
	padding?: string
	className?: string
} & React.HTMLAttributes<HTMLDivElement>

export type CoolButtonProps = {
	hasCoolMode?: boolean
	onClick?: () => void
	isLoading?: boolean
	feedbackText?: string
	isNotEmpty?: boolean
	children?: React.ReactNode
	disabled?: boolean
}

export type EmojiButtonProps = {
	item: {
		text: string
		emoji: string
	}
	selectedOpinion: string | null
	onSelect: (opinion: string) => void
}

export interface Feedback {
	id: number
	opinion: string | null
	feedback: string | null
	timestamp: string
}

export interface EmojiCount {
	[emoji: string]: number
}

export interface FeedbackData {
	feedbacks: Feedback[]
	emojiCounts: Record<string, number>
}
