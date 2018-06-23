const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/mms/stores'(req, res) {
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
        id: `${currentPage}${i}`,
        braId: `Bra000${currentPage}${i}`,
        braName: `门店名称${currentPage}-${i}`,
        merName: `商户名称${currentPage}-${i}`,
        merId: `Mer000${currentPage}${i}`,
        braConter: `联系人${currentPage}-${i}`,
        braTel: `021-888888${currentPage}${i}`,
        braMobile: `1391666666${currentPage}${i}`,
        braAddr: `xxx市xxx区xxx镇xxx路${i}号`,
        status: (i % 2 === 0 ? '0' : '1'),
        createTime: '2017-03-01 12:12:12',
        updateBy: '',
        updateTime: '',
        loginIp: '127.0.0.1',
        loginTime: '2017-03-05 13:00:00',
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
  'GET /rest/mms/store/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/mms/store/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/mms/store'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/mms/stores'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
