import { useEffect, useState, useCallback } from 'react'
import { getTopics } from '@/api/topics'
import { TopicResponse } from '@/api/types'

const useInfiniteScrollTopics = () => {
    const [topics, setTopics] = useState<TopicResponse[]>([])
    const [loading, setLoading] = useState(false)
    const [nextCursor, setNextCursor] = useState<number | null>(null)
    const [hasMore, setHasMore] = useState(true)

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

    return { topics, loading, hasMore }
}

export { useInfiniteScrollTopics }
