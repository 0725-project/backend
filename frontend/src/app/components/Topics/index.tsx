'use client'

import React from 'react'
import { useInfiniteScrollTopics } from '@/app/hooks/useInfiniteScrollTopics'

const TopicsList = () => {
    const { topics, loading, hasMore } = useInfiniteScrollTopics()

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
