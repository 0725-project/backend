import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator'

export class SendMessageDto {
    @ApiProperty({ example: 2, description: 'Recipient user ID' })
    @IsInt()
    @Min(1)
    recipientId: number

    @ApiProperty({ example: 'Hello!', description: 'Message content' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string
}
