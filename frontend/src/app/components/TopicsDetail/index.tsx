'use client'

import { useEffect, useState, useRef } from 'react'
import { PageLayout } from '@/app/components/PageLayout'
import { useInfiniteScrollTopicPosts } from '@/app/hooks/useInfiniteScrollTopicPosts'
import { getTopic } from '@/api/topics'
import { TopicResponse } from '@/api/types'
import TopicPostCard from '../../components/TopicsDetail/TopicPostCard'
import { formatDate } from '@/utils/dateFormatter'
import Link from 'next/link'

interface TopicDetailProps {
    topicSlug: string
}

const STORAGE_KEY = 'topic_detail_page_state'

const TopicDetail = (props: TopicDetailProps) => {
    const [topic, setTopic] = useState<TopicResponse | null>(null)
    const isRestored = useRef(false)
    let initialState: any = undefined

    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        const saved = sessionStorage.getItem(STORAGE_KEY)
        if (saved) {
            initialState = JSON.parse(saved)
        }
    }

    const { posts, loading, hasMore, nextCursor } = useInfiniteScrollTopicPosts({
        topicSlug: props.topicSlug,
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
            const href = (e.target as HTMLElement)?.closest('a')?.getAttribute('href')
            if (href && href !== `/topics/${props.topicSlug}`) {
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
    }, [posts, nextCursor, hasMore, props.topicSlug])

    useEffect(() => {
        if (!props.topicSlug) return
        getTopic(props.topicSlug).then(setTopic)
    }, [props.topicSlug])

    return (
        <>
            {topic ? (
                <section className='max-w-5xl mx-auto px-2 md:px-4 py-4'>
                    <h2 className='text-2xl font-bold mb-2 text-blue-600'>{topic.name}</h2>
                    <p className='text-gray-700 mb-2'>{topic.description}</p>
                    <div className='text-sm text-gray-500 flex gap-2'>
                        <span>작성자: {topic.creator.nickname}</span>
                        <span>·</span>
                        <span>{formatDate(topic.createdAt)}</span>
                    </div>
                </section>
            ) : (
                <div className='text-center text-gray-500 py-10'>로딩 중...</div>
            )}
            <section className='max-w-5xl mx-auto px-2 md:px-4 py-4'>
                <h3 className='text-xl font-bold mb-4 text-gray-800'>게시글 목록</h3>
                {posts.length === 0 && !loading && (
                    <div className='text-gray-500 text-center py-10'>게시글이 없습니다.</div>
                )}
                {posts.map((post, index) => (
                    <Link href={`/topics/${props.topicSlug}/${post.id}`} key={index} className='no-underline'>
                        <TopicPostCard key={index} post={post} />
                    </Link>
                ))}
                {loading && <div className='text-center py-4 text-blue-500'>로딩 중...</div>}
                {!hasMore && posts.length > 0 && (
                    <div className='text-center py-4 text-gray-400'>더 이상 게시글이 없습니다.</div>
                )}
            </section>
        </>
    )
}

export default TopicDetail
