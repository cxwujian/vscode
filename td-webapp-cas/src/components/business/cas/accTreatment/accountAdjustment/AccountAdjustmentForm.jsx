import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Modal, InputNumber } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import SubjectCodeQueryForm from '../../temp/subject/SubjectCodeQueryForm';
import SubjectCallBackPageTable from '../../temp/subject/SubjectCallBackPageTable';
import CusInfQueryForm from '../../temp/cusInf/CusInfQueryForm';
import CusCateInfCallBackPageTable from '../../temp/cusInf/CusCateInfCallBackPageTable';
import ChnInfQueryForm from '../../temp/chnInf/ChnInfQueryForm';
import ChnInfCallBackPageTable from '../../temp/chnInf/ChnInfCallBackPageTable';
import { standUnitToMinUnit } from '../../../../../utils/amount';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const AccountAdjustmentForm = (props) => {
  const bizMap = i18n.bizMap('cas/accAdjustment');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, setFormFieldsValue,
    subjectModalVisible, querySubjectList, onCancelSubjectModel, subjectData,
    cusModalVisible, queryCusList, onCancelCusModel, cusData,
    cSubjectModalVisible, cQuerySubjectList, cOnCancelSubjectModel, cSubjectData,
    cCusModalVisible, cQueryCusList, cOnCancelCusModel, cCusData,
    chnData, chnModalVisible, queryChnList, onCancelChnModel,
    cChnData, cChnModalVisible, cQueryChnList, cOnCancelChnModel,
    ccyOptionsData, cExpandedRowsChange, expandedRowsChange } = props;
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
        if (dat.adjustmentAmt) {
          dat.adjustmentAmt = standUnitToMinUnit(dat.adjustmentAmt, dat.ccy);
        }
        let subject = {};
        let chnOrg = {};
        let cus = {};
        let cate = {};
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
        if (dat.dCusNo) {
          cus = dat.dCusNo;
          dat.dCusNo = cus.split('-')[0];
          dat.dCusNme = cus.split('-')[1];
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
        if (dat.cCusNo) {
          cus = dat.cCusNo;
          dat.cCusNo = cus.split('-')[0];
          dat.cCusNme = cus.split('-')[1];
        }
        if (dat.dCateId1) {
          cate = dat.dCateId1;
          dat.dCateId1 = cate.split('-')[0];
          dat.dSubAccNo1 = cate.split('-')[1];
        }
        if (dat.dCateId2) {
          cate = dat.dCateId2;
          dat.dCateId2 = cate.split('-')[0];
          dat.dSubAccNo2 = cate.split('-')[1];
        }
        if (dat.dCateId3) {
          cate = dat.dCateId3;
          dat.dCateId3 = cate.split('-')[0];
          dat.dSubAccNo3 = cate.split('-')[1];
        }
        if (dat.cCateId1) {
          cate = dat.cCateId1;
          dat.cCateId1 = cate.split('-')[0];
          dat.cSubAccNo1 = cate.split('-')[1];
        }
        if (dat.cCateId2) {
          cate = dat.cCateId2;
          dat.cCateId2 = cate.split('-')[0];
          dat.cSubAccNo2 = cate.split('-')[1];
        }
        if (dat.cCateId3) {
          cate = dat.cCateId3;
          dat.cCateId3 = cate.split('-')[0];
          dat.cSubAccNo3 = cate.split('-')[1];
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
  // 借方科目查询
  const handQuerySubjectList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.accTyp = getFieldsValue().dAccTyp;
    data.subSts = '00';
    data.isLastLev = '1';
    querySubjectList(getFieldsValue(), data);
  }
  const subjectQueryFormProps = {
    type: 'add',
    accTyp: getFieldsValue().dAccTyp,
    subSts: '00',
    isLastLev: '1',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.accTyp = getFieldsValue().dAccTyp;
      data.subSts = '00';
      data.isLastLev = '1';
      querySubjectList(getFieldsValue(), data);
    },
  };
  const subjectInfoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.subjectQueryList,
    visible: subjectModalVisible,
    onCancel: () => {
      onCancelSubjectModel();
    },
  };
  const subjectTableProps = {
    tableCurrentPage: subjectData.tableCurrentPage,
    tableList: subjectData.tableList,
    tableTotal: subjectData.tableTotal,
    tableLoading: subjectData.tableLoading,
    tablePageChange(next) {
      const param = subjectData.tableParam;
      param.currentPage = next;
      param.accTyp = getFieldsValue().dAccTyp;
      param.subSts = '00';
      param.isLastLev = '1';
      querySubjectList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      setFieldsValue({ dSubject: `${data.subject}-${data.subjectNme}`, dSubTyp: data.subTyp });
      onCancelSubjectModel();
    },
  };
  // 贷方科目查询
  const cHandQuerySubjectList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.accTyp = getFieldsValue().cAccTyp;
    data.subSts = '00';
    data.isLastLev = '1';
    cQuerySubjectList(getFieldsValue(), data);
  }
  const cSubjectQueryFormProps = {
    type: 'add',
    accTyp: getFieldsValue().cAccTyp,
    subSts: '00',
    isLastLev: '1',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.accTyp = getFieldsValue().cAccTyp;
      data.subSts = '00';
      data.isLastLev = '1';
      cQuerySubjectList(getFieldsValue(), data);
    },
  };
  const cSubjectInfoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.subjectQueryList,
    visible: cSubjectModalVisible,
    onCancel: () => {
      cOnCancelSubjectModel();
    },
  };
  const cSubjectTableProps = {
    tableCurrentPage: cSubjectData.tableCurrentPage,
    tableList: cSubjectData.tableList,
    tableTotal: cSubjectData.tableTotal,
    tableLoading: cSubjectData.tableLoading,
    tablePageChange(next) {
      const param = cSubjectData.tableParam;
      param.currentPage = next;
      param.accTyp = getFieldsValue().cAccTyp;
      param.subSts = '00';
      param.isLastLev = '1';
      cQuerySubjectList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      setFieldsValue({ cSubject: `${data.subject}-${data.subjectNme}`, cSubTyp: data.subTyp });
      cOnCancelSubjectModel();
    },
  };
  // 借方客户号查询-
  const handQueryCusList = () => {
    const data = {};
    data.currentPage = 1;
    data.cusSts = '00';
    data.blgSubject = getFieldsValue().dSubject.split('-')[0];
    data.isFirst = true;
    queryCusList(getFieldsValue(), data);
  }
  const cusQueryFormProps = {
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.cusSts = '00';
      data.blgSubject = getFieldsValue().dSubject.split('-')[0];
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
      const param = cusData.tableParam;
      param.currentPage = next;
      param.cusSts = '00';
      param.blgSubject = getFieldsValue().dSubject.split('-')[0];
      queryCusList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      const dat = getFieldsValue();
      dat.dCusNo = `${data.cusNo}-${data.cusNme}`;
      dat.dCateId1 = data.cateId1 ? `${data.cateId1}-${data.subAccNo1}` : '';
      dat.dCateId2 = data.cateId2 ? `${data.cateId2}-${data.subAccNo2}` : '';
      dat.dCateId3 = data.cateId3 ? `${data.cateId3}-${data.subAccNo3}` : '';
      setFormFieldsValue(dat);
      onCancelCusModel();
    },
    expandedRowsChange(expandedRows) {
      expandedRowsChange(expandedRows);
    },
  };
  // 贷方客户号查询-
  const cHandQueryCusList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.cusSts = '00';
    data.blgSubject = getFieldsValue().cSubject.split('-')[0];
    cQueryCusList(getFieldsValue(), data);
  }
  const cCusQueryFormProps = {
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.cusSts = '00';
      data.blgSubject = getFieldsValue().cSubject.split('-')[0];
      cQueryCusList(getFieldsValue(), data);
    },
  };
  const cCusInfoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.cusQueryList,
    visible: cCusModalVisible,
    onCancel: () => {
      cOnCancelCusModel();
    },
  };
  const cCusTableProps = {
    tableCurrentPage: cCusData.tableCurrentPage,
    tableList: cCusData.tableList,
    tableTotal: cCusData.tableTotal,
    tableLoading: cCusData.tableLoading,
    expandedRowKeys: cCusData.expandedRowKeys,
    tablePageChange(next) {
      const param = cCusData.tableParam;
      param.currentPage = next;
      param.cusSts = '00';
      param.blgSubject = getFieldsValue().cSubject.split('-')[0];
      cQueryCusList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      const dat = getFieldsValue();
      dat.cCusNo = `${data.cusNo}-${data.cusNme}`;
      dat.cCateId1 = data.cateId1 ? `${data.cateId1}-${data.subAccNo1}` : '';
      dat.cCateId2 = data.cateId2 ? `${data.cateId2}-${data.subAccNo2}` : '';
      dat.cCateId3 = data.cateId3 ? `${data.cateId3}-${data.subAccNo3}` : '';
      setFormFieldsValue(dat);
      cOnCancelCusModel();
    },
    expandedRowsChange(expandedRows) {
      cExpandedRowsChange(expandedRows);
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
      setFieldsValue({ dChnOrgCod: `${data.chnOrgCod}-${data.chnOrgName}` });
      onCancelChnModel();
    },
  };

  const cHandQueryChnList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    cQueryChnList(getFieldsValue(), data);
  }
  const cChnQueryFormProps = {
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      cQueryChnList(getFieldsValue(), data);
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
      cQueryChnList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      setFieldsValue({ cChnOrgCod: `${data.chnOrgCod}-${data.chnOrgName}` });
      cOnCancelChnModel();
    },
  };

  const adjustmentAmtValidate = (rule, value, callback) => {
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
      callback(bizMap.validAdjustmentAmt);
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

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
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
                      initialValue: data.dAccTyp,
                      rules: [{ required: true, message: bizMap.validDaccTyp }],
                    })(
                      <Select onSelect={value => dAccTypOnSelect(value)} >
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
                      initialValue: data.dSubject,
                      rules: [{ required: true, message: bizMap.validDsubject }],
                    })(
                      <Input placeholder={bizMap.subject} onClick={handQuerySubjectList} readOnly="true" />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            {subjectModalVisible
              ? <Modal {...subjectInfoModalProps}>
                <SubjectCodeQueryForm {...subjectQueryFormProps} />
                <SubjectCallBackPageTable {...subjectTableProps} />
              </Modal>
              : null
            }
            <Row>
              {
                getFieldsValue().dSubTyp === 'CUS' || getFieldsValue().dSubTyp === 'BANK' ?
                  <Col span={24}>
                    <FormItem label={bizMap.cusNo} {...formItemLayout} >
                      {
                        getFieldDecorator('dCusNo', {
                          initialValue: data.dCusNo,
                          rules: [{ required: true, message: bizMap.validDcusNo }],
                        })(
                          <Input placeholder={bizMap.cusNo} onClick={handQueryCusList} readOnly="true" />,
                        )
                      }
                    </FormItem>
                  </Col>
                  :
                  null
              }
            </Row>
            {cusModalVisible
              ? <Modal {...cusInfoModalProps}>
                <CusInfQueryForm {...cusQueryFormProps} />
                <CusCateInfCallBackPageTable {...cusTableProps} />
              </Modal>
              : null
            }
            {
              data.dCateId1 ?
                <div>
                  <Row>
                    <Col span={24}>
                      <FormItem label={bizMap.cateId1} {...formItemLayout}>
                        {
                          getFieldDecorator('dCateId1', {
                            initialValue: data.dCateId1,
                          })(
                            <Input placeholder={bizMap.dCateId1} disabled />,
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
              data.dCateId2 ?
                <div>
                  <Row>
                    <Col span={24}>
                      <FormItem label={bizMap.cateId2} {...formItemLayout}>
                        {
                          getFieldDecorator('dCateId2', {
                            initialValue: data.dCateId2,
                          })(
                            <Input placeholder={bizMap.cateId2} disabled />,
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
              data.dCateId3 ?
                <div>
                  <Row>
                    <Col span={24}>
                      <FormItem label={bizMap.cateId3} {...formItemLayout}>
                        {
                          getFieldDecorator('dCateId3', {
                            initialValue: data.dCateId3,
                          })(
                            <Input placeholder={bizMap.cateId3} disabled />,
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
              {
                getFieldsValue().dSubTyp === 'CHN' ?
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
                      initialValue: data.dimprCd,
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
                      initialValue: data.cAccTyp,
                      rules: [{ required: true, message: bizMap.validCaccTyp }],
                    })(
                      <Select onSelect={value => cAccTypOnSelect(value)} >
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
                      initialValue: data.cSubject,
                      rules: [{ required: true, message: bizMap.validCSubject }],
                    })(
                      <Input placeholder={bizMap.subject} onClick={cHandQuerySubjectList} readOnly="true" />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            {cSubjectModalVisible
              ? <Modal {...cSubjectInfoModalProps}>
                <SubjectCodeQueryForm {...cSubjectQueryFormProps} />
                <SubjectCallBackPageTable {...cSubjectTableProps} />
              </Modal>
              : null
            }
            <Row>
              {
                getFieldsValue().cSubTyp === 'CUS' || getFieldsValue().cSubTyp === 'BANK' ?
                  <Col span={24}>
                    <FormItem label={bizMap.cusNo} {...formItemLayout2} >
                      {
                        getFieldDecorator('cCusNo', {
                          initialValue: data.cCusNo,
                          rules: [{ required: true, message: bizMap.validCcusNo }],
                        })(
                          <Input placeholder={bizMap.cusNo} onClick={cHandQueryCusList} readOnly="true" />,
                        )
                      }
                    </FormItem>
                  </Col>
                  :
                  null
              }
            </Row>
            {cCusModalVisible
              ? <Modal {...cCusInfoModalProps}>
                <CusInfQueryForm {...cCusQueryFormProps} />
                <CusCateInfCallBackPageTable {...cCusTableProps} />
              </Modal>
              : null
            }
            {
              data.cCateId1 ?
                <div>
                  <Row>
                    <Col span={24}>
                      <FormItem label={bizMap.cateId1} {...formItemLayout2}>
                        {
                          getFieldDecorator('cCateId1', {
                            initialValue: data.cCateId1,
                          })(
                            <Input placeholder={bizMap.cateId1} disabled />,
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
              data.cCateId2 ?
                <div>
                  <Row>
                    <Col span={24}>
                      <FormItem label={bizMap.cateId2} {...formItemLayout2}>
                        {
                          getFieldDecorator('cCateId2', {
                            initialValue: data.cCateId2,
                          })(
                            <Input placeholder={bizMap.cateId2} disabled />,
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
              data.cCateId3 ?
                <div>
                  <Row>
                    <Col span={24}>
                      <FormItem label={bizMap.cateId3} {...formItemLayout2}>
                        {
                          getFieldDecorator('cCateId3', {
                            initialValue: data.cCateId3,
                          })(
                            <Input placeholder={bizMap.cateId3} disabled />,
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
              {
                getFieldsValue().cSubTyp === 'CHN' ?
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
                      initialValue: data.cimprCd,
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
            <FormItem label={bizMap.adjustmentAmt} {...formItemLayout} required >
              {
                getFieldDecorator('adjustmentAmt', {
                  initialValue: data.adjustmentAmt,
                  validate: [{
                    rules: [
                      { validator: adjustmentAmtValidate },
                    ], trigger: 'onBlur',
                  }],
                })(
                  <InputNumber placeholder={bizMap.adjustmentAmt} style={{ width: '100%' }} min={0} step={0.01} />,
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
            getFieldDecorator('dSubTyp', {
              initialValue: data.dSubTyp,
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('cSubTyp', {
              initialValue: data.cSubTyp,
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

AccountAdjustmentForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  subjectData: PropTypes.object,
  subjectModalVisible: PropTypes.bool,
  querySubjectList: PropTypes.func,
  onCancelSubjectModel: PropTypes.func,
  cusData: PropTypes.object,
  cusModalVisible: PropTypes.bool,
  queryCusList: PropTypes.func,
  onCancelCusModel: PropTypes.func,
  cSubjectData: PropTypes.object,
  cSubjectModalVisible: PropTypes.bool,
  cQuerySubjectList: PropTypes.func,
  cOnCancelSubjectModel: PropTypes.func,
  cCusData: PropTypes.object,
  cCusModalVisible: PropTypes.bool,
  cQueryCusList: PropTypes.func,
  cOnCancelCusModel: PropTypes.func,
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
  cExpandedRowsChange: PropTypes.func,
  expandedRowsChange: PropTypes.func,
};

AccountAdjustmentForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  subjectData: {},
  subjectModalVisible: false,
  querySubjectList: noop,
  onCancelSubjectModel: noop,
  cusData: {},
  cusModalVisible: false,
  queryCusList: noop,
  onCancelCusModel: noop,
  chnData: {},
  chnModalVisible: false,
  queryChnList: noop,
  onCancelChnModel: noop,
  cSubjectData: {},
  cSubjectModalVisible: false,
  cQuerySubjectList: noop,
  cOnCancelSubjectModel: noop,
  cCusData: {},
  cCusModalVisible: false,
  cQueryCusList: noop,
  cOnCancelCusModel: noop,
  cChnData: {},
  cChnModalVisible: false,
  cQueryChnList: noop,
  cOnCancelChnModel: noop,
  setFormFieldsValue: noop,
  ccyOptionsData: [],
  cExpandedRowsChange: noop,
  expandedRowsChange: noop,
}

export default Form.create()(AccountAdjustmentForm);
