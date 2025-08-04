import { useEffect, useState, useCallback } from 'react'
import { getPosts } from '@/api/client'
import { PostResponse } from '@/api/types'

const useInfiniteScrollPosts = () => {
    const [posts, setPosts] = useState<PostResponse[]>([])
    const [loading, setLoading] = useState(false)
    const [nextCursor, setNextCursor] = useState<number | null>(null)
    const [hasMore, setHasMore] = useState(true)

    const fetchPosts = useCallback(
        async (cursor?: number) => {
            if (loading || !hasMore) return
            setLoading(true)
            try {
                const res = await getPosts(cursor)
                setPosts((prev) => [...prev, ...res.posts])
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
        fetchPosts()
    }, [])

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

    return { posts, loading, hasMore }
}

export { useInfiniteScrollPosts }
