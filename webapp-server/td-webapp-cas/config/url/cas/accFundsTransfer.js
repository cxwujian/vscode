import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const qryFundsTransInfo = `${config.casHost}/${config.casReqType}/${config.casApp}/qryFundsTransInfo`;

export const accountFundsTrans = `${config.casHost}/${config.casReqType}/${config.casApp}/accountFundsTrans`;
