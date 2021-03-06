import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/entryRules`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/entryRule`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/entryRule/updateOne`;
export const deleteOne = `${config.casHost}/${config.casReqType}/${config.casApp}/entryRule/deleteOne`;
export const updateListStatus = `${config.casHost}/${config.casReqType}/${config.casApp}/entryRules`;
