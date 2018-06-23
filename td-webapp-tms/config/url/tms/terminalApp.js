import config from '../../config.json';

const objectName = 'terminal/app';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const updateOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const deleteList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const addOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const upload = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/upload`;
