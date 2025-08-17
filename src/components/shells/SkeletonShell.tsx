type TProps = {
	className?: string;
	animation?: 'pulse' | 'shimmer' | 'wave';
	width?: string | number;
	height?: string | number;
	rounded?: boolean;
}

function Skeleton({
	className = '',
	animation = 'shimmer',
	width,
	height,
	rounded = true
}: TProps) {
	const animationClass = {
		pulse: 'animate-pulse',
		shimmer: 'animate-shimmer',
		wave: 'animate-wave'
	}[animation];

	return (
		<div
			aria-live="polite"
			aria-busy="true"
			role="status"
			aria-label="Loading"
			className={`skeleton-loader ${animationClass} ${className}`}
			style={{
				width: width || '100%',
				height: height || '1.25rem',
				borderRadius: rounded ? '0.375rem' : '0'
			}}
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
}

function SVGSkeleton({ className = '', width = 24, height = 24 }: Partial<TProps>) {
	return (
		<svg
			className={`animate-shimmer skeleton-loader ${className}`}
			width={width}
			height={height}
			aria-hidden="true"
		/>
	);
}

function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
	return (
		<div className={`space-y-2 ${className}`}>
			{Array.from({ length: lines }).map((_, i) => (
				<Skeleton
					key={i}
					width={i === lines - 1 ? '80%' : '100%'}
					height="1rem"
				/>
			))}
		</div>
	);
}

function SkeletonCard({ className = '' }: { className?: string }) {
	return (
		<div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
			<Skeleton width="40%" height="1.5rem" className="mb-4" />
			<SkeletonText lines={2} className="mb-4" />
			<div className="flex gap-2">
				<Skeleton width="60px" height="32px" />
				<Skeleton width="60px" height="32px" />
			</div>
		</div>
	);
}

export { Skeleton, SVGSkeleton, SkeletonText, SkeletonCard };
