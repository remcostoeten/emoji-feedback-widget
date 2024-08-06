const Skeleton = ({ className }) => (
	<div aria-live="polite" aria-busy="true" className={className}>
		<span className="inline-flex w-full animate-pulse select-none rounded-md bg-[#4a4444] leading-none bg-opacity-30 animate-pulse">
			‌
		</span>
		<br />
	</div>
)

const SVGSkeleton = ({ className }) => (
	<svg className={className + ' animate-pulse rounded bg-[#d0b8b8]'} />
)

export { SVGSkeleton, Skeleton }
