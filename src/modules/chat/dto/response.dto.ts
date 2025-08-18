import { ApiProperty } from '@nestjs/swagger'

export class MessageResponseDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    senderId: number

    @ApiProperty()
    recipientId: number

    @ApiProperty()
    content: string

    @ApiProperty()
    createdAt: Date
}
