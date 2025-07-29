import { IntersectionType } from '@nestjs/swagger'
import { TopicNameDto } from 'src/common/types/default.dto'

export class CreateTopicDto extends IntersectionType(TopicNameDto) {}
