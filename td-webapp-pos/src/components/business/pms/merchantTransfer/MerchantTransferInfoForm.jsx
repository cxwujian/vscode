import React, { PropTypes } from 'react';
import { Spin, Form, Row, Col, Select, Input, Button, InputNumber, Radio, Icon, Switch } from 'antd';
import * as i18n from '../../../../utils/i18n';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const noop = () => { };

const MerchantTransferInfoForm = (props) => {
  const bizMap = i18n.bizMap('pms/merchantTransfer');
  const validMap = i18n.bizMap('pms/merchantScancodeValid');
  const commonMap = i18n.commonMap();
  const {
    form,
    loading,
    advLinkClick,
    style,
    formSubmit,
    advExpand,
    data,
    chnList,
    submiting,
    qryChnMerInf,
    chnMerNoChkMsg,
    optType,
    getChnInfo,
    chnType,
    insideTransferStatus,
    outsideTransferStatus,
    handlerTransfer,

    

  } = props;
  const {
    validateFieldsAndScroll,
    getFieldsValue,
    resetFields,
    getFieldDecorator,
    setFieldsValue,
    getFieldValue,
  } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };
  const options = [];
  chnList.forEach((v) => {
    options.push(<Option key={v.chnId} value={v.chnId}>{v.chnName}</Option>);
  });

  getFieldDecorator('keys', {
    initialValue: [0],
  })
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (optType === '2') {
          dat.chnId = data.chnId;
        }
        formSubmit(dat);
        resetFields();
      }
    });
  };
  const getChnLinkInfo = (value) => {
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
      qryChnMerInf(datas);
      if (chnMerNoChkMsg) {
        callback(chnMerNoChkMsg);
      }
    } else if (value) {
      callback(validMap.validChnMerNo);
    }
    callback();
  };

  const advLimitToggleVDom = [
    <Row key="lt1">
      <Col span="12">
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
      <Col span="12">
        <FormItem label={bizMap.singleDayLimit} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleDayLimit', {
              initialValue: data.singleDayLimit ? data.singleDayLimit : '0',
            })(
              <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
            )
          }
        </FormItem>
      </Col>
     <Col span="12">
        <FormItem label={bizMap.singleDayCount} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleDayCount', {
              initialValue: data.singleMonthLimit ? data.singleMonthLimit : '0',
            })(
              <InputNumber maxLength="10" min={0} max={9999999999} style={{ width: '100%' }} />,
            )
          }
        </FormItem>
      </Col>
    </Row>,
    <Row key="l3">
      <Col span="12">
        <FormItem label={bizMap.singleMinAmt} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMinAmt', {
              initialValue: data.singleMinAmt ? data.singleMinAmt : '0',
            })(
              <InputNumber min={0} maxLength="12" max={999999999} style={{ width: '100%' }} step={0.1} />,
            )
          }
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label={bizMap.singleMaxAmt} {...formItemLayout} hasFeedback>
          {
            getFieldDecorator('singleMaxAmt', {
              initialValue: data.singleMaxAmt ? data.singleMaxAmt : '0',
            })(
              <InputNumber min={0} maxLength="13" max={999999999} style={{ width: '100%' }} step={0.1} />,
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
          <Col span="12">
            <FormItem label={bizMap.chnName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnId', {
                  initialValue: data.chnName,
                  rules: [{ required: true, message: validMap.validChnName }],
                  validateFirst: true,
                })(
                  <Select placeholder={commonMap.select} onChange={getChnLinkInfo} disabled={optType === '2'}>
                    {options}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Col span="12" style={{ display: 'none' }}>
          <FormItem label={bizMap.chnMerId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('chnMerId', {
                initialValue: data.chnMerId,
              })(
                <Input placeholder={validMap.validChnMerName} maxLength="150" disabled={optType === '2'} />,
              )
            }
          </FormItem>
        </Col>
        <Row key="b3">
          <Col span="12">
            <FormItem label={bizMap.chnMerNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('chnMerNo', {
                  initialValue: data.chnMerNo,
                  rules: [{ required: true }],
                })(
                  <Input placeholder={validMap.validChnMerNo} maxLength="150" disabled={optType === '2'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row key="b2">
          <Col span="12">
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
          <Col span="12">
            <FormItem label={bizMap.insideTransferStatus} {...formItemLayout} >
              {
                getFieldDecorator('insideTransferStatus', {
                  initialValue: data.insideTransferStatus,
                })(
                  <Switch
                    checkedChildren={'on'}
                    unCheckedChildren={'off'}
                    disabled={chnType === '0' || chnType === '2' ||data.chnType === '0' || data.chnType === '2'}
                    checked={data.insideTransferStatus }
                    onChange={() => handlerTransfer(Object.assign({}, { data }, { insideTransferStatus: !getFieldsValue().insideTransferStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" style={{ display: data.insideTransferStatus ? '' : 'none' }}>
            <FormItem label={bizMap.inChargeType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('inChargeType', {
                  initialValue: data.inChargeType ? data.inChargeType : '',
                  rules: [{ required: true }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="0">{bizMap['inChargeType-0']}</Option>
                    <Option value="1">{bizMap['inChargeType-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" style={{ display: getFieldsValue().inChargeType === '1'  ? '' : 'none' }}>
            <FormItem label={bizMap.inTxnRate} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('inTxnRate', {
                  initialValue: data.inTxnRate ? data.inTxnRate : 0,
                  rules: [{ required: true }],
                })(
                  <InputNumber placeholder={bizMap.inTxnRate} min={0} step={0.01} />,
                )
              }
            </FormItem>
          </Col>
          <Col span="12" style={{ display: getFieldsValue().inChargeType === '1' ? '' : 'none' }}>
            <FormItem label={bizMap.inAmtMax} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('inAmtMax', {
                  initialValue: data.inAmtMax ? data.inAmtMax : '0',
                })(
                  <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" style={{ display: getFieldsValue().inChargeType === '0'  ? '' : 'none' }}>
            <FormItem label={bizMap.inSingleAmt} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('inSingleAmt', {
                  initialValue: data.inSingleAmt ? data.inSingleAmt : '0',
                })(
                  <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row key="b4" >
         <Col span="12">
            <FormItem label={bizMap.outsideTransferStatus} {...formItemLayout} >
              {
                getFieldDecorator('outsideTransferStatus', {
                  initialValue: data.outsideTransferStatus,
                })(
                  <Switch
                    checkedChildren={'on'}
                    unCheckedChildren={'off'}
                    checked={data.outsideTransferStatus}
                    onChange={() => handlerTransfer(Object.assign({}, { data }, { outsideTransferStatus: !getFieldsValue().outsideTransferStatus }))}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" style={{ display: data.outsideTransferStatus ? '' : 'none' }}>
            <FormItem label={bizMap.outChargeType} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('outChargeType', {
                  initialValue: data.outChargeType ? data.outChargeType : '',
                  rules: [{ required: true }],
                })(
                  <Select placeholder={commonMap.select}>
                    <Option value="0">{bizMap['outChargeType-0']}</Option>
                    <Option value="1">{bizMap['outChargeType-1']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          </Row>
          <Row>
           <Col span="12" style={{ display: getFieldsValue().outChargeType === '1'  ? '' : 'none' }}>
            <FormItem label={bizMap.outTxnRate} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('outTxnRate', {
                  initialValue: data.outTxnRate ? data.outTxnRate : 0,
                  rules: [{ required: true }],
                })(
                  <InputNumber placeholder={bizMap.outTxnRate} min={0} step={0.01} />,
                )
              }
            </FormItem>
          </Col>
          <Col span="12" style={{ display: getFieldsValue().outChargeType === '1' ? '' : 'none' }}>
            <FormItem label={bizMap.outAmtMax} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('outAmtMax', {
                  initialValue: data.outAmtMax ? data.outAmtMax : '0',
                })(
                  <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
                )
              }
            </FormItem>
          </Col>
          </Row>
          <Row>
          <Col span="12" style={{ display: getFieldsValue().outChargeType === '0' ? '' : 'none' }}>
            <FormItem label={bizMap.outSingleAmt} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('outSingleAmt', {
                  initialValue: data.outSingleAmt ? data.outSingleAmt : '0',
                })(
                  <InputNumber maxLength="9" min={0} max={999999999} style={{ width: '100%' }} step={0.1} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 key="split" className="split">&nbsp;</h4>
        {advLimitToggleVDom}
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
};

MerchantTransferInfoForm.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.object,
  data: PropTypes.object,
  chnList: PropTypes.array,
  submiting: PropTypes.bool,

  qryChnMerInf: PropTypes.func,
  chnMerNoChkMsg: PropTypes.string,

  advLinkClick: PropTypes.func,
  advExpand: PropTypes.bool,

  formSubmit: PropTypes.func,

  optType: PropTypes.string,
  getChnInfo: PropTypes.func,
  chnType: PropTypes.string,
  insideTransferStatus: PropTypes.bool,
  outsideTransferStatus: PropTypes.bool,
  data: PropTypes.object,
  handlerTransfer: PropTypes.func,

};

MerchantTransferInfoForm.defaultProps = {
  loading: false,
  style: {},
  data: {},
  chnList: [],
  submiting: false,

  advExpand: false,
  advLinkClick: noop,

  qryChnMerInf: noop,
  chnMerNoChkMsg: '',

  formSubmit: noop,

  getChnInfo: noop,
  optType: '1', // 1,添加 2,修改
  chnType: '',  // 0,银联 1,银行，2第三方
  insideTransferStatus: false,
  outsideTransferStatus: false,
  data: {},
  handlerTransfer: noop

};

export default Form.create()(MerchantTransferInfoForm);

