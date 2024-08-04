import { create } from 'zustand'

type FontStore = {
	font: string
	setFont: (font: string) => void
}

export const useFontStore = create<FontStore>((set) => ({
	font: 'inter',
	setFont: (font) => set({ font }),
}))
