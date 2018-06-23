import React, { PropTypes } from 'react';
import { Form, Input, Row, Col } from 'antd';
import * as i18n from '../../../../utils/i18n';

const FormItem = Form.Item;

const FormItemAlipay = (props) => {
  const bizMap = i18n.bizMap('pms/alipay');
  const validMap = i18n.bizMap('pms/merchantScancodeValid');
  const { form, data } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <FormItem label={`${bizMap.alipayPid}`} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('alipayPid', {
                initialValue: data.alipayPid,
                rules: [{ required: true }],
              })(<Input placeholder={validMap.validAlipayPid} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={`${bizMap.alipayTk}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('alipayTk', {
                initialValue: data.alipayTk,
                rules: [{ required: true }],
              })(<Input type="textarea" placeholder={validMap.validAlipayTk} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={`${bizMap.alipayRefreshTk}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('alipayRefreshTk', {
                initialValue: data.alipayRefreshTk,
                rules: [{ required: true }],
              })(<Input type="textarea" placeholder={validMap.validAlipayRefreshTk} />)
            }
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={`${bizMap.alipayMd5Key}`} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('alipayMd5Key', {
                initialValue: data.alipayMd5Key,
                rules: [{ required: true }],
              })(<Input type="textarea" placeholder={validMap.validAlipayMd5Key} />)
            }
          </FormItem>
        </Col>
      </Row>
    </div>
  );
}

FormItemAlipay.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
};

FormItemAlipay.defaultProps = {
  data: {},
  form: {},
};

export default FormItemAlipay;
