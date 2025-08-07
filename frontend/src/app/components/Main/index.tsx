'use client'

import { useState } from 'react'
import { PostCarousel } from './PostCarousel'
import { CalendarArrowUp, ChartNoAxesColumn, ChartNoAxesCombined } from 'lucide-react'

const MainPage = () => {
    const [search, setSearch] = useState('')

    return (
        <section className='w-full flex flex-col items-center mt-20 p-5'>
            <div className='w-full max-w-4xl flex flex-col items-center mb-20'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='/? 를 입력하여 자세히 알아보기'
                    className='w-full h-20 px-6 py-4 rounded-2xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-slate-400 hover:scale-102 transition-transform duration-200'
                />
            </div>

            <div className='relative w-full max-w-6xl my-10'>
                <div className='flex items-center mb-10 ml-10'>
                    <CalendarArrowUp className='w-8 h-8 text-gray-500' />
                    <h2 className='ml-3 text-2xl font-bold'>최신 게시글</h2>
                </div>
                <PostCarousel query={{ page: 1, limit: 10 }} />
            </div>

            <div className='relative w-full max-w-6xl my-10'>
                <div className='flex items-center mb-10 ml-10'>
                    <ChartNoAxesCombined className='w-8 h-8 text-gray-500' />
                    <h2 className='ml-3 text-2xl font-bold'>인기 게시글</h2>
                </div>
                <PostCarousel query={{ page: 1, limit: 10, sortBy: 'likeCount' }} />
            </div>
        </section>
    )
}

export { MainPage }
