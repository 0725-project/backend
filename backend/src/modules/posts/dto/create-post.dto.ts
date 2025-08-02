import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { IdDto, PostContentDto, PostTitleDto, TopicNameDto } from 'src/common/types/default.dto'

/** `title`, `content`, `topicName` */
export class CreatePostDto extends IntersectionType(PostTitleDto, PostContentDto, TopicNameDto) {}
