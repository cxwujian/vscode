const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');


module.exports = {
  'GET /rest/merp/orders/bankCard'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        txnNo: `${currentPage}${i}`,
        terNo: `v${i}`,
        merName: `商户${i}`,
        braName: `门店${i}`,
        agtName: `代理商${i}`,
        txnAmt: '1000',
        currency: '人民币',
        txnType: 'S',
        txnTime: '20170316142525',
        txnRate: '0.1',
        chnFeeLim: '100',
        txnFee: '20',
        cardNo: '6228483030*****3313',
        cardType: '01',
        cardIssinam: '农业银行',
        tseqNo: '000012300',
        tsrefno: '12312313',
        tautcod: '456456456',
        txnStatus: 'S',
        freezeStatus: '0',
        clearSts: '0',
        chnName: '银联',
        status: '2',
      });
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
  'GET /rest/merp/order/bankCard/10'(req, res) {
    // 获取请求参数
    console.log(444)
    const recordList = [];
    const record = {};
    record.txnNo = '10';
    record.terNo = 'v0';
    record.merName = '商户0';
    record.braName = '门店0';
    record.agtName = '代理商0';
    record.txnAmt = '2000';
    record.currency = '人民币';
    record.txnType = 'S';
    record.txnTime = '20170316142525';
    record.txnRate = '0.1';
    record.chnFeeLim = '100';
    record.txnFee = '20';
    record.cardNo = '6228483030*****3313';
    record.cardType = '01';
    record.cardIssinma = '农业银行';
    record.tseqNo = '000012300';
    record.tsrefno = '12312313';
    record.tautcod = '456456456';
    record.txnStatus = 'S';
    record.freezeStatus = '0';
    record.clearSts = '0';
    record.chnName = '银联';
    recordList[0] = record;
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: recordList[0],
    });
    res.json(data);
  },

};
