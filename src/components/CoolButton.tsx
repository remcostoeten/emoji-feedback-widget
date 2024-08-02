import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import { AnimatedSubscribeButton } from './SubmitBtn'
import { CoolButtonProps } from '@/core/utils/types'
import { useTranslation } from 'react-i18next'

export default function CoolButton({
  onClick,
  isLoading,
  hasCoolMode,
  isNotEmpty,
}: CoolButtonProps) {
  const buttonContent = (
    <span
      className={`group inline-flex my-2 gap-4 items-center ${!isNotEmpty || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    ></span>
  )

  const { t } = useTranslation()

  return (
    <>
      <p>
        <AnimatedSubscribeButton
          buttonColor='#fff'
          buttonTextColor='#000000'
          disabled={!isNotEmpty || isLoading}
          subscribeStatus={false}
          initialText={
            <span className='group inline-flex items-center'>
              {t('submitFeedback')}
              <ChevronRightIcon className='ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
            </span>
          }
          changeText={
            <div className='flex items-center gap-4'>
              <p className='translate-x-12'>{t('feedbackSent')}</p>
              <img
                src='/rocket.webp'
                alt='rocket'
                className='translate-x-28 h-12 w-12 absolute'
              />
            </div>
          }
        />
      </p>
      <button
        onClick={onClick}
        disabled={!isNotEmpty || isLoading}
        className={`cool-button ${hasCoolMode ? 'cool-mode' : ''}`}
      >
        {buttonContent}
      </button>
    </>
  )
}
