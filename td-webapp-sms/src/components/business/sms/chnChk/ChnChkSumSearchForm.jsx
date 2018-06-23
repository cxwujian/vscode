import React, { PropTypes } from 'react';
import { Form, Button, Row, Col, Select, DatePicker, Input } from 'antd';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';

const ChnChkSumSearchForm = (props) => {
  const bizMap = i18n.bizMap('sms/chnChkSum');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { form, formSubmit } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.chkDat && dat.chkDat.length > 0) {
          dat.chkDatStr = dat.chkDat[0].format(dateFormat);
          dat.chkDatEnd = dat.chkDat[1].format(dateFormat);
          delete dat.chkDat;
        }
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  };

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chkDat} {...formItemLayout}>
            {
              getFieldDecorator('chkDat')(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnBuzType} {...formItemLayout}>
            {
              getFieldDecorator('chnBuzType')(
                <Select placeholder={commonMap.select}>
                  <Option value="" />
                  <Option value="0100">{bizMap['chnBuzType-0100']}</Option>
                  <Option value="0001">{bizMap['chnBuzType-0001']}</Option>
                  <Option value="1000">{bizMap['chnBuzType-1000']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.chnName} {...formItemLayout}>
            {
              getFieldDecorator('chnName')(
                <Input maxLength="50" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={24} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

ChnChkSumSearchForm.propTypes = {
  formSubmit: PropTypes.func,
};

ChnChkSumSearchForm.defaultProps = {
  formSubmit: noop,
};

export default Form.create()(ChnChkSumSearchForm);
