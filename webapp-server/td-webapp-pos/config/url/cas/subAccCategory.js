import config from '../../config.json';

const objectName = 'subAccCategoryInf';
const objectNames = 'subAccCategoryInfs';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectNames}`;
export const addOne = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}`;
export const updateOne = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}`;
export const deleteOne = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}`;
export const accOfCates = `${config.casHost}/${config.casReqType}/${config.casApp}/${objectName}/accOfCates`;

