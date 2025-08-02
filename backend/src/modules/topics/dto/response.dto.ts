import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator'

import { UserBriefResponseDto } from 'src/modules/users/dto/response.dto'
import { CursorPaginationResponseDto } from 'src/common/dto/pagination.dto'
import { CreatedAtDto, IdDto } from 'src/common/dto/base'
import { TopicDescriptionDto } from './base.dto'

export class TopicNameResponseDto {
    @ApiProperty({
        description: 'The topic name associated with the post.',
        example: 'programming',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z]+$/, { message: 'The topic name must be in lowercase letters.' })
    @MaxLength(32)
    name: string
}

export class TopicResponseDto extends IntersectionType(IdDto, TopicNameResponseDto, TopicDescriptionDto, CreatedAtDto) {
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

export class TopicBriefResponseDto extends IntersectionType(IdDto, TopicNameResponseDto, TopicDescriptionDto) {}
export class CreateTopicResponseDto extends IntersectionType(OmitType(TopicResponseDto, ['creator'])) {}
