'use client'

import { PageLayout } from './components/PageLayout'

const Home = () => (
    <PageLayout currentItem='home'>
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-4xl font-bold'>Welcome to the Home Page</h1>
            <p className='mt-4 text-lg'>This is the main entry point of our application.</p>
        </div>
    </PageLayout>
)

export default Home
