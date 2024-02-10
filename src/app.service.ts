import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): any {
    return {
      message: 'Alive and Kickin!',
    };
  }
}
