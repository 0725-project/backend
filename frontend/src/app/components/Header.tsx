import { Search, Plus, Bell, MessageSquare, Calendar, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <header className='bg-white border-b border-gray-200 sticky top-0 z-50 w-full'>
            <div className='flex items-center justify-between px-2 md:px-4 py-2 gap-2'>
                <div className='flex items-center gap-2 min-w-0'>
                    {isMobile && onMenuClick && (
                        <button
                            className='p-2 rounded-full hover:bg-gray-100 md:hidden flex items-center justify-center'
                            aria-label='Open menu'
                            onClick={onMenuClick}
                        >
                            <Menu className='w-6 h-6 text-gray-700' />
                        </button>
                    )}
                    {!isMobile && (
                        <a href='/' className='flex items-center space-x-2'>
                            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0'>
                                <span className='text-white font-bold text-sm'>7</span>
                            </div>
                            <span className='text-lg md:text-xl font-bold text-blue-500 truncate'>0725</span>
                        </a>
                    )}
                </div>

                <div className='flex-1 max-w-xs md:max-w-2xl mx-2 md:mx-8'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
                        <input
                            placeholder='Search'
                            className='pl-10 bg-gray-100 border border-gray-200 rounded-full w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200'
                        />
                    </div>
                </div>

                <div className='flex items-center gap-2 md:gap-2'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full flex items-center space-x-1 text-sm'>
                        <Plus className='w-6 h-6' />
                        <span className='hidden sm:inline'>Create</span>
                    </button>
                    <div className='w-8 h-8 bg-gray-500 rounded-full'></div>
                </div>
            </div>
        </header>
    )
}
