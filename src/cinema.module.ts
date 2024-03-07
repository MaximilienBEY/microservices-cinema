import { CommonModule } from "@app/common"
import { Module } from "@nestjs/common"

import { CinemaController } from "./cinema.controller"
import { CinemaService } from "./cinema.service"

@Module({
  imports: [CommonModule],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
