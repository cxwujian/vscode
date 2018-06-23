import React, { PropTypes } from 'react';
import moment from 'moment';
import { Spin, Form, Row, Col, Select, Input, Button, InputNumber, Radio, Icon, Cascader, TimePicker } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { numValid, moneyValid } from '../../../../utils/vaild';
import { callNotice } from '../../../../utils/alert';
import currencyList from '../../../../../config/i18n/zh-cn/currency.json';
import txnChannelList from '../../../../../config/i18n/zh-cn/pms/txnChannelBankcard.json';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const noop = () => { };

const MerchantBankcardApplyInfoForm = (props) => {
  const {
    form, loading, style, formSubmit, data, chnList, uuid, changeUuid, pospayTxnSup, getChnInfo, submiting, checkChnMerNo, toggleTxnAuth,
    advLinkClick, advExpand, chnMerNoChkMsg, optType, keys, txnChannelSupportList, changeTxnChannelList,
  } = props;
  const { validateFieldsAndScroll, getFieldsValue, resetFields, getFieldDecorator, getFieldValue } = form;
  const bizMap = i18n.bizMap('pms/merchantBankcard');
  const validMap = i18n.bizMap('pms/merchantBankcardValid');
  const ccyValidMap = i18n.bizMap('pattern');
  const ccyMap = i18n.bizMap('currencyMap');
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;
  const commonMap = i18n.commonMap();
  const cityDatas = i18n.bizMap('provCityData');

  const numberProps = {
    style: { width: '100%' },
    min: 0,
    step: 0.01,
  }


  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const format = 'HH:mm:ss';
  const options = [];
  chnList.forEach((v) => {
    options.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}</Option>);
  });
  getFieldDecorator('keys', {
    initialValue: keys,
  })
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.txnTimeStr) {
          dat.txnTimeStr = dat.txnTimeStr._i;
        }
        if (dat.txnTimeEnd) {
          dat.txnTimeEnd = dat.txnTimeEnd._i;
        }
        if (optType === '2') {
          dat.chnId = data.chnId;
        }
        console.log('dat', dat);
        // keys [] to {}
        if (dat.keys) {
          dat.keys = dat.keys.toString();
        }
        // areaCode [] to {}
        if (dat.areaCode) {
          dat.areaCode = dat.areaCode.toString();
        }
        if (dat.txnChannel0001) {
          dat.txnChannel0001 = dat.txnChannel0001.toString();
        }
        if (dat.txnChannel0002) {
          dat.txnChannel0002 = dat.txnChannel0002.toString();
        }
        if (dat.txnChannel0003) {
          dat.txnChannel0003 = dat.txnChannel0003.toString();
        }
        if (dat.txnChannelSupport) {
          dat.txnChannelSupport = dat.txnChannelSupport.toString();
        }
        dat.singleDayLimit = standUnitToMinUnit(dat.singleDayLimit, data.ccy);
        dat.singleMonthLimit = standUnitToMinUnit(dat.singleMonthLimit, data.ccy);
        dat.singleMaxAmt = standUnitToMinUnit(dat.singleMaxAmt, data.ccy);
        dat.singleMinAmt = standUnitToMinUnit(dat.singleMinAmt, data.ccy);
        dat.minBill = standUnitToMinUnit(dat.minBill, data.ccy);
        dat.debitCardTop = standUnitToMinUnit(dat.debitCardTop, data.ccy);
        dat.creditCardTop = standUnitToMinUnit(dat.creditCardTop, data.ccy);
        // console.log('dat', dat);
        formSubmit(dat);
        if (optType === '1') {
          resetFields();
        }
      }
    });
  };

  const handleReset = () => {
    resetFields();
  };

  // 弹出终端号组件
  const handleClick = () => {
    changeUuid(uuid, keys, 'add');
  };

  // 删除
  const remove = (k) => {
    // can use data-binding to get
    // can use data-binding to get
    const keyArr = keys.filter((key) => {
      return key !== k;
    });
    // can use data-binding to set
    changeUuid(uuid, keyArr, 'del');
  }
  const formItems = keys.map((k) => {
    return (
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label={`${bizMap.terNo}${k}`} key={k}>
        {
          getFieldDecorator(`name${k}`, {
            rules: [
              { validator: numValid }],
            trigger: 'onBlur',
          })(
            <Input maxLength="8" style={{ width: '90%', marginRight: 8 }} placeholder={validMap.validTerNo} />,
          )
        }
        <a onClick={() => remove(k)}><Icon type="cross" /></a>,
      </FormItem>
    );
  });
  const handleTxnSupClick = () => {
    const chnId = getFieldValue('chnId');
    if (!chnId) {
      callNotice(commonMap.warning, validMap.validPreChnName, 'warning');
    } else {
      toggleTxnAuth();
    }
  };
  const getChnAuthInfo = (value) => {
    if (value) {
      for (let i = 0; i < chnList.length; i++) {
        if (value === chnList[i].chnId) {
          getChnInfo(chnList[i]);
        }
      }
    }
  };
  const chnMerNoValid = (rule, value, callback) => {
    const chnId = getFieldValue('chnId');
    if (!chnId) {
      callback(validMap.validPreChnName);
      return;
    }
    if (!value) {
      callback(validMap.validChnMerNo);
    } else if (/^[0-9]*$/.test(value)) {
      // 后台查询此商户号是否存在，存在显示当前商户信息
      const datas = {
        chnMerNo: value,
        chnId: chnId,
      };
      checkChnMerNo(datas);
      if (chnMerNoChkMsg) {
        callback(chnMerNoChkMsg);
      }
    } else if (value) {
      callback(validMap.validChnMerNo);
    }
    callback();
  };

  const handleGolbalChange = (value) => {
    changeTxnChannelList(value);
  }

  const advTermVDom = [
    <Row key="t1">
      <Col sm={24} md={12}>
        <FormItem {...formItemLayout} hasFeedback>
          <Col sm={24} md={12} />
          <a type="primary" onClick={handleClick}>{bizMap.addTerm}</a>
        </FormItem>
      </Col>
    </Row>,
    <Row key="t2">
      <Col sm={24} md={12}>
        {formItems}
      </Col>
    </Row>,
  ];

  const advLimitToggleVDom = [
    <Row key="lt1">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.limitInfo} {...formItemLayout} hasFeedback>
          <a
            onClick={() => {
              const dat = getFieldsValue();
              const value = Object.assign({}, { ...dat });
              value.chnId = data.chnId;
              value.chnName = data.chnName;
              advLinkClick(value);
            }}
          >
            {advExpand ? bizMap['limitInfo-0'] : bizMap['limitInfo-1']}
            &nbsp;
            <Icon type={advExpand ? 'caret-up' : 'caret-down'} />
          </a>
        </FormItem>
      </Col>
    </Row>,
  ];
  const advLimitVDom = [
    <Row key="l1">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleDayLimit} {...formItemLayout}>
          {
            getFieldDecorator('singleDayLimit', {
              initialValue: data.singleDayLimit ? amtMinUnitToStandUnit(data.singleDayLimit, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleDayLimit) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleMonthLimit} {...formItemLayout}>
          {
            getFieldDecorator('singleMonthLimit', {
              initialValue: data.singleMonthLimit ? amtMinUnitToStandUnit(data.singleMonthLimit, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMonthLimit) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="l2">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleDayCount} {...formItemLayout}>
          {
            getFieldDecorator('singleDayCount', {
              initialValue: data.singleDayCount ? amtMinUnitToStandUnit(data.singleDayCount, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleDayCount) },
                { pattern: pattern.COUNT, message: ccyValidMap.COUNT },
              ],
            })(
              <Input {...numberProps} addonAfter="笔" />,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleMonthCount} {...formItemLayout}>
          {
            getFieldDecorator('singleMonthCount', {
              initialValue: data.singleMonthCount ? amtMinUnitToStandUnit(data.singleMonthCount, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMonthCount) },
                { pattern: pattern.COUNT, message: ccyValidMap.COUNT },
              ],
            })(
              <Input {...numberProps} addonAfter="笔" />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="l3">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleMinAmt} {...formItemLayout}>
          {
            getFieldDecorator('singleMinAmt', {
              initialValue: data.singleMinAmt ? amtMinUnitToStandUnit(data.singleMinAmt, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMinAmt) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        <FormItem label={bizMap.singleMaxAmt} {...formItemLayout}>
          {
            getFieldDecorator('singleMaxAmt', {
              initialValue: data.singleMaxAmt ? amtMinUnitToStandUnit(data.singleMaxAmt, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.singleMaxAmt) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ];
  const advFeeVDom = [
    <Row key="f1">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.feeMode} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('feeMode', {
              initialValue: data.feeMode ? data.feeMode : '1',
              rules: [{ required: true, message: validMap.validFeeMode }],
              trigger: 'onBlur',
              validateFirst: true,
            })(
              <Select placeholder={commonMap.select}>
                <Option value="1">{bizMap['feeMode-1']}</Option>
                <Option value="2">{bizMap['feeMode-2']}</Option>
                <Option value="3">{bizMap['feeMode-3']}</Option>
              </Select>,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        <FormItem label={bizMap.minBill} {...formItemLayout}>
          {
            getFieldDecorator('minBill', {
              initialValue: data.minBill ? amtMinUnitToStandUnit(data.minBill, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.minBill) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="f2">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.debitCardRate} {...formItemLayout}>
          {
            getFieldDecorator('debitCardRate', {
              initialValue: data.debitCardRate,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.debitCardRate) },
                { pattern: pattern.PERCENT, message: ccyValidMap.PERCENT },
              ],
            })(
              <Input {...numberProps} addonAfter="%" />,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        <FormItem label={bizMap.debitCardTop} {...formItemLayout}>
          {
            getFieldDecorator('debitCardTop', {
              initialValue: data.debitCardTop ? amtMinUnitToStandUnit(data.debitCardTop, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.debitCardTop) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="f3">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.creditCardRate} {...formItemLayout}>
          {
            getFieldDecorator('creditCardRate', {
              initialValue: data.creditCardRate,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.creditCardRate) },
                { pattern: pattern.PERCENT, message: ccyValidMap.PERCENT },
              ],
            })(
              <Input {...numberProps} addonAfter="%" />,
            )
          }
        </FormItem>
      </Col>
      <Col sm={24} md={12}>
        <FormItem label={bizMap.creditCardTop} {...formItemLayout}>
          {
            getFieldDecorator('creditCardTop', {
              initialValue: data.creditCardTop ? amtMinUnitToStandUnit(data.creditCardTop, data.ccy) : 0,
              rules: [
                { required: true, message: ccyValidMap.REQUIRED.replace(/{\w}/, bizMap.creditCardTop) },
                { pattern: pattern.AMT, message: ccyValidMap.AMT },
              ],
            })(
              <Input {...numberProps} addonAfter={ccy} />,
            )
          }
        </FormItem>
      </Col>
    </Row >,
  ];

  const currencySupportItemsDom = txnChannelSupportList.map((k) => {
    let labeltext = ''
    switch (k.value) {
      case '0001':
        labeltext = bizMap['txnChannel-0001']
        break;
      case '0002':
        labeltext = bizMap['txnChannel-0002']
        break;
      case '0003':
        labeltext = bizMap['txnChannel-0003']
        break;
      default:
        labeltext = ''
        break;
    }
    return (
      <Row key={k.value}>
        <Col sm={24} md={12}>
          <FormItem {...formItemLayout} label={labeltext} key={k.value}>
            {
              getFieldDecorator(`txnChannel${k.value}`, {
                initialValue: data.txnCurrencySupport,
                rules: [{ required: true }],
              })(
                <Select placeholder={commonMap.select} multiple key={`s${k.value}`}>
                  {
                    currencyList.map((item, idx) => {
                      return <Option key={`${k}${idx}`} value={item.value}>{`${item.label}(${item.value})`}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
    );
  });

  const advGlobalDom = [
    <Row key="g1">
      <Col sm={24} md={12}>
        <FormItem label={bizMap.txnChannelSupport} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('txnChannelSupport', {
              initialValue: data.txnChannelSupport,
              rules: [{ required: true }],
            })(
              <Select placeholder={commonMap.select} onChange={handleGolbalChange}>
                {
                  txnChannelList.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.label}</Option>;
                  })
                }
              </Select>,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ];

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <Row>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnId', {
                  initialValue: data.chnName,
                  rules: [{ required: true, message: validMap.validChnName }],
                  trigger: 'onBlur',
                  validateFirst: true,
                })(
                  <Select placeholder={commonMap.select} onChange={getChnAuthInfo} disabled={optType === '2'}>
                    {options}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.chnMerNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerNo', {
                  initialValue: data.chnMerNo,
                  rules: [{ required: true, validator: chnMerNoValid }],
                  validateTrigger: 'onBlur',
                  validateFirst: true,
                })(
                  <Input placeholder={validMap.validChnMerNo} maxLength="15" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.chnMerName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerName', {
                  initialValue: data.chnMerName,
                })(
                  <Input placeholder={validMap.validChnMerName} maxLength="150" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.chnMerType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerType', {
                  initialValue: data.chnMerType ? data.chnMerType : '1',
                  rules: [{ required: true, message: validMap.validChnMerType }],
                  validateFirst: true,
                })(
                  <RadioGroup>
                    <Radio value="1">{bizMap['chnMerType-1']}</Radio>
                    <Radio value="2">{bizMap['chnMerType-2']}</Radio>
                  </RadioGroup>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {optType === '2' ? null : advTermVDom}
        <h4 className="split">&nbsp;</h4>
        {optType === '2' ? null :
          <Row>
            <Col sm={24} md={12}>
              <FormItem label={bizMap.pospayTxnSup} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('pospayTxnSup', {
                    initialValue: pospayTxnSup,
                  })(
                    <Input type="hidden" />,
                  )
                }
                <a onClick={() => { handleTxnSupClick(); }} >{bizMap.pospayTxnSup}</a>
              </FormItem>
            </Col>
          </Row>
        }
        <Row>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.areaCode} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaCode', {
                  initialValue: data.areaCode,
                })(
                  <Cascader placeholder={validMap.validAreaCode} options={cityDatas} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {optType === '2' ? null :
          <Row>
            <Col span={24}>
              <Col sm={14} md={8}>
                <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label={bizMap.txnTime}>
                  {
                    getFieldDecorator('txnTimeStr', {
                      initialValue: moment(data.txnTimeStr ? data.txnTimeStr : '06:00:00', format),
                      rules: [{ required: true, message: validMap.validTxnTimeStr }],
                      trigger: 'onBlur',
                      validateFirst: true,
                    })(
                      <TimePicker
                        format={format}
                      />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} hasFeedback>
                  {
                    getFieldDecorator('txnTimeEnd', {
                      initialValue: moment(data.txnTimeEnd ? data.txnTimeEnd : '23:00:00', format),
                      rules: [{ required: true, message: validMap.validTxnTimeEnd }],
                      trigger: 'onBlur',
                      validateFirst: true,
                    })(
                      <TimePicker
                        format={format}
                      />,
                    )
                  }
                </FormItem>
              </Col>
            </Col>
          </Row>
        }
        <Row>
          <Col sm={24} md={12}>
            <FormItem label={bizMap.stlMemTyp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlMemTyp', {
                  initialValue: data.stlMemTyp ? data.stlMemTyp : '0',
                  rules: [{ required: true }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="0">{bizMap['stlMemTyp-0']}</Option>
                    <Option value="1">{bizMap['stlMemTyp-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        {advGlobalDom}
        {currencySupportItemsDom}
        <h4 className="split">&nbsp;</h4>
        {advFeeVDom}
        <h4 className="split">&nbsp;</h4>
        {advLimitToggleVDom}
        {advExpand ? advLimitVDom : null}
        <h4 key="btn-split" className="split">&nbsp;</h4>
        <Row key="btn-row">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

MerchantBankcardApplyInfoForm.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.object,
  data: PropTypes.object,
  chnList: PropTypes.array,
  uuid: PropTypes.number,
  pospayTxnSup: PropTypes.string,
  getChnInfo: PropTypes.func,
  toggleTxnAuth: PropTypes.func,
  submiting: PropTypes.bool,
  checkChnMerNo: PropTypes.func,
  advLinkClick: PropTypes.func,
  advExpand: PropTypes.bool,
  chnMerNoChkMsg: PropTypes.string,
  optType: PropTypes.string,
  formSubmit: PropTypes.func,
  keys: PropTypes.array,
  txnChannelSupportList: PropTypes.array,
  changeTxnChannelList: PropTypes.func,
};

MerchantBankcardApplyInfoForm.defaultProps = {
  loading: false,
  style: {},
  data: {},
  chnList: [],
  uuid: 0,
  pospayTxnSup: '',
  getChnInfo: noop,
  toggleTxnAuth: noop,
  submiting: false,
  checkChnMerNo: noop,
  advLinkClick: noop,
  advExpand: false,
  chnMerNoChkMsg: '',
  optType: '1', // 1,添加 2,修改
  formSubmit: noop,
  keys: [],
  txnChannelSupportList: [],
  changeTxnChannelList: noop,
};

export default Form.create()(MerchantBankcardApplyInfoForm);

