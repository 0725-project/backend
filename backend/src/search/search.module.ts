import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from '../posts/post.entity'
import { SearchService } from './search.service'
import { SearchController } from './search.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [SearchService],
    controllers: [SearchController],
})
export class SearchModule {}
