import { IntersectionType } from '@nestjs/swagger'
import { TopicDescriptionDto, TopicNameDto } from './base.dto'

export class CreateTopicDto extends IntersectionType(TopicNameDto, TopicDescriptionDto) {}
