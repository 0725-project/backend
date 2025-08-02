import { IntersectionType } from '@nestjs/swagger'

import { TopicDescriptionDto, TopicNameDto } from '.'

export class CreateTopicDto extends IntersectionType(TopicNameDto, TopicDescriptionDto) {}
