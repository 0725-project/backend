'use client'

import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { PostCard } from './PostCard'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts, PostResponse, PostsResponse } from '@/api/posts'
import { formatDate } from '@/utils/dateFormatter'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getClosestAllowedValue } from '@/utils/getClosestAllowedValue'

const MAX_PAGE_BUTTONS = 5
const LIMIT_OPTIONS = [5, 10, 15, 20]

const MainContent = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const pageParam = searchParams.get('page')
        const limitParam = searchParams.get('limit')

        const pageNum = pageParam ? parseInt(pageParam, 10) : 1
        const limitNum = limitParam ? parseInt(limitParam, 10) : 10

        setPage(pageNum)
        setLimit(getClosestAllowedValue(limitNum, LIMIT_OPTIONS))
    }, [searchParams])

    const { data, isLoading, isError } = useQuery<PostsResponse, Error>({
        queryKey: ['posts', page, limit],
        queryFn: () => getPosts(page, limit),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    const posts: PostResponse[] = data?.posts ?? []
    const total: number = data?.total ?? 0
    const totalPages = Math.ceil(total / limit)

    const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2))
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1)
    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(e.target.value, 10)
        setLimit(newLimit)
        setPage(1)
        router.push(`?page=1&limit=${newLimit}`)
    }

    const makePageLink = (p: number) => `?page=${p}&limit=${limit}`

    return (
        <main className='flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] overflow-y-auto'>
            <div className='max-w-full md:max-w-5xl mx-auto px-2 md:px-4 py-2 md:py-4'>
                <div className='flex items-center justify-between mb-2 md:mb-4'>
                    <button className='text-blue-600 flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 text-sm md:text-base'>
                        Best
                        <ChevronDown className='w-4 h-4 ml-1' />
                    </button>

                    <div className='text-sm'>
                        <label htmlFor='limit' className='mr-2 text-gray-700'>
                            개수:
                        </label>
                        <select
                            id='limit'
                            value={limit}
                            onChange={handleLimitChange}
                            className='border rounded px-2 py-1 text-sm'
                        >
                            {LIMIT_OPTIONS.map((num) => (
                                <option key={num} value={num}>
                                    {num}개
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='space-y-2 md:space-y-4 min-h-[300px]'>
                    {isLoading ? (
                        <div className='text-center py-8 text-gray-400'>로딩 중...</div>
                    ) : isError ? (
                        <div className='text-center py-8 text-red-400'>게시글을 불러오지 못했습니다.</div>
                    ) : posts.length === 0 ? (
                        <div className='text-center py-8 text-gray-400'>게시글이 없습니다.</div>
                    ) : (
                        posts.map((post: PostResponse) => (
                            <div key={post.id}>
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
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className='flex justify-center items-center mt-6 space-x-2'>
                        <button
                            onClick={() => router.push(makePageLink(1))}
                            disabled={page === 1 || isLoading}
                            className='px-3 py-1 rounded-md border text-sm font-medium bg-white text-blue-600 border-gray-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <ChevronsLeft className='w-4 h-4 inline' />
                        </button>

                        <button
                            onClick={() => router.push(makePageLink(page - 1))}
                            disabled={page === 1 || isLoading}
                            className='px-3 py-1 rounded-md border text-sm font-medium bg-white text-blue-600 border-gray-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <ChevronLeft className='w-4 h-4 inline' />
                        </button>

                        {visiblePages.map((p) => (
                            <button
                                key={p}
                                className={`px-3 py-1 rounded-md border text-sm font-medium transition-all duration-150 ${
                                    p === page
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-blue-600 border-gray-300 hover:bg-blue-50'
                                }`}
                                onClick={() => router.push(makePageLink(p))}
                                disabled={isLoading}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => router.push(makePageLink(page + 1))}
                            disabled={page === totalPages || isLoading}
                            className='px-3 py-1 rounded-md border text-sm font-medium bg-white text-blue-600 border-gray-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <ChevronRight className='w-4 h-4 inline' />
                        </button>

                        <button
                            onClick={() => router.push(makePageLink(totalPages))}
                            disabled={page === totalPages || isLoading}
                            className='px-3 py-1 rounded-md border text-sm font-medium bg-white text-blue-600 border-gray-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <ChevronsRight className='w-4 h-4 inline' />
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}

export { MainContent }
