const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/cas/casAccVoucherInf'(req, res) {
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
        voucherId: `20170523104401${i}`,
        subject: `22410101`,
        cdFlg: `D`,
        debitAmt: `9800`,
        creditAmt: `9800`,
        summary: `嘿嘿`,       
        regTim: `20170523105006`,
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
