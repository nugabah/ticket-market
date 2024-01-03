import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { Reserve } from 'src/reserve/entities/reserve.entity';
import { User } from 'src/users/entities/user.entity';
import { History } from 'src/history/entities/history.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seat } from 'src/seats/entities/seat.entity';

@Entity({
  name: 'show',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  title: string;

  @IsString()
  @Column('varchar', { length: 100, nullable: false })
  description: string;

  @IsArray()
  @Column({ type: 'json' })
  date_time: string[];

  @IsString()
  @Column('varchar', { length: 255, nullable: false })
  image: string;

  @IsNumber()
  @Column('decimal', { default: 30000 })
  price: number;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  theater: string;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  category: string;

  @IsArray()
  @Column({ type: 'json' })
  seat_number: number[];

  @IsArray()
  @Column({ type: 'json' })
  reservation: Boolean[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.show)
  user: User;

  @OneToMany(() => Reserve, (reserve) => reserve.show)
  reserve: Reserve[];

  @OneToMany(() => Seat, (seat) => seat.show)
  seat: Seat[];
}
