// 헷갈리지 말라고 타입들 직접 하나하나 명시해둠, TODO: 나중에 리펙토링

/// POST /api/auth/register
export interface RegisterResponse {
    id: number
    username: string
    nickname: string
    email: string
}

/// POST /api/auth/login
export interface LoginResponse {
    access_token: string
    user_id: number
}

/// POST /api/auth/refresh
export interface RefreshResponse {
    access_token: string
}

/// POST /api/auth/logout
export interface LogoutResponse {
    message: string
}

/// GET /api/users/id/{id}
/// GET /api/users/username/{username}
export interface GetUserResponse {
    id: number
    username: string
    nickname: string
    email: string
}

/// POST /api/posts
export interface CreatePostResponse {
    id: number
    title: string
    createdAt: string
    topicLocalId: number
    viewCount: number
    author: {
        id: number
    }
    topic: {
        id: number
        name: string
        description: string
        createdAt: string
    }
}

/// GET /api/posts
export interface GetPostsResponse {
    posts: {
        id: number
        title: string
        content: string
        createdAt: string
        topicLocalId: number
        viewCount: number
        author: {
            id: number
            username: string
            nickname: string
        }
        topic: {
            id: number
            name: string
            description: string
        }
    }[]
    nextCursor: number | null
}

/// GET /api/posts/{id}
/// PUT /api/posts/{id}
/// DELETE /api/posts/{id}
export interface RUDPostResponse {
    id: number
    title: string
    content: string
    createdAt: string
    topicLocalId: number
    viewCount: number
    author: {
        id: number
        username: string
        nickname: string
    }
    topic: {
        id: number
        name: string
        description: string
    }
}

/// POST /api/topics
export interface CreateTopicResponse {
    id: number
    name: string
    description: string
    creator: {
        id: number
        username: string
        nickname: string
    }
    createdAt: string
}

/// GET /api/topics/{topicName}
export interface GetTopicResponse {
    id: number
    name: string
    description: string
    creator: {
        id: number
        username: string
        nickname: string
    }
    createdAt: string
}

/// GET /api/topic/{topicName}
export interface GetTopicPostsResponse {
    posts: {
        id: number
        title: string
        content: string
        createdAt: string
        topicLocalId: number
        viewCount: number
        author: {
            id: number
            username: string
            nickname: string
        }
        topic: {
            id: number
            name: string
            description: string
        }
    }[]
    nextCursor: number | null
}

/// GET /api/topic/{topicName}/{topicLocalId}
export interface GetTopicPostResponse {
    id: number
    title: string
    content: string
    createdAt: string
    topicLocalId: number
    viewCount: number
    author: {
        id: number
        username: string
        nickname: string
    }
    topic: {
        id: number
        name: string
        description: string
    }
}

/// GET /api/search
export type SearchPostsResponse = GetPostsResponse

/// POST /api/comments
export interface CreateCommentResponse {
    id: number
    content: string
    createdAt: string
    post: {
        id: number
    }
    user: {
        id: number
    }
}

/// GET /api/comments/{postId}
export interface GetPostCommentsResponse {
    comments: {
        id: number
        content: string
        createdAt: string
        user: {
            id: number
            username: string
            nickname: string
        }
    }[]
    nextCursor: number | null
}

/// PUT /api/comments/{id}
export interface UpdateCommentResponse {
    id: number
    content: string
    createdAt: string
    user: {
        id: number
        username: string
        nickname: string
    }
}

/// DELETE /api/comments/{id}
export interface DeleteCommentResponse {
    content: string
    createdAt: string
    user: {
        id: number
        username: string
        nickname: string
    }
}
