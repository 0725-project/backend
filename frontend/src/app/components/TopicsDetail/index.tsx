'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTopic, getTopicPosts, TopicResponse, TopicPostsResponse } from '@/api/topics'
import TopicPostCard from '../../components/TopicsDetail/TopicPostCard'
import { formatDate } from '@/utils/dateFormatter'
import Link from 'next/link'
import Pagination from '../Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { getClosestAllowedValue } from '@/utils/getClosestAllowedValue'

interface TopicDetailProps {
    topicSlug: string
}

const LIMIT_OPTIONS = [5, 10, 15, 20]
const MAX_PAGE_BUTTONS = 5

const TopicDetail = (props: TopicDetailProps) => {
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

    const {
        data: topic,
        isLoading: isTopicLoading,
        isError: isTopicError,
    } = useQuery<TopicResponse, Error>({
        queryKey: ['topic', props.topicSlug],
        queryFn: () => getTopic(props.topicSlug),
        enabled: !!props.topicSlug,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    const {
        data: postsData,
        isLoading,
        isError,
    } = useQuery<TopicPostsResponse, Error>({
        queryKey: ['topicPosts', props.topicSlug, page, limit],
        queryFn: () => getTopicPosts(props.topicSlug, page, limit),
        enabled: !!props.topicSlug,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    const posts = postsData?.posts ?? []
    const total = postsData?.total ?? 0
    const totalPages = Math.ceil(total / limit)

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit)
        setPage(1)
        router.push(`?page=1&limit=${newLimit}`)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        router.push(`?page=${newPage}&limit=${limit}`)
    }

    return (
        <>
            {isTopicLoading ? (
                <div className='text-center text-gray-500 py-10'>로딩 중...</div>
            ) : isTopicError || !topic ? (
                <div className='text-center text-red-400 py-10'>토픽 정보를 불러오지 못했습니다.</div>
            ) : (
                <section className='max-w-5xl mx-auto px-2 md:px-4 py-4'>
                    <h2 className='text-2xl font-bold mb-2 text-blue-600'>{topic.name}</h2>
                    <p className='text-gray-700 mb-2'>{topic.description}</p>
                    <div className='text-sm text-gray-500 flex gap-2'>
                        <span>작성자: {topic.creator.nickname}</span>
                        <span>·</span>
                        <span>{formatDate(topic.createdAt)}</span>
                    </div>
                </section>
            )}
            <section className='max-w-5xl mx-auto px-2 md:px-4 py-4'>
                <h3 className='text-xl font-bold mb-4 text-gray-800'>게시글 목록</h3>
                <div className='space-y-2 md:space-y-4 min-h-[300px]'>
                    {isLoading ? (
                        <div className='text-center py-8 text-gray-400'>로딩 중...</div>
                    ) : isError ? (
                        <div className='text-center py-8 text-red-400'>게시글을 불러오지 못했습니다.</div>
                    ) : posts.length === 0 ? (
                        <div className='text-center py-8 text-gray-400'>게시글이 없습니다.</div>
                    ) : (
                        posts.map((post, index) => (
                            <Link
                                href={`/topics/${props.topicSlug}/${post.id}`}
                                key={index}
                                className='no-underline'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <TopicPostCard key={index} post={post} />
                            </Link>
                        ))
                    )}
                </div>
                {totalPages > 1 && (
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
                )}
            </section>
        </>
    )
}

export default TopicDetail
