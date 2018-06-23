import config from '../../config.json';

const objectMersName = 'merchants';
const objectNames = 'merchant/routers/scancode';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectMersName}`;
export const queryOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
