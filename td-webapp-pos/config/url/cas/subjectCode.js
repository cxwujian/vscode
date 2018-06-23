import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode`;
export const queryOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode/queryOne`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode`;
//export const updateStatus = `${config.casHost}/${config.casReqType}/${config.casApp}/subject`;
export const disableOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode/disableOne`;
export const queryBusIdList = `${config.casHost}/${config.casReqType}/${config.casApp}/busTypGroup/busIds`;
export const enableOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode/enableOne`;

