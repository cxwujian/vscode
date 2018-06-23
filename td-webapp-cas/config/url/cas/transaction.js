import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/transBase`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/transBase/txnCode`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/transBase`;
export const querySubList = `${config.casHost}/${config.casReqType}/${config.casApp}/subCods`;
export const deleteOne = `${config.casHost}/${config.casReqType}/${config.casApp}/transBase/deleteOne`;
export const queryAllList = `${config.casHost}/${config.casReqType}/${config.casApp}/transBase/queryAllList`;
