export const JWT_EXPIRES_IN = '1d'
export const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24
export const REFRESH_TOKEN_EXPIRES_IN = '7d'
export const REFRESH_TOKEN_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7

export const selectUserBriefColumns = (userColumn: string) => [
    `${userColumn}.id`,
    `${userColumn}.username`,
    `${userColumn}.nickname`,
]

export const selectTopicBriefColumns = (topicColumn: string) => [
    `${topicColumn}.id`,
    `${topicColumn}.name`,
    `${topicColumn}.description`,
]
