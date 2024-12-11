import moment from 'moment-timezone';

/**
 * 현재 년월일시간 조회
 * @returns string
 */
export function getYearMonthDateTime(): string {
  const kstTime = moment().tz('Asia/Seoul');
  return kstTime.format('YYYYMMDDHHmm');
}

/**
 * 현재 년월일 조회
 * @returns string
 */
export function getYearMonthDate(): string {
  const kstTime = moment().tz('Asia/Seoul');
  return kstTime.format('YYYYMMDD');
}
