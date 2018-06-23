import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker, Icon, Modal } from 'antd';
import * as i18n from '../../../../../utils/i18n';

import SubjectCodeQueryForm from '../../temp/subject/SubjectCodeQueryForm';
import SubjectCallBackPageTable from '../../temp/subject/SubjectCallBackPageTable';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const CasAccEntryJnlQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const { form, formSubmit, collapseClick, advExpand, querySubjectList, onCancelSubjectModel, subjectModalVisible, subjectData } = props;
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
    subSts: '00',
    isLastLev: '1',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.isLastLev = '1';
      querySubjectList(getFieldsValue(), data);
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
      param.isLastLev = '1';
      querySubjectList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      setFieldsValue({ subject: data.subject });
      onCancelSubjectModel();
    },
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
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
          <FormItem label={bizMap.regTim} {...formItemLayout}>
            {
              getFieldDecorator('regTim')(
                <RangePicker format={dateFormat} style={{ width: 300 }} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.subject} {...formItemLayout}>
            {
              getFieldDecorator('subject')(<Input onClick={handQuerySubjectList} readOnly="true" placeholder={bizMap.subject} />)
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
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.cdFlg} {...formItemLayout}>
            {
              getFieldDecorator('cdFlg')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="D">{bizMap['cdFlg-D']}</Option>
                  <Option value="C">{bizMap['cdFlg-C']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
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

CasAccEntryJnlQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  collapseClick: PropTypes.func,
  advExpand: PropTypes.bool,
  querySubjectList: PropTypes.func,
};

CasAccEntryJnlQueryForm.defaultProps = {
  formSubmit: noop,
  collapseClick: noop,
  advExpand: false,
  querySubjectList: noop,
}

export default Form.create()(CasAccEntryJnlQueryForm);
