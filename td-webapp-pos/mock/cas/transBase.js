const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

// gender: (i % 2 === 0 ? '0' : '1'),
// birthday: `198${i}-01-09`,
// certificateType: '01',
// certificateNo: `42000000000000${i}`,
// address: `xxx市xxx区xxx镇xxx路${i}号`,
module.exports = {
  'GET /rest/cas/transBase'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const total = 11;
    const list = [];
    const childList = [];
    const childList2 = [];
    const childList3 = [];
    const childList4 = [];
    const childList5 = [];
    const childList6 = [];
    const childList7 = [];
    const childList8 = [];
    const childList9 = [];
    const childList10 = [];
    const childList11 = [];
    childList.push({
      txnCode: '11',
      txnDesc: '11',
      subCod: '11',
      subCodDesc: '11',
      remark: '11',
    });
    childList2.push({
      txnCode: '21',
      txnDesc: '21',
      subCod: '21',
      subCodDesc: '21',
      remark: '21',
    });
    childList3.push({
      txnCode: '31',
      txnDesc: '31',
      subCod: '31',
      subCodDesc: '31',
      remark: '31',
    });
    childList4.push({
      txnCode: '41',
      txnDesc: '41',
      subCod: '41',
      subCodDesc: '41',
      remark: '41',
    });
    childList5.push({
      txnCode: '51',
      txnDesc: '51',
      subCod: '51',
      subCodDesc: '51',
      remark: '51',
    });
    childList6.push({
      txnCode: '61',
      txnDesc: '61',
      subCod: '61',
      subCodDesc: '61',
      remark: '61',
    });
    childList7.push({
      txnCode: '71',
      txnDesc: '71',
      subCod: '71',
      subCodDesc: '71',
      remark: '71',
    });
    childList8.push({
      txnCode: '81',
      txnDesc: '81',
      subCod: '81',
      subCodDesc: '81',
      remark: '81',
    });
    childList9.push({
      txnCode: '91',
      txnDesc: '91',
      subCod: '91',
      subCodDesc: '91',
      remark: '91',
    });
    childList10.push({
      txnCode: '101',
      txnDesc: '101',
      subCod: '101',
      subCodDesc: '101',
      remark: '101',
    });
    childList11.push({
      txnCode: '111',
      txnDesc: '111',
      subCod: '111',
      subCodDesc: '111',
      remark: '111',
    });
    list.push({
      txnCode: '1',
      txnDesc: '1',
      remark: '1',
      children: childList,
    });
    list.push({
      txnCode: '2',
      txnDesc: '2',
      remark: '2',
      children: childList2,
    });
    list.push({
      txnCode: '3',
      txnDesc: '3',
      remark: '3',
      children: childList3,
    });
    list.push({
      txnCode: '4',
      txnDesc: '4',
      remark: '4',
      children: childList4,
    });
    list.push({
      txnCode: '5',
      txnDesc: '5',
      remark: '5',
      children: childList5,
    });
    list.push({
      txnCode: '6',
      txnDesc: '6',
      remark: '6',
      children: childList6,
    });
    list.push({
      txnCode: '7',
      txnDesc: '7',
      remark: '7',
      children: childList7,
    });
    list.push({
      txnCode: '8',
      txnDesc: '8',
      remark: '8',
      children: childList8,
    });
    list.push({
      txnCode: '9',
      txnDesc: '9',
      remark: '9',
      children: childList9,
    });
    list.push({
      txnCode: '10',
      txnDesc: '10',
      remark: '10',
      children: childList10,
    });
    list.push({
      txnCode: '11',
      txnDesc: '11',
      remark: '11',
      children: childList11,
    });
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
  'GET /rest/cas/transBase/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'PUT /rest/cas/transBase/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/cas/transBase'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/cas/transBases'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
};
