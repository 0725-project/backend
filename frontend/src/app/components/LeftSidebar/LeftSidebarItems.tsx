interface LeftSidebarItemProps {
    icon: any
    label: string
    isActive?: boolean
    isCollapsed: boolean
}
const SidebarItem = (props: LeftSidebarItemProps) => {
    const { isCollapsed, isActive, icon, label } = props

    return (
        <button
            className={`
                ${isCollapsed ? 'w-10 h-10 justify-center' : 'w-full justify-start px-4 py-2'}
                flex items-center space-x-2 rounded-md
                ${isActive ? 'bg-gray-100' : 'hover:bg-gray-100'}
            `}
        >
            {icon && <props.icon className='w-4 h-4' />}
            {!isCollapsed && <span className='ml-2'>{label}</span>}
        </button>
    )
}

export { SidebarItem }
