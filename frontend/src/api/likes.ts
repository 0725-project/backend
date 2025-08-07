import { client } from './client'
import { PaginationResponse } from './types'
import { UserBriefResponse } from './users'

export interface LikesResponse extends PaginationResponse {
    likes: {
        user: UserBriefResponse
        createdAt: string
    }[]
}

export interface CreateLikeResponse {}
export interface DeleteLikeResponse {}

const LIKES_API_PREFIX = 'likes'

export const createLike = async (postId: number) => {
    const response = await client.post<CreateLikeResponse>(`/${LIKES_API_PREFIX}/${postId}`)
    return response.data
}

export const deleteLike = async (postId: number) => {
    const response = await client.delete<DeleteLikeResponse>(`/${LIKES_API_PREFIX}/${postId}`)
    return response.data
}

export const getLikes = async (postId: number, cursor?: number, limit = 10) => {
    const response = await client.get<LikesResponse>(`/${LIKES_API_PREFIX}/${postId}`, {
        params: { cursor, limit },
    })
    return response.data
}
