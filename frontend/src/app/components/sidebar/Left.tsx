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
    ChevronLeft,
    ChevronRight,
    AlignLeft,
    ChevronsLeft,
    ChevronsRight,
    ChevronsDown,
} from 'lucide-react'

interface LeftSidebarProps {
    isCollapsed: boolean
    onToggle: () => void
    isMobile?: boolean
    isSidebarOpen?: boolean
    closeSidebar?: () => void
}

interface SidebarItemProps {
    icon: any
    label: string
    isActive?: boolean
    badge?: string
    isCollapsed: boolean
}

const SidebarItem = (props: SidebarItemProps) => {
    const { isCollapsed, isActive, icon, label, badge } = props

    return (
        <button
            className={`
                ${isCollapsed ? 'w-10 h-10 justify-center' : 'w-full justify-start'}
                flex items-center space-x-2 px-2 py-1 rounded-md
                ${isActive ? 'bg-gray-100' : 'hover:bg-gray-100'}
            `}
        >
            {icon && <props.icon className='w-4 h-4' />}
            {!isCollapsed && (
                <>
                    <span className='ml-2'>{label}</span>
                    {badge && <span className='ml-auto text-xs bg-orange-500 text-white px-1 rounded'>{badge}</span>}
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
          }`
        : `bg-white border-r border-gray-200 transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto`

    return (
        <div className='relative'>
            <div
                className={sidebarClass}
                style={isMobile ? { height: '100vh' } : { width: isCollapsed ? '56px' : '256px' }}
            >
                <div className='p-2'>
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
