import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const SubRelatedExtQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/transRelatedExt');
  const commonMap = i18n.commonMap();
  const { form, formSubmit } = props;
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
        const dat = getFieldsValue();
        formSubmit(dat);
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
          <FormItem label={bizMap.extCod} {...formItemLayout}>
            {
              getFieldDecorator('extCod')(<Input placeholder={bizMap.extCod} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.extDesc} {...formItemLayout}>
            {
              getFieldDecorator('extDesc')(<Input placeholder={bizMap.extDesc} />)
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

SubRelatedExtQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

SubRelatedExtQueryForm.defaultProps = {
  formSubmit: noop,
}

export default Form.create()(SubRelatedExtQueryForm);
