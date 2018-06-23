const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

// gender: (i % 2 === 0 ? '0' : '1'),
// birthday: `198${i}-01-09`,
// certificateType: '01',
// certificateNo: `42000000000000${i}`,
// address: `xxx市xxx区xxx镇xxx路${i}号`,
module.exports = {
  'GET /rest/cas/entryRules'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 26;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        entryId: `${currentPage}${i}`,
        entryDesc: `测试${i}`,
        ccy: '01',
        entSts: `科目${i}`,
        cusNo: `0010${i}`,
        accSts: '00',
        dSubjectA: '001',
        dAmtRulA: '${txnAmt}-${feeAmt}-${feeAmt}',
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
  'GET /rest/cas/catesOfAcc'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {
        result: 'Y',
      },
    });
    res.json(data);
  },
  'GET /rest/cas/entryRule/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/cas/entryRule/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/cas/entryRule'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/cas/entryRules'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'GET /rest/cas/entryRules/subentryRule'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 26;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        actNo: `${currentPage}${i}`,
        actNme: `测试账户${i}`,
        accTyp: '1',
        blgSubject: `科目${i}`,
        cusNo: `0010${i}`,
        accSts: '00',
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
