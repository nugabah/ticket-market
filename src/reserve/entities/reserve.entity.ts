import { IsNumber, IsString } from 'class-validator';
import { History } from 'src/history/entities/history.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => History, (history) => history.reserve)
  history: History[];
  
  @ManyToOne(() => User, (user) => user.reserve)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Show, show => show.reserve)
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id' })
  show: Show;

  @ManyToOne(() => Seat, (seat) => seat.reserve)
  seat: Seat;

}
