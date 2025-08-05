import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'

import { TopicSlugDto } from 'src/modules/topics/dto'
import { PostContentDto, PostTitleDto } from '.'

export class CreatePostDto extends IntersectionType(PostTitleDto, PostContentDto, TopicSlugDto) {}
export class UpdatePostDto extends PartialType(OmitType(CreatePostDto, ['topicSlug'])) {}
