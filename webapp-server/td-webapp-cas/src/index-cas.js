export function addCasModel(app) {
  app.model(require('./models/cas/subjectManage/busTypGroupManage'));
  app.model(require('./models/cas/subjectManage/subjectCodeManage'));

  app.model(require('./models/cas/accManage/cusInfManage'));
  app.model(require('./models/cas/accManage/subAccCategoryManage'));
  app.model(require('./models/cas/accManage/accProfilesManage'));
  app.model(require('./models/cas/accManage/accManageInfManage'));
  app.model(require('./models/cas/accManage/accModeInfManage'));
  app.model(require('./models/cas/transManage/transBase'));
  app.model(require('./models/cas/transManage/accEntryRulesInfManage'));
  app.model(require('./models/cas/transManage/transRelatedExtManage'));
  app.model(require('./models/cas/transManage/ccyFlgInfManage'));
  app.model(require('./models/cas/transManage/amtCdeInfManage'));
  app.model(require('./models/cas/transManage/payChnInfManage'));

  app.model(require('./models/cas/accFrozManage/accFrozDetailManage'));
  app.model(require('./models/cas/openAccManage/openAccSceneManage'));
  app.model(require('./models/cas/accTreatment/accountAdjustmentManage'));
  app.model(require('./models/cas/accTreatment/accountRechargeManage'));
  app.model(require('./models/cas/accTreatment/accountFundsTransManage'));

  app.model(require('./models/cas/taskManage/subAccCategory/taskSubAccCategoryAddManage'));
  app.model(require('./models/cas/taskManage/subAccCategory/taskSubAccCategoryDelManage'));
  app.model(require('./models/cas/taskManage/accProfiles/taskAccProfilesAddManage'));
  app.model(require('./models/cas/taskManage/accProfiles/taskAccProfilesDeleteManage'));
  app.model(require('./models/cas/taskManage/accProfiles/taskAccProfilesUnfreezeManage'));
  app.model(require('./models/cas/taskManage/accProfiles/taskAccProfilesRechargeManage'));
  app.model(require('./models/cas/taskManage/accProfiles/taskAccProfilesAdjustmentManage'));
  app.model(require('./models/cas/taskManage/accProfiles/taskAccProfilesFrozenManage'));
  app.model(require('./models/cas/taskManage/accProfiles/taskAccProfilesFundsTransManage'));

  app.model(require('./models/cas/taskManage/busTypGroup/taskBusTypGroupAddManage'));
  app.model(require('./models/cas/taskManage/busTypGroup/taskBusTypGroupDelManage'));
  app.model(require('./models/cas/taskManage/busTypGroup/taskBusTypGroupEnableManage'));
  app.model(require('./models/cas/taskManage/subCode/taskSubCodeAddManage'));
  app.model(require('./models/cas/taskManage/subCode/taskSubCodeDelManage'));
  app.model(require('./models/cas/taskManage/subCode/taskSubCodeEnableManage'));
  app.model(require('./models/cas/taskManage/accEntryRulesInf/taskAccEntryRulesInfAddManage'));
  app.model(require('./models/cas/taskManage/accEntryRulesInf/taskAccEntryRulesInfUpdateManage'));
  app.model(require('./models/cas/taskManage/accEntryRulesInf/taskAccEntryRulesInfDeleteManage'));
  app.model(require('./models/cas/taskManage/txnCode/taskTxnCodeAddManage'));
  app.model(require('./models/cas/taskManage/txnCode/taskTxnCodeDeleteManage'));
  app.model(require('./models/cas/taskManage/txnSubCode/taskTxnSubCodeAddManage'));
  app.model(require('./models/cas/taskManage/txnSubCode/taskTxnSubCodeDeleteManage'));
  app.model(require('./models/cas/taskManage/txnSubCode/taskTxnSubCodeEntryIdManage'));
  app.model(require('./models/cas/taskManage/txnSubCode/taskTxnSubCodeExtCodManage'));
  app.model(require('./models/cas/taskManage/accModeInf/taskAccModeInfDeleteManage'));
  app.model(require('./models/cas/taskManage/accManageInf/taskAccManageInfAddManage'));
  app.model(require('./models/cas/taskManage/openAccScene/taskOpenAccSceneAddManage'));
  app.model(require('./models/cas/taskManage/openAccScene/taskOpenAccSceneDelManage'));
  app.model(require('./models/cas/taskManage/openAccScene/taskOpenAccSceneUpdManage'));
  app.model(require('./models/cas/taskManage/transRelatedExt/taskTransRelatedExtAddManage'));
  app.model(require('./models/cas/taskManage/transRelatedExt/taskTransRelatedExtDeleteManage'));
  app.model(require('./models/cas/taskManage/amtCdeInf/taskAmtCdeInfAddManage'));
  app.model(require('./models/cas/taskManage/amtCdeInf/taskAmtCdeInfDeleteManage'));
  app.model(require('./models/cas/taskManage/ccyFlgInf/taskCcyFlgInfAddManage'));
  app.model(require('./models/cas/taskManage/ccyFlgInf/taskCcyFlgInfUpdateManage'));

  app.model(require('./models/cas/casJnlQry/casAccEntryJnl'));
  app.model(require('./models/cas/casJnlQry/casAccVoucherInf'));
  app.model(require('./models/cas/casJnlQry/casBokAccJnl'));
  app.model(require('./models/cas/casJnlQry/casTxnJnl'));

  app.model(require('./models/cas/calculateBalance/subjectDayEndBalManage'));
  app.model(require('./models/cas/calculateBalance/subjectBalanceManage'));
  app.model(require('./models/cas/calculateBalance/accDayEndBalManage'));
  app.model(require('./models/cas/calculateBalance/accountCheckManage'));
}
