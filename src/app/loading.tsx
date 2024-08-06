import AnimatedBarLoader from '@/components/ui/AnimatedBarLoader'

export default function Loading() {
	return (
		<div className="grid w-screen h-screen place-items-center">
			<AnimatedBarLoader />
		</div>
	)
}
