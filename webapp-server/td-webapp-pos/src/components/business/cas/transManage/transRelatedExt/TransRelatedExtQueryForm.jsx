import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TransRelatedExtQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/transRelatedExt');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { form, formSubmit, addClick, enableClick, disableClick } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
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
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.extCod} {...formItemLayout}>
            {
              getFieldDecorator('extCod')(<Input placeholder={bizMap.extCod} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.extDesc} {...formItemLayout}>
            {
              getFieldDecorator('extDesc')(<Input placeholder={bizMap.extDesc} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.extSts} {...formItemLayout}>
            {
              getFieldDecorator('extSts')(
                <Select placeholder={commonMap.select}>
                  <Option value=""> &nbsp;</Option>
                  <Option value="00">{bizMap['extSts-00']}</Option>
                  <Option value="01">{bizMap['extSts-01']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.extTyp} {...formItemLayout}>
            {
              getFieldDecorator('extTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value=""> &nbsp;</Option>
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
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={addClick}>{commonMap.add}</Button>
            <Button style={{ marginLeft: 8 }} icon="check" onClick={enableClick}>{commonMap['status-1']}</Button>
            <Button style={{ marginLeft: 8 }} icon="minus" onClick={disableClick}>{commonMap['status-0']}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

TransRelatedExtQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

TransRelatedExtQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(TransRelatedExtQueryForm);
