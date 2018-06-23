import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/busTypGroup`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/busTypGroup`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/busTypGroup`;
//export const updateStatus = `${config.casHost}/${config.casReqType}/${config.casApp}/busTypGroup`;
export const queryBusIdList = `${config.casHost}/${config.casReqType}/${config.casApp}/busTypGroup/busIds`;
export const queryBusIdSubList = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode/busIdSub`;
export const disableOne = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode/disableOne`;
export const cancelBusId = `${config.casHost}/${config.casReqType}/${config.casApp}/busTypGroup/canBusId`;
export const enableOne = `${config.casHost}/${config.casReqType}/${config.casApp}/busTypGroup/enableOne`;
