export function PostSkeleton() {
  return <div className="w-full h-6 rounded-full bg-gray-300 animate-pulse" />
}

export function PostsSkeleton() {
  return (
    <ul className="flex flex-col gap-2">
      {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).map(number => (
        <PostSkeleton key={number} />
      ))}
    </ul>
  )
}