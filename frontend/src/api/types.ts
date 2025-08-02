/// POST /api/auth/register
export interface RegisterResponse {
    id: number
    username: string
    nickname: string
    email: string
    createdAt: string
}

/// POST /api/auth/login
export interface LoginResponse {
    id: number
    accessToken: string
}

/// POST /api/auth/refresh
export interface RefreshResponse {
    accessToken: string
}

/// POST /api/auth/logout
export interface LogoutResponse {}

/// GET /api/users/id/{id}
/// GET /api/users/username/{username}
export interface GetUserResponse {
    id: number
    username: string
    nickname: string
    email: string
    createdAt: string
}

/// POST /api/posts
export interface CreatePostResponse {
    id: number
    title: string
    content: string
    createdAt: string
    topicLocalId: number
    viewCount: number
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
export interface RUPostResponse {
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

/// DELETE /api/posts/{id}
export interface DeletePostResponse {}

/// POST /api/topics
export interface CreateTopicResponse {
    id: number
    name: string
    description: string
    createdAt: string
}

/// GET /api/topics
export interface GetTopicsResponse {
    topics: {
        id: number
        name: string
        description: string
        creator: {
            id: number
            username: string
            nickname: string
        }
        createdAt: string
    }[]
    nextCursor: number | null
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
export interface DeleteCommentResponse {}
