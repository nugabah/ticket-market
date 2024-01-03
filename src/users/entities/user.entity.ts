import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Reserve } from 'src/reserve/entities/reserve.entity';
import { Show } from 'src/show/entities/show.entity';
import { History } from 'src/history/entities/history.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  nickname: string;

  @IsString()
  @Column('varchar', { unique: true, length: 20, nullable: false })
  email: string;

  @IsString()
  @Column('varchar', { select: false, nullable: false })
  password: string;

  @IsNumber()
  @Column('decimal', { precision: 10, scale: 2, default: 1000000 })
  wallet: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @IsBoolean()
  @Column({ default: false })
  is_admin: Boolean;

  @OneToMany(() => Reserve, (reserve) => reserve.user)
  reserve: Reserve[];

  @OneToMany(() => History, (history) => history.user)
  history: History[];

  @OneToMany(() => Show, (show) => show.user)
  show: Show[];
}
