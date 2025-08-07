'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getMe, loginUser, logout, refreshToken, registerUser } from '@/api/auth'
import { UserResponse } from '@/api/users'

interface AuthContextProps {
    user: UserResponse | null
    loading: boolean
    login: (username: string, password: string) => Promise<void>
    register: (data: RegisterFormData) => Promise<void>
    logout: () => Promise<void>
    refresh: () => Promise<void>
}

export interface RegisterFormData {
    username: string
    nickname: string
    email: string
    password: string
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserResponse | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchMe = async () => {
        try {
            const me = await getMe(localStorage.getItem('accessToken') ?? '')
            setUser(me)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMe()
    }, [])

    const login = async (username: string, password: string) => {
        setLoading(true)
        try {
            const result = await loginUser(username, password)
            localStorage.setItem('accessToken', result.accessToken)

            await fetchMe()
        } finally {
            setLoading(false)
        }
    }

    const register = async (data: RegisterFormData) => {
        setLoading(true)
        try {
            await registerUser(data.username, data.email, data.password, data.nickname)
        } finally {
            setLoading(false)
        }
    }

    const refresh = async () => {
        setLoading(true)
        try {
            await refreshToken()
            await fetchMe()
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            localStorage.removeItem('accessToken')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout: handleLogout, refresh }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
