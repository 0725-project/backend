'use client'

import { useState } from 'react'
import { PostCarousel } from './PostCarousel'
import { CalendarArrowUp, ChartNoAxesCombined } from 'lucide-react'
import UserCard from './UserCard'

type Tab = 'popular' | 'latest'

const MainPage = () => {
    const [search, setSearch] = useState('')
    const [tab, setTab] = useState<Tab>('popular')

    return (
        <section className='w-full flex flex-col items-center mt-20 mb-10 p-5'>
            <div className='w-full max-w-4xl flex flex-col items-center mb-10'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='/? 를 입력하여 자세히 알아보기'
                    className='w-full h-20 px-6 py-4 rounded-2xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-slate-400 hover:scale-102 transition-transform duration-200'
                />
            </div>

            <div className='w-full flex flex-col items-center mb-10'>
                <UserCard />
            </div>

            <div className='relative w-full max-w-6xl mb-10'>
                <div className='flex items-center mb-10 ml-10 gap-3'>
                    {tab === 'popular' ? (
                        <ChartNoAxesCombined className='w-8 h-8 text-gray-500' />
                    ) : (
                        <CalendarArrowUp className='w-8 h-8 text-gray-500' />
                    )}

                    <select
                        value={tab}
                        onChange={(e) => setTab(e.target.value as Tab)}
                        className='bg-transparent font-bold text-2xl focus:outline-none cursor-pointer'
                    >
                        <option value='popular'>인기 게시글</option>
                        <option value='latest'>최신 게시글</option>
                    </select>
                </div>

                {tab === 'popular' ? (
                    <PostCarousel query={{ page: 1, limit: 10, sortBy: 'likeCount' }} />
                ) : (
                    <PostCarousel query={{ page: 1, limit: 10 }} />
                )}
            </div>
        </section>
    )
}

export { MainPage }
