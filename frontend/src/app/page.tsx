'use client'

import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { LeftSidebar } from './components/LeftSidebar'
import { MainContent } from './components/Main'
import { RightSidebar } from './components/RightSidebar'

const Home = () => {
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
            <Header onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
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
        </div>
    )
}

export default Home
