import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../../usecase/service/hello.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../usecase/decorators/auth.decorator';

@ApiTags('hello')
@Controller('hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Public()
  @Get()
  getAll() {
    return this.helloService.getAll();
  }
}
