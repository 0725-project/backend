import React from 'react'
import { CommentWithDetailsResponse } from '@/api/comments'
import { formatDate } from '@/utils/dateFormatter'

interface CommentItemProps {
    comment: CommentWithDetailsResponse
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    return (
        <div className='flex flex-col p-3 border-b border-gray-100 hover:bg-gray-50 transition'>
            <div className='flex items-center gap-2 mb-1'>
                <span className='font-semibold text-sm text-slate-700'>{comment.user?.nickname ?? '익명'}</span>
                <span className='text-xs text-gray-400'>{formatDate(comment.createdAt)}</span>
            </div>
            <div className='text-sm text-gray-700 truncate'>{comment.content}</div>
            <div className='text-xs text-blue-500 mt-1'>{comment.post?.title ?? '게시글'}</div>
        </div>
    )
}

export default CommentItem
