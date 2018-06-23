import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.basHost}/${config.basApp}/${config.basReqType}/expOrd`;
export const queryFaultTerInfo = `${config.basHost}/${config.basApp}/${config.basReqType}/terFault`;
export const queryLackTerInfo = `${config.basHost}/${config.basApp}/${config.basReqType}/terLack`;

export const queryExpOrdInfo = `${config.bmsHost}/${config.bmsApp}/${config.bmsReqType}/expOrd`;
export const queryFaultTerInfo = `${config.bmsHost}/${config.bmsApp}/${config.bmsReqType}/terFault`;
export const queryLackTerInfo = `${config.bmsHost}/${config.bmsApp}/${config.bmsReqType}/terLack`;

export const queryExpOrdInfo = `${config.casHost}/${config.casApp}/${config.casReqType}/expOrd`;
export const queryFaultTerInfo = `${config.casHost}/${config.casApp}/${config.casReqType}/terFault`;
export const queryLackTerInfo = `${config.casHost}/${config.casApp}/${config.casReqType}/terLack`;

export const queryExpOrdInfo = `${config.omsHost}/${config.omsApp}/${config.omsReqType}/expOrd`;
export const queryFaultTerInfo = `${config.omsHost}/${config.omsApp}/${config.omsReqType}/terFault`;
export const queryLackTerInfo = `${config.omsHost}/${config.omsApp}/${config.omsReqType}/terLack`;

// url of get home graphic data
export const queryCheckCount = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/count/check`;
export const querySettleCount = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/count/settle`;
export const queryShareCount = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/count/share`;



