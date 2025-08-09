'use client'

import { PageLayout } from '../components/PageLayout'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts, PostResponse, PostsResponse } from '@/api/posts'
import { getClosestAllowedValue } from '@/utils/getClosestAllowedValue'
import Link from 'next/link'
import { PostCard } from '../components/AllPosts/PostCard'
import Pagination from '../components/Pagination'

const LIMIT_OPTIONS = [5, 10, 15, 20]
const MAX_PAGE_BUTTONS = 5

export default function SearchPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const query = searchParams.get('query') || ''
    const pageParam = searchParams.get('page')
    const limitParam = searchParams.get('limit')

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        const pageNum = pageParam ? parseInt(pageParam, 10) : 1
        const limitNum = limitParam ? parseInt(limitParam, 10) : 10
        setPage(pageNum)
        setLimit(getClosestAllowedValue(limitNum, LIMIT_OPTIONS))
    }, [pageParam, limitParam])

    const { data, isLoading, isError } = useQuery<PostsResponse, Error>({
        queryKey: ['search-posts', query, page, limit],
        queryFn: () => getPosts({ q: query, page, limit }),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: !!query,
    })

    const posts: PostResponse[] = data?.posts ?? []
    const total = data?.total ?? 0
    const totalPages = Math.ceil(total / limit)

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit)
        setPage(1)
        router.push(`?query=${encodeURIComponent(query)}&page=1&limit=${newLimit}`)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        router.push(`?query=${encodeURIComponent(query)}&page=${newPage}&limit=${limit}`)
    }

    return (
        <PageLayout>
            <div className='max-w-5xl mx-auto p-5'>
                <h1 className='text-2xl font-bold mb-4'>검색 결과</h1>
                <p className='mb-6 text-gray-500'>"{query}"에 대한 검색 결과입니다.</p>
                <div className='space-y-4 min-h-[200px]'>
                    {isLoading ? (
                        <div className='text-center py-8 text-gray-400'>로딩 중...</div>
                    ) : isError ? (
                        <div className='text-center py-8 text-red-400'>검색 결과를 불러오지 못했습니다.</div>
                    ) : posts.length === 0 ? (
                        <div className='text-center py-8 text-gray-400'>검색 결과가 없습니다.</div>
                    ) : (
                        posts.map((post: PostResponse, index) => (
                            <div key={index}>
                                <Link href={`/topics/${post.topic?.slug}/${post.topicLocalId}`} className='block'>
                                    <PostCard
                                        topic={post.topic?.name ?? 'No Topic'}
                                        username={post.author?.username ?? 'Unknown'}
                                        createdAt={post.createdAt}
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
                    <div className='mt-8'>
                        <Pagination
                            page={page}
                            limit={limit}
                            total={total}
                            limitOptions={LIMIT_OPTIONS}
                            onLimitChange={handleLimitChange}
                            onPageChange={handlePageChange}
                            isLoading={isLoading}
                            maxPageButtons={MAX_PAGE_BUTTONS}
                        />
                    </div>
                )}
            </div>
        </PageLayout>
    )
}
