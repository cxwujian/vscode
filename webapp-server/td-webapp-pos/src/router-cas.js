import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// set nprogress theme color style
const npColor = '#fff';
const bgStyle = `style="background:${npColor}"`;
const spStyle = `style="border-top-color:${npColor};border-left-color:${npColor}"`;
const pegStyle = `style="box-shadow:0 0 10px ${npColor}, 0 0 5px ${npColor}"`;
const temp = `<div class="bar" ${bgStyle} role="bar"><div class="peg" ${pegStyle}></div></div><div class="spinner" role="spinner"><div class="spinner-icon" ${spStyle}></div></div>`;
NProgress.configure({ template: temp });

const loadStart = () => {
  NProgress.inc();
}
const loadEnd = () => {
  NProgress.done();
}

// bas routers
const CusInfManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accManage/CusInfManage'));
    loadEnd();
  }, 'CusInfManage');
}
const SubAccCategoryManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accManage/SubAccCategoryManage'));
    loadEnd();
  }, 'SubAccCategoryManage');
}
const CasAccProfilesManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accManage/AccProfilesManage'));
    loadEnd();
  }, 'CasAccProfilesManage');
}
const AccManageInfManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accManage/AccManageInfManage'));
    loadEnd();
  }, 'AccManageInfManage');
}
const AccModeInfManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accManage/AccModeInfManage'));
    loadEnd();
  }, 'AccModeInfManage');
}
const TransBaseManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/transManage/TransBaseManage'));
    loadEnd();
  }, 'TransBaseManage');
}
const AccEntryRulesInfManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/transManage/AccEntryRulesInfManage'));
    loadEnd();
  }, 'AccEntryRulesInfManage');
}

const TransRelatedExtManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/transManage/TransRelatedExtManage'));
    loadEnd();
  }, 'TransRelatedExtManage');
}

const CcyFlgInfManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/transManage/CcyFlgInfManage'));
    loadEnd();
  }, 'CcyFlgInfManage');
}

const PayChnInfManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/transManage/PayChnInfManage'));
    loadEnd();
  }, 'PayChnInfManage');
}

const AmtCdeInfManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/transManage/AmtCdeInfManage'));
    loadEnd();
  }, 'AmtCdeInfManage');
}

//业务类别维护
const BusTypGroupManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/subjectManage/BusTypGroupManage'));
    loadEnd();
  }, 'BusTypGroupManage');
}

//科目代码维护
const SubjectCodeManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/subjectManage/SubjectCodeManage'));
    loadEnd();
  }, 'SubjectCodeManage');
}

//冻结
const AccFrozDetailManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accFrozManage/AccFrozDetailManage'));
    loadEnd();
  }, 'AccFrozDetailManage');
}

//开户管理-开户场景管理
const OpenAccSceneManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/openAccManage/OpenAccSceneManage'));
    loadEnd();
  }, 'OpenAccSceneManage');
}
//流水查询-账务流水查询
const CasTxnJnl = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/casJnlQry/CasTxnJnl'));
    loadEnd();
  }, 'CasTxnJnl');
}
//流水查询-账户流水查询
const CasBokAccJnl = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/casJnlQry/CasBokAccJnl'));
    loadEnd();
  }, 'CasBokAccJnl');
}
//流水查询-会计分录流水查询
const CasAccEntryJnl = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/casJnlQry/CasAccEntryJnl'));
    loadEnd();
  }, 'CasAccEntryJnl');
}
//流水查询-会计分录流水查询
const CasAccVoucherInf = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/casJnlQry/CasAccVoucherInf'));
    loadEnd();
  }, 'CasAccVoucherInf');
}
//账务调账-账务调账
const AccountAdjustmentManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accTreatment/AccountAdjustmentManage'));
    loadEnd();
  }, 'AccountAdjustmentManage');
}
//账务调账-账户充值
const AccountRechargeManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accTreatment/AccountRechargeManage'));
    loadEnd();
  }, 'AccountRechargeManage');
}

//账务调账-资金划转
const AccountFundsTransManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/accTreatment/AccountFundsTransManage'));
    loadEnd();
  }, 'AccountFundsTransManage');
}

