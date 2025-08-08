import React, { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import AuthModal from '../Auth/AuthModal'
import LoginForm from '../Auth/LoginForm'
import RegisterForm from '../Auth/RegisterForm'
import { formatDate } from '@/utils/dateFormatter'

const UserCard = () => {
    const { user, loading } = useAuth()
    const [modal, setModal] = useState<'login' | 'register' | null>(null)

    return (
        <div className='relative w-full max-w-4xl mx-auto my-10'>
            <div className='bg-white rounded-2xl border border-gray-200 flex items-center justify-center min-h-[180px] px-6 py-4'>
                {loading ? (
                    <div className='text-gray-400'>로딩중...</div>
                ) : (
                    <div className='flex items-center w-full h-full m-4'>
                        {user ? (
                            <div className='flex flex-col w-full'>
                                <div className='flex items-center mb-4'>
                                    <div className='w-18 h-18 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-500 shrink-0'>
                                        {user.nickname?.charAt(0).toUpperCase() || '?'}
                                    </div>
                                    <div className='ml-6 text-2xl font-semibold flex flex-wrap items-center'>
                                        {user.nickname ? (
                                            <>
                                                {user.nickname}
                                                <span className='text-lg text-gray-500 ml-2'>(@{user.username})</span>
                                            </>
                                        ) : (
                                            <span className='text-gray-500'>@{user.username}</span>
                                        )}
                                    </div>
                                </div>

                                <div className='ml-0 md:ml-4 grid grid-cols-[100px_1fr] gap-y-2 text-gray-700 text-sm'>
                                    <span className='text-gray-500'>이메일</span>
                                    <span>{user.email}</span>

                                    <span className='text-gray-500'>역할</span>
                                    <span>{user.role === 0 ? '관리자' : '일반 사용자'}</span>

                                    <span className='text-gray-500'>포인트</span>
                                    <span>{user.points}점</span>

                                    <span className='text-gray-500'>글 / 댓글</span>
                                    <span>
                                        {user.postCount} / {user.commentCount}
                                    </span>

                                    <span className='text-gray-500'>가입일</span>
                                    <span>{formatDate(user.createdAt)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center w-full'>
                                <div className='text-lg font-semibold mb-1'>로그인 필요</div>
                                <div className='text-gray-500 text-sm'>서비스를 이용하려면 로그인하세요.</div>
                                <button
                                    className='mt-6 px-6 py-3 rounded-xl bg-slate-500 text-white font-semibold shadow hover:bg-slate-600 transition'
                                    onClick={() => setModal('login')}
                                >
                                    로그인 또는 회원가입 하기
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <AuthModal visible={modal === 'login'} onHide={() => setModal(null)}>
                <LoginForm onSuccess={() => setModal(null)} />
                <div className='flex justify-center mt-4 text-sm text-gray-500'>
                    <button className='hover:underline text-slate-600' onClick={() => setModal('register')}>
                        회원가입
                    </button>
                </div>
            </AuthModal>

            <AuthModal visible={modal === 'register'} onHide={() => setModal(null)}>
                <RegisterForm onSuccess={() => setModal('login')} />
                <div className='flex justify-center mt-4 text-sm text-gray-500'>
                    <button className='hover:underline text-slate-600' onClick={() => setModal('login')}>
                        로그인
                    </button>
                </div>
            </AuthModal>
        </div>
    )
}

export default UserCard
