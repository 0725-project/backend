import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { IsString, IsInt, IsNotEmpty, Matches, MaxLength } from 'class-validator'
import { IdDto, CreatedAtDto } from 'src/common/dto/default.dto'
import { CursorPaginationResponseDto } from 'src/common/dto/pagination.dto'
import { UserBriefResponseDto } from '../users/user.dto'
import { Type } from 'class-transformer'

export class TopicNameDto {
    @ApiProperty({
        description: 'The topic name associated with the post.',
        example: 'programming',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z]+$/, { message: 'The topic name must be in lowercase letters.' })
    @MaxLength(32)
    topicName: string
}

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

export class TopicDescriptionDto {
    @ApiProperty({
        description: 'The description of the topic.',
        example: 'Programming discussions and resources',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string
}

export class TopicLocalIdDto {
    @ApiProperty({
        description: 'The local ID of the post within the topic.',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    topicLocalId: number
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
export class CreateTopicDto extends IntersectionType(TopicNameDto, TopicDescriptionDto) {}
export class CreateTopicResponseDto extends IntersectionType(OmitType(TopicResponseDto, ['creator'])) {}
