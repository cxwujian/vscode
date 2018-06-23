import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { encode } from '../../../../utils/code';

const noop = () => { };
const FormItem = Form.Item;

const UserPwdUpdForm = (props) => {
  const bizMap = i18n.bizMap('bas/user');
  const validMap = i18n.bizMap('bas/basVaild');
  const commonMap = i18n.commonMap();
  const { form, loading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.newPwd = encode(dat.newPwd, 'md5');
        dat.oldPwd = encode(dat.oldPwd, 'md5');
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  const newPwdRepeatValid = (rule, value, callback) => {
    if (!value) {
      callback(validMap.validCopNam);
      return;
    }
    if (value !== getFieldsValue().newPwd) {
      callback(validMap.validNewPwdMatch);
    } else {
      callback();
    }
  };

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.oldPwd} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('oldPwd', {
                  rules: [{
                    required: true, message: validMap.validOldPwd,
                  }],
                })(
                  <Input maxLength={60} type="password" placeholder={bizMap.oldPwd} maxLength={20} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.newPwd} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('newPwd', {
                  rules: [{
                    required: true, message: validMap.validNewPwd,
                  }],
                })(
                  <Input maxLength={60} type="password" placeholder={bizMap.newPwd} maxLength={20} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.newPwdRepeat} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('newPwdRepeat', {
                  rules: [{
                    required: true, message: validMap.validNewPwdRepeat,
                  },
                  { validator: newPwdRepeatValid },
                  ],
                  validateTrigger: 'onBlur',
                })(
                  <Input maxLength={60} type="password" placeholder={bizMap.newPwdRepeat} maxLength={20} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4>&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

UserPwdUpdForm.propTypes = {
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

UserPwdUpdForm.defaultProps = {
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(UserPwdUpdForm);
