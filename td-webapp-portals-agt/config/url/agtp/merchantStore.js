import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/stores`;
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/store`;
export const updateOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/store`;
export const updateList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/stores`;
export const updateListStatus = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/stores/status`;
export const addOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/store`;
export const storeApply = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/storeApply`;
