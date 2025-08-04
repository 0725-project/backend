import { client } from './client'
import { GetUserResponse } from './types'

const USERS_API_PREFIX = 'users'

export const getUserById = async (id: number) => {
    const response = await client.get<GetUserResponse>(`/${USERS_API_PREFIX}/id/${id}`)
    return response.data
}

export const getUserByUsername = async (username: string) => {
    const response = await client.get<GetUserResponse>(`/${USERS_API_PREFIX}/username/${username}`)
    return response.data
}
