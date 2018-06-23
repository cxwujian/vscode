import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Modal, InputNumber } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import CusInfQueryForm from '../../temp/cusInf/CusInfQueryForm';
import CusCateInfCallBackPageTable from '../../temp/cusInf/CusCateInfCallBackPageTable';
import ChnInfQueryForm from '../../temp/chnInf/ChnInfQueryForm';
import ChnInfCallBackPageTable from '../../temp/chnInf/ChnInfCallBackPageTable';
import { standUnitToMinUnit } from '../../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const AccountRechargeForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/accRecharge');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, setFormFieldsValue,
    cusModalVisible, queryCusList, onCancelCusModel, cusData,
    chnData, chnModalVisible, queryChnList, onCancelChnModel,
    ccyOptionsData, extCodOptionsData, expandedRowsChange } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  const formItemLayout1 = {
    labelCol: { span: 12 },
    wrapperCol: { span: 8 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.rechargeAmt) {
          dat.rechargeAmt = standUnitToMinUnit(dat.rechargeAmt, dat.ccy);
        }
        if (dat.cusNo) {
          const cus = dat.cusNo;
          dat.cusNo = cus.split('-')[0];
          dat.cusNme = cus.split('-')[1];
        }
        if (dat.chnOrgCod) {
          const chnOrg = dat.chnOrgCod;
          dat.chnOrgCod = chnOrg.split('-')[0];
          dat.chnOrgName = chnOrg.split('-')[1];
        }
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
    const dat = {};
    setFormFieldsValue(dat)
  }
  const handQueryCusList = () => {
    const dat = getFieldsValue();
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.cusSts = '00';
    data.cusTyp = dat.extCod ? (dat.extCod.indexOf('usr') > -1 ? 'usr' : (dat.extCod.indexOf('mer') > -1 ? 'mer' : '')) : '';
    data.extCod = dat.extCod;
    queryCusList(dat, data);
  }
  const cusQueryFormProps = {
    cusTyp: getFieldsValue().extCod ? (getFieldsValue().extCod.indexOf('usr') > -1 ? 'usr' : (getFieldsValue().extCod.indexOf('mer') > -1 ? 'mer' : '')) : '',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.cusSts = '00';
      data.extCod = getFieldsValue().extCod;
      queryCusList(getFieldsValue(), data);
    },
  };
  const cusInfoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.cusQueryList,
    visible: cusModalVisible,
    onCancel: () => {
      onCancelCusModel();
    },
  };
  const cusTableProps = {
    tableCurrentPage: cusData.tableCurrentPage,
    tableList: cusData.tableList,
    tableTotal: cusData.tableTotal,
    tableLoading: cusData.tableLoading,
    expandedRowKeys: cusData.expandedRowKeys,
    tablePageChange(next) {
      const dat = getFieldsValue();
      const param = cusData.tableParam;
      param.currentPage = next;
      data.cusSts = '00';
      data.cusTyp = dat.extCod ? (dat.extCod.indexOf('usr') > -1 ? 'usr' : (dat.extCod.indexOf('mer') > -1 ? 'mer' : '')) : '';
      data.extCod = dat.extCod;
      queryCusList(dat, param);
    },
    rowClickCallback(data) {
      const dat = getFieldsValue();
      dat.cusNo = `${data.cusNo}-${data.cusNme}`;
      dat.cateId1 = data.cateId1;
      dat.subAccNo1 = data.subAccNo1;
      dat.cateId2 = data.cateId2;
      dat.subAccNo2 = data.subAccNo2;
      dat.cateId3 = data.cateId3;
      dat.subAccNo3 = data.subAccNo3;
      setFormFieldsValue(dat)
      onCancelCusModel();
    },
    expandedRowsChange(expandedRows) {
      expandedRowsChange(expandedRows);
    },
  };
  const handQueryChnList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    queryChnList(getFieldsValue(), data);
  }
  const chnQueryFormProps = {
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      queryChnList(getFieldsValue(), data);
    },
  };
  const chnInfoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.chnQueryList,
    visible: chnModalVisible,
    onCancel: () => {
      onCancelChnModel();
    },
  };
  const chnTableProps = {
    tableCurrentPage: chnData.tableCurrentPage,
    tableList: chnData.tableList,
    tableTotal: chnData.tableTotal,
    tableLoading: chnData.tableLoading,
    tablePageChange(next) {
      const param = chnData.tableParam;
      param.currentPage = next;
      queryChnList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      const dat = getFieldsValue();
      dat.chnOrgCod = `${data.chnOrgCod}-${data.chnOrgName}`;
      setFormFieldsValue(dat)
      onCancelChnModel();
    },
  };

  const rechargeAmtValidate = (rule, value, callback) => {
    if (value) {
      if (value < 0) {
        callback(commonMap.amtL0);
        return;
      }
      if (value) {
        if (value.length > 10) {
          callback(commonMap.amtLengthG10);
          return;
        }
        const num = value.split('.');
        if (num && num.length === 2 && num[1].length > 2) {
          callback(commonMap.amtDecimalLengthG2);
          return;
        }
      }
    } else {
      callback(bizMap.validRechargeAmt);
      return;
    }
    callback();
  }
  const extCodOnSelect = (value, option) => {
    setFieldsValue({ extDesc: option.props.children.split('-')[1] })
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.rechargeType} {...formItemLayout} required>
              {
                getFieldDecorator('extCod', {
                  initialValue: data.extCod,
                  rules: [{ required: true, message: bizMap.validExtCod }],
                })(
                  <Select onSelect={(value, option) => extCodOnSelect(value, option)}>
                    <Option value="">&nbsp;</Option>
                    {
                      extCodOptionsData.map((extCodOption, idx) => {
                        return <Option key={idx} value={extCodOption.extCod}>{`${extCodOption.extCod}-${extCodOption.extDesc}`}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.ccy} {...formItemLayout} required>
              {
                getFieldDecorator('ccy', {
                  initialValue: data.ccy,
                  rules: [{ required: true, message: bizMap.validCcy }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    {
                      ccyOptionsData.map((ccyOption, idx) => {
                        return <Option key={idx} value={ccyOption.ccy}>{`${ccyOption.ccy}-${ccyOption.ccyExplain}`}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          getFieldsValue().extCod === 'platAdvanceDeposit' ? null
            :
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.cusNo} {...formItemLayout} >
                  {
                    getFieldDecorator('cusNo', {
                      initialValue: data.cusNo,
                      rules: [{ required: true, message: bizMap.validCusNo }],
                    })(
                      <Input placeholder={bizMap.cusNo} onClick={getFieldsValue().extCod ? handQueryCusList : noop} readOnly="true" disabled={type === 'update'} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
        }

        {cusModalVisible
          ? <Row>
            <Modal {...cusInfoModalProps}>
              <CusInfQueryForm {...cusQueryFormProps} />
              <CusCateInfCallBackPageTable {...cusTableProps} />
            </Modal>
          </Row>
          : null
        }
        {
          data.cateId1 ?
            <div>
              <Row key={1}>
                <Col span={12}>
                  <FormItem label={bizMap.cateId1} {...formItemLayout1} >
                    {
                      getFieldDecorator('cateId1', {
                        initialValue: data.cateId1,
                      })(
                        <Input placeholder={bizMap.cateId1} disabled />,
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label={bizMap.subAccNo1} {...formItemLayout2} >
                    {
                      getFieldDecorator('subAccNo1', {
                        initialValue: data.subAccNo1,
                      })(
                        <Input placeholder={bizMap.subAccNo1} disabled />,
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </div>
            :
            ''
        }
        {
          data.cateId2 ?
            <div>
              <Row key={1}>
                <Col span={12}>
                  <FormItem label={bizMap.cateId2} {...formItemLayout1} >
                    {
                      getFieldDecorator('cateId2', {
                        initialValue: data.cateId2,
                      })(
                        <Input placeholder={bizMap.cateId2} disabled />,
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label={bizMap.subAccNo2} {...formItemLayout2} hasFeedback>
                    {
                      getFieldDecorator('subAccNo2', {
                        initialValue: data.subAccNo2,
                      })(
                        <Input placeholder={bizMap.subAccNo2} disabled />,
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </div>
            :
            ''
        }
        {
          data.cateId3 ?
            <div>
              <Row key={1}>
                <Col span={12}>
                  <FormItem label={bizMap.cateId3} {...formItemLayout1} hasFeedback>
                    {
                      getFieldDecorator('cateId3', {
                        initialValue: data.cateId3,
                      })(
                        <Input placeholder={bizMap.cateId3} disabled />,
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label={bizMap.subAccNo3} {...formItemLayout2} hasFeedback>
                    {
                      getFieldDecorator('subAccNo3', {
                        initialValue: data.subAccNo3,
                      })(
                        <Input placeholder={bizMap.subAccNo3} disabled />,
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </div>
            :
            ''
        }

        <Row>
          <Col span={24}>
            <FormItem label={bizMap.chnOrgCod} {...formItemLayout} >
              {
                getFieldDecorator('chnOrgCod', {
                  initialValue: data.chnOrgCod,
                  rules: [{ required: true, message: bizMap.validChnOrgCod }],
                })(
                  <Input placeholder={bizMap.chnOrgCod} onClick={handQueryChnList} readOnly="true" disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {chnModalVisible
          ? <Row>
            <Modal {...chnInfoModalProps}>
              <ChnInfQueryForm {...chnQueryFormProps} />
              <ChnInfCallBackPageTable {...chnTableProps} />
            </Modal>
          </Row>
          : null
        }
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.rechargeAmt} {...formItemLayout} required >
              {
                getFieldDecorator('rechargeAmt', {
                  initialValue: data.rechargeAmt,
                  validate: [{
                    rules: [
                      { validator: rechargeAmtValidate },
                    ], trigger: 'onBlur',
                  }],
                })(
                  <InputNumber placeholder={bizMap.rechargeAmt} style={{ width: '100%' }} min={0} step={0.01} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.remark} {...formItemLayout} >
              {
                getFieldDecorator('remark', {
                  initialValue: data.remark,
                })(
                  <Input type="textarea" rows="4" placeholder={bizMap.remark} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <div hidden>
          {
            getFieldDecorator('extDesc', {
              initialValue: data.extDesc,
            })(
              <Input />,
            )
          }
        </div>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

AccountRechargeForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  cusData: PropTypes.object,
  cusModalVisible: PropTypes.bool,
  queryCusList: PropTypes.func,
  onCancelCusModel: PropTypes.func,
  chnData: PropTypes.object,
  chnModalVisible: PropTypes.bool,
  queryChnList: PropTypes.func,
  onCancelChnModel: PropTypes.func,
  setFormFieldsValue: PropTypes.func,
  ccyOptionsData: PropTypes.array,
  extCodOptionsData: PropTypes.array,
  expandedRowsChange: PropTypes.func,
};

AccountRechargeForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  cusData: {},
  cusModalVisible: false,
  queryCusList: noop,
  onCancelCusModel: noop,
  chnData: {},
  chnModalVisible: false,
  queryChnList: noop,
  onCancelChnModel: noop,
  setFormFieldsValue: noop,
  ccyOptionsData: [],
  extCodOptionsData: [],
  expandedRowsChange: noop,
}

export default Form.create()(AccountRechargeForm);
