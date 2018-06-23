import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Row, Col, Icon } from 'antd';
import * as i18n from '../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const LoginForm = (props) => {
  const bizMap = i18n.bizMap('login');
  const commonMap = i18n.commonMap();
  const { form, data, loading, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(getFieldsValue());
      }
    });
  };

  return (
    <div>
      <h1>{bizMap.bussLogin}</h1>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout}>
              {
                getFieldDecorator('usrName', {
                  initialValue: data.usrName,
                  rules: [{
                    required: true, message: bizMap.validUsername,
                  }],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 16 }} />} size="large" placeholder={bizMap.validUsername} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem size="xlarge" type="password" {...formItemLayout}>
              {
                getFieldDecorator('usrPsw', {
                  initialValue: data.usrPsw,
                  rules: [{
                    required: true, message: bizMap.validPassword,
                  }],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} size="large" placeholder={bizMap.validPassword} type="password" />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row style={{ marginBottom: '12px' }}>
          <Col span={24}>
            <Button style={{ width: '100%' }} size="large" type="primary" htmlType="submit" loading={loading}>{commonMap.login}</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}><Link to="/loginPwdBack">{bizMap.forgetPas}</Link></Col>
        </Row>
      </Form>
    </div>
  );
}

LoginForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  formSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  data: {},
  loading: false,
  formSubmit: noop,
}

export default Form.create()(LoginForm);
