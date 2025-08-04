import { client } from './client'
import { CreateCommentResponse, GetPostCommentsResponse, UpdateCommentResponse } from './types'

export const createComment = async (postId: number, content: string) => {
    const response = await client.post<CreateCommentResponse>(`/posts/${postId}/comments`, {
        content,
    })
    return response.data
}

export const getPostComments = async (postId: number) => {
    const response = await client.get<GetPostCommentsResponse>(`/posts/${postId}/comments`)
    return response.data
}

export const updateComment = async (commentId: number, content: string) => {
    const response = await client.put<UpdateCommentResponse>(`/comments/${commentId}`, {
        content,
    })
    return response.data
}

export const deleteComment = async (commentId: number) => {
    await client.delete(`/comments/${commentId}`)
}
