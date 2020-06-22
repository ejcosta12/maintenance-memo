import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Motor from './Motor';

@Entity('maintenances')
class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  uuId: string;

  @Column()
  motor_uuid: string;

  @ManyToOne(() => Motor)
  @JoinColumn({ name: 'motor_uuid' })
  motor: Motor

  @Column()
  resistance30s: number;

  @Column()
  resistance60s: number;

  @Column()
  resistance10m: number;

  @Column()
  valueIP: number;

  @Column()
  valueIA: number;

  @Column()
  commentary: string

  @CreateDateColumn()
  created_at: Date;
}

export default Maintenance;
