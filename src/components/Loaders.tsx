import { Skeleton } from './shells/SkeletonShell'

const FeedbackSkeleton = () => (
  <>
    <section className='max-w-full'>
      <div className='relative min-w-[300px] md:min-w-[400px] h-auto w-fit border py-2 shadow-sm border-border gap-4 rounded-full'>
        <div className='flex flex-wrap items-center justify-between w-full px-7 translate-x-1.5 gap-x-6'>
          <h2>
            <Skeleton className='w-[192px] max-w-full' />
          </h2>
          <div className='flex items-center'>
            <div className='flex h-8 w-8 items-center justify-center'>
              <Skeleton className='w-[16px] max-w-full' />
            </div>
            <div className='flex h-8 w-8 items-center justify-center'>
              <Skeleton className='w-[16px] max-w-full' />
            </div>
            <div className='flex h-8 w-8 items-center justify-center'>
              <Skeleton className='w-[16px] max-w-full' />
            </div>
            <div className='flex h-8 w-8 items-center justify-center'>
              <Skeleton className='w-[16px] max-w-full' />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

function TriangleLoader() {
  return (
    <div className='loader triangle'>
      <svg viewBox='0 0 86 80'>
        <polygon points='43 8 79 72 7 72'></polygon>
      </svg>
    </div>
  )
}

export { TriangleLoader, FeedbackSkeleton }
