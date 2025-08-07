interface RightSidebarItemProps {
    title: string
    username: string
    topic: string
    createdAt: string
    likes: number
    comments: number
    color?: string
}

const numberFormat = (n: number) => n.toLocaleString()

const RightSidebarItem = (props: RightSidebarItemProps) => (
    <article
        className='flex space-x-3 group rounded-lg transition-shadow hover:shadow-md bg-white p-2 cursor-pointer'
        tabIndex={0}
        aria-label={props.title}
    >
        <div className='flex-1 min-w-0'>
            <div className='flex items-center space-x-1 mb-1'>
                <span className='w-4 h-4 bg-slate-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-xs'>r</span>
                </span>
                <span className='text-sm font-medium text-gray-900 truncate'>{props.topic}</span>
                <span className='text-xs text-gray-500'>•</span>
                <span className='text-xs text-gray-500'>{props.createdAt}</span>
            </div>
            <h3
                className='text-sm text-gray-900 line-clamp-2 group-hover:text-slate-700 focus:text-slate-700'
                aria-label={props.title}
            >
                {props.title}
            </h3>
            <div className='flex items-center space-x-3 mt-1 text-xs text-gray-500'>
                <span className='flex items-center space-x-1'>
                    <span className='text-gray-700'>by</span>
                    <span className='font-medium text-gray-900'>{props.username}</span>
                </span>
                <span className='flex items-center space-x-1'>
                    <span className='text-gray-700'>Likes:</span>
                    <span className='font-medium text-gray-900'>{numberFormat(props.likes)}</span>
                </span>
                <span className='flex items-center space-x-1'>
                    <span className='text-gray-700'>Comments:</span>
                    <span className='font-medium text-gray-900'>{numberFormat(props.comments)}</span>
                </span>
            </div>
        </div>
    </article>
)

export { RightSidebarItem }
