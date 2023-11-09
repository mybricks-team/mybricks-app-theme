import { Injectable } from '@nestjs/common'
import axios from 'axios'
import API from '@mybricks/sdk-for-app/api'
import { Logger } from "@mybricks/rocker-commons";

@Injectable()
export default class Service {
  async publish({userId, fileId, json, title, req}) {

    await API.Material.createTheme({
      userId,
      namespace: `_theme_${fileId}`,
      themeConfig: json,
      title
    })

    Logger.info(`2-[发布主题包] 调用物料中心 theme/create接口成功`)

    try {
      await API.File.publish({
        userId,
        fileId,
        extName: 'theme',
        content: JSON.stringify(json)
      })

      Logger.info(`3-[发布主题包] 调用API.File.publish成功`)
    } catch (e) {
      Logger.info(`3-[发布主题包] 调用API.File.publish失败: ${e?.message || e}`)
    }

    return {
      code: 1,
      message: null
    }
  }
}

function getNextVersion(version, max = 100) {
  if (!version) return "1.0.0";
  const vAry = version.split(".");
  let carry = false;
  const isMaster = vAry.length === 3;
  if (!isMaster) {
    max = -1;
  }

  for (let i = vAry.length - 1; i >= 0; i--) {
    const res = Number(vAry[i]) + 1;
    if (i === 0) {
      vAry[i] = res;
    } else {
      if (res === max) {
        vAry[i] = 0;
        carry = true;
      } else {
        vAry[i] = res;
        carry = false;
      }
    }
    if (!carry) break;
  }

  return vAry.join(".");
}
