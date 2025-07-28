import { BadRequestException } from '@nestjs/common'

export const validationId = (id: any) => {
    if (isNaN(id) || !Number.isInteger(id)) {
        throw new BadRequestException(`Invalid ID`)
    }
}
