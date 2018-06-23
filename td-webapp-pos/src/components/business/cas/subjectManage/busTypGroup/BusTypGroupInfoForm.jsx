import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const BusTypGroupInfoForm = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, formBaseSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formBaseSubmit(dat);
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
          <FormItem label={bizMap.groupId} {...formItemLayout}>
            {
              getFieldDecorator('groupId', {
                initialValue: data.groupId,
              })(
                <Input placeholder={bizMap.groupId} disabled />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.groupDesc} {...formItemLayout} >
            {
              getFieldDecorator('groupDesc', {
                initialValue: data.groupDesc,
              })(
                <Input placeholder={bizMap.groupDesc} disabled />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.busId} {...formItemLayout} >
            {
              getFieldDecorator('busId', {
                initialValue: data.busId,
              })(
                <Input placeholder={bizMap.busId} disabled />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.busDesc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('busDesc', {
                initialValue: data.busDesc,
                rules: [{ required: true, message: '' }, { validator: '' }],
              })(
                <Input placeholder={bizMap.busDesc} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.remark} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('remark', {
                initialValue: data.remark,
                rules: [{ required: false }],
              })(
                <Input placeholder={bizMap.remark} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

BusTypGroupInfoForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formBaseSubmit: PropTypes.func,
};

BusTypGroupInfoForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  formBaseSubmit: noop,
}

export default Form.create()(BusTypGroupInfoForm);
