import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NationalIdFormatPipe implements PipeTransform {
  transform(value: string): string {
    const regex = /^\d{6}-\d{4}$/;

    if (!regex.test(value)) {
      throw new BadRequestException(
        'X-Query-National-Id must be in the format XXXXXX-XXXX',
      );
    }

    return value;
  }
}
