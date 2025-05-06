import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('Tax Return Backend')
  .setDescription(
    'Backend for Tax Return Form - Hackathon project',
  )
  .addGlobalParameters({
    in: 'header',
    required: false,
    name: 'X-Query-National-Id',
    schema: {
      example: '12345-567',
    },
  })
  .setVersion('1.0')
  .build()
