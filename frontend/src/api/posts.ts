import { client } from './client'
import { CreatePostResponse, DeletePostResponse, GetPostsResponse, PostResponse } from './types'

const POSTS_API_PREFIX = 'posts'

export const createPost = async (title: string, content: string, topicSlug: string) => {
    const response = await client.post<CreatePostResponse>(`/${POSTS_API_PREFIX}`, {
        title,
        content,
        topicSlug,
    })
    return response.data
}

export const getPosts = async (cursor?: number, limit = 10) => {
    const response = await client.get<GetPostsResponse>(`/${POSTS_API_PREFIX}`, {
        params: { cursor, limit },
    })
    return response.data
}

export const getPost = async (postId: number) => {
    const response = await client.get<PostResponse>(`/${POSTS_API_PREFIX}/${postId}`)
    return response.data
}

export const updatePost = async (postId: number, title: string, content: string) => {
    const response = await client.put<PostResponse>(`/${POSTS_API_PREFIX}/${postId}`, {
        title,
        content,
    })
    return response.data
}

export const deletePost = async (postId: number) => {
    await client.delete<DeletePostResponse>(`/${POSTS_API_PREFIX}/${postId}`)
}

export const incrementPostViewCount = async (postId: number) => {
    await client.post(`/${POSTS_API_PREFIX}/${postId}/view-count`)
}
