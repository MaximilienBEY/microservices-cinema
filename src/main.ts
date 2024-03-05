import { CommonInterceptor } from "@app/common"
import { NestFactory } from "@nestjs/core"

import { CinemaModule } from "./cinema.module"

async function bootstrap() {
  const app = await NestFactory.create(CinemaModule)
  app.useGlobalInterceptors(new CommonInterceptor())
  await app.listen(3000)
}
bootstrap()
