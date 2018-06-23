const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/cas/subjectBalances'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 20;
    const list = [];
    for (let i = 0; i < 20; i++) {
      if (currentPage >= 20 && i > 1) {
        break;
      }
      list.push({
        subject: `${currentPage}${i}`,
        subjectNme: `科目${i}`,
        subjectLev: '1',
        actDat: '20170619',
        accTyp: '1',
        balance: '100',
        levCount1: '100',
        levCount2: '100',
        ccy: 'CNY',
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
