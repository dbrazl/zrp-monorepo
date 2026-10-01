import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIdsPipe implements PipeTransform<string, string[]> {
  public transform(value: string): string[] {
    if (!/^\d+(,\d+)*$/.test(value)) {
      throw new BadRequestException(
        'Parameter must have the format "number,number,..."',
      );
    }

    return value.split(',').map((item) => item.trim());
  }
}
