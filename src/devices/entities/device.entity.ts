import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Device {
  @PrimaryColumn()
  uuid: string;
  @Column()
  name: string;
}
