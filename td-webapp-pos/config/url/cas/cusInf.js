import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/customers`;
export const updateList = `${config.casHost}/${config.casReqType}/${config.casApp}/customers`;
export const queryCusCateList = `${config.casHost}/${config.casReqType}/${config.casApp}/customerCates`;
export const queryCusAdjustCateList = `${config.casHost}/${config.casReqType}/${config.casApp}/customerAdjustCates`;

