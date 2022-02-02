import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModule } from './config/configModule.config';
import { MulterConfigService } from './config/multerConfigService.config';
import { typeOrmConfig } from './config/typeOrmConfig.config';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: typeOrmConfig,
    }),
    configModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
