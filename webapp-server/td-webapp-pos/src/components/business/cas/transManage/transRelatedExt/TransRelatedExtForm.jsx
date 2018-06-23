import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const TransRelatedExtForm = (props) => {
  const bizMap = i18n.bizMap('cas/transRelatedExt');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type } = props;
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
        formSubmit(getFieldsValue());
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.extCod} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('extCod', {
                  initialValue: data.extCod,
                  rules: [{
                    required: true, message: bizMap.validExtCod,
                  }],
                })(
                  <Input placeholder={bizMap.extCod} disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.extDesc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('extDesc', {
                  initialValue: data.extDesc,
                  rules: [{
                    required: true, message: bizMap.validExtDesc,
                  }],
                })(
                  <Input placeholder={bizMap.extDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.extTyp} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('extTyp', {
                  initialValue: data.extTyp,
                  rules: [{
                    required: true, message: bizMap.validExtTyp,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bizMap['extTyp-01']}</Option>
                    <Option value="02">{bizMap['extTyp-02']}</Option>
                    <Option value="03">{bizMap['extTyp-03']}</Option>
                    <Option value="04">{bizMap['extTyp-04']}</Option>
                    <Option value="05">{bizMap['extTyp-05']}</Option>
                  </Select>,
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
        <h4>&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form >
    </Spin >
  );
}

TransRelatedExtForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

TransRelatedExtForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(TransRelatedExtForm);
