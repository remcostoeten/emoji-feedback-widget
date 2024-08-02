'use client'

import React, { useRef, useEffect } from 'react'
import { RGBA_COLORS } from '@/core/utils/helpers'
import { HoverCardProps } from '@/core/utils/types'

export default function HoverCard({
  children,
  width = 'w-full',
  height = 'auto',
  padding,
  className = '',
  ...props
}: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  const HOVER_COLOR =
    RGBA_COLORS[Math.floor(Math.random() * RGBA_COLORS.length)]

  const handleOnMouseMove = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)
  }

  useEffect(() => {
    const card = cardRef.current
    if (card) {
      card.addEventListener('mousemove', handleOnMouseMove)

      const style = document.createElement('style')
      style.innerHTML = `
        .card::before {
          background: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y),
            ${HOVER_COLOR},
            transparent 40%
          );
          border-radius: inherit;
          content: "";
          height: 100%;
          left: 0;
          top: 0;
          position: absolute;
          width: 100%;
          z-index: 2;
          opacity: 0;
          transition: opacity 500ms;
        }
      
        .card:hover::before {
          opacity: 1;
        }
      `

      document.head.appendChild(style)

      return () => {
        card.removeEventListener('mousemove', handleOnMouseMove)
        document.head.removeChild(style)
      }
    }
  }, [])

  const style = {
    width,
    height,
    padding,
  }

  return (
    <div
      ref={cardRef}
      className={`card cursor-pointer    relative ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}
