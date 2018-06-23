import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Alert } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const SubAccCategoryDeleteForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/subAccCategory');
  const { form, data, loading, submiting, formSubmit, hasProfiles } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 11 },
    wrapperCol: { span: 10 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formSubmit(dat);
      }
    });
  };
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Alert message={bizMap.subAccCategoryInfo} type="success" />
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.cateId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('cateId', {
                  initialValue: data.cateId,
                })(
                  <Input placeholder={bizMap.cateId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label={bizMap.subAccId} {...formItemLayout} >
              {
                getFieldDecorator('subAccId', {
                  initialValue: data.subAccId,
                  rules: [{ required: true, message: bizMap.validSubAccId }],
                })(
                  <Input placeholder={bizMap.subAccId} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={bizMap.subAccName} {...formItemLayout}>
              {
                getFieldDecorator('subAccName', {
                  initialValue: data.subAccName,
                  rules: [{ required: true, message: bizMap.validSubAccName }],
                })(
                  <Input placeholder={bizMap.subAccName} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'center', display: hasProfiles ? 'none' : 'block' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{bizMap.delete}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

SubAccCategoryDeleteForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  hasProfiles: PropTypes.bool,
};

SubAccCategoryDeleteForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  hasProfiles: false,
}

export default Form.create()(SubAccCategoryDeleteForm);
