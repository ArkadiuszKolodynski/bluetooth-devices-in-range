import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Device {
  @PrimaryColumn()
  uuid: string;
  @Column()
  name: string;
  @Exclude()
  @Column({ nullable: true })
  subscriptionUrl: string;
}
