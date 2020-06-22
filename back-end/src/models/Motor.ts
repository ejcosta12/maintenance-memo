import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('motors')
class Motor {
  @PrimaryGeneratedColumn('uuid')
  uuId: string;

  @Column()
  numId: number;

  @Column()
  type: 'CA' | 'CC';

  @Column()
  power: number;

  @Column()
  localUnit: number;

  @Column()
  localArea: number;

  @CreateDateColumn()
  created_at: Date;
}

export default Motor;
