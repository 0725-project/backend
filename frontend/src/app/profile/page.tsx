'use client'

import { getMe } from '@/api/auth'
import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'

interface UserInfo {
    id: number
    username: string
    nickname: string
    email: string
    createdAt: string
}

export default function MePage() {
    const { user, loading } = useAuth()
    const [error, setError] = useState<string | null>(null)

    if (loading) return <div style={{ padding: 32, textAlign: 'center' }}>로딩 중...</div>
    if (error) return <div style={{ padding: 32, color: 'red', textAlign: 'center' }}>{error}</div>
    if (!user) return null

    return (
        <div
            style={{
                maxWidth: 400,
                margin: '64px auto',
                padding: 32,
                border: '1px solid #eee',
                borderRadius: 16,
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
        >
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>내 정보</h2>
            <div style={{ marginBottom: 16 }}>
                <span style={{ color: '#888', fontSize: 14 }}>아이디</span>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{user.username}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ color: '#888', fontSize: 14 }}>닉네임</span>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{user.nickname}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ color: '#888', fontSize: 14 }}>이메일</span>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{user.email}</div>
            </div>
            <div>
                <span style={{ color: '#888', fontSize: 14 }}>가입일</span>
                <div style={{ fontSize: 16 }}>{new Date(user.createdAt).toLocaleDateString()}</div>
            </div>
        </div>
    )
}
