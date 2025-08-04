import { client } from './client'
import {
    CreateTopicResponse,
    GetTopicPostByLocalIdResponse,
    GetTopicPostsResponse,
    TopicResponse,
    GetTopicsResponse,
} from './types'

const TOPICS_API_PREFIX = 'topics'

export const createTopic = async (topicName: string, description: string) => {
    const response = await client.post<CreateTopicResponse>(`/${TOPICS_API_PREFIX}`, {
        topicName,
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

export const getTopic = async (topicName: string) => {
    const response = await client.get<TopicResponse>(`/${TOPICS_API_PREFIX}/${topicName}`)
    return response.data
}

export const getTopicPosts = async (topicName: string, cursor?: number, limit = 10) => {
    const response = await client.get<GetTopicPostsResponse>(`/topic/${topicName}`, {
        params: { cursor, limit },
    })
    return response.data
}

export const getTopicPostByLocalId = async (topicName: string, topicLocalId: number) => {
    const response = await client.get<GetTopicPostByLocalIdResponse>(`/topic/${topicName}/${topicLocalId}`)
    return response.data
}
