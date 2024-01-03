import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Reserve } from 'src/reserve/entities/reserve.entity';
import { Show } from 'src/show/entities/show.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'seat',
})
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  theater: string;

  @IsNumber()
  @Column('decimal', { default: 100 })
  seat_number: number;

  @IsBoolean()
  @Column({ default: true })
  reservation: Boolean;
  
  @ManyToOne(() => Show, show => show.seat)
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id' })
  show: Show;
  
  @OneToMany(() => Reserve, (reserve) => reserve.seat)
  reserve: Reserve[];
}
