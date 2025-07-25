import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { Imagen } from '../imagenes/entities/imagene.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Imagen])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
