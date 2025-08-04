'use client'

import React from 'react'
import { useForm } from '@/app/hooks/useForm'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const { login, loading } = useAuth()
    const router = useRouter()
    const { values, errors, handleChange, setFieldError, reset } = useForm({
        username: '',
        password: '',
    })

    const validate = () => {
        let valid = true
        if (!values.username) {
            setFieldError('username', '이름을 입력하세요.')
            valid = false
        }
        if (!values.password) {
            setFieldError('password', '비밀번호를 입력하세요.')
            valid = false
        }
        return valid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        try {
            await login(values.username, values.password)
            router.push('/')
            reset()
        } catch (err: any) {
            alert(err?.response?.data?.message || '로그인 실패')
        }
    }

    return (
        <div className='max-w-md mx-auto mt-16 p-8 border rounded shadow bg-white'>
            <h2 className='text-2xl font-bold mb-6'>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name='username'
                    placeholder='이름'
                    value={values.username}
                    onChange={handleChange}
                    className='input'
                />
                {errors.username && <div className='text-red-500 text-sm'>{errors.username}</div>}
                <input
                    name='password'
                    type='password'
                    placeholder='비밀번호'
                    value={values.password}
                    onChange={handleChange}
                    className='input mt-2'
                />
                {errors.password && <div className='text-red-500 text-sm'>{errors.password}</div>}
                <button type='submit' className='btn-primary w-full mt-6' disabled={loading}>
                    {loading ? '로그인 중...' : '로그인'}
                </button>
            </form>
        </div>
    )
}

export default LoginPage
