const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

module.exports = {
  'GET /auth/mock/getMenuBySys.do'(req, res) {
    const casMenus = [
      {
        key: '000-01',
        icon: 'setting',
        text: '科目管理',
        children: [
          { key: '000-01-01', text: '业务类别维护', to: 'cas/subjectManage/busTypGroupManage' },
          { key: '000-01-02', text: '科目代码维护', to: 'cas/subjectManage/subjectCodeManage' },
        ],
      },
      {
        key: '000-02',
        icon: 'setting',
        text: '账户管理',
        children: [
          { key: '000-02-01', text: '客户信息管理', to: 'cas/accManage/cusInfManage' },
          { key: '000-02-02', text: '子账户类别维护', to: 'cas/accManage/subAccCategoryManage' },
          { key: '000-02-03', text: '账户维护', to: 'cas/accManage/accProfilesManage' },
        ],
      },
    ];
    const menus = [].concat(casMenus);
    const data = mockjs.mock({
      rspCod: '000000',
      rspMsg: 'success',
      rspData: {
        usrLoginAuthList: menus,
      },
    });
    res.json(data);
  },

  'GET /auth/mock/login.do'(req, res) {
    console.log('request param =>', req.query.usrPsw);
    const pwd = req.query.usrPsw;
    const data = {
      rspCod: '300',
      rspMsg: '密码错误',
    };
    // password 111111
    if (pwd === '96e79218965eb72c92a549dd5a330112') {
      const token = genToken();
      console.log('token =>', token);
      data.rspCod = '000000';
      data.rspMsg = '登录成功';
      data.rspData = { token: token };
    }
    const result = mockjs.mock(data);
    res.json(result);
  },
}
