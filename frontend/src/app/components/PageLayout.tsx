'use client'
import { ReactNode, useState, useEffect } from 'react'
import { Header } from './Header'
import { LeftSidebar } from './LeftSidebar'
import { RightSidebar } from './RightSidebar'

interface PageLayoutProps {
    children: ReactNode
    currentItem?: string
}

export const PageLayout = ({ children, currentItem }: PageLayoutProps) => {
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
        <div className='min-h-screen'>
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
                    currentItem={currentItem}
                />
                <main className='flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] overflow-y-auto'>
                    {children}
                </main>
                <RightSidebar />
            </div>
        </div>
    )
}
