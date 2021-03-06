const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/pubAreas'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const pmspubArea1 = [{
      areaCode: '001',
      areaParentCode: '0',
      areaLevel: '1',
      areaName: '中国',
      areaNameEn: 'China',
      areaStatus: '1',
      children: [
        { areaCode: '001001', areaParentCode: '001', areaLevel: '2', areaName: '北京', areaNameEn: 'BeiJing', areaStatus: '1' },
        { areaCode: '001002', areaParentCode: '001', areaLevel: '2', areaName: '上海', areaNameEn: 'ShangHai', areaStatus: '1' },
      ],
    }]
    const pmspubArea2 = [{
      areaCode: '002',
      areaParentCode: '0',
      areaLevel: '1',
      areaName: '美国',
      areaNameEn: 'USA',
      areaStatus: '1',
      children: [
        { areaCode: '002001', areaParentCode: '002', areaLevel: '2', areaName: '阿拉斯加州', areaNameEn: 'Alaska ', areaStatus: '1' },
        { areaCode: '002002', areaParentCode: '002', areaLevel: '2', areaName: '佛罗里达州', areaNameEn: 'Florida', areaStatus: '1' },
      ],
    }]
    const list = [].concat(pmspubArea1, pmspubArea2)
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
  'POST /rest/bas/pubArea'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/pubAreas'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/pubAreas/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/pubArea'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

};
