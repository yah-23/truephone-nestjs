import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Readable } from 'stream';
import { MessageDTO } from './dto/message.dto';
import { Message } from './entities/message.entity';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<Readable> {
    return Readable.from(file.buffer.toString());
  }

  async save(file: CreateFileDto, data: MessageDTO[]): Promise<File> {
    const { path } = file;

    const fileCreated = this.fileRepository.create({
      name: path,
      date: new Date(),
    });
    const messages = this.messageRepository.create(data);
    fileCreated['messages'] = await this.messageRepository.save(messages);

    return this.fileRepository.save(fileCreated);
  }
}
