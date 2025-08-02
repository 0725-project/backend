import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'

import { TopicNameDto } from 'src/modules/topics/dto'
import { PostContentDto, PostTitleDto } from '.'

export class CreatePostDto extends IntersectionType(PostTitleDto, PostContentDto, TopicNameDto) {}
export class UpdatePostDto extends PartialType(OmitType(CreatePostDto, ['topicName'])) {}
