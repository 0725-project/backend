'use client'
import { useState, useEffect } from 'react'

import { Header } from './components/Header'
import { LeftSidebar } from './components/sidebar/Left'
import { MainContent } from './components/Main'
import { RightSidebar } from './components/sidebar/Right'

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
                    className='fixed top-20 left-2 z-50 p-2 bg-white rounded shadow-md border border-gray-200 md:hidden'
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <span className='sr-only'>Open sidebar</span>
                    <svg
                        width='24'
                        height='24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-list'
                    >
                        <line x1='8' x2='21' y1='6' y2='6' />
                        <line x1='8' x2='21' y1='12' y2='12' />
                        <line x1='8' x2='21' y1='18' y2='18' />
                        <line x1='3' x2='3.01' y1='6' y2='6' />
                        <line x1='3' x2='3.01' y1='12' y2='12' />
                        <line x1='3' x2='3.01' y1='18' y2='18' />
                    </svg>
                </button>
            )}
        </div>
    )
}

export default RedditClone
