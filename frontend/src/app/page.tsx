'use client'

import { MainContent } from './components/Main'
import { PageLayout } from './components/PageLayout'

const Home = () => (
    <PageLayout currentItem='home'>
        <MainContent />
    </PageLayout>
)

export default Home
