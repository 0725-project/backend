export const selectUserBriefColumns = (userColumn: string) => [
    `${userColumn}.id`,
    `${userColumn}.username`,
    `${userColumn}.nickname`,
    `${userColumn}.description`,
    `${userColumn}.profileImage`,
    `${userColumn}.role`,
    `${userColumn}.points`,
    `${userColumn}.followersCount`,
    `${userColumn}.followingCount`,
]

export const selectTopicBriefColumns = (topicColumn: string) => [
    `${topicColumn}.id`,
    `${topicColumn}.name`,
    `${topicColumn}.slug`,
    `${topicColumn}.description`,
]

export const selectPostBriefColumns = (postColumn: string) => [
    `${postColumn}.id`,
    `${postColumn}.title`,
    `${postColumn}.createdAt`,
    `${postColumn}.topicLocalId`,
    `${postColumn}.viewCount`,
    `${postColumn}.commentCount`,
    `${postColumn}.likeCount`,
]
