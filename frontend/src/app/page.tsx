'use client'
import { useState, useEffect } from 'react'

import { Header } from './components/Header'
import { LeftSidebar } from './components/sidebar/Left'
import { MainContent } from './components/Main'
import { RightSidebar } from './components/sidebar/Right'
import { List } from 'lucide-react'

const RedditClone = () => {
    const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true)
                setIsLeftSidebarCollapsed(true)
            } else {
                setIsMobile(false)
                setIsLeftSidebarCollapsed(false)
                setIsSidebarOpen(false)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className='min-h-screen bg-gray-50'>
            <Header />
            <div className='flex'>
                {isMobile && isSidebarOpen && (
                    <div
                        className='fixed inset-0 z-40 bg-black/40 transition-opacity duration-300'
                        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
                <LeftSidebar
                    isCollapsed={isMobile ? !isSidebarOpen : isLeftSidebarCollapsed}
                    onToggle={() => {
                        if (isMobile) setIsSidebarOpen((prev) => !prev)
                        else setIsLeftSidebarCollapsed((prev) => !prev)
                    }}
                    isMobile={isMobile}
                    isSidebarOpen={isSidebarOpen}
                    closeSidebar={() => setIsSidebarOpen(false)}
                />
                <MainContent />
                <RightSidebar />
            </div>
            {isMobile && !isSidebarOpen && (
                <button
                    className='fixed top-25 z-50 p-2 bg-white rounded-r-3xl shadow-md border border-gray-200 md:hidden'
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <List className='w-4 h-4 text-gray-600' />
                </button>
            )}
        </div>
    )
}

export default RedditClone
