const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/cas/accDayEndBals'(req, res) {
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
        actNme: `张三-银行存款${i + 1}`,
        accTyp: '1',
        actDat: '20170619',
        debLstBal: '100',
        debCurAmt: '110',
        creLstBal: '200',
        creCurAmt: '210',
        creCurNum: '300',
        debCurNum: '310',
        debNowBal: '400',
        creNowBal: '410',
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
