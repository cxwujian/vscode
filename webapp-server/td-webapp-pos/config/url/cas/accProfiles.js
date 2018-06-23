import config from '../../config.json';

const objectName = 'accProfiles';
const objectNames = 'accProfiless';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectNames}`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}`;
export const updateListStatus = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectNames}/status`;
export const frozenOne = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}/frozen`;
export const subAccProfiles = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}/subAccProfiles`;
export const deleteOne = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}`;
export const updateOneState = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}/updateOneState`;
export const queryCateOfAcc = `${config.casHost}/${config.casReqType}/${config.casApp}/cateOfAcc`;
