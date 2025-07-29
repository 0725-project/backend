import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { TopicNameDto } from 'src/common/types/default.dto'
import { IsInt, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class GetTopicPostDto extends IntersectionType(TopicNameDto) {
    @ApiProperty({
        description: 'The local ID of the post within the topic.',
        example: 1,
    })
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    topicLocalId: number
}
