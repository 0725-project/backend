import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator'

import { CreatedAtDto, IdDto, CursorPaginationResponseDto } from 'src/common/dto'
import { UserBriefResponseDto } from 'src/modules/users/dto'
import { TopicDescriptionDto } from '.'

export class TopicSlugResponseDto {
    @ApiProperty({
        description: 'The topic slug associated with the post.',
        example: 'programming',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z]+$/, { message: 'The topic slug must be in lowercase letters.' })
    @MaxLength(32)
    slug: string
}

export class TopicResponseDto extends IntersectionType(IdDto, TopicSlugResponseDto, TopicDescriptionDto, CreatedAtDto) {
    @ApiProperty({
        description: 'The creator of the topic.',
        type: UserBriefResponseDto,
    })
    creator: UserBriefResponseDto
}

export class TopicsResponseDto extends IntersectionType(CursorPaginationResponseDto) {
    @ApiProperty({
        description: 'List of topics.',
        type: [TopicResponseDto],
    })
    topics: TopicResponseDto[]
}

export class TopicBriefResponseDto extends IntersectionType(IdDto, TopicSlugResponseDto, TopicDescriptionDto) {}
export class CreateTopicResponseDto extends IntersectionType(OmitType(TopicResponseDto, ['creator'])) {}
