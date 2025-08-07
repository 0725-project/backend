'use client'

import { useEffect, useState, useRef } from 'react'
import { PageLayout } from '@/app/components/PageLayout'
import { getTopic, TopicResponse } from '@/api/topics'
import TopicPostCard from '../../components/TopicsDetail/TopicPostCard'
import { formatDate } from '@/utils/dateFormatter'
import Link from 'next/link'

interface TopicDetailProps {
    topicSlug: string
}

const TopicDetail = (props: TopicDetailProps) => {
    const [topic, setTopic] = useState<TopicResponse | null>(null)

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
                {/* {posts.length === 0 && !loading && (
                    <div className='text-gray-500 text-center py-10'>게시글이 없습니다.</div>
                )}
                {posts.map((post, index) => (
                    <Link
                        href={`/topics/${props.topicSlug}/${post.id}`}
                        key={index}
                        className='no-underline'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <TopicPostCard key={index} post={post} />
                    </Link>
                ))} */}
            </section>
        </>
    )
}

export default TopicDetail
