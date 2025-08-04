'use client'

import {
    Home,
    TrendingUp,
    HelpCircle,
    Compass,
    List,
    ChevronDown,
    BarChart3,
    Info,
    Tag,
    Newspaper,
    Briefcase,
    FileText,
    ChevronsRight,
    ChevronsDown,
} from 'lucide-react'
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
    const sidebarClass = isMobile
        ? `fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`
        : `bg-white border-r border-gray-200 transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto`

    return (
        <div className='relative'>
            <div
                className={sidebarClass}
                style={isMobile ? { height: '100vh' } : { width: isCollapsed ? '56px' : '256px' }}
            >
                <div className={isCollapsed ? 'p-2' : 'p-4'}>
                    <div className='space-y-1'>
                        <SidebarItem icon={Home} label='Home' isActive isCollapsed={isCollapsed} />
                        <SidebarItem icon={TrendingUp} label='Popular' isCollapsed={isCollapsed} />
                        <SidebarItem icon={HelpCircle} label='Answers' isCollapsed={isCollapsed} />
                        <SidebarItem icon={Compass} label='Explore' isCollapsed={isCollapsed} />
                        <SidebarItem icon={List} label='All' isCollapsed={isCollapsed} />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <div className='mt-6'>
                                <SidebarSection title='RESOURCES'>
                                    <SidebarItem icon={Info} label='About Reddit' isCollapsed={false} />
                                    <SidebarItem icon={Tag} label='Advertise' isCollapsed={false} />
                                    <SidebarItem icon={BarChart3} label='Reddit Pro' isCollapsed={false} />
                                    <SidebarItem icon={HelpCircle} label='Help' isCollapsed={false} />
                                    <SidebarItem icon={Newspaper} label='Blog' isCollapsed={false} />
                                    <SidebarItem icon={Briefcase} label='Careers' isCollapsed={false} />
                                    <SidebarItem icon={FileText} label='Press' isCollapsed={false} />
                                </SidebarSection>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {!isMobile && (
                <>
                    {!isCollapsed ? (
                        <button
                            onClick={onToggle}
                            className='absolute top-1/2 right-0 transform -translate-y-14 translate-x-1/2
                     bg-white border border-gray-300 p-1 rounded-4xl shadow hover:bg-gray-100'
                            aria-label='Collapse sidebar'
                        >
                            <ChevronsDown className='w-4 h-6 rotate-90 text-gray-600' />
                        </button>
                    ) : (
                        <button
                            onClick={onToggle}
                            className='absolute top-1/2 right-0 transform -translate-y-14 translate-x-1/2
                     bg-white border border-gray-300 rounded-4xl p-1 shadow hover:bg-gray-100'
                            aria-label='Expand sidebar'
                        >
                            <ChevronsRight className='w-4 h-6 text-gray-600' />
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export { LeftSidebar }
