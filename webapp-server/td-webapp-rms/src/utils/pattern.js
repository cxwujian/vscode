/**
 * 标准金额
 */
export const AMT = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

/**
 * 百分比(小于等于100%)
 */
export const PERCENT = /^100$|^[1,9]\d(\.\d{1,3})?$|^\d(\.\d{1,3})?$/;

/**
 * 笔数(整数)
 */
export const COUNT = /^[0-9]*[0-9][0-9]*$/;