import React, { PropTypes } from 'react';
import { Modal, Form, Input, Button, Row, Col, Select, DatePicker, Icon, InputNumber } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import { yuan2Cent } from '../../../../../utils/currency';
import SubjectCodeQueryForm from '../../temp/subject/SubjectCodeQueryForm';
import SubjectCallBackPageTable from '../../temp/subject/SubjectCallBackPageTable';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const CasBokAccJnlQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const { form, formSubmit, collapseClick, advExpand, transBaseOptionsData,
    querySubjectList, subjectModalVisible, subjectData, onCancelSubjectModel } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields, setFieldsValue } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.regTim && dat.regTim.length > 0) {
          dat.regTimStart = dat.regTim[0].format(dateFormat1);
          dat.regTimEnd = dat.regTim[1].format(dateFormat1);
          delete dat.regTim;
        }
        if (dat.actDat) {
          dat.actDat = dat.actDat.format(dateFormat1);
        }
        if (dat.txnAmtMin) {
          dat.txnAmtMin = yuan2Cent(dat.txnAmtMin);
        }
        if (dat.txnAmtMax) {
          dat.txnAmtMax = yuan2Cent(dat.txnAmtMax);
        }
        formSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  const handQuerySubjectList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.accTyp = getFieldsValue().accTyp;
    data.isLastLev = '1';
    querySubjectList(data);
  }
  const subjectInfoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.subjectQueryList,
    visible: subjectModalVisible,
    onCancel: () => {
      onCancelSubjectModel();
    },
  };
  const subjectQueryFormProps = {
    type: 'query',
    accTyp: getFieldsValue().accTyp,
    isLastLev: '1',
    subSts: '00',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.accTyp = getFieldsValue().accTyp;
      data.isLastLev = '1';
      querySubjectList(data);
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
      param.isLastLev = '1';
      querySubjectList(param);
    },
    rowClickCallback(data) {
      setFieldsValue({ blgSubject: data.subject })
      onCancelSubjectModel();
    },
  };
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnTyp} {...formItemLayout}>
            {
              getFieldDecorator('txnTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="N">{bizMap['txnTyp-N']}</Option>
                  <Option value="R">{bizMap['txnTyp-R']}</Option>
                  <Option value="C">{bizMap['txnTyp-C']}</Option>
                  <Option value="H">{bizMap['txnTyp-H']}</Option>
                  <Option value="T">{bizMap['txnTyp-T']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnCode} {...formItemLayout}>
            {
              getFieldDecorator('txnCode')(
                <Select>
                  <Option value="">&nbsp;</Option>
                  {
                    transBaseOptionsData.map((transBaseOption, idx) => {
                      return <Option key={idx} value={transBaseOption.txnCode}>{`${transBaseOption.txnCode}-${transBaseOption.txnDesc}`}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.regTim} {...formItemLayout}>
            {
              getFieldDecorator('regTim')(
                <RangePicker format={dateFormat} style={{ width: 300 }} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.actDat} {...formItemLayout}>
            {
              getFieldDecorator('actDat')(
                <DatePicker format={dateFormat} style={{ width: 300 }} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnAmt} {...formItemLayout}>
            {
              getFieldDecorator('txnAmtMin')(<InputNumber placeholder={bizMap.txnAmt} style={{ width: '47%' }} step={0.01} />)
            }
            {
              getFieldDecorator('txnAmtMax')(<InputNumber placeholder={bizMap.txnAmt} style={{ width: '47%' }} step={0.01} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.bokSts} {...formItemLayout}>
            {
              getFieldDecorator('bokSts')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="U">{bizMap['bokSts-U']}</Option>
                  <Option value="S">{bizMap['bokSts-S']}</Option>
                  <Option value="F">{bizMap['bokSts-F']}</Option>
                  <Option value="C">{bizMap['bokSts-C']}</Option>
                  <Option value="R">{bizMap['bokSts-R']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.voucherId} {...formItemLayout}>
            {
              getFieldDecorator('voucherId')(
                <Input placeholder={bizMap.voucherId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.blgSubject} {...formItemLayout}>
            {
              getFieldDecorator('blgSubject')(<Input onClick={handQuerySubjectList} readOnly="true" placeholder={bizMap.blgSubject} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.accMode} {...formItemLayout}>
            {
              getFieldDecorator('accMode')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['accMode-01']}</Option>
                  <Option value="02">{bizMap['accMode-02']}</Option>
                  <Option value="03">{bizMap['accMode-03']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.actNme} {...formItemLayout}>
            {
              getFieldDecorator('actNme')(
                <Input placeholder={bizMap.actNme} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          {subjectModalVisible
            ? <Row>
              <Modal {...subjectInfoModalProps}>
                <SubjectCodeQueryForm {...subjectQueryFormProps} />
                <SubjectCallBackPageTable {...subjectTableProps} />
              </Modal>
            </Row>
            : null
          }
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup />
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <a style={{ marginRight: 8, fontSize: 12 }} onClick={collapseClick}>
            {commonMap.advSearch} <Icon type={advExpand ? 'up' : 'down'} />
          </a>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

CasBokAccJnlQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  collapseClick: PropTypes.func,
  advExpand: PropTypes.bool,
  transBaseOptionsData: PropTypes.array,
  querySubjectList: PropTypes.func,
  onCancelSubjectModel: PropTypes.func,
};

CasBokAccJnlQueryForm.defaultProps = {
  formSubmit: noop,
  collapseClick: noop,
  advExpand: false,
  transBaseOptionsData: [],
  querySubjectList: noop,
  onCancelSubjectModel: noop,
}

export default Form.create()(CasBokAccJnlQueryForm);
