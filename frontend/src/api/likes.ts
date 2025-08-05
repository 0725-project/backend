import { client } from './client'
import { CreateLikeResponse, DeleteLikeResponse, GetLikesResponse } from './types'

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
    const response = await client.get<GetLikesResponse>(`/${LIKES_API_PREFIX}/${postId}`, {
        params: { cursor, limit },
    })
    return response.data
}
