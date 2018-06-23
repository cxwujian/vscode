import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.casHost}/${config.casApp}/${config.casReqType}/expOrd`;
export const queryFaultTerInfo = `${config.casHost}/${config.casApp}/${config.casReqType}/terFault`;
export const queryLackTerInfo = `${config.casHost}/${config.casApp}/${config.casReqType}/terLack`;
