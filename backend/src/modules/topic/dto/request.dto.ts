import { IntersectionType } from '@nestjs/swagger'
import { TopicLocalIdDto, TopicNameDto } from 'src/modules/topics/dto'

export class GetTopicPostParamDto extends IntersectionType(TopicNameDto, TopicLocalIdDto) {}
