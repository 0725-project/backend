import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'

import { TopicNameDto } from 'src/modules/topics/dto/base.dto'
import { PostContentDto, PostTitleDto } from './base.dto'

export class CreatePostDto extends IntersectionType(PostTitleDto, PostContentDto, TopicNameDto) {}
export class UpdatePostDto extends PartialType(OmitType(CreatePostDto, ['topicName'])) {}
