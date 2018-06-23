import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/amtCdeInfs`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/amtCdeInf`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/amtCdeInf`;
export const deleteOne = `${config.casHost}/${config.casReqType}/${config.casApp}/amtCdeInf/deleteOne`;
