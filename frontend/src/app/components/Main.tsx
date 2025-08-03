import { ChevronDown, ArrowUp, ArrowDown, MessageSquare, Share, MoreHorizontal } from 'lucide-react'

export function MainContent() {
    return (
        <main className={'flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] overflow-y-auto'}>
            <div className='max-w-5xl mx-auto p-4'>
                <div className='flex items-center space-x-4 mb-4'>
                    <button className='text-blue-600 flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100'>
                        Best
                        <ChevronDown className='w-4 h-4 ml-1' />
                    </button>
                    <button className='px-2 py-1 rounded-md hover:bg-gray-100'>
                        <div className='w-4 h-4 border border-gray-400 mr-1'></div>
                    </button>
                </div>

                <div className='space-y-4'>
                    <PostCard
                        subreddit='r/wallpaperengine'
                        username='u/wallpaperengine'
                        timeAgo='3 days ago'
                        title='Why is Wallpaper Engine so battery draining? (Android)'
                        content="Because you've visited this community before"
                        imageUrl='/placeholder.png'
                        upvotes={13}
                        comments={12}
                        hasJoinButton
                    />
                </div>
            </div>
        </main>
    )
}

function PostCard({
    subreddit,
    username,
    timeAgo,
    title,
    content,
    imageUrl,
    upvotes,
    comments,
    hasJoinButton = false,
    isPromoted = false,
}: {
    subreddit: string
    username: string
    timeAgo: string
    title: string
    content?: string
    imageUrl?: string
    upvotes: number
    comments: number
    hasJoinButton?: boolean
    isPromoted?: boolean
}) {
    return (
        <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
            <div className='flex items-center justify-between p-3 pb-2'>
                <div className='flex items-center space-x-2'>
                    <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs font-bold'>r</span>
                    </div>
                    <span className='text-sm font-medium'>{subreddit}</span>
                    <span className='text-gray-500 text-sm'>•</span>
                    <span className='text-gray-500 text-sm'>{timeAgo}</span>
                    {content && <span className='text-gray-500 text-sm'>• {content}</span>}
                    {isPromoted && <span className='text-blue-600 text-sm'>• Promoted</span>}
                </div>
                <div className='flex items-center space-x-2'>
                    {hasJoinButton && (
                        <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md'>Join</button>
                    )}
                    <button className='p-2 rounded-full hover:bg-gray-100'>
                        <MoreHorizontal className='w-4 h-4' />
                    </button>
                </div>
            </div>

            <div className='px-3 pb-2'>
                <h2 className='text-lg font-medium text-gray-900'>{title}</h2>
            </div>

            {imageUrl && (
                <div className='px-3 pb-3'>
                    <img src={imageUrl || '/placeholder.png'} alt='Post content' className='w-full rounded-lg' />
                </div>
            )}

            <div className='flex items-center space-x-4 px-3 py-2 border-t border-gray-100'>
                <div className='flex items-center space-x-1'>
                    <button className='p-1 rounded-full hover:bg-gray-100'>
                        <ArrowUp className='w-4 h-4' />
                    </button>
                    <span className='text-sm font-medium'>{upvotes}</span>
                    <button className='p-1 rounded-full hover:bg-gray-100'>
                        <ArrowDown className='w-4 h-4' />
                    </button>
                </div>

                <button className='flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100'>
                    <MessageSquare className='w-4 h-4' />
                    <span className='text-sm'>{comments}</span>
                </button>

                <button className='flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100'>
                    <Share className='w-4 h-4' />
                    <span className='text-sm'>Share</span>
                </button>
            </div>
        </div>
    )
}
