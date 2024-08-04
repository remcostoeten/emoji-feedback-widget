'use client'

import { useFontStore } from '@/core/stores/font-store'
import { fonts } from '../menus/FontSelector'

export default function FontWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	const { font } = useFontStore()
	const selectedFont =
		fonts.find((f) => f.value === font)?.font || fonts[0].font

	return <div className={selectedFont.className}>{children}</div>
}
