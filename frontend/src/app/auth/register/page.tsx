'use client'

import React from 'react'
import { useForm } from '@/app/hooks/useForm'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
    const { register, loading } = useAuth()
    const router = useRouter()
    const { values, errors, handleChange, setFieldError, reset } = useForm({
        username: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const validate = () => {
        let valid = true
        if (!values.username) {
            setFieldError('username', '이름을 입력하세요.')
            valid = false
        }
        if (!values.nickname) {
            setFieldError('nickname', '닉네임을 입력하세요.')
            valid = false
        }
        if (!values.email || !/^[^@]+@[^@]+\.[^@]+$/.test(values.email)) {
            setFieldError('email', '유효한 이메일을 입력하세요.')
            valid = false
        }
        if (!values.password || values.password.length < 6) {
            setFieldError('password', '비밀번호는 6자 이상이어야 합니다.')
            valid = false
        }
        if (values.password !== values.confirmPassword) {
            setFieldError('confirmPassword', '비밀번호가 일치하지 않습니다.')
            valid = false
        }
        return valid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        try {
            await register({
                username: values.username,
                nickname: values.nickname,
                email: values.email,
                password: values.password,
            })
            alert('회원가입이 완료되었습니다. 로그인 해주세요.')
            router.push('/(auth)/login')
            reset()
        } catch (err: any) {
            alert(err?.response?.data?.message || '회원가입 실패')
        }
    }

    return (
        <div className='max-w-md mx-auto mt-16 p-8 border rounded shadow bg-white'>
            <h2 className='text-2xl font-bold mb-6'>회원가입</h2>
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
                    name='nickname'
                    placeholder='닉네임'
                    value={values.nickname}
                    onChange={handleChange}
                    className='input mt-2'
                />
                {errors.nickname && <div className='text-red-500 text-sm'>{errors.nickname}</div>}
                <input
                    name='email'
                    placeholder='이메일'
                    value={values.email}
                    onChange={handleChange}
                    className='input mt-2'
                />
                {errors.email && <div className='text-red-500 text-sm'>{errors.email}</div>}
                <input
                    name='password'
                    type='password'
                    placeholder='비밀번호'
                    value={values.password}
                    onChange={handleChange}
                    className='input mt-2'
                />
                {errors.password && <div className='text-red-500 text-sm'>{errors.password}</div>}
                <input
                    name='confirmPassword'
                    type='password'
                    placeholder='비밀번호 확인'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className='input mt-2'
                />
                {errors.confirmPassword && <div className='text-red-500 text-sm'>{errors.confirmPassword}</div>}
                <button type='submit' className='btn-primary w-full mt-6' disabled={loading}>
                    {loading ? '가입 중...' : '회원가입'}
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
