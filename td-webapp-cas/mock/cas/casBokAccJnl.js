const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/cas/casBokAccJnl'(req, res) {
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
        tckSeq: `20170523104401${i}`,
        voucherId: `20170523104401${i}`,
        txnTyp: `N`,
        txnCode: `001`,
        actDat: `20170523`,
        txnAmt: `9800`,
        actNo: `0120725906391734681601101010001`,       
        blgSubject: `22410101`,
        accTyp: `2`,
        ccy: `CNY`,
        cdFlg: `D`,
        bokSts: `S`,
        oTckNo: `20170522104401${i}`,
        regTim: `20170523105006`,
        lstUpdTim: `20170523105006`,
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
