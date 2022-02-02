import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { CsvParsingInterceptor } from './csvParsing.interceptor';
import { Message } from './entities/message.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService, CsvParsingInterceptor],
  imports: [TypeOrmModule.forFeature([File, Message])],
})
export class FilesModule {}
