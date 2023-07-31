import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../../usecase/service/hello.service';

@Controller('hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Get()
  getAll() {
    return this.helloService.getAll();
  }
}
