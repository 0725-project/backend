import axios from 'axios'
import {
    LoginResponse,
    RefreshResponse,
    RegisterResponse,
    GetUserResponse,
    CreatePostResponse,
    GetPostsResponse,
    CreateTopicResponse,
    GetTopicsResponse,
    GetTopicPostsResponse,
    CreateCommentResponse,
    LogoutResponse,
    DeletePostResponse,
    GetTopicResponse,
    GetTopicPostByLocalIdResponse,
    GetPostCommentsResponse,
    PostResponse,
} from './types'

export const BASE_URL = 'http://localhost:3000/api'

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const registerUser = async (username: string, email: string, password: string, nickname?: string) => {
    const response = await client.post<RegisterResponse>('/users/register', {
        username,
        email,
        password,
        nickname,
    })
    return response.data
}

export const loginUser = async (username: string, password: string) => {
    const response = await client.post<LoginResponse>('/users/login', {
        username,
        password,
    })
    return response.data
}

export const refreshToken = async () => {
    const response = await client.post<RefreshResponse>('/users/refresh')
    return response.data.accessToken
}

export const logout = async () => {
    await client.post<LogoutResponse>('/users/logout')
}

export const getUserById = async (id: number) => {
    const response = await client.get<GetUserResponse>(`/users/id/${id}`)
    return response.data
}

export const getUserByUsername = async (username: string) => {
    const response = await client.get<GetUserResponse>(`/users/username/${username}`)
    return response.data
}

export const createPost = async (title: string, content: string, topicName: string) => {
    const response = await client.post<CreatePostResponse>('/posts', {
        title,
        content,
        topicName,
    })
    return response.data
}

export const getPosts = async (cursor?: number, limit = 10) => {
    const response = await client.get<GetPostsResponse>('/posts', {
        params: { cursor, limit },
    })
    return response.data
}

export const getPost = async (postId: number) => {
    const response = await client.get<PostResponse>(`/posts/${postId}`)
    return response.data
}

export const updatePost = async (postId: number, title: string, content: string) => {
    const response = await client.put<PostResponse>(`/posts/${postId}`, {
        title,
        content,
    })
    return response.data
}

export const deletePost = async (postId: number) => {
    await client.delete<DeletePostResponse>(`/posts/${postId}`)
}

export const createTopic = async (topicName: string, description: string) => {
    const response = await client.post<CreateTopicResponse>('/topics', {
        topicName,
        description,
    })
    return response.data
}

export const getTopics = async (cursor?: number, limit = 10) => {
    const response = await client.get<GetTopicsResponse>('/topics', {
        params: { cursor, limit },
    })
    return response.data
}

export const getTopic = async (topicName: string) => {
    const response = await client.get<GetTopicResponse>(`/topics/${topicName}`)
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

export const createComment = async (postId: number, content: string) => {
    const response = await client.post<CreateCommentResponse>(`/posts/${postId}/comments`, {
        content,
    })
    return response.data
}

export const getPostComments = async (postId: number) => {
    const response = await client.get<GetPostCommentsResponse>(`/posts/${postId}/comments`)
    return response.data
}

export const updateComment = async (commentId: number, content: string) => {
    const response = await client.put<CreateCommentResponse>(`/comments/${commentId}`, {
        content,
    })
    return response.data
}

export const deleteComment = async (commentId: number) => {
    await client.delete(`/comments/${commentId}`)
}
