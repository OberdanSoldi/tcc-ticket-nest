import { Module } from '@nestjs/common';
import { HelloModule } from './hello.module';

@Module({
  imports: [HelloModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
