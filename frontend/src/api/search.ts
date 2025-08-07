import { client } from './client'
import { PostsResponse } from './posts'

export interface SearchParams {
    cursor?: number
    limit?: number
    startDate?: string
    endDate?: string
    order?: 'asc' | 'desc'
    topicSlug?: string
    author?: string
    q?: string
}

export const search = async (params: SearchParams) => {
    const response = await client.get<PostsResponse>('/search', {
        params,
    })
    return response.data
}
