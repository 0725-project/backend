import { IntersectionType } from '@nestjs/swagger'
import { TopicLocalIdDto, TopicNameDto } from 'src/modules/topics/dto/base.dto'

export class GetTopicPostParamDto extends IntersectionType(TopicNameDto, TopicLocalIdDto) {}
