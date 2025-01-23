import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { PaginationEnum } from '#common/pagination/enum/pagination.enum';
import { PaginationDto } from '#common/pagination/dto/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SortDirection } from '#common/pagination/type/sort.type';

interface DataItem {
  [key: string]: any;
}

const extractParams = (
  source: Record<string, any>,
  classProperties: Record<string, any>,
): Record<string, any> =>
  Object.keys(source).reduce((acc, key) => {
    if (key !== 'page' && key !== 'size' && key in classProperties) {
      acc[key] = source[key] || null;
    }
    return acc;
  }, {});

export const GetPagination = <T extends DataItem>(classRef: new () => T) =>
  createParamDecorator(
    async (
      _data: unknown,
      ctx: ExecutionContext,
    ): Promise<PaginationDto<T>> => {
      const request = ctx.switchToHttp().getRequest();
      const page = Number(request.query?.page) || PaginationEnum.PAGE_DEFAULT;
      const size = Number(request.query?.size) || PaginationEnum.SIZE_DEFAULT;
      // 요청사항
      const sort = request.query?.sort || '';
      const sortObj = parseSortQuery(sort);

      // 파라미터 처리
      const classProperties = plainToInstance(classRef, {});
      const searchParams = extractParams(request.body, classProperties);
      const queryParams = extractParams(request.query, classProperties);

      const dtoInstance = plainToInstance(classRef, {
        ...searchParams,
        ...queryParams,
      });

      // DTO 유효성 검사
      const errors = await validate(dtoInstance);
      if (errors.length > 0) {
        throw new BadRequestException(
          errors.map((err) => Object.values(err.constraints || {})).join(', '),
        );
      }

      return new PaginationDto<T>({
        page,
        size,
        sort,
        sortObj,
        data: dtoInstance,
      });
    },
  )();

function parseSortQuery(sort: string): Record<string, SortDirection> {
  let sortObj: Record<string, SortDirection> = {};
  if (sort) {
    sortObj = sort
      .split(',')
      .reduce((acc: Record<string, SortDirection>, key: string) => {
        const [k, v] = key.split(':');
        if (!k || !v) {
          throw new BadRequestException(`Invalid sort format: ${key}`);
        }

        const direction = v.toUpperCase();
        if (direction !== 'ASC' && direction !== 'DESC') {
          throw new BadRequestException(`Invalid sort direction: ${v}`);
        }

        acc[k] = direction as SortDirection;
        return acc;
      }, {});
  }
  return sortObj;
}