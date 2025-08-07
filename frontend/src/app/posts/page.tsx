'use client'

import { AllPosts } from '../components/AllPosts'
import { PageLayout } from '../components/PageLayout'

const PostsPage = () => (
    <PageLayout currentItem='posts'>
        <AllPosts />
    </PageLayout>
)

export default PostsPage
