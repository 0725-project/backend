const RightSidebar = () => (
    <aside className='w-80 bg-white border-l border-gray-200 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block'>
        <section className='p-4'>
            <header className='flex items-center justify-between mb-4'>
                <h2 className='text-sm font-medium text-gray-500 uppercase tracking-wide'>Recent Posts</h2>
                <button
                    type='button'
                    className='text-blue-600 text-sm px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200'
                >
                    Clear
                </button>
            </header>
            <ul className='space-y-4'>
                <li>
                    <RecentPostItem
                        subreddit='r/GiftofGames'
                        timeAgo='10 yr. ago'
                        title='[OFFER] ANY game of your choice on ANY platform'
                        upvotes={86000}
                        comments={2510}
                        thumbnail='/placeholder.png'
                    />
                </li>
            </ul>
        </section>
    </aside>
)

interface RecentPostItemProps {
    subreddit: string
    timeAgo: string
    title: string
    upvotes: number
    comments: number
    thumbnail: string
}

const numberFormat = (n: number) => n.toLocaleString()

const RecentPostItem = ({ subreddit, timeAgo, title, upvotes, comments, thumbnail }: RecentPostItemProps) => (
    <article
        className='flex space-x-3 group rounded-lg transition-shadow hover:shadow-md bg-white p-2 cursor-pointer'
        tabIndex={0}
        aria-label={title}
    >
        <div className='flex-shrink-0'>
            <img
                src={thumbnail || '/placeholder.png'}
                alt={title ? `${title} thumbnail` : 'Post thumbnail'}
                className='w-12 h-12 rounded object-cover border border-gray-100'
                loading='lazy'
            />
        </div>
        <div className='flex-1 min-w-0'>
            <div className='flex items-center space-x-1 mb-1'>
                <span className='w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center'>
                    <span className='text-white text-xs'>r</span>
                </span>
                <span className='text-xs text-gray-500'>{subreddit}</span>
                <span className='text-xs text-gray-400'>•</span>
                <span className='text-xs text-gray-400'>{timeAgo}</span>
            </div>
            <h3
                className='text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 focus:text-blue-600'
                aria-label={title}
            >
                {title}
            </h3>
            <div className='flex items-center space-x-3 mt-1 text-xs text-gray-500'>
                <span>{numberFormat(upvotes)} upvotes</span>
                <span>{numberFormat(comments)} comments</span>
            </div>
        </div>
    </article>
)

export { RightSidebar }
