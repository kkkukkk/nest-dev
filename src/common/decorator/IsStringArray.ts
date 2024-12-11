import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IsStringArray =
  (validationOptions?: ValidationOptions) =>
  (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'IsStringArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.every((item) => typeof item === 'string')
          );
        },
        defaultMessage(args: ValidationArguments) {
          return (validationOptions?.message ??
            `${args.property} must be an array of strings`) as string;
        },
      },
    });
  };
