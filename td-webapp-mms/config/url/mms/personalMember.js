import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/members`;
export const queryOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/member`;
export const updateOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/member`;
export const updateList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/members`;
export const addOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/member`;
