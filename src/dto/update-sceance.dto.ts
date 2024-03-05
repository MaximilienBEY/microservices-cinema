import { sceanceUpdateSchema } from "@app/common/schemas/cinema/schema"
import { createZodDto } from "nestjs-zod"

export class UpdateSceanceDto extends createZodDto(sceanceUpdateSchema) {}
