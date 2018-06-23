import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const Option = Select.Option;
const FormItem = Form.Item;
const AccManageInfForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/accManageInf');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, setFormFieldsValue,
    subAccCategoryDate } = props;
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
    const dat = {};
    setFormFieldsValue(dat)
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.pkId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('pkId', {
                  initialValue: data.pkId,
                })(
                  <Input placeholder={bizMap.pkId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.subject} {...formItemLayout} >
              {
                getFieldDecorator('subject', {
                  initialValue: data.subject,
                  rules: [{ required: true, message: bizMap.validSubject }],
                })(
                  <Input placeholder={bizMap.subject} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.cusNo} {...formItemLayout} >
              {
                getFieldDecorator('cusNo', {
                  initialValue: data.cusNo,
                })(
                  <Input placeholder={bizMap.cusNo} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.cateId} {...formItemLayout} >
              {
                getFieldDecorator('cateId')(
                  <Select disabled >
                    <Option value="">&nbsp;</Option>
                    {
                      subAccCategoryDate.map((cateOption, idx) => {
                        return <Option key={idx} value={`${cateOption.cateId}`}>{`${cateOption.subAccId}-${cateOption.subAccName}`}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.modeId} {...formItemLayout} >
              {
                getFieldDecorator('modeId', {
                  initialValue: data.modeId,
                })(
                  <Select>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bizMap['accMode-01']}</Option>
                    <Option value="02">{bizMap['accMode-02']}</Option>
                    <Option value="03">{bizMap['accMode-03']}</Option>
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
        <h4 className="split">&nbsp;</h4>
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

AccManageInfForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  setFormFieldsValue: PropTypes.func,
  subAccCategoryDate: PropTypes.array,
};

AccManageInfForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  setFormFieldsValue: noop,
  subAccCategoryDate: [],
}

export default Form.create()(AccManageInfForm);
