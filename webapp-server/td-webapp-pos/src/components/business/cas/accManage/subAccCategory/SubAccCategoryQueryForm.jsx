import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const SubAccCategoryQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/subAccCategory');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick } = props;
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
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.subAccId} {...formItemLayout}>
            {
              getFieldDecorator('subAccId')(<Input placeholder={bizMap.subAccId} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.subAccName} {...formItemLayout}>
            {
              getFieldDecorator('subAccName')(<Input placeholder={bizMap.subAccName} />)
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
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

SubAccCategoryQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
};

SubAccCategoryQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
}

export default Form.create()(SubAccCategoryQueryForm);
