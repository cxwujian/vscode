import config from '../../config.json';

const objectName = 'channel/merchant/scancode';
const objectNames = 'channel/merchants/scancode';
// 基本变量命名标准化、减少代码修改量
// query merchant list
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// update merchant info
export const updateOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// delete disabled merchants
export const deleteList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// add merchant
export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// enable or disable
export const updateList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/status`;
// merchant import
export const addBatchExcel = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/addExcel`;
