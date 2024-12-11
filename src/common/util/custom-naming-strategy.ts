import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(className: string, customName: string): string {
    return customName
      ? customName.toUpperCase()
      : snakeCase(className).toUpperCase();
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (customName ? customName : snakeCase(propertyName)).toUpperCase();
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName).toUpperCase();
  }
}
