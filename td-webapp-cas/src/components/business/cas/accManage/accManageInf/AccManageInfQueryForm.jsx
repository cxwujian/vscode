import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Icon, Modal } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import SubjectCodeQueryForm from '../../temp/subject/SubjectCodeQueryForm';
import SubjectCallBackPageTable from '../../temp/subject/SubjectCallBackPageTable';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const AccManageInfQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/accManageInf');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, advExpand, collapseClick,
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
        if (dat.regTim && dat.regTim.length > 0) {
          dat.regTimStart = dat.regTim[0].format(dateFormat1);
          dat.regTimEnd = dat.regTim[1].format(dateFormat1);
          delete dat.regTim;
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
      querySubjectList(getFieldsValue(), param);
    },
    rowClickCallback(data) {
      const dat = getFieldsValue();
      dat.subject = data.subject;
      setFieldsValue({ subject: data.subject })
      onCancelSubjectModel();
    },
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.subject} {...formItemLayout}>
            {
              getFieldDecorator('subject')(<Input onClick={handQuerySubjectList} readOnly="true" placeholder={bizMap.subject} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.cusNo} {...formItemLayout}>
            {
              getFieldDecorator('cusNo')(<Input placeholder={bizMap.cusNo} />)
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
          <FormItem label={bizMap.regTim} {...formItemLayout}>
            {
              getFieldDecorator('regTim')(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={addClick}>{commonMap.add}</Button>
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

AccManageInfQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  subAccCategoryDate: PropTypes.array,
  advExpand: PropTypes.bool,
  collapseClick: PropTypes.func,
  querySubjectList: PropTypes.func,
  onCancelSubjectModel: PropTypes.func,
};

AccManageInfQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  subAccCategoryDate: [],
  advExpand: false,
  collapseClick: noop,
  querySubjectList: noop,
  onCancelSubjectModel: noop,
}

export default Form.create()(AccManageInfQueryForm);
