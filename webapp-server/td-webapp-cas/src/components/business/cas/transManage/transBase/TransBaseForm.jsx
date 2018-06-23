import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const TransBaseForm = (props) => {
  const bizMap = i18n.bizMap('cas/transaction');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, formSubmit, type } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
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

  const handleReset = () => {
    resetFields();
  }

  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.txnCode} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('txnCode', {
                initialValue: data.txnCode,
                rules: [{ required: true, message: bizMap.inputTxnCode }],
              })(
                <Input placeholder={bizMap.txnCode} disabled={type === 'update'} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.txnDesc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('txnDesc', {
                initialValue: data.txnDesc,
                rules: [{ required: true, message: bizMap.inputTxnDesc }],
              })(
                <Input placeholder={bizMap.txnDesc} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.remark} {...formItemLayout} >
            {
              getFieldDecorator('remark', {
                initialValue: data.remark,
              })(
                <Input type="textarea" rows="4" placeholder={bizMap.remark} />,
              )
            }
          </FormItem>
        </Col>
      </Row>

      <h4 key="btn-split-5" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

TransBaseForm.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.object,
  formSubmit: PropTypes.func,
  submiting: PropTypes.bool,
};

TransBaseForm.defaultProps = {
  type: '',
  style: {},
  data: {},
  formSubmit: noop,
  submiting: false,
}

export default Form.create()(TransBaseForm);
