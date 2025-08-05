import { getTopicPostByLocalId } from '@/api/topics'
import { PageLayout } from '@/app/components/PageLayout'
import { notFound } from 'next/navigation'
import { PostPage } from '@/app/components/Post'
import { getPostComments } from '@/api/comments'

interface Params {
    topic: string
    topiclocalid: string
}

export default async function Post({ params }: { params: Promise<Params> }) {
    const { topic, topiclocalid } = await params

    const id = Number(topiclocalid)
    if (isNaN(id)) return notFound()

    try {
        const post = await getTopicPostByLocalId(topic, id)
        if (post.topic.slug !== topic) return notFound()

        const comments = await getPostComments(post.id)

        return (
            <PageLayout>
                <PostPage post={post} comments={comments} />
            </PageLayout>
        )
    } catch {
        return notFound()
    }
}
