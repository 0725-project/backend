import { IntersectionType } from '@nestjs/swagger'

import { TopicDescriptionDto, TopicSlugDto } from '.'

export class CreateTopicDto extends IntersectionType(TopicSlugDto, TopicDescriptionDto) {}
