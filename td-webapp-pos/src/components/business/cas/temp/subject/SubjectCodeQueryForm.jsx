import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const SubjectCodeQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, accTyp, type, subSts, isLastLev } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
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
        formSubmit(getFieldsValue());
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col span={8}>
          <FormItem label={bizMap.accTyp} {...formItemLayout} >
            {
              getFieldDecorator('accTyp', {
                initialValue: accTyp,
              })(
                <Select placeholder={commonMap.select} disabled={type === 'add'} >
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
        <Col span={8}>
          <FormItem label={bizMap.subjectNme} {...formItemLayout} >
            {
              getFieldDecorator('subjectNme')(
                <Input placeholder={bizMap.subjectNme} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label={bizMap.subSts} {...formItemLayout} >
            {
              getFieldDecorator('subSts', {
                initialValue: subSts,
              })(
                <Select placeholder={commonMap.select} disabled>
                  <Option value="">&nbsp;</Option>
                  <Option value="00">{commonMap['status-00']}</Option>
                  <Option value="01">{commonMap['status-01']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.isLastLev} {...formItemLayout} >
            {
              getFieldDecorator('isLastLev', {
                initialValue: isLastLev,
              })(
                <Select placeholder={commonMap.select} disabled>
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{bizMap['isLastLev-0']}</Option>
                  <Option value="1">{bizMap['isLastLev-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          &nbsp;
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

SubjectCodeQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  accTyp: PropTypes.string,
  subSts: PropTypes.string,
  isLastLev: PropTypes.string,
  type: PropTypes.string,
};

SubjectCodeQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
  accTyp: '',
  subSts: '',
  isLastLev: '',
  type: '',
}

export default Form.create()(SubjectCodeQueryForm);
