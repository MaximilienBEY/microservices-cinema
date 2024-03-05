import { PrismaService } from "@app/common"
import {
  CinemaCreateType,
  CinemaType,
  CinemaUpdateType,
  RoomCreateType,
  RoomUpdateType,
  SceanceCreateType,
  SceanceUpdateType,
} from "@app/common/schemas/cinema/types"
import { Injectable, NotFoundException } from "@nestjs/common"

@Injectable()
export class CinemaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CinemaCreateType): Promise<CinemaType> {
    return this.prisma.cinema.create({ data })
  }
  async findAll(): Promise<CinemaType[]> {
    return this.prisma.cinema.findMany()
  }
  async findOne(uid: string) {
    return this.prisma.cinema.findFirstOrThrow({ where: { uid } }).catch(() => {
      throw new NotFoundException("Cinema not found")
    })
  }
  async update(uid: string, data: CinemaUpdateType) {
    return this.prisma.cinema.update({ where: { uid }, data }).catch(() => {
      throw new NotFoundException("Cinema not found")
    })
  }
  async delete(uid: string) {
    await this.prisma.cinema.delete({ where: { uid } }).catch(() => {
      throw new NotFoundException("Cinema not found")
    })
  }

  async createRoom(cinemaUid: string, data: RoomCreateType) {
    return this.prisma.room
      .create({ data: { ...data, cinema: { connect: { uid: cinemaUid } } } })
      .catch(() => {
        throw new NotFoundException("Cinema not found")
      })
  }
  async getRooms(cinemaUid: string) {
    return this.prisma.cinema
      .findFirstOrThrow({ where: { uid: cinemaUid } })
      .rooms()
      .catch(() => {
        throw new NotFoundException("Cinema not found")
      })
  }
  async getRoom(cinemaUid: string, roomUid: string) {
    return this.prisma.room.findFirstOrThrow({ where: { uid: roomUid, cinemaUid } }).catch(() => {
      throw new NotFoundException("Room not found")
    })
  }
  async updateRoom(cinemaUid: string, roomUid: string, data: RoomUpdateType) {
    return this.prisma.room.update({ where: { uid: roomUid, cinemaUid }, data }).catch(() => {
      throw new NotFoundException("Room not found")
    })
  }
  async deleteRoom(cinemaUid: string, roomUid: string) {
    await this.prisma.room.delete({ where: { uid: roomUid, cinemaUid } }).catch(() => {
      throw new NotFoundException("Room not found")
    })
  }

  async createSceance(cinemaUid: string, roomUid: string, data: SceanceCreateType) {
    await this.findOne(cinemaUid) // Check if cinema exists

    return this.prisma.sceance
      .create({ data: { date: data.date, movieUid: data.movie, roomUid } })
      .catch(e => {
        if (e.meta?.field_name?.includes("movieUid")) throw new NotFoundException("Movie not found")
        throw new NotFoundException("Room not found")
      })
  }
  async getSceances(cinemaUid: string, roomUid: string) {
    await this.findOne(cinemaUid) // Check if cinema exists

    return this.prisma.sceance.findMany({ where: { roomUid } }).catch(() => {
      throw new NotFoundException("Room not found")
    })
  }
  async getSceance(cinemaUid: string, roomUid: string, sceanceUid: string) {
    await this.findOne(cinemaUid) // Check if cinema exists

    return this.prisma.sceance
      .findFirstOrThrow({ where: { uid: sceanceUid, roomUid } })
      .catch(() => {
        throw new NotFoundException("Sceance not found")
      })
  }
  async updateSceance(
    cinemaUid: string,
    roomUid: string,
    sceanceUid: string,
    data: SceanceUpdateType,
  ) {
    await this.findOne(cinemaUid) // Check if cinema exists

    return this.prisma.sceance
      .update({
        where: { uid: sceanceUid, roomUid },
        data: {
          ...(data.movie && { movieUid: data.movie }),
          ...(data.date && { date: data.date }),
        },
      })
      .catch(() => {
        throw new NotFoundException("Sceance not found")
      })
  }
  async deleteSceance(cinemaUid: string, roomUid: string, sceanceUid: string) {
    await this.findOne(cinemaUid) // Check if cinema exists

    await this.prisma.sceance.delete({ where: { uid: sceanceUid, roomUid } }).catch(() => {
      throw new NotFoundException("Sceance not found")
    })
  }
}
