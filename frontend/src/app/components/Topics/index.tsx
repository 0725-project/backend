'use client'

import { useInfiniteScrollTopics } from '@/app/hooks/useInfiniteScrollTopics'
import { getAnchorHref } from '@/utils/getAnchorHref'
import { useEffect, useRef } from 'react'

const STORAGE_KEY = 'topics_page_state'

const TopicsList = () => {
    const isRestored = useRef(false)
    let initialState = undefined

    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        const saved = sessionStorage.getItem(STORAGE_KEY)
        if (saved) {
            initialState = JSON.parse(saved)
        }
    }

    const { topics, loading, hasMore, nextCursor } = useInfiniteScrollTopics({
        initialTopics: initialState?.topics,
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
            if (href && href !== '/topics') {
                sessionStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        topics,
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
    }, [topics, nextCursor, hasMore])

    return (
        <section className='max-w-5xl mx-auto px-2 md:px-4 py-4'>
            <h2 className='text-2xl font-bold mb-4 text-blue-600'>토픽 목록</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col min-h-[160px]'
                    >
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg'>
                                {topic.name.charAt(0).toUpperCase()}
                            </div>
                            <span className='text-lg font-semibold text-gray-900 truncate'>{topic.name}</span>
                        </div>
                        <p className='text-gray-700 text-sm mb-2 line-clamp-2'>
                            {topic.description || '설명이 없습니다.'}
                        </p>
                        <div className='flex items-center text-xs text-gray-500 mt-auto'>
                            <span>by {topic.creator?.nickname || topic.creator?.username || '알 수 없음'}</span>
                            <span className='mx-1'>•</span>
                            <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <div className='text-center text-gray-400 py-4'>로딩 중...</div>}
            {!hasMore && <div className='text-center text-gray-400 py-4'>더 이상 토픽이 없습니다.</div>}
        </section>
    )
}

export default TopicsList
