import { client } from './client'
import { GetPostsResponse } from './types'

export interface SearchParams {
    cursor?: number
    limit?: number
    startDate?: string
    endDate?: string
    order?: 'asc' | 'desc'
    topicName?: string
    author?: string
    q?: string
}

export const search = async (params: SearchParams) => {
    const response = await client.get<GetPostsResponse>('/search', {
        params,
    })
    return response.data
}
