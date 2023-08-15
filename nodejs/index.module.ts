import { Module } from '@nestjs/common'

import ThemeModule from './module/module'

@Module({
	imports: [ThemeModule]
})

export default class IndexModule {}
