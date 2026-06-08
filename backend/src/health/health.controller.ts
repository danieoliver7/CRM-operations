import { Controller, Get } from '@nestjs/common';
import { HEALTH_RESPONSE } from './health.response';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return HEALTH_RESPONSE;
  }
}
