const xcpt = {
  SHCODE: 'shCode',
};

export function snakeToCamelObject(item: object) {
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => {
      return [snakeToCamel(key), value];
    }),
  );
}

export function snakeToCamel(snakeCase: string): string {
  if (snakeCase in xcpt) {
    return xcpt[snakeCase];
  }
  return snakeCase
    .toLowerCase()
    .split('_')
    .map((word, index) => {
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

/**
 * 객체 NULL값 제외(DB 업데이트시 사용)
 * @param obj
 * @returns
 */
export function removeNullFieldsFromObject<T extends Record<string, any>>(
  obj: T,
): { [K in keyof T]: T[K] } {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined,
    ),
  ) as { [K in keyof T]: T[K] };
}
