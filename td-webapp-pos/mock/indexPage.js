const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}


module.exports = {
  'GET /rest/bas/user/menus'(req, res) {
    const basMenu = [
      {
        key: '000',
        icon: 'setting',
        text: '系统管理',
        children: [
          {
            key: '000-01',
            icon: 'setting',
            text: '系统管理',
            children: [
              { key: '000-01-01', text: '用户管理', to: 'bas/sysManage/userManage' },
              { key: '000-01-02', text: '角色管理', to: 'bas/sysManage/roleManage' },
              { key: '000-01-03', text: '菜单管理', to: 'bas/sysManage/menuManage' },
              { key: '000-01-04', text: '机构管理', to: 'bas/sysManage/orgManage' },
              { key: '000-01-05', text: '密码修改', to: 'bas/sysManage/passwordUpdate' },
            ],
          },
          {
            key: '000-02',
            icon: 'solution',
            text: '日志管理',
            children: [
              { key: '000-02-01', text: '日志管理', to: 'bas/logManage/logManage' },
            ],
          },
          {
            key: '000-04',
            icon: 'user',
            text: '任务配置',
            children: [
              { key: '000-04-01', text: '工作流维护', to: 'bas/workflow/modelMainManage' },
              { key: '000-04-02', text: '岗位维护', to: 'bas/workflow/positionManage' },
              { key: '000-04-03', text: '步骤维护', to: 'bas/workflow/procedureManage' },
              { key: '000-04-04', text: '任务监控', to: 'bas/workflow/taskMonitorManage' },
            ],
          },
          {
            key: '000-05',
            icon: 'user',
            text: '基础数据',
            children: [
              { key: '000-05-01', text: '节假日维护', to: 'bas/basDataManage/holidayManage' },
              { key: '000-05-02', text: '银行信息管理', to: 'bas/basDataManage/pubBankManage' },
              { key: '000-05-03', text: '卡bin信息管理', to: 'bas/basDataManage/pubUnionfitManage' },
              { key: '000-05-04', text: '地区信息管理', to: 'bas/basDataManage/pubAreaManage' },
              { key: '000-05-05', text: 'MCC信息管理', to: 'bas/basDataManage/pubMccManage' },
              { key: '000-05-06', text: '国家信息管理', to: 'bas/basDataManage/pubCountryManage' },
              { key: '000-05-07', text: '币种信息管理', to: 'bas/basDataManage/pubCurrencyManage' },
              { key: '000-05-08', text: '汇率维护', to: 'bas/basDataManage/pubExchangeRateManage' },
            ],
          },
          {
            key: '000-06',
            icon: 'user',
            text: '消息管理',
            children: [
              { key: '000-06-01', text: '公告管理', to: 'bas/messageManage/pubAnnmentManage' },
              { key: '000-06-02', text: '消息管理', to: 'bas/messageManage/pubMessageManage' },
            ],
          },
        ],
      }];

    const bmsMenus = [{
      key: '200',
      icon: 'trademark',
      text: '业务管理',
      children: [
        { key: '200-01', text: '业务总览', to: 'bms/businessManage/businessOverview' },
        { key: '200-02', text: '个人业务管理', to: 'bms/businessManage/personalMemberBusinessManage' },
        { key: '200-03', text: '商户业务管理', to: 'bms/businessManage/merchantBusinessManage' },
        // { key: '200-04', text: '门店业务管理', to: 'bms/businessManage/merchantStoreBusinessManage' },
        { key: '200-05', text: '终端业务管理', to: 'bms/businessManage/terminalBusinessManage' },
        { key: '200-06', text: '代理商业务管理', to: 'bms/businessManage/agentBusinessManage' },
        // { key: '200-07', text: '服务商业务管理', to: 'bms/businessManage/providerBusinessManage' },
      ],
    }];
    const casMenus = [{
      key: '001',
      icon: 'exception',
      text: '账务管理',
      children: [
        {
          key: '001-01',
          icon: 'setting',
          text: '科目管理',
          children: [
            { key: '001-01-01', text: '业务类别维护', to: 'cas/subjectManage/busTypGroupManage' },
            { key: '001-01-02', text: '科目代码维护', to: 'cas/subjectManage/subjectCodeManage' },
            { key: '001-01-03', text: '科目余额表', to: 'cas/subjectManage/subjectDayEndBalManage' },
            { key: '001-01-04', text: '科目体系平衡', to: 'cas/subjectManage/subjectSystemBalance' },
          ],
        },
        {
          key: '001-02',
          icon: 'setting',
          text: '账户管理',
          children: [
            { key: '001-02-01', text: '客户信息管理', to: 'cas/accManage/cusInfManage' },
            { key: '001-02-02', text: '子账户类别维护', to: 'cas/accManage/subAccCategoryManage' },
            { key: '001-02-03', text: '账户维护', to: 'cas/accManage/accProfilesManage' },
            { key: '001-02-04', text: '账户记账管理', to: 'cas/accManage/accManageInfManage' },
            { key: '001-02-05', text: '记账方式维护', to: 'cas/accManage/accModeInfManage' },
            { key: '001-02-06', text: '账户余额核对', to: 'cas/accManage/accDayEndBalManage' },
            { key: '001-02-07', text: '账户总分核对', to: 'cas/accManage/accountCheckManage' },
          ],
        },
        {
          key: '001-03',
          icon: 'setting',
          text: '交易管理',
          children: [
            { key: '001-03-01', text: '基础交易管理', to: 'cas/transManage/transBaseManage' },
            { key: '001-03-02', text: '分录规则管理', to: 'cas/transManage/accEntryRulesInfManage' },
            { key: '001-03-03', text: '外部交易码维护', to: 'cas/transManage/transRelatedExtManage' },
            { key: '001-03-04', text: '渠道代码查询', to: 'cas/transManage/payChnInfManage' },
            { key: '001-03-05', text: '币种维护', to: 'cas/transManage/ccyFlgInfManage' },
            { key: '001-03-06', text: '金额代码维护', to: 'cas/transManage/amtCdeInfManage' },
          ],
        },
        {
          key: '001-04',
          icon: 'setting',
          text: '开户管理',
          children: [
            { key: '001-04-01', text: '开户场景管理', to: 'cas/openAccManage/openAccSceneManage' },
          ],
        },
        {
          key: '001-05',
          icon: 'setting',
          text: '流水查询',
          children: [
            { key: '001-05-01', text: '账务流水查询', to: 'cas/casJnlQry/casTxnJnl' },
            { key: '001-05-02', text: '账户流水查询', to: 'cas/casJnlQry/casBokAccJnl' },
            { key: '001-05-03', text: '记账凭证查询', to: 'cas/casJnlQry/casAccVoucherInf' },
            { key: '001-05-04', text: '会计分录流水查询', to: 'cas/casJnlQry/casAccEntryJnl' },
          ],
        },
        {
          key: '001-06',
          icon: 'setting',
          text: '账务处理',
          children: [
            { key: '001-06-01', text: '账务调账', to: 'cas/accTreatment/accountAdjustmentManage' },
            { key: '001-06-02', text: '账户充值', to: 'cas/accTreatment/accountRechargeManage' },
          ],
        },
        {
          key: '001-09',
          icon: 'setting',
          text: '试算平衡',
          children: [
            { key: '001-09-01', text: '科目余额核对', to: 'cas/calculateBalance/subjectDayEndBalManage' },
            { key: '001-09-02', text: '科目体系平衡查询', to: 'cas/calculateBalance/subjectBalanceManage' },
            { key: '001-09-03', text: '账户余额核对', to: 'cas/calculateBalance/accDayEndBalManage' },
            { key: '001-09-04', text: '账户总分核对', to: 'cas/calculateBalance/accountCheckManage' },
          ],
        },
        {
          key: '001-08',
          icon: 'setting',
          text: '冻结管理',
          children: [
            { key: '001-08-01', text: '冻结管理', to: 'cas/accFrozManage/accFrozDetailManage' },
          ],
        },
        {
          key: '001-07',
          icon: 'setting',
          text: '任务管理',
          children: [
            {
              key: '001-07-01',
              icon: 'setting',
              text: '科目任务',
              children: [
                { key: '001-07-01-01', text: '业务类别新增', to: 'cas/taskManage/taskBusTypGroupAddManage' },
                { key: '001-07-01-02', text: '业务类别禁用', to: 'cas/taskManage/taskBusTypGroupDelManage' },
                { key: '001-07-01-05', text: '业务类别启用', to: 'cas/taskManage/taskBusTypGroupEnableManage' },
                { key: '001-07-01-03', text: '科目代码新增', to: 'cas/taskManage/taskSubCodeAddManage' },
                { key: '001-07-01-04', text: '科目代码禁用', to: 'cas/taskManage/taskSubCodeDelManage' },
                { key: '001-07-01-06', text: '科目代码启用', to: 'cas/taskManage/taskSubCodeEnableManage' },
              ],
            },
            {
              key: '001-07-02',
              icon: 'setting',
              text: '账户任务',
              children: [
                { key: '001-07-02-01', text: '子账户类别新增', to: 'cas/taskManage/taskSubAccCategoryAddManage' },
                { key: '001-07-02-02', text: '子账户类别删除', to: 'cas/taskManage/taskSubAccCategoryDelManage' },
                { key: '001-07-02-03', text: '开户场景新增', to: 'cas/taskManage/taskOpenAccSceneAddManage' },
                { key: '001-07-02-04', text: '开户场景修改', to: 'cas/taskManage/taskOpenAccSceneUpdManage' },
                { key: '001-07-02-05', text: '开户场景删除', to: 'cas/taskManage/taskOpenAccSceneDelManage' },
                { key: '001-07-02-06', text: '账户开户', to: 'cas/taskManage/taskAccProfilesAddManage' },
                { key: '001-07-02-07', text: '账户销户', to: 'cas/taskManage/taskAccProfilesDeleteManage' },
                { key: '001-07-02-08', text: '账户解冻', to: 'cas/taskManage/taskAccProfilesUnfreezeManage' },
                { key: '001-07-02-09', text: '账户充值', to: 'cas/taskManage/taskAccProfilesRechargeManage' },
                { key: '001-07-02-10', text: '账户调账', to: 'cas/taskManage/taskAccProfilesAdjustmentManage' },
                { key: '001-07-02-13', text: '账户冻结', to: 'cas/taskManage/taskAccProfilesFrozenManage' },
                { key: '001-07-02-11', text: '记账方式删除', to: 'cas/taskManage/taskAccModeInfDeleteManage' },
                { key: '001-07-02-12', text: '记账维护新增', to: 'cas/taskManage/taskAccManageInfAddManage' },
              ],
            },
            {
              key: '001-07-03',
              icon: 'setting',
              text: '交易任务',
              children: [
                { key: '001-07-03-01', text: '分录规则新增', to: 'cas/taskManage/taskAccEntryRulesInfAddManage' },
                { key: '001-07-03-02', text: '分录规则修改', to: 'cas/taskManage/taskAccEntryRulesInfUpdateManage' },
                { key: '001-02-03-03', text: '分录规则删除', to: 'cas/taskManage/taskAccEntryRulesInfDeleteManage' },
                { key: '001-02-03-04', text: '匹配会记分录', to: 'cas/taskManage/taskTxnSubCodeEntryIdManage' },
                { key: '001-02-03-05', text: '匹配外部交易码', to: 'cas/taskManage/taskTxnSubCodeExtCodManage' },
                { key: '001-07-03-07', text: '外部交易码新增', to: 'cas/taskManage/taskTransRelatedExtAddManage' },
                { key: '001-07-03-08', text: '外部交易码删除', to: 'cas/taskManage/taskTransRelatedExtDeleteManage' },
                { key: '001-07-03-09', text: '金额代码新增', to: 'cas/taskManage/taskAmtCdeInfAddManage' },
                { key: '001-07-03-10', text: '金额代码删除', to: 'cas/taskManage/taskAmtCdeInfDeleteManage' },
                { key: '001-07-03-11', text: '币种新增', to: 'cas/taskManage/taskCcyFlgInfAddManage' },
                { key: '001-07-03-12', text: '币种修改', to: 'cas/taskManage/taskCcyFlgInfUpdateManage' },
              ],
            },
          ],
        },
      ],
    }];

    const mmsMenus = [{
      key: '101',
      icon: 'team',
      text: '会员管理',
      children: [
        {
          key: '101-01',
          icon: 'team',
          text: '会员管理',
          children: [
            { key: '101-01-01', text: '个人会员管理', to: 'mms/memberManage/personalMemberManage' },
            { key: '101-01-02', text: '企业商户管理', to: 'mms/memberManage/merchantManage' },
            { key: '101-01-03', text: '商户门店管理', to: 'mms/memberManage/merchantStoreManage' },
            { key: '101-01-04', text: '代理商管理', to: 'mms/memberManage/agentManage' },
            { key: '101-01-05', text: '服务商管理', to: '#' },
          ],
        },
        {
          key: '101-02',
          icon: 'solution',
          text: '会员申请',
          children: [
            { key: '101-02-01', text: '个人会员申请', to: 'mms/memberApply/personalMemberApply' },
            { key: '101-02-02', text: '企业商户申请', to: 'mms/memberApply/merchantApply' },
            { key: '101-02-03', text: '商户门店申请', to: 'mms/memberApply/merchantStoreApply' },
            { key: '101-02-04', text: '代理商申请', to: 'mms/memberApply/agentApply' },
            { key: '101-02-05', text: '服务商申请', to: '#' },
          ],
        },
        {
          key: '101-03',
          icon: 'user',
          text: '会员角色管理',
          children: [
            { key: '101-03-01', text: '商户角色管理', to: 'mms/memberRoleManage/merchantRoleManage' },
            { key: '101-03-02', text: '门店角色管理', to: 'mms/memberRoleManage/merchantStoreRoleManage' },
            { key: '101-03-03', text: '代理商角色管理', to: 'mms/memberRoleManage/agentRoleManage' },
            { key: '101-03-04', text: '服务商角色管理', to: '#' },
          ],
        },
        {
          key: '101-04',
          icon: 'solution',
          text: '会员用户管理',
          children: [
            { key: '101-04-01', text: '商户用户管理', to: 'mms/memberUserManage/merchantUsrManage' },
            { key: '101-04-02', text: '门店人员管理', to: '#' },
            { key: '101-04-03', text: '代理商用户管理', to: 'mms/memberUserManage/agentUsrManage' },
            { key: '101-04-04', text: '服务商用户管理', to: '#' },
          ],
        },
        {
          key: '101-05',
          icon: 'user',
          text: '任务管理',
          children: [
            { key: '101-05-01', text: '商户申请查询', to: 'mms/taskManage/taskMerchantManage' },
            { key: '101-05-02', text: '代理商申请查询', to: 'mms/taskManage/taskAgentManage' },
            { key: '101-05-03', text: '商户门店申请查询', to: 'mms/taskManage/taskStoreManage' },
          ],
        },
      ],
    }];

    const omsMenus = [{
      key: '104',
      icon: 'switcher',
      text: '交易管理',
      children: [
        {
          key: '104-01',
          icon: 'user',
          text: '交易汇总查询',
          children: [
            { key: '104-01-01', text: '当日汇总交易', to: 'oms/orderManage/summaryOrderManage' },
            { key: '104-01-02', text: '历史汇总交易', to: 'oms/orderManage/summaryHisOrderManage' },
          ],
        },
        {
          key: '104-02',
          icon: 'user',
          text: '银行卡交易查询',
          children: [
            { key: '104-02-01', text: '当日银行卡交易', to: 'oms/orderManage/bankcardOrderManage' },
            { key: '104-02-02', text: '历史银行卡交易', to: 'oms/orderManage/bankcardHisOrderManage' },
          ],
        },
        {
          key: '104-03',
          icon: 'user',
          text: '扫码交易查询',
          children: [
            { key: '104-03-01', text: '当日扫码交易', to: 'oms/orderManage/scanOrderManage' },
            { key: '104-03-02', text: '历史扫码交易', to: 'oms/orderManage/scanHisOrderManage' },
          ],
        },
        {
          key: '104-04',
          icon: 'user',
          text: '调单处理查询',
          children: [
            { key: '104-04-01', text: '调单处理查询', to: 'oms/orderManage/orderTransRecManage' },
          ],
        },
      ],
    }];


    const pmsMenus = [
      {
        key: '103',
        icon: 'global',
        text: '通道管理',
        children: [
          {
            key: '103-01',
            icon: 'folder-add',
            text: '渠道信息添加',
            children: [
              { key: '103-01-01', text: '刷卡渠道添加', to: 'pms/channelApply/channelBankcardApply' },
              { key: '103-01-02', text: '扫码渠道添加', to: 'pms/channelApply/channelScancodeApply' },
              { key: '103-01-03', text: '划款渠道添加', to: 'pms/channelApply/channelTransferApply' },
            ],
          },
          {
            key: '103-02',
            icon: 'folder-open',
            text: '渠道信息管理',
            children: [
              { key: '103-02-01', text: '刷卡渠道信息管理', to: 'pms/channelManage/channelBankcardManage' },
              { key: '103-02-02', text: '扫码渠道信息管理', to: 'pms/channelManage/channelScancodeManage' },
              { key: '103-02-03', text: '划款渠道信息管理', to: 'pms/channelManage/channelTransferManage' },
            ],
          },
          {
            key: '103-03',
            icon: 'file-add',
            text: '渠道商终信息添加',
            children: [
              { key: '103-03-01', text: '刷卡渠道商终添加', to: 'pms/merchantApply/merchantBankcardApply' },
              { key: '103-03-02', text: '扫码渠道商户添加', to: 'pms/merchantApply/merchantScancodeApply' },
            ],
          },
          {
            key: '103-04',
            icon: 'file',
            text: '渠道商终信息管理',
            children: [
              { key: '103-04-01', text: '刷卡渠道商户管理', to: 'pms/merchantManage/merchantBankcardManage' },
              { key: '103-04-02', text: '扫码渠道商户管理', to: 'pms/merchantManage/merchantScancodeManage' },
              { key: '103-04-03', text: '刷卡渠道终端管理', to: 'pms/terminalManage/terminalBankcardManage' },
            ],
          },
          {
            key: '103-05',
            icon: 'global',
            text: '路由信息配置',
            children: [
              { key: '103-05-01', text: '刷卡渠道路由模板', to: 'pms/routerManage/routerBankcardModManage' },
              { key: '103-05-02', text: '扫码渠道路由模板', to: 'pms/routerManage/routerScancodeModManage' },
              { key: '103-05-03', text: '刷卡商户路由配置', to: 'pms/routerManage/routerMerBankcardManage' },
              { key: '103-05-04', text: '扫码商户路由配置', to: 'pms/routerManage/routerMerScancodeManage' },
              { key: '103-05-05', text: '智能路由配置', to: 'pms/routerManage/merSmartRouterManage' },
            ],
          },
        ],
      }];

    const rmsMenus = [
      {
        key: '302',
        icon: 'setting',
        text: '预警风控',
        children: [{
          key: '302-01',
          icon: 'setting',
          text: '规则管理',
          children: [
            { key: '302-01-01', text: '规则管理', to: 'rms/ruleManage' },
            { key: '302-01-02', text: '规则信息管理', to: 'rms/ruleMessageManage' },
          ],
        },
        {
          key: '302-02',
          icon: 'team',
          text: '预警组管理',
          children: [
            { key: '302-02-01', text: '预警组管理', to: 'warnGroup/manage' },
            { key: '302-02-02', text: '预警人员管理', to: 'rms/warmUser/warnUserManage' },
          ],
        },
        {
          key: '302-03',
          icon: 'solution',
          text: '黑名单管理',
          children: [
            { key: '302-03-01', text: '银行卡黑名单', to: 'rms/blackListManage/bankCardBlackListManage' },
            { key: '302-03-02', text: '商户黑名单', to: 'rms/blackListManage/merBlackListManage' },
            { key: '302-03-03', text: '门店黑名单', to: 'rms/blackListManage/storeBlackListManage' },
            { key: '302-03-04', text: '证件黑名单', to: 'rms/blackListManage/paperBlackListManage' },
            { key: '302-03-05', text: '终端黑名单', to: 'rms/blackListManage/termBlackListManage' },
            { key: '302-03-06', text: '黑名单操作日志', to: 'rms/blackListManage/blackListLogManage' },
          ],
        },
        {
          key: '302-04',
          icon: 'user',
          text: '限额管理',
          children: [
            { key: '302-04-01', text: 'MCC限额', to: 'rms/limitManage/mccLimitManage' },
            { key: '302-04-02', text: '商户限额', to: 'rms/limitManage/merLimitManage' },
            { key: '302-04-03', text: '门店限额', to: 'rms/limitManage/storeLimitManage' },
            { key: '302-04-04', text: '终端限额', to: 'rms/limitManage/termLimitManage' },
          ],
        }],
      },
    ];

    const smsMenu = [{
      key: '301',
      icon: 'pay-circle-o',
      text: '清算中心',
      children: [
        {
          key: '301-01',
          icon: 'pay-circle-o',
          text: '对账管理',
          children: [
            // { key: '301-01-01', text: '核心对账结果', to: '#' },
            { key: '301-01-02', text: '渠道对账结果', to: 'sms/chkManage/chnChkSum' },
            { key: '301-01-03', text: '渠道疑账管理', to: 'sms/chkManage/chnChkDoubtManage' },
            { key: '301-01-04', text: '渠道错账管理', to: 'sms/chkManage/chnChkErrorManage' },
            { key: '301-01-05', text: '渠道错账审核', to: 'sms/chkManage/chnChkErrorAudit' },
          ],
        },
        {
          key: '301-02',
          icon: 'calculator',
          text: '清分管理',
          children: [
            { key: '301-02-01', text: '清分汇总查询', to: 'sms/clrManage/clearingSumManage' },
            // { key: '301-02-02', text: '清分业务汇总查询', to: 'sms/clr/clearingBusinessManage' },
          ],
        },
        {
          key: '301-03',
          icon: 'bank',
          text: '结算管理',
          children: [
            { key: '301-03-01', text: '结算管理', to: 'sms/stlManage/stlManage' },
            { key: '301-03-02', text: '结算审核', to: 'sms/stlManage/stlAudit' },
          ],
        },
        {
          key: '301-04',
          icon: 'wallet',
          text: '划款记录',
          children: [
            { key: '301-04-01', text: '划款记录', to: 'sms/stlManage/stlOrderManage' },
          ],
        },
        {
          key: '301-05',
          icon: 'red-envelope',
          text: '分润管理',
          children: [
            { key: '301-05-01', text: '分润管理', to: 'sms/stlShrManage/stlShrManage' },
            { key: '301-05-02', text: '分润审核', to: 'sms/stlShrManage/stlShrVerifyManage' },
          ],
        },
      ],
    }];


    const tmsMenus = [
      {
        key: '102',
        icon: 'team',
        text: '终端管理',
        children: [{
          key: '102-01',
          icon: 'team',
          text: '终端数据管理',
          children: [
            { key: '102-01-11', text: '终端厂商管理', to: 'tms/terminalManage/terminalCompanyManage' },
            { key: '102-01-12', text: '终端型号管理', to: 'tms/terminalManage/terminalModelManage' },
            { key: '102-01-13', text: '终端密钥管理', to: 'tms/terminalManage/terminalKeyManage' },
            { key: '102-01-14', text: '终端固件管理', to: 'tms/terminalManage/terminalFirmwareManage' },
            { key: '102-01-15', text: '终端应用管理', to: 'tms/terminalManage/terminalAppManage' },
            { key: '102-01-16', text: '终端参数管理', to: 'tms/terminalManage/terminalParamManage' },
          ],
        },
        {
          key: '102-02',
          icon: 'solution',
          text: '终端信息管理',
          children: [
            { key: '102-02-21', text: '终端入库', to: 'tms/terminalInfoManage/terminalStockAdd' },
            { key: '102-02-22', text: '终端库存管理', to: 'tms/terminalInfoManage/terminalStockManage' },
            { key: '102-02-23', text: '终端信息管理', to: 'tms/terminalInfoManage/terminalManage' },
            { key: '102-02-24', text: '终端日志管理', to: 'tms/terminalInfoManage/terminalLogManage' },
          ],
        },
        {
          key: '102-03',
          icon: 'user',
          text: '终端会员管理',
          children: [
            { key: '102-03-31', text: '终端代理商管理', to: 'tms/terminalBindManage/terminalAgentManage' },
            { key: '102-03-32', text: '终端商户管理', to: 'tms/terminalBindManage/terminalMerManage' },
          ],
        },

        ],
      }];
    const menus = [].concat(basMenu, bmsMenus, casMenus, mmsMenus, omsMenus, pmsMenus, rmsMenus, smsMenu, tmsMenus);
    const data = mockjs.mock({
      rspCod: '200',
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
