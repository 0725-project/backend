import { useEffect, useState, useCallback } from 'react'
import { getTopics } from '@/api/topics'
import { TopicResponse } from '@/api/types'

interface UseInfiniteScrollTopicsOptions {
    initialTopics?: TopicResponse[]
    initialNextCursor?: number | null
    initialHasMore?: boolean
    initialLoading?: boolean
}

const useInfiniteScrollTopics = (options: UseInfiniteScrollTopicsOptions = {}) => {
    const [topics, setTopics] = useState<TopicResponse[]>(options.initialTopics || [])
    const [loading, setLoading] = useState(options.initialLoading ?? false)
    const [nextCursor, setNextCursor] = useState<number | null>(options.initialNextCursor ?? null)
    const [hasMore, setHasMore] = useState(options.initialHasMore ?? true)

    const fetchTopics = useCallback(
        async (cursor?: number) => {
            if (loading || !hasMore) return
            setLoading(true)
            try {
                const res = await getTopics(cursor)
                setTopics((prev) => [...prev, ...res.topics])
                setNextCursor(res.nextCursor)
                setHasMore(res.nextCursor !== null)
            } catch (e) {
                setHasMore(false)
            } finally {
                setLoading(false)
            }
        },
        [loading, hasMore],
    )

    useEffect(() => {
        fetchTopics()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return
            const scrollY = window.scrollY
            const innerHeight = window.innerHeight
            const bodyHeight = document.body.offsetHeight
            if (bodyHeight - (scrollY + innerHeight) < 200) {
                fetchTopics(nextCursor || undefined)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [fetchTopics, loading, hasMore, nextCursor])

    return { topics, loading, hasMore, nextCursor }
}

export { useInfiniteScrollTopics }
