import { Search, Plus, Bell, MessageSquare, Calendar } from 'lucide-react'

export function Header() {
    return (
        <header className='bg-white border-b border-gray-200 sticky top-0 z-50'>
            <div className='flex items-center justify-between px-4 py-2'>
                <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center'>
                        <span className='text-white font-bold text-sm'>r</span>
                    </div>
                    <span className='text-xl font-bold text-orange-500'>reddit</span>
                </div>

                <div className='flex-1 max-w-2xl mx-8'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                        <input
                            placeholder='Search Reddit'
                            className='pl-10 bg-gray-100 border-gray-200 rounded-full w-full py-2 px-3'
                        />
                    </div>
                </div>

                <div className='flex items-center space-x-2'>
                    <button className='hidden md:flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100'>
                        <Calendar className='w-4 h-4' />
                        <span>Get App</span>
                    </button>
                    <button className='hidden md:flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100'>
                        <MessageSquare className='w-4 h-4' />
                        <span>Chat</span>
                    </button>
                    <button className='bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full flex items-center space-x-1'>
                        <Plus className='w-4 h-4' />
                        <span>Create</span>
                    </button>
                    <button className='p-2 rounded-full hover:bg-gray-100'>
                        <Bell className='w-4 h-4' />
                    </button>
                    <div className='w-8 h-8 bg-green-500 rounded-full'></div>
                </div>
            </div>
        </header>
    )
}
