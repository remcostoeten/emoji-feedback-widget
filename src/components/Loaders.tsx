import { Skeleton, SkeletonText } from './shells/SkeletonShell'
import { memo } from 'react'

// Memoized skeleton row for better performance
const SkeletonRow = memo(function SkeletonRow({ index }: { index: number }) {
	const widths = [
		['16px', '64px', '48px', '160px', '96px', '96px'],
		['16px', '64px', '112px', '160px', '48px', '120px'],
		['16px', '64px', '96px', '160px', '48px', '120px'],
		['16px', '64px', '80px', '160px', '48px', '120px'],
		['16px', '64px', '', '160px', '48px', '120px'],
		['16px', '64px', '32px', '160px', '96px', '96px'],
		['16px', '64px', '64px', '160px', '96px', '120px'],
		['16px', '64px', '40px', '160px', '56px', '120px'],
		['16px', '64px', '56px', '160px', '56px', '120px'],
		['16px', '64px', '96px', '160px', '72px', '120px'],
	];
	
	const rowWidths = widths[index % widths.length];
	
	return (
		<tr className="border-b transition-colors">
			{rowWidths.map((width, cellIndex) => (
				<td key={cellIndex} className="p-2 align-middle">
					{cellIndex === 1 ? (
						<div className="inline-flex items-center px-2.5 py-0.5">
							<Skeleton width={width} height="20px" animation="shimmer" />
						</div>
					) : width ? (
						<Skeleton width={width} height="20px" animation="shimmer" />
					) : null}
				</td>
			))}
		</tr>
	);
});

export default function TableSkeleton() {
	return (
		<div className="overflow-x-auto animate-in fade-in-0 duration-500">
			<div className="relative w-full overflow-auto">
				<table className="w-full caption-bottom">
					<thead>
						<tr className="border-b transition-colors">
							<th className="h-10 px-2 text-left align-middle">
								<Skeleton width="40px" height="16px" animation="pulse" />
							</th>
							<th className="h-10 px-2 text-left align-middle">
								<Skeleton width="56px" height="16px" animation="pulse" />
							</th>
							<th className="h-10 px-2 text-left align-middle">
								<Skeleton width="64px" height="16px" animation="pulse" />
							</th>
							<th className="h-10 px-2 text-left align-middle">
								<Skeleton width="72px" height="16px" animation="pulse" />
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -[#454545]  shadow-red-400/10">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -[#454545]  shadow-red-400/10">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -transparent  ">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors - -transparent  ">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -transparent  ">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -transparent  -400/10">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -transparent  ">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -transparent  ">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -[#454545]  shadow-red-400/10">
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
						<tr className="  transition-colors">
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<Skeleton className="w-[16px] max-w-full" />
							</td>
							<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
								<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -transparent  ">
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
	)
}

const FeedbackSkeleton = () => (
	<>
		<section className="max-w-full fixed">
			<div className="relative min-w-[300px] md:min-w-[400px] h-auto w-fit  py-2 shadow-sm  gap-4 rounded-full">
				<div className="flex flex-wrap items-center justify-between w-full px-7 translate-x-1.5 gap-x-6">
					<h2>
						<Skeleton className="w-[192px] max-w-full" />
					</h2>
					<div className="flex items-center">
						<div className="flex h-8 w-8 items-center justify-center">
							<Skeleton className="w-[16px] max-w-full" />
						</div>
						<div className="flex h-8 w-8 items-center justify-center">
							<Skeleton className="w-[16px] max-w-full" />
						</div>
						<div className="flex h-8 w-8 items-center justify-center">
							<Skeleton className="w-[16px] max-w-full" />
						</div>
						<div className="flex h-8 w-8 items-center justify-center">
							<Skeleton className="w-[16px] max-w-full" />
						</div>
					</div>
				</div>
			</div>
		</section>
	</>
)

function NoResultsYetSkeleton() {
	return (
		<table className="w-full caption-bottom">
			<thead className="[&amp;_tr]:">
				<tr className="  transition-colors">
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
			<tbody className="[&amp;_tr:last-child]:-0">
				<tr className="  transition-colors">
					<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
						<Skeleton className="w-[16px] max-w-full" />
					</td>
					<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
						<div className="inline-flex items-center  px-2.5 py-0.5 transition-colors dark: -transparent  ">
							<Skeleton className="w-[64px] max-w-full" />
						</div>
					</td>
					<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
						<Skeleton className="w-[232px] max-w-full" />
					</td>
					<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
						<Skeleton className="w-[160px] max-w-full" />
					</td>
					<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
						<Skeleton className="w-[48px] max-w-full" />
					</td>
					<td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
						<Skeleton className="w-[16px] max-w-full" />
					</td>
				</tr>
			</tbody>
		</table>
	)
}

function TriangleLoader() {
	return (
		<div className="loader triangle">
			<svg viewBox="0 0 86 80">
				<polygon points="43 8 79 72 7 72"></polygon>
			</svg>
		</div>
	)
}

export { FeedbackSkeleton, NoResultsYetSkeleton, TriangleLoader }
