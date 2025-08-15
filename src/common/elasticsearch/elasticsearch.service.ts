import { Injectable } from '@nestjs/common'
import { Client } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ElasticsearchService {
    private client: Client

    constructor(private readonly configService: ConfigService) {
        this.client = new Client({ node: this.configService.get<string>('ELASTICSEARCH_URL') })
    }

    async indexExists(index: string): Promise<boolean> {
        return this.client.indices.exists({ index })
    }

    async createIndex<T>(index: string, options: T) {
        await this.client.indices.create({ index, ...options })
    }

    async indexDocument<T>(index: string, id: string, document: T) {
        await this.client.index({ index, id, document })
    }

    async updateDocument<T>(index: string, id: string, document: T) {
        await this.client.update({
            index,
            id,
            doc: document,
        })
    }

    async deleteDocument(index: string, id: string) {
        await this.client.delete({ index, id })
    }

    async search(index: string, esQuery: any, from: number, size: number) {
        return await this.client.search({
            index,
            body: { ...esQuery, from, size },
        })
    }
}
