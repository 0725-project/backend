import { GetPostCommentsResponse, PostResponse } from '@/api/types'
import { useInfiniteScrollComments } from '@/app/hooks/useInfiniteScrollComments'
import { formatDate } from '@/utils/dateFormatter'
import { MessageCircleMore } from 'lucide-react'

interface CommentsProps {
    post: PostResponse
    initialComments: GetPostCommentsResponse
}

const Comments = ({ post, initialComments }: CommentsProps) => {
    const { comments, loading } = useInfiniteScrollComments({
        postId: post.id,
        initialComments: initialComments.comments,
        initialNextCursor: initialComments.nextCursor,
    })

    return (
        <div className='mt-10'>
            <h2 className='text-xl font-bold mb-6 text-gray-800 border-b pb-3 flex items-center gap-2'>
                <MessageCircleMore className='w-5 h-5 text-gray-500' />
                <span className='text-gray-700'>댓글 ({post.commentCount})</span>
            </h2>
            <ul className='space-y-5'>
                {comments.map((comment, index) => (
                    <li key={index} className='px-5 py-4'>
                        {index > 0 && <hr className='border-gray-200 mb-4' />}
                        <div className='flex items-center gap-3 mb-2'>
                            <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-base'>
                                {comment.user.nickname.charAt(0)}
                            </div>
                            <span className='font-semibold text-gray-800 mr-2'>{comment.user.nickname}</span>
                            <span className='text-xs text-gray-400'>
                                {formatDate(comment.createdAt, { fullDateFormat: true })}
                            </span>
                        </div>
                        <div className='text-gray-900 leading-relaxed whitespace-pre-line break-words'>
                            {comment.content}
                        </div>
                    </li>
                ))}
            </ul>
            {loading && <div className='mt-6 text-center text-blue-400 text-sm animate-pulse'>불러오는 중...</div>}
        </div>
    )
}

export default Comments
