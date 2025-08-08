import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3'

// aws s3 mb s3://0725-bucket --endpoint-url=http://localhost:4566

const s3 = new S3Client({
    region: 'ap-northeast-2',
    endpoint: 'http://localhost:4566',
    forcePathStyle: true,
    credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test',
    },
})

async function createBucket() {
    const command = new CreateBucketCommand({ Bucket: '0725-bucket' })
    await s3.send(command)
    console.log('Bucket created')
}

createBucket()
