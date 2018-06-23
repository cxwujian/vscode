import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Modal, InputNumber, Tabs } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import ChnInfQueryForm from '../../temp/chnInf/ChnInfQueryForm';
import ChnInfCallBackPageTable from '../../temp/chnInf/ChnInfCallBackPageTable';
import { standUnitToMinUnit } from '../../../../../utils/amount';

const TabPane = Tabs.TabPane;
const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const AccountFundsTransForm = (props) => {
  const bizMap = i18n.bizMap('cas/accFundsTrans');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, setFormFieldsValue,
    chnData, chnModalVisible, queryChnList, onCancelChnModel,
    cChnData, cChnModalVisible, cQueryChnList, cOnCancelChnModel,
    ccyOptionsData,
    tabsGroupsData, handleTabsChange } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.fundsTransAmt) {
          dat.fundsTransAmt = standUnitToMinUnit(dat.fundsTransAmt, dat.ccy);
        }
        let subject = {};
        let chnOrg = {};
        if (dat.dSubject) {
          subject = dat.dSubject;
          dat.dSubject = subject.split('-')[0];
          dat.dSubjectNme = subject.split('-')[1];
        }
        if (dat.dChnOrgCod) {
          chnOrg = dat.dChnOrgCod;
          dat.dChnOrgCod = chnOrg.split('-')[0];
          dat.dChnOrgName = chnOrg.split('-')[1];
        }
        if (dat.cSubject) {
          subject = dat.cSubject;
          dat.cSubject = subject.split('-')[0];
          dat.cSubjectNme = subject.split('-')[1];
        }
        if (dat.cChnOrgCod) {
          chnOrg = dat.cChnOrgCod;
          dat.cChnOrgCod = chnOrg.split('-')[0];
          dat.cChnOrgName = chnOrg.split('-')[1];
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
  const handQueryChnList = () => {
    const data = {};
    if (getFieldsValue().dSubject.split('-')[0] === '112202') {
      if (getFieldsValue().extCod === 'transChnSettle') {
        data.isFund = '00';
      } else if (getFieldsValue().extCod === 'fundsTransfer') {
        data.isFund = '01';
      }
    }
    data.currentPage = 1;
    data.isFirst = true;
    queryChnList(data);
  }
  const chnQueryFormProps = {
    formSubmit: (dat) => {
      const data = dat;
      if (getFieldsValue().dSubject.split('-')[0] === '112202') {
        if (getFieldsValue().extCod === 'transChnSettle') {
          data.isFund = '00';
        } else if (getFieldsValue().extCod === 'fundsTransfer') {
          data.isFund = '01';
        }
      }
      data.currentPage = 1;
      queryChnList(data);
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
      if (getFieldsValue().dSubject.split('-')[0] === '112202') {
        if (getFieldsValue().extCod === 'transChnSettle') {
          param.isFund = '00';
        } else if (getFieldsValue().extCod === 'fundsTransfer') {
          param.isFund = '01';
        }
      }
      queryChnList(param);
    },
    rowClickCallback(data) {
      setFieldsValue({ dChnOrgCod: `${data.chnOrgCod}-${data.chnOrgName}` });
      onCancelChnModel();
    },
  };

  const cHandQueryChnList = () => {
    const data = {};
    if (getFieldsValue().cSubject.split('-')[0] === '112202') {
      if (getFieldsValue().extCod === 'transChnSettle' || getFieldsValue().extCod === 'fundsTransfer') {
        data.isFund = '01';
      }
    }
    data.currentPage = 1;
    data.isFirst = true;
    cQueryChnList(data);
  }
  const cChnQueryFormProps = {
    formSubmit: (dat) => {
      const data = dat;
      if (getFieldsValue().cSubject.split('-')[0] === '112202') {
        if (getFieldsValue().extCod === 'transChnSettle' || getFieldsValue().extCod === 'fundsTransfer') {
          data.isFund = '01';
        }
      }
      data.currentPage = 1;
      cQueryChnList(data);
    },
  };
  const cChnInfoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.chnQueryList,
    visible: cChnModalVisible,
    onCancel: () => {
      cOnCancelChnModel();
    },
  };
  const cChnTableProps = {
    tableCurrentPage: cChnData.tableCurrentPage,
    tableList: cChnData.tableList,
    tableTotal: cChnData.tableTotal,
    tableLoading: cChnData.tableLoading,
    tablePageChange(next) {
      const param = cChnData.tableParam;
      param.currentPage = next;
      if (getFieldsValue().cSubject.split('-')[0] === '112202') {
        if (getFieldsValue().extCod === 'transChnSettle' || getFieldsValue().extCod === 'fundsTransfer') {
          param.isFund = '01';
        }
      }
      cQueryChnList(param);
    },
    rowClickCallback(data) {
      setFieldsValue({ cChnOrgCod: `${data.chnOrgCod}-${data.chnOrgName}` });
      cOnCancelChnModel();
    },
  };

  const fundsTransAmtValidate = (rule, value, callback) => {
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
      callback(bizMap.validfundsTransAmt);
      return;
    }
    callback();
  }
  const dAccTypOnSelect = (value) => {
    let dimprCd = '';
    if (value === '1' || value === '4') {
      dimprCd = 'ADD';
    } else if (value === '2' || value === '3') {
      dimprCd = 'SUB';
    }
    setFieldsValue({ dimprCd: dimprCd })
  }

  const cAccTypOnSelect = (value) => {
    let cimprCd = '';
    if (value === '1' || value === '4') {
      cimprCd = 'SUB';
    } else if (value === '2' || value === '3') {
      cimprCd = 'ADD';
    }
    setFieldsValue({ cimprCd: cimprCd })
  }
  const tabsChange = (key, tab) => {
    setFieldsValue({ extCod: key, extDesc: tab });
    handleTabsChange(key);
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={24}>
            <Tabs type="card" onChange={tabsChange} defaultActiveKey={'chnFeeDeduction'} >
              {
                tabsGroupsData.map((tabsGroup) => {
                  return <TabPane tab={tabsGroup.extDesc} key={tabsGroup.extCod} />;
                })
              }
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <div style={{ margin: '0 auto', color: '#5C5C5C', width: 200, height: 50, fontSize: 16, fontWeight: '600' }}>{bizMap.debit}</div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.accTyp} {...formItemLayout} required>
                  {
                    getFieldDecorator('dAccTyp', {
                      initialValue: data && data.SUBJECT_D ? data.SUBJECT_D.accTyp : '',
                      rules: [{ required: true, message: bizMap.validDaccTyp }],
                    })(
                      <Select onSelect={value => dAccTypOnSelect(value)} disabled >
                        <Option value="">&nbsp;</Option>
                        <Option value="1">{bizMap['accTyp-1']}</Option>
                        <Option value="2">{bizMap['accTyp-2']}</Option>
                        <Option value="3">{bizMap['accTyp-3']}</Option>
                        <Option value="4">{bizMap['accTyp-4']}</Option>
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.subject} {...formItemLayout} >
                  {
                    getFieldDecorator('dSubject', {
                      initialValue: data && data.SUBJECT_D ? `${data.SUBJECT_D.subject}-${data.SUBJECT_D.subjectNme}` : '',
                      rules: [{ required: true, message: bizMap.validDsubject }],
                    })(
                      <Input placeholder={bizMap.subject} disabled />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              {
                data && data.SUBJECT_D && data.SUBJECT_D.subTyp === 'CHN' ?
                  <Col span={24}>
                    <FormItem label={bizMap.chnOrgCod} {...formItemLayout} >
                      {
                        getFieldDecorator('dChnOrgCod', {
                          initialValue: data.dChnOrgCod,
                          rules: [{ required: true, message: bizMap.validDChnOrgCod }],
                        })(
                          <Input placeholder={bizMap.chnOrgCod} onClick={handQueryChnList} readOnly="true" />,
                        )
                      }
                    </FormItem>
                  </Col>
                  :
                  null
              }
            </Row>
            {chnModalVisible
              ? <Modal {...chnInfoModalProps}>
                <ChnInfQueryForm {...chnQueryFormProps} />
                <ChnInfCallBackPageTable {...chnTableProps} />
              </Modal>
              : null
            }
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.adjustDirection} {...formItemLayout} required>
                  {
                    getFieldDecorator('dimprCd', {
                      initialValue: data && data.SUBJECT_D ? data.SUBJECT_D.adjustDirection : '',
                    })(
                      <Select disabled >
                        <Option value="">&nbsp;</Option>
                        <Option value="ADD">{bizMap['adjustDirection-ADD']}</Option>
                        <Option value="SUB">{bizMap['adjustDirection-SUB']}</Option>
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <div style={{ margin: '0 auto', color: '#5C5C5C', width: 200, height: 50, fontSize: 16, fontWeight: '600' }}>{bizMap.credit}</div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.accTyp} {...formItemLayout2} required>
                  {
                    getFieldDecorator('cAccTyp', {
                      initialValue: data && data.SUBJECT_C ? data.SUBJECT_C.accTyp : '',
                      rules: [{ required: true, message: bizMap.validCaccTyp }],
                    })(
                      <Select onSelect={value => cAccTypOnSelect(value)} disabled >
                        <Option value="">&nbsp;</Option>
                        <Option value="1">{bizMap['accTyp-1']}</Option>
                        <Option value="2">{bizMap['accTyp-2']}</Option>
                        <Option value="3">{bizMap['accTyp-3']}</Option>
                        <Option value="4">{bizMap['accTyp-4']}</Option>
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.subject} {...formItemLayout2} >
                  {
                    getFieldDecorator('cSubject', {
                      initialValue: data && data.SUBJECT_C ? `${data.SUBJECT_C.subject}-${data.SUBJECT_C.subjectNme}` : '',
                      rules: [{ required: true, message: bizMap.validCSubject }],
                    })(
                      <Input placeholder={bizMap.subject} disabled />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              {
                data && data.SUBJECT_C && data.SUBJECT_C.subTyp === 'CHN' ?
                  <Col span={24}>
                    <FormItem label={bizMap.chnOrgCod} {...formItemLayout2} >
                      {
                        getFieldDecorator('cChnOrgCod', {
                          initialValue: data.cChnOrgCod,
                          rules: [{ required: true, message: bizMap.validCChnOrgCod }],
                        })(
                          <Input placeholder={bizMap.chnOrgCod} onClick={cHandQueryChnList} readOnly="true" />,
                        )
                      }
                    </FormItem>
                  </Col>
                  :
                  null
              }
            </Row>
            {cChnModalVisible
              ? <Modal {...cChnInfoModalProps}>
                <ChnInfQueryForm {...cChnQueryFormProps} />
                <ChnInfCallBackPageTable {...cChnTableProps} />
              </Modal>
              : null
            }
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.adjustDirection} {...formItemLayout2} required>
                  {
                    getFieldDecorator('cimprCd', {
                      initialValue: data && data.SUBJECT_C ? data.SUBJECT_C.adjustDirection : '',
                    })(
                      <Select disabled >
                        <Option value="">&nbsp;</Option>
                        <Option value="ADD">{bizMap['adjustDirection-ADD']}</Option>
                        <Option value="SUB">{bizMap['adjustDirection-SUB']}</Option>
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.fundsTransAmt} {...formItemLayout} required >
              {
                getFieldDecorator('fundsTransAmt', {
                  initialValue: data.fundsTransAmt,
                  validate: [{
                    rules: [
                      { validator: fundsTransAmtValidate },
                    ], trigger: 'onBlur',
                  }],
                })(
                  <InputNumber placeholder={bizMap.fundsTransAmt} style={{ width: '100%' }} min={0} step={0.01} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.ccy} {...formItemLayout2} required>
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
        <Row>
          <Col span={12}>
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
            getFieldDecorator('extCod', {
              initialValue: tabsGroupsData && tabsGroupsData.length > 0 ? tabsGroupsData[0].extCod : '',
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('extDesc', {
              initialValue: tabsGroupsData && tabsGroupsData.length > 0 ? tabsGroupsData[0].extDesc : '',
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

AccountFundsTransForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  setFormFieldsValue: PropTypes.func,
  ccyOptionsData: PropTypes.array,
  chnData: PropTypes.object,
  chnModalVisible: PropTypes.bool,
  queryChnList: PropTypes.func,
  onCancelChnModel: PropTypes.func,
  cChnData: PropTypes.object,
  cChnModalVisible: PropTypes.bool,
  cQueryChnList: PropTypes.func,
  cOnCancelChnModel: PropTypes.func,
  tabsGroupsData: PropTypes.array,
  handleTabsChange: PropTypes.func,
};

AccountFundsTransForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  chnData: {},
  chnModalVisible: false,
  queryChnList: noop,
  onCancelChnModel: noop,
  cChnData: {},
  cChnModalVisible: false,
  cQueryChnList: noop,
  cOnCancelChnModel: noop,
  setFormFieldsValue: noop,
  ccyOptionsData: [],
  tabsGroupsData: [],
  handleTabsChange: noop,
}

export default Form.create()(AccountFundsTransForm);
