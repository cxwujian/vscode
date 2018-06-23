const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/cas/casAccEntryJnl'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 10;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        txnLog: `20170523104401${i}`,
        tckSeq: `20170523104401${i}`,
        voucherId: `20170523104401${i}`,
        actDat: `20170523`,
        txnAmt: `9800`,
        actNo: `0120725906391734681601101010001`,       
        subject: `22410101`,
        subjectNme: `其他应付款-支付余额-用户`,
        subjectLev: `3`,
        isLastLev: `1`,
        supSubject: `224101`,
        accTyp: `2`,
        ccy: `CNY`,
        cdFlg: `D`,
        regTim: `20170523105006`,
        lstUpdTim: `20170523105006`,
        remark: `嘿嘿`,
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
