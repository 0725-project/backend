import { client } from './client'

export enum UserRole {
    ADMIN = 0,
    USER = 1,
}

export interface UserResponse {
    id: number
    username: string
    nickname: string
    email: string
    role: UserRole
    points: number
    postCount: number
    commentCount: number
    createdAt: string
}

export interface UserBriefResponse {
    id: number
    username: string
    nickname: string
}

const USERS_API_PREFIX = 'users'

export const getUserById = async (id: number) => {
    const response = await client.get<UserResponse>(`/${USERS_API_PREFIX}/id/${id}`)
    return response.data
}

export const getUserByUsername = async (username: string) => {
    const response = await client.get<UserResponse>(`/${USERS_API_PREFIX}/username/${username}`)
    return response.data
}
