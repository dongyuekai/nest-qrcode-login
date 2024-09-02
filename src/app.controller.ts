import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('qrcode/generate')
  async generate() {
    // 用node的crypto模块生成一个随机的uuid
    const uuid = randomUUID();
    const dataUrl = await qrcode.toDataURL(uuid);
    return {
      qrcode_id: uuid,
      img: dataUrl,
    };
  }
}
