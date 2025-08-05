import { client } from './client'
import {
    CreateTopicResponse,
    GetTopicPostByLocalIdResponse,
    GetTopicPostsResponse,
    TopicResponse,
    GetTopicsResponse,
} from './types'

const TOPICS_API_PREFIX = 'topics'

export const createTopic = async (topicSlug: string, description: string) => {
    const response = await client.post<CreateTopicResponse>(`/${TOPICS_API_PREFIX}`, {
        topicSlug,
        description,
    })
    return response.data
}

export const getTopics = async (cursor?: number, limit = 10) => {
    const response = await client.get<GetTopicsResponse>(`/${TOPICS_API_PREFIX}`, {
        params: { cursor, limit },
    })
    return response.data
}

export const getTopic = async (topicSlug: string) => {
    const response = await client.get<TopicResponse>(`/${TOPICS_API_PREFIX}/${topicSlug}`)
    return response.data
}

export const getTopicPosts = async (topicSlug: string, cursor?: number, limit = 10) => {
    const response = await client.get<GetTopicPostsResponse>(`/topic/${topicSlug}`, {
        params: { cursor, limit },
    })
    return response.data
}

export const getTopicPostByLocalId = async (topicSlug: string, topicLocalId: number) => {
    const response = await client.get<GetTopicPostByLocalIdResponse>(`/topic/${topicSlug}/${topicLocalId}`)
    return response.data
}
