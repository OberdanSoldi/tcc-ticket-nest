import { Injectable } from '@nestjs/common';
import { HelloRepository } from '../../adapter/repository/hello.repository';

@Injectable()
export class HelloService {
  constructor(private helloRepository: HelloRepository) {}

  getAll() {
    return this.helloRepository.getAll();
  }
}
