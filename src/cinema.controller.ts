import { Admin, Public } from "@app/common/auth/user.decorator"
import { cinemaListResponseSchema, cinemaSchema } from "@app/common/schemas/cinema/schema"
import { CinemaType } from "@app/common/schemas/cinema/types"
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common"
import { ApiOkResponse } from "@nestjs/swagger"
import { HealthCheck, HealthCheckService } from "@nestjs/terminus"
import { zodToOpenAPI } from "nestjs-zod"

import { CinemaService } from "./cinema.service"
import { CreateCinemaDto } from "./dto/create-cinema.dto"
import { CreateRoomDto } from "./dto/create-room.dto"
import { CreateSceanceDto } from "./dto/create-sceance.dto"
import { UpdateCinemaDto } from "./dto/update-cinema.dto"
import { UpdateRoomDto } from "./dto/update-room.dto"
import { UpdateSceanceDto } from "./dto/update-sceance.dto"

@Controller("cinema")
export class CinemaController {
  constructor(
    private readonly cinemaService: CinemaService,
    private readonly health: HealthCheckService,
  ) {}

  @Public()
  @Get("health")
  @HealthCheck()
  check() {
    return this.health.check([])
  }

  // Cinema
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ schema: zodToOpenAPI(cinemaListResponseSchema) })
  async findAll(): Promise<CinemaType[] | null> {
    const movies = await this.cinemaService.findAll()
    return movies.length ? movies : null
  }

  @Get(":id")
  @ApiOkResponse({ schema: zodToOpenAPI(cinemaSchema) })
  findOne(@Param("id") id: string) {
    return this.cinemaService.findOne(id)
  }

  @Admin()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOkResponse({ schema: zodToOpenAPI(cinemaSchema) })
  create(@Body() data: CreateCinemaDto) {
    return this.cinemaService.create(data)
  }

  @Admin()
  @Put(":id")
  @ApiOkResponse({ schema: zodToOpenAPI(cinemaSchema) })
  update(@Param("id") id: string, @Body() body: UpdateCinemaDto) {
    return this.cinemaService.update(id, body)
  }

  @Admin()
  @Delete(":id")
  @ApiOkResponse()
  remove(@Param("id") id: string) {
    return this.cinemaService.delete(id)
  }

  // Room
  @Get(":id/rooms")
  @ApiOkResponse()
  getRooms(@Param("id") id: string) {
    return this.cinemaService.getRooms(id)
  }

  @Get(":id/rooms/:roomId")
  @ApiOkResponse()
  getRoom(@Param("id") id: string, @Param("roomId") roomId: string) {
    return this.cinemaService.getRoom(id, roomId)
  }

  @Admin()
  @Post(":id/rooms")
  @ApiOkResponse()
  createRoom(@Param("id") id: string, @Body() body: CreateRoomDto) {
    return this.cinemaService.createRoom(id, body)
  }

  @Admin()
  @Put(":id/rooms/:roomId")
  @ApiOkResponse()
  updateRoom(
    @Param("id") id: string,
    @Param("roomId") roomId: string,
    @Body() body: UpdateRoomDto,
  ) {
    return this.cinemaService.updateRoom(id, roomId, body)
  }

  @Admin()
  @Delete(":id/rooms/:roomId")
  @ApiOkResponse()
  deleteRoom(@Param("id") id: string, @Param("roomId") roomId: string) {
    return this.cinemaService.deleteRoom(id, roomId)
  }

  // Sceance
  @Get(":id/rooms/:roomId/sceances")
  @ApiOkResponse()
  getSceances(@Param("id") id: string, @Param("roomId") roomId: string) {
    return this.cinemaService.getSceances(id, roomId)
  }

  @Get(":id/rooms/:roomId/sceances/:sceanceId")
  @ApiOkResponse()
  getSceance(
    @Param("id") id: string,
    @Param("roomId") roomId: string,
    @Param("sceanceId") sceanceId: string,
  ) {
    return this.cinemaService.getSceance(id, roomId, sceanceId)
  }

  @Admin()
  @Post(":id/rooms/:roomId/sceances")
  @ApiOkResponse()
  createSceance(
    @Param("id") id: string,
    @Param("roomId") roomId: string,
    @Body() body: CreateSceanceDto,
  ) {
    return this.cinemaService.createSceance(id, roomId, body)
  }

  @Admin()
  @Put(":id/rooms/:roomId/sceances/:sceanceId")
  @ApiOkResponse()
  updateSceance(
    @Param("id") id: string,
    @Param("roomId") roomId: string,
    @Param("sceanceId") sceanceId: string,
    @Body() body: UpdateSceanceDto,
  ) {
    return this.cinemaService.updateSceance(id, roomId, sceanceId, body)
  }

  @Admin()
  @Delete(":id/rooms/:roomId/sceances/:sceanceId")
  @ApiOkResponse()
  deleteSceance(
    @Param("id") id: string,
    @Param("roomId") roomId: string,
    @Param("sceanceId") sceanceId: string,
  ) {
    return this.cinemaService.deleteSceance(id, roomId, sceanceId)
  }
}
