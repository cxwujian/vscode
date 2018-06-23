import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PubAreaForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubArea');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, type } = props;
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
        <div hidden={type === 'update'}>
          <Row>
            <Col span={22}>
              <FormItem label={bizMap.areaParentCode} {...formItemLayout}>
                {
                  getFieldDecorator('areaParentCode', {
                    initialValue: data.areaParentCode,
                  })(
                    <Input disabled />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={22}>
              <FormItem label={bizMap.areaParentName} {...formItemLayout}>
                {
                  getFieldDecorator('areaParentName', {
                    initialValue: data.areaParentName,
                  })(
                    <Input disabled />,
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.areaCode} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaCode', {
                  initialValue: data.areaCode,
                  rules: [{
                    required: true, message: bizMap.validAreaCode,
                  }],
                })(
                  <Input maxLength={30} placeholder={bizMap.areaCode} disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.areaName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaName', {
                  initialValue: data.areaName,
                  rules: [{
                    required: true, message: bizMap.validAreaName,
                  }],
                })(
                  <Input maxLength={20} placeholder={bizMap.areaName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.areaNameEn} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaNameEn', {
                  initialValue: data.areaNameEn,
                })(
                  <Input maxLength={30} placeholder={bizMap.areaName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.areaLevel} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('areaLevel', {
                  initialValue: data.areaLevel,
                  rules: [{
                    required: true, message: bizMap.validSysFrom,
                  }],
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['areaLevel-0']}</Option>
                    <Option value="1">{bizMap['areaLevel-1']}</Option>
                    <Option value="2">{bizMap['areaLevel-2']}</Option>
                    <Option value="3">{bizMap['areaLevel-3']}</Option>
                  </Select>,
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

PubAreaForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PubAreaForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PubAreaForm);
