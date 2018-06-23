const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/cas/casTxnJnl'(req, res) {
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
        txnLog: `20170523104401${i}`,
        logNo: `20170523104401${i}`,
        batchNo: `20170523104401${i}`,
        actDat: `20170523`,
        txnTyp: `N`,
        txnCode: `01`,
        extCod: `01`,
        subCod: `01`,
        blgSubject: `22410101`,
        txnAmt: `9800`,
        feeAmt: `100`,
        feeAmt2: `100`,
        feeAmt3: `100`,
        shrAmt: `100`,
        incAmt: `100`,
        payChnCde: `001`,
        pyeChnCde: `002`,
        payCusId: `20170523104401${i}`,
        pyeCusId: `20170523104401${i}`,
        ccy: `CNY`,
        accTxnSts: `S`,
        tckNo: `20170523104401${i}`,
        voucherId: `20170523104401${i}`,
        accRspCde: `000000`,
        accRspMsg: `交易成功`,
        oTckNo: `20170523104401${i}`,
        regTim: `20170523105006`,
        lstUpdTim: `20170523105006`,
        remark: `嘿嘿`,
        rsFld: `嘿嘿`,
        rsFld2: `嘿嘿`,
        rsFld3: `嘿嘿`,
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
};
