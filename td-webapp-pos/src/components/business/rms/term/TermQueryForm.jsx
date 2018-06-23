import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const TermQueryForm = (props) => {
  const bizMap = i18n.bizMap('rms/term');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
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
        <Col xs={24} sm={12} md={8}>
          <FormItem label="" {...formItemLayout}>
            {
              getFieldDecorator('terNo')(<Input placeholder={bizMap.terNo} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label="" {...formItemLayout}>
            {
              getFieldDecorator('terPhyNo')(<Input placeholder={bizMap.terPhyNo} />)
            }
          </FormItem>
        </Col>
        <Col sm={24} md={8} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

TermQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

TermQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(TermQueryForm);
