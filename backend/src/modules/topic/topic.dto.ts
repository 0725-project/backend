import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import { TopicNameDto } from '../topics/topics.dto'

export class GetTopicPostParamDto extends IntersectionType(TopicNameDto) {
    @ApiProperty({
        description: 'The local ID of the post within the topic.',
        example: 1,
    })
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    topicLocalId: number
}
