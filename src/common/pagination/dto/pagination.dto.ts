import { IsInt, IsOptional, Min, IsString } from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { PaginationEnum } from '#common/pagination/enum/pagination.enum';
import { ApiProperty } from '@nestjs/swagger';
import { SortDirection } from '#common/pagination/type/sort.type';

interface DataItem {
  [key: string]: any;
}

export class PaginationDto<T extends DataItem> {
  @ApiProperty({ required: false, description: '페이지 번호', default: PaginationEnum.PAGE_DEFAULT })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be greater than or equal to 1' })
  public page?: number = PaginationEnum.PAGE_DEFAULT;

  @ApiProperty({ required: false, description: '개수', default: PaginationEnum.SIZE_DEFAULT })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'size must be an integer' })
  @Min(1, { message: 'size must be greater than or equal to 1' })
  public size?: number = PaginationEnum.SIZE_DEFAULT;

  @ApiProperty({
    required: false,
    description: '정렬 (컬럼:정렬기준(asc|desc))',
  })
  @Type(() => String)
  @IsOptional()
  @IsString({ message: 'sort must be a string' })
  public sort?: string = '';

  @IsOptional()
  public sortObj: Record<string, SortDirection> = {};

  public data?: T;

  constructor(partial: Partial<PaginationDto<T>>) {
    Object.assign(this, plainToInstance(PaginationDto, partial));
  }

  getSkip() {
    const page = this.page || PaginationEnum.PAGE_DEFAULT;
    const size = this.size || PaginationEnum.SIZE_DEFAULT;
    return (page - 1) * size;
  }

  toString(): string {
    return `
      PaginationDTO {
        page: ${this.page},
        size: ${this.size},
        sort: ${this.sort},
        sortObj: ${JSON.stringify(this.sortObj, null, 2)},
        data: ${JSON.stringify(this.data, null, 2)}
      }
    `;
  }
}
