import { ChevronDown } from 'lucide-react'
import { PostCard } from './PostCard'
import { useEffect, useRef } from 'react'
import { getAnchorHref } from '@/utils/getAnchorHref'
import Link from 'next/link'
import { formatDate } from '@/utils/dateFormatter'

const MainContent = () => {
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
                    {/* {posts.map((post, index) => (
                        <div key={index}>
                            <Link href={`/topics/${post.topic?.slug}/${post.topicLocalId}`} className='block'>
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
                        </div>
                    ))} */}
                </div>
            </div>
        </main>
    )
}

export { MainContent }
