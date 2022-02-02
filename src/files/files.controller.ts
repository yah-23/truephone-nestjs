import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { CsvParsingInterceptor } from './csvParsing.interceptor';
import { MessageDTO } from './dto/message.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'), CsvParsingInterceptor)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Readable> {
    return await this.filesService.uploadFile(file);
  }

  @Post('save')
  async saveFile(
    @Body('file') file: CreateFileDto,
    @Body('data') data: MessageDTO[],
  ): Promise<File> {
    return this.filesService.save(file, data);
  }
}
