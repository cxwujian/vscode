const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/cas/accountChecks'(req, res) {
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
        actNo: `${currentPage}${i}`,
        subject: `${i + 1}`,
        subjectNme: `科目${i + 1}`,
        ccy: 'CNY',
        accTyp: '1',
        amtTotal: '100',
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
