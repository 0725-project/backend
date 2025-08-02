import { IntersectionType } from '@nestjs/swagger'
import { TopicLocalIdDto, TopicNameDto } from '../topics/topics.dto'

export class GetTopicPostParamDto extends IntersectionType(TopicNameDto, TopicLocalIdDto) {}
