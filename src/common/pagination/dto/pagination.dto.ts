import { IsInt, IsOptional, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationEnum } from '#common/pagination/enum/pagination.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T = any> {
  @ApiProperty({ required: false, description: '페이지 번호', default: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be greater than or equal to 1' })
  public page?: number = PaginationEnum.PAGE_DEFAULT;

  @ApiProperty({ required: false, description: '페이지 크기', default: 50 })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'take must be an integer' })
  @Min(1, { message: 'take must be greater than or equal to 1' })
  public size?: number = PaginationEnum.SIZE_DEFAULT;

  @ApiProperty({
    required: false,
    description: '정렬 (컬럼:정렬기준(asc|desc))',
  })
  @Type(() => String)
  @IsOptional()
  @IsString({ message: 'sort must be an string' })
  public sort?: string = '';

  @IsOptional()
  public sortObj: object = null;

  public data?: T;

  constructor(partial: Partial<PaginationDto<T>>) {
    Object.assign(this, partial);
  }

  getSkip() {
    return (this.page - 1) * this.size || PaginationEnum.SIZE_DEFAULT;
  }

  getPage() {
    return this.page;
  }

  getSize() {
    return this.size;
  }

  getSort() {
    return this.sort;
  }

  toString(): string {
    return `
      PaginationDTO [ page = ${this.page}, size = ${this.size}, sort = ${this.sort}, sortObj= ${JSON.stringify(this.sortObj)}, data = ${JSON.stringify(this.data)} ]
    `;
  }
}
