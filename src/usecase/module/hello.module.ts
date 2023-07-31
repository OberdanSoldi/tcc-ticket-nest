import { Module } from '@nestjs/common';
import { HelloController } from '../../adapter/controller/hello.controller';
import { HelloService } from '../service/hello.service';
import { HelloRepository } from '../../adapter/repository/hello.repository';
import { HelloConverter } from '../converter/hello.converter';
import { DatabaseClient } from '../../adapter/repository/DatabaseClient';

@Module({
  controllers: [HelloController],
  providers: [HelloService, HelloRepository, HelloConverter, DatabaseClient],
})
export class HelloModule {}
