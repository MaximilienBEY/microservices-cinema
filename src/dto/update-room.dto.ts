import { roomUpdateSchema } from "@app/common/schemas/cinema/schema"
import { createZodDto } from "nestjs-zod"

export class UpdateRoomDto extends createZodDto(roomUpdateSchema) {}
