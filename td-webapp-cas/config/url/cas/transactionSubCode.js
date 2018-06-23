import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/subCodes`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subCode`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subCode`;
export const deleteOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subCode/deleteOne`;
export const updateListStatus = `${config.casHost}/${config.casReqType}/${config.casApp}/subCodes/status`;
export const updateSubEntryId = `${config.casHost}/${config.casReqType}/${config.casApp}/subCode/entryId`;
export const updateSubExtCod = `${config.casHost}/${config.casReqType}/${config.casApp}/subCode/extCod`;
