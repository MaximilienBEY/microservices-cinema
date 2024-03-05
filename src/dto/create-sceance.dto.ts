import { sceanceCreateSchema } from "@app/common/schemas/cinema/schema"
import { createZodDto } from "nestjs-zod"

export class CreateSceanceDto extends createZodDto(sceanceCreateSchema) {}
