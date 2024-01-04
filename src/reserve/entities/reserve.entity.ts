import { IsNumber, IsString } from 'class-validator';
import { History } from 'src/history/entities/history.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'reserve',
})
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  title: string;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  theater: string;

  @IsString()
  @Column('varchar', { length: 100, nullable: false })
  date_time: string;
  
  @IsNumber()
  @Column('decimal')
  total_price: number;

  @IsNumber()
  @Column('decimal')
  quantity: number;

  @IsNumber()
  @Column()
  user_id: number;

  @IsNumber()
  @Column()
  show_id: number;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  @OneToMany(() => History, (history) => history.reserve)
  history: History[];
  
  @ManyToOne(() => User, (user) => user.reserve)
  user: User;

  @ManyToOne(() => Show, show => show.reserve)
  show: Show;

  @ManyToOne(() => Seat, (seat) => seat.reserve)
  seat: Seat;

}
