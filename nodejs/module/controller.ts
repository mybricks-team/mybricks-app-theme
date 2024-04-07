import {
  Req,
  Post,
  Body,
  Inject,
  Controller,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { Logger } from "@mybricks/rocker-commons";

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
    Logger.info(`0-[发布主题包] ${userId} - ${fileId} - ${title}`)
    return await this.service.publish({userId, fileId, json, title, req})
  }

  @Post("/searchUser")
  async searchUser(
    @Body("keyword") keyword: string,
  ) {
    return await this.service.searchUser({ keyword });
  }
}
