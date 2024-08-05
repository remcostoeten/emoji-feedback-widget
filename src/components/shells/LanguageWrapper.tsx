'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Skeleton, SVGSkeleton } from './SkeletonShell'

interface LanguageWrapperProps {
	children: React.ReactNode
}

const LanguageWrapper: React.FC<LanguageWrapperProps> = ({ children }) => {
	const { i18n } = useTranslation()
	const [isHydrated, setIsHydrated] = useState(false)
	const [isFeedbackHidden, setIsFeedbackHidden] = useState(true)

	useEffect(() => {
		const savedLanguage = localStorage.getItem('language')
		if (savedLanguage && savedLanguage !== i18n.language) {
			i18n.changeLanguage(savedLanguage)
		}

		const feedbackHidden = localStorage.getItem('feedbackHidden')
		setIsFeedbackHidden(feedbackHidden === 'true')

		setIsHydrated(true)
	}, [i18n])

	if (!isHydrated) {
		return (
			<>
				<div>
					<div className="hidden sm:block">
						<nav className="z--6">
							<ul className="relative mx-auto mt-6 flex w-fit border-2 border-black p-1 justify-center items-center content-center">
								<li className="relative z-10 block px-3 py-1.5 md:px-5 md:py-3">
									<a>
										<Skeleton className="w-[32px] max-w-full" />
									</a>
								</li>
								<li className="relative z-10 block px-3 py-1.5 md:px-5 md:py-3">
									<a>
										<Skeleton className="w-[48px] max-w-full" />
									</a>
								</li>
								<li className="absolute z-0 h-7 border border-border md:h-12"></li>
								<div className="flex items-center space-x-4">
									<li className="ml-4">
										<div className="inline-flex items-center justify-center transition-colors h-9 w-9">
											<SVGSkeleton className="w-[24px] h-[24px]" />
										</div>
									</li>
									<li className="ml-4">
										<div className="relative inline-block text-left z-50">
											<div>
												<div className="inline-flex justify-center w-full border border-border shadow-sm px-4 py-2">
													<Skeleton className="w-[88px] max-w-full" />
													<span className="mr-2">
														<Skeleton className="w-[32px] max-w-full" />
													</span>
													<SVGSkeleton className="ml-2 w-5 h-5" />
												</div>
											</div>
										</div>
									</li>
									<li>
										<div className="flex h-9 w-full items-center justify-between border border-zinc-200 px-3 py-2 shadow-sm [&amp;>span]:line-clamp-1 dark:border-zinc-800">
											<span>
												<Skeleton className="w-[40px] max-w-full" />
											</span>
											<SVGSkeleton className="w-[15px] h-[15px]" />
										</div>
									</li>
								</div>
							</ul>
						</nav>
					</div>
					<div className="sm:hidden p-4">
						<div className="inline-flex items-center justify-center transition-colors h-9 w-9 lg:hidden">
							<SVGSkeleton className="w-[24px] h-[24px]" />
						</div>
					</div>
					<main className="container mx-auto pt-[5%]">
						<div className="mx-auto py-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
								<div className="relative w-1/2 sm:w-full">
									<div className="relative z-10">
										<div className="w-full">
											<div className="flex flex-col space-y-1.5 p-6">
												<h3 className="leading-none tracking-tight">
													<Skeleton className="w-[112px] max-w-full" />
												</h3>
											</div>
											<div className="p-6 pt-0">
												<div>
													<span className="inline-block tracking-wider">
														<Skeleton className="w-[16px] max-w-full" />
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="absolute group-hover:opacity-0"></div>
								</div>
								<div className="relative w-1/2 sm:w-full">
									<div className="relative z-10">
										<div className="w-full">
											<div className="flex flex-col space-y-1.5 p-6">
												<h3 className="leading-none tracking-tight">
													<Skeleton className="w-[136px] max-w-full" />
												</h3>
											</div>
											<div className="p-6 pt-0">
												<div>
													<span className="inline-block tracking-wider">
														<Skeleton className="w-[16px] max-w-full" />
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="absolute group-hover:opacity-0"></div>
								</div>
								<div className="relative w-1/2 sm:w-full">
									<div className="relative z-10">
										<div className="w-full">
											<div className="flex flex-col space-y-1.5 p-6">
												<h3 className="leading-none tracking-tight">
													<Skeleton className="w-[136px] max-w-full" />
												</h3>
											</div>
											<div className="p-6 pt-0">
												<div>
													<span className="inline-block tracking-wider">
														<Skeleton className="w-[14px] max-w-full" />
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="absolute group-hover:opacity-0"></div>
								</div>
							</div>
							<div className="mb-8 flex justify-between items-center gap-4">
								<div className="col-span-1 md:col-span-2 relative w-[400px]">
									<div className="w-full placeholder:pl-10 pl-[100px]">
										<Skeleton className="w-[216px] max-w-full" />
									</div>
									<SVGSkeleton className="absolute left-6 top-1/2 -translate-y-1/2 w-[24px] h-[24px]" />
								</div>
								<div className="flex items-center gap-2">
									<div className="inline-flex items-center justify-start h-9 px-4 py-2 w-full">
										<span className="mr-2">
											<Skeleton className="w-[96px] max-w-full" />
										</span>
										<SVGSkeleton className="w-[24px] h-[24px]" />
									</div>
									<div className="inline-flex items-center justify-start h-9 px-4 py-2 w-full">
										<span className="mr-2">
											<Skeleton className="w-[48px] max-w-full" />
										</span>
										<SVGSkeleton className="w-[24px] h-[24px]" />
									</div>
									<div className="flex h-9 w-full items-center justify-between border border-zinc-200 px-3 py-2 shadow-sm [&amp;>span]:line-clamp-1 dark:border-zinc-800">
										<span>
											<Skeleton className="w-[16px] max-w-full" />
										</span>
										<SVGSkeleton className="w-[15px] h-[15px]" />
									</div>
								</div>
							</div>
							<div className="overflow-x-auto">
								<div className="relative w-full overflow-auto">
									<table className="w-full caption-bottom">
										<thead className="[&amp;_tr]:border-b">
											<tr className="border-b border-border transition-colors">
												<th className="h-10 px-2 text-left align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[40px] max-w-full" />
												</th>
												<th className="h-10 px-2 text-left align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[56px] max-w-full" />
												</th>
												<th className="h-10 px-2 text-left align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[64px] max-w-full" />
												</th>
												<th className="h-10 px-2 text-left align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[72px] max-w-full" />
												</th>
												<th className="h-10 px-2 text-left align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[32px] max-w-full" />
												</th>
												<th className="h-10 px-2 text-left align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[56px] max-w-full" />
												</th>
											</tr>
										</thead>
										<tbody className="[&amp;_tr:last-child]:border-0">
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-[#454545] shadow-xl shadow-red-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[48px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[96px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[96px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-[#454545] shadow-xl shadow-red-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[112px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[48px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[120px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-transparent shadow-xl shadow-green-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[96px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[48px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[120px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-transparent shadow-xl shadow-green-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[80px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[48px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[120px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-transparent shadow-xl shadow-green-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]"></td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[48px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[120px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-transparent shadow-xl shadow-green-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[32px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[96px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[96px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-transparent shadow-xl shadow-green-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[64px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[96px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[120px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-transparent shadow-xl shadow-green-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[40px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[56px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[120px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-[#454545] shadow-xl shadow-red-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[56px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[56px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[120px] max-w-full" />
												</td>
											</tr>
											<tr className="border-b border-border transition-colors">
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[16px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<div className="inline-flex items-center border px-2.5 py-0.5 transition-colors dark:border-zinc-800 border-transparent shadow-xl shadow-green-400/10">
														<Skeleton className="w-[64px] max-w-full" />
													</div>
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[96px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[160px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[72px] max-w-full" />
												</td>
												<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
													<Skeleton className="w-[120px] max-w-full" />
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<footer className="mt-8">
								<nav className="mx-auto flex w-full justify-center">
									<ul className="flex flex-row items-center gap-1">
										<li>
											<a className="inline-flex items-center justify-center transition-colors h-9 px-4 py-2 gap-1 pl-2.5">
												<SVGSkeleton className="w-[15px] h-[15px]" />
												<span>
													<Skeleton className="w-[64px] max-w-full" />
												</span>
											</a>
										</li>
										<li>
											<a className="inline-flex items-center justify-center transition-colors border border-zinc-200 shadow-sm dark:border-zinc-800 h-9 w-9">
												<Skeleton className="w-[14px] max-w-full" />
											</a>
										</li>
										<li>
											<a className="inline-flex items-center justify-center transition-colors h-9 w-9">
												<Skeleton className="w-[14px] max-w-full" />
											</a>
										</li>
										<li>
											<a className="inline-flex items-center justify-center transition-colors h-9 px-4 py-2 gap-1 pr-2.5">
												<span>
													<Skeleton className="w-[32px] max-w-full" />
												</span>
												<SVGSkeleton className="w-[15px] h-[15px]" />
											</a>
										</li>
									</ul>
								</nav>
							</footer>
						</div>
					</main>
				</div>
			</>
		)
	}

	return <>{children}</>
}

export default LanguageWrapper
