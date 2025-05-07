import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('API for Þjóðskrá (National Registry)')
  .setDescription(
    'The national registry',
  ) 
  .setVersion('1.0')
  .build()
