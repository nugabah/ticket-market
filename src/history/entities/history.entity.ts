import { IsNumber } from 'class-validator';
import { Reserve } from 'src/reserve/entities/reserve.entity';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'history',
})
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @IsNumber()
  @Column('decimal', { precision: 10, scale: 2 })
  deposit: number;

  @IsNumber()
  @Column('decimal', { precision: 10, scale: 2 })
  withdraw: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @IsNumber()
  @Column()
  user_id: number;

  @IsNumber()
  @Column()
  reserve_id: number;
  
  @ManyToOne(() => User, (user) => user.history)
  user: User;

  @ManyToOne(() => Reserve, (reserve) => reserve.history)
  reserve: Reserve;

}
