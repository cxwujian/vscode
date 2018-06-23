const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/cas/subjectCode'(req, res) {
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
        accTyp: '1',
        subject: `${currentPage}${i}`,
        subjectNme: '银行存款',
        subjectLev: `${i + 1}`,
        isLastLev: '0',
        supSubject: '',
        cdFlg: 'D',
        subSts: '00',
        remark: '测试',
        isSystem: '0',
        groupDesc: '业务类别组一',
        ccy: 'CNY',
        subTyp: 'CHN',
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
  'GET /rest/cas/subjectCode/busIdSub'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request busIdSub param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    // for (let i = 0; i < 10; i++) {
    //   if (currentPage >= 3 && i > 1) {
    //     break;
    //   }
    //   list.push({
    //     accTyp: `1`,
    //     subject: `${currentPage}${i}`,
    //     subjectNme: `银行存款`,
    //     subjectLev: `1`,
    //     isLastLev: '是',
    //     supSubject: '',
    //     cdFlg: 'D',
    //     subSts: '00',
    //     remark: `测试`,
    //     isSystem: '系统自有',
    //     groupDesc: `业务类别组一`,
    //   });
    // }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
  'GET /rest/cas/subjectCode/busIds'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request busIds param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        groupId: `${currentPage}${i}`,
        groupDesc: '业务类别组一',
        busId: '01',
        busDesc: '用户',
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
  'PUT /rest/cas/subjectCode/cancelBusId'(req, res) {
    // 获取请求参数
    console.log('request canSubCode param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'PUT /rest/cas/subjectCode/canSubCode'(req, res) {
    // 获取请求参数
    console.log('request canSubCode param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'GET /rest/cas/merchant/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/cas/merchant/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/cas/merchant'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/cas/merchants'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
