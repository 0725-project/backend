import { useEffect, useState, useCallback } from 'react'
import { getTopicPosts } from '@/api/topics'
import { GetTopicPostsResponse } from '@/api/types'

interface UseInfiniteScrollTopicPostsOptions {
    topicSlug: string
}

const useInfiniteScrollTopicPosts = (options: UseInfiniteScrollTopicPostsOptions) => {
    const { topicSlug } = options
    const [posts, setPosts] = useState<GetTopicPostsResponse['posts']>([])
    const [loading, setLoading] = useState(false)
    const [nextCursor, setNextCursor] = useState<number | null>(null)
    const [hasMore, setHasMore] = useState(true)

    const fetchPosts = useCallback(
        async (cursor?: number) => {
            if (loading || !hasMore) return
            setLoading(true)
            try {
                const res = await getTopicPosts(topicSlug, cursor)
                setPosts((prev) => [...prev, ...res.posts])
                setNextCursor(res.nextCursor)
                setHasMore(res.nextCursor !== null)
            } catch (e) {
                setHasMore(false)
            } finally {
                setLoading(false)
            }
        },
        [loading, hasMore, topicSlug],
    )

    useEffect(() => {
        setPosts([])
        setNextCursor(null)
        setHasMore(true)
        fetchPosts()
    }, [topicSlug])

    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return
            const scrollY = window.scrollY
            const innerHeight = window.innerHeight
            const bodyHeight = document.body.offsetHeight
            if (bodyHeight - (scrollY + innerHeight) < 200) {
                fetchPosts(nextCursor || undefined)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [fetchPosts, loading, hasMore, nextCursor])

    return { posts, loading, hasMore, nextCursor }
}

export { useInfiniteScrollTopicPosts }
