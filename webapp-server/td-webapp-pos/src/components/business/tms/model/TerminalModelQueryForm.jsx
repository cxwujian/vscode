import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Cascader } from 'antd';
import * as i18n from '../../../../utils/i18n';
import cascaderTerTypQuery from '../../../../../config/i18n/zh-cn/tms/cascaderTerTypQuery.json';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const TerminalModelQueryForm = (props) => {
  const bizMap = i18n.bizMap('tms/terminalModel');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, deleteClick } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.terTyp && dat.terTyp.length > 0) {
          dat.terSubTyp = dat.terTyp[1];
          dat.terTyp = dat.terTyp[0];
        }
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
          <FormItem label={bizMap.copNam} {...formItemLayout}>
            {
              getFieldDecorator('copNam')(<Input placeholder={bizMap.copNam} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.terModNo} {...formItemLayout}>
            {
              getFieldDecorator('terModNo')(<Input placeholder={bizMap.terModNo} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.terTyp} {...formItemLayout}>
            {
              getFieldDecorator('terTyp')(
                <Cascader options={cascaderTerTypQuery} placeholder={bizMap.terTyp} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button type="primary" icon="plus" onClick={addClick}>{commonMap.add}</Button>
            <Button icon="cross" onClick={deleteClick}>{commonMap.delete}</Button>
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

TerminalModelQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  deleteClick: PropTypes.func,
};

TerminalModelQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  deleteClick: noop,
}

export default Form.create()(TerminalModelQueryForm);
