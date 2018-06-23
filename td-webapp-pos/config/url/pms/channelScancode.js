import config from '../../config.json';

const objectName = 'channel/scancode';
const objectNames = 'channels/scancode';
// 基本变量命名标准化、减少代码修改量
// add channel info
export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// query channel list
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// update channel info
export const updateOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// delete disabled channel list
export const deleteList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// enable or disable
export const updateListStatus = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/status`;
// query channel select list
export const querySelect = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/select`;
