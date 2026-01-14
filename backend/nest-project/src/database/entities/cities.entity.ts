import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  cityName: string;

  @Column({nullable: false})
  cityNameAr: string;
}
