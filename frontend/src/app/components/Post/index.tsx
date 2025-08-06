'use client'

import { incrementPostViewCount } from '@/api/posts'
import { GetPostCommentsResponse, PostResponse } from '@/api/types'
import { formatDate } from '@/utils/dateFormatter'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Comments from './Comments'

interface PostProps {
    post: PostResponse
    comments: GetPostCommentsResponse
}

const PostPage = ({ post, comments }: PostProps) => {
    useEffect(() => {
        const incrementViewCount = async () => {
            try {
                await incrementPostViewCount(post.id)
            } catch (error) {
                console.error('Failed to increment view count:', error)
            }
        }
        incrementViewCount()
    }, [post.id])

    const router = useRouter()

    return (
        <section className='bg-white w-full flex justify-center px-2 md:px-0'>
            <article className='bg-white rounded-2xl max-w-5xl w-full p-3 md:p-10'>
                <header className='mb-6 border-b border-gray-100 pb-4 flex flex-col gap-2'>
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-900 leading-tight break-words'>
                        {post.title}
                    </h1>
                    <div className='flex items-center gap-3 text-sm text-gray-500'>
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-base'>
                                {post.author.nickname?.[0]?.toUpperCase() || '?'}
                            </div>
                            <span className='font-medium text-gray-700'>{post.author.nickname}</span>
                        </div>
                        <span className='hidden md:inline'>·</span>
                        <span>
                            {formatDate(post.createdAt, {
                                todayFormat: false,
                                fullDateFormat: true,
                            })}
                        </span>
                        <span className='hidden md:inline'>·</span>
                        <span>조회수 {post.viewCount}</span>
                    </div>
                </header>
                <div className='prose max-w-none text-gray-900 min-h-[200px]'>
                    <p>{post.content}</p>
                </div>
                <Comments post={post} initialComments={comments} />
            </article>
        </section>
    )
}

export { PostPage }
