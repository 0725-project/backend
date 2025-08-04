import { ChevronDown } from 'lucide-react'
import { PostCard } from './PostCard'
import { useInfiniteScrollPosts } from '../../hooks/useInfiniteScrollPosts'

const MainContent = () => {
    const { posts, loading, hasMore } = useInfiniteScrollPosts()
    return (
        <main className='flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] overflow-y-auto'>
            <div className='max-w-full md:max-w-5xl mx-auto px-2 md:px-4 py-2 md:py-4'>
                <div className='flex items-center space-x-2 md:space-x-4 mb-2 md:mb-4'>
                    <button className='text-blue-600 flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 text-sm md:text-base'>
                        Best
                        <ChevronDown className='w-4 h-4 ml-1' />
                    </button>
                </div>
                <div className='space-y-2 md:space-y-4'>
                    {posts.map((post, index) => (
                        <PostCard
                            key={index}
                            topic={post.topic?.name ?? 'No Topic'}
                            username={post.author?.username ?? 'Unknown'}
                            createdAt={post.createdAt}
                            title={post.title}
                            likes={post.viewCount}
                            comments={0}
                        />
                    ))}
                    {loading && <div className='text-center text-gray-400 py-4'>Loading...</div>}
                    {!hasMore && <div className='text-center text-gray-400 py-4'>모든 글을 불러왔습니다.</div>}
                </div>
            </div>
        </main>
    )
}

export { MainContent }
