import { refreshToken } from './auth'

export const getAccessToken = () => {
    return localStorage.getItem('accessToken') ?? ''
}

export const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token)
}

export const clearAccessToken = () => {
    localStorage.removeItem('accessToken')
}

export const withAuthRetry = async <T>(fn: (accessToken: string) => Promise<T>): Promise<T> => {
    try {
        return await fn(getAccessToken())
    } catch (error: any) {
        if (error?.response?.status === 401 && getAccessToken()) {
            const newAccessToken = await refreshToken()
            setAccessToken(newAccessToken)
            return await fn(newAccessToken)
        }
        throw error
    }
}
