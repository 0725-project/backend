import { client } from './client'
import { PostResponse } from './posts'
import { PaginationResponse } from './types'
import { UserBriefResponse } from './users'

export interface TopicResponse {
    id: number
    slug: string
    name: string
    description: string
    createdAt: string
    creator: UserBriefResponse
}

export interface TopicBriefResponse {
    id: number
    slug: string
    name: string
    description: string
}

export interface TopicsResponse extends PaginationResponse {
    topics: TopicResponse[]
}

export type CreateTopicResponse = Omit<TopicResponse, 'creator'>

export interface TopicPostsResponse extends PaginationResponse {
    posts: Omit<PostResponse, 'topic'>[]
}

const TOPICS_API_PREFIX = 'topics'

export const createTopic = async (topicSlug: string, description: string) => {
    const response = await client.post<CreateTopicResponse>(`/${TOPICS_API_PREFIX}`, {
        topicSlug,
        description,
    })
    return response.data
}

export const getTopics = async (cursor?: number, limit = 10) => {
    const response = await client.get<TopicsResponse>(`/${TOPICS_API_PREFIX}`, {
        params: { cursor, limit },
    })
    return response.data
}

export const getTopic = async (topicSlug: string) => {
    const response = await client.get<TopicResponse>(`/${TOPICS_API_PREFIX}/${topicSlug}`)
    return response.data
}

export const getTopicPosts = async (topicSlug: string, cursor?: number, limit = 10) => {
    const response = await client.get<TopicPostsResponse>(`/topic/${topicSlug}`, {
        params: { cursor, limit },
    })
    return response.data
}

export const getTopicPostByLocalId = async (topicSlug: string, topicLocalId: number) => {
    const response = await client.get<PostResponse>(`/topic/${topicSlug}/${topicLocalId}`)
    return response.data
}
