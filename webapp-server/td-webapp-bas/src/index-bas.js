export function addBasModel(app) {
  app.model(require('./models/bas/userManage'));
  app.model(require('./models/bas/roleManage'));
  app.model(require('./models/bas/menuManage'));
  app.model(require('./models/bas/orgManage'));
  app.model(require('./models/bas/logManage'));
  app.model(require('./models/bas/jobTriggerInfoManage'));
  app.model(require('./models/bas/jobTriggerLogManage'));
  app.model(require('./models/bas/dubboServicesManage'));
  app.model(require('./models/bas/modelMainManage'));
  app.model(require('./models/bas/positionManage'));
  app.model(require('./models/bas/procedureManage'));
  app.model(require('./models/bas/taskMonitorManage'));
  app.model(require('./models/bas/pubBankManage'));
  app.model(require('./models/bas/pubMccManage'));
  app.model(require('./models/bas/pubCountryManage'));
  app.model(require('./models/bas/pubCurrencyManage'));
  app.model(require('./models/bas/pubExchangeRateManage'));
  app.model(require('./models/bas/pubUnionfitManage'));
  app.model(require('./models/bas/pubAreaManage'));
  app.model(require('./models/bas/holidayManage'));
  app.model(require('./models/bas/pubAnnmentManage'));
  app.model(require('./models/bas/pubMessageManage'));
  app.model(require('./models/bas/pubTest'));
}
