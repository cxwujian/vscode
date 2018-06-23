import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const SubjectCodeInfoForm = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, formBaseSubmit, ccyOptionsData, type } = props;
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
          <FormItem label={bizMap.accTyp} {...formItemLayout}>
            {
              getFieldDecorator('accTyp', {
                initialValue: data.accTyp,
                rules: [{ required: true, message: bizMap.validAccTyp }],
              })(
                <Select disabled>
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{bizMap['accTyp-1']}</Option>
                  <Option value="2">{bizMap['accTyp-2']}</Option>
                  <Option value="3">{bizMap['accTyp-3']}</Option>
                  <Option value="4">{bizMap['accTyp-4']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.ccy} {...formItemLayout} required>
            {
              getFieldDecorator('ccy', {
                initialValue: data.ccy,
                rules: [{ required: true, message: bizMap.validCcy }],
              })(
                <Select disabled>
                  <Option value="">&nbsp;</Option>
                  {
                    ccyOptionsData.map((ccyOption, idx) => {
                      return <Option key={idx} value={ccyOption.ccy}>{`${ccyOption.ccy}-${ccyOption.ccyExplain}`}</Option>;
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
          <FormItem label={bizMap.subTyp} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('subTyp', {
                initialValue: data.subTyp,
                rules: [{ required: true, message: bizMap.validSubTyp }],
              })(
                <Select placeholder={commonMap.subTyp} disabled={type === 'update'}>
                  <Option value="">&nbsp;</Option>
                  <Option value="CUS">{bizMap['subTyp-CUS']}</Option>
                  <Option value="PLAT">{bizMap['subTyp-PLAT']}</Option>
                  <Option value="CHN">{bizMap['subTyp-CHN']}</Option>
                  <Option value="BANK">{bizMap['subTyp-BANK']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <FormItem label={bizMap.subject} {...formItemLayout}>
            {
              getFieldDecorator('subject', {
                initialValue: data.subject,
              })(
                <Input placeholder={bizMap.subject} disabled />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.subjectNme} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('subjectNme', {
                initialValue: data.subjectNme,
                rules: [{ required: true, message: '' }],
              })(
                <Input placeholder={bizMap.subjectNme} />,
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

SubjectCodeInfoForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formBaseSubmit: PropTypes.func,
  ccyOptionsData: PropTypes.array,
  type: PropTypes.string,
};

SubjectCodeInfoForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  formBaseSubmit: noop,
  ccyOptionsData: [],
  type: '',
}

export default Form.create()(SubjectCodeInfoForm);
