import { useEffect, useState, useCallback } from 'react'
import { getPostComments } from '@/api/comments'
import { GetPostCommentsResponse } from '@/api/types'

interface UseInfiniteScrollCommentsOptions {
    postId: number
    initialComments?: GetPostCommentsResponse['comments']
    initialNextCursor?: number | null
}

const useInfiniteScrollComments = ({
    postId,
    initialComments = [],
    initialNextCursor = null,
}: UseInfiniteScrollCommentsOptions) => {
    const [comments, setComments] = useState<GetPostCommentsResponse['comments']>(initialComments)
    const [nextCursor, setNextCursor] = useState<number | null>(initialNextCursor)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(initialNextCursor !== null)

    const fetchComments = useCallback(
        async (cursor?: number) => {
            if (loading || !hasMore) return
            setLoading(true)
            try {
                const res = await getPostComments(postId, cursor)
                setComments((prev) => [...prev, ...res.comments])
                setNextCursor(res.nextCursor)
                setHasMore(res.nextCursor !== null)
            } catch (e) {
                setHasMore(false)
            } finally {
                setLoading(false)
            }
        },
        [loading, hasMore, postId],
    )

    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return
            const scrollY = window.scrollY
            const innerHeight = window.innerHeight
            const bodyHeight = document.body.offsetHeight
            if (bodyHeight - (scrollY + innerHeight) < 200) {
                fetchComments(nextCursor || undefined)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [fetchComments, loading, hasMore, nextCursor])

    return { comments, loading, hasMore, nextCursor }
}

export { useInfiniteScrollComments }
