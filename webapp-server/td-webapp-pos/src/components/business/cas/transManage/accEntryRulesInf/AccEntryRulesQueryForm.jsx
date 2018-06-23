import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const AccEntryRulesQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/accEntryRulesInf');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, enableClick, disableClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
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
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.entryDesc} {...formItemLayout}>
            {
              getFieldDecorator('entryDesc')(<Input placeholder={bizMap.entryDesc} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.entSts} {...formItemLayout}>
            {
              getFieldDecorator('entSts')(
                <Select placeholder={commonMap.select}>
                  <Option value="00">{bizMap['entSts-00']}</Option>
                  <Option value="01">{bizMap['entSts-01']}</Option>
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
}

AccEntryRulesQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
};

AccEntryRulesQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  enableClick: noop,
  disableClick: noop,
}

export default Form.create()(AccEntryRulesQueryForm);
