'use client'

import TopicsList from '../components/Topics/TopicsList'
import { PageLayout } from '../components/PageLayout'

const TopicsPage = () => (
    <PageLayout currentItem='topics'>
        <main className='flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] overflow-y-auto'>
            <TopicsList />
        </main>
    </PageLayout>
)

export default TopicsPage
