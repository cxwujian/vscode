import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/ccyFlgInfs`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/ccyFlgInf`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/ccyFlgInf`;

