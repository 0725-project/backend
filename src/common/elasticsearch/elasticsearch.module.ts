import { Logger, Module, OnModuleInit } from '@nestjs/common'
import { ElasticsearchService } from './elasticsearch.service'
import { schemas } from './elasticsearch.schema'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [ConfigModule],
    providers: [ElasticsearchService, ConfigService],
    exports: [ElasticsearchService],
})
export class ElasticsearchModule implements OnModuleInit {
    private readonly logger = new Logger(ElasticsearchModule.name)

    constructor(private readonly elasticsearchService: ElasticsearchService) {}

    async onModuleInit() {
        for (const [index, schema] of Object.entries(schemas)) {
            if (!(await this.elasticsearchService.indexExists(index))) {
                this.logger.log(`Elasticsearch index '${index}' does not exist. Creating...`)

                await this.elasticsearchService.createIndex(index, schema)

                this.logger.log(`Elasticsearch index '${index}' created successfully.`)
            }
        }
    }
}
