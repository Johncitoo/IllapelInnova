import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { Imagen } from "../imagenes/entities/imagene.entity";
import { extname } from "path";
import * as fs from "fs";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Imagen)
    private imagenesRepository: Repository<Imagen>,
  ) {}

  async create(data: CreateUsuarioDto, imagenFile?: Express.Multer.File, pdfFile?: Express.Multer.File) {
    // Verificar si ya existe un usuario con el mismo RUT
    const existe = await this.usuariosRepository.findOne({ where: { rut: data.rut } });
    if (existe) throw new Error("Ya existe una ficha con ese RUT");

    let imagen: Imagen | undefined = undefined;
    if (imagenFile) {
      const filename = Date.now() + extname(imagenFile.originalname);
      const url = `/uploads/${filename}`;
      fs.writeFileSync(`./uploads/${filename}`, imagenFile.buffer);
      imagen = this.imagenesRepository.create({ filename, url });
      await this.imagenesRepository.save(imagen);
    }

    let pdfUrl: string | undefined = undefined;
    if (pdfFile) {
      const filename = Date.now() + "-" + pdfFile.originalname;
      const pdfPath = `./uploads/${filename}`;
      fs.writeFileSync(pdfPath, pdfFile.buffer);
      pdfUrl = `/uploads/${filename}`;
    }

    const usuario = this.usuariosRepository.create({
      ...data,
      imagen,
      pdfUrl,
    });
    return this.usuariosRepository.save(usuario);
  }

  async update(
    id: number,
    data: Partial<CreateUsuarioDto>,
    imagenFile?: Express.Multer.File,
    pdfFile?: Express.Multer.File
  ) {
    const usuario = await this.usuariosRepository.findOne({ where: { id }, relations: ["imagen"] });
    if (!usuario) throw new Error("Usuario no encontrado");

    // Validar RUT duplicado si cambió el RUT
    if (data.rut && data.rut !== usuario.rut) {
      const otro = await this.usuariosRepository.findOne({ where: { rut: data.rut } });
      if (otro && otro.id !== usuario.id) {
        throw new Error("Ya existe un usuario con ese RUT");
      }
    }

    // Imagen nueva (si la suben)
    if (imagenFile) {
      const filename = Date.now() + extname(imagenFile.originalname);
      const url = `/uploads/${filename}`;
      fs.writeFileSync(`./uploads/${filename}`, imagenFile.buffer);
      let imagen = usuario.imagen;
      if (imagen) {
        try { fs.unlinkSync(`.${imagen.url}`); } catch {}
        imagen.filename = filename;
        imagen.url = url;
        await this.imagenesRepository.save(imagen);
      } else {
        imagen = this.imagenesRepository.create({ filename, url });
        await this.imagenesRepository.save(imagen);
      }
      usuario.imagen = imagen;
    }

    // PDF nuevo (si la suben)
    if (pdfFile) {
      if (usuario.pdfUrl) {
        try { fs.unlinkSync(`.${usuario.pdfUrl}`); } catch {}
      }
      const filename = Date.now() + "-" + pdfFile.originalname;
      const pdfPath = `./uploads/${filename}`;
      fs.writeFileSync(pdfPath, pdfFile.buffer);
      usuario.pdfUrl = `/uploads/${filename}`;
    }

    // Actualiza los datos
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "id" && key !== "imagen" && key !== "pdfUrl") usuario[key] = value;
    });

    return this.usuariosRepository.save(usuario);
  }

  async findAll(busqueda?: string) {
    if (busqueda) {
      return this.usuariosRepository.find({
        where: [
          { nombres: ILike(`%${busqueda}%`) },
          { apellidos: ILike(`%${busqueda}%`) },
          { rut: ILike(`%${busqueda}%`) },
        ],
        relations: ["imagen"],
      });
    }
    return this.usuariosRepository.find({ relations: ["imagen"] });
  }

  async findOne(id: number) {
    return this.usuariosRepository.findOne({ where: { id }, relations: ["imagen"] });
  }

  async remove(id: number) {
    const usuario = await this.usuariosRepository.findOne({ where: { id }, relations: ["imagen"] });
    if (!usuario) throw new Error("Usuario no encontrado");
    // Borra imagen si hay
    if (usuario.imagen?.url) {
      try { fs.unlinkSync(`.${usuario.imagen.url}`); } catch {}
      await this.imagenesRepository.remove(usuario.imagen);
    }
    // Borra PDF si hay
    if (usuario.pdfUrl) {
      try { fs.unlinkSync(`.${usuario.pdfUrl}`); } catch {}
    }
    await this.usuariosRepository.remove(usuario);
    return { ok: true };
  }
}
