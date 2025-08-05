import { ChevronDown } from 'lucide-react'
import { PostCard } from './PostCard'
import { useInfiniteScrollPosts } from '../../hooks/useInfiniteScrollPosts'
import { useEffect, useRef } from 'react'
import { getAnchorHref } from '@/utils/getAnchorHref'
import Link from 'next/link'
import { formatDate } from '@/utils/dateFormatter'

const STORAGE_KEY = 'main_page_state'

const MainContent = () => {
    const isRestored = useRef(false)
    let initialState = undefined

    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        const saved = sessionStorage.getItem(STORAGE_KEY)
        if (saved) {
            initialState = JSON.parse(saved)
        }
    }

    const { posts, loading, hasMore, nextCursor } = useInfiniteScrollPosts({
        initialPosts: initialState?.posts,
        initialNextCursor: initialState?.nextCursor,
        initialHasMore: initialState?.hasMore,
    })

    useEffect(() => {
        if (initialState && !isRestored.current) {
            setTimeout(() => {
                window.scrollTo(0, initialState.scrollY || 0)
                sessionStorage.removeItem(STORAGE_KEY)
            }, 0)

            isRestored.current = true
        }
    }, [initialState])

    useEffect(() => {
        const handleLinkClick = (e: MouseEvent) => {
            const href = getAnchorHref(e.target as HTMLElement)
            if (href && href !== '/') {
                sessionStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        posts,
                        nextCursor,
                        hasMore,
                        scrollY: window.scrollY,
                    }),
                )
            }
        }

        document.addEventListener('click', handleLinkClick, true)

        return () => {
            document.removeEventListener('click', handleLinkClick, true)
        }
    }, [posts, nextCursor, hasMore])

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
                        <Link href={`/topics/${post.topic?.name}/${post.topicLocalId}`} key={index} className='block'>
                            <PostCard
                                topic={post.topic?.name ?? 'No Topic'}
                                username={post.author?.username ?? 'Unknown'}
                                createdAt={formatDate(post.createdAt)}
                                title={post.title}
                                likes={post.likeCount}
                                comments={post.commentCount}
                                views={post.viewCount}
                            />
                        </Link>
                    ))}
                    {loading && <div className='text-center text-gray-400 py-4'>로딩 중...</div>}
                    {!hasMore && <div className='text-center text-gray-400 py-4'>모든 글을 불러왔습니다.</div>}
                </div>
            </div>
        </main>
    )
}

export { MainContent }
