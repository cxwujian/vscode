import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const MiniCountryQueryForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubCountry');
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
              getFieldDecorator('merId')(<Input placeholder={bizMap.merId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.country} {...formItemLayout}>
            {
              getFieldDecorator('country')(<Input placeholder={bizMap.country} />)
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

MiniCountryQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

MiniCountryQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(MiniCountryQueryForm);
