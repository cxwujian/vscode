import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const OpenAccSceneQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/openAcc');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const { form, formSubmit, enableClick, disableClick, addClick } = props;
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
        <Col span={8}>
          <FormItem label={bizMap.sceneDesc} {...formItemLayout}>
            {
              getFieldDecorator('sceneDesc')(<Input placeholder={bizMap.sceneDesc} />)
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.accLevel} {...formItemLayout}>
            {
              getFieldDecorator('accLevel')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{bizMap['accLevel-0']}</Option>
                  <Option value="1">{bizMap['accLevel-1']}</Option>
                  <Option value="2">{bizMap['accLevel-2']}</Option>
                  <Option value="3">{bizMap['accLevel-3']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.sceSts} {...formItemLayout}>
            {
              getFieldDecorator('sceSts')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="00">{bizMap['sceSts-00']}</Option>
                  <Option value="01">{bizMap['sceSts-01']}</Option>
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

OpenAccSceneQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  disableClick: PropTypes.func,
};

OpenAccSceneQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  disableClick: noop,
}

export default Form.create()(OpenAccSceneQueryForm);
