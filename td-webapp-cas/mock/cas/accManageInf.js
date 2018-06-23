const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

// gender: (i % 2 === 0 ? '0' : '1'),
// birthday: `198${i}-01-09`,
// certificateType: '01',
// certificateNo: `42000000000000${i}`,
// address: `xxx市xxx区xxx镇xxx路${i}号`,
module.exports = {
  'GET /rest/cas/accManageInfs'(req, res) {
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
        pkId: `${currentPage}${i}`,
        actNme: `测试账户${i}`,
        accTyp: '1',
        subject: `科目${i}`,
        cusNo: `0010${i}`,
        cateId: '00',
        modeId: '0111',
        regTim: '20170523121212',
        remark: '测试',
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

  'GET /rest/cas/accManageInf/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/cas/accManageInf/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/cas/accManageInf'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/cas/accManageInfs'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'GET /rest/cas/accManageInfs/subaccManageInf'(req, res) {
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
