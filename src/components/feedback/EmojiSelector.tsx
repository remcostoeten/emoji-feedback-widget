'use client'

import { opinionEmojis } from '@/core/config/config'
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import EmojiButton from '../EmojiButton'

export function EmojiSelector(): JSX.Element {
	const { t } = useTranslation()
	const {
		selectedOpinion,
		selectOpinion,
		setStoredEmoji,
		setFeedbackHidden,
	} = useFeedbackStore()

	const handleEmojiSelect = useCallback(
		(opinion: string) => {
			selectOpinion(opinion)
			setStoredEmoji(opinion)
			setFeedbackHidden(true)
			toast(t('emojiReceived'))
		},
		[selectOpinion, setStoredEmoji, setFeedbackHidden, t]
	)

	const translatedOpinionEmojis = opinionEmojis.map((emoji) => ({
		...emoji,
		text: t(emoji.text),
	}))

	return (
		<div className="flex flex-wrap items-center justify-between w-full px-7 translate-x-1.5 gap-x-6">
			<h2 id="feedback-label" className="text-sm text-disabled">
				{t('feedbackLabel')}
			</h2>
			<div
				className="flex items-center text-text emojis"
				role="group"
				aria-labelledby="feedback-label"
			>
				{translatedOpinionEmojis.map((item) => (
					<EmojiButton
						key={item.text}
						item={item}
						selectedOpinion={selectedOpinion}
						onSelect={handleEmojiSelect}
					/>
				))}
			</div>
		</div>
	)
}
