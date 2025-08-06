import { PageLayout } from '@/app/components/PageLayout'
import TopicDetail from '@/app/components/TopicsDetail'

interface Params {
    topic: string
}

const TopicPage = async ({ params }: { params: Promise<Params> }) => {
    const { topic: topicSlug } = await params

    return (
        <PageLayout currentItem='topics'>
            <main className='flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] overflow-y-auto'>
                <TopicDetail topicSlug={topicSlug} />
            </main>
        </PageLayout>
    )
}

export default TopicPage
