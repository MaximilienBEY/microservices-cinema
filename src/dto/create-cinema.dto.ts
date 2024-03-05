import { cinemaCreateSchema } from "@app/common/schemas/cinema/schema"
import { createZodDto } from "nestjs-zod"

export class CreateCinemaDto extends createZodDto(cinemaCreateSchema) {}