//任务管理 子账户类别新增
const TaskSubAccCategoryAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/subAccCategory/TaskSubAccCategoryAddManage'));
    loadEnd();
  }, 'TaskSubAccCategoryAddManage');
}
//任务管理 子账户类别作废
const TaskSubAccCategoryDelManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/subAccCategory/TaskSubAccCategoryDelManage'));
    loadEnd();
  }, 'TaskSubAccCategoryDelManage');
}
//任务管理 账户开户
const TaskAccProfilesAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accProfiles/TaskAccProfilesAddManage'));
    loadEnd();
  }, 'TaskAccProfilesAddManage');
}
//任务管理 账户销户
const TaskAccProfilesDeleteManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accProfiles/TaskAccProfilesDeleteManage'));
    loadEnd();
  }, 'TaskAccProfilesDeleteManage');
}
//任务管理 账户解冻
const TaskAccProfilesUnfreezeManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accProfiles/TaskAccProfilesUnfreezeManage'));
    loadEnd();
  }, 'TaskAccProfilesUnfreezeManage');
}
//任务管理 账户充值
const TaskAccProfilesRechargeManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accProfiles/TaskAccProfilesRechargeManage'));
    loadEnd();
  }, 'TaskAccProfilesRechargeManage');
}
//任务管理 账户调账
const TaskAccProfilesAdjustmentManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accProfiles/TaskAccProfilesAdjustmentManage'));
    loadEnd();
  }, 'TaskAccProfilesAdjustmentManage');
}
//任务管理 资金划转
const TaskAccProfilesFundsTransManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accProfiles/TaskAccProfilesFundsTransManage'));
    loadEnd();
  }, 'TaskAccProfilesFundsTransManage');
}

//任务管理 账户冻结
const TaskAccProfilesFrozenManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accProfiles/TaskAccProfilesFrozenManage'));
    loadEnd();
  }, 'TaskAccProfilesFrozenManage');
}
//任务管理 业务类别新增
const TaskBusTypGroupAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/busTypGroup/TaskBusTypGroupAddManage'));
    loadEnd();
  }, 'TaskBusTypGroupAddManage');
}
//任务管理 业务类别作废
const TaskBusTypGroupDelManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/busTypGroup/TaskBusTypGroupDelManage'));
    loadEnd();
  }, 'TaskBusTypGroupDelManage');
}
//任务管理 业务类别启用
const TaskBusTypGroupEnableManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/busTypGroup/TaskBusTypGroupEnableManage'));
    loadEnd();
  }, 'TaskBusTypGroupEnableManage');
}
//任务管理 科目代码新增
const TaskSubCodeAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/subCode/TaskSubCodeAddManage'));
    loadEnd();
  }, 'TaskSubCodeAddManage');
}
//任务管理 科目代码作废
const TaskSubCodeDelManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/subCode/TaskSubCodeDelManage'));
    loadEnd();
  }, 'TaskSubCodeDelManage');
}
//任务管理 科目代码启用
const TaskSubCodeEnableManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/subCode/TaskSubCodeEnableManage'));
    loadEnd();
  }, 'TaskSubCodeEnableManage');
}
//任务管理 子账户类别新增
const TaskAccEntryRulesInfAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accEntryRulesInf/TaskAccEntryRulesInfAddManage'));
    loadEnd();
  }, 'TaskAccEntryRulesInfAddManage');
}
//任务管理 子账户类别修改
const TaskAccEntryRulesInfUpdateManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accEntryRulesInf/TaskAccEntryRulesInfUpdateManage'));
    loadEnd();
  }, 'TaskAccEntryRulesInfUpdateManage');
}
//任务管理 子账户类别删除
const TaskAccEntryRulesInfDeleteManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accEntryRulesInf/TaskAccEntryRulesInfDeleteManage'));
    loadEnd();
  }, 'TaskAccEntryRulesInfDeleteManage');
}
//任务管理 基础交易码新增
const TaskTxnCodeAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/txnCode/TaskTxnCodeAddManage'));
    loadEnd();
  }, 'TaskTxnCodeAddManage');
}
//任务管理 基础交易码新增
const TaskTxnCodeDeleteManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/txnCode/TaskTxnCodeDeleteManage'));
    loadEnd();
  }, 'TaskTxnCodeDeleteManage');
}
//任务管理 交易子码新增
const TaskTxnSubCodeAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/txnSubCode/TaskTxnSubCodeAddManage'));
    loadEnd();
  }, 'TaskTxnSubCodeAddManage');
}
//任务管理 交易子码删除
const TaskTxnSubCodeDeleteManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/txnSubCode/TaskTxnSubCodeDeleteManage'));
    loadEnd();
  }, 'TaskTxnSubCodeDeleteManage');
}
//任务管理 交易子码匹配会计分录
const TaskTxnSubCodeEntryIdManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/txnSubCode/TaskTxnSubCodeEntryIdManage'));
    loadEnd();
  }, 'TaskTxnSubCodeEntryIdManage');
}
//任务管理 交易子码匹配外部交易码
const TaskTxnSubCodeExtCodManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/txnSubCode/TaskTxnSubCodeExtCodManage'));
    loadEnd();
  }, 'TaskTxnSubCodeExtCodManage');
}
//任务管理 记账方式删除
const TaskAccModeInfDeleteManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accModeInf/TaskAccModeInfDeleteManage'));
    loadEnd();
  }, 'TaskAccModeInfDeleteManage');
}
//任务管理 账户记账新增
const TaskAccManageInfAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/accManageInf/TaskAccManageInfAddManage'));
    loadEnd();
  }, 'TaskAccManageInfAddManage');
}
//任务管理 开户场景新增
const TaskOpenAccSceneAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/openAccScene/TaskOpenAccSceneAddManage'));
    loadEnd();
  }, 'TaskOpenAccSceneAddManage');
}

