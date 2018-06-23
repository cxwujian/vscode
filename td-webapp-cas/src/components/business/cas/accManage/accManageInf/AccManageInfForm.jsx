import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Modal, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import SubjectCodeQueryForm from '../../temp/subject/SubjectCodeQueryForm';
import SubjectCallBackPageTable from '../../temp/subject/SubjectCallBackPageTable';
import CusInfQueryForm from '../../temp/cusInf/CusInfQueryForm';
import CusInfCallBackPageTable from '../../temp/cusInf/CusInfCallBackPageTable';

const noop = () => { };
const Option = Select.Option;
const FormItem = Form.Item;
const AccManageInfForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/accManageInf');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, setFormFieldsValue,
    subjectModalVisible, querySubjectList, onCancelSubjectModel, subjectData,
    cusModalVisible, queryCusList, onCancelCusModel, cusData,
    accModeInfDate, subAccCategoryDates } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.subject) {
          dat.subject = dat.subject.split('-')[0];
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
  const handQuerySubjectList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.subSts = '00';
    data.isLastLev = '1';
    querySubjectList(getFieldsValue(), data);
  }
  const subjectQueryFormProps = {
    type: 'add',
    subSts: '00',
    isLastLev: '1',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
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
      param.subSts = '00';
      param.isLastLev = '1';
      querySubjectList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      const dat = getFieldsValue();
      dat.subject = data.subject;
      dat.subjectNme = data.subjectNme;
      setFormFieldsValue(dat)
      onCancelSubjectModel();
    },
  };

  const handQueryCusList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.cusSts = '00';
    queryCusList(getFieldsValue(), data);
  }
  const cusQueryFormProps = {
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.cusSts = '00';
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
    tablePageChange(next) {
      const param = cusData.tableParam;
      param.currentPage = next;
      param.cusSts = '00';
      queryCusList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      const dat = getFieldsValue();
      dat.cusNo = data.cusNo;
      setFormFieldsValue(dat)
      onCancelCusModel();
    },
  };

  // const cateIdOnSelect = (value, option) => {
  //   const selectValues = option.props.children.split('-');
  //   setFieldsValue({ cateId: value });
  //   setFieldsValue({ subAccId: selectValues[0] });
  //   setFieldsValue({ subAccName: selectValues[1] });
  // }

  const modeOnSelect = (value, option) => {
    const selectValues = option.props.children.split('-');
    setFieldsValue({ modeId: value });
    setFieldsValue({ accMode: selectValues[0] });
    if (selectValues[0] === '02') {
      setFieldsValue({ fixedTim: selectValues[2] });
      setFieldsValue({ fixedAlterTim: '' });
    } else if (selectValues[0] === '03') {
      setFieldsValue({ fixedAlterTim: selectValues[2] });
      setFieldsValue({ fixedTim: '' });
    }
  }

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.pkId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('pkId', {
                  initialValue: data.pkId,
                })(
                  <Input placeholder={bizMap.pkId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.subject} {...formItemLayout} >
              {
                getFieldDecorator('subject', {
                  initialValue: type === 'update' ? `${data.subject}-${data.subjectNme}` : data.subject,
                  rules: [{ required: true, message: bizMap.validSubject }],
                })(
                  <Input placeholder={bizMap.subject} onClick={handQuerySubjectList} readOnly="true" disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {subjectModalVisible
          ? <Row>
            <Modal {...subjectInfoModalProps}>
              <SubjectCodeQueryForm {...subjectQueryFormProps} />
              <SubjectCallBackPageTable {...subjectTableProps} />
            </Modal>
          </Row>
          : null
        }
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.cusNo} {...formItemLayout} >
              {
                getFieldDecorator('cusNo', {
                  initialValue: data.cusNo,
                })(
                  <Input placeholder={bizMap.cusNo} onClick={handQueryCusList} readOnly="true" disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {cusModalVisible
          ? <Row>
            <Modal {...cusInfoModalProps}>
              <CusInfQueryForm {...cusQueryFormProps} />
              <CusInfCallBackPageTable {...cusTableProps} />
            </Modal>
          </Row>
          : null
        }
        {/*<Row>
          <Col span={24}>
            <FormItem label={bizMap.cateId} {...formItemLayout} >
              {
                getFieldDecorator('cateId', {
                  initialValue: data.cateId,
                  rules: [{ required: true, message: bizMap.validCateId }],
                })(
                  <Select disabled={type === 'update'} onSelect={(value, option) => cateIdOnSelect(value, option)} >
                    <Option value="">&nbsp;</Option>
                    {
                      subAccCategoryDates.map((cateOption, idx) => {
                        return <Option key={idx} value={cateOption.cateId}>{`${cateOption.subAccId}-${cateOption.subAccName} `}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>*/}
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.modeId} {...formItemLayout} >
              {
                getFieldDecorator('modeId', {
                  initialValue: data.modeId,
                })(
                  <Select onSelect={(value, option) => modeOnSelect(value, option)} >
                    <Option value="">&nbsp;</Option>
                    {
                      accModeInfDate.map((accModeInf, idx) => {
                        return (<Option key={idx} value={accModeInf.modeId}>
                          {accModeInf.accMode === '01' ?
                            `${accModeInf.accMode}-${bizMap['accMode-01']}`
                            : (
                              accModeInf.accMode === '02' ?
                                `${accModeInf.accMode}-${bizMap['accMode-02']}-${accModeInf.fixedTim}`
                                : `${accModeInf.accMode}-${bizMap['accMode-03']}-${accModeInf.fixedAlterTim}`
                            )
                          }
                        </Option>);
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
            getFieldDecorator('subjectNme', {
              initialValue: data.subjectNme,
            })(
              <Input />,
            )
          }
          {/*{
            getFieldDecorator('subAccId', {
              initialValue: data.subAccId,
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('subAccName', {
              initialValue: data.subAccName,
            })(
              <Input />,
            )
          }*/}
          {
            getFieldDecorator('accMode')(
              <Input placeholder="" />,
            )
          }
          {
            getFieldDecorator('fixedTim')(
              <Input placeholder="" />,
            )
          }
          {
            getFieldDecorator('fixedAlterTim')(
              <Input placeholder="" />,
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

AccManageInfForm.propTypes = {
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
  setFormFieldsValue: PropTypes.func,
  accModeInfDate: PropTypes.array,
  subAccCategoryDates: PropTypes.array,
};

AccManageInfForm.defaultProps = {
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
  queryCusjectList: noop,
  onCancelCusjectModel: noop,
  setFormFieldsValue: noop,
  ccyOptionsData: [],
  accModeInfDate: [],
  subAccCategoryDates: [],
}

export default Form.create()(AccManageInfForm);
