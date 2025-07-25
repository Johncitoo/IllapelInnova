import {
  Controller, Post, Body, UploadedFiles, UseInterceptors, Get, Query, Patch, Param, Delete
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UsuariosService } from "./usuarios.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Controller("usuarios")
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: "imagen", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]))
  async create(
    @UploadedFiles() files: { imagen?: Express.Multer.File[]; pdf?: Express.Multer.File[] },
    @Body() data: CreateUsuarioDto
  ) {
    return this.usuariosService.create(data, files.imagen?.[0], files.pdf?.[0]);
  }

  @Patch(":id")
  @UseInterceptors(FileFieldsInterceptor([
    { name: "imagen", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]))
  async update(
    @Param("id") id: number,
    @UploadedFiles() files: { imagen?: Express.Multer.File[]; pdf?: Express.Multer.File[] },
    @Body() data: UpdateUsuarioDto
  ) {
    return this.usuariosService.update(id, data, files.imagen?.[0], files.pdf?.[0]);
  }

  @Get()
  async findAll(@Query("busqueda") busqueda?: string) {
    return this.usuariosService.findAll(busqueda);
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.usuariosService.findOne(id);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.usuariosService.remove(id);
  }
}
