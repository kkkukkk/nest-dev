import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { PaginationEnum } from '#common/pagination/enum/pagination.enum';
import { PaginationDto } from '#common/pagination/dto/pagination.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Logger } from '@nestjs/common';

export const GetPagination = <T extends object>(classRef: new () => T) =>
  createParamDecorator(
    async (
      _data: unknown,
      ctx: ExecutionContext,
    ): Promise<PaginationDto<T>> => {
      const logger = new Logger(GetPagination.name);
      const request = ctx.switchToHttp().getRequest();
      const page = Number(request.query?.page) || PaginationEnum.PAGE_DEFAULT;
      const size = Number(request.query?.size) || PaginationEnum.SIZE_DEFAULT;
      const sort = request.query?.sort || '';
      const sortObj = sort
        .split(',')
        .reduce((acc: Record<string, string>, key: string) => {
          const [k, v] = key.split(':');
          acc[k] = v;
          return acc;
        }, {});

      logger.log(Object.entries(sortObj));
      const classProperties = plainToClass(classRef, {});
      logger.log(Object.entries(classProperties));
      const searchParams = Object.keys(request.body).reduce((acc, key) => {
        console.log(`key : ${key}`);
        if (key !== 'page' && key !== 'size' && key in classProperties) {
          console.log('들어옴');
          acc[key] = request.body[key] || null;
          console.log(`key2 : ${key}`);
        }
        return acc;
      }, {});
      const queryParams = Object.keys(request.query).reduce((acc, key) => {
        if (key !== 'page' && key !== 'size' && key in classProperties) {
          acc[key] = request.query[key] || null;
        }
        return acc;
      }, {});

      logger.log(Object.entries(queryParams));

      const dtoInstance = plainToClass(classRef, {
        ...searchParams,
        ...queryParams,
      });

      logger.log(Object.entries(dtoInstance));

      // DTO 유효성 검사
      const errors = await validate(dtoInstance);
      if (errors.length > 0) {
        throw new BadRequestException('Validation failed');
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
