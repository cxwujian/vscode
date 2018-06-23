import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, Modal } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import SubjectCodeQueryForm from '../../temp/subject/SubjectCodeQueryForm';
import SubjectCallBackPageTable from '../../temp/subject/SubjectCallBackPageTable';
import CusInfQueryForm from '../../temp/cusInf/CusInfQueryForm';
import CusInfCallBackPageTable from '../../temp/cusInf/CusInfCallBackPageTable';
import ChnInfQueryForm from '../../temp/chnInf/ChnInfQueryForm';
import ChnInfCallBackPageTable from '../../temp/chnInf/ChnInfCallBackPageTable';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const AccProfilesForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/accProfiles');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type, setFormFieldsValue,
    subjectModalVisible, querySubjectList, onCancelSubjectModel, subjectData,
    cusModalVisible, queryCusList, onCancelCusModel, cusData,
    chnData, chnModalVisible, queryChnList, onCancelChnModel,
    ccyOptionsData } = props;
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
        if (dat.subTyp === 'CHN') {
          dat.cusNo = dat.payChnCde;
        }
        if (dat.cusNo) {
          dat.cusNo = dat.cusNo.split('-')[0];
        }
        if (dat.blgSubject) {
          dat.blgSubject = dat.blgSubject.split('-')[0];
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
  const changeActNme = () => {
    let actNme = '';
    let cusNme = '';
    let subjectNme = '';
    if ((getFieldsValue().subTyp === 'CUS' || getFieldsValue().subTyp === 'BANK') && getFieldsValue().cusNme) {
      cusNme = `${getFieldsValue().cusNme}`;
    } else if (getFieldsValue().subTyp === 'CHN' && getFieldsValue().payChnNme) {
      cusNme = `${getFieldsValue().payChnNme}`;
    }
    if (getFieldsValue().subjectNme) {
      subjectNme = getFieldsValue().subjectNme;
    }
    if (cusNme) {
      actNme = `${cusNme}-`;
    }
    actNme += subjectNme;
    setFieldsValue({ actNme: actNme });
  }
  const handQuerySubjectList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.accTyp = getFieldsValue().accTyp;
    data.subSts = '00';
    data.isLastLev = '1';
    querySubjectList(getFieldsValue(), data);
  }
  const subjectQueryFormProps = {
    type: 'add',
    accTyp: getFieldsValue().accTyp,
    subSts: '00',
    isLastLev: '1',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.accTyp = getFieldsValue().accTyp;
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
      param.accTyp = getFieldsValue().accTyp;
      param.subSts = '00';
      param.isLastLev = '1';
      querySubjectList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      const dat = getFieldsValue();
      dat.blgSubject = `${data.subject}-${data.subjectNme}`;
      dat.subjectNme = data.subjectNme;
      dat.ccy = data.ccy;
      dat.subTyp = data.subTyp;
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
      dat.cusNo = `${data.cusNo}-${data.cusNme}`;
      dat.cusNme = data.cusNme;
      setFormFieldsValue(dat)
      onCancelCusModel();
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
      dat.cusNo = `${data.payChnCde}-${data.payChnNme}`;
      dat.payChnNme = data.payChnNme;
      setFormFieldsValue(dat)
      onCancelChnModel();
    },
  };
  let actNme = '';
  let cusNme = '';
  let subjectNme = '';
  if ((getFieldsValue().subTyp === 'CUS' || getFieldsValue().subTyp === 'BANK') && getFieldsValue().cusNme) {
    cusNme = `${getFieldsValue().cusNme}`;
  } else if (getFieldsValue().subTyp === 'CHN' && getFieldsValue().payChnNme) {
    cusNme = `${getFieldsValue().payChnNme}`;
  }
  if (getFieldsValue().subjectNme) {
    subjectNme = getFieldsValue().subjectNme;
  }
  if (cusNme) {
    actNme = `${cusNme}-`;
  }
  actNme += subjectNme;
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.actNo} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('actNo', {
                  initialValue: data.actNo,
                })(
                  <Input placeholder={bizMap.actNo} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.accTyp} {...formItemLayout} required>
              {
                getFieldDecorator('accTyp', {
                  initialValue: data.accTyp,
                  rules: [{ required: true, message: bizMap.validAccTyp }],
                })(
                  <Select disabled={type === 'update'} >
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
            <FormItem label={bizMap.blgSubject} {...formItemLayout} >
              {
                getFieldDecorator('blgSubject', {
                  initialValue: type === 'update' ? `${data.blgSubject}-${data.subjectNme}` : data.blgSubject,
                  rules: [{ required: true, message: bizMap.validBlgSubject }],
                })(
                  <Input onBlur={changeActNme} placeholder={bizMap.blgSubject} onClick={handQuerySubjectList} readOnly="true" disabled={type === 'update'} />,
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
            <FormItem label={bizMap.ccy} {...formItemLayout} required>
              {
                getFieldDecorator('ccy', {
                  initialValue: data.ccy,
                })(
                  <Select disabled>
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
          getFieldsValue().subTyp === 'CUS' || getFieldsValue().subTyp === 'BANK' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.cusNo} {...formItemLayout} >
                  {
                    getFieldDecorator('cusNo', {
                      initialValue: data.cusNo,
                      rules: [{ required: true, message: bizMap.validCusNo }],
                    })(
                      <Input onBlur={changeActNme} placeholder={bizMap.cusNo} onClick={handQueryCusList} readOnly="true" disabled={type === 'update'} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {cusModalVisible
          ? <Row>
            <Modal {...cusInfoModalProps}>
              <CusInfQueryForm {...cusQueryFormProps} />
              <CusInfCallBackPageTable {...cusTableProps} />
            </Modal>
          </Row>
          : null
        }
        {
          getFieldsValue().subTyp === 'CHN' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.chnOrgCod} {...formItemLayout} >
                  {
                    getFieldDecorator('payChnCde', {
                      initialValue: data.cusNo,
                      rules: [{ required: true, message: bizMap.validPayChnCde }],
                    })(
                      <Input onBlur={changeActNme} placeholder={bizMap.payChnCde} onClick={handQueryChnList} readOnly="true" disabled={type === 'update'} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {chnModalVisible
          ? <Row>
            <Modal {...chnInfoModalProps}>
              <ChnInfQueryForm {...chnQueryFormProps} />
              <ChnInfCallBackPageTable {...chnTableProps} />
            </Modal>
          </Row>
          : null
        }
        {
          type === 'update' && data.cusNo ?
            <Row>
              <Col span={24}>
                <FormItem label={data.cusNo.indexOf('CHN') === -1 ? bizMap.cusNo : bizMap.chnOrgCod} {...formItemLayout} >
                  {
                    getFieldDecorator('cusNo', {
                      initialValue: data.cusNo,
                    })(
                      <Input disabled />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.actNme} {...formItemLayout} >
              {
                getFieldDecorator('actNme', {
                  initialValue: (type === 'add' ? actNme : data.actNme),
                  rules: [{ required: true, message: bizMap.validActNme }],
                })(
                  <Input placeholder={bizMap.actNme} />,
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
        <div hidden >
          {
            getFieldDecorator('cusNme', {
              initialValue: data.cusNme,
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('payChnNme', {
              initialValue: data.payChnNme,
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('subjectNme', {
              initialValue: data.subjectNme,
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('subTyp', {
              initialValue: data.subTyp,
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

AccProfilesForm.propTypes = {
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
  chnData: PropTypes.object,
  chnModalVisible: PropTypes.bool,
  queryChnList: PropTypes.func,
  onCancelChnModel: PropTypes.func,
  setFormFieldsValue: PropTypes.func,
  ccyOptionsData: PropTypes.array,
};

AccProfilesForm.defaultProps = {
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
  chnData: {},
  chnModalVisible: false,
  queryChnList: noop,
  onCancelChnModel: noop,
  setFormFieldsValue: noop,
  ccyOptionsData: [],
}

export default Form.create()(AccProfilesForm);
