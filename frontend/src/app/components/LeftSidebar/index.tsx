'use client'

import { Home, TrendingUp, HelpCircle, Compass, List, Info, ChevronsRight, ChevronsDown } from 'lucide-react'
import { SidebarItem } from './LeftSidebarItems'
import { SidebarSection } from './SidebarSection'

interface LeftSidebarProps {
    isCollapsed: boolean
    onToggle: () => void
    isMobile?: boolean
    isSidebarOpen?: boolean
    closeSidebar?: () => void
}

const LeftSidebar = ({ isCollapsed, onToggle, isMobile, isSidebarOpen, closeSidebar }: LeftSidebarProps) => {
    return (
        <div className='relative'>
            <nav
                className={
                    isMobile
                        ? `fixed top-0 left-0 z-[60] h-full w-64 bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
                        : `sticky top-16 z-30 bg-white border-r border-gray-200 transition-all duration-300 w-[${isCollapsed ? '56px' : '256px'}] h-[calc(100vh-4rem)]`
                }
                style={
                    isMobile
                        ? { height: '100vh', width: '16rem' }
                        : { width: isCollapsed ? '56px' : '256px', height: 'calc(100vh - 4rem)' }
                }
                aria-label='Sidebar'
            >
                {isMobile && (
                    <div className='flex justify-end p-2'>
                        <button
                            className='p-2 rounded-full hover:bg-gray-100 text-gray-700'
                            aria-label='Close menu'
                            onClick={closeSidebar}
                        >
                            <svg
                                width='24'
                                height='24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>
                )}
                <div className={`flex flex-col h-full ${isCollapsed ? 'p-2' : 'p-4'} overflow-y-auto`}>
                    <div className='space-y-1 flex-shrink-0'>
                        <SidebarItem icon={Home} label='홈' isActive isCollapsed={isCollapsed} />
                        <SidebarItem icon={Compass} label='토픽 탐색' isCollapsed={isCollapsed} />
                    </div>
                    {!isCollapsed && (
                        <div className='mt-6 flex-shrink-0'>
                            <SidebarSection title='정보'>
                                <SidebarItem icon={Info} label='정보' isCollapsed={isCollapsed} />
                            </SidebarSection>
                        </div>
                    )}
                </div>
                {!isMobile && (
                    <button
                        onClick={onToggle}
                        className='absolute top-1/2 right-[-12px] z-40 -translate-y-14 bg-white border border-gray-300 p-1 rounded-4xl shadow hover:bg-gray-100'
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                    >
                        {isCollapsed ? (
                            <ChevronsRight className='w-4 h-6 text-gray-600' />
                        ) : (
                            <ChevronsDown className='w-4 h-6 rotate-90 text-gray-600' />
                        )}
                    </button>
                )}
            </nav>
        </div>
    )
}

export { LeftSidebar }
