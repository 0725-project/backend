'use client'

import {
    Home,
    TrendingUp,
    HelpCircle,
    Compass,
    List,
    ChevronDown,
    Plus,
    Settings,
    BarChart3,
    Info,
    Tag,
    Newspaper,
    Briefcase,
    FileText,
} from 'lucide-react'

interface LeftSidebarProps {
    isCollapsed: boolean
    onToggle: () => void
    isMobile?: boolean
    isSidebarOpen?: boolean
    closeSidebar?: () => void
}

const SidebarItem = (props: SidebarItemProps) => {
    return (
        <button
            className={`w-full justify-start flex items-center space-x-2 px-2 py-1 rounded-md ${
                props.isActive ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
        >
            {props.icon && <props.icon className='w-4 h-4' />}
            {!props.isCollapsed && (
                <>
                    <span className='ml-2'>{props.label}</span>
                    {props.badge && (
                        <span className='ml-auto text-xs bg-orange-500 text-white px-1 rounded'>{props.badge}</span>
                    )}
                </>
            )}
        </button>
    )
}

const SidebarSection = (props: { title: string }) => {
    return (
        <div className='flex items-center justify-between mb-2 px-2'>
            <h3 className='text-xs font-medium text-gray-500 uppercase tracking-wide'>{props.title}</h3>
            <ChevronDown className='w-3 h-3 text-gray-400' />
        </div>
    )
}

const CommunityItem = (props: { name: string; color: string }) => {
    return (
        <button className='w-full justify-start flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100'>
            <div className={`w-4 h-4 rounded-full mr-2 ${props.color}`}></div>
            <span className='text-sm'>{props.name}</span>
        </button>
    )
}

const LeftSidebar = ({ isCollapsed, onToggle, isMobile, isSidebarOpen, closeSidebar }: LeftSidebarProps) => {
    const sidebarClass = isMobile
        ? `fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64`
        : `bg-white border-r border-gray-200 transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto ${
              isCollapsed ? 'w-16' : 'w-64'
          }`

    return (
        <div className={sidebarClass} style={isMobile ? { height: '100vh' } : {}}>
            <div className='p-2'>
                <button
                    onClick={onToggle}
                    className='w-full justify-start mb-2 flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100'
                >
                    <List className='w-4 h-4' />
                    {!isCollapsed && <span className='ml-2'>{isMobile ? '메뉴 닫기' : 'Collapse'}</span>}
                </button>

                {isMobile && isSidebarOpen && closeSidebar && (
                    <button
                        className='absolute top-2 right-2 text-gray-500 md:hidden'
                        onClick={closeSidebar}
                        aria-label='Close sidebar'
                    >
                        <svg
                            width='24'
                            height='24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='lucide lucide-x'
                        >
                            <line x1='18' y1='6' x2='6' y2='18' />
                            <line x1='6' y1='6' x2='18' y2='18' />
                        </svg>
                    </button>
                )}
                <div className='space-y-1'>
                    <SidebarItem icon={Home} label='Home' isActive isCollapsed={isCollapsed} />
                    <SidebarItem icon={TrendingUp} label='Popular' isCollapsed={isCollapsed} />
                    <SidebarItem icon={HelpCircle} label='Answers' badge='BETA' isCollapsed={isCollapsed} />
                    <SidebarItem icon={Compass} label='Explore' isCollapsed={isCollapsed} />
                    <SidebarItem icon={List} label='All' isCollapsed={isCollapsed} />
                </div>
                {!isCollapsed && (
                    <div>
                        <div className='mt-6'>
                            <SidebarSection title='CUSTOM FEEDS' />
                            <button className='w-full justify-start text-gray-600 flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100'>
                                <Plus className='w-4 h-4 mr-2' />
                                Create Custom Feed
                            </button>
                        </div>
                        <div className='mt-6'>
                            <SidebarSection title='COMMUNITIES' />
                            <button className='w-full justify-start text-gray-600 mb-1 flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100'>
                                <Plus className='w-4 h-4 mr-2' />
                                Create Community
                            </button>
                            <button className='w-full justify-start text-gray-600 mb-2 flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100'>
                                <Settings className='w-4 h-4 mr-2' />
                                Manage Communities
                            </button>
                            <div className='space-y-1'>
                                <CommunityItem name='r/announcements' color='bg-orange-500' />
                                <CommunityItem name='r/rust' color='bg-red-500' />
                            </div>
                        </div>
                        <div className='mt-6'>
                            <SidebarSection title='RESOURCES' />
                            <div className='space-y-1'>
                                <SidebarItem icon={Info} label='About Reddit' isCollapsed={false} />
                                <SidebarItem icon={Tag} label='Advertise' isCollapsed={false} />
                                <SidebarItem icon={BarChart3} label='Reddit Pro' badge='BETA' isCollapsed={false} />
                                <SidebarItem icon={HelpCircle} label='Help' isCollapsed={false} />
                                <SidebarItem icon={Newspaper} label='Blog' isCollapsed={false} />
                                <SidebarItem icon={Briefcase} label='Careers' isCollapsed={false} />
                                <SidebarItem icon={FileText} label='Press' isCollapsed={false} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

interface SidebarItemProps {
    icon: any
    label: string
    isActive?: boolean
    badge?: string
    isCollapsed: boolean
}

export { LeftSidebar }
