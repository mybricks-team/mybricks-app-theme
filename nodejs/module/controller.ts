import {
  Req,
  Post,
  Body,
  Inject,
  Controller,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import Service from './service'

@Controller('api/theme')
export default class ThemeController {
  @Inject(Service)
  service: Service

  @Post('/publish')
  async publish(
    @Body('userId') userId: string,
    @Body('fileId') fileId: number,
    @Body('json') json: any,
    @Body('title') title: any,
    @Req() req: any
  ) {
    return await this.service.publish({userId, fileId, json, title, req})
  }
}
