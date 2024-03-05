import { CommonModule } from "@app/common"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import * as joi from "joi"

import { CinemaController } from "./cinema.controller"
import { CinemaService } from "./cinema.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().required(),
      }),
      envFilePath: "./apps/cinema/.env",
    }),
    CommonModule,
  ],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
