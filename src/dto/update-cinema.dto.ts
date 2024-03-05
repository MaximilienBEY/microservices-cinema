import { cinemaUpdateSchema } from "@app/common/schemas/cinema/schema"
import { createZodDto } from "nestjs-zod"

export class UpdateCinemaDto extends createZodDto(cinemaUpdateSchema) {}
