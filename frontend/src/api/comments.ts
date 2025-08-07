import { client } from './client'
import { PostBriefResponse } from './posts'
import { PaginationResponse } from './types'
import { UserBriefResponse } from './users'

export interface CommentResponse {
    id: number
    content: string
    createdAt: string
    user: UserBriefResponse
}

export interface PostCommentsResponse extends PaginationResponse {
    comments: CommentResponse[]
}

export interface CreateCommentResponse {
    id: number
    content: string
    createdAt: string
}

export interface UpdateCommentResponse {
    id: number
    content: string
    createdAt: string
    user: UserBriefResponse
}

export interface DeleteCommentResponse {}

export interface CommentWithDetailsResponse extends CommentResponse {
    post: PostBriefResponse
}

export interface AllCommentsResponse extends PaginationResponse {
    comments: CommentWithDetailsResponse[]
}

export const createComment = async (postId: number, content: string) => {
    const response = await client.post<CreateCommentResponse>(`/posts/${postId}/comments`, {
        content,
    })
    return response.data
}

export const getPostComments = async (postId: number, page?: number, limit: number = 10) => {
    const response = await client.get<PostCommentsResponse>(`/posts/${postId}/comments`, {
        params: { page, limit },
    })
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

export const getAllComments = async (page?: number, limit: number = 10) => {
    const response = await client.get<AllCommentsResponse>('/comments', {
        params: { page, limit },
    })
    return response.data
}
