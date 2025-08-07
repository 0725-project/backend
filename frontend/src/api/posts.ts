import { client } from './client'
import { TopicBriefResponse } from './topics'
import { PaginationResponse } from './types'
import { UserBriefResponse } from './users'

export interface PostResponse {
    id: number
    title: string
    content: string
    createdAt: string
    topicLocalId: number
    viewCount: number
    commentCount: number
    likeCount: number
    author: UserBriefResponse
    topic: TopicBriefResponse
}

export interface PostsResponse extends PaginationResponse {
    posts: PostResponse[]
}

export interface CreatePostResponse extends Omit<PostResponse, 'author' | 'topic'> {}
export interface DeletePostResponse {}

export interface PostBriefResponse extends Omit<PostResponse, 'content'> {}

const POSTS_API_PREFIX = 'posts'

export const createPost = async (title: string, content: string, topicSlug: string) => {
    const response = await client.post<CreatePostResponse>(`/${POSTS_API_PREFIX}`, {
        title,
        content,
        topicSlug,
    })
    return response.data
}

export interface GetPostsRequest {
    page?: number
    limit?: number
    startDate?: string
    endDate?: string
    sortBy?: 'createdAt' | 'viewCount' | 'likeCount'
    order?: 'asc' | 'desc'
    topicSlug?: string
    author?: string
    q?: string
}

export const getPosts = async (params: GetPostsRequest = {}) => {
    const response = await client.get<PostsResponse>(`/${POSTS_API_PREFIX}`, {
        params,
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
