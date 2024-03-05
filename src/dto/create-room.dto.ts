import { roomCreateSchema } from "@app/common/schemas/cinema/schema"
import { createZodDto } from "nestjs-zod"

export class CreateRoomDto extends createZodDto(roomCreateSchema) {}
