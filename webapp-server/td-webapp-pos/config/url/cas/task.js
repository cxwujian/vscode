import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryTaskTodoList = `${config.casHost}/${config.casReqType}/${config.casApp}/queryTaskTodoList`;
export const queryTaskMyApplyList = `${config.casHost}/${config.casReqType}/${config.casApp}/queryTaskMyApplyList`;
export const queryTaskMyFinishList = `${config.casHost}/${config.casReqType}/${config.casApp}/queryTaskMyFinishList`;
export const queryOne = `${config.casHost}/${config.casReqType}/${config.casApp}/task/queryDetail`;
export const updateAgree = `${config.casHost}/${config.casReqType}/${config.casApp}/task/updateAgree`;
export const updateReject = `${config.casHost}/${config.casReqType}/${config.casApp}/task/updateReject`;
export const queryAuditHis = `${config.casHost}/${config.casReqType}/${config.casApp}/task/queryAuditHis`;
