import { RightSidebarItem } from './RightSidebarItems'

const RightSidebar = () => (
    <aside className='hidden lg:block md:w-80 bg-white border-l border-gray-200 sticky top-14 h-[calc(100vh-4rem)] overflow-y-auto'>
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
                    <RightSidebarItem
                        title='New Features in Wallpaper Engine'
                        username='asdf'
                        topic='programming'
                        createdAt='2 hours ago'
                        likes={20}
                        comments={5}
                    />
                </li>
            </ul>
        </section>
    </aside>
)

export { RightSidebar }