//任务管理 开户场景删除
const TaskOpenAccSceneDelManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/openAccScene/TaskOpenAccSceneDelManage'));
    loadEnd();
  }, 'TaskOpenAccSceneDelManage');
}

//任务管理 开户场景修改
const TaskOpenAccSceneUpdManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/openAccScene/TaskOpenAccSceneUpdManage'));
    loadEnd();
  }, 'TaskOpenAccSceneUpdManage');
}
//任务管理 外部交易码新增
const TaskTransRelatedExtAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/transRelatedExt/TaskTransRelatedExtAddManage'));
    loadEnd();
  }, 'TaskTransRelatedExtAddManage');
}
//任务管理 外部交易码删除
const TaskTransRelatedExtDeleteManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/transRelatedExt/TaskTransRelatedExtDeleteManage'));
    loadEnd();
  }, 'TaskTransRelatedExtDeleteManage');
}
//任务管理 金额代码新增
const TaskAmtCdeInfAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/amtCdeInf/TaskAmtCdeInfAddManage'));
    loadEnd();
  }, 'TaskAmtCdeInfAddManage');
}
//任务管理 金额代码删除
const TaskAmtCdeInfDeleteManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/amtCdeInf/TaskAmtCdeInfDeleteManage'));
    loadEnd();
  }, 'TaskAmtCdeInfDeleteManage');
}
//任务管理 币种新增
const TaskCcyFlgInfAddManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/ccyFlgInf/TaskCcyFlgInfAddManage'));
    loadEnd();
  }, 'TaskCcyFlgInfAddManage');
}
//任务管理 币种修改
const TaskCcyFlgInfUpdateManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/taskManage/ccyFlgInf/TaskCcyFlgInfUpdateManage'));
    loadEnd();
  }, 'TaskCcyFlgInfUpdateManage');
}

// 科目余额表
const SubjectDayEndBalManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/calculateBalance/SubjectDayEndBalManage'));
    loadEnd();
  }, 'SubjectDayEndBalManage');
}
// 科目体系平衡
const SubjectBalanceManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/calculateBalance/SubjectBalanceManage'));
    loadEnd();
  }, 'SubjectBalanceManage');
}
// 账户余额核对
const AccDayEndBalManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/calculateBalance/AccDayEndBalManage'));
    loadEnd();
  }, 'AccDayEndBalManage');
}
// 账户总分核对
const AccountCheckManage = (location, callback) => {
  loadStart();
  require.ensure([], (require) => {
    callback(null, require('./routes/cas/calculateBalance/AccountCheckManage'));
    loadEnd();
  }, 'AccountCheckManage');
}

