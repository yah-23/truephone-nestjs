import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  message: string;

  @ManyToOne(() => File, (file) => file.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  file: File;

  @Column({ nullable: false })
  valid: boolean;
}
