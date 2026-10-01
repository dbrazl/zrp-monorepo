import { ParseIdsPipe } from '@/infrastructure/http/pipes/parse-ids.pipe.js';
import { BadRequestException } from '@nestjs/common';

describe('ParseIdsPipe', () => {
  let pipe: ParseIdsPipe;

  beforeEach(() => {
    pipe = new ParseIdsPipe();
  });

  describe('transform', () => {
    it('should return a single id', () => {
      // Act
      const result = pipe.transform('1');

      // Assert
      expect(result).toEqual(['1']);
    });

    it('should return multiple comma-separated ids', () => {
      // Act
      const result = pipe.transform('1,2,345');

      // Assert
      expect(result).toEqual(['1', '2', '345']);
    });

    it('should preserve leading zeros', () => {
      // Act
      const result = pipe.transform('001,02');

      // Assert
      expect(result).toEqual(['001', '02']);
    });

    it.each([
      ['', 'an empty value'],
      ['1,', 'a trailing comma'],
      [',1', 'a leading comma'],
      ['1,,2', 'an empty id'],
      ['1, 2', 'whitespace'],
      ['1,a', 'a non-numeric id'],
      ['-1,2', 'a negative id'],
      ['1.5,2', 'a decimal id'],
    ])('should throw a BadRequestException for %s (%s)', (value) => {
      // Act
      const act = (): string[] => pipe.transform(value);

      // Assert
      expect(act).toThrow(
        new BadRequestException(
          'Parameter must have the format "number,number,..."',
        ),
      );
    });
  });
});
