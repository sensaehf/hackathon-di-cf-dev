import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('Tax Return Backend')
  .setDescription(
    'Backend for Tax Return Form - Hackathon project',
  )
  .setVersion('1.0')
  .addTag('taxreturn')
  .build()
