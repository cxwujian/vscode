import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber, DatePicker, Icon, Modal } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import { Yuan2Fen } from '../../../../../utils/currency';
import SubjectCodeQueryForm from '../../temp/subject/SubjectCodeQueryForm';
import SubjectCallBackPageTable from '../../temp/subject/SubjectCallBackPageTable';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';

const AccFrozDetailQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/accFrozDetail');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, exportClick, advExpand, collapseClick,
    querySubjectList, subjectModalVisible, subjectData, onCancelSubjectModel } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.creDat && dat.creDat.length > 0) {
          dat.creDatStart = dat.creDat[0].format(dateFormat1);
          dat.creDatEnd = dat.creDat[1].format(dateFormat1);
          delete dat.creDat;
        }
        if (dat.frozAmtMin) {
          dat.frozAmtMin = Yuan2Fen(dat.frozAmtMin);
        }
        if (dat.frozAmtMax) {
          dat.frozAmtMax = Yuan2Fen(dat.frozAmtMax);
        }
        formSubmit(dat);
      }
    });
  };
  const handleExportClick = () => {
    const dat = getFieldsValue();
    exportClick(dat);
  };

  const handleReset = () => {
    resetFields();
  }

  const handQuerySubjectList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.accTyp = getFieldsValue().accTyp;
    data.subSts = '00';
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
    subSts: '00',
    isLastLev: '1',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.accTyp = getFieldsValue().accTyp;
      data.subSts = '00';
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
      param.subSts = '00';
      param.isLastLev = '1';
      querySubjectList(param);
    },
    rowClickCallback(data) {
      setFieldsValue({ subjectNme: data.subjectNme })
      onCancelSubjectModel();
    },
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.actNo} {...formItemLayout}>
            {
              getFieldDecorator('actNo')(<Input placeholder={bizMap.actNo} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.actNme} {...formItemLayout}>
            {
              getFieldDecorator('actNme')(<Input placeholder={bizMap.actNme} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.frozSts} {...formItemLayout}>
            {
              getFieldDecorator('frozSts')(<Select initialValue="">
                <Option value="">&nbsp;</Option>
                <Option value="0">{bizMap['frozSts-0']}</Option>
                <Option value="1">{bizMap['frozSts-1']}</Option>
                <Option value="2">{bizMap['frozSts-2']}</Option>
              </Select>)
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.creDat} {...formItemLayout}>
            {
              getFieldDecorator('creDat')(
                <RangePicker format={dateFormat} style={{ width: 300 }} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.frozAmt} {...formItemLayout}>
            {
              getFieldDecorator('frozAmtMin')(<InputNumber placeholder={bizMap.frozAmt} style={{ width: '45%' }} />)
            }
            {
              getFieldDecorator('frozAmtMax')(<InputNumber placeholder={bizMap.frozAmt} style={{ width: '45%' }} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.accTyp} {...formItemLayout}>
            {
              getFieldDecorator('accTyp')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{bizMap['accTyp-1']}</Option>
                  <Option value="2">{bizMap['accTyp-2']}</Option>
                  <Option value="3">{bizMap['accTyp-3']}</Option>
                  <Option value="4">{bizMap['accTyp-4']}</Option>
                </Select>)
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.subjectNme} {...formItemLayout}>
            {
              getFieldDecorator('subjectNme')(<Input onClick={handQuerySubjectList} readOnly="true" placeholder={bizMap.subjectNme} />)
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
          <ButtonGroup>
            <Button icon="export" type="primary" onClick={handleExportClick}>{commonMap.export}</Button>
          </ButtonGroup>
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
}

AccFrozDetailQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  exportClick: PropTypes.func,
  collapseClick: PropTypes.func,
  advExpand: PropTypes.bool,
  querySubjectList: PropTypes.func,
  onCancelSubjectModel: PropTypes.func,
};

AccFrozDetailQueryForm.defaultProps = {
  formSubmit: noop,
  exportClick: noop,
  collapseClick: noop,
  advExpand: false,
  querySubjectList: noop,
  onCancelSubjectModel: noop,
}

export default Form.create()(AccFrozDetailQueryForm);
