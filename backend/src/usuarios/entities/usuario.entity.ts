import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Imagen } from "../../imagenes/entities/imagene.entity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() nombres: string;
  @Column() apellidos: string;
  @Column({ unique: true }) rut: string; // <-- ÚNICO!
  @Column({ nullable: true }) direccion: string;
  @Column({ nullable: true, type: "int" }) edad: number;
  @Column({ nullable: true }) fecha_nacimiento: string;
  @Column({ nullable: true, type: "int" }) antiguedad: number;
  @Column({ nullable: true }) contacto: string;
  @Column({ nullable: true }) redes_sociales: string;
  @Column({ default: false }) discapacidad: boolean;
  @Column({ nullable: true }) tipo_discapacidad: string;
  @Column({ default: false }) inscrito_registro_discapacidad: boolean;
  @Column({ default: false }) parte_programas_municipales: boolean;
  @Column({ nullable: true }) descripcion_negocio: string;
  @Column({ default: false }) otro_ingreso: boolean;
  @Column({ nullable: true }) sector_economico: string;
  @Column({ default: false }) formalizado: boolean;
  @Column({ default: false }) autorizacion_sanitaria: boolean;
  @Column({ nullable: true }) productos: string;
  @Column({ default: false }) local_establecido: boolean;
  @Column({ nullable: true }) direccion_local: string;
  @Column({ default: false }) trabaja_solo: boolean;
  @Column({ default: false }) dificultad_fisica: boolean;
  @Column({ default: false }) dificultad_psicologica: boolean;
  @Column({ default: false }) pertenece_agrupacion: boolean;
  @Column({ nullable: true }) pdfUrl: string;

  @ManyToOne(() => Imagen, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  imagen: Imagen;
}
