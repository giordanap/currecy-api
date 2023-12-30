import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'currency' })
export class Currency {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rate: number;

  @Column()
  origin_currency: string;

  @Column()
  target_currency: string;
}
