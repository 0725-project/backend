import { ChevronDown } from 'lucide-react'
import { PostCard } from './PostCard'

const MainContent = () => {
    return (
        <main className='flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] overflow-y-auto'>
            <div className='max-w-full md:max-w-5xl mx-auto px-2 md:px-4 py-2 md:py-4'>
                <div className='flex items-center space-x-2 md:space-x-4 mb-2 md:mb-4'>
                    <button className='text-blue-600 flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 text-sm md:text-base'>
                        Best
                        <ChevronDown className='w-4 h-4 ml-1' />
                    </button>
                </div>

                <div className='space-y-2 md:space-y-4'>
                    <PostCard
                        topic='programming'
                        username='Kadsfdsfdssdfdskflfdslkjfdskl222'
                        createdAt='3 days ago'
                        title='Why is Wallpaper Engine so battery draining? (Android)'
                        thumbnailUrl='/placeholder.png'
                        likes={13}
                        comments={12}
                    />
                </div>
            </div>
        </main>
    )
}

export { MainContent }
