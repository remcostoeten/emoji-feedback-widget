import { Skeleton, SkeletonText, SkeletonCard } from './shells/SkeletonShell'
import { memo } from 'react'

// Memoized skeleton row for better performance
const SkeletonRow = memo(function SkeletonRow({ index }: { index: number }) {
	// Varied widths for more realistic appearance
	const widths = [
		['16px', '64px', '48px', '160px', '96px'],
		['16px', '64px', '112px', '160px', '48px'],
		['16px', '64px', '96px', '160px', '48px'],
		['16px', '64px', '80px', '160px', '48px'],
		['16px', '64px', '32px', '160px', '96px'],
		['16px', '64px', '64px', '160px', '96px'],
		['16px', '64px', '40px', '160px', '56px'],
		['16px', '64px', '56px', '160px', '72px'],
	];
	
	const rowWidths = widths[index % widths.length];
	
	return (
		<tr className="border-b transition-colors hover:bg-muted/50">
			{rowWidths.map((width, cellIndex) => (
				<td key={cellIndex} className="p-2 align-middle">
					{cellIndex === 1 ? (
						<div className="inline-flex items-center px-2.5 py-0.5 rounded-md">
							<Skeleton width={width} height="20px" animation="shimmer" />
						</div>
					) : (
						<Skeleton width={width} height="20px" animation="shimmer" />
					)}
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
							<th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
								<Skeleton width="40px" height="16px" animation="pulse" />
							</th>
							<th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
								<Skeleton width="56px" height="16px" animation="pulse" />
							</th>
							<th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
								<Skeleton width="64px" height="16px" animation="pulse" />
							</th>
							<th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
								<Skeleton width="72px" height="16px" animation="pulse" />
							</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 8 }).map((_, index) => (
							<SkeletonRow key={index} index={index} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const FeedbackSkeleton = memo(function FeedbackSkeleton() {
	return (
		<section className="max-w-full fixed animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
			<div className="relative min-w-[300px] md:min-w-[400px] h-auto w-fit py-2 shadow-sm gap-4 rounded-full bg-background/80 backdrop-blur-sm">
				<div className="flex flex-wrap items-center justify-between w-full px-7 translate-x-1.5 gap-x-6">
					<Skeleton width="192px" height="24px" animation="shimmer" />
					<div className="flex items-center gap-2">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="flex h-8 w-8 items-center justify-center">
								<Skeleton width="24px" height="24px" rounded animation="wave" />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
});

export const StatCardSkeleton = memo(function StatCardSkeleton() {
	return <SkeletonCard className="w-full" />;
});

export const NoResultsYetSkeleton = memo(function NoResultsYetSkeleton() {
	return (
		<div className="w-full py-8 text-center animate-in fade-in-0 duration-500">
			<SkeletonText lines={1} className="max-w-md mx-auto" />
		</div>
	);
});

export const TriangleLoader = memo(function TriangleLoader() {
	return (
		<div className="loader triangle animate-spin" role="status" aria-label="Loading">
			<svg viewBox="0 0 86 80" className="w-12 h-12">
				<polygon points="43 8 79 72 7 72" fill="currentColor" opacity="0.2" />
			</svg>
			<span className="sr-only">Loading...</span>
		</div>
	)
});

