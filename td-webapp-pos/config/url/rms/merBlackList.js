import config from '../../config.json';

const objectName = 'blackList/mer';
const objectNames = 'blackList/mers';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectNames}`;

export const addOne = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
export const deleteList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectNames}`;
export const updateListStatus = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectNames}/status`;
