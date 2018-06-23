import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Cascader, Select } from 'antd';
import * as i18n from '../../../../utils/i18n';
import { numValid } from '../../../../utils/vaild';
import CITYDATAS from '../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const PubBankSubForm = (props) => {
  const bizMap = i18n.bizMap('bas/pubBank');
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
        <Row style={{ display: 'none' }}>
          <Col span={22}>
            <FormItem label={bizMap.bankParentCode} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankParentCode', {
                  initialValue: data.bankParentCode,
                })(
                  <Input maxLength={12} placeholder={bizMap.bankParentCode} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.bankName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankName', {
                  initialValue: data.bankName,
                  rules: [{
                    required: true, message: bizMap.validBankName,
                  }],
                })(
                  <Input maxLength={75} placeholder={bizMap.bankName} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.bankCode} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bankCode', {
                  initialValue: data.bankCode,
                  rules: [{
                    required: true, message: bizMap.validBankCode,
                  }, { validator: numValid }],
                  validateTrigger: 'onBlur',
                })(
                  <Input maxLength={12} placeholder={bizMap.bankCode} disabled={type === 'update'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.subBranch} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('subBranch', {
                  initialValue: data.subBranch,
                  rules: [{
                    required: true, message: bizMap.validSubBranch,
                  }],
                })(
                  <Input maxLength={75} placeholder={bizMap.subBranch} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <FormItem label={bizMap.bankCity} {...formItemLayout}>
              {
                getFieldDecorator('agtInProvCityArea', {
                  initialValue: data.agtInProvCityArea ? data.agtInProvCityArea.split(',') : [],
                  rules: [{ required: true, message: bizMap.vaildAgtInProvCityArea }],
                })(
                  <Cascader
                    placeholder={bizMap.bankCity}
                    options={CITYDATAS}
                  />,
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

PubBankSubForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

PubBankSubForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(PubBankSubForm);
