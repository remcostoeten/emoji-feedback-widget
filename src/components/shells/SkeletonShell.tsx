const Skeleton = ({ className }) => (
	<div aria-live="polite" aria-busy="true" className={className}>
		<span className="inline-flex w-full animate-pulse select-none rounded-md bg-[#0a0a0a] leading-none">
			‌
		</span>
		<br />
	</div>
)

const SVGSkeleton = ({ className }) => (
	<svg className={className + ' animate-pulse rounded bg-[#666666]'} />
)

export { SVGSkeleton, Skeleton }
