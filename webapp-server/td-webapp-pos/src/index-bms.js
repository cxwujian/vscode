export function addBmsModel(app) {
  app.model(require('./models/bms/businessOverview'));
  app.model(require('./models/bms/merchantBusinessManage'));
  app.model(require('./models/bms/agentBusinessManage'));
}
