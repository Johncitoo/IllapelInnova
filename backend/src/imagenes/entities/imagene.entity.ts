import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  url: string;
}
