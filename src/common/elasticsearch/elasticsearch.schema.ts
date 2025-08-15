export type ElasticSearchSchemaPropertyType =
    | 'text'
    | 'keyword'
    | 'integer'
    | 'float'
    | 'boolean'
    | 'date'
    | 'object'
    | 'nested'

export interface ElasticsearchIndexSchema {
    [key: string]: {
        mappings: {
            properties: ElasticSearchIndexSchemaProperty
        }
    }
}

export type ElasticSearchIndexSchemaProperty = Record<string, ElasticSearchIndexSchemaPropertyValue>

export type ElasticSearchIndexSchemaPropertyValue =
    | { type: ElasticSearchSchemaPropertyType }
    | { type: 'object' | 'nested'; properties: ElasticSearchIndexSchemaProperty }

export const schemas: ElasticsearchIndexSchema = {
    posts: {
        mappings: {
            properties: {
                id: { type: 'integer' },
                title: { type: 'text' },
                content: { type: 'text' },
                author: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        username: { type: 'text' },
                        nickname: { type: 'text' },
                    },
                },
                topic: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        slug: { type: 'text' },
                        name: { type: 'text' },
                    },
                },
                createdAt: { type: 'date' },
            },
        },
    },
}

export interface PostDocument {
    id: number
    title: string
    content: string
    author: {
        id: number
        username: string
        nickname: string
    }
    topic: {
        id: number
        slug: string
        name: string
    }
    createdAt: Date
}
