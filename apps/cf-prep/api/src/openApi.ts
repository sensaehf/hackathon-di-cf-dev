import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('X-Functional Prep Project')
  .setDescription(
    `
  This is the spec for the X-functional team's hackathon preparation API
`,
  )
  .setVersion('1.0')
  .build()
