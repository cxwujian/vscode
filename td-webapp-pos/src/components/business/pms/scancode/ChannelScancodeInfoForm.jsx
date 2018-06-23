import React, { PropTypes } from 'react';
import moment from 'moment';
import { Form, Input, Button, Row, Col, Spin, Select, TimePicker, Icon, InputNumber } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { codeValid, mobileValid, phoneValid } from '../../../../utils/vaild';
import currencyList from '../../../../../config/i18n/zh-cn/currency.json';
import * as pattern from '../../../../utils/pattern';
import { standUnitToMinUnit, amtMinUnitToStandUnit } from '../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const channelScancodeInfoForm = (props) => {
  const {
    form, data, style, loading, submiting, formSubmit, advLinkClick, advExpand, getChnInfo, bankList, bankNo, optType,
   } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;

  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('pms/channelScancode');
  const commonMap = i18n.commonMap();
  const validMap = i18n.bizMap('pms/channelScancodeValid');
  const ccyValidMap = i18n.bizMap('pattern');
  const ccyMap = i18n.bizMap('currencyMap');
  const ccy = ccyMap[data.ccy] || ccyMap.DEFAULT;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const numberProps = {
    style: { width: '100%' },
    min: 0,
    step: 0.01,
  }

  const format = 'HH:mm';
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (typeof (dat.scanType) !== 'string') {
          dat.scanType = dat.scanType.join(',');
        }
        if (dat.dayCutTim._i) {
          dat.dayCutTim = dat.dayCutTim._i;
        }
        if (dat.txnChannelSupport) {
          dat.txnChannelSupport = dat.txnChannelSupport.toString();
        }
        if (dat.currencySupport) {
          dat.currencySupport = dat.currencySupport.toString();
        }
        dat.singleDayLimit = standUnitToMinUnit(dat.singleDayLimit, data.ccy);
        dat.singleMonthLimit = standUnitToMinUnit(dat.singleMonthLimit, data.ccy);
        dat.singleMaxAmt = standUnitToMinUnit(dat.singleMaxAmt, data.ccy);
        dat.singleMinAmt = standUnitToMinUnit(dat.singleMinAmt, data.ccy);
        formSubmit(dat);
        resetFields();
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const newArray = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledHours = () => {
    const hours = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    return hours;
  };

  const disabledMinutes = (h) => {
    if (h === 1) {
      return newArray(1, 60);
    } else if (h === 23 || h === 0) {
      return [];
    }
    return [];
  };

  const getChnLinkInfo = (value) => {
    if (value) {
      for (let i = 0; i < bankList.length; i++) {
        if (value === bankList[i].bankName) {
          getChnInfo(bankList[i]);
        }
      }
    }
  };

  const options = [];
  bankList.forEach((v) => {
    options.push(<Option key={v.bankNo} value={v.bankName}>{v.bankName}</Option>);
  });

  const handlerDatePickerChange = (value, dateString) => {
    setFieldsValue({ dayCutTim: dateString });
  };

  let chnNameValue = ''
  if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '0') {
    chnNameValue = '微信'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '1') {
    chnNameValue = '支付宝'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '2') {
    chnNameValue = '百度'
  } else {
    chnNameValue = data.chnName
  }

  let chnAliasValue = ''
  if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '0') {
    chnAliasValue = 'wechat'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '1') {
    chnAliasValue = 'alipay'
  } else if (getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' && getFieldsValue().scanType === '2') {
    chnAliasValue = 'baidu'
  } else {
    chnAliasValue = data.chnAlias
  }


  const advLimitVDom = [
    <Row key="s1">
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
    <Row key="s2">
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
  ];

  const getTxnChannelList = [
    // { value: '0001', label: '银联（UnionPay）' },
    // { value: '0002', label: 'Visa' },
    // { value: '0003', label: 'MasterCard' },
    { value: '1011', label: '支付宝' },
    { value: '1012', label: '微信' },
  ]

  const advGlobalDom = [
    <Row key="ct1">
      <Col span={12}>
        <FormItem label={bizMap.txnChannelSupport} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('txnChannelSupport', {
              initialValue: data.txnChannelSupport,
              rules: [{ required: true }],
            })(
              <Select placeholder={commonMap.select} multiple>
                {
                  getTxnChannelList.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.label}</Option>;
                  })
                }
              </Select>,
            )
          }
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem label={bizMap.currencySupport} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('currencySupport', {
              initialValue: data.currencySupport,
              rules: [{ required: true }],
            })(
              <Select placeholder={commonMap.select} multiple>
                {
                  currencyList.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.label}({item.value})</Option>;
                  })
                }
              </Select>,
            )
          }
        </FormItem>
      </Col>
    </Row>,
  ]

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
        <div hidden="true">
          <FormItem label={bizMap.chnId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('chnId', {
                initialValue: data.chnId,
              })(
                <Input placeholder={bizMap.chnId} disabled />,
              )
            }
          </FormItem>
        </div>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnType', {
                  initialValue: data.chnType,
                  rules: [{ required: true, message: validMap.validChnType }],
                })(
                  <Select placeholder={commonMap.select} disabled={optType === '2'}>
                    <Option value="0">{bizMap['chnType-0']}</Option>
                    <Option value="1">{bizMap['chnType-1']}</Option>
                    <Option value="2">{bizMap['chnType-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ display: getFieldsValue().chnType === '1' ? '' : 'none' }}>
            <FormItem label={bizMap.bankRelNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankRelNo', {
                  initialValue: bankNo === '' ? data.bankRelNo : bankNo,
                })(
                  <Input placeholder={validMap.validBankRelNo} disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ display: getFieldsValue().chnType === '2' ? '' : 'none' }}>
            <FormItem label={bizMap.chnCertNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnCertNo', {
                  initialValue: data.chnCertNo,
                })(
                  <Input placeholder={validMap.validChnCertNo} disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ display: getFieldsValue().chnType === '1' ? 'none' : '' }}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnName', {
                  initialValue: chnNameValue,
                  rules: [{ required: true, message: validMap.validChnName }],
                })(
                  <Input placeholder={bizMap.chnName} disabled={optType === '2' || chnNameValue === '微信' || chnNameValue === '支付宝' || chnNameValue === '百度'} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ display: getFieldsValue().chnType === '1' ? '' : 'none' }}>
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnName', {
                  initialValue: data.chnName,
                  rules: [{ required: true, message: validMap.vaildChnName }],
                })(
                  <Select
                    onChange={getChnLinkInfo}
                    showSearch
                  >
                    {options}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.chnAlias} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnAlias', {
                  initialValue: chnAliasValue,
                  rules: [{ required: true, message: validMap['validChnAlias-1'] }, { validator: codeValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap['validChnAlias-0']} disabled={optType === '2' || chnNameValue === '微信' || chnNameValue === '支付宝' || chnNameValue === '百度'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ display: getFieldsValue().chnType === '2' ? '' : 'none' }}>
            <FormItem label={bizMap.linkType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('linkType', {
                  initialValue: data.linkType ? data.linkType : '1',
                  rules: [{ required: true }],
                })(
                  <Select>
                    <Option value="0">{bizMap['linkType-0']}</Option>
                    <Option value="1">{bizMap['linkType-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12} >
            <FormItem {...formItemLayout} label={bizMap.scanType} hasFeedback >
              {
                getFieldDecorator('scanType', {
                  initialValue: data.scanType,
                  rules: [{ required: true, message: validMap.validChnType }],
                })(
                  <Select
                    placeholder={commonMap.select}
                    mode={getFieldsValue().chnType === '2' && getFieldsValue().linkType === '0' ? '' : 'multiple'}
                  >
                    <Option value="0">{bizMap['scanType-0']}</Option>
                    <Option value="1">{bizMap['scanType-1']}</Option>
                    <Option value="2">{bizMap['scanType-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.dayCutTim} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('dayCutTim', {
                  initialValue: moment(data.dayCutTim ? data.dayCutTim : '23:00', format),
                  rules: [{ required: true }],
                })(
                  <TimePicker
                    format={format}
                    onChange={handlerDatePickerChange}
                    disabledHours={disabledHours}
                    disabledMinutes={disabledMinutes}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.needCheck} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('needCheck', {
                  initialValue: data.needCheck ? data.needCheck : '0',
                  rules: [{ required: true }],
                })(
                  <Select>
                    <Option value="0">{commonMap['check-0']}</Option>
                    <Option value="1">{commonMap['check-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.hessianUrl} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('hessianUrl', {
                  initialValue: data.hessianUrl,
                  rules: [{ required: true, message: validMap.validHessianUrl }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validHessianUrl} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        {advGlobalDom}
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnConter} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnConter', {
                  initialValue: data.chnConter,
                  rules: [{ required: true, message: validMap.validChnConter }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validChnConter} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.chnMobile} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMobile', {
                  initialValue: data.chnMobile,
                  rules: [{ required: true, message: validMap.validChnMobile }, { validator: mobileValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validChnMobile} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.chnPhone} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnPhone', {
                  initialValue: data.chnPhone,
                  rules: [{ validator: phoneValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={validMap.validChnPhone} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnAddr} {...formItemLayout2} hasFeedback>
              {
                getFieldDecorator('chnAddr', {
                  initialValue: data.chnAddr,
                })(
                  <Input type="textarea" placeholder={validMap.validChnAddr} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.limitInfo} {...formItemLayout} hasFeedback>
              <a
                onClick={() => {
                  const dat = getFieldsValue();
                  advLinkClick(dat);
                }}
              >
                {advExpand ? bizMap['limitInfo-0'] : bizMap['limitInfo-1']}
                &nbsp;
                <Icon type={advExpand ? 'caret-up' : 'caret-down'} />
              </a>
            </FormItem>
          </Col>
        </Row>
        {advExpand ? advLimitVDom : null}
        <h4 key="btn-split" className="split">&nbsp;</h4>
        <Row key="btn-row">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            {/*<Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>*/}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

channelScancodeInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  advLinkClick: PropTypes.func,
  advExpand: PropTypes.bool,
  getChnInfo: PropTypes.func,
  optType: PropTypes.string,
  bankList: PropTypes.array,
  bankNo: PropTypes.string,
};

channelScancodeInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  advLinkClick: noop,
  advExpand: false,
  getChnInfo: noop,
  optType: '1', // 1,添加 2,修改
  bankList: [],
  bankNo: '',
};

export default Form.create()(channelScancodeInfoForm);
