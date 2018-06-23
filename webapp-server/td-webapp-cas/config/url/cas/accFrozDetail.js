import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/accFrozDetails`;
export const queryAllList = `${config.casHost}/${config.casReqType}/${config.casApp}/accFrozDetails/export`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/accFrozDetail`;
export const queryHandleList = `${config.casHost}/${config.casReqType}/${config.casApp}/accFrozHandleInfs`;
export const updateHandleOne = `${config.casHost}/${config.casReqType}/${config.casApp}/accFrozHandleInf`;
