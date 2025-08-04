'use client'

import { PostResponse } from '@/api/types'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PostProps {
    post: PostResponse
}

const PostPage = ({ post }: PostProps) => {
    const [formatDate, setFormatDate] = useState<string>('')

    useEffect(() => {
        const formattedDate = new Date(post.createdAt).toLocaleString()
        setFormatDate(formattedDate)
    }, [post.createdAt])

    const router = useRouter()

    return (
        <section className='bg-white w-full flex justify-center px-2 md:px-0'>
            <article className='bg-white rounded-2xl max-w-5xl w-full p-3 md:p-10'>
                <MoveLeft
                    className='mb-4 text-gray-500 hover:text-gray-700 cursor-pointer'
                    onClick={() => router.back()}
                    aria-label='Go back'
                />
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
                        <span>{formatDate}</span>
                        <span className='hidden md:inline'>·</span>
                        <span>조회수 {post.viewCount}</span>
                    </div>
                </header>
                <div className='prose max-w-none text-gray-900 min-h-[200px]'>
                    <p>{post.content}</p>
                </div>
                <footer className='mt-8 flex flex-col md:flex-row items-center justify-between gap-2 border-t border-gray-100 pt-4'>
                    <div className='flex items-center gap-4 text-sm text-gray-400'>
                        <span>테스트</span>
                    </div>
                </footer>
            </article>
        </section>
    )
}

export { PostPage }
