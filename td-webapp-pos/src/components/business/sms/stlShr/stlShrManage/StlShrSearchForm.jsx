import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

/**
 * 分润form表单
 */
const StlShrSearchForm = (props) => {
  const bizMap = i18n.bizMap('sms/stlShr');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { form, formSubmit, handleApplyClick } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields, setFieldsValue } = form;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        delete dat.shrDat;
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const handleDatePicker = (value, dateString) => {
    setFieldsValue({ shrDatStr: dateString[0], shrDatEnd: dateString[1] });
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <div hidden="true">
        <FormItem>
          {
            getFieldDecorator('shrDatStr')(
              <Input />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('shrDatEnd')(
              <Input />,
            )
          }
        </FormItem>
      </div>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.clrTyp} {...formItemLayout}>
            {
              getFieldDecorator('clrTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="01">{bizMap['clrTyp-01']}</Option>
                  <Option value="02">{bizMap['clrTyp-02']}</Option>
                  <Option value="03">{bizMap['clrTyp-03']}</Option>
                  <Option value="04">{bizMap['clrTyp-04']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.shrSts} {...formItemLayout}>
            {
              getFieldDecorator('shrSts')(
                <Select placeholder={commonMap.select}>
                  <Option value="0">{bizMap['shrSts-01']}</Option>
                  <Option value="1">{bizMap['shrSts-02']}</Option>
                  <Option value="3">{bizMap['shrSts-04']}</Option>
                  <Option value="4">{bizMap['shrSts-05']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.pyeMemName} {...formItemLayout}>
            {
              getFieldDecorator('pyeMemName')(
                <Input placeholder={bizMap.pyeMemName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.shrDat} {...formItemLayout}>
            {
              getFieldDecorator('shrDat')(
                <RangePicker onChange={handleDatePicker} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ textAlign: 'left', marginBottom: 16 }}>
          <Button icon="minus-circle" type="primary" onClick={handleApplyClick}>{bizMap.apply}</Button>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

StlShrSearchForm.propTypes = {
  formSubmit: PropTypes.func,
};

StlShrSearchForm.defaultProps = {
  formSubmit: noop,
};

export default Form.create()(StlShrSearchForm);
