'use client'

import { useQuery } from '@tanstack/react-query'
import { getPosts, PostResponse } from '@/api/posts'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { PostCard } from './PostCard'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MainPage = () => {
    const [search, setSearch] = useState('')
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
    const autoplayInterval = useRef<NodeJS.Timeout | null>(null)
    const isHovering = useRef(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const { data, isLoading, isError } = useQuery<{ posts: PostResponse[] }, Error>({
        queryKey: ['latest-posts', 1, 10],
        queryFn: () => getPosts(1, 10),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    const posts = data?.posts ?? []
    const totalSlides = posts.length

    const updateSelectedIndex = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    const startAutoplay = useCallback(() => {
        if (autoplayInterval.current || !emblaApi) return
        autoplayInterval.current = setInterval(() => {
            if (!document.hidden && !isHovering.current) {
                if (emblaApi.canScrollNext()) {
                    emblaApi.scrollNext()
                } else {
                    emblaApi.scrollTo(0)
                }
            }
        }, 4000)
    }, [emblaApi])

    const stopAutoplay = useCallback(() => {
        if (autoplayInterval.current) {
            clearInterval(autoplayInterval.current)
            autoplayInterval.current = null
        }
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on('select', updateSelectedIndex)
        updateSelectedIndex()

        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAutoplay()
            } else if (!isHovering.current) {
                startAutoplay()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        startAutoplay()

        return () => {
            stopAutoplay()
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [emblaApi, updateSelectedIndex, startAutoplay, stopAutoplay])

    const handleMouseEnter = () => {
        isHovering.current = true
        stopAutoplay()
    }

    const handleMouseLeave = () => {
        isHovering.current = false
        startAutoplay()
    }

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    return (
        <section className='w-full flex flex-col items-center mt-20 p-5'>
            <div className='w-full max-w-xl flex flex-col items-center mb-20'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='검색어를 입력하세요...'
                    className='w-full h-16 px-6 py-4 rounded-2xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400'
                    disabled
                />
            </div>
            {isLoading ? (
                <div className='text-gray-400 text-lg'>로딩 중...</div>
            ) : isError ? (
                <div className='text-red-400 text-lg'>최신 글을 불러오지 못했습니다.</div>
            ) : totalSlides === 0 ? (
                <div className='text-gray-400 text-lg'>게시글이 없습니다.</div>
            ) : (
                <div className='relative w-full max-w-6xl'>
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />

                    <button
                        onClick={scrollPrev}
                        className='absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white border shadow rounded-full'
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={scrollNext}
                        className='absolute right-[-10px] top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white border shadow rounded-full'
                    >
                        <ChevronRight />
                    </button>
                    <div
                        ref={emblaRef}
                        className='overflow-hidden'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className='flex'>
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/topics/${post.topic?.slug}/${post.topicLocalId}`}
                                    className='min-w-[260px] max-w-[260px] h-[260px] flex flex-col px-2'
                                    style={{ flex: '0 0 auto' }}
                                >
                                    <PostCard post={post} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-4'>
                        <span className='text-sm text-gray-700 mb-1'>
                            {selectedIndex + 1} / {totalSlides}
                        </span>
                        <div className='w-40 h-1 bg-gray-200 rounded'>
                            <div
                                className='h-1 bg-gray-500 rounded transition-all duration-300'
                                style={{ width: `${((selectedIndex + 1) / totalSlides) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export { MainPage }
