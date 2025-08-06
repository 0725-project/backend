'use client'

import TopicsList from '../components/Topics'
import { PageLayout } from '../components/PageLayout'

const TopicsPage = () => (
    <PageLayout currentItem='topics'>
        <TopicsList />
    </PageLayout>
)

export default TopicsPage
