import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/openAccScene`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/openAccScene`;
export const deleteOne = `${config.casHost}/${config.casReqType}/${config.casApp}/openAccScene/deleteOne`;
export const updateListStatus = `${config.casHost}/${config.casReqType}/${config.casApp}/openAccScene/status`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/openAccScene`;
//export const querySubjectList = `${config.casHost}/${config.casReqType}/${config.casApp}/subjectCode`;

export const querySceneIdList = `${config.casHost}/${config.casReqType}/${config.casApp}/openAccScene/sceneId`;
export const queryCateIdList = `${config.casHost}/${config.casReqType}/${config.casApp}/openAccScene/cateId`;