export function getCasRoutes(app, onEnter) {
  return [
    { path: '/cas/subjectManage/busTypGroupManage', getComponent: BusTypGroupManage, onEnter },
    { path: '/cas/subjectManage/subjectCodeManage', getComponent: SubjectCodeManage, onEnter },

    { path: '/cas/accManage/cusInfManage', getComponent: CusInfManage, onEnter },
    { path: '/cas/accManage/subAccCategoryManage', getComponent: SubAccCategoryManage, onEnter },
    { path: '/cas/accManage/accProfilesManage', getComponent: CasAccProfilesManage, onEnter },
    { path: '/cas/accManage/accManageInfManage', getComponent: AccManageInfManage, onEnter },
    { path: '/cas/accManage/accModeInfManage', getComponent: AccModeInfManage, onEnter },

    { path: '/cas/transManage/transBaseManage', getComponent: TransBaseManage, onEnter },
    { path: '/cas/transManage/accEntryRulesInfManage', getComponent: AccEntryRulesInfManage, onEnter },
    { path: '/cas/transManage/transRelatedExtManage', getComponent: TransRelatedExtManage, onEnter },
    { path: '/cas/transManage/ccyFlgInfManage', getComponent: CcyFlgInfManage, onEnter },
    { path: '/cas/transManage/amtCdeInfManage', getComponent: AmtCdeInfManage, onEnter },
    { path: '/cas/transManage/payChnInfManage', getComponent: PayChnInfManage, onEnter },

    { path: '/cas/accFrozManage/accFrozDetailManage', getComponent: AccFrozDetailManage, onEnter },

    { path: '/cas/openAccManage/openAccSceneManage', getComponent: OpenAccSceneManage, onEnter },

    { path: '/cas/casJnlQry/casTxnJnl', getComponent: CasTxnJnl, onEnter },
    { path: '/cas/casJnlQry/casBokAccJnl', getComponent: CasBokAccJnl, onEnter },
    { path: '/cas/casJnlQry/casAccEntryJnl', getComponent: CasAccEntryJnl, onEnter },
    { path: '/cas/casJnlQry/casAccVoucherInf', getComponent: CasAccVoucherInf, onEnter },

    { path: '/cas/accTreatment/accountAdjustmentManage', getComponent: AccountAdjustmentManage, onEnter },
    { path: '/cas/accTreatment/accountRechargeManage', getComponent: AccountRechargeManage, onEnter },
    { path: '/cas/accTreatment/accountFundsTransManage', getComponent: AccountFundsTransManage, onEnter },

    { path: '/cas/calculateBalance/subjectDayEndBalManage', getComponent: SubjectDayEndBalManage, onEnter },
    { path: '/cas/calculateBalance/subjectBalanceManage', getComponent: SubjectBalanceManage, onEnter },
    { path: '/cas/calculateBalance/accDayEndBalManage', getComponent: AccDayEndBalManage, onEnter },
    { path: '/cas/calculateBalance/accountCheckManage', getComponent: AccountCheckManage, onEnter },

    { path: '/cas/taskManage/taskSubAccCategoryAddManage', getComponent: TaskSubAccCategoryAddManage, onEnter },
    { path: '/cas/taskManage/taskSubAccCategoryDelManage', getComponent: TaskSubAccCategoryDelManage, onEnter },
    { path: '/cas/taskManage/taskAccProfilesAddManage', getComponent: TaskAccProfilesAddManage, onEnter },
    { path: '/cas/taskManage/taskAccProfilesDeleteManage', getComponent: TaskAccProfilesDeleteManage, onEnter },
    { path: '/cas/taskManage/taskAccProfilesUnfreezeManage', getComponent: TaskAccProfilesUnfreezeManage, onEnter },
    { path: '/cas/taskManage/taskAccProfilesRechargeManage', getComponent: TaskAccProfilesRechargeManage, onEnter },
    { path: '/cas/taskManage/taskAccProfilesAdjustmentManage', getComponent: TaskAccProfilesAdjustmentManage, onEnter },
    { path: '/cas/taskManage/taskAccProfilesFundsTransManage', getComponent: TaskAccProfilesFundsTransManage, onEnter },
    { path: '/cas/taskManage/taskAccProfilesFrozenManage', getComponent: TaskAccProfilesFrozenManage, onEnter },
    { path: '/cas/taskManage/taskBusTypGroupAddManage', getComponent: TaskBusTypGroupAddManage, onEnter },
    { path: '/cas/taskManage/taskBusTypGroupDelManage', getComponent: TaskBusTypGroupDelManage, onEnter },
    { path: '/cas/taskManage/taskBusTypGroupEnableManage', getComponent: TaskBusTypGroupEnableManage, onEnter },
    { path: '/cas/taskManage/taskSubCodeAddManage', getComponent: TaskSubCodeAddManage, onEnter },
    { path: '/cas/taskManage/taskSubCodeDelManage', getComponent: TaskSubCodeDelManage, onEnter },
    { path: '/cas/taskManage/taskSubCodeEnableManage', getComponent: TaskSubCodeEnableManage, onEnter },
    { path: '/cas/taskManage/taskAccEntryRulesInfAddManage', getComponent: TaskAccEntryRulesInfAddManage, onEnter },
    { path: '/cas/taskManage/taskAccEntryRulesInfUpdateManage', getComponent: TaskAccEntryRulesInfUpdateManage, onEnter },
    { path: '/cas/taskManage/taskAccEntryRulesInfDeleteManage', getComponent: TaskAccEntryRulesInfDeleteManage, onEnter },
    { path: '/cas/taskManage/taskTxnCodeAddManage', getComponent: TaskTxnCodeAddManage, onEnter },
    { path: '/cas/taskManage/taskTxnCodeDeleteManage', getComponent: TaskTxnCodeDeleteManage, onEnter },
    { path: '/cas/taskManage/taskTxnSubCodeAddManage', getComponent: TaskTxnSubCodeAddManage, onEnter },
    { path: '/cas/taskManage/taskTxnSubCodeDeleteManage', getComponent: TaskTxnSubCodeDeleteManage, onEnter },
    { path: '/cas/taskManage/taskTxnSubCodeEntryIdManage', getComponent: TaskTxnSubCodeEntryIdManage, onEnter },
    { path: '/cas/taskManage/taskTxnSubCodeExtCodManage', getComponent: TaskTxnSubCodeExtCodManage, onEnter },
    { path: '/cas/taskManage/taskAccModeInfDeleteManage', getComponent: TaskAccModeInfDeleteManage, onEnter },
    { path: '/cas/taskManage/taskAccManageInfAddManage', getComponent: TaskAccManageInfAddManage, onEnter },
    { path: '/cas/taskManage/taskOpenAccSceneAddManage', getComponent: TaskOpenAccSceneAddManage, onEnter },
    { path: '/cas/taskManage/taskOpenAccSceneDelManage', getComponent: TaskOpenAccSceneDelManage, onEnter },
    { path: '/cas/taskManage/taskOpenAccSceneUpdManage', getComponent: TaskOpenAccSceneUpdManage, onEnter },
    { path: '/cas/taskManage/taskTransRelatedExtAddManage', getComponent: TaskTransRelatedExtAddManage, onEnter },
    { path: '/cas/taskManage/taskTransRelatedExtDeleteManage', getComponent: TaskTransRelatedExtDeleteManage, onEnter },
    { path: '/cas/taskManage/taskAmtCdeInfAddManage', getComponent: TaskAmtCdeInfAddManage, onEnter },
    { path: '/cas/taskManage/taskAmtCdeInfDeleteManage', getComponent: TaskAmtCdeInfDeleteManage, onEnter },
    { path: '/cas/taskManage/taskCcyFlgInfAddManage', getComponent: TaskCcyFlgInfAddManage, onEnter },
    { path: '/cas/taskManage/taskCcyFlgInfUpdateManage', getComponent: TaskCcyFlgInfUpdateManage, onEnter },

  ];
}
