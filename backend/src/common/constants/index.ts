export const JWT_EXPIRES_IN = '1d'
export const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24
export const REFRESH_TOKEN_EXPIRES_IN = '7d'
export const REFRESH_TOKEN_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7

export const SELECT_USER_WITH_DEFAULT = ['user.id', 'user.username', 'user.nickname']
export const SELECT_POSTS_WITH_AUTHOR_AND_TOPIC = [
    'post',
    'author.id',
    'author.username',
    'author.nickname',
    'topic.name',
    'topic.id',
    'topic.description',
]
