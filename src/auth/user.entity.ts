import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({unique: true})
    username: string;
    
    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;
  }
  